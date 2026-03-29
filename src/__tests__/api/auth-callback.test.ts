import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────────

const mockExchangeCodeForSession = vi.fn();
const mockGetUser = vi.fn();
const mockAdminUpsert = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
      getUser: mockGetUser,
    },
  })),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: () => ({
      upsert: mockAdminUpsert,
    }),
  })),
}));

import { GET } from "@/app/api/auth/callback/route";

// ── Helpers ────────────────────────────────────────────────────────────

function makeRequest(params: Record<string, string> = {}): NextRequest {
  const url = new URL("http://localhost/api/auth/callback");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new NextRequest(url);
}

// ── Tests ──────────────────────────────────────────────────────────────

describe("GET /api/auth/callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";

    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-123",
          email: "user@test.com",
          user_metadata: { full_name: "Test User" },
        },
      },
    });
    mockAdminUpsert.mockResolvedValue({ error: null });
  });

  it("redirects to /login?error=auth_failed when code is missing", async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("error")).toBe("auth_failed");
  });

  it("exchanges session and redirects to the redirect param on success", async () => {
    const res = await GET(makeRequest({ code: "auth-code-123", redirect: "/account" }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/account");

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("auth-code-123");
  });

  it("defaults redirect to / when no redirect param is provided", async () => {
    const res = await GET(makeRequest({ code: "auth-code-123" }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/");
  });

  it("redirects to /login?error=auth_failed when exchange fails", async () => {
    mockExchangeCodeForSession.mockResolvedValueOnce({
      error: { message: "Invalid code" },
    });

    const res = await GET(makeRequest({ code: "bad-code" }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("error")).toBe("auth_failed");
  });

  it("syncs user email to customers table after successful exchange", async () => {
    await GET(makeRequest({ code: "auth-code-123" }));

    expect(mockAdminUpsert).toHaveBeenCalledWith(
      {
        id: "user-123",
        email: "user@test.com",
        name: "Test User",
      },
      { onConflict: "email" }
    );
  });

  it("skips customer sync when user has no email", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-123", email: null, user_metadata: {} } },
    });

    await GET(makeRequest({ code: "auth-code-123" }));
    expect(mockAdminUpsert).not.toHaveBeenCalled();
  });
});
