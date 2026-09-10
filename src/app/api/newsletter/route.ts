import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? body.source : "unknown";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`Newsletter signup (no webhook configured): ${email} via ${source}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to forward newsletter signup", error);
    return NextResponse.json({ error: "Could not save your details." }, { status: 502 });
  }
}
