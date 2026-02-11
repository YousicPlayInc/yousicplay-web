import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({ children, subtitle, className, dark = true }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      <h2
        className={cn(
          "font-poppins text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-navy"
        )}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-lg",
            dark ? "text-white/70" : "text-navy/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
