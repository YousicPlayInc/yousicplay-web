import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import StatCard from "@/components/admin/StatCard";
import TopProducts from "@/components/admin/TopProducts";
import QuickLinks from "@/components/admin/QuickLinks";
import RecentPurchases from "@/components/admin/RecentPurchases";
import RecentEmailCaptures from "@/components/admin/RecentEmailCaptures";
import { createServerSupabase } from "@/lib/supabase";
import type { RecentPurchase } from "@/components/admin/RecentPurchases";
import type { RecentEmailCapture } from "@/components/admin/RecentEmailCaptures";

// Force dynamic rendering — admin data should always be fresh
export const dynamic = "force-dynamic";

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

async function getAdminStats() {
  const supabase = createServerSupabase();

  // Run all stat queries in parallel
  const [
    customersResult,
    purchasesResult,
    revenueResult,
    emailCapturesResult,
  ] = await Promise.all([
    supabase.from("customers").select("*", { count: "exact", head: true }),
    supabase
      .from("purchases")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed"),
    supabase
      .from("purchases")
      .select("amount")
      .eq("status", "completed"),
    supabase.from("email_captures").select("*", { count: "exact", head: true }),
  ]);

  const totalCustomers = customersResult.count ?? 0;
  const totalPurchases = purchasesResult.count ?? 0;
  const totalRevenueCents = (revenueResult.data ?? []).reduce(
    (sum, row) => sum + (row.amount ?? 0),
    0
  );
  const totalEmailCaptures = emailCapturesResult.count ?? 0;
  const avgOrderCents =
    totalPurchases > 0 ? Math.round(totalRevenueCents / totalPurchases) : 0;

  return {
    totalCustomers,
    totalPurchases,
    totalRevenueCents,
    totalEmailCaptures,
    avgOrderCents,
  };
}

async function getTopProducts() {
  const supabase = createServerSupabase();

  // Get completed purchases grouped by product, joined with product name
  const { data: purchases } = await supabase
    .from("purchases")
    .select("amount, product_id, products(name)")
    .eq("status", "completed");

  if (!purchases || purchases.length === 0) return [];

  // Aggregate by product
  const productMap = new Map<
    string,
    { name: string; sales: number; revenueCents: number }
  >();

  for (const p of purchases) {
    const productId = p.product_id;
    // products is a joined object — Supabase returns it as an object (not array) for single FK
    const productName =
      (p.products as unknown as { name: string } | null)?.name ?? "Unknown";

    const existing = productMap.get(productId);
    if (existing) {
      existing.sales += 1;
      existing.revenueCents += p.amount;
    } else {
      productMap.set(productId, {
        name: productName,
        sales: 1,
        revenueCents: p.amount,
      });
    }
  }

  // Sort by revenue descending, take top 5
  return Array.from(productMap.values())
    .sort((a, b) => b.revenueCents - a.revenueCents)
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      sales: p.sales,
      revenue: formatCurrency(p.revenueCents),
    }));
}

async function getRecentPurchases(): Promise<RecentPurchase[]> {
  const supabase = createServerSupabase();

  const { data } = await supabase
    .from("purchases")
    .select("id, amount, created_at, customers(email), products(name)")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!data) return [];

  return data.map((row) => ({
    id: row.id,
    email:
      (row.customers as unknown as { email: string } | null)?.email ??
      "Unknown",
    productName:
      (row.products as unknown as { name: string } | null)?.name ?? "Unknown",
    amount: row.amount / 100, // cents to dollars
    date: row.created_at,
  }));
}

async function getRecentEmailCaptures(): Promise<RecentEmailCapture[]> {
  const supabase = createServerSupabase();

  const { data } = await supabase
    .from("email_captures")
    .select("id, email, source, page_url, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (!data) return [];

  return data.map((row) => ({
    id: row.id,
    email: row.email,
    source: row.source,
    pageUrl: row.page_url,
    date: row.created_at,
  }));
}

export default async function AdminDashboardPage() {
  const [stats, topProducts, recentPurchases, recentEmailCaptures] =
    await Promise.all([
      getAdminStats(),
      getTopProducts(),
      getRecentPurchases(),
      getRecentEmailCaptures(),
    ]);

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="border-b border-white/10 py-8">
        <MaxWidthWrapper>
          <h1 className="font-serif text-3xl font-bold text-white">
            YousicPlay Admin
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Welcome back. Here is your business summary.
          </p>
        </MaxWidthWrapper>
      </header>

      {/* Stats Grid */}
      <section className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Revenue"
              value={formatCurrency(stats.totalRevenueCents)}
            />
            <StatCard
              label="Purchases"
              value={stats.totalPurchases.toLocaleString()}
            />
            <StatCard
              label="Customers"
              value={stats.totalCustomers.toLocaleString()}
            />
            <StatCard
              label="Email Captures"
              value={stats.totalEmailCaptures.toLocaleString()}
            />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Top Products & Quick Links */}
      <section className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <TopProducts products={topProducts} />
            <QuickLinks />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Recent Activity */}
      <section className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <RecentPurchases purchases={recentPurchases} />
            <RecentEmailCaptures captures={recentEmailCaptures} />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6">
        <MaxWidthWrapper>
          <p className="text-center text-xs text-white/30">
            Data refreshes on page load. For real-time data, use the tools above.
          </p>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}
