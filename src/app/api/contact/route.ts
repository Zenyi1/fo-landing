import { NextResponse } from "next/server";
import { Resend } from "resend";

// Restored from 3849b3d, where it served the old /contact page. Same shape as
// before; the two free-text fields now match the form on /intelligence.
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
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const teamSize = String(body.teamSize ?? "").trim();
  const handover = String(body.handover ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // checked after validation so a malformed submission still gets a useful
  // 400 rather than a misleading 500
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form submission dropped");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Work email", email],
    ["Company", company],
    ["Team size", teamSize],
    ["Would hand over first", handover],
  ];

  const html = `<h2>New call request</h2>${rows
    .map(
      ([k, v]) =>
        `<p><strong>${k}:</strong> ${escape(v) || "(not provided)"}</p>`,
    )
    .join("")}`;

  const text = `New call request\n\n${rows
    .map(([k, v]) => `${k}: ${v || "(not provided)"}`)
    .join("\n")}`;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Call request: ${name}${company ? ` (${company})` : ""}`,
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
