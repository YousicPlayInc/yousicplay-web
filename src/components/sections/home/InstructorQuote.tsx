import Image from "next/image";
import Button from "@/components/ui/Button";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function InstructorQuote() {
  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-10 lg:flex-row">
          {/* Photo placeholder */}
          <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full bg-white/10 lg:h-80 lg:w-80">
            <Image
              src="/images/homepage/neyo-square.webp"
              alt="Ne-Yo"
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>

          <div className="text-center lg:text-left">
            <svg className="mx-auto mb-4 h-10 w-10 text-white/20 lg:mx-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <blockquote className="font-serif text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              &ldquo;I love what Yousic Play is doing. I wish something like this was available when I was younger... The classroom comes to you.&rdquo;
            </blockquote>
            <p className="mt-4 font-poppins text-sm font-bold uppercase tracking-wider text-lime">
              Ne-Yo
            </p>
            <p className="mt-1 font-poppins text-sm tracking-wider text-white/60">
              3x Grammy Award-Winning Artist &middot; Yousic Play Instructor
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
