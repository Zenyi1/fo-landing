'use client';

import { useState } from "react";
import { SlashIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brand/20 p-8 md:p-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-brand/70">/received</p>
        <h2 className="mt-6 font-serif text-[32px] md:text-[44px] leading-[1.1]">
          Thanks — we&apos;ll be in touch.
        </h2>
        <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6] text-brand/80">
          Your message has reached the team. We typically respond within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:gap-10">
      <Field label="Name" name="name" type="text" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" required={false} autoComplete="tel" />
      <Field label="Message" name="message" type="textarea" required />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-brand text-base text-brand hover:bg-brand hover:text-white transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
          <SlashIcon className="w-3 h-3" />
        </button>
        {status === "error" && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
}) {
  const baseClass =
    "w-full bg-transparent border-b border-brand/30 py-3 text-[16px] md:text-[18px] text-brand placeholder:text-brand/30 focus:outline-none focus:border-brand transition-colors";

  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.25em] uppercase text-brand/70">
        /{label.toLowerCase()}
        {required ? "" : " (optional)"}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`${baseClass} mt-3 resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={`${baseClass} mt-3`}
        />
      )}
    </label>
  );
}
