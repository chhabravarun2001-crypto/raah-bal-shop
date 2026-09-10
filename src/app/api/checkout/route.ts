import { NextRequest, NextResponse } from "next/server";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { addCartLine, createCart } from "@/lib/shopify/queries";

type CheckoutLine = { variantId: string; quantity: number };

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ error: "Shopify is not configured yet." }, { status: 501 });
  }

  const body = await request.json().catch(() => null);
  const lines = Array.isArray(body?.lines) ? (body.lines as CheckoutLine[]) : [];

  if (!lines.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  try {
    const [first, ...rest] = lines;
    let cart = await createCart(first.variantId, first.quantity);
    for (const line of rest) {
      cart = await addCartLine(cart.id!, line.variantId, line.quantity);
    }
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error) {
    console.error("Checkout cart creation failed", error);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }
}
