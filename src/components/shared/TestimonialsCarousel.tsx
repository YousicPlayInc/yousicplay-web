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
  heading = "Hear From Other Musicians",
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
                  <div className="group cursor-pointer">
                    {/* Magenta quote mark */}
                    <svg className="mb-2 h-8 w-10 text-magenta" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                    <div className="flex gap-5">
                      {/* Video thumbnail */}
                      <div className="relative h-48 w-40 shrink-0 overflow-hidden rounded-xl bg-navy-light">
                        <Image
                          src={t.photo}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                        <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                          <svg className="ml-0.5 h-3 w-3 text-navy" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Quote + name */}
                      <div className="flex flex-col justify-center">
                        <p className="text-sm leading-relaxed text-white/80">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <p className="mt-3 font-poppins text-xs font-bold uppercase tracking-wider text-white">
                          {t.name}
                        </p>
                      </div>
                    </div>
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
