import { cn } from "@/lib/utils";

interface TopProductsProps {
  products: { name: string; sales: number; revenue: string }[];
}

export default function TopProducts({ products }: TopProductsProps) {
  if (products.length === 0) {
    return (
      <div>
        <h2 className="mb-4 font-serif text-xl text-cream">Top Products</h2>
        <div className="rounded-xl bg-navy-light p-8 text-center">
          <p className="text-sm text-white/50">No purchases yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-serif text-xl text-cream">Top Products</h2>
      <div className="overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-navy-light text-xs uppercase tracking-wide text-white/50">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 text-right font-medium">Sales</th>
              <th className="px-4 py-3 text-right font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.name}
                className={cn(
                  "border-t border-white/5 text-white/80",
                  i % 2 === 0 ? "bg-navy-light" : "bg-navy-light/70"
                )}
              >
                <td className="px-4 py-3 font-medium text-white">{product.name}</td>
                <td className="px-4 py-3 text-right">{product.sales}</td>
                <td className="px-4 py-3 text-right text-lime">{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
