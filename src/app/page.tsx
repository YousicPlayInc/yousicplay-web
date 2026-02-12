import HeroSection from "@/components/sections/home/HeroSection";
import FeaturedClassSection from "@/components/sections/home/FeaturedClassSection";
import ValuePropositionGrid from "@/components/shared/ValuePropositionGrid";
import TrendingCarousel from "@/components/sections/home/TrendingCarousel";
import StatsSection from "@/components/sections/home/StatsSection";
import PartnerLogoBar from "@/components/shared/PartnerLogoBar";
import TestimonialsCarousel from "@/components/shared/TestimonialsCarousel";
import InstructorQuote from "@/components/sections/home/InstructorQuote";
import WhatsNextSection from "@/components/sections/home/WhatsNextSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import { globalFaq } from "@/data/faq";

const trendingCourses = courses.slice(0, 8).map((c) => ({
  slug: c.slug,
  imagePath: c.imagePath,
  cardTitle: c.cardTitle,
  instructorName: c.instructor.name,
  instrument: c.instrument,
  level: c.level,
}));

const valuePropItems = [
  {
    title: "Explore",
    description:
      "hundreds of lessons and captivating stories from the world's best musicians.",
  },
  {
    title: "Learn",
    description:
      "the skills, techniques, and theory you need to become a pro at your instrument.",
  },
  {
    title: "Grow",
    description:
      "with your instrument through playful learning designed for easy improvement and music creation.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedClassSection />
      <ValuePropositionGrid
        heading="Play and Learn With Your Music Heroes"
        items={valuePropItems}
        variant="light"
      />
      <TrendingCarousel courses={trendingCourses} />
      <StatsSection />
      <PartnerLogoBar />
      <TestimonialsCarousel testimonials={testimonials} />
      <InstructorQuote />
      <WhatsNextSection />
      <FAQAccordion items={globalFaq} variant="dark" />
    </>
  );
}
