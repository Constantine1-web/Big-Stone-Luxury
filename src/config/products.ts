/**
 * HERO PRODUCTS — the only thing you edit to add / change a hero product.
 *
 * Every image must be a TRANSPARENT cutout (PNG / WebP). The page builds the
 * background itself from the palette below, so never bake a background into
 * the image.
 *
 * Palettes are set manually (sampled from the visible garment pixels only) —
 * this is more consistent than automatic extraction.
 *
 *   dominant – the garment's main colour (hero panel mid-tone, swatch colour)
 *   dark     – hero panel edges
 *   light    – hero panel centre glow
 *   ambient  – soft atmospheric light layered over the panel
 *   outer    – desaturated, low-intensity version for the page around the panel
 *   ink      – 'light' text on dark environments, 'dark' text on pale ones
 */

export interface ProductState {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number; // NGN
  originalPrice: number; // NGN
  description: string;
  details: string[];
  dominantColor: string;
  darkColor: string;
  lightColor: string;
  ambientColor: string;
  outerColor: string;
  ink: 'light' | 'dark';
}

export const HERO_PRODUCTS: ProductState[] = [
  {
    id: 'noir-monogram',
    image: '/images/big-stone/products/noir-monogram-hoodie.png',
    name: 'Noir Monogram Hoodie',
    category: 'Hoodie',
    price: 450000,
    originalPrice: 520000,
    description: 'All-over monogram jacquard fleece with a soft brushed interior.',
    details: ['Heavyweight cotton fleece', 'Ribbed cuffs & hem', 'Relaxed fit'],
    dominantColor: '#1b1b1c',
    darkColor: '#070707',
    lightColor: '#3b3b3d',
    ambientColor: '#d8d4cc',
    outerColor: '#0b0b0b',
    ink: 'light',
  },
  {
    id: 'graphite-band',
    image: '/images/big-stone/products/graphite-band-hoodie.png',
    name: 'Graphite Band Hoodie',
    category: 'Hoodie',
    price: 380000,
    originalPrice: 430000,
    description: 'Heather-grey loopback cotton with a tonal monogram band across the chest.',
    details: ['Loopback cotton jersey', 'Tonal monogram band', 'Drawstring hood'],
    dominantColor: '#8b8e92',
    darkColor: '#5b5e62',
    lightColor: '#c7c9cc',
    ambientColor: '#f1f2f3',
    outerColor: '#2c2e31',
    ink: 'dark',
  },
  {
    id: 'duo-sweatpants',
    image: '/images/big-stone/products/duo-wide-leg-sweatpants.png',
    name: 'Duo Wide-Leg Sweatpants',
    category: 'Joggers',
    price: 295000,
    originalPrice: 340000,
    description: 'Relaxed wide-leg sweatpants featuring a contrasting dual-tone design.',
    details: ['Heavyweight fleece', 'Wide-leg fit', 'Drawstring waist'],
    dominantColor: '#4a4c52',
    darkColor: '#121214',
    lightColor: '#b4b6ba',
    ambientColor: '#d9dbdf',
    outerColor: '#1a1b1d',
    ink: 'light',
  },
  {
    id: 'ivory-signature',
    image: '/images/big-stone/products/ivory-signature-hoodie.png',
    name: 'Ivory Signature Hoodie',
    category: 'Hoodie',
    price: 265000,
    originalPrice: 310000,
    description: 'Clean ivory fleece with a minimal embroidered signature logo.',
    details: ['Organic cotton fleece', 'Embroidered logo', 'Kangaroo pocket'],
    dominantColor: '#e6e3dc',
    darkColor: '#c4c0b7',
    lightColor: '#faf9f6',
    ambientColor: '#ffffff',
    outerColor: '#b9b5ad',
    ink: 'dark',
  },
  {
    id: 'aero-flight',
    image: '/images/big-stone/products/aero-flight-hoodie.png',
    name: 'Aero Flight Hoodie',
    category: 'Hoodie',
    price: 520000,
    originalPrice: 595000,
    description: 'Jet-black fleece with a scattered aeroplane motif forming the monogram.',
    details: ['Heavyweight cotton fleece', 'Embroidered motif', 'Oversized fit'],
    dominantColor: '#242528',
    darkColor: '#0a0a0c',
    lightColor: '#4a4c52',
    ambientColor: '#c9ccd4',
    outerColor: '#111214',
    ink: 'light',
  },
];

export const INK = {
  light: '#F3F0EA',
  dark: '#151515',
} as const;
