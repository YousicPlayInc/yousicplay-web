import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock stripe as a constructor that returns an object
vi.mock("stripe", () => {
  function MockStripe() {
    return {
      customers: {},
      checkout: { sessions: {} },
      webhooks: {},
    };
  }
  // Make it work with both `new Stripe()` and instanceof checks
  MockStripe.prototype = {};
  return { default: MockStripe };
});

describe("getStripe", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.STRIPE_SECRET_KEY;
  });

  it("throws when STRIPE_SECRET_KEY is not set", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const { getStripe } = await import("@/lib/stripe");
    expect(() => getStripe()).toThrow("STRIPE_SECRET_KEY is not set");
  });

  it("returns a Stripe instance when key is set", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_fake_key_for_testing";
    const { getStripe } = await import("@/lib/stripe");
    const stripe = getStripe();
    expect(stripe).toBeDefined();
    expect(stripe).toHaveProperty("customers");
    expect(stripe).toHaveProperty("checkout");
  });
});
