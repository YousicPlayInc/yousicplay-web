# YousicPlay Web - Architecture Decisions

## How to use this file
When a design decision is made, log it here so we don't re-discuss it in future sessions.

---

### 001: Static Site with Next.js App Router
- **Date:** Feb 2025
- **Context:** Rebuilding WordPress/Elementor site as modern static site
- **Decision:** Next.js 16 with App Router, full static generation (`generateStaticParams` for course pages)
- **Rationale:** No backend needed for marketing site. Static = fast, cheap hosting, good SEO.
- **Consequences:** No server-side features. Content changes require code changes + redeploy.

### 002: Tailwind CSS v4 with @theme inline
- **Date:** Feb 2025
- **Context:** Needed design token system for colors (navy, lime, magenta, cream)
- **Decision:** Tailwind CSS v4 using `@theme inline {}` in globals.css. No tailwind.config.ts.
- **Rationale:** v4 is the current standard. Inline theme keeps tokens close to usage.
- **Consequences:** Must use `@theme inline` syntax, not JS config. Some AI tools suggest old v3 patterns.

### 003: Content in TypeScript data files, not CMS
- **Date:** Feb 2025
- **Context:** 14 courses with lesson plans, testimonials, FAQ data
- **Decision:** All content in `src/data/*.ts` with typed interfaces
- **Rationale:** Simple, type-safe, no CMS dependency for a marketing site. Easy to update.
- **Consequences:** Content updates require developer involvement. Fine for now.

### 004: Design token colors
- **Date:** Feb 2025
- **Context:** Matching existing YousicPlay brand from WordPress site
- **Decision:** Navy (#202536), Lime (#CCFF00), Magenta (#B10BFF), Cream (#F5F5F0)
- **Rationale:** Matched from live yousicplay.com
- **Consequences:** All components use these tokens. Changing a color updates everywhere.

### 005: Stats section - cream background with magenta numbers
- **Date:** Feb 2025
- **Context:** Originally built with dark navy bg. Live site uses cream.
- **Decision:** Cream bg, magenta stat numbers, navy text. Lime stroke under "23" instructor stat.
- **Rationale:** Visual comparison with live yousicplay.com
- **Consequences:** Matches live site closely.

### 006: Remove AI POWERED badge from course cards
- **Date:** Feb 2025
- **Context:** Course cards had "AI Powered" badge overlay. Live site doesn't have these.
- **Decision:** Removed the badge entirely
- **Rationale:** Match live site. Founders need faithful recreation, not new additions.
- **Consequences:** Cleaner card design.

### 007: Vercel deployment (CLI, not GitHub integration)
- **Date:** Feb 2025
- **Context:** GitHub org permissions blocked Vercel's GitHub integration
- **Decision:** Deploy via `vercel` CLI directly (uploads files, no GitHub connection)
- **Rationale:** Workaround for org permission issue. Still gets preview URLs.
- **Consequences:** Must run `vercel` manually to deploy. No auto-deploy on push.
