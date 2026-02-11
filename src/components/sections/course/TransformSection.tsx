import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface TransformSectionProps {
  instrument: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const iconMap: Record<string, React.ReactNode> = {
  star: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  music: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  lightning: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export default function TransformSection({ instrument, benefits }: TransformSectionProps) {
  const defaultBenefits = [
    { icon: "star", title: "Expert Instruction", description: "Learn from Grammy-winning musicians who've mastered their craft." },
    { icon: "music", title: "Practical Skills", description: "Focus on real-world techniques you can use immediately in your playing." },
    { icon: "lightning", title: "Fast Progress", description: "Our structured curriculum helps you see results in weeks, not years." },
  ];

  const items = benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <section className="bg-cream py-20">
      <MaxWidthWrapper>
        <h2 className="mb-14 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
          Transform Your {instrument} Playing
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-magenta/10 text-magenta">
                {iconMap[item.icon] || iconMap.star}
              </div>
              <h3 className="font-poppins text-lg font-bold uppercase text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
