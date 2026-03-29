import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Flows | Admin | YousicPlay",
  robots: "noindex, nofollow",
};

// ── Types ────────────────────────────────────────────────────────────────

type Priority = "critical" | "important" | "nice-to-have";
type TestStatus = "not-tested" | "unit-tested" | "e2e-tested";
type System = "browser" | "stripe" | "supabase" | "klaviyo" | "spotify" | "email" | "vercel";

interface FlowStep {
  label: string;
  url?: string;
  description: string;
  systems: System[];
}

interface UserFlow {
  id: string;
  title: string;
  priority: Priority;
  testStatus: TestStatus;
  description: string;
  steps: FlowStep[];
  edgeCases: string[];
}

// ── Flow Data ────────────────────────────────────────────────────────────

const flows: UserFlow[] = [
  {
    id: "purchase",
    title: "New Visitor → Purchase",
    priority: "critical",
    testStatus: "unit-tested",
    description: "The money path. Visitor discovers a course and pays via Stripe.",
    steps: [
      { label: "Land on homepage", url: "/", description: "Visitor arrives from ad, search, or direct", systems: ["browser"] },
      { label: "Browse catalog", url: "/all-classes", description: "Filter and explore courses", systems: ["browser"] },
      { label: "View course", url: "/classes/[slug]", description: "Read description, watch trailer, see price", systems: ["browser"] },
      { label: "Click Buy", url: "/api/checkout", description: "API creates Stripe Checkout Session", systems: ["stripe"] },
      { label: "Stripe Checkout", description: "Customer enters payment info on Stripe-hosted page", systems: ["stripe"] },
      { label: "Payment succeeds", description: "Stripe fires checkout.session.completed webhook", systems: ["stripe"] },
      { label: "Webhook processes", url: "/api/webhooks/stripe", description: "Verify signature, check idempotency, upsert customer, record purchase", systems: ["supabase", "stripe"] },
      { label: "Klaviyo sync", description: "Track purchase event for email automation", systems: ["klaviyo"] },
      { label: "Success page", url: "/checkout/success", description: "Customer sees confirmation + link to course", systems: ["browser"] },
    ],
    edgeCases: [
      "Stripe Checkout page abandoned (no webhook fires)",
      "Webhook arrives but product not in DB → logged, returns 200",
      "Duplicate webhook (same payment_intent) → idempotency skip",
      "Klaviyo sync fails → non-blocking, purchase still recorded",
      "Customer already exists → upserted, not duplicated",
    ],
  },
  {
    id: "email-capture",
    title: "Email Capture",
    priority: "critical",
    testStatus: "unit-tested",
    description: "Lead generation. Visitor enters email in modal or footer form.",
    steps: [
      { label: "See email form", description: "Modal popup or footer form on any page", systems: ["browser"] },
      { label: "Enter email", description: "Optionally includes name and source tracking", systems: ["browser"] },
      { label: "Submit", url: "/api/email-capture", description: "Rate limited (5/min/IP), validates email format", systems: ["supabase"] },
      { label: "Store in DB", description: "Insert into email_captures table", systems: ["supabase"] },
      { label: "Klaviyo sync", description: "Push to Klaviyo for email sequences", systems: ["klaviyo"] },
      { label: "Success toast", description: "User sees confirmation message", systems: ["browser"] },
    ],
    edgeCases: [
      "Invalid email format → 400 error",
      "Rate limited → 429 (5 requests per minute per IP)",
      "Duplicate email → Supabase insert still succeeds (no unique constraint on email_captures)",
      "Klaviyo down → non-blocking, email still saved to DB",
      "Name provided → also upserts into customers table",
    ],
  },
  {
    id: "free-course",
    title: "Free Course Access",
    priority: "important",
    testStatus: "unit-tested",
    description: "Visitor claims a free course — no Stripe involved.",
    steps: [
      { label: "View free course", url: "/classes/[slug]", description: "Price shows as $0 / Free", systems: ["browser"] },
      { label: "Click Get Access", url: "/api/checkout", description: "Detects price=0, skips Stripe entirely", systems: ["browser"] },
      { label: "Redirect to player", url: "/learn/[slug]", description: "Direct redirect to course player", systems: ["browser"] },
      { label: "Watch lessons", url: "/learn/[slug]/0", description: "Full course access without payment", systems: ["browser", "supabase"] },
    ],
    edgeCases: [
      "User not logged in → redirect to login first, then back to course",
      "Free course bundled in paid bundle → accessible either way",
    ],
  },
  {
    id: "returning-user",
    title: "Returning User → Course Player",
    priority: "important",
    testStatus: "unit-tested",
    description: "Logged-in user accesses purchased courses and tracks progress.",
    steps: [
      { label: "Login", url: "/login", description: "Google OAuth or magic link", systems: ["browser", "supabase"] },
      { label: "My Courses", url: "/account", description: "See purchased + free courses with progress bars", systems: ["supabase"] },
      { label: "Enter course", url: "/learn/[slug]", description: "Layout verifies purchase access (direct or bundle)", systems: ["supabase"] },
      { label: "Watch lesson", url: "/learn/[slug]/0", description: "Video player with lesson sidebar", systems: ["browser"] },
      { label: "Mark complete", url: "/api/learn/progress", description: "POST to save progress, sidebar updates via CustomEvent", systems: ["supabase"] },
      { label: "Navigate lessons", description: "Click through sidebar, progress persists across sessions", systems: ["browser", "supabase"] },
    ],
    edgeCases: [
      "No customer record yet → auto-created on first progress save",
      "Purchase via bundle → access granted to all courses",
      "No purchases → empty state with 'Browse Classes' CTA",
      "Progress API cached for 60s (stale-while-revalidate)",
    ],
  },
  {
    id: "admin-login",
    title: "Admin Login → Dashboard",
    priority: "important",
    testStatus: "unit-tested",
    description: "Admin authenticates via magic link and views business metrics.",
    steps: [
      { label: "Visit admin", url: "/admin", description: "Proxy redirects unauthenticated users to /admin/login", systems: ["vercel"] },
      { label: "Enter email", url: "/admin/login", description: "Must be in admin whitelist", systems: ["browser"] },
      { label: "Receive magic link", description: "Supabase sends OTP email", systems: ["supabase", "email"] },
      { label: "Click link", url: "/api/auth/callback", description: "Exchanges code for session, syncs customer record", systems: ["supabase"] },
      { label: "Dashboard", url: "/admin", description: "Revenue, purchases, customers, email captures — all real-time from Supabase", systems: ["supabase"] },
    ],
    edgeCases: [
      "Email not in whitelist → proxy redirects to / after auth",
      "Magic link expired → user must request new one",
      "STRIPE_WEBHOOK_SECRET missing → dashboard still loads (purchases may be empty)",
    ],
  },
  {
    id: "account-management",
    title: "Account Management",
    priority: "nice-to-have",
    testStatus: "unit-tested",
    description: "User manages profile, name, and connected services.",
    steps: [
      { label: "Settings page", url: "/account/settings", description: "View profile info and connected accounts", systems: ["browser", "supabase"] },
      { label: "Update name", url: "/api/account/update", description: "Rate limited, updates both Supabase customer and auth metadata", systems: ["supabase"] },
      { label: "Connect Spotify", url: "/api/spotify/connect", description: "HMAC-signed state parameter, redirects to Spotify OAuth", systems: ["spotify"] },
      { label: "Spotify callback", url: "/api/spotify/callback", description: "Verifies signature, checks email match, saves music profile", systems: ["spotify", "supabase"] },
    ],
    edgeCases: [
      "Spotify state signature invalid → error redirect",
      "Spotify state expired (>10min) → error redirect",
      "Email mismatch between Spotify and YousicPlay account → error",
      "Disconnect Spotify → deletes music_profiles record",
    ],
  },
  {
    id: "checkout-failure",
    title: "Checkout Failure Recovery",
    priority: "important",
    testStatus: "not-tested",
    description: "User cancels or fails Stripe Checkout and can retry.",
    steps: [
      { label: "Start checkout", url: "/api/checkout", description: "Stripe session created with cancel_url", systems: ["stripe"] },
      { label: "Stripe page", description: "User sees payment form", systems: ["stripe"] },
      { label: "User cancels", description: "Clicks back or closes tab", systems: ["browser"] },
      { label: "Return to course", url: "/classes/[slug]", description: "Redirected to course page (cancel_url)", systems: ["browser"] },
      { label: "Retry", description: "User can click Buy again to start a new session", systems: ["browser"] },
    ],
    edgeCases: [
      "Payment declines → Stripe shows error, user stays on Stripe page",
      "Session expires (24h default) → user must start new checkout",
      "Tab closed without cancel → no redirect, user returns manually",
    ],
  },
  {
    id: "webhook-processing",
    title: "Webhook Processing (Backend)",
    priority: "critical",
    testStatus: "unit-tested",
    description: "Server-side flow when Stripe fires checkout.session.completed.",
    steps: [
      { label: "Stripe fires event", description: "POST to /api/webhooks/stripe with signed payload", systems: ["stripe"] },
      { label: "Verify signature", url: "/api/webhooks/stripe", description: "constructEvent() with STRIPE_WEBHOOK_SECRET", systems: ["stripe"] },
      { label: "Check event type", description: "Only process checkout.session.completed, ack others with 200", systems: ["vercel"] },
      { label: "Validate session", description: "Require email, slug, itemType, payment_intent — log and skip if missing", systems: ["vercel"] },
      { label: "Idempotency check", description: "Look up payment_intent in purchases table — skip if exists", systems: ["supabase"] },
      { label: "Upsert customer", description: "Create/update customer with email, name, stripe_customer_id", systems: ["supabase"] },
      { label: "Find product", description: "Look up product by slug — throw if not found", systems: ["supabase"] },
      { label: "Record purchase", description: "Insert into purchases with customer_id, product_id, amount, status=completed", systems: ["supabase"] },
      { label: "Klaviyo sync", description: "Track purchase event (non-blocking, wrapped in try/catch)", systems: ["klaviyo"] },
      { label: "Return 200", description: "Always return 200 to Stripe to prevent retries", systems: ["vercel"] },
    ],
    edgeCases: [
      "Missing stripe-signature header → 400",
      "STRIPE_WEBHOOK_SECRET not configured → 500",
      "Invalid signature → 400",
      "Duplicate payment_intent → skip silently, return 200",
      "Product not found in DB → error logged, return 200",
      "Customer upsert fails → error thrown",
      "Klaviyo fails → non-blocking, purchase still recorded",
    ],
  },
];

