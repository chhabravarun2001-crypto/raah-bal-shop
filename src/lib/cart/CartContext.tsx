"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, ProductImage } from "@/lib/shopify";

const STORAGE_KEY = "raah-bal-cart";

type AddLineInput = {
  variantId: string;
  productHandle: string;
  title: string;
  size: string;
  price: { amount: number; currencyCode: string };
  image: ProductImage;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  currencyCode: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (input: AddLineInput, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration read from localStorage (a browser-only API that
    // can't be reflected in the server-rendered markup), not derived state —
    // the standard SSR-safe pattern for browser-persisted state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback((input: AddLineInput, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === input.variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === input.variantId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      const line: CartLine = {
        id: `${input.variantId}-${Date.now()}`,
        variantId: input.variantId,
        productHandle: input.productHandle,
        title: input.title,
        size: input.size,
        price: input.price,
        image: input.image,
        quantity,
      };
      return [...prev, line];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== lineId)
        : prev.map((l) => (l.id === lineId ? { ...l, quantity } : l))
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0),
    [lines]
  );
  const currencyCode = lines[0]?.price.currencyCode ?? "INR";

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    currencyCode,
    isOpen,
    openCart,
    closeCart,
    addLine,
    updateQuantity,
    removeLine,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
