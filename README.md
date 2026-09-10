# RAAH | BAL

A standalone ecommerce storefront for RAAH | BAL — bold type, a custom cursor, a preloader and
page transitions, and a Shopify-ready catalogue. This project is fully independent: it has its
own git history and isn't connected to any other RAAH codebase or domain.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Storefront

`/shop`, `/collections/[handle]` and `/products/[handle]` run on a small Shopify-ready data layer
(`src/lib/shopify/`). Until Shopify is connected, the store runs on a built-in placeholder
catalogue (`src/lib/shopify/mock-data.ts`) using the stock product photos in
`public/images/products/`.

## Going live

Copy `.env.example` to `.env.local` and fill in:

- **Shopify** — `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Once both are set, the
  site automatically switches to real Shopify inventory and checkout — no code changes. Add,
  price and photograph products, and manage stock, entirely from Shopify Admin.
- **Google sign-in** — `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`. Until set, `/account`
  shows a disabled "connecting soon" state instead of a broken sign-in button.
- **Newsletter** (optional) — `NEWSLETTER_WEBHOOK_URL` for the footer signup form.

Cart contents live in the browser (`localStorage`) regardless of Shopify connection. "Checkout"
sends the customer to Shopify's own hosted checkout once configured; before that, it falls back to
an email hand-off (placeholder address in `src/lib/constants.ts` — update before launch) so no
payment details are ever collected outside Shopify.

## Deploy

Any Next.js host works (Vercel, etc.) — this project has no dependency on another site's hosting
or domain.
