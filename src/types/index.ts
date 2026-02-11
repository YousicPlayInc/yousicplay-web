export interface Instructor {
  name: string;
  slug: string;
  bio: string;
  photo: string;
  quote?: string;
}

export interface Lesson {
  title: string;
  description?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  photo: string;
  videoUrl?: string;
  instrument?: string;
  level?: string;
}

export interface Course {
  slug: string;
  title: string;
  cardTitle: string;
  instructor: Instructor;
  description: string;
  instrument: string;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount?: number;
  learnerCount: string;
  buyUrl: string;
  lessonPlan: Lesson[];
  skills: string[];
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  faq: FAQ[];
  imagePath: string;
  videoUrl?: string;
  heroImage?: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}
