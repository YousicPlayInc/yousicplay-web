import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function BetterWaySection() {
  return (
    <section className="bg-cream py-20">
      <MaxWidthWrapper className="max-w-3xl">
        <h2 className="mb-6 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
          A Better Way to Learn Music
        </h2>
        <p className="text-center font-serif text-base leading-relaxed text-navy/70">
          Traditional music education is expensive, rigid, and often uninspiring. YousicPlay gives you
          direct access to the techniques and insights of world-class musicians — the same artists you
          listen to and admire. Learn at your own pace, revisit lessons as many times as you want, and
          build real skills that translate to your own creative expression.
        </p>
      </MaxWidthWrapper>
    </section>
  );
}
