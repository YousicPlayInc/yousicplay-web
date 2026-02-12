import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { cn } from "@/lib/utils";

interface ValuePropItem {
  title: string;
  description: string;
}

interface ValuePropositionGridProps {
  heading?: string;
  items: ValuePropItem[];
  variant?: "dark" | "light";
}

export default function ValuePropositionGrid({
  heading,
  items,
  variant = "light",
}: ValuePropositionGridProps) {
  const isDark = variant === "dark";

  return (
    <section className={cn("py-20", isDark ? "bg-navy" : "bg-cream")}>
      <MaxWidthWrapper>
        {heading && (
          <h2
            className={cn(
              "mb-14 text-center font-poppins text-3xl font-bold uppercase tracking-tight sm:text-4xl",
              isDark ? "text-white" : "text-navy"
            )}
          >
            {heading}
          </h2>
        )}
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col items-center text-center px-6 py-8",
                isDark && "bg-navy-light rounded-2xl"
              )}
            >
              {/* Hand-drawn purple circle decoration */}
              <div className="relative mb-6">
                <svg
                  className="h-28 w-28 text-magenta/70"
                  viewBox="0 0 120 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="52"
                    ry="48"
                    strokeDasharray="4 3"
                    transform="rotate(-3 60 60)"
                  />
                  <ellipse
                    cx="60"
                    cy="60"
                    rx="50"
                    ry="46"
                    strokeDasharray="6 4"
                    strokeOpacity="0.4"
                    transform="rotate(2 60 60)"
                  />
                </svg>
                <h3
                  className={cn(
                    "absolute inset-0 flex items-center justify-center font-poppins text-xl font-bold uppercase",
                    isDark ? "text-lime" : "text-navy"
                  )}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-white/70" : "text-navy/70"
                )}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
