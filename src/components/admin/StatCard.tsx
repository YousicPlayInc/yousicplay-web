import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatCard({ label, value, change, changeType = "neutral" }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-navy-light p-6">
      <p className="text-sm uppercase tracking-wide text-white/60">{label}</p>
      <p className="mt-2 font-poppins text-3xl font-bold text-white">{value}</p>
      {change && (
        <div className="mt-2 flex items-center gap-1">
          {changeType === "positive" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 text-lime"
            >
              <path
                fillRule="evenodd"
                d="M8 3.293l4.354 4.353a.5.5 0 0 1-.708.708L8.5 5.207V12.5a.5.5 0 0 1-1 0V5.207L4.354 8.354a.5.5 0 1 1-.708-.708L8 3.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {changeType === "negative" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 text-red-400"
            >
              <path
                fillRule="evenodd"
                d="M8 12.707l4.354-4.353a.5.5 0 0 0-.708-.708L8.5 10.793V3.5a.5.5 0 0 0-1 0v7.293L4.354 7.646a.5.5 0 1 0-.708.708L8 12.707z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span
            className={cn(
              "text-sm font-medium",
              changeType === "positive" && "text-lime",
              changeType === "negative" && "text-red-400",
              changeType === "neutral" && "text-white/40"
            )}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
