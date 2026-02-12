import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import CourseHero from "@/components/sections/course/CourseHero";
import StickyPriceBar from "@/components/shared/StickyPriceBar";
import TransformSection from "@/components/sections/course/TransformSection";
import LessonPlan from "@/components/sections/course/LessonPlan";
import YourMusicYourWay from "@/components/sections/course/YourMusicYourWay";
import SkillsGrid from "@/components/sections/course/SkillsGrid";
import BetterWaySection from "@/components/sections/course/BetterWaySection";
import InstructorBio from "@/components/sections/course/InstructorBio";
import TestimonialsCarousel from "@/components/shared/TestimonialsCarousel";
import ValuePropositionGrid from "@/components/shared/ValuePropositionGrid";
import FAQAccordion from "@/components/shared/FAQAccordion";
import type { Metadata } from "next";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} | ${course.instructor.name}`,
    description: course.description,
  };
}

const valuePropItems = [
  {
    title: "Explore",
    description: "Browse through structured lessons designed to build your skills step by step.",
  },
  {
    title: "Learn",
    description: "Follow along with expert video instruction at your own pace.",
  },
  {
    title: "Grow",
    description: "Apply techniques and build real skills you can use in your own music.",
  },
];

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <CourseHero
        title={course.title}
        description={course.description}
        instructorName={course.instructor.name}
        instructorBio={course.instructor.bio}
        instrument={course.instrument}
        level={course.level}
        price={course.price}
        originalPrice={course.originalPrice}
        rating={course.rating}
        learnerCount={course.learnerCount}
        buyUrl={course.buyUrl}
        imagePath={course.heroImage || course.imagePath}
      />
      <StickyPriceBar
        price={course.price}
        originalPrice={course.originalPrice}
        rating={course.rating}
        learnerCount={course.learnerCount}
        buyUrl={course.buyUrl}
      />
      <TransformSection instrument={course.instrument} benefits={course.benefits} />
      <LessonPlan lessons={course.lessonPlan} />
      <YourMusicYourWay />
      <SkillsGrid skills={course.skills} />
      <BetterWaySection />
      <InstructorBio
        name={course.instructor.name}
        bio={course.instructor.bio}
        photo={course.instructor.photo}
        quote={course.instructor.quote}
      />
      <TestimonialsCarousel testimonials={testimonials} />
      <ValuePropositionGrid
        heading="Your Learning Journey"
        items={valuePropItems}
        variant="dark"
      />
      <FAQAccordion items={course.faq} variant="light" />
    </>
  );
}
