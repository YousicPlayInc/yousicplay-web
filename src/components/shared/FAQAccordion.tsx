"use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  variant?: "dark" | "light";
}

export default function FAQAccordion({ items, variant = "light" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isDark = variant === "dark";

  return (
    <section className={cn("py-20", isDark ? "bg-navy" : "bg-cream")}>
      <MaxWidthWrapper className="max-w-3xl">
        <h2
          className={cn(
            "mb-10 text-center font-poppins text-3xl font-bold uppercase tracking-tight sm:text-4xl",
            isDark ? "text-white" : "text-navy"
          )}
        >
          FAQ
        </h2>
        <div className="space-y-0">
          {items.map((item, i) => (
            <div
              key={`faq-${i}-${item.question.slice(0, 20)}`}
              className={cn(
                "border-b",
                isDark ? "border-white/10" : "border-navy/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span
                  className={cn(
                    "font-poppins text-sm font-semibold pr-4",
                    isDark ? "text-white" : "text-navy"
                  )}
                >
                  {item.question}
                </span>
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    isDark ? "text-magenta" : "text-magenta",
                    openIndex === i && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-white/70" : "text-navy/70"
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
