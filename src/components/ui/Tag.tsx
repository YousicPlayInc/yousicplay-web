import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-navy-light px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-lime",
        className
      )}
    >
      {children}
    </span>
  );
}
