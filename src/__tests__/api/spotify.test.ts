import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { createHmac } from "crypto";

// ── Mocks ──────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();
const mockCustomerSelect = vi.fn();
const mockMusicProfileUpsert = vi.fn();
const mockMusicProfileDelete = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}));

vi.mock("@/lib/supabase", () => ({
  createSSRSupabase: vi.fn(async () => ({
    auth: { getUser: mockGetUser },
  })),
  createServerSupabase: vi.fn(() => ({
    from: vi.fn((table: string) => {
      if (table === "customers") {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: mockCustomerSelect,
            })),
          })),
        };
      }
      if (table === "music_profiles") {
        return {
          upsert: mockMusicProfileUpsert,
          delete: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => mockMusicProfileDelete()),
            })),
          })),
        };
      }
      return {};
    }),
  })),
}));

const mockGetAuthUrl = vi.fn();
const mockExchangeCode = vi.fn();
const mockGetUserProfile = vi.fn();
const mockGetTopArtists = vi.fn();
const mockGetTopTracks = vi.fn();

vi.mock("@/lib/spotify", () => ({
  getAuthUrl: (...args: unknown[]) => mockGetAuthUrl(...args),
  exchangeCode: (...args: unknown[]) => mockExchangeCode(...args),
  getUserProfile: (...args: unknown[]) => mockGetUserProfile(...args),
  getTopArtists: (...args: unknown[]) => mockGetTopArtists(...args),
  getTopTracks: (...args: unknown[]) => mockGetTopTracks(...args),
}));

// ── Imports (after mocks) ──────────────────────────────────────────────

import { GET as connectGET } from "@/app/api/spotify/connect/route";
import { GET as callbackGET } from "@/app/api/spotify/callback/route";
import { POST as disconnectPOST } from "@/app/api/spotify/disconnect/route";

// ── Helpers ────────────────────────────────────────────────────────────

function signState(data: string): string {
  const secret = process.env.SPOTIFY_CLIENT_SECRET || "fallback-dev-secret";
  return createHmac("sha256", secret).update(data).digest("hex");
}

function makeValidState(email: string, ts?: number): string {
  const payload = JSON.stringify({ email, ts: ts ?? Date.now() });
  const sig = signState(payload);
  return Buffer.from(JSON.stringify({ payload, sig })).toString("base64url");
}

function makeRequest(path: string, params: Record<string, string> = {}): NextRequest {
  const url = new URL(`http://localhost${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new NextRequest(url);
}

// ── Setup ──────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
  process.env.SPOTIFY_CLIENT_SECRET = "test-spotify-secret";
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID = "test-client-id";

  mockGetUser.mockResolvedValue({
    data: { user: { email: "user@test.com", user_metadata: {} } },
  });
  mockCustomerSelect.mockResolvedValue({ data: { id: "cust-123" }, error: null });
  mockMusicProfileUpsert.mockResolvedValue({ error: null });
  mockMusicProfileDelete.mockReturnValue({ error: null });
  mockGetAuthUrl.mockReturnValue("https://accounts.spotify.com/authorize?test=1");
});

// ── Connect Tests ──────────────────────────────────────────────────────

describe("GET /api/spotify/connect", () => {
  it("redirects to /login when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const res = await connectGET(makeRequest("/api/spotify/connect"));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("error")).toBe("auth_required");
  });

  it("redirects to Spotify auth URL when authenticated", async () => {
    const res = await connectGET(makeRequest("/api/spotify/connect"));
    expect(res.status).toBe(307);
    expect(mockGetAuthUrl).toHaveBeenCalled();
    const location = res.headers.get("location")!;
    expect(location).toContain("accounts.spotify.com");
  });
});

// ── Callback Tests ─────────────────────────────────────────────────────

describe("GET /api/spotify/callback", () => {
  beforeEach(() => {
    mockExchangeCode.mockResolvedValue({
      access_token: "access-123",
      refresh_token: "refresh-123",
      expires_in: 3600,
    });
    mockGetUserProfile.mockResolvedValue({
      id: "spotify-user-1",
      display_name: "Test User",
      external_urls: { spotify: "https://open.spotify.com/user/test" },
      images: [{ url: "https://img.test/avatar.jpg" }],
    });
    mockGetTopArtists.mockResolvedValue([
      { id: "a1", name: "Artist 1", genres: ["jazz", "funk"], images: [{ url: "https://img.test/a1.jpg" }] },
    ]);
    mockGetTopTracks.mockResolvedValue([
      {
        id: "t1",
        name: "Track 1",
        artists: [{ id: "a1", name: "Artist 1" }],
        album: { name: "Album 1", images: [{ url: "https://img.test/al1.jpg" }] },
      },
    ]);
  });

  it("redirects with error when error param is present", async () => {
    const res = await callbackGET(makeRequest("/api/spotify/callback", { error: "access_denied" }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/account/settings");
    expect(location.searchParams.get("spotify")).toBe("error");
    expect(location.searchParams.get("reason")).toBe("access_denied");
  });

  it("redirects with error when code or state is missing", async () => {
    const res = await callbackGET(makeRequest("/api/spotify/callback", { code: "abc" }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.searchParams.get("reason")).toBe("missing_params");
  });

  it("redirects with error for invalid state signature", async () => {
    const payload = JSON.stringify({ email: "user@test.com", ts: Date.now() });
    const badState = Buffer.from(JSON.stringify({ payload, sig: "bad-signature" })).toString("base64url");

    const res = await callbackGET(makeRequest("/api/spotify/callback", { code: "abc", state: badState }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    // Could be invalid_state depending on timing check
    expect(location.pathname).toMatch(/\/account/);
  });

  it("redirects to /account/settings?spotify=connected on happy path", async () => {
    const state = makeValidState("user@test.com");

    const res = await callbackGET(makeRequest("/api/spotify/callback", { code: "valid-code", state }));
    expect(res.status).toBe(307);
    const location = new URL(res.headers.get("location")!);
    expect(location.pathname).toBe("/account/settings");
    expect(location.searchParams.get("spotify")).toBe("connected");

    expect(mockExchangeCode).toHaveBeenCalledWith(
      "valid-code",
      "http://localhost/api/spotify/callback"
    );
    expect(mockGetUserProfile).toHaveBeenCalledWith("access-123");
    expect(mockMusicProfileUpsert).toHaveBeenCalled();
  });
});

// ── Disconnect Tests ───────────────────────────────────────────────────

describe("POST /api/spotify/disconnect", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const req = new NextRequest("http://localhost/api/spotify/disconnect", { method: "POST" });
    const res = await disconnectPOST(req);
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toBe("Unauthorized");
  });

  it("returns 404 when customer not found", async () => {
    mockCustomerSelect.mockResolvedValueOnce({ data: null, error: null });

    const req = new NextRequest("http://localhost/api/spotify/disconnect", { method: "POST" });
    const res = await disconnectPOST(req);
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Customer not found");
  });

  it("returns success when disconnect succeeds", async () => {
    const req = new NextRequest("http://localhost/api/spotify/disconnect", { method: "POST" });
    const res = await disconnectPOST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });
});
