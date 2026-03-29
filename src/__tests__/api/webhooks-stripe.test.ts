import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { mockSupabaseClient } from "../helpers/mocks";

// ── Module mocks ──────────────────────────────────────────────────────────

const { client: supabase, queryBuilder } = mockSupabaseClient();

vi.mock("@/lib/supabase", () => ({
  createServerSupabase: vi.fn(() => supabase),
}));

const { mockConstructEvent, mockTrackPurchase } = vi.hoisted(() => ({
  mockConstructEvent: vi.fn(),
  mockTrackPurchase: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(() => ({
    webhooks: { constructEvent: mockConstructEvent },
  })),
}));

vi.mock("@/lib/klaviyo", () => ({
  trackPurchase: mockTrackPurchase,
}));

// ── Import route handler AFTER mocks ──────────────────────────────────────

import { POST } from "@/app/api/webhooks/stripe/route";

// ── Helpers ───────────────────────────────────────────────────────────────

function makeRequest(body = "raw-body", headers: Record<string, string> = {}) {
  return new NextRequest("https://yousicplay.com/api/webhooks/stripe", {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });
}

function makeCheckoutEvent(sessionOverrides: Record<string, unknown> = {}) {
  return {
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_123",
        customer_details: {
          email: "fan@example.com",
          name: "Jazz Fan",
        },
        payment_intent: "pi_test_abc",
        metadata: {
          slug: "cory-henry-organ",
          itemType: "course",
        },
        amount_total: 14900,
        currency: "usd",
        customer: "cus_test_xyz",
        ...sessionOverrides,
      },
    },
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("POST /api/webhooks/stripe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";

    // Reset queryBuilder defaults
    queryBuilder.maybeSingle.mockResolvedValue({ data: null, error: null });
    queryBuilder.single.mockResolvedValue({ data: null, error: null });
  });

  // 1. Missing stripe-signature header → 400
  it("returns 400 when stripe-signature header is missing", async () => {
    const req = makeRequest("body", {});
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Missing signature");
  });

  // 2. STRIPE_WEBHOOK_SECRET not set → 500
  it("returns 500 when STRIPE_WEBHOOK_SECRET is not configured", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Webhook not configured");
  });

  // 3. constructEvent throws → 400
  it("returns 400 when constructEvent throws (invalid signature)", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });
    const req = makeRequest("body", { "stripe-signature": "bad_sig" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid signature");
  });

  // 4. Non-checkout.session.completed event → 200 with { received: true }
  it("returns 200 with received:true for non-checkout events", async () => {
    mockConstructEvent.mockReturnValue({
      type: "payment_intent.succeeded",
      data: { object: {} },
    });
    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.received).toBe(true);
    // Should NOT call supabase at all
    expect(supabase.from).not.toHaveBeenCalled();
  });

  // 5. Session missing email → returns 200 (logs error, doesn't throw)
  it("returns 200 when session is missing email", async () => {
    const event = makeCheckoutEvent({
      customer_details: { email: null, name: "No Email" },
    });
    mockConstructEvent.mockReturnValue(event);
    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    // Should not attempt customer upsert
    expect(queryBuilder.upsert).not.toHaveBeenCalled();
  });

  // 6. Session missing slug → returns 200 (logs error)
  it("returns 200 when session metadata is missing slug", async () => {
    const event = makeCheckoutEvent({
      metadata: { itemType: "course" }, // no slug
    });
    mockConstructEvent.mockReturnValue(event);
    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(queryBuilder.upsert).not.toHaveBeenCalled();
  });

  // 7. Session missing payment_intent → returns 200 (logs error)
  it("returns 200 when session is missing payment_intent", async () => {
    const event = makeCheckoutEvent({ payment_intent: null });
    mockConstructEvent.mockReturnValue(event);
    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(queryBuilder.upsert).not.toHaveBeenCalled();
  });

  // 8. Duplicate payment_intent (idempotency) → returns 200, no new insert
  it("returns 200 and skips processing for duplicate payment_intent", async () => {
    mockConstructEvent.mockReturnValue(makeCheckoutEvent());

    // First call: purchases.select().eq().maybeSingle() → existing record
    queryBuilder.maybeSingle.mockResolvedValueOnce({
      data: { id: "existing-purchase-id" },
      error: null,
    });

    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    // Verify it checked purchases but did NOT upsert customer or insert purchase
    expect(supabase.from).toHaveBeenCalledWith("purchases");
    expect(queryBuilder.upsert).not.toHaveBeenCalled();
    expect(queryBuilder.insert).not.toHaveBeenCalled();
  });

  // 9. Happy path: valid session → customer upserted, product found, purchase inserted
  it("processes a valid checkout session end-to-end", async () => {
    mockConstructEvent.mockReturnValue(makeCheckoutEvent());

    // purchases idempotency check → no existing purchase
    queryBuilder.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    // customers upsert → success
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "cust-uuid-1" },
      error: null,
    });

    // products select → found
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "prod-uuid-1", name: "Cory Henry Organ" },
      error: null,
    });

    // purchases insert → success (returns via the implicit then)
    queryBuilder.insert.mockReturnValue({
      ...queryBuilder,
      then: vi.fn((resolve: (v: { error: null }) => void) =>
        Promise.resolve({ error: null }).then(resolve)
      ),
    });

    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    // Verify customer upsert was called
    expect(supabase.from).toHaveBeenCalledWith("customers");
    expect(queryBuilder.upsert).toHaveBeenCalledWith(
      {
        email: "fan@example.com",
        name: "Jazz Fan",
        stripe_customer_id: "cus_test_xyz",
      },
      { onConflict: "email" }
    );

    // Verify product lookup
    expect(supabase.from).toHaveBeenCalledWith("products");
    expect(queryBuilder.eq).toHaveBeenCalledWith("slug", "cory-henry-organ");

    // Verify purchase insert
    expect(supabase.from).toHaveBeenCalledWith("purchases");
    expect(queryBuilder.insert).toHaveBeenCalledWith({
      customer_id: "cust-uuid-1",
      product_id: "prod-uuid-1",
      stripe_payment_id: "pi_test_abc",
      amount: 14900,
      currency: "usd",
      status: "completed",
    });

    // Verify Klaviyo was called
    expect(mockTrackPurchase).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "fan@example.com",
        slug: "cory-henry-organ",
        itemType: "course",
        productName: "Cory Henry Organ",
        amount: 14900,
        currency: "usd",
        stripePaymentId: "pi_test_abc",
      })
    );
  });

  // 10. Product not found in DB → throws error but route still returns 200
  it("returns 200 even when product is not found in database", async () => {
    mockConstructEvent.mockReturnValue(makeCheckoutEvent());

    // No duplicate purchase
    queryBuilder.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    // Customer upsert succeeds
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "cust-uuid-1" },
      error: null,
    });

    // Product not found
    queryBuilder.single.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    // The route catches the thrown error and returns 200 to Stripe
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });

  // 11. Klaviyo trackPurchase failure → non-blocking, route still returns 200
  it("returns 200 even when Klaviyo trackPurchase fails", async () => {
    mockConstructEvent.mockReturnValue(makeCheckoutEvent());

    // No duplicate
    queryBuilder.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    // Customer upsert ok
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "cust-uuid-1" },
      error: null,
    });

    // Product found
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "prod-uuid-1", name: "Cory Henry Organ" },
      error: null,
    });

    // Purchase insert ok
    queryBuilder.insert.mockReturnValue({
      ...queryBuilder,
      then: vi.fn((resolve: (v: { error: null }) => void) =>
        Promise.resolve({ error: null }).then(resolve)
      ),
    });

    // Klaviyo rejects
    mockTrackPurchase.mockRejectedValueOnce(new Error("Klaviyo down"));

    const req = makeRequest("body", { "stripe-signature": "sig_123" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });
});
