import { shopifyFetch } from "./client";
import type { Cart, CartLine, Collection, Product } from "./types";

/**
 * Normalizers + queries for Shopify's Storefront GraphQL API. Only used when
 * SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN are set — see
 * lib/shopify/index.ts for the mock-data fallback used until then.
 */

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    productType
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 6) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    collections(first: 5) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

function normalizeProduct(node: ShopifyProductNode): Product {
  const images = node.images.edges.map((e) => e.node);
  const variants = node.variants.edges.map((e) => e.node);
  const sizeOption = (v: ShopifyVariantNode) =>
    v.selectedOptions.find((o) => o.name.toLowerCase() === "size")?.value ?? v.title;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    subtitle: node.productType,
    description: node.description,
    category: node.productType,
    badge: node.tags.find((t) => t.toLowerCase().startsWith("badge:"))?.split(":")[1],
    price: {
      amount: Number(node.priceRange.minVariantPrice.amount),
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
    },
    compareAtPrice: node.compareAtPriceRange?.minVariantPrice
      ? {
          amount: Number(node.compareAtPriceRange.minVariantPrice.amount),
          currencyCode: node.compareAtPriceRange.minVariantPrice.currencyCode,
        }
      : undefined,
    images: images.map((img) => ({
      url: img.url,
      altText: img.altText ?? node.title,
      width: img.width,
      height: img.height,
    })),
    variants: variants.map((v) => ({
      id: v.id,
      title: v.title,
      size: sizeOption(v),
      price: { amount: Number(v.price.amount), currencyCode: v.price.currencyCode },
      compareAtPrice: v.compareAtPrice
        ? { amount: Number(v.compareAtPrice.amount), currencyCode: v.compareAtPrice.currencyCode }
        : undefined,
      availableForSale: v.availableForSale,
      quantityAvailable: v.quantityAvailable ?? 0,
    })),
    collections: node.collections.edges.map((e) => e.node.handle),
    fabric: node.tags.find((t) => t.toLowerCase().startsWith("fabric:"))?.split(":")[1] ?? "",
    care: node.tags.find((t) => t.toLowerCase().startsWith("care:"))?.split(":")[1] ?? "",
    fit: node.tags.find((t) => t.toLowerCase().startsWith("fit:"))?.split(":")[1] ?? "",
    colorName: node.tags.find((t) => t.toLowerCase().startsWith("color:"))?.split(":")[1] ?? "",
    swatch: node.tags.find((t) => t.toLowerCase().startsWith("swatch:"))?.split(":")[1] ?? "var(--color-ink)",
    // Garment hotspots and fashion-tech codes are a mock-catalogue-only
    // storytelling layer for now — a live Shopify product just won't show
    // the anatomy explorer or the OBJ/CUT/DROP label until these are wired
    // to real metafields.
    hotspots: [],
    code: { obj: "", cut: "", drop: "", season: "" },
  };
}

type ShopifyVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  selectedOptions: { name: string; value: string }[];
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } } | null;
  images: { edges: { node: { url: string; altText: string | null; width: number; height: number } }[] };
  variants: { edges: { node: ShopifyVariantNode }[] };
  collections: { edges: { node: { handle: string } }[] };
};

export async function fetchAllProducts(): Promise<Product[]> {
  const query = /* GraphQL */ `
    ${PRODUCT_FRAGMENT}
    query AllProducts {
      products(first: 100) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProductNode }[] } }>(query);
  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const query = /* GraphQL */ `
    ${PRODUCT_FRAGMENT}
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFragment
      }
    }
  `;
  const data = await shopifyFetch<{ productByHandle: ShopifyProductNode | null }>(query, { handle });
  return data.productByHandle ? normalizeProduct(data.productByHandle) : null;
}

export async function fetchCollections(): Promise<Collection[]> {
  const query = /* GraphQL */ `
    query AllCollections {
      collections(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            products(first: 50) {
              edges {
                node {
                  handle
                }
              }
            }
          }
        }
      }
    }
  `;
  type Node = {
    id: string;
    handle: string;
    title: string;
    description: string;
    products: { edges: { node: { handle: string } }[] };
  };
  const data = await shopifyFetch<{ collections: { edges: { node: Node }[] } }>(query);
  return data.collections.edges.map((e) => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
    description: e.node.description,
    accent: "var(--color-ember)",
    productHandles: e.node.products.edges.map((p) => p.node.handle),
  }));
}

export async function fetchCollectionByHandle(handle: string): Promise<Collection | null> {
  const collections = await fetchCollections();
  return collections.find((c) => c.handle === handle) ?? null;
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
                width
                height
              }
              product {
                handle
                title
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

type ShopifyCartLineNode = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    image: { url: string; altText: string | null; width: number; height: number } | null;
    product: { handle: string; title: string };
    selectedOptions: { name: string; value: string }[];
  };
};

type ShopifyCartNode = {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: ShopifyCartLineNode }[] };
};

function normalizeCart(node: ShopifyCartNode): Cart {
  const lines: CartLine[] = node.lines.edges.map((e) => {
    const m = e.node.merchandise;
    const size = m.selectedOptions.find((o) => o.name.toLowerCase() === "size")?.value ?? m.title;
    return {
      id: e.node.id,
      variantId: m.id,
      productHandle: m.product.handle,
      title: m.product.title,
      size,
      price: { amount: Number(m.price.amount), currencyCode: m.price.currencyCode },
      image: m.image
        ? { url: m.image.url, altText: m.image.altText ?? m.product.title, width: m.image.width, height: m.image.height }
        : { url: "", altText: m.product.title, width: 1, height: 1 },
      quantity: e.node.quantity,
    };
  });

  return { id: node.id, checkoutUrl: node.checkoutUrl, lines };
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFragment
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCartNode } }>(query, {
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return normalizeCart(data.cartCreate.cart);
}

export async function addCartLine(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCartNode } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCartNode } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCartNode } }>(query, {
    cartId,
    lineIds: [lineId],
  });
  return normalizeCart(data.cartLinesRemove.cart);
}
