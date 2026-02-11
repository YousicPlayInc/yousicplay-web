# YousicPlay Web — Remaining Work

## Status: Site skeleton complete, needs assets + integrations + polish before launch

---

## 1. Images & Media Assets

### 1a. Collect Source Images from Client/Team
- [ ] **14 instructor photos** (headshots for cards + bios)
  - Cory Henry, Alain Merville, Jesús Molina, Jordan Rudess, Shedrick Mitchell, Eric Gales, Jax, Lindsey Stirling, Myron Butler, Noel Schajris, Robert "Sput" Searight, Andrew Gouché, Chrisette Michele, Ne-Yo
  - Need: square crop for bio circles (~400×400), landscape crop for cards (~800×600)
  - Format: JPG or PNG, highest resolution available
- [ ] **14 course thumbnails** (hero images / card images)
  - One per course — can be instructor action shots or stylized course artwork
  - Need: landscape aspect ratio (~1200×800), consistent style
- [ ] **Testimonial photos** (6 student photos or generic avatars)
  - Currently placeholder names: Pablo Fernando, Bert Coleman, Sarah Johnson, Marcus Williams, Jessica Chen, David Rodriguez
  - Decision needed: use real student photos with permission, or stock/avatar images?
- [ ] **5 partner logos** (SVG preferred)
  - Sweetwater, Berklee, Grammy, Universal, Billboard
  - Need: SVG or high-res PNG with transparent background
- [ ] **Homepage hero background image** (currently using gradient only)
  - Optional: could add a collage of instructors or a music-themed background
- [ ] **Ne-Yo quote section photo** (circular crop for homepage)
- [ ] **YousicPlay logo** (if one exists beyond the text wordmark)
  - Need: SVG for navbar + favicon versions
- [ ] **Favicon / app icon** (currently using Next.js default)
  - Need: favicon.ico, apple-touch-icon.png, og-image.png
- [ ] **Open Graph / social share image** (1200×630 for link previews)

### 1b. Image Hosting Decision
- [ ] **Option A: Commit to repo** (simplest — put optimized images in `/public/images/`)
  - Pros: No external dependency, works with static export, versioned with code
  - Cons: Bloats repo size, no CDN transforms
- [ ] **Option B: Cloudinary** (recommended for production)
  - Pros: Auto-optimization, responsive sizes, CDN delivery, format negotiation (WebP/AVIF)
  - Cons: Additional service to manage, free tier is 25GB bandwidth/month
  - Setup: Create account → upload images → use `next-cloudinary` or raw URLs
- [ ] **Option C: Vercel Image Optimization** (comes free with Vercel hosting)
  - Pros: Zero config, built into Next.js `<Image>`, automatic WebP/AVIF
  - Cons: Only works when deployed to Vercel, 1000 free optimizations/month on hobby
- [ ] **Option D: AWS S3 + CloudFront**
  - Pros: Full control, scales infinitely, familiar to team (already using AWS for other services)
  - Cons: More setup, need to configure CloudFront distribution

### 1c. Image Optimization Tasks (after assets received)
- [ ] Run all images through optimization (sharp, squoosh, or ImageOptim)
- [ ] Generate WebP/AVIF variants (or rely on hosting to do this)
- [ ] Add proper `sizes` attributes to all `<Image>` components
- [ ] Create blur placeholder data URLs for above-the-fold images
- [ ] Replace all placeholder `<div>`s with real `<Image>` components

---

## 2. Video Content
- [ ] **14 course preview/trailer videos** (one per course)
  - Currently: placeholder play button with no video source
  - Decision needed: Host on YouTube/Vimeo (embed) or self-host?
  - The `VideoEmbed` component is built and supports click-to-play iframe replacement
- [ ] Update `videoUrl` field in `src/data/courses.ts` for each course
- [ ] Homepage featured class (Cory Henry) video URL

---

## 3. Email Service Provider (ESP) Integration

### 3a. Choose an ESP
- [ ] **Option A: Mailchimp** — most common, generous free tier (500 contacts)
- [ ] **Option B: ConvertKit** — built for creators, good automation
- [ ] **Option C: Beehiiv** — newsletter-focused, modern
- [ ] **Option D: Resend** — developer-friendly, transactional + marketing
- [ ] **Option E: Whatever the existing WordPress site uses** — check current ESP

### 3b. Integration Points (3 forms to connect)
- [ ] **Email Capture Modal** (`src/components/shared/EmailCaptureModal.tsx`)
  - Fires on page load (unless dismissed)
  - Collects: Name, Email
  - Currently: `e.preventDefault()` with no submission logic
  - Needs: API route or direct ESP API call, success/error states, loading spinner
