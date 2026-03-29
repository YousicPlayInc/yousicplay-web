import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Module mocks ──────────────────────────────────────────────────────────

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 9 }),
  getClientIP: vi.fn().mockReturnValue("127.0.0.1"),
}));

const { mockResolveCheckoutItem, mockCheckoutSessionsCreate } = vi.hoisted(() => ({
  mockResolveCheckoutItem: vi.fn(),
  mockCheckoutSessionsCreate: vi.fn(),
}));

vi.mock("@/lib/checkout", () => ({
  resolveCheckoutItem: mockResolveCheckoutItem,
}));

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(() => ({
    checkout: {
      sessions: {
        create: mockCheckoutSessionsCreate,
      },
    },
  })),
}));

// ── Import route handler AFTER mocks ──────────────────────────────────────

import { POST } from "@/app/api/checkout/route";
import { rateLimit } from "@/lib/rate-limit";

// ── Helpers ───────────────────────────────────────────────────────────────

function makeRequest(body: Record<string, unknown> = {}) {
  return new NextRequest("https://yousicplay.com/api/checkout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://yousicplay.com",
    },
    body: JSON.stringify(body),
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(rateLimit).mockReturnValue({ success: true, remaining: 9 });
  });

  // 1. Rate limited → 429
  it("returns 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockReturnValue({ success: false, remaining: 0 });
    const res = await POST(makeRequest({ slug: "x", itemType: "course" }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toBe("Too many requests");
  });

  // 2. Missing slug → 400
  it("returns 400 when slug is missing", async () => {
    const res = await POST(makeRequest({ itemType: "course" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing slug or itemType");
  });

  // 3. Missing itemType → 400
  it("returns 400 when itemType is missing", async () => {
    const res = await POST(makeRequest({ slug: "cory-henry-organ" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing slug or itemType");
  });

  // 4. Product not found (resolveCheckoutItem returns null) → 404
  it("returns 404 when product is not found", async () => {
    mockResolveCheckoutItem.mockReturnValue(null);
    const res = await POST(
      makeRequest({ slug: "nonexistent", itemType: "course" })
    );
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Product not found");
  });

  // 5. Free item (price === 0) → returns redirect URL, no Stripe session
  it("returns free redirect URL for a free course", async () => {
    mockResolveCheckoutItem.mockReturnValue({
      slug: "cory-henry-30-day",
      itemType: "course",
      title: "Cory Henry 30-Day Workshop",
      price: 0,
      buyUrl: "https://courses.yousicplay.com/courses/cory-henry-30-day",
      imagePath: "/images/courses/cory-henry-30-day.jpg",
    });

    const res = await POST(
      makeRequest({ slug: "cory-henry-30-day", itemType: "course" })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("/learn/cory-henry-30-day");
    // Should NOT create a Stripe session
    expect(mockCheckoutSessionsCreate).not.toHaveBeenCalled();
  });

  it("returns free redirect URL for a free bundle", async () => {
    mockResolveCheckoutItem.mockReturnValue({
      slug: "free-bundle",
      itemType: "bundle",
      title: "Free Bundle",
      price: 0,
      buyUrl: "https://courses.yousicplay.com/bundles/free-bundle",
      imagePath: "/images/bundles/free.jpg",
    });

    const res = await POST(
      makeRequest({ slug: "free-bundle", itemType: "bundle" })
    );
    const json = await res.json();
    expect(json.url).toBe("/bundles/free-bundle");
  });

  it("returns free redirect URL for a free product", async () => {
    mockResolveCheckoutItem.mockReturnValue({
      slug: "free-ebook",
      itemType: "product",
      title: "Free Ebook",
      price: 0,
      buyUrl: "https://courses.yousicplay.com/products/free-ebook",
      imagePath: "/images/products/free-ebook.jpg",
    });

    const res = await POST(
      makeRequest({ slug: "free-ebook", itemType: "product" })
    );
    const json = await res.json();
    expect(json.url).toBe("/products/free-ebook");
  });

  // 6. Paid item → creates Stripe session, returns { url: session.url }
  it("creates a Stripe checkout session for paid items", async () => {
    mockResolveCheckoutItem.mockReturnValue({
      slug: "cory-henry-organ",
      itemType: "course",
      title: "Cory Henry: Organ & Synth Masterclass",
      price: 149,
      buyUrl: "https://courses.yousicplay.com/courses/cory-henry-organ",
      imagePath: "/images/courses/cory-henry-organ.jpg",
    });

    mockCheckoutSessionsCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/pay/cs_test_session",
    });

    const res = await POST(
      makeRequest({ slug: "cory-henry-organ", itemType: "course" })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("https://checkout.stripe.com/pay/cs_test_session");

    // Verify Stripe was called with correct params
    expect(mockCheckoutSessionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              currency: "usd",
              product_data: {
                name: "Cory Henry: Organ & Synth Masterclass",
              },
              unit_amount: 14900, // $149 * 100
            }),
            quantity: 1,
          }),
        ],
        metadata: expect.objectContaining({
          slug: "cory-henry-organ",
          itemType: "course",
        }),
        success_url: expect.stringContaining("/checkout/success"),
        cancel_url: expect.stringContaining("/classes/cory-henry-organ"),
      })
    );
  });

  // 7. Stripe throws → 500 with error message
  it("returns 500 when Stripe throws an error", async () => {
    mockResolveCheckoutItem.mockReturnValue({
      slug: "cory-henry-organ",
      itemType: "course",
      title: "Cory Henry: Organ & Synth Masterclass",
      price: 149,
      buyUrl: "https://courses.yousicplay.com/courses/cory-henry-organ",
      imagePath: "/images/courses/cory-henry-organ.jpg",
    });

    mockCheckoutSessionsCreate.mockRejectedValue(
      new Error("Stripe API key invalid")
    );

    const res = await POST(
      makeRequest({ slug: "cory-henry-organ", itemType: "course" })
    );
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Stripe API key invalid");
  });
});
