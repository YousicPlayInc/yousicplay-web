import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductHero from "@/components/sections/product/ProductHero";
import StickyPriceBar from "@/components/shared/StickyPriceBar";
import ValuePropositionGrid from "@/components/shared/ValuePropositionGrid";
import FAQAccordion from "@/components/shared/FAQAccordion";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | YousicPlay`,
    description: product.description,
  };
}

const valuePropsByType = {
  free: {
    heading: "Start Learning Today",
    items: [
      {
        title: "Completely Free",
        description:
          "No credit card required, no hidden fees. Start learning right away with zero risk.",
      },
      {
        title: "Expert Instruction",
        description:
          "The same quality instruction found in our premium courses, available at no cost.",
      },
      {
        title: "Learn at Your Pace",
        description:
          "Access the material whenever you want. No deadlines, no pressure.",
      },
    ],
  },
  digital: {
    heading: "What You Get",
    items: [
      {
        title: "Instant Download",
        description:
          "Get immediate access to your files after purchase. Start using them right away.",
      },
      {
        title: "Professional Quality",
        description:
          "Created by world-class musicians and optimized for real-world performance use.",
      },
      {
        title: "Lifetime Access",
        description:
          "Download and keep your files forever. Re-download anytime from your account.",
      },
    ],
  },
  coaching: {
    heading: "The Workshop Experience",
    items: [
      {
        title: "Live Interaction",
        description:
          "Get real-time feedback from professional instructors who can guide your progress.",
      },
      {
        title: "Personalized Guidance",
        description:
          "Every session is tailored to your skill level and musical goals.",
      },
      {
        title: "Community Learning",
        description:
          "Learn alongside other motivated musicians in a supportive group environment.",
      },
    ],
  },
};

const faqsByType = {
  free: [
    {
      question: "Is it really free?",
      answer:
        "Yes, completely free. No credit card required, no hidden charges, and no strings attached. We offer these courses so you can experience the quality of YousicPlay instruction before committing to a paid course.",
    },
    {
      question: "Do I need an account?",
      answer:
        "You will need to create a free account on our learning platform to access the material. It only takes a moment and gives you a place to track your progress.",
    },
    {
      question: "What skill level is this for?",
      answer:
        "Our free courses are designed to be accessible for beginners while still offering value to intermediate players looking to refine specific skills.",
    },
  ],
  digital: [
    {
      question: "What format are the files?",
      answer:
        "Digital products are delivered as downloadable files compatible with popular software and hardware. Specific format details are listed in the product description.",
    },
    {
      question: "Can I use these in live performances?",
      answer:
        "Absolutely. These presets and materials are designed for both practice and live performance use. Many of our instructors use these exact settings on stage.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes. If you are not satisfied with your purchase, contact our support team within 30 days for a full refund.",
    },
  ],
  coaching: [
    {
      question: "How do the sessions work?",
      answer:
        "Sessions are held live over Zoom at scheduled times. You will receive a link and calendar invite after purchase. Sessions are interactive with time for Q&A and individual feedback.",
    },
    {
      question: "What if I miss a session?",
      answer:
        "All sessions are recorded and made available to enrolled students. While live participation is encouraged for the interactive benefits, you can catch up on any missed sessions at your convenience.",
    },
    {
      question: "What skill level do I need?",
      answer:
        "Our coaching workshops welcome all skill levels. The instructor will adapt the material to address the range of experience in the group, and individual feedback is personalized to your level.",
    },
  ],
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const valueProps = valuePropsByType[product.type];
  const faqs = faqsByType[product.type];

  return (
    <>
      <ProductHero
        title={product.title}
        description={product.description}
        price={product.price}
        buyUrl={product.buyUrl}
        imagePath={product.imagePath}
        type={product.type}
        instructorName={product.instructor?.name}
        instrument={product.instrument}
        level={product.level}
        features={product.features}
      />
      {product.price > 0 && (
        <StickyPriceBar
          price={product.price}
          originalPrice={product.price}
          rating={4.7}
          learnerCount="2k+"
          buyUrl={product.buyUrl}
        />
      )}
      <ValuePropositionGrid
        heading={valueProps.heading}
        items={valueProps.items}
        variant="dark"
      />
      <FAQAccordion items={faqs} variant="light" />
    </>
  );
}
