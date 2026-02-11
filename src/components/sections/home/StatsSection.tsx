import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

const stats = [
  { value: "23K", label: "Students" },
  { value: "2.5K", label: "Minutes of Content" },
  { value: "23", label: "Instructors" },
  { value: "32", label: "Grammy Awards" },
];

export default function StatsSection() {
  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <h2 className="mb-4 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Music Learning at Its Best
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-sm text-white/60">
          Join thousands of students learning from world-class musicians
        </p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-5xl font-bold text-lime sm:text-6xl">
                {stat.value}
              </div>
              <p className="mt-2 font-poppins text-sm font-medium uppercase tracking-wider text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
