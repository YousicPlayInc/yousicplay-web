import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Clear the module-level tokenBuckets Map by re-importing
    // Since we can't directly access the Map, we use unique identifiers per test
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("first request succeeds with remaining = maxTokens - 1", () => {
    const result = rateLimit("test-first-request");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9); // default maxTokens=10, minus 1
  });

  it("requests exhaust tokens and then fail", () => {
    const id = "test-exhaust";
    // Use all 10 tokens
    for (let i = 0; i < 10; i++) {
      const result = rateLimit(id);
      expect(result.success).toBe(true);
    }
    // 11th request should fail
    const result = rateLimit(id);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tokens refill after time elapses", () => {
    const id = "test-refill";
    // Exhaust all tokens
    for (let i = 0; i < 10; i++) {
      rateLimit(id);
    }
    expect(rateLimit(id).success).toBe(false);

    // Advance time by 3 seconds (default: 1 token per 1000ms)
    vi.advanceTimersByTime(3000);

    const result = rateLimit(id);
    expect(result.success).toBe(true);
    // 3 tokens refilled, 1 consumed = 2 remaining
    expect(result.remaining).toBe(2);
  });

  it("multiple identifiers are tracked independently", () => {
    const id1 = "test-independent-a";
    const id2 = "test-independent-b";

    // Exhaust id1
    for (let i = 0; i < 10; i++) {
      rateLimit(id1);
    }
    expect(rateLimit(id1).success).toBe(false);

    // id2 should still have full tokens
    const result = rateLimit(id2);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it("custom config (maxTokens, refillRate, interval) works", () => {
    const id = "test-custom-config";
    const config = { maxTokens: 3, refillRate: 2, interval: 500 };

    // Use all 3 tokens
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(id, config).success).toBe(true);
    }
    expect(rateLimit(id, config).success).toBe(false);

    // Advance 500ms → refill 2 tokens (refillRate=2, interval=500)
    vi.advanceTimersByTime(500);
    const result = rateLimit(id, config);
    expect(result.success).toBe(true);
    // 2 refilled, 1 consumed = 1 remaining
    expect(result.remaining).toBe(1);
  });
});

describe("getClientIP", () => {
  it("reads x-forwarded-for header", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.50" },
    });
    expect(getClientIP(request)).toBe("203.0.113.50");
  });

  it("reads x-real-ip as fallback", () => {
    const request = new Request("http://localhost", {
      headers: { "x-real-ip": "198.51.100.25" },
    });
    expect(getClientIP(request)).toBe("198.51.100.25");
  });

  it('returns "unknown" when no headers are present', () => {
    const request = new Request("http://localhost");
    expect(getClientIP(request)).toBe("unknown");
  });

  it("takes first IP from comma-separated x-forwarded-for", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.50, 70.41.3.18, 150.172.238.178" },
    });
    expect(getClientIP(request)).toBe("203.0.113.50");
  });
});
