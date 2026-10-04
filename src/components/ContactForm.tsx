"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-ink bg-transparent py-3 text-[clamp(17px,1.35vw,24px)] text-ink";
const labelClass = "text-[13px]";

const FIELDS = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "asset", label: "Asset or therapeutic area" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
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
    <div className="max-w-[640px]">
      {/* Mounted from first render so the announcement is actually made when
          the confirmation lands. */}
      <div role="status">
        {status === "sent" && (
          <p className="text-[clamp(17px,1.35vw,24px)]">
            Received. We will reply.
          </p>
        )}
      </div>
      {status !== "sent" && (
        <form onSubmit={submit} className="grid gap-6">
          {FIELDS.map((f) => (
            <label key={f.name} className="grid gap-1.5">
              <span className={labelClass}>{f.label}</span>
              <input
                name={f.name}
                type={"type" in f ? f.type : "text"}
                required
                maxLength={254}
                autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
                className={field}
              />
            </label>
          ))}
          <label className="grid gap-1.5">
            <span className={labelClass}>Stage</span>
            <select name="stage" required defaultValue="" className={field}>
              <option value="" disabled>
                Select
              </option>
              <option>Preclinical</option>
              <option>Phase 1</option>
              <option>Phase 2</option>
              <option>Phase 3</option>
              <option>Filed / under review</option>
              <option>Approved</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-14 w-full rounded-full bg-ink text-[17px] text-cream disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {status === "error" && (
            <p role="alert" className="text-[clamp(17px,1.35vw,24px)]">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
