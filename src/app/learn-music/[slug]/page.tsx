import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { seoPages } from "@/data/seo-pages";
import { courses } from "@/data/courses";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";

interface SEOPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: SEOPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://yousicplay.com/learn-music/${page.slug}`,
      siteName: "YousicPlay",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://yousicplay.com/learn-music/${page.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Benefit cards content generated per-page
// ---------------------------------------------------------------------------

function getBenefits(page: (typeof seoPages)[number]) {
  const topic = page.instrument || page.genre || page.skill || "Music";
  return [
    {
      title: "Learn from the Best",
      description: `Our ${topic.toLowerCase()} courses are taught by Grammy winners, platinum artists, and Berklee professors.`,
    },
    {
      title: "Learn at Your Own Pace",
      description:
        "Lifetime access to all course materials. Watch, rewind, and practice on your schedule.",
    },
    {
      title: "Structured Curriculum",
      description:
        "Step-by-step video lessons designed to build real, practical skills you can use immediately.",
    },
    {
      title: "14-Day Money-Back Guarantee",
      description:
        "Try any course risk-free. If it is not right for you, get a full refund within 14 days.",
    },
  ];
}

// ---------------------------------------------------------------------------
// FAQ content generated per-page
// ---------------------------------------------------------------------------

function getFAQ(page: (typeof seoPages)[number]) {
  const topic = page.instrument || page.genre || page.skill || "music";
  const topicLower = topic.toLowerCase();

  return [
    {
      question: `Do I need prior experience to take a ${topicLower} course?`,
      answer: `We offer courses for all skill levels. Many of our ${topicLower} courses are beginner-friendly, while others are designed for intermediate and advanced students. Check each course description for the recommended level.`,
    },
    {
      question: "How long do I have access to the course?",
      answer:
        "You get lifetime access to all course materials. Watch lessons anytime, on any device, as many times as you want.",
    },
    {
      question: `What makes YousicPlay's ${topicLower} courses different?`,
      answer: `Our courses are taught by Grammy-winning musicians and world-class performers. You are learning directly from artists who have performed on the world's biggest stages, not from generic instructors.`,
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes. Every course comes with a 14-day money-back guarantee. If the course is not what you expected, we will refund your purchase, no questions asked.",
    },
  ];
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

function buildJsonLd(
  page: (typeof seoPages)[number],
  matchedCourses: (typeof courses)[number][]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.heading,
    description: page.description,
    url: `https://yousicplay.com/learn-music/${page.slug}`,
    numberOfItems: matchedCourses.length,
    itemListElement: matchedCourses.map((course, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: `https://yousicplay.com/classes/${course.slug}`,
        provider: {
          "@type": "Organization",
          name: "YousicPlay",
          url: "https://yousicplay.com",
        },
        instructor: {
          "@type": "Person",
          name: course.instructor.name,
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LearnMusicPage({ params }: SEOPageProps) {
  const { slug } = await params;
  const page = seoPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const matchedCourses = page.relatedCourses
    .map((courseSlug) => courses.find((c) => c.slug === courseSlug))
    .filter(Boolean) as (typeof courses)[number][];

  const benefits = getBenefits(page);
  const faqItems = getFAQ(page);

  // Build tag pills from page metadata
  const tags: string[] = [];
  if (page.instrument) tags.push(page.instrument);
  if (page.genre) tags.push(page.genre);
  if (page.skill) tags.push(page.skill);
  if (page.level) tags.push(page.level);

  const topic = page.instrument || page.genre || page.skill || "Music";

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(page, matchedCourses)),
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Hero Section */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-navy pb-16 pt-28 sm:pb-20 sm:pt-32">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            {tags.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-4 py-1 font-poppins text-xs font-medium uppercase tracking-wider text-lime"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="mb-6 font-poppins text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {page.heading}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              {page.description}
            </p>
            <Button href="/all-classes" variant="lime">
              Browse All Courses
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Featured Courses */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream py-16 sm:py-20">
        <MaxWidthWrapper>
          <h2 className="mb-10 text-center font-poppins text-2xl font-bold uppercase tracking-tight text-navy sm:text-3xl">
            Featured Courses
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/classes/${course.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                {/* Course image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.imagePath}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Course info */}
                <div className="p-5">
                  <p className="mb-1 font-poppins text-xs font-medium uppercase tracking-wider text-magenta">
                    {course.instructor.name}
                  </p>
                  <h3 className="mb-2 font-poppins text-base font-bold text-navy line-clamp-2">
                    {course.cardTitle}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-navy/60 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-poppins text-lg font-bold text-navy">
                        ${course.price}
                      </span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-navy/40 line-through">
                          ${course.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-sm text-navy/60">
                      <svg
                        className="h-4 w-4 text-lime"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.rating}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs font-medium text-navy/70">
                      {course.instrument}
                    </span>
                    <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs font-medium text-navy/70">
                      {course.level}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Why Learn With YousicPlay */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-navy py-16 sm:py-20">
        <MaxWidthWrapper>
          <h2 className="mb-10 text-center font-poppins text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            Why Learn {topic} with YousicPlay
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-2 font-poppins text-base font-bold text-lime">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <FAQAccordion items={faqItems} variant="light" />

      {/* ----------------------------------------------------------------- */}
      {/* CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-navy py-16 sm:py-20">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-poppins text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Start Your Musical Journey
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              Join thousands of students learning from the world&apos;s best
              musicians. Lifetime access, 14-day money-back guarantee.
            </p>
            <Button href="/all-classes" variant="lime">
              Explore All Courses
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
