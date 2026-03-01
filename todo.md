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
