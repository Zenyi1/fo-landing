'use client';

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const GENERIC_ERROR = "Something went wrong. Please try again.";

const INDUSTRIES = [
  "Biotech",
  "Pharmaceutical company",
  "In-licensor",
  "Distributor",
  "Investor",
  "Government or public sector",
  "NGO or foundation",
  "Other",
];

const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1001+"];

export function EnquiryForm() {
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
        throw new Error(body.error ?? GENERIC_ERROR);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : GENERIC_ERROR);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ink/10 bg-ink/[0.02] p-8 md:p-10">
        <h3 className="font-sans text-[26px] font-semibold tracking-[-0.02em] text-ink md:text-[30px]">
          {"You're on the list."}
        </h3>
        <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
          Thank you. We will reach out once a spot opens up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7">
      <TextField label="Name" name="name" type="text" required autoComplete="name" />
      <TextField label="Work email" name="email" type="email" required autoComplete="email" />
      <TextField label="Company" name="company" type="text" required autoComplete="organization" />
      <SelectField label="Industry" name="industry" required options={INDUSTRIES} />
      <SelectField label="Team size" name="teamSize" required options={TEAM_SIZES} />

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-fit items-center bg-brand px-7 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending" : "Get early access"}
        </button>
        {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
}

const fieldClass =
  "w-full border-b border-ink/20 bg-transparent py-2.5 font-sans text-[16px] font-medium text-ink transition-colors placeholder:text-ink-soft/40 focus:border-brand focus:outline-none";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[13px] font-medium text-ink">{children}</span>
  );
}

function TextField({
  label,
  name,
  type,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: "text" | "email";
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-label={label}
        className={`${fieldClass} mt-3`}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="relative mt-3">
        <select
          name={name}
          required={required}
          defaultValue={options[0]}
          aria-label={label}
          className={`${fieldClass} appearance-none pr-6`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink-soft"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
