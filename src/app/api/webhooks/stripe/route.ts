import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

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
    console.error("Missing required session data:", { email, slug, itemType });
    return;
  }

  // Idempotency: skip if already recorded
  const { data: existingPurchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("stripe_payment_id", stripePaymentId)
    .single();

  if (existingPurchase) {
    console.log(`Purchase already recorded for payment ${stripePaymentId}`);
    return;
  }

  // Upsert customer
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
    console.error("Failed to upsert customer:", customerError);
    return;
  }

  // Look up or create product
  let { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!product) {
    const productType = itemType === "bundle" ? "bundle" : "course";
    const { data: newProduct, error: productError } = await supabase
      .from("products")
      .insert({
        name: slug,
        slug,
        type: productType,
        price: amount,
        billing_interval: "one_time",
        active: true,
      })
      .select("id")
      .single();

    if (productError || !newProduct) {
      console.error("Failed to create product:", productError);
      return;
    }
    product = newProduct;
  }

  // Record purchase
  const { error: purchaseError } = await supabase.from("purchases").insert({
    customer_id: customer.id,
    product_id: product.id,
    stripe_payment_id: stripePaymentId,
    amount,
    currency: session.currency || "usd",
    status: "completed",
  });

  if (purchaseError) {
    console.error("Failed to record purchase:", purchaseError);
    return;
  }

  console.log(
    `Purchase recorded: ${email} bought ${itemType}/${slug} for $${amount / 100}`
  );

  // Sync to Klaviyo (non-blocking)
  trackKlaviyoPurchase({
    email,
    customerName: name || undefined,
    slug,
    itemType,
    productName: slug, // Will use the slug as product name; Stripe session doesn't have our title
    amount,
    currency: session.currency || "usd",
    stripePaymentId,
  }).catch((err) => console.error("[Klaviyo] Purchase sync failed:", err));
}
