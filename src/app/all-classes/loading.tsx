import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function AllClassesLoading() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Bundle banner skeleton */}
      <section className="bg-gradient-to-r from-magenta/20 via-navy to-magenta/20 py-16">
        <MaxWidthWrapper>
          <div className="flex flex-col items-center space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-10 w-72 animate-pulse rounded-lg bg-white/10" />
            <div className="h-5 w-80 animate-pulse rounded bg-white/10" />
            <div className="mt-4 h-12 w-36 animate-pulse rounded-full bg-white/10" />
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Filters + Grid */}
      <section className="py-16">
        <MaxWidthWrapper>
          {/* Filter bar skeleton */}
          <div className="mb-10 flex flex-wrap gap-4">
            <div className="h-10 w-44 animate-pulse rounded-lg bg-navy-light" />
            <div className="h-10 w-44 animate-pulse rounded-lg bg-navy-light" />
            <div className="h-10 w-44 animate-pulse rounded-lg bg-navy-light" />
          </div>

          {/* Course cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-navy-light"
              >
                <div className="aspect-[16/10] w-full animate-pulse bg-white/10" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                    <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
