export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  size: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
  quantityAvailable: number;
};

export type ProductImage = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type GarmentHotspot = {
  number: string;
  label: string;
  /** Position as a percentage of the image, 0-100. */
  x: number;
  y: number;
  description: string;
};

export type GarmentCode = {
  obj: string;
  cut: string;
  drop: string;
  season: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badge?: string;
  price: Money;
  compareAtPrice?: Money;
  images: ProductImage[];
  variants: ProductVariant[];
  collections: string[];
  fabric: string;
  care: string;
  fit: string;
  colorName: string;
  swatch: string;
  hotspots: GarmentHotspot[];
  code: GarmentCode;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  accent: string;
  productHandles: string[];
};

export type CartLine = {
  id: string;
  variantId: string;
  productHandle: string;
  title: string;
  size: string;
  price: Money;
  image: ProductImage;
  quantity: number;
};

export type Cart = {
  id: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
};
