import Image from "next/image";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import StarRating from "@/components/ui/StarRating";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function FeaturedClassSection() {
  return (
    <section className="bg-navy py-20">
      <MaxWidthWrapper>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Video preview placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-light">
            <Image
              src="/images/courses/cory-henry-workshop-hero.webp"
              alt="Cory Henry Workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-magenta/90">
                <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Instructor name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 p-6">
              <p className="font-poppins text-lg font-bold text-lime">Cory Henry</p>
              <p className="text-sm text-white/70">Grammy-nominated musician and keyboard virtuoso</p>
            </div>
          </div>

          {/* Course info */}
          <div className="flex flex-col justify-center">
            <h2 className="font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Learn to Play Professional Piano Solos
            </h2>
            <p className="mt-4 font-serif text-base leading-relaxed text-white/70">
              Master the art of soloing with Grammy-nominated keyboardist Cory Henry.
              Learn chord voicings, melodic lines, and improvisation techniques used by the pros.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>Intermediate +</Tag>
              <Tag>Piano</Tag>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-poppins text-3xl font-bold text-white">$99</span>
              <span className="text-lg text-lime line-through">$279</span>
              <StarRating rating={4.7} className="ml-2" />
            </div>
            <div className="mt-8">
              <Button
                href="https://courses.yousicplay.com/enroll/2798957"
                external
                variant="magenta"
                className="px-10 py-4"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
