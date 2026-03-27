import { notFound } from "next/navigation";
import { bundles } from "@/data/bundles";
import { courses } from "@/data/courses";
import BundleHero from "@/components/sections/bundle/BundleHero";
import StickyPriceBar from "@/components/shared/StickyPriceBar";
import IncludedCoursesList from "@/components/sections/bundle/IncludedCoursesList";
import ValuePropositionGrid from "@/components/shared/ValuePropositionGrid";
import FAQAccordion from "@/components/shared/FAQAccordion";
import type { Metadata } from "next";

interface BundlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bundles.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: BundlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = bundles.find((b) => b.slug === slug);
  if (!bundle) return { title: "Bundle Not Found" };

  return {
    title: `${bundle.title} | YousicPlay`,
    description: bundle.description,
  };
}

const valuePropItems = [
  {
    title: "Incredible Value",
    description:
      "Get multiple premium courses for a fraction of the individual price. Save hundreds instantly.",
  },
  {
    title: "Lifetime Access",
    description:
      "Learn at your own pace with unlimited access to every course in the bundle. No deadlines, no pressure.",
  },
  {
    title: "World-Class Instructors",
    description:
      "Learn from Grammy winners, Berklee professors, and artists who have shaped modern music.",
  },
];

const bundleFAQs = [
  {
    question: "Can I buy individual courses later?",
    answer:
      "Yes! Every course is available individually. However, bundles offer significant savings compared to purchasing courses one at a time. If you think you might want more than one or two courses, a bundle is almost always the better deal.",
  },
  {
    question: "How long do I have access?",
    answer:
      "You get lifetime access to every course in the bundle. Watch the lessons as many times as you want, whenever you want. There are no expiration dates or time limits.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Absolutely. We offer a 30-day money-back guarantee on all bundles. If you are not completely satisfied, contact our support team for a full refund.",
  },
  {
    question: "Do I get new courses added later?",
    answer:
      "The All Course Bundle includes access to new courses as they are released at no extra cost. For other bundles, the included courses are listed on this page.",
  },
];

export default async function BundlePage({ params }: BundlePageProps) {
  const { slug } = await params;
  const bundle = bundles.find((b) => b.slug === slug);
  if (!bundle) notFound();

  const includedCourses = bundle.includedCourseSlugs
    .map((courseSlug) => courses.find((c) => c.slug === courseSlug))
    .filter(Boolean) as (typeof courses)[number][];

  return (
    <>
      <BundleHero
        title={bundle.title}
        description={bundle.description}
        price={bundle.price}
        originalPrice={bundle.originalPrice}
        buyUrl={bundle.buyUrl}
        imagePath={bundle.imagePath}
        highlights={bundle.highlights}
      />
      <StickyPriceBar
        price={bundle.price}
        originalPrice={bundle.originalPrice}
        rating={4.8}
        learnerCount="25k+"
        buyUrl={bundle.buyUrl}
      />
      <IncludedCoursesList
        courses={includedCourses.map((c) => ({
          cardTitle: c.cardTitle,
          instructorName: c.instructor.name,
          price: c.price,
          imagePath: c.imagePath,
        }))}
      />
      <ValuePropositionGrid
        heading="Why Choose a Bundle?"
        items={valuePropItems}
        variant="dark"
      />
      <FAQAccordion items={bundleFAQs} variant="light" />
    </>
  );
}
