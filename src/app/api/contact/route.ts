import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = "hugo@first-ocean.com";
const FROM = process.env.CONTACT_FROM ?? "FirstOcean <onboarding@resend.dev>";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Email:</strong> ${escape(email)}</p>
    <p><strong>Phone:</strong> ${escape(phone) || "—"}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escape(message)}</p>
  `;

  const text = `New contact form submission

Name: ${name}
Email: ${email}
Phone: ${phone || "—"}

Message:
${message}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contact form — ${name}`,
      html,
      text,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
