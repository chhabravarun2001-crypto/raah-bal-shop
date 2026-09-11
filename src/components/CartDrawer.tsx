"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import Magnetic from "./Magnetic";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice, type CartLine } from "@/lib/shopify";
import { ORDERS_EMAIL } from "@/lib/constants";
import { IconClose, IconMinus, IconPlus } from "./icons";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeLine, subtotal, currencyCode } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
        }),
      });

      if (res.status === 501) {
        window.location.href = buildOrderHandoff(lines, subtotal, currencyCode);
        return;
      }

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch {
      setCheckoutError("Couldn't reach checkout. Try the email order below instead.");
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[95] bg-ink/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`fixed inset-y-0 right-0 z-[96] flex w-full max-w-md flex-col bg-paper text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-lg uppercase tracking-wide">Your Bag</h2>
          <button type="button" onClick={closeCart} data-hover aria-label="Close cart" className="p-1">
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
              Your bag is empty. Time to earn something.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-bone">
                    {line.image.url && (
                      <Image src={line.image.url} alt={line.image.altText} fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-sm uppercase">{line.title}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
                          Size {line.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        data-hover
                        aria-label={`Remove ${line.title}`}
                        className="p-1 text-ink/40 hover:text-ink"
                      >
                        <IconClose className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-ink/15 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          data-hover
                          aria-label="Decrease quantity"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center font-mono text-xs">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          data-hover
                          aria-label="Increase quantity"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs">
                        {formatPrice(line.price.amount * line.quantity, line.price.currencyCode)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6">
            <div className="mb-4 flex items-center justify-between font-mono text-sm">
              <span className="uppercase tracking-[0.15em] text-ink/60">Subtotal</span>
              <span>{formatPrice(subtotal, currencyCode)}</span>
            </div>
            <Magnetic className="block w-full" strength={0.1}>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkingOut}
                data-hover
                style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
                className="btn-stamp w-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper disabled:opacity-50"
              >
                {checkingOut ? "Starting checkout…" : "Checkout →"}
              </button>
            </Magnetic>
            {checkoutError && <p className="mt-3 font-mono text-[11px] text-ember">{checkoutError}</p>}
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-ink/35">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function buildOrderHandoff(lines: CartLine[], subtotal: number, currencyCode: string) {
  const itemLines = lines
    .map(
      (l) =>
        `${l.quantity} x ${l.title} (Size ${l.size}): ${formatPrice(l.price.amount * l.quantity, l.price.currencyCode)}`
    )
    .join("\n");
  const body = `Hi RAAH | BAL, I'd like to order:\n\n${itemLines}\n\nSubtotal: ${formatPrice(
    subtotal,
    currencyCode
  )}`;
  const subject = "RAAH | BAL · Order request";
  return `mailto:${ORDERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
