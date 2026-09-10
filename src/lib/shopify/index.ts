import { isShopifyConfigured } from "./client";
import { MOCK_COLLECTIONS, MOCK_PRODUCTS } from "./mock-data";
import {
  fetchAllProducts,
  fetchCollectionByHandle,
  fetchCollections,
  fetchProductByHandle,
} from "./queries";
import type { Collection, Product } from "./types";

export { isShopifyConfigured };
export type {
  Product,
  ProductVariant,
  ProductImage,
  Collection,
  Cart,
  CartLine,
  Money,
  GarmentHotspot,
  GarmentCode,
} from "./types";
export { createCart, addCartLine, updateCartLine, removeCartLine } from "./queries";

export async function getAllProducts(): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      return await fetchAllProducts();
    } catch (err) {
      console.error("Falling back to mock catalogue — Shopify fetch failed:", err);
    }
  }
  return MOCK_PRODUCTS;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (isShopifyConfigured()) {
    try {
      return await fetchProductByHandle(handle);
    } catch (err) {
      console.error("Falling back to mock catalogue — Shopify fetch failed:", err);
    }
  }
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  if (isShopifyConfigured()) {
    try {
      return await fetchCollections();
    } catch (err) {
      console.error("Falling back to mock catalogue — Shopify fetch failed:", err);
    }
  }
  return MOCK_COLLECTIONS;
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  if (isShopifyConfigured()) {
    try {
      return await fetchCollectionByHandle(handle);
    } catch (err) {
      console.error("Falling back to mock catalogue — Shopify fetch failed:", err);
    }
  }
  return MOCK_COLLECTIONS.find((c) => c.handle === handle) ?? null;
}

export async function getProductsForCollection(collection: Collection): Promise<Product[]> {
  const all = await getAllProducts();
  return collection.productHandles
    .map((handle) => all.find((p) => p.handle === handle))
    .filter((p): p is Product => Boolean(p));
}

export function formatPrice(amount: number, currencyCode: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}
