/**
 * Analytics utility for GA4 and Meta Pixel event tracking.
 * Environment variables:
 * - NEXT_PUBLIC_GA4_ID (e.g., "G-XXXXXXXXXX")
 * - NEXT_PUBLIC_META_PIXEL_ID (e.g., "1234567890")
 */

// ── GA4 helpers ──────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;

  // GA4
  window.gtag?.("config", process.env.NEXT_PUBLIC_GA4_ID!, {
    page_path: url,
  });

  // Meta Pixel
  window.fbq?.("track", "PageView");
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // GA4
  window.gtag?.("event", eventName, params);

  // Meta Pixel — map common events
  const metaEventMap: Record<string, string> = {
    view_course: "ViewContent",
    begin_checkout: "InitiateCheckout",
    purchase: "Purchase",
    sign_up: "CompleteRegistration",
    lesson_complete: "CustomEvent",
  };

  const metaEvent = metaEventMap[eventName];
  if (metaEvent && metaEvent !== "CustomEvent") {
    window.fbq?.("track", metaEvent, params);
  } else if (metaEvent === "CustomEvent") {
    window.fbq?.("trackCustom", eventName, params);
  }
}

// ── Convenience methods ──────────────────────────────────────────────────

export function trackCourseView(slug: string, title: string, price: number) {
  trackEvent("view_course", {
    content_type: "course",
    content_id: slug,
    content_name: title,
    value: price,
    currency: "USD",
  });
}

export function trackCheckoutStart(slug: string, title: string, price: number) {
  trackEvent("begin_checkout", {
    content_type: "course",
    content_id: slug,
    content_name: title,
    value: price,
    currency: "USD",
  });
}

export function trackPurchase(slug: string, title: string, price: number, transactionId?: string) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    content_type: "course",
    content_id: slug,
    content_name: title,
    value: price,
    currency: "USD",
  });
}

export function trackLessonComplete(courseSlug: string, lessonIndex: number) {
  trackEvent("lesson_complete", {
    course_slug: courseSlug,
    lesson_index: lessonIndex,
  });
}

export function trackSignUp(method: string) {
  trackEvent("sign_up", { method });
}
