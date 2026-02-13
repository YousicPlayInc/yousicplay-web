# YousicPlay Web - Repo Map

## Architecture Summary
Static marketing site built with Next.js 16 (App Router). 25 routes total: homepage with 10 sections, 14 course detail pages generated via `generateStaticParams`, catalog page, and 5 static pages (about, community, privacy, terms, 404). All pages are statically generated at build time. No backend, no auth, no database. Tailwind CSS v4 with custom design tokens. Content lives in TypeScript data files, not a CMS.

## Folder Map
```
src/
  app/                    # Next.js App Router pages (25 routes)
    page.tsx              # Homepage - composes 10 section components
    layout.tsx            # Root layout (fonts, metadata, Navbar/Footer)
    globals.css           # Tailwind v4 @theme inline + global styles
    classes/[slug]/       # 14 dynamic course pages
    all-classes/          # Catalog with filter bar
    about/, community/    # Static content pages
    privacy-policy/, terms-of-service/
    not-found.tsx         # Custom 404
    sitemap.ts, robots.ts # SEO
  components/
    layout/               # Navbar, Footer, FooterEmailForm, MaxWidthWrapper
    sections/home/        # Homepage sections (Hero, Stats, Trending, etc.)
    sections/course/      # Course page sections (Hero, LessonPlan, Skills, etc.)
    shared/               # Reusable across pages (CourseCard, FAQ, Testimonials, etc.)
    ui/                   # Primitives (Button, Tag, StarRating, VideoEmbed)
  data/                   # Static content (courses, testimonials, FAQ, navigation, partners)
  lib/                    # Utilities (cn() helper)
  types/                  # TypeScript interfaces
public/
  images/                 # Course thumbnails, instructor photos, logos
  videos/                 # Hero background video (hero-bg.mp4)
```

## Hot Files (by risk/centrality)
| File | Why |
|------|-----|
| `src/app/page.tsx` | Homepage composition - touches all section components |
| `src/app/layout.tsx` | Root layout - fonts, metadata, nav/footer |
| `src/app/globals.css` | Tailwind v4 theme tokens - colors, fonts |
| `src/app/classes/[slug]/page.tsx` | Dynamic course pages - uses generateStaticParams |
| `src/data/courses.ts` | All 14 course definitions - content source of truth |
| `src/components/sections/home/HeroSection.tsx` | First thing visitors see - video bg |
| `src/components/shared/CourseCard.tsx` | Used on homepage + catalog + course pages |
| `src/components/shared/TestimonialsCarousel.tsx` | Complex interactive component |
| `src/components/layout/Navbar.tsx` | Site-wide navigation |
| `src/components/layout/Footer.tsx` | Site-wide footer with email form |
| `src/components/shared/StickyPriceBar.tsx` | Course page CTA - sticky positioning |
| `src/components/sections/home/TrendingCarousel.tsx` | Interactive carousel |
| `src/components/sections/home/StatsSection.tsx` | Recently restyled (cream bg, magenta numbers) |
| `src/components/sections/home/InstructorQuote.tsx` | Ne-Yo quote section |
| `src/lib/utils.ts` | cn() helper used everywhere |

## Key Conventions
1. **Client vs Server**: Only add `"use client"` for interactive components. Extract interactivity into sub-components (e.g., FooterEmailForm).
2. **Styling**: Tailwind v4 utility classes + `cn()` helper. Design tokens in `globals.css` `@theme inline {}`. No tailwind.config.ts.
3. **Data**: Content in `src/data/*.ts` files, not fetched. Typed with interfaces in `src/types/index.ts`.
4. **Fonts**: Poppins (body) + Playfair Display (headings) via `next/font/google`. CSS vars: `--font-poppins-var`, `--font-playfair-var`.
5. **Images**: Using Next.js `<Image>` with files in `public/images/`. Many are still placeholders.
6. **Components**: Sections are page-specific (`sections/home/`, `sections/course/`). Shared components go in `shared/`. UI primitives in `ui/`.
