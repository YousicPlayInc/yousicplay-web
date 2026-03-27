import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import StatCard from "@/components/admin/StatCard";
import TopProducts from "@/components/admin/TopProducts";
import QuickLinks from "@/components/admin/QuickLinks";

const mockProducts = [
  { name: "ALL Course Bundle", sales: 18, revenue: "$1,782" },
  { name: "The Art of Soloing", sales: 9, revenue: "$891" },
  { name: "Piano Bundle", sales: 5, revenue: "$1,995" },
  { name: "Gospel Piano Mastery", sales: 4, revenue: "$316" },
  { name: "Blues Guitar", sales: 3, revenue: "$237" },
];

export default function AdminDashboardPage() {
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
              label="Revenue This Month"
              value="$4,230"
              change="+23%"
              changeType="positive"
            />
            <StatCard
              label="Purchases"
              value="47"
              change="+12%"
              changeType="positive"
            />
            <StatCard
              label="Email Captures"
              value="156"
              change="+34%"
              changeType="positive"
            />
            <StatCard
              label="Avg Order Value"
              value="$90"
              change="-2%"
              changeType="negative"
            />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Products & Quick Links */}
      <section className="py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <TopProducts products={mockProducts} />
            <QuickLinks />
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
