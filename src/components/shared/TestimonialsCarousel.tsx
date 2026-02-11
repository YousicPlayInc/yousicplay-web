"use client";

import { useState } from "react";
import Image from "next/image";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  quote: string;
  photo: string;
  videoUrl?: string;
}

interface TestimonialsCarouselProps {
  heading?: string;
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({
  heading = "HEAR WHAT SOME OF OUR STUDENTS HAVE TO SAY!",
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <h2 className="mb-4 text-center font-poppins text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="mb-12 text-center text-sm text-white/60">
          Well, they&apos;re singing our praises.
        </p>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={cn(
              "absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
              currentIndex === 0 && "opacity-30 cursor-not-allowed"
            )}
            aria-label="Previous testimonials"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={cn(
              "absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
              currentIndex >= maxIndex && "opacity-30 cursor-not-allowed"
            )}
            aria-label="Next testimonials"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="overflow-hidden px-8">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 3)}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="w-full shrink-0 sm:w-[calc(50%-12px)]"
                >
                  <div className="rounded-2xl bg-navy-light p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={t.photo}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <p className="font-poppins text-sm font-semibold text-white">{t.name}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
