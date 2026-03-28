"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md rounded-2xl bg-navy-light p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-magenta/20">
          <svg
            className="h-8 w-8 text-magenta"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h1 className="font-poppins text-2xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mt-3 font-poppins text-sm text-white/50">
          {error.message || "An unexpected error occurred."}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-lime px-6 py-3 font-poppins text-sm font-bold text-navy transition-colors hover:bg-lime/90"
          >
            Try again
          </button>

          <Link
            href="/"
            className="font-poppins text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
