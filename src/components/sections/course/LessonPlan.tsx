"use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { cn } from "@/lib/utils";

interface LessonPlanProps {
  lessons: { title: string; description?: string }[];
}

export default function LessonPlan({ lessons }: LessonPlanProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper className="max-w-3xl">
        <h2 className="mb-10 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Lesson Plan
        </h2>
        <div className="space-y-0">
          {lessons.map((lesson, i) => (
            <div key={i} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/10 font-poppins text-sm font-bold text-lime">
                    {i + 1}
                  </span>
                  <span className="font-poppins text-sm font-semibold text-white">
                    {lesson.title}
                  </span>
                </div>
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 text-white/40 transition-transform duration-200",
                    openIndex === i && "rotate-90"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {lesson.description && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openIndex === i ? "max-h-40 pb-5 pl-12" : "max-h-0"
                  )}
                >
                  <p className="text-sm leading-relaxed text-white/60">{lesson.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
