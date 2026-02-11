import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface SkillsGridProps {
  skills: string[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <h2 className="mb-10 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Skills You&apos;ll Learn
        </h2>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-lime" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-white/80">{skill}</span>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