// ── Component ────────────────────────────────────────────────────────────

export default function UserFlowsPage() {
  const criticalCount = flows.filter((f) => f.priority === "critical").length;
  const testedCount = flows.filter((f) => f.testStatus !== "not-tested").length;

  return (
    <div className="min-h-screen bg-navy">
      <MaxWidthWrapper>
        <div className="py-10">
          {/* Header */}
          <div className="mb-2">
            <Link href="/admin" className="text-xs text-white/40 hover:text-white/60">
              &larr; Back to Dashboard
            </Link>
          </div>
          <h1 className="font-serif text-3xl text-cream">User Flows</h1>
          <p className="mt-2 text-sm text-white/50">
            Every path a user can take through the site. Use this to decide which flows need E2E tests.
          </p>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-navy-light p-4">
              <p className="text-2xl font-bold text-white">{flows.length}</p>
              <p className="text-xs uppercase tracking-wide text-white/40">Total Flows</p>
            </div>
            <div className="rounded-xl bg-navy-light p-4">
              <p className="text-2xl font-bold text-red-400">{criticalCount}</p>
              <p className="text-xs uppercase tracking-wide text-white/40">Critical</p>
            </div>
            <div className="rounded-xl bg-navy-light p-4">
              <p className="text-2xl font-bold text-lime">{testedCount}</p>
              <p className="text-xs uppercase tracking-wide text-white/40">Have Tests</p>
            </div>
            <div className="rounded-xl bg-navy-light p-4">
              <p className="text-2xl font-bold text-amber-400">{flows.length - testedCount}</p>
              <p className="text-xs uppercase tracking-wide text-white/40">No Tests</p>
            </div>
          </div>

          {/* Flow cards */}
          <div className="mt-10 space-y-8">
            {flows.map((flow) => (
              <FlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

// ── Flow Card ────────────────────────────────────────────────────────────

function FlowCard({ flow }: { flow: UserFlow }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light">
      {/* Card header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-6 py-4">
        <h2 className="font-poppins text-lg font-semibold text-white">{flow.title}</h2>
        <PriorityBadge priority={flow.priority} />
        <TestStatusBadge status={flow.testStatus} />
      </div>

      {/* Description */}
      <div className="px-6 pt-4">
        <p className="text-sm text-white/60">{flow.description}</p>
      </div>

      {/* Steps */}
      <div className="px-6 py-4">
        <div className="space-y-0">
          {flow.steps.map((step, i) => (
            <div key={`${flow.id}-step-${i}`} className="flex gap-4">
              {/* Step number + connector line */}
              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime/10 text-xs font-bold text-lime">
                  {i + 1}
                </div>
                {i < flow.steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/10" />
                )}
              </div>

              {/* Step content */}
              <div className="pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-white">{step.label}</span>
                  {step.url && (
                    <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-lime/70">
                      {step.url}
                    </code>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-white/40">{step.description}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {step.systems.map((sys) => (
                    <SystemBadge key={`${flow.id}-${i}-${sys}`} system={sys} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge cases */}
      {flow.edgeCases.length > 0 && (
        <div className="border-t border-white/10 px-6 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/30">
            Edge Cases &amp; Failure Modes
          </p>
          <ul className="space-y-1">
            {flow.edgeCases.map((ec, i) => (
              <li key={`${flow.id}-ec-${i}`} className="flex gap-2 text-xs text-white/50">
                <span className="mt-0.5 text-amber-400/60">!</span>
                {ec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Badge Components ─────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: Priority }) {
  const styles = {
    critical: "bg-red-500/20 text-red-400",
    important: "bg-amber-500/20 text-amber-400",
    "nice-to-have": "bg-white/10 text-white/50",
  };

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[priority]}`}>
      {priority === "nice-to-have" ? "Nice to have" : priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function TestStatusBadge({ status }: { status: TestStatus }) {
  const styles = {
    "not-tested": "bg-red-500/10 text-red-400/70",
    "unit-tested": "bg-lime/10 text-lime/70",
    "e2e-tested": "bg-lime/20 text-lime",
  };
  const labels = {
    "not-tested": "No tests",
    "unit-tested": "Unit tested",
    "e2e-tested": "E2E tested",
  };

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function SystemBadge({ system }: { system: System }) {
  const styles: Record<System, string> = {
    browser: "bg-white/10 text-white/60",
    stripe: "bg-green-500/15 text-green-400",
    supabase: "bg-blue-500/15 text-blue-400",
    klaviyo: "bg-purple-500/15 text-purple-400",
    spotify: "bg-green-500/15 text-green-300",
    email: "bg-amber-500/15 text-amber-400",
    vercel: "bg-lime/10 text-lime/70",
  };

  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${styles[system]}`}>
      {system.charAt(0).toUpperCase() + system.slice(1)}
    </span>
  );
}