- [ ] **Footer Newsletter Form** (`src/components/layout/FooterEmailForm.tsx`)
  - Collects: Email
  - Currently: `e.preventDefault()` with no submission logic
  - Needs: Same as above
- [ ] **"Unlock Success" Button** → opens the Email Capture Modal (already wired)

### 3c. Implementation Tasks
- [ ] Create API route: `src/app/api/subscribe/route.ts`
- [ ] Add ESP SDK/API key to environment variables (`.env.local`)
- [ ] Add form validation (email format, required fields)
- [ ] Add loading, success, and error UI states to both forms
- [ ] Add honeypot or reCAPTCHA for spam prevention
- [ ] Test: successful subscription, duplicate email handling, error states
- [ ] Set up welcome email automation in ESP

---

## 4. Hosting & Deployment

### 4a. Vercel Setup
- [ ] Create Vercel account (or use existing) and link to GitHub org
- [ ] Import `YousicPlayInc/yousicplay-web` repo
- [ ] Configure build settings (should auto-detect Next.js)
- [ ] Set environment variables in Vercel dashboard:
  - `ESP_API_KEY` (email service provider)
  - Any other secrets needed
- [ ] Configure preview deployments for PRs (enabled by default)
- [ ] Set up production branch (main)

### 4b. Domain Configuration
- [ ] **Current state**: `yousicplay.com` likely points to WordPress hosting (Elementor site)
  - Check current DNS: `dig yousicplay.com` or check registrar
- [ ] **Decision**: When to cut over?
  - Option 1: Deploy to `new.yousicplay.com` or `beta.yousicplay.com` first for review
  - Option 2: Cut over directly after approval
- [ ] **DNS changes needed**:
  - Add Vercel's DNS records (CNAME or A record)
  - If using Vercel DNS: Transfer nameservers to Vercel
  - If keeping current DNS: Add CNAME `yousicplay.com` → `cname.vercel-dns.com`
  - Add `www.yousicplay.com` redirect
- [ ] Enable SSL (automatic on Vercel)
- [ ] Verify `courses.yousicplay.com` subdomain is NOT affected (different service)
- [ ] Update `sitemap.ts` and `robots.ts` if domain changes
- [ ] Set up redirects for any old WordPress URLs that change (in `next.config.ts`)

### 4c. Old Site Redirect Map
- [ ] Audit old WordPress URLs vs new Next.js URLs
- [ ] Create redirect rules in `next.config.ts` for changed paths:
  ```
  /classes/cory-henry-piano-workshop → /classes/cory-henry-workshop
  ```
- [ ] Set up catch-all redirect for any unmapped old URLs → homepage or 404

---

## 5. Testing

### 5a. Unit / Component Tests
- [ ] Install testing framework: `vitest` + `@testing-library/react` + `@testing-library/jest-dom`
- [ ] Configure `vitest.config.ts` with path aliases
- [ ] Write tests for:
  - [ ] `cn()` utility function
  - [ ] `Button` component (renders link vs button, variants, external)
  - [ ] `CourseFilterBar` (filter logic)
  - [ ] `EmailCaptureModal` (open/close, localStorage dismissal)
  - [ ] `StickyPriceBar` (visibility toggle)
  - [ ] `StarRating` (correct star rendering for various ratings)
  - [ ] `FAQAccordion` (expand/collapse)
  - [ ] Course data integrity (all 14 courses have required fields)
  - [ ] `generateStaticParams` returns all 14 slugs

### 5b. End-to-End Tests
- [ ] Install Playwright: `npm init playwright@latest`
- [ ] Write E2E tests for:
  - [ ] Homepage loads with all sections visible
  - [ ] Navigation: click "Classes" → lands on `/all-classes`
  - [ ] All Classes: filters work (select instrument → grid filters)
  - [ ] Course page: click a course card → correct course detail loads
  - [ ] Sticky price bar appears after scrolling past hero
  - [ ] FAQ accordion expands/collapses
  - [ ] Email modal appears on first visit, dismisses, doesn't reappear
  - [ ] 404 page renders for unknown routes
  - [ ] All external links (Buy Now, Login) have correct `href` and `target="_blank"`
  - [ ] Mobile nav: hamburger opens menu, links work

### 5c. Responsive / Visual Regression Tests
- [ ] Configure Playwright for multiple viewport sizes:
  - Mobile: 375×812 (iPhone SE/14)
  - Tablet: 768×1024 (iPad)
  - Desktop: 1440×900
  - Wide: 1920×1080
- [ ] Screenshot comparison tests for key pages at each viewport
- [ ] Manual QA checklist:
  - [ ] No horizontal overflow at any breakpoint
  - [ ] Text remains readable (no truncation, overlap)
  - [ ] Touch targets ≥ 44px on mobile
  - [ ] Images don't break layout (aspect ratios maintained)
  - [ ] Modals are scrollable on small screens

