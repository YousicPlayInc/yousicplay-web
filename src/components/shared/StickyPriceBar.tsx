"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/ui/StarRating";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import BuyButton from "@/components/shared/BuyButton";
import type { CheckoutItemType } from "@/lib/checkout";

interface StickyPriceBarProps {
  slug: string;
  itemType: CheckoutItemType;
  price: number;
  originalPrice: number;
  rating: number;
  learnerCount: string;
  buyUrl: string;
}

export default function StickyPriceBar({
  slug,
  itemType,
  price,
  originalPrice,
  rating,
  learnerCount,
  buyUrl,
}: StickyPriceBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const heroEl = document.getElementById("course-hero");
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-sm">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-poppins text-2xl font-bold text-white">${price}</span>
              <span className="text-sm text-lime line-through">${originalPrice}</span>
            </div>
            <StarRating rating={rating} />
            <span className="hidden text-sm text-white/60 sm:block">{learnerCount} Learners</span>
          </div>
          <BuyButton
            slug={slug}
            itemType={itemType}
            price={price}
            buyUrl={buyUrl}
            variant="magenta"
            className="px-6 py-2.5"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
