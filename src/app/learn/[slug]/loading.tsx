import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function LearnLoading() {
  return (
    <div className="min-h-screen bg-navy">
      <MaxWidthWrapper className="py-8">
        {/* Video player skeleton */}
        <div className="aspect-video w-full animate-pulse rounded-2xl bg-navy-dark" />

        {/* Lesson info skeleton */}
        <div className="mt-6 space-y-4">
          {/* Title */}
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-white/10" />
          {/* Instructor */}
          <div className="h-5 w-1/4 animate-pulse rounded-lg bg-white/10" />
          {/* Description lines */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
          </div>
        </div>

        {/* Lesson list skeleton */}
        <div className="mt-10 space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-white/10" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl bg-navy-light p-4"
            >
              <div className="h-5 w-5 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="ml-auto h-4 w-12 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
