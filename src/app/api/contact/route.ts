import { NextResponse } from "next/server";

export const runtime = "nodejs";

// The recipient lives here, server-side, so the address never appears in
// anything the browser downloads. Delivery is Resend (Vercel marketplace
// integration); RESEND_API_KEY comes from `vercel integration add resend`.
const TO = "hugo@first-ocean.com";

export async function POST(request: Request) {
  let body: { email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (!message || message.length > 5000) {
    return NextResponse.json(
      { error: "Please write a message." },
      { status: 400 },
    );
  }

  // onboarding@resend.dev only delivers to the Resend account owner's own
  // address. Before this can reach hugo@, verify first-ocean.com as a sender
  // domain in Resend and change `from` to an address on it.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "firstocean.com <onboarding@resend.dev>",
      to: [TO],
      reply_to: email,
      subject: `first-ocean.com — message from ${email}`,
      text: message,
    }),
  });

  if (!res.ok) {
    console.error("contact delivery failed", res.status, await res.text());
    return NextResponse.json(
      { error: "We couldn't send that just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
