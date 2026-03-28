"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lesson } from "@/types";

interface LessonSidebarProps {
  courseSlug: string;
  lessons: Lesson[];
  instructorName: string;
}

export default function LessonSidebar({
  courseSlug,
  lessons,
  instructorName,
}: LessonSidebarProps) {
  const [open, setOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const pathname = usePathname();

  // Extract current lesson index from URL
  const pathParts = pathname.split("/");
  const currentIndex = parseInt(pathParts[pathParts.length - 1], 10);

  // Fetch completed lessons on mount
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/learn/progress?courseSlug=${courseSlug}`);
        if (res.ok) {
          const data = await res.json();
          setCompletedLessons(data.completedLessons || []);
        }
      } catch {
        // Non-critical
      }
    }

    fetchProgress();
  }, [courseSlug]);

  // Listen for progress changes from MarkCompleteButton
  const handleProgressChange = useCallback(
    (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.courseSlug !== courseSlug) return;

      setCompletedLessons((prev) => {
        if (detail.completed) {
          return prev.includes(detail.lessonIndex) ? prev : [...prev, detail.lessonIndex];
        } else {
          return prev.filter((i) => i !== detail.lessonIndex);
        }
      });
    },
    [courseSlug]
  );

  useEffect(() => {
    window.addEventListener("lesson-progress-change", handleProgressChange);
    return () => window.removeEventListener("lesson-progress-change", handleProgressChange);
  }, [handleProgressChange]);

  const completedCount = completedLessons.length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-navy shadow-lg transition-transform hover:scale-105 lg:hidden"
        aria-label="Toggle lesson list"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-20 w-80 border-r border-white/10 bg-navy transition-transform lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="border-b border-white/10 p-4 pt-16 lg:pt-4">
          <h2 className="font-poppins text-sm font-semibold text-white">Course Content</h2>
          <p className="mt-0.5 text-xs text-white/40">
            {lessons.length} lessons &middot; {instructorName}
          </p>
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-lime transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-white/40">{progressPercent}%</span>
          </div>
        </div>

        {/* Lesson list */}
        <nav className="overflow-y-auto" style={{ height: "calc(100% - 100px)" }}>
          <ul className="py-2">
            {lessons.map((lesson, index) => {
              const isActive = index === currentIndex;
              const isCompleted = completedLessons.includes(index);
              const href = `/learn/${courseSlug}/${index}`;

              return (
                <li key={index}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-lime/10 border-l-2 border-lime"
                        : "border-l-2 border-transparent hover:bg-white/5"
                    }`}
                  >
                    {/* Lesson number / completion indicator */}
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                        isCompleted
                          ? "bg-lime text-navy"
                          : isActive
                            ? "bg-lime text-navy"
                            : "bg-white/10 text-white/50"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>

                    {/* Lesson title */}
                    <span
                      className={`text-sm leading-snug ${
                        isCompleted
                          ? "text-white/40 line-through"
                          : isActive
                            ? "font-medium text-white"
                            : "text-white/60"
                      }`}
                    >
                      {lesson.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
