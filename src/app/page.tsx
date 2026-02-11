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
      "Browse courses across piano, guitar, violin, drums, singing, songwriting, and more. Find the perfect course for your musical journey.",
  },
  {
    title: "Learn",
    description:
      "Dive into expertly crafted lessons from Grammy-winning musicians. Learn at your own pace with lifetime access to all materials.",
  },
  {
    title: "Grow",
    description:
      "Apply what you learn, connect with fellow students, and watch your skills transform. Join a community of passionate music learners.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedClassSection />
      <ValuePropositionGrid
        heading="Play and Learn From the Best"
        items={valuePropItems}
        variant="light"
        prefixes={["01", "02", "03"]}
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
