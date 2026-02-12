import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

const stats = [
  { value: "23K", label: "Enrolled Students" },
  { value: "2.5K", label: "Minutes of Lessons" },
  { value: "23", label: "World-Class Instructors" },
  { value: "32", label: "Grammy Wins Across Instructors" },
];

export default function StatsSection() {
  return (
    <section className="bg-cream py-20">
      <MaxWidthWrapper>
        <h2 className="mb-4 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
          Music Learning At Its Best
        </h2>
        <p className="mx-auto mb-14 max-w-3xl text-center text-base text-navy/60">
          With a fast-growing community of music learners, elite celebrity instructors and a library of high-quality content across multiple instruments and styles, Yousic Play is transforming the way music is learned.
        </p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="relative inline-block font-serif text-5xl font-bold text-magenta sm:text-6xl">
                {stat.value}
                {i === 2 && (
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 80 12" fill="none">
                    <path d="M2 8 C20 4, 60 4, 78 8" stroke="#CCFF00" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <p className="mt-2 font-poppins text-sm font-medium uppercase tracking-wider text-navy/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
