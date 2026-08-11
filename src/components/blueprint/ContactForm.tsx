"use client";

import { useState } from "react";

import { CONTACT_EMAIL, intelligenceCallUrl } from "@/lib/links";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "mt-1.5 w-full rounded-[var(--bp-r-sm)] border px-3 py-2.5 text-[0.95rem] outline-none transition-colors placeholder:text-[color:var(--bp-ink-muted)]/60 focus:border-[color:var(--bp-blue)]";
const LABEL = "text-[0.78rem] font-medium";

function Field({
  id,
  name,
  label,
  optional = false,
  type = "text",
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  optional?: boolean;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className={LABEL} htmlFor={id} style={{ color: "var(--bp-ink)" }}>
        {label}
        {optional ? (
          <span style={{ color: "var(--bp-ink-muted)" }}> (optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={!optional}
        placeholder={placeholder}
        className={FIELD}
        style={{
          borderColor: "var(--bp-hairline-strong)",
          background: "var(--bp-paper)",
          color: "var(--bp-ink)",
        }}
      />
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        // 4xx is the reader's to fix and says so plainly. 5xx is ours, and its
        // message ("Email service not configured") means nothing to them, so
        // it goes to the console and they get the fallback instead.
        if (res.status >= 500) {
          console.error("contact form:", json.error);
          throw new Error("");
        }
        throw new Error(json.error ?? "Something went wrong.");
      }
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        className="rounded-[var(--bp-r-md)] border p-8"
        style={{
          borderColor: "var(--bp-hairline)",
          background: "var(--bp-paper)",
        }}
      >
        <h3
          className="text-[1.3rem] tracking-[-0.02em]"
          style={{ color: "var(--bp-ink)" }}
        >
          Thank you, we have it.
        </h3>
        <p
          className="mt-3 text-[0.98rem] leading-relaxed"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          We read every one of these and will come back to you. If you would
          rather pick a time yourself,{" "}
          <a
            href={intelligenceCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
            style={{ color: "var(--bp-blue)" }}
          >
            book it directly
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--bp-r-md)] border p-6 sm:p-8"
      style={{
        borderColor: "var(--bp-hairline)",
        background: "var(--bp-paper)",
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Generic placeholders on purpose. These read as a worked example, so
            a named person or a named company reads as a real customer we are
            claiming rather than as a hint about the format. */}
        <Field id="cta-name" name="name" label="Name" placeholder="Your name" />
        <Field
          id="cta-company"
          name="company"
          label="Company"
          optional
          placeholder="Your company"
        />
        <Field
          id="cta-email"
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
        />
        <Field
          id="cta-team"
          name="teamSize"
          label="Headcount"
          optional
          placeholder="18 people"
        />
      </div>

      <div className="mt-5">
        <label
          className={LABEL}
          htmlFor="cta-context"
          style={{ color: "var(--bp-ink)" }}
        >
          Why are you reaching out?
          <span style={{ color: "var(--bp-ink-muted)" }}> (optional)</span>
        </label>
        <textarea
          id="cta-context"
          name="context"
          rows={4}
          placeholder="Anything that would help us come to the call with context"
          className={`${FIELD} resize-y leading-relaxed`}
          style={{
            borderColor: "var(--bp-hairline-strong)",
            background: "var(--bp-paper)",
            color: "var(--bp-ink)",
          }}
        />
      </div>

      {state === "error" ? (
        <p
          role="alert"
          className="mt-4 text-[0.88rem] leading-relaxed"
          style={{ color: "#a3341f" }}
        >
          {error || (
            <>
              We could not send that. Please email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and we will pick it up from there.
            </>
          )}
        </p>
      ) : null}

      <div
        className="mt-7 flex flex-wrap items-center justify-end gap-4 border-t pt-6"
        style={{ borderColor: "var(--bp-hairline)" }}
      >
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-[0.98rem] font-medium text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-ink)] active:translate-y-[1px] disabled:opacity-50"
          style={{ background: "var(--bp-ink)" }}
        >
          {state === "sending" ? "Sending" : "Book a demo"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
