import { cn } from "@/lib/utils";

export interface RecentPurchase {
  id: string;
  email: string;
  productName: string;
  amount: number; // already in dollars
  date: string;
}

interface RecentPurchasesProps {
  purchases: RecentPurchase[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentPurchases({ purchases }: RecentPurchasesProps) {
  if (purchases.length === 0) {
    return (
      <div>
        <h2 className="mb-4 font-serif text-xl text-cream">Recent Purchases</h2>
        <div className="rounded-xl bg-navy-light p-8 text-center">
          <p className="text-sm text-white/50">No purchases yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-serif text-xl text-cream">Recent Purchases</h2>
      <div className="overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-navy-light text-xs uppercase tracking-wide text-white/50">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 text-right font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, i) => (
              <tr
                key={purchase.id}
                className={cn(
                  "border-t border-white/5 text-white/80",
                  i % 2 === 0 ? "bg-navy-light" : "bg-navy-light/70"
                )}
              >
                <td className="px-4 py-3 text-white">{purchase.email}</td>
                <td className="px-4 py-3">{purchase.productName}</td>
                <td className="px-4 py-3 text-right text-lime">
                  ${purchase.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right text-white/50">
                  {formatDate(purchase.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
