"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface LearnHeaderProps {
  courseTitle: string;
  courseSlug: string;
  instructorName: string;
  totalLessons: number;
}

export default function LearnHeader({
  courseTitle,
  courseSlug,
  instructorName,
  totalLessons,
}: LearnHeaderProps) {
  const [completedCount, setCompletedCount] = useState(0);

  // Fetch progress on mount
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/learn/progress?courseSlug=${courseSlug}`);
        if (res.ok) {
          const data = await res.json();
          setCompletedCount(data.completedLessons?.length || 0);
        }
      } catch {
        // Non-critical
      }
    }

    fetchProgress();
  }, [courseSlug]);

  // Listen for progress changes
  const handleProgressChange = useCallback(
    (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.courseSlug !== courseSlug) return;

      setCompletedCount((prev) => (detail.completed ? prev + 1 : Math.max(0, prev - 1)));
    },
    [courseSlug]
  );

  useEffect(() => {
    window.addEventListener("lesson-progress-change", handleProgressChange);
    return () => window.removeEventListener("lesson-progress-change", handleProgressChange);
  }, [handleProgressChange]);

  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <header className="flex h-14 shrink-0 items-center border-b border-white/10 bg-navy px-4">
      {/* Left: Back + Logo */}
      <div className="flex items-center gap-3">
        <Link
          href={`/classes/${courseSlug}`}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </Link>
        <div className="h-5 w-px bg-white/10" />
        <Link href="/" className="flex items-center">
          <Image
            src="/images/yousic-logo.svg"
            alt="YousicPlay"
            width={120}
            height={30}
            className="h-6 w-auto opacity-80 transition-opacity hover:opacity-100"
          />
        </Link>
      </div>

      {/* Center: Course info */}
      <div className="mx-4 hidden flex-1 items-center justify-center md:flex">
        <div className="text-center">
          <p className="font-poppins text-sm font-semibold text-white">{courseTitle}</p>
          <p className="text-xs text-white/50">
            {instructorName} &middot; {totalLessons} lessons
          </p>
        </div>
      </div>

      {/* Right: Progress */}
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-lime transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-white/40">
            {completedCount}/{totalLessons}
          </span>
        </div>
      </div>
    </header>
  );
}
