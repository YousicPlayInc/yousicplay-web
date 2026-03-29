import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}));

import { proxy } from "@/proxy";

// ── Helpers ────────────────────────────────────────────────────────────

function makeRequest(path: string): NextRequest {
  const url = new URL(`http://localhost${path}`);
  return new NextRequest(url);
}

// ── Setup ──────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  process.env.ADMIN_EMAILS = "admin@test.com";
});

// ── Tests ──────────────────────────────────────────────────────────────

describe("proxy", () => {
  describe("/admin routes", () => {
    it("redirects to /admin/login when user is not authenticated", async () => {
      mockGetUser.mockResolvedValueOnce({ data: { user: null } });

      const res = await proxy(makeRequest("/admin"));
      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/admin/login");
    });

    it("redirects to / when user email is not in ADMIN_EMAILS", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: { email: "notadmin@test.com" } },
      });

      const res = await proxy(makeRequest("/admin"));
      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/");
    });

    it("passes through when user is in the admin whitelist", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: { email: "admin@test.com" } },
      });

      const res = await proxy(makeRequest("/admin"));
      // NextResponse.next() does not set a location header
      expect(res.headers.get("location")).toBeNull();
      // It should not be a redirect
      expect(res.status).toBe(200);
    });

    it("passes through for /admin/login without auth check", async () => {
      mockGetUser.mockResolvedValueOnce({ data: { user: null } });

      const res = await proxy(makeRequest("/admin/login"));
      // /admin/login is excluded from auth check, so it should pass through
      expect(res.headers.get("location")).toBeNull();
      expect(res.status).toBe(200);
    });

    it("is case-insensitive for admin email check", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: { email: "Admin@Test.com" } },
      });

      const res = await proxy(makeRequest("/admin/dashboard"));
      expect(res.headers.get("location")).toBeNull();
      expect(res.status).toBe(200);
    });
  });

  describe("/learn routes", () => {
    it("redirects to /login with redirect param when user is not authenticated", async () => {
      mockGetUser.mockResolvedValueOnce({ data: { user: null } });

      const res = await proxy(makeRequest("/learn/test-course"));
      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/login");
      expect(location.searchParams.get("redirect")).toBe("/learn/test-course");
    });

    it("passes through when user is authenticated", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: { email: "user@test.com" } },
      });

      const res = await proxy(makeRequest("/learn/test-course"));
      expect(res.headers.get("location")).toBeNull();
      expect(res.status).toBe(200);
    });
  });
});
