# Reel-Pro — The Briefcase TODO

## Setup
- [x] Project scaffold initialised (React + tRPC + DB)
- [x] Hero and product imagery generated
- [x] Stripe integration added
- [x] Images uploaded to CDN

## Database & Backend
- [x] Orders table schema (drizzle/schema.ts)
- [x] DB migration applied
- [x] Order query helpers (server/db.ts)
- [x] tRPC: createCheckout procedure (Stripe Checkout Session)
- [x] tRPC: createOrder procedure (save order after payment)
- [x] tRPC: getOrder procedure (for confirmation page)
- [ ] Stripe webhook handler for payment confirmation (post-launch)
- [ ] Owner notification on new order (post-launch)

## Frontend Pages
- [x] Global styles — typographic brutalist aesthetic (black/white, heavy sans-serif)
- [x] Hero section — full-bleed image, oversized product name, CTA
- [x] Product details section — features, specs, benefits
- [x] Add to cart / buy now button
- [x] Checkout page — Stripe Checkout + shipping/contact form
- [x] Order confirmation page — order summary
- [x] Responsive design (mobile + desktop)

## Tests
- [x] Vitest: createCheckout procedure
- [x] Vitest: getBySessionId + getById procedures

## Changes
- [x] Rename company from "CableCo" to "Reel-Pro" across all pages, components, and backend files
- [x] Increase checkout form field label font size for better readability
- [x] Regenerate hero, product, and detail images based on prototype two-piece cradle design in black & yellow
- [x] Add "How It Works" section with three steps: Unfold, Load drum, Pull cable
- [x] Add customer testimonial section with quote from John, licensed electrician
- [x] Regenerate images with correct assembly: two upright side panels, drum axle rests on top bearing cradles (not through the centre)
- [x] Update product descriptions, features, and How It Works copy to reflect correct assembly (axle rests on top of upright panels, rolls on top-mounted bearings)
- [x] Add 4x 25mm magnets per side feature to product copy, features grid, and How It Works (fold/carry step)
- [x] Increase font size of text below "Proceed to Payment" button on checkout page
- [x] Increase font size of grey text in Order Summary section on checkout page
- [x] Revert hero image to v2-style (rugged job-site render) with "THE BRIEFCASE" and "REEL-PRO" branding on the panel sides
- [x] Increase REEL-PRO nav logo size and visual weight on Home and Checkout pages
- [x] Update copy: frames are injection moulded HDPE (lightweight, tough, weatherproof)
- [x] Update copy: axle/shaft is steel or 50mm conduit from the job site
- [x] Regenerate images: bearing cradle faces upward (open-top U-shape), conduit drops in from above
- [x] Regenerate images: final v19 hero with recessed bearings, rounded handles, yellow H-beams, shaft and spool
- [x] Generate 4 additional product images: front angle, rear angle, tradesman pulling cable, tradesman loading drum
- [x] Upload all final images to CDN and update site with image gallery/carousel
- [x] Audit and update all branding references to Reel-Pro: HTML title, meta description, OG tags, products.ts comment, todo.md header
- [x] Add key benefits section for tradesmen explaining why The Briefcase improves their workflow
- [x] Generate 4 real-world environment images: commercial building, residential new build, industrial warehouse, underground/basement
- [x] Build real-world environments showcase section on homepage
