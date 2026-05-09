# Gentleman Zadar — Barbershop

Marketing site with booking-flow UI for **Barbershop Gentleman Zadar** (Put Mirvice 85, Zadar).

Built with Next.js 15 (App Router) · Tailwind CSS · next-intl · TypeScript.

## Languages

`hr` (default) · `en` · `de` · `es` · `pl`

All copy lives in `i18n/messages/*.json`. `hr.json` is the master.

> HR and PL strings should be reviewed by a native speaker before launch.

## Local dev

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev      # http://localhost:3000 → /hr
bun run build    # production build
bun run start    # serve production build
```

## What works

- Landing page (Hero, About, Services, Team, Gallery, Location + Map, Contact)
- 5-step booking flow: Barber → Service → Date/Time → Details → Confirm → Success
- Language switcher (top right)
- Mobile + desktop layouts

## What is **demo only** (no backend)

- The booking flow does not persist anywhere — submitting just shows a fake booking number and a "we'll send you an SMS" message. See `BookingFlow.tsx → handleSubmit`.

## What needs to be filled in later

- **Logo + photos:** placeholders are used everywhere. Drop real assets into `public/` and replace `<PlaceholderImage />` with `<Image />` in `components/sections/About.tsx`, `Team.tsx`, `Gallery.tsx`, and `components/booking/StepBarber.tsx`.
- **Phone number:** placeholder `+385 XX XXX XXXX` in `components/sections/Contact.tsx` and `components/layout/Footer.tsx` (and the `tel:` / `wa.me` hrefs).
- **Barber names / count:** edit `lib/data/barbers.ts` and add matching keys to all `i18n/messages/*.json` under `"barbers"`.
- **Service prices / list:** edit `lib/data/services.ts` and the `"services.items"` block in each language file.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In the Vercel dashboard: **Import Project → from GitHub → select this repo**. No env vars needed. Default Next.js settings.
3. Vercel will auto-detect Next.js and build with `next build`.
4. After the first deploy you'll get a `*.vercel.app` URL — share that for review.

## Project structure

```
app/[locale]/         page.tsx (landing)  · booking/page.tsx
components/
  layout/             Navbar · Footer · LanguageSwitcher
  sections/           Hero · About · Services · Team · Gallery · LocationHours · Contact
  booking/            BookingFlow + 5 step components + Success
  brand/              Wordmark (SVG) + PlaceholderImage
i18n/                 routing.ts · request.ts · messages/{hr,en,de,es,pl}.json
lib/data/             barbers · services · time-slots
```
