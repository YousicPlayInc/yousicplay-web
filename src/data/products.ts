import type { Product } from "@/types";

export const products: Product[] = [
  // ── Free Lead Magnets ──────────────────────────────────────────────
  {
    slug: "gospel-piano-intro",
    title: "How to Play Gospel Piano with Your Own Unique Sound",
    cardTitle: "Gospel Piano Intro",
    description:
      "Learn how to create a style that's truly yours with gospel piano. This course will help you play with confidence and bring out your musical voice.",
    type: "free",
    price: 0,
    buyUrl: "https://courses.yousicplay.com/courses/Pivot-Modulation",
    imagePath: "/images/products/gospel-piano-intro.webp",
    instrument: "Piano",
    level: "Beginner",
    features: [
      "Pivot modulation techniques",
      "Building your unique gospel voice",
      "Confidence-building exercises",
    ],
  },
  {
    slug: "popular-chord-progression",
    title: "The Most Popular Chord Progression EVER!",
    cardTitle: "Popular Chord Progression",
    description:
      "Learn the chord pattern used in tons of popular songs! This simple trick will make your playing sound better and help you feel more confident on the keys.",
    type: "free",
    price: 0,
    buyUrl:
      "https://courses.yousicplay.com/courses/The-Most-Popular-Chord-Progression-EVER",
    imagePath: "/images/products/popular-chord-progression.webp",
    instrument: "Piano",
    level: "Beginner",
    features: [
      "The 2-5-1 chord progression explained",
      "Apply it to popular songs instantly",
      "Sound more professional immediately",
    ],
  },
  {
    slug: "chords-that-make-sense",
    title: "How to Play Chords That Make Sense",
    cardTitle: "Chords That Make Sense",
    description:
      "Learn pro chord progressions! Discover how the circle of fifths, tritones, and tendency tones create anticipation and craft stunning chords like a pro.",
    type: "free",
    price: 0,
    buyUrl:
      "https://courses.yousicplay.com/courses/How-to-Play-Chords-That-Make-Sense",
    imagePath: "/images/products/chords-that-make-sense.webp",
    instrument: "Piano",
    level: "Beginner",
    features: [
      "Circle of fifths mastery",
      "Tritone substitutions",
      "Tendency tones and anticipation",
    ],
  },
  {
    slug: "cory-henry-30-day",
    title: "Cory Henry's 30 Day Workshop",
    cardTitle: "30-Day Workshop (Free)",
    description:
      "Get started with Cory Henry's approach to piano in this free introductory workshop. Build foundational skills over 30 days with structured daily exercises.",
    type: "free",
    price: 0,
    buyUrl:
      "https://courses.yousicplay.com/courses/copy-of-cory-henry-30-day-workshop",
    imagePath: "/images/products/cory-henry-30-day.webp",
    instrument: "Piano",
    level: "Beginner",
    instructor: {
      name: "Cory Henry",
      slug: "cory-henry",
      bio: "Grammy Award-winning keyboardist known for his work with Snarky Puppy and The Funk Apostles.",
      photo: "/images/instructors/cory-henry-workshop.webp",
    },
    features: [
      "30 days of structured exercises",
      "Build piano fundamentals",
      "Introduction to Cory's teaching style",
    ],
  },
  {
    slug: "arturo-sandoval-tips",
    title: "Arturo Sandoval | Tips for Trumpet Technique",
    cardTitle: "Trumpet Tips (Free)",
    description:
      "Get free tips from 10-time Grammy winner Arturo Sandoval on improving your trumpet technique, tone production, and musical expression.",
    type: "free",
    price: 0,
    buyUrl:
      "https://courses.yousicplay.com/courses/arturo-sandoval-tips-trumpet-technique",
    imagePath: "/images/products/arturo-sandoval-tips.webp",
    instrument: "Trumpet",
    level: "All Levels",
    instructor: {
      name: "Arturo Sandoval",
      slug: "arturo-sandoval",
      bio: "10-time Grammy Award winner and legendary Cuban jazz trumpeter.",
      photo: "/images/instructors/arturo-sandoval.webp",
    },
    features: [
      "Tone production tips",
      "Breathing technique advice",
      "Musical expression guidance",
    ],
  },

  // ── Digital Products ───────────────────────────────────────────────
  {
    slug: "cory-henry-performance-kits",
    title: "Cory Henry | 3 Performance Kits",
    cardTitle: "3 Performance Kits",
    description:
      "Get Cory Henry's 3 signature performance kits — curated synth presets and organ settings used in his live shows and recordings.",
    type: "digital",
    price: 29.95,
    buyUrl:
      "https://courses.yousicplay.com/courses/Cory-Henry-3-performance-kits",
    imagePath: "/images/products/cory-henry-performance-kits.webp",
    instrument: "Piano",
    instructor: {
      name: "Cory Henry",
      slug: "cory-henry",
      bio: "Grammy Award-winning keyboardist known for his work with Snarky Puppy and The Funk Apostles.",
      photo: "/images/instructors/cory-henry-workshop.webp",
    },
    features: [
      "3 curated synth preset collections",
      "Organ drawbar settings",
      "Used in Cory's live performances",
    ],
  },
  {
    slug: "cory-henry-14-licks",
    title: "Cory Henry | 14 Favorite Licks",
    cardTitle: "14 Favorite Licks",
    description:
      "Learn 14 of Cory Henry's favorite keyboard licks — the signature runs, fills, and phrases that define his iconic sound.",
    type: "digital",
    price: 29.95,
    buyUrl:
      "https://courses.yousicplay.com/courses/Cory-Henry-14-Favorite-Licks",
    imagePath: "/images/products/cory-henry-14-licks.webp",
    instrument: "Piano",
    instructor: {
      name: "Cory Henry",
      slug: "cory-henry",
      bio: "Grammy Award-winning keyboardist known for his work with Snarky Puppy and The Funk Apostles.",
      photo: "/images/instructors/cory-henry-workshop.webp",
    },
    features: [
      "14 signature keyboard licks",
      "Video demonstrations for each lick",
      "Notation and practice tips included",
    ],
  },
  {
    slug: "jesus-molina-practice-techniques",
    title: "Jesús Molina | 5 Secret Practice Techniques",
    cardTitle: "5 Practice Techniques",
    description:
      "Discover 5 practice techniques that Jesús Molina uses to master new material quickly. These methods will transform how you practice piano.",
    type: "digital",
    price: 29.95,
    buyUrl:
      "https://courses.yousicplay.com/courses/Jesus-practice-techniques",
    imagePath: "/images/products/jesus-molina-practice.webp",
    instrument: "Piano",
    instructor: {
      name: "Jesús Molina",
      slug: "jesus-molina",
      bio: "World-renowned pianist and musical director who has worked with Luis Miguel, Andrea Bocelli, and many of Latin music's biggest stars.",
      photo: "/images/instructors/jesus-molina-workshop.webp",
    },
    features: [
      "5 proven practice methods",
      "Accelerate your learning speed",
      "Tips from a world-class performer",
    ],
  },
  {
    slug: "moog-presets",
    title: "Chief Apostle's Solo Leads — Moog Presets",
    cardTitle: "Moog Solo Presets",
    description:
      "Get Chief Apostle's signature Moog synthesizer presets for solo leads. Instantly elevate your keyboard sound with these professionally crafted patches.",
    type: "digital",
    price: 29.95,
    buyUrl:
      "https://courses.yousicplay.com/courses/chief-apostle-s-solo-leads-moog-presets",
    imagePath: "/images/products/moog-presets.webp",
    instrument: "Piano",
    features: [
      "Signature Moog solo lead presets",
      "Professionally crafted patches",
      "Compatible with Moog synthesizers",
    ],
  },

  // ── Coaching ───────────────────────────────────────────────────────
  {
    slug: "piano-workshop",
    title: "YousicPlay Piano Workshop — Live Coaching",
    cardTitle: "Live Piano Workshop",
    description:
      "Bi-weekly 30-minute live sessions led over Zoom by a credible instructor who will provide an interactive and real-time way to learn and apply new skills to your music.",
    type: "coaching",
    price: 150,
    buyUrl:
      "https://courses.yousicplay.com/courses/office-hours-with-piano-professional",
    imagePath: "/images/products/piano-workshop.webp",
    instrument: "Piano",
    level: "All Levels",
    features: [
      "Bi-weekly 30-minute live sessions",
      "Real-time Q&A with instructor",
      "Interactive skill application",
      "Zoom-based for convenience",
    ],
  },
];
