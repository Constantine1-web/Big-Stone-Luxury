/**
 * BIG_STONE_ASSETS — the single source of truth for every image on the site.
 *
 * To swap in real Big Stone Luxury photography, drop files into
 * /public/images/big-stone/ and change the `src` values here. Nothing else
 * in the codebase references image URLs directly.
 *
 * Remote images are editorial references from Unsplash (free licence).
 * Prices are indicative retail prices in Nigerian Naira (NGN).
 */

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface Piece {
  src: string;
  alt: string;
  name: string;
  price: number; // NGN
}

export interface DecorativeAsset {
  src: string;
  alt: string;
}

const lookbookImages: Piece[] = [
  { src: unsplash('1509631179647-0177331693ae'), alt: 'Model in a flowing evening gown', name: 'Obsidian Evening Gown', price: 485000 },
  { src: unsplash('1507679799987-c73779587ccf'), alt: 'Tailored dark suit detail', name: 'Stone Tailored Suit', price: 650000 },
  { src: '/images/big-stone/deco-bag.jpg', alt: 'Black leather handbag with gold hardware', name: 'Ikot Leather Tote', price: 320000 },
  { src: unsplash('1515886657613-9f3515b0c78f'), alt: 'Editorial portrait in monochrome styling', name: 'Monochrome Wrap Dress', price: 275000 },
  { src: unsplash('1543163521-1bf539c55dd2'), alt: 'Designer heels on display', name: 'Champagne Satin Heel', price: 210000 },
  { src: unsplash('1594938298603-c8148c4dae35'), alt: 'Man adjusting a tailored jacket', name: 'Midnight Blazer', price: 395000 },
  { src: unsplash('1539109136881-3be0616acf4b'), alt: 'Model in a statement coat', name: 'Gold Line Overcoat', price: 540000 },
  { src: unsplash('1511499767150-a48a237f0083'), alt: 'Luxury sunglasses close-up', name: 'Aviator Gold Frames', price: 145000 },
  { src: unsplash('1529139574466-a303027c1d8b'), alt: 'Fashion editorial pose', name: 'Ibom Silk Two-Piece', price: 360000 },
  { src: unsplash('1617137968427-85924c800a22'), alt: 'Man in tailored menswear', name: 'Heritage Kaftan Set', price: 420000 },
  { src: unsplash('1515562141207-7a88fb7ce338'), alt: 'Gold jewellery detail', name: 'Signet & Chain Set', price: 260000 },
  { src: unsplash('1496747611176-843222e1e57c'), alt: 'Model in a striking dress', name: 'Crimson Column Dress', price: 310000 },
];

export const BIG_STONE_ASSETS = {
  lookbookImages,
  decorativeImages: {
    topLeft: { src: '/images/big-stone/deco-bag.jpg', alt: 'Black leather handbag with gold hardware' },
    topRight: { src: '/images/big-stone/deco-heel.jpg', alt: 'Champagne satin stiletto heel' },
    bottomLeft: { src: '/images/big-stone/deco-fabric.jpg', alt: 'Folded black silk and gold aso-oke fabric' },
    bottomRight: { src: '/images/big-stone/deco-jewelry.jpg', alt: 'Gold sunglasses, chain and signet ring' },
  } satisfies Record<string, DecorativeAsset>,
  collectionImages: [
    [
      { src: unsplash('1617038220319-276d3cfab638', 800), alt: 'Signature tailoring detail', name: 'Stone Waistcoat', price: 185000 },
      { src: unsplash('1490481651871-ab68de25d43d', 800), alt: 'Curated rail of signature pieces', name: 'Signature Shirt', price: 120000 },
      { src: unsplash('1488161628813-04466f872be2', 1200), alt: 'Signature look full portrait', name: 'The Stone Suit', price: 650000 },
    ],
    [
      { src: unsplash('1566174053879-31528523f8ae', 800), alt: 'Evening editorial portrait', name: 'Nightfall Slip', price: 295000 },
      { src: unsplash('1485968579580-b6d095142e6e', 800), alt: 'After-dark styling', name: 'Velvet Wrap', price: 340000 },
      { src: unsplash('1469334031218-e382a71b716b', 1200), alt: 'Night Fall campaign look', name: 'Nightfall Gown', price: 520000 },
    ],
    [
      { src: unsplash('1523398002811-999ca8dec234', 800), alt: 'Everyday luxury essentials', name: 'Uyo Linen Tee', price: 65000 },
      { src: unsplash('1434389677669-e08b4cac3105', 800), alt: 'Essential knitwear', name: 'Ibeno Knit', price: 98000 },
      { src: unsplash('1506634572416-48cdfe530110', 1200), alt: 'The Uyo Edit campaign portrait', name: 'Uyo Edit Set', price: 230000 },
    ],
  ] as Piece[][],
};

export const formatNaira = (n: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
