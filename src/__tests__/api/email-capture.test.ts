import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { mockSupabaseClient } from "../helpers/mocks";

// ── Module mocks ──────────────────────────────────────────────────────────

const { client: supabase, queryBuilder } = mockSupabaseClient();

vi.mock("@/lib/supabase", () => ({
  createServerSupabase: vi.fn(() => supabase),
}));

const { mockTrackEmailCapture } = vi.hoisted(() => ({
  mockTrackEmailCapture: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/klaviyo", () => ({
  trackEmailCapture: mockTrackEmailCapture,
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, remaining: 4 }),
  getClientIP: vi.fn().mockReturnValue("127.0.0.1"),
}));

// ── Import route handler AFTER mocks ──────────────────────────────────────

import { POST } from "@/app/api/email-capture/route";
import { rateLimit } from "@/lib/rate-limit";

// ── Helpers ───────────────────────────────────────────────────────────────

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("https://yousicplay.com/api/email-capture", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify(body),
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("POST /api/email-capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(rateLimit).mockReturnValue({ success: true, remaining: 4 });

    // Default: insert succeeds
    queryBuilder.insert.mockReturnValue({
      ...queryBuilder,
      then: vi.fn((resolve: (v: { error: null }) => void) =>
        Promise.resolve({ error: null }).then(resolve)
      ),
    });
  });

  // 1. Rate limited → 429
  it("returns 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockReturnValue({ success: false, remaining: 0 });
    const res = await POST(makeRequest({ email: "test@example.com" }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toBe("Too many requests");
  });

  // 2. Missing email → 400
  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Valid email is required");
  });

  // 3. Invalid email (no @) → 400
  it("returns 400 for email without @", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Valid email is required");
  });

  // 4. Invalid email (spaces only) → 400
  it("returns 400 for whitespace-only email", async () => {
    const res = await POST(makeRequest({ email: "   " }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Valid email is required");
  });

  // 5. Valid email → inserted, returns { success: true }
  it("inserts a valid email and returns success", async () => {
    const res = await POST(
      makeRequest({
        email: "fan@example.com",
        source: "homepage-modal",
        page_url: "/",
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    // Verify supabase insert was called with the right data
    expect(supabase.from).toHaveBeenCalledWith("email_captures");
    expect(queryBuilder.insert).toHaveBeenCalledWith({
      email: "fan@example.com",
      source: "homepage-modal",
      page_url: "/",
    });

    // Verify Klaviyo was called
    expect(mockTrackEmailCapture).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "fan@example.com",
        source: "homepage-modal",
        pageUrl: "/",
      })
    );
  });

  // 6. Email with spaces → trimmed before insert
  it("trims and lowercases email before insert", async () => {
    const res = await POST(
      makeRequest({ email: "  FAN@Example.COM  " })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    expect(queryBuilder.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "fan@example.com",
      })
    );
  });

  // 7. Name provided → upserts customer record
  it("upserts customer when name is provided", async () => {
    const res = await POST(
      makeRequest({
        email: "fan@example.com",
        name: "Jazz Fan",
        source: "course-page",
      })
    );
    expect(res.status).toBe(200);

    // Should call from("customers") with upsert
    expect(supabase.from).toHaveBeenCalledWith("customers");
    expect(queryBuilder.upsert).toHaveBeenCalledWith(
      { email: "fan@example.com", name: "Jazz Fan" },
      { onConflict: "email" }
    );
  });

  // 8. Supabase insert fails → 500
  it("returns 500 when supabase insert fails", async () => {
    queryBuilder.insert.mockReturnValue({
      ...queryBuilder,
      then: vi.fn((resolve: (v: { error: { message: string } }) => void) =>
        Promise.resolve({ error: { message: "DB connection lost" } }).then(resolve)
      ),
    });

    const res = await POST(makeRequest({ email: "fan@example.com" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Failed to save");
  });

  // 9. Klaviyo failure → non-blocking, still returns success
  it("still returns success when Klaviyo fails", async () => {
    mockTrackEmailCapture.mockRejectedValueOnce(new Error("Klaviyo down"));

    const res = await POST(
      makeRequest({ email: "fan@example.com" })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});
