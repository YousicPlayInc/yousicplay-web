import Button from "@/components/ui/Button";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy">
      {/* Background video — autoplay, muted, looping */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/homepage/banner-video4.webp"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50" />

      {/* Decorative purple cross */}
      <div className="absolute left-8 top-1/4 hidden lg:block">
        <svg className="h-16 w-16 text-magenta/60" viewBox="0 0 64 64" fill="currentColor">
          <rect x="26" y="0" width="12" height="64" rx="2" />
          <rect x="0" y="26" width="64" height="12" rx="2" />
        </svg>
      </div>

      <MaxWidthWrapper className="relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="font-poppins text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Learn Music From the World&apos;s Best Musicians
          </h1>
          <p className="mt-6 max-w-xl font-serif text-lg text-white/80 sm:text-xl">
            Get exclusive access to lessons from Celebrity Musicians and World-Class Instructors.
          </p>
          <div className="mt-8">
            <Button href="/all-classes" variant="lime" className="px-10 py-4 text-base">
              Get Started
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
