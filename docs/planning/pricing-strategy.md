# YousicPlay Pricing Strategy

> Full editable version: [Google Docs — TBD]

## Current Pricing (Thinkific, as of March 2027)

| Tier | Price | Products |
|------|-------|----------|
| Free | $0 | 5 lead magnets (chord courses, Cory Henry 30-day, Arturo tips) |
| Digital | $29.95 | Lick packs, performance kits, Moog presets, practice techniques |
| Standard Course | $79 | 13 individual courses |
| Premium Course | $99 | Art of Soloing, Art of Arranging |
| Coaching | $150 | Piano Workshop (bi-weekly Zoom) |
| Bundle | $99 | ALL 15 courses (was the flagship offer) |
| Piano Bundle | $399 | 6 piano courses + presets |
| Berklee Coaching | $399 | All courses + 10 weeks live coaching |

## Target Pricing (New Site — DRAFT, will A/B test)

| Tier | Target | Notes |
|------|--------|-------|
| Individual courses | ~$149 | Up from $79. Test $129 vs $149 vs $199 |
| All-course bundle | ~$349 | Up from $99. Major value anchor |
| Monthly subscription | ~$19.99/mo | New offering |
| Annual subscription | ~$149/yr | New offering |
| Workshops/add-ons | ~$49 | Up from $29.95 |
| All-Access (app + courses) | ~$29.99/mo or $199/yr | Future — requires app launch |

## Key Principle

All pricing lives in the database (Supabase `products` table) and Stripe, never hardcoded in UI code. This enables price changes, promos, and A/B tests without code deploys.
