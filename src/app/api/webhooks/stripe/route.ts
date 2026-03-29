import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerSupabase } from "@/lib/supabase";
import { trackPurchase as trackKlaviyoPurchase } from "@/lib/klaviyo";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Only handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      // Log the full error but still return 200 to Stripe so it doesn't retry
      // (we already have idempotency protection, so retries are safe, but
      // we want to avoid unnecessary webhook noise)
      console.error(
        "[Stripe Webhook] CRITICAL: handleCheckoutCompleted failed for session",
        session.id,
        err
      );
    }
  }

  // Always return 200 — Stripe retries on non-2xx, and our idempotency check
  // prevents duplicate processing
  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServerSupabase();

  const email = session.customer_details?.email;
  const name = session.customer_details?.name;
  const stripePaymentId = session.payment_intent as string;
  const slug = session.metadata?.slug;
  const itemType = session.metadata?.itemType;
  const amount = session.amount_total ?? 0;

  if (!email || !slug || !itemType) {
    console.error("[Stripe Webhook] Missing required session data:", {
      sessionId: session.id,
      email: !!email,
      slug: !!slug,
      itemType: !!itemType,
    });
    return;
  }

  if (!stripePaymentId) {
    console.error("[Stripe Webhook] Missing payment_intent for session:", session.id);
    return;
  }

  // ── Idempotency: skip if already recorded ──────────────────────────────
  const { data: existingPurchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("stripe_payment_id", stripePaymentId)
    .maybeSingle();

  if (existingPurchase) {
    console.log(
      `[Stripe Webhook] Duplicate — purchase already recorded for payment ${stripePaymentId}`
    );
    return;
  }

  // ── Upsert customer ────────────────────────────────────────────────────
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        name: name || null,
        stripe_customer_id: (session.customer as string) || null,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (customerError || !customer) {
    console.error("[Stripe Webhook] CRITICAL: Failed to upsert customer:", {
      email,
      error: customerError,
    });
    throw new Error(`Customer upsert failed: ${customerError?.message}`);
  }

  // ── Look up or create product ──────────────────────────────────────────
  // First try to find the pre-seeded product by slug
  let { data: product } = await supabase
    .from("products")
    .select("id, name")
    .eq("slug", slug)
    .single();

  if (!product) {
    console.error("[Stripe Webhook] CRITICAL: Product not found in database for slug:", slug);
    throw new Error(`Product not found for slug: ${slug}`);
  }

  // ── Record purchase ────────────────────────────────────────────────────
  const { error: purchaseError } = await supabase.from("purchases").insert({
    customer_id: customer.id,
    product_id: product.id,
    stripe_payment_id: stripePaymentId,
    amount,
    currency: session.currency || "usd",
    status: "completed",
  });

  if (purchaseError) {
    console.error("[Stripe Webhook] CRITICAL: Failed to record purchase:", {
      customerId: customer.id,
      productId: product.id,
      stripePaymentId,
      error: purchaseError,
    });
    throw new Error(`Purchase insert failed: ${purchaseError.message}`);
  }

  console.log(
    `[Stripe Webhook] SUCCESS: ${email} bought ${itemType}/${slug} for $${(amount / 100).toFixed(2)}`
  );

  // ── Sync to Klaviyo (non-blocking) ─────────────────────────────────────
  trackKlaviyoPurchase({
    email,
    customerName: name || undefined,
    slug,
    itemType,
    productName: product.name || slug,
    amount,
    currency: session.currency || "usd",
    stripePaymentId,
  }).catch((err) => console.error("[Klaviyo] Purchase sync failed:", err));
}
