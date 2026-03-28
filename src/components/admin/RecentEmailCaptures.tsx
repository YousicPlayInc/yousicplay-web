import { cn } from "@/lib/utils";

export interface RecentEmailCapture {
  id: string;
  email: string;
  source: string | null;
  pageUrl: string | null;
  date: string;
}

interface RecentEmailCapturesProps {
  captures: RecentEmailCapture[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentEmailCaptures({ captures }: RecentEmailCapturesProps) {
  if (captures.length === 0) {
    return (
      <div>
        <h2 className="mb-4 font-serif text-xl text-cream">Recent Email Captures</h2>
        <div className="rounded-xl bg-navy-light p-8 text-center">
          <p className="text-sm text-white/50">No email captures yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-serif text-xl text-cream">Recent Email Captures</h2>
      <div className="overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-navy-light text-xs uppercase tracking-wide text-white/50">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Page</th>
              <th className="px-4 py-3 text-right font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {captures.map((capture, i) => (
              <tr
                key={capture.id}
                className={cn(
                  "border-t border-white/5 text-white/80",
                  i % 2 === 0 ? "bg-navy-light" : "bg-navy-light/70"
                )}
              >
                <td className="px-4 py-3 text-white">{capture.email}</td>
                <td className="px-4 py-3">{capture.source ?? "—"}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-white/50">
                  {capture.pageUrl ?? "—"}
                </td>
                <td className="px-4 py-3 text-right text-white/50">
                  {formatDate(capture.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
