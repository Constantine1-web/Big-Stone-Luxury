# Big Stone Luxury

Editorial luxury-fashion site for **Big Stone Luxury** — Uyo, Akwa Ibom, Nigeria.

Stack: React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Sections
1. Hero — giant headline behind a magnetic campaign visual
2. Lookbook — two scroll-linked rows moving in opposite directions (with NGN prices)
3. Our Story — four floating corner objects + scroll character reveal
4. The House — numbered services list
5. Collections — sticky stacking cards with 40/60 image grid

## Swapping images & prices
Every image and price lives in `src/config/assets.ts` (`BIG_STONE_ASSETS`).
Drop real photography into `public/images/big-stone/` and update the `src`/`price` values there.
Copy lives in `src/config/content.ts`.
