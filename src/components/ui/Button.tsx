import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "lime" | "magenta" | "outline";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  lime: "bg-lime text-navy hover:bg-lime-dark",
  magenta: "bg-magenta text-white hover:bg-magenta-dark",
  outline: "border-2 border-white text-white hover:bg-white/10",
};

export default function Button({
  variant = "lime",
  children,
  className,
  href,
  external,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-full px-8 py-3 font-poppins text-sm font-semibold uppercase tracking-wide transition-colors",
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseStyles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
