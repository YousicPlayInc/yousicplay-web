import Link from "next/link";

interface LessonNavProps {
  courseSlug: string;
  currentIndex: number;
  totalLessons: number;
  prevTitle?: string;
  nextTitle?: string;
}

export default function LessonNav({
  courseSlug,
  currentIndex,
  totalLessons,
  prevTitle,
  nextTitle,
}: LessonNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
      {/* Previous lesson */}
      {prevTitle ? (
        <Link
          href={`/learn/${courseSlug}/${currentIndex - 1}`}
          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden sm:inline">{prevTitle}</span>
          <span className="sm:hidden">Previous</span>
        </Link>
      ) : (
        <div />
      )}

      {/* Lesson counter */}
      <span className="text-xs text-white/30">
        {currentIndex + 1} / {totalLessons}
      </span>

      {/* Next lesson */}
      {nextTitle ? (
        <Link
          href={`/learn/${courseSlug}/${currentIndex + 1}`}
          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span className="hidden sm:inline">{nextTitle}</span>
          <span className="sm:hidden">Next</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <Link
          href={`/classes/${courseSlug}`}
          className="flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-lime-dark"
        >
          Course Complete!
        </Link>
      )}
    </div>
  );
}
