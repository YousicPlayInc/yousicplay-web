"use client";

import { useState, useEffect } from "react";

interface MarkCompleteButtonProps {
  courseSlug: string;
  lessonIndex: number;
  initialCompleted?: boolean;
}

export default function MarkCompleteButton({
  courseSlug,
  lessonIndex,
  initialCompleted = false,
}: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  // Sync with server state on mount (if no initialCompleted was passed)
  useEffect(() => {
    if (initialCompleted) return; // Already have server data

    async function fetchProgress() {
      try {
        const res = await fetch(`/api/learn/progress?courseSlug=${courseSlug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.completedLessons?.includes(lessonIndex)) {
            setCompleted(true);
          }
        }
      } catch {
        // Non-critical — default to incomplete
      }
    }

    fetchProgress();
  }, [courseSlug, lessonIndex, initialCompleted]);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/learn/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          lessonIndex,
          completed: !completed,
        }),
      });

      if (res.ok) {
        setCompleted(!completed);
        // Dispatch custom event so sidebar/header can update
        window.dispatchEvent(
          new CustomEvent("lesson-progress-change", {
            detail: { courseSlug, lessonIndex, completed: !completed },
          })
        );
      }
    } catch {
      // Silently fail — progress is non-critical
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        completed
          ? "bg-lime/20 text-lime"
          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
      } ${loading ? "opacity-50" : ""}`}
    >
      {completed ? (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )}
      {completed ? "Completed" : "Mark Complete"}
    </button>
  );
}
