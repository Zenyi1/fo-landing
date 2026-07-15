import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = "zenyi@first-ocean.com";
const FROM = process.env.CONTACT_FROM ?? "firstocean <onboarding@resend.dev>";

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
  const company = String(body.company ?? "").trim();
  const industry = String(body.industry ?? "").trim();
  const teamSize = String(body.teamSize ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New early access request</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Work email:</strong> ${escape(email)}</p>
    <p><strong>Company:</strong> ${escape(company) || "(not provided)"}</p>
    <p><strong>Industry:</strong> ${escape(industry) || "(not provided)"}</p>
    <p><strong>Team size:</strong> ${escape(teamSize) || "(not provided)"}</p>
  `;

  const text = `New early access request

Name: ${name}
Work email: ${email}
Company: ${company || "(not provided)"}
Industry: ${industry || "(not provided)"}
Team size: ${teamSize || "(not provided)"}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Early access: ${name}${company ? ` (${company})` : ""}`,
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
