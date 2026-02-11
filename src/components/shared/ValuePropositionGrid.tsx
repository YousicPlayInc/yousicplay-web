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
  prefixes?: string[];
}

export default function ValuePropositionGrid({
  heading,
  items,
  variant = "light",
  prefixes,
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
          {items.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "rounded-2xl p-8 text-center",
                isDark ? "bg-navy-light" : "border-2 border-magenta/30"
              )}
            >
              <div className="relative mb-4 inline-block">
                {prefixes && prefixes[i] && (
                  <span
                    className={cn(
                      "mb-2 block text-xs font-medium uppercase tracking-widest",
                      isDark ? "text-white/40" : "text-navy/40"
                    )}
                  >
                    {prefixes[i]}
                  </span>
                )}
                <h3
                  className={cn(
                    "font-poppins text-xl font-bold uppercase",
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
