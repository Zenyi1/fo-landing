import { NextResponse } from "next/server";

export const runtime = "nodejs";

// The recipient lives here, server-side, so the address never appears in
// anything the browser downloads. Delivery is Resend (Vercel marketplace
// integration); RESEND_API_KEY comes from `vercel integration add resend`.
const TO = "hugo@first-ocean.com";

const STAGES = [
  "Preclinical",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Filed / under review",
  "Approved",
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const read = (key: string) => {
    const value = body[key];
    return typeof value === "string" ? value.trim() : "";
  };
  const name = read("name");
  const email = read("email");
  const company = read("company");
  const asset = read("asset");
  const stage = read("stage");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (
    [name, company, asset].some((v) => !v || v.length > 254) ||
    !STAGES.includes(stage)
  ) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }

  // Delivery requires first-ocean.com to be a verified sender domain in
  // Resend (resend.com/domains); the sandbox onboarding@resend.dev sender
  // only delivers to the Resend account owner's own inbox.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Firstocean <contact@first-ocean.com>",
      to: [TO],
      reply_to: email,
      subject: `first-ocean.com — ${asset} (${stage})`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nAsset: ${asset}\nStage: ${stage}`,
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
