# YousicPlay — Project Context for Claude Code

## What This Project Is

YousicPlay is an online music education platform with two product lines:

1. **Course Platform** (this repo) — Celebrity-taught video courses sold via a Next.js marketing site, with course delivery currently on Thinkific
2. **iOS App** (separate repo: `yousicplay-ios`) — AI-powered piano learning app with games, Lydi AI tutor, and Y-Score adaptive skill tracking. MVP submitting to App Store this week.

This repo (`yousicplay-web`) is the Next.js marketing site and will become the primary storefront where customers browse courses, check out via Stripe, and get enrolled in Thinkific for course delivery.

## The Business Situation

- 2023 peak: $545K revenue. Nov 2023 alone: $102K (but required $79K ad spend at 1.29x ROAS)
- Revenue collapsed to ~$2K/month by 2025 as ad spend stopped
- We're rebuilding the revenue engine. Justin (me) gets $8K/month draw once revenue supports it; all remaining profit goes back into the company to fund the app and an eventual investor raise
- Head of Marketing is Sean McGinn (ex-Pixar, Netflix, DreamWorks, Lucasfilm, Disney)
- ~25K past customer emails in Klaviyo (waiting on access)

## Current Tech Stack

- **This site:** Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, TypeScript 5, deployed on Vercel
- **Course delivery:** Thinkific at courses.yousicplay.com (staying for now; Next.js site handles all selling)
- **Video hosting:** Wistia
- **Payments:** PayPal only on Thinkific (NO Stripe yet — this is a critical gap)
- **Email:** Klaviyo (~25K contacts, waiting on access)
- **Analytics:** None on this site yet (GA4 + Meta Pixel needed)
- **Path alias:** `@/*` → `./src/*`
- **Colors:** Navy (#202536), Lime (#CCFF00), Magenta (#B10BFF), Cream (#F5F5F0)
- **Fonts:** Poppins + Playfair Display (Google Fonts)

## What Needs to Be Built (Priority Order)

### 1. Supabase Setup (START HERE)
Create Supabase project and define schema:
- `customers` — id, email, name, stripe_customer_id, klaviyo_profile_id, created_at
- `purchases` — id, customer_id, product_id, stripe_payment_id, amount, currency, status, created_at
- `products` — id, name, slug, type (course/bundle/subscription), price, thinkific_course_id, stripe_price_id, active
- `experiments` — id, name, variants (jsonb), traffic_split, status, created_at
- `experiment_assignments` — id, experiment_id, visitor_id, variant, converted, created_at
- `email_captures` — id, email, source, page_url, created_at

Install `@supabase/supabase-js`. Create a client utility at `@/lib/supabase.ts`. Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (plus `SUPABASE_SERVICE_ROLE_KEY` for server-side).

### 2. Stripe Integration
- Install `stripe` and `@stripe/stripe-js`
- Create products and prices in Stripe matching our course catalog (see `src/data/courses.ts` for the 15 courses)
- Build checkout flow: API route at `/api/checkout` that creates a Stripe Checkout Session
- Webhook handler at `/api/webhooks/stripe` that on `checkout.session.completed`:
  - Creates/updates customer in Supabase
  - Records purchase
  - Enrolls user in Thinkific via their API (POST /api/public/v1/enrollments)
  - Triggers confirmation email
- Environment variables: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

### 3. Email Capture Forms
The site already has email capture form UI but they're non-functional (preventDefault, no submission).
- Wire forms to POST to `/api/email-capture`
- Store in Supabase `email_captures` table
- Once Klaviyo access is available: also push to Klaviyo via their API

### 4. GA4 + Meta Pixel
- Install Google Analytics 4 and Meta Pixel on all pages
- Track: page views, course views, checkout initiated, purchase completed
- Environment variables: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`

### 5. A/B Testing Infrastructure
- Edge Middleware (`middleware.ts`) for variant assignment based on cookie
- Store assignments in Supabase `experiment_assignments`
- First experiment: pricing test ($129 vs $149 vs $199 for individual courses)

### 6. Programmatic SEO
- Dynamic routes for long-tail keywords (e.g., `/learn/gospel-piano-chords`, `/learn/jazz-improvisation-techniques`)
- MDX-based blog at `/blog/[slug]`
- Target: 200-500 landing pages covering instrument + genre + skill combinations
- JSON-LD structured data on all pages (Course schema, Organization schema)
- Meta descriptions and OG tags on every page

## Architecture Notes

- **Thinkific stays for course delivery** (video player, student dashboard). The Next.js site is the storefront only.
- **Purchase flow:** Customer browses on yousicplay.com → Stripe Checkout → webhook fires → Supabase records purchase → Thinkific API enrolls student → customer redirected to courses.yousicplay.com
- **DNS plan:** yousicplay.com needs to point to Vercel (currently WordPress). courses.yousicplay.com stays on Thinkific.
- **No traditional ETL needed.** Stripe webhooks + Klaviyo webhooks push data to Supabase in real-time.

## Course Data

See `src/data/courses.ts` for all 15 courses with instructor details and pricing. Key instructors:
- Cory Henry (Snarky Puppy) — Organ & Synth, Art of Soloing, 30-Day Workshop, Lick Packs
- Jordan Rudess (Dream Theater) — Piano & Synth Technique
- Lindsey Stirling — Violin & Arranging
- Eric Gales — Blues Guitar
- Noel Schajris (9M followers) — Vocal Technique
- Arturo Sandoval (10 Grammys) — Trumpet & Musicality
- Jesús Molina — Jazz Piano & Improvisation, Art of Arranging
- Alain Merville (Berklee professor) — Gospel Piano

## Existing Pages

- `/` — Homepage
- `/classes/[slug]` — Individual course pages
- `/all-classes` — Course catalog
- `/about`, `/community`, `/support`
- `/privacy-policy`, `/terms-of-service`

## Known Issues

- Email capture forms don't submit (preventDefault, no backend)
- No API routes exist yet
- No database connected
- No analytics installed
- No payment processing
- Missing: instructor photos, course thumbnails, partner logos, favicon, OG image
- No image hosting decision made yet

## Proposed Pricing (to be A/B tested)

- Individual courses: $149 (up from $79)
- All-course bundle: $349 (up from $99)
- Monthly subscription: $19.99/mo
- Annual subscription: $149/yr
- Workshop/add-ons: $49 (up from $29.95)
- Free lead magnets: $0 (Cory Henry 30-Day, chord courses)

## Related Documents

These are in the YP folder alongside this repo:
- `YousicPlay_Financial_Model.xlsx` — Full financial model with 3 scenarios and editable assumptions
- `YousicPlay_Product_Pricing_Strategy.docx` — Product & pricing strategy for the team
- `YousicPlay_University_Proposal.docx` — Long-term vision for $10K/year education program
- `YousicPlay_AI_Growth_Strategy_For_Sean.docx` — AI marketing strategy in plain language for Sean
- `YousicPlay_Operational_Blueprint.docx` — Full operational blueprint with AI agent org chart
- `PRODUCT_OVERVIEW.md` — iOS app product overview and architecture
