import type { Course } from "@/types";

const SITE_URL = "https://yousicplay.com";
const SITE_NAME = "YousicPlay";
const LOGO_URL = `${SITE_URL}/images/yousic-logo.svg`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [],
    description:
      "Learn music from the world's best musicians. Celebrity-taught video courses in piano, guitar, violin, drums, singing and more.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/all-classes?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/classes/${course.slug}`,
    image: `${SITE_URL}${course.imagePath}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
      description: course.instructor.bio,
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/classes/${course.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      bestRating: 5,
      reviewCount: parseReviewCount(course.learnerCount),
    },
    courseMode: "Online",
    educationalLevel: course.level,
    about: course.instrument,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `${course.lessonPlan.length} lessons`,
    },
  };
}

export function courseListSchema(courses: Course[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Music Courses",
    description:
      "Browse all YousicPlay music courses taught by celebrity musicians and world-class instructors.",
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/classes/${course.slug}`,
      name: course.title,
      image: `${SITE_URL}${course.imagePath}`,
    })),
  };
}

/**
 * Parse learnerCount strings like "12k+" into a numeric value for reviewCount.
 */
function parseReviewCount(learnerCount: string): number {
  const cleaned = learnerCount.replace(/[+,]/g, "").trim().toLowerCase();
  if (cleaned.endsWith("k")) {
    return Math.round(parseFloat(cleaned.replace("k", "")) * 1000);
  }
  return parseInt(cleaned, 10) || 100;
}
