import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero section skeleton */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Video placeholder */}
            <div className="aspect-video w-full animate-pulse rounded-2xl bg-navy-dark" />

            {/* Course info */}
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
              </div>
              {/* Title */}
              <div className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
              <div className="h-10 w-2/3 animate-pulse rounded-lg bg-white/10" />
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
              </div>
              {/* Rating */}
              <div className="h-5 w-40 animate-pulse rounded bg-white/10" />
              {/* Price area */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-24 animate-pulse rounded-lg bg-white/10" />
                <div className="h-6 w-16 animate-pulse rounded bg-white/10" />
              </div>
              {/* CTA button */}
              <div className="h-14 w-full animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Lesson plan skeleton */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl bg-navy-light p-4"
              >
                <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
