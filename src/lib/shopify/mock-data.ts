import type { Collection, Product } from "./types";

/**
 * Launch catalogue used until Shopify is connected (see isShopifyConfigured
 * in ./client.ts). Photography is the placeholder stock imagery supplied for
 * the four base styles — swap for real product photography in Shopify once
 * it's ready; nothing else needs to change.
 */

const SIZES = ["S", "M", "L", "XL", "XXL"];

function sizeVariants(idPrefix: string, amount: number, stockBySize: Partial<Record<string, number>> = {}) {
  return SIZES.map((size) => {
    const quantityAvailable = stockBySize[size] ?? 12;
    return {
      id: `${idPrefix}-${size}`,
      title: size,
      size,
      price: { amount, currencyCode: "INR" },
      availableForSale: quantityAvailable > 0,
      quantityAvailable,
    };
  });
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "gid://mock/Product/founders-tee",
    handle: "founders-tee",
    title: "Founders Tee",
    subtitle: "Core Discipline",
    description:
      "The first stitch of the house. A heavyweight cotton tee built for the ones who show up before there's proof it'll work. Boxy, oversized fit, dropped shoulder.",
    category: "T-Shirts",
    badge: "Matter 12",
    price: { amount: 1999, currencyCode: "INR" },
    images: [
      { url: "/images/products/founders-tee-front.png", altText: "Founders Tee — front", width: 1122, height: 1402 },
      { url: "/images/products/founders-tee-back.png", altText: "Founders Tee — back", width: 1023, height: 1537 },
    ],
    variants: sizeVariants("tee", 1999, { XXL: 4 }),
    collections: ["matter-12", "core-discipline"],
    fabric: "240 GSM 100% combed cotton, garment-dyed for a lived-in hand-feel.",
    care: "Machine wash cold, inside out. Do not bleach. Tumble dry low.",
    fit: "Boxy, oversized. Sizes true — size down for a tighter drop shoulder.",
    colorName: "Founders Red",
    swatch: "#7a1f1f",
    code: { obj: "OBJ.001", cut: "CUT/001", drop: "DROP/001", season: "SEASON/26" },
    hotspots: [
      { number: "01", label: "Branding", x: 50, y: 38, description: "Tonal chest mark, heat-pressed for a low-sheen finish that won't crack or peel." },
      { number: "02", label: "Fabric", x: 28, y: 55, description: "240 GSM combed cotton, garment-dyed for a lived-in hand-feel from day one." },
      { number: "03", label: "Sleeve", x: 76, y: 46, description: "Dropped shoulder seam, boxy sleeve cut for room to move." },
      { number: "04", label: "Hem", x: 50, y: 86, description: "Straight hem, double-stitched for a fit that holds its shape wash after wash." },
    ],
  },
  {
    id: "gid://mock/Product/discipline-shirt",
    handle: "discipline-shirt",
    title: "Discipline Shirt",
    subtitle: "Core Discipline",
    description:
      "No shortcuts, no filler. A structured overshirt in brushed cotton twill, built for the repetition that precedes every real result — layer it, wear it open, wear it buttoned to the collar.",
    category: "Shirts",
    price: { amount: 2999, currencyCode: "INR" },
    images: [
      { url: "/images/products/discipline-shirt-front.png", altText: "Discipline Shirt — front", width: 1071, height: 1468 },
      { url: "/images/products/discipline-shirt-back.png", altText: "Discipline Shirt — back", width: 1071, height: 1469 },
    ],
    variants: sizeVariants("shirt", 2999, { S: 6 }),
    collections: ["matter-12", "core-discipline"],
    fabric: "220 GSM brushed cotton twill with a soft peached finish.",
    care: "Machine wash cold. Warm iron if needed. Do not tumble dry.",
    fit: "Relaxed overshirt. Layer over the Founders Tee true to size.",
    colorName: "Ink Navy",
    swatch: "#1f2937",
    code: { obj: "OBJ.002", cut: "CUT/002", drop: "DROP/001", season: "SEASON/26" },
    hotspots: [
      { number: "01", label: "Collar", x: 50, y: 20, description: "Structured point collar, built to sit flat open or buttoned to the top." },
      { number: "02", label: "Fabric", x: 28, y: 55, description: "220 GSM brushed cotton twill with a soft peached finish." },
      { number: "03", label: "Cuff", x: 76, y: 58, description: "Single-button cuff, room to roll to the elbow." },
      { number: "04", label: "Hem", x: 50, y: 88, description: "Curved hem, made to layer over the Founders Tee without bunching." },
    ],
  },
  {
    id: "gid://mock/Product/relentless-hoodie",
    handle: "relentless-hoodie",
    title: "Relentless Hoodie",
    subtitle: "The Ascent",
    description:
      "Built for the miles nobody's watching. Heavyweight brushed fleece, dropped shoulder, kangaroo pocket, ribbed hem built to hold its shape through every rep, every rep after that.",
    category: "Hoodies",
    badge: "Matter 12",
    price: { amount: 4499, currencyCode: "INR" },
    images: [
      { url: "/images/products/relentless-hoodie-front.png", altText: "Relentless Hoodie — front", width: 1096, height: 1435 },
      { url: "/images/products/relentless-hoodie-back.png", altText: "Relentless Hoodie — back", width: 1096, height: 1436 },
    ],
    variants: sizeVariants("hoodie", 4499, { L: 3 }),
    collections: ["matter-12", "the-ascent"],
    fabric: "400 GSM brushed cotton-poly fleece, heavyweight construction.",
    care: "Machine wash cold with like colors. Do not bleach. Low heat only.",
    fit: "Oversized, dropped shoulder. Size down for a closer hood fit.",
    colorName: "Bone White",
    swatch: "#e8e2d8",
    code: { obj: "OBJ.003", cut: "CUT/003", drop: "DROP/001", season: "SEASON/26" },
    hotspots: [
      { number: "01", label: "Hood", x: 50, y: 14, description: "Double-layer hood, structured to hold its shape drop after drop." },
      { number: "02", label: "Pocket", x: 50, y: 60, description: "Kangaroo pocket, reinforced bar-tack corners." },
      { number: "03", label: "Fabric", x: 24, y: 48, description: "400 GSM brushed cotton-poly fleece — heavyweight, built for cold starts." },
      { number: "04", label: "Cuff", x: 78, y: 64, description: "Ribbed cuff and hem, holds its shape through every rep." },
    ],
  },
  {
    id: "gid://mock/Product/unbroken-jacket",
    handle: "unbroken-jacket",
    title: "Unbroken Jacket",
    subtitle: "The Ascent",
    description:
      "Made for the climb, not the summit photo. A structured shell jacket cut for movement — wind-resistant outer, weighted drape, storm flap, built to take the weather so you don't have to think about it.",
    category: "Jackets",
    badge: "Limited",
    price: { amount: 6999, currencyCode: "INR" },
    images: [
      { url: "/images/products/unbroken-jacket-front.png", altText: "Unbroken Jacket — front", width: 1122, height: 1402 },
      { url: "/images/products/unbroken-jacket-back.png", altText: "Unbroken Jacket — back", width: 1122, height: 1402 },
    ],
    variants: sizeVariants("jacket", 6999, { S: 2, XXL: 0 }),
    collections: ["matter-12", "the-ascent"],
    fabric: "Water-resistant nylon shell, brushed jersey lining.",
    care: "Spot clean or dry clean only. Do not iron the shell.",
    fit: "Structured, true to size. Room to layer the Relentless Hoodie under.",
    colorName: "Ascent Green",
    swatch: "#1f3d2b",
    code: { obj: "OBJ.004", cut: "CUT/004", drop: "DROP/001", season: "SEASON/26" },
    hotspots: [
      { number: "01", label: "Collar", x: 50, y: 14, description: "Storm collar with a wind-flap closure." },
      { number: "02", label: "Zipper", x: 50, y: 44, description: "Storm-flap zip, sealed against wind and rain." },
      { number: "03", label: "Fabric", x: 24, y: 55, description: "Water-resistant nylon shell, brushed jersey lining." },
      { number: "04", label: "Hem", x: 50, y: 88, description: "Adjustable drawcord hem, cinches for movement in the wind." },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "gid://mock/Collection/matter-12",
    handle: "matter-12",
    title: "Matter 12",
    description:
      "Every clock keeps twelve hours. Every stage humanity has built finds its order in twelve. We build the same way — twelve stages, each one earned, each one setting the standard the next has to beat. Four pieces, no reprints, no restocks in these exact runs — everyone who wears this bought in before there was proof.",
    accent: "var(--color-ember)",
    productHandles: ["founders-tee", "discipline-shirt", "relentless-hoodie", "unbroken-jacket"],
  },
  {
    id: "gid://mock/Collection/the-ascent",
    handle: "the-ascent",
    title: "The Ascent",
    description: "Outerwear and layers built for the climb — the parts of the work nobody photographs.",
    accent: "var(--color-steel)",
    productHandles: ["relentless-hoodie", "unbroken-jacket"],
  },
  {
    id: "gid://mock/Collection/core-discipline",
    handle: "core-discipline",
    title: "Core Discipline",
    description: "The essentials. Repeated, not reinvented — the pieces you put on before the work starts.",
    accent: "var(--color-gold)",
    productHandles: ["founders-tee", "discipline-shirt"],
  },
];
