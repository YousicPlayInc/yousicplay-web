"use client";

import { useEffect, useRef } from "react";
import { trackPurchase } from "@/lib/analytics";

interface PurchaseTrackerProps {
  slug: string;
  title: string;
  price: number;
  transactionId?: string;
}

/**
 * Client component that fires a purchase conversion event once on mount.
 * Rendered by the server-side checkout success page with session data.
 */
export default function PurchaseTracker({
  slug,
  title,
  price,
  transactionId,
}: PurchaseTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackPurchase(slug, title, price, transactionId);
  }, [slug, title, price, transactionId]);

  return null;
}
