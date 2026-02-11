import Button from "@/components/ui/Button";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function InstructorQuote() {
  return (
    <section className="bg-lime py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          {/* Photo placeholder */}
          <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full bg-navy/10 lg:h-80 lg:w-80">
            <div className="flex h-full items-center justify-center font-poppins text-sm font-medium text-navy/40">
              Ne-Yo
            </div>
          </div>

          <div className="text-center lg:text-left">
            <svg className="mx-auto mb-4 h-10 w-10 text-navy/20 lg:mx-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <blockquote className="font-serif text-2xl font-medium leading-relaxed text-navy sm:text-3xl">
              &ldquo;YousicPlay is changing the way people learn music. I&apos;m proud to be a part of it.&rdquo;
            </blockquote>
            <p className="mt-4 font-poppins text-sm font-bold uppercase tracking-wider text-navy/60">
              — Ne-Yo
            </p>
            <div className="mt-8">
              <Button href="/all-classes" variant="magenta" className="px-10 py-4">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
