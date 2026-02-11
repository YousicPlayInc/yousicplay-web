import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function WhatsNextSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-magenta/20 py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <p className="mb-2 font-poppins text-sm font-semibold uppercase tracking-widest text-lime">
              What&apos;s Next
            </p>
            <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              AI Driven Personalized Music Learning
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70">
              Our AI-powered platform adapts to your skill level, learning pace, and musical interests.
              Get personalized lesson recommendations, real-time feedback on your playing, and a learning
              path tailored just for you.
            </p>
          </div>

          {/* Image placeholder */}
          <div className="relative h-72 w-full max-w-md overflow-hidden rounded-2xl bg-navy-light lg:h-80 lg:w-96">
            <div className="flex h-full items-center justify-center">
              <div className="space-y-3 text-center">
                <div className="inline-block rounded-full bg-magenta/20 px-4 py-1 text-xs font-medium text-magenta">RHYTHM</div>
                <div className="inline-block rounded-full bg-lime/20 px-4 py-1 text-xs font-medium text-lime">PITCH</div>
                <div className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/60">MOTION</div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
