# Solenne Fine Jewelry — Luxury storefront with a personal concierge

A frontend-only luxury jewelry e-commerce experience built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Framer Motion, Zustand and React Hook Form. All data is local; there is no backend,
authentication or real payment.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (Next picks another port if 3000 is busy).

Production build: `npm run build && npm start`. Type check: `npx tsc --noEmit`. Lint: `npm run lint`.

## What's inside

| Route | Purpose |
| --- | --- |
| `/` | Editorial home: hero, concierge introduction, collections, best sellers, brand story |
| `/collections`, `/collections/[slug]` | Six curated collections and their product listings |
| `/shop/[category]` | Category listings (engagement, rings, necklaces, earrings, bracelets) |
| `/discover` | Search, filters (category, price, metal, gemstone, style, occasion, availability) and sorting; accepts `?category=` and `?q=` |
| `/product/[slug]` | Gallery (swipeable on mobile), sizes, quantity, wishlist, sticky mobile add-to-bag, "Ask my concierge about this piece" |
| `/concierge` | Full-page concierge (also available everywhere as a floating panel) |
| `/wishlist`, `/cart`, `/checkout` | Wishlist, bag and a 4-step demo checkout with a confirmation screen |
| `/about`, `/care/[topic]` | Brand story and client-care pages |

### The concierge ("Amara")

- Five journeys (self, gift, engagement, occasion, explore) defined in `src/data/concierge-flows.ts`.
- Skip, Back, change any answer (preferences panel / chips), "See suggestions" early, and Start over.
- `src/lib/recommendation-engine.ts` scores every product on category, metal, gemstone, style,
  occasion, budget and presence, and returns a match percentage plus the reasons.
- Love it → add to bag / show more / save for later; Not for me → refinement choices.
- Refine with chips or free text ("rose gold under $1,000", "something more minimal"),
  parsed in `src/lib/concierge-parser.ts`.
- The conversation persists for the browser session; the cart and wishlist persist in localStorage.

## Architecture

```
src/
  app/                 routes (server components; metadata per page)
  components/
    atoms/             Button, IconButton, Typography, Price, Badge, Input, Checkbox, Divider,
                       Spinner, ProgressBar, Tooltip, SmartImage (with fallback), Logo
    molecules/         ProductCard, CollectionCard, CartItem, QuantitySelector, SizeSelector,
                       FilterChip, SearchInput, FormField, WishlistButton, Sheet (accessible dialog)…
    organisms/         Header, MobileMenu, SearchOverlay, HeroSection, ProductGrid, ProductFilters,
                       ProductBrowser, ProductGallery, ProductInformation, CartDrawer, QuickViewModal,
                       CheckoutForm, Footer, Toaster…
    concierge/         Character illustration, experience layout, conversation, recommendations
    templates/         Page-level layouts (Home, ProductListing, ProductDetails, Concierge, Cart…)
    layout/            Providers (store hydration, reduced motion), Reveal
  data/                products (39), collections, concierge flows, info pages
  hooks/ store/ lib/ types/ constants/
```

Persisted Zustand stores use `skipHydration` and are rehydrated after mount, so server and client
markup always match.

## Images

Product and editorial photography are royalty-free Unsplash photos stored locally in
`public/images` (Unsplash License). If an image fails to load, `SmartImage` shows an elegant
placeholder instead.
