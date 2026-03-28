"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { CheckoutItemType } from "@/lib/checkout";

interface BuyButtonProps {
  slug: string;
  itemType: CheckoutItemType;
  price: number;
  buyUrl: string;
  label?: string;
  variant?: "lime" | "magenta" | "outline";
  className?: string;
}

export default function BuyButton({
  slug,
  itemType,
  price,
  buyUrl,
  label = "Buy Now",
  variant = "magenta",
  className,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free items go directly to Thinkific
  if (price === 0) {
    return (
      <Button href={buyUrl} external variant={variant} className={className}>
        {label}
      </Button>
    );
  }

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, itemType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        variant={variant}
        onClick={handleClick}
        disabled={loading}
        className={className}
      >
        {loading ? "Redirecting..." : label}
      </Button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
