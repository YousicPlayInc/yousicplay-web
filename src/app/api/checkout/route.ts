import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { resolveCheckoutItem } from "@/lib/checkout";
import type { CheckoutItemType } from "@/lib/checkout";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, itemType } = body as {
      slug: string;
      itemType: CheckoutItemType;
    };

    if (!slug || !itemType) {
      return NextResponse.json(
        { error: "Missing slug or itemType" },
        { status: 400 }
      );
    }

    const item = resolveCheckoutItem(slug, itemType);
    if (!item) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Free items skip Stripe — go directly to Thinkific
    if (item.price === 0) {
      return NextResponse.json({ url: item.buyUrl });
    }

    const origin = request.headers.get("origin") || "https://yousicplay.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        slug: item.slug,
        itemType: item.itemType,
        buyUrl: item.buyUrl,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${itemType === "course" ? "classes" : itemType === "bundle" ? "bundles" : "products"}/${slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
