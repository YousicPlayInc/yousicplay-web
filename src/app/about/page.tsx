import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about YousicPlay — an online music education platform featuring courses taught by Grammy-winning and world-renowned musicians.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="py-20">
        <MaxWidthWrapper className="max-w-3xl text-center">
          <h1 className="font-poppins text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            About YousicPlay
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-white/70">
            YousicPlay is an online music education platform on a mission to make world-class music
            education accessible to everyone. We partner with Grammy-winning and world-renowned
            musicians to bring you the highest quality instruction available anywhere.
          </p>
        </MaxWidthWrapper>
      </section>

      {/* Mission */}
      <section className="bg-navy-light py-20">
        <MaxWidthWrapper className="max-w-3xl">
          <h2 className="mb-6 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white">
            Our Mission
          </h2>
          <p className="text-center font-serif text-base leading-relaxed text-white/70">
            Traditional music education is expensive, rigid, and often uninspiring. We believe that
            everyone deserves access to the same quality of instruction that was once reserved for
            elite music schools and private lessons. YousicPlay gives you direct access to the
            techniques and insights of the artists you listen to and admire — at a fraction of the
            cost.
          </p>
        </MaxWidthWrapper>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20">
        <MaxWidthWrapper>
          <h2 className="mb-14 text-center font-poppins text-3xl font-bold uppercase tracking-tight text-white">
            What Makes Us Different
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl bg-navy-light p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/10">
                <svg className="h-7 w-7 text-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-bold uppercase text-lime">World-Class Instructors</h3>
              <p className="mt-2 text-sm text-white/60">
                Learn from Grammy-winning musicians, Berklee professors, and chart-topping artists.
              </p>
            </div>
            <div className="rounded-2xl bg-navy-light p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/10">
                <svg className="h-7 w-7 text-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-bold uppercase text-lime">Lifetime Access</h3>
              <p className="mt-2 text-sm text-white/60">
                Buy once, learn forever. No subscriptions, no recurring fees. Your courses are yours for life.
              </p>
            </div>
            <div className="rounded-2xl bg-navy-light p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime/10">
                <svg className="h-7 w-7 text-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-poppins text-lg font-bold uppercase text-lime">AI-Powered Learning</h3>
              <p className="mt-2 text-sm text-white/60">
                Our platform adapts to your skill level and provides personalized feedback to accelerate your progress.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* CTA */}
      <section className="bg-lime py-20">
        <MaxWidthWrapper className="text-center">
          <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-navy sm:text-4xl">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-navy/70">
            Join thousands of students learning from the best musicians in the world.
          </p>
          <div className="mt-8">
            <Button href="/all-classes" variant="magenta" className="px-10 py-4">
              Browse All Classes
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
