'use client';

import { useState } from "react";
import { SlashIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Status = "idle" | "submitting" | "success" | "error";
type Props = { dict: Dictionary["contact"] };

export function ContactForm({ dict }: Props) {
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
        throw new Error(body.error ?? dict.genericError);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : dict.genericError);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-approach/20 p-8 md:p-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-approach/70">{dict.successKicker}</p>
        <h2 className="mt-6 font-sans font-bold text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.01em]">
          {dict.successHeadline}
        </h2>
        <p className="mt-4 text-[16px] md:text-[17px] leading-[1.6] text-approach/80">
          {dict.successBody}
        </p>
      </div>
    );
  }

  const f = dict.fields;

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:gap-10">
      <Field label={f.name} name="name" type="text" required autoComplete="name" />
      <Field label={f.email} name="email" type="email" required autoComplete="email" />
      <Field label={f.phone} name="phone" type="tel" required={false} optionalText={f.optional} autoComplete="tel" />
      <Field label={f.message} name="message" type="textarea" required />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-approach text-base font-semibold text-approach hover:bg-approach hover:text-white transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? dict.submitting : dict.submit}
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
  optionalText,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
  optionalText?: string;
}) {
  const baseClass =
    "w-full bg-transparent border-b border-approach/30 py-3 text-[16px] md:text-[18px] font-medium text-approach placeholder:text-approach/30 focus:outline-none focus:border-approach transition-colors";

  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.25em] uppercase text-approach/70">
        /{name}
        {required ? "" : ` ${optionalText ?? ""}`}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          aria-label={label}
          className={`${baseClass} mt-3 resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          aria-label={label}
          className={`${baseClass} mt-3`}
        />
      )}
    </label>
  );
}
