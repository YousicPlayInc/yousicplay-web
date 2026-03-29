import { describe, it, expect, vi, beforeEach } from "vitest";

describe("env", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("env object has expected required keys", async () => {
    const { env } = await import("@/lib/env");

    const requiredKeys = [
      "SUPABASE_URL",
      "SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "STRIPE_PUBLISHABLE_KEY",
      "ADMIN_EMAILS",
    ];

    for (const key of requiredKeys) {
      expect(env).toHaveProperty(key);
    }
  });

  it("env object has expected optional keys", async () => {
    const { env } = await import("@/lib/env");

    const optionalKeys = [
      "GA4_ID",
      "META_PIXEL_ID",
      "KLAVIYO_API_KEY",
      "KLAVIYO_MAIN_LIST_ID",
      "SPOTIFY_CLIENT_ID",
      "SPOTIFY_CLIENT_SECRET",
    ];

    for (const key of optionalKeys) {
      expect(env).toHaveProperty(key);
    }
  });

  it("required function warns when var is missing", async () => {
    // Ensure the env vars are NOT set so the warning fires
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Set NODE_ENV to something other than "test" so the warning fires
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Re-import to trigger the required() calls
    await import("@/lib/env");

    expect(warnSpy).toHaveBeenCalled();
    // Check that at least one call mentions a missing env var
    const calls = warnSpy.mock.calls.map((c) => c[0] as string);
    expect(calls.some((msg) => msg.includes("[env] Missing required env var"))).toBe(true);

    warnSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
  });
});
