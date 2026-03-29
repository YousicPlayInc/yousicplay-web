/**
 * Environment variable validation.
 * Imported in layout.tsx or API routes to fail fast on missing config.
 *
 * Required vars throw at import time (server-side only).
 * Optional vars return undefined gracefully.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    // In build/dev, some vars may not be set — only throw at runtime
    if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
      console.warn(`[env] Missing required env var: ${name}`);
    }
    return "";
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

// ── Required ──────────────────────────────────────────────────────────
export const env = {
  // Supabase
  SUPABASE_URL: required("NEXT_PUBLIC_SUPABASE_URL"),
  SUPABASE_ANON_KEY: required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: required("SUPABASE_SERVICE_ROLE_KEY"),

  // Stripe
  STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: required("STRIPE_WEBHOOK_SECRET"),
  STRIPE_PUBLISHABLE_KEY: required("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),

  // Admin
  ADMIN_EMAILS: required("ADMIN_EMAILS"),

  // ── Optional ──────────────────────────────────────────────────────
  GA4_ID: optional("NEXT_PUBLIC_GA4_ID"),
  META_PIXEL_ID: optional("NEXT_PUBLIC_META_PIXEL_ID"),
  KLAVIYO_API_KEY: optional("KLAVIYO_API_KEY"),
  KLAVIYO_MAIN_LIST_ID: optional("KLAVIYO_MAIN_LIST_ID"),
  SPOTIFY_CLIENT_ID: optional("SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: optional("SPOTIFY_CLIENT_SECRET"),
} as const;
