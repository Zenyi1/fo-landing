"use client";

import { useState } from "react";
import { Mark } from "@/components/brand/Mark";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-cream/40 bg-transparent px-0 py-3 text-[1.05rem] leading-[1.5] text-cream transition-colors focus:border-cream focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(
          body?.error ?? "We couldn't send that just now. Please try again.",
        );
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError(
        "We couldn't reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Mounted from first render so the announcement is actually made when
          the confirmation lands. */}
      <div role="status">
        {status === "sent" && (
          <div className="flex items-center gap-4 py-6">
            <Mark breathe className="fo-once w-14 shrink-0 text-cream" />
            <p className="text-[1.05rem] leading-[1.5] text-cream">
              Received. We read everything and will reply.
            </p>
          </div>
        )}
      </div>
      {status !== "sent" && (
        <form onSubmit={submit} className="grid max-w-[34rem] gap-7">
          <label className="grid gap-1.5">
            <span className="text-[0.8rem] uppercase tracking-[0.14em] text-cream">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              className={field}
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-[0.8rem] uppercase tracking-[0.14em] text-cream">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={4}
              maxLength={5000}
              className={`${field} resize-none`}
            />
          </label>
          <div className="flex items-baseline gap-5">
            <button
              type="submit"
              disabled={status === "sending"}
              className="border border-cream/70 px-8 py-3 text-[0.9rem] uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-[#454f4f] disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            {status === "error" && (
              <p
                role="alert"
                className="text-[0.9rem] leading-[1.5] text-cream"
              >
                {error}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
