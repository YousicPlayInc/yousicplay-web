"use client";

import { useRef } from "react";
import CourseCard from "@/components/shared/CourseCard";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";

interface TrendingCourse {
  slug: string;
  imagePath: string;
  cardTitle: string;
  instructorName: string;
  instrument: string;
  level: string;
}

interface TrendingCarouselProps {
  courses: TrendingCourse[];
}

export default function TrendingCarousel({ courses }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Trending
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Scroll left"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Scroll right"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-2 flex gap-6 overflow-x-auto px-2 pb-4"
        >
          {courses.map((course) => (
            <div key={course.slug} className="w-[280px] shrink-0">
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/all-classes" variant="outline">
            View All Classes
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
