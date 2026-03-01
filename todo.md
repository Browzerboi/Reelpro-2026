# CableCo — The Briefcase TODO

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
