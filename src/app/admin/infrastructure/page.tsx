import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure | Admin | YousicPlay",
  robots: "noindex",
};

interface Service {
  name: string;
  description: string;
  url: string;
  envVars: { name: string; scope: "server" | "client" | "both"; description: string }[];
  status: "active" | "configured" | "pending";
  category: "core" | "payments" | "marketing" | "auth" | "media" | "analytics";
}

const services: Service[] = [
  {
    name: "Supabase",
    description: "Database, authentication, and real-time backend. Stores customers, purchases, products, progress, and email captures.",
    url: "https://app.supabase.com",
    category: "core",
    status: "active",
    envVars: [
      { name: "NEXT_PUBLIC_SUPABASE_URL", scope: "client", description: "Project API URL" },
      { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", scope: "client", description: "Public anonymous key (RLS enforced)" },
      { name: "SUPABASE_SERVICE_ROLE_KEY", scope: "server", description: "Admin key — bypasses RLS. Never expose client-side." },
    ],
  },
  {
    name: "Vercel",
    description: "Hosting and deployment. Auto-deploys from GitHub on push to main. Env vars configured per environment.",
    url: "https://vercel.com/dashboard",
    category: "core",
    status: "active",
    envVars: [
      { name: "ADMIN_EMAILS", scope: "server", description: "Comma-separated emails allowed to access /admin" },
    ],
  },
  {
    name: "Stripe",
    description: "Payment processing. Handles checkout sessions, webhooks for purchase recording, and customer management.",
    url: "https://dashboard.stripe.com",
    category: "payments",
    status: "configured",
    envVars: [
      { name: "STRIPE_SECRET_KEY", scope: "server", description: "Server-side API key (use sk_test_ for dev, sk_live_ for prod)" },
      { name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", scope: "client", description: "Client-side key (use pk_test_ for dev, pk_live_ for prod)" },
      { name: "STRIPE_WEBHOOK_SECRET", scope: "server", description: "Webhook signing secret — verify events are from Stripe" },
    ],
  },
  {
    name: "Google OAuth",
    description: "Sign in with Google for user authentication. Configured through Google Cloud Console, credentials stored in Supabase Auth.",
    url: "https://console.cloud.google.com/apis/credentials",
    category: "auth",
    status: "configured",
    envVars: [
      { name: "(in Supabase)", scope: "server", description: "Client ID and Secret are stored in Supabase Auth Providers, not as env vars" },
    ],
  },
  {
    name: "Spotify",
    description: "OAuth integration for music profiles. Users connect their Spotify to see top artists, genres, and tracks.",
    url: "https://developer.spotify.com/dashboard",
    category: "auth",
    status: "configured",
    envVars: [
      { name: "SPOTIFY_CLIENT_ID", scope: "server", description: "Server-side client ID for token exchange" },
      { name: "SPOTIFY_CLIENT_SECRET", scope: "server", description: "Server-side client secret" },
      { name: "NEXT_PUBLIC_SPOTIFY_CLIENT_ID", scope: "client", description: "Client-side ID for OAuth URL construction" },
    ],
  },
  {
    name: "Klaviyo",
    description: "Email marketing and automation. Syncs customer profiles, tracks purchases and email captures, manages email lists.",
    url: "https://www.klaviyo.com/dashboard",
    category: "marketing",
    status: "configured",
    envVars: [
      { name: "KLAVIYO_API_KEY", scope: "server", description: "Private API key for server-side operations" },
      { name: "KLAVIYO_MAIN_LIST_ID", scope: "server", description: "Default list ID for new email signups (optional)" },
    ],
  },
  {
    name: "Google Analytics (GA4)",
    description: "Web analytics. Tracks page views, course views, checkout events, and purchases.",
    url: "https://analytics.google.com",
    category: "analytics",
    status: "configured",
    envVars: [
      { name: "NEXT_PUBLIC_GA4_ID", scope: "client", description: "Measurement ID (G-XXXXXXXXXX)" },
    ],
  },
  {
    name: "Meta Pixel",
    description: "Facebook/Instagram ad tracking. Tracks ViewContent, InitiateCheckout, Purchase events for ad optimization.",
    url: "https://business.facebook.com",
    category: "analytics",
    status: "pending",
    envVars: [
      { name: "NEXT_PUBLIC_META_PIXEL_ID", scope: "client", description: "Pixel ID from Meta Business Suite" },
    ],
  },
  {
    name: "Wistia",
    description: "Video hosting for course lessons. 467 videos hosted. Video IDs are mapped to lessons in courses.ts.",
    url: "https://my.wistia.com",
    category: "media",
    status: "pending",
    envVars: [],
  },
  {
    name: "GitHub",
    description: "Source code repository. Auto-deploys to Vercel on push to main branch.",
    url: "https://github.com/YousicPlayInc/yousicplay-web",
    category: "core",
    status: "active",
    envVars: [],
  },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  core: { label: "Core", color: "bg-lime/20 text-lime" },
  payments: { label: "Payments", color: "bg-green-500/20 text-green-400" },
  marketing: { label: "Marketing", color: "bg-purple-500/20 text-purple-400" },
  auth: { label: "Auth", color: "bg-blue-500/20 text-blue-400" },
  media: { label: "Media", color: "bg-orange-500/20 text-orange-400" },
  analytics: { label: "Analytics", color: "bg-yellow-500/20 text-yellow-400" },
};

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-lime/20 text-lime" },
  configured: { label: "Configured", color: "bg-blue-500/20 text-blue-400" },
  pending: { label: "Needs Setup", color: "bg-red-500/20 text-red-400" },
};

export default function InfrastructurePage() {
  const activeCount = services.filter((s) => s.status === "active").length;
  const configuredCount = services.filter((s) => s.status === "configured").length;
  const pendingCount = services.filter((s) => s.status === "pending").length;
  const totalEnvVars = services.reduce((sum, s) => sum + s.envVars.filter((v) => !v.name.startsWith("(")).length, 0);

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-white/10 py-8">
        <MaxWidthWrapper>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/40 hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">Infrastructure</h1>
              <p className="mt-1 text-sm text-white/50">
                Every service, dashboard, and environment variable in one place.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Summary */}
      <section className="py-6">
        <MaxWidthWrapper>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-lg bg-navy-light px-4 py-2 text-sm">
              <span className="text-white/50">Services:</span>{" "}
              <span className="font-semibold text-white">{services.length}</span>
            </div>
            <div className="rounded-lg bg-navy-light px-4 py-2 text-sm">
              <span className="text-white/50">Active:</span>{" "}
              <span className="font-semibold text-lime">{activeCount}</span>
            </div>
            <div className="rounded-lg bg-navy-light px-4 py-2 text-sm">
              <span className="text-white/50">Configured:</span>{" "}
              <span className="font-semibold text-blue-400">{configuredCount}</span>
            </div>
            <div className="rounded-lg bg-navy-light px-4 py-2 text-sm">
              <span className="text-white/50">Needs Setup:</span>{" "}
              <span className="font-semibold text-red-400">{pendingCount}</span>
            </div>
            <div className="rounded-lg bg-navy-light px-4 py-2 text-sm">
              <span className="text-white/50">Env Vars:</span>{" "}
              <span className="font-semibold text-white">{totalEnvVars}</span>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Service Cards */}
      <section className="pb-12">
        <MaxWidthWrapper>
          <div className="grid gap-4 lg:grid-cols-2">
            {services.map((service) => {
              const cat = categoryLabels[service.category];
              const stat = statusLabels[service.status];

              return (
                <div
                  key={service.name}
                  className="rounded-2xl border border-white/10 bg-navy-light p-5"
                >
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-poppins text-base font-semibold text-white">
                          {service.name}
                        </h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cat.color}`}>
                          {cat.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">
                        {service.description}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${stat.color}`}>
                      {stat.label}
                    </span>
                  </div>

                  {/* Dashboard Link */}
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 inline-flex items-center gap-1 text-xs text-lime hover:underline"
                  >
                    Open Dashboard
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* Env Vars */}
                  {service.envVars.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                        Environment Variables
                      </p>
                      {service.envVars.map((v) => (
                        <div
                          key={v.name}
                          className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-1.5"
                        >
                          <code className="shrink-0 text-[11px] text-lime/80">
                            {v.name}
                          </code>
                          <span className="text-[10px] text-white/40">
                            {v.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Note */}
      <footer className="border-t border-white/10 py-6">
        <MaxWidthWrapper>
          <p className="text-center text-xs text-white/30">
            Env vars are set in Vercel (Settings &rarr; Environment Variables). Use test keys locally, live keys in production.
            <br />
            Note: Spotify credentials are currently on Justin&apos;s personal account &mdash; swap to YousicPlay company account before launch.
          </p>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}
