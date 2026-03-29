import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockUpsert = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createSSRSupabase: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
      updateUser: mockUpdateUser,
    },
  })),
  createServerSupabase: vi.fn(() => ({
    from: () => ({ upsert: mockUpsert }),
  })),
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 4 })),
  getClientIP: vi.fn(() => "127.0.0.1"),
}));

import { rateLimit } from "@/lib/rate-limit";
import { POST } from "@/app/api/account/update/route";

// ── Helpers ────────────────────────────────────────────────────────────

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/account/update", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Tests ──────────────────────────────────────────────────────────────

describe("POST /api/account/update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({ data: { user: { email: "user@test.com" } } });
    mockUpdateUser.mockResolvedValue({ data: {}, error: null });
    mockUpsert.mockResolvedValue({ error: null });
  });

  it("returns 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockReturnValueOnce({ success: false, remaining: 0 });

    const res = await POST(makeRequest({ name: "Test" }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toBe("Too many requests");
  });

  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const res = await POST(makeRequest({ name: "Test" }));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Not authenticated");
  });

  it("returns 400 when name is missing from body", async () => {
    const res = await POST(makeRequest({ foo: "bar" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid name");
  });

  it("returns 400 when name is not a string", async () => {
    const res = await POST(makeRequest({ name: 123 }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid name");
  });

  it("upserts customer and returns success for valid name", async () => {
    const res = await POST(makeRequest({ name: "Justin Pease" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    expect(mockUpsert).toHaveBeenCalledWith(
      { email: "user@test.com", name: "Justin Pease" },
      { onConflict: "email" }
    );
    expect(mockUpdateUser).toHaveBeenCalledWith({
      data: { full_name: "Justin Pease" },
    });
  });

  it("trims whitespace from name", async () => {
    const res = await POST(makeRequest({ name: "  Justin  " }));
    expect(res.status).toBe(200);

    expect(mockUpsert).toHaveBeenCalledWith(
      { email: "user@test.com", name: "Justin" },
      { onConflict: "email" }
    );
  });

  it("returns 500 when customer upsert fails", async () => {
    mockUpsert.mockResolvedValueOnce({ error: { message: "DB error" } });

    const res = await POST(makeRequest({ name: "Test" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("Failed to update profile");
  });
});
