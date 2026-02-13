# YousicPlay Web - Project Capsule

**When to use this file:**
- New team member's first session
- Returning after days/weeks away
- Working on a different machine

**For quick restarts:** Just use `/compact` instead.

---

## What Is This?
Static marketing site rebuilding yousicplay.com (WordPress/Elementor) in Next.js 16. Music education platform with courses from world-class musicians.

## Tech Stack
- Next.js 16.1.6 (App Router, static generation)
- TypeScript strict mode
- Tailwind CSS v4 (`@theme inline` in globals.css)
- Poppins + Playfair Display fonts

## Current State
- **25 routes built** (homepage, 14 course pages, catalog, about, community, privacy, terms, 404, sitemap, robots)
- **Deployed to Vercel** via CLI
- **Images wired** but some still placeholders
- **Hero video** working

## Remaining Work
- Phase 8: Responsive polish (mobile nav, stacked layouts)
- Real images from client (replacing placeholders)
- Email form ESP integration
- Video embeds (using thumbnails currently)

## Key Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (validates all 25 pages)
vercel               # Deploy to Vercel
```

## Design Tokens
Navy: #202536 | Lime: #CCFF00 | Magenta: #B10BFF | Cream: #F5F5F0

## Coding Conventions
- `"use client"` only for interactive components
- `cn()` helper for conditional classes (clsx + tailwind-merge)
- Content in `src/data/*.ts`, not fetched
- Tailwind v4 `@theme inline {}`, not tailwind.config.ts