### 5d. Performance & Accessibility
- [ ] Run Lighthouse CI on all page types (home, catalog, course detail, static)
  - Target: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Run `axe-core` accessibility audit
- [ ] Check all images have alt text
- [ ] Verify keyboard navigation works (tab order, focus indicators, escape to close modal)
- [ ] Check color contrast ratios (lime on navy, white on navy, etc.)

---

## 6. Responsive Polish (Phase 8)

### 6a. Mobile Navigation
- [ ] Test hamburger menu animation (currently instant show/hide — consider slide transition)
- [ ] Ensure mobile menu closes on route change (already wired with `onClick`)
- [ ] Add focus trap when mobile menu is open

### 6b. Layout Adjustments by Breakpoint
- [ ] **Homepage Hero**: Stack text, reduce font size on mobile
- [ ] **Featured Class**: Stack video + info vertically on mobile
- [ ] **Trending Carousel**: Ensure single-card view on mobile, proper touch scrolling
- [ ] **Testimonials Carousel**: Single card on mobile (currently 2-per-view)
- [ ] **Course Hero**: Stack video + info vertically on mobile
- [ ] **Instructor Bio**: Stack photo + text vertically on mobile (already set up)
- [ ] **Footer**: 2-column on tablet, 1-column on mobile
- [ ] **All Classes grid**: 1-col mobile, 2-col tablet, 3-4 col desktop
- [ ] **Filter bar**: Stack filters vertically on mobile (already set up)
- [ ] **Sticky price bar**: Ensure Buy Now button doesn't overflow on narrow screens

### 6c. Typography Scale
- [ ] Verify heading sizes reduce properly at each breakpoint
- [ ] Check that body text remains ≥ 14px on mobile
- [ ] Test long instructor names (e.g., Robert "Sput" Searight) don't overflow

### 6d. Touch & Interaction
- [ ] Test carousel swipe gestures on mobile (currently button-only navigation)
- [ ] Consider adding touch-swipe support to `TrendingCarousel` and `TestimonialsCarousel`
- [ ] Ensure modal is scrollable on small screens with long content
- [ ] Test "Unlock Success" button doesn't overlap footer content on short viewports

---

## 7. Content & Data Cleanup

### 7a. Course Data Verification
- [ ] Cross-reference all course titles with live `courses.yousicplay.com` for accuracy
- [ ] Verify all `buyUrl` links are correct and active
- [ ] Update pricing if any courses have changed price
- [ ] Verify instructor bios are approved by client
- [ ] Confirm lesson plan titles match actual course content

### 7b. Testimonials
- [ ] Replace placeholder testimonials with real student reviews (if available)
- [ ] Get proper names and photos with permission

### 7c. Legal Pages
- [ ] Have Privacy Policy and Terms of Service reviewed by legal
- [ ] Update "Last updated" dates when finalized

### 7d. Copy / Content Review
- [ ] Proofread all page copy for typos, grammar, brand voice
- [ ] Verify all social media links are correct and active
- [ ] Confirm support email (support@yousicplay.com) is monitored

---

## 8. Analytics & Tracking

- [ ] **Google Analytics 4** or **Plausible/Fathom** (privacy-friendly alternative)
  - Add tracking script to `layout.tsx` or use `@next/third-parties`
- [ ] **Google Tag Manager** (if running paid ads)
- [ ] **Facebook Pixel** (if running Facebook/Instagram ads)
- [ ] **Conversion tracking** on Buy Now clicks (external link events)
- [ ] **Email signup events** (track modal + footer form submissions)
- [ ] **Hotjar or FullStory** (optional — session recordings for UX insights)

---

## 9. Pre-Launch Checklist

- [ ] All images replaced (no gray placeholder boxes)
- [ ] All videos have URLs
- [ ] Email forms submit successfully to ESP
- [ ] All Buy Now links tested and working
- [ ] Login link goes to correct URL
- [ ] Favicon and OG images set
- [ ] `robots.txt` allows crawling
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] DNS propagated, SSL active
- [ ] Old WordPress site taken down or redirected
- [ ] 301 redirects for any changed URLs
- [ ] Lighthouse scores meet targets
- [ ] Mobile tested on real devices (not just browser resize)
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Load tested (shouldn't be an issue with static generation)
- [ ] Backup of old WordPress site (just in case)

---

## 10. Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Monitor 404 errors in analytics for missed redirects
- [ ] Set up uptime monitoring (e.g., Vercel's built-in, UptimeRobot, or Checkly)
- [ ] Plan Phase 8 responsive polish sprint if not done pre-launch
- [ ] Plan image/video asset integration sprint
- [ ] Consider adding: course bundles page, blog, instructor profiles page
