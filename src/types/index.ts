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
  /** Mux playback ID — found in Mux dashboard after uploading the video */
  muxPlaybackId?: string;
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

export type ProductType = "free" | "digital" | "coaching";

export interface Product {
  slug: string;
  title: string;
  cardTitle: string;
  description: string;
  type: ProductType;
  price: number;
  buyUrl: string;
  imagePath: string;
  instructor?: Instructor;
  instrument?: string;
  level?: string;
  features?: string[];
}

export interface Bundle {
  slug: string;
  title: string;
  cardTitle: string;
  description: string;
  price: number;
  originalPrice: number;
  buyUrl: string;
  imagePath: string;
  includedCourseSlugs: string[];
  highlights?: string[];
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
