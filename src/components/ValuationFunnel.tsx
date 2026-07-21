'use client';

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import {
  DEV_STAGES,
  THERAPEUTIC_AREAS,
  ASSET_TYPES,
  APPROVALS,
  PATENT_LIFE,
  ANNUAL_SALES,
  PEAK_SALES,
  LMIC_BURDEN,
  FOOTPRINTS,
  EM_DEALS,
} from "@/types/valuation";

const CALENDLY_URL = "https://calendly.com/zenyi-first-ocean/30min";

const LOADING_STEPS = [
  "Reading your asset profile",
  "Benchmarking emerging-market analogues",
  "Sizing addressable demand",
  "Preparing your estimate",
];

const MIN_LOADING_MS = 4400;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]";

type Result = { valueMusd: number; markets: number };
type Stage = "form" | "loading" | "result" | "error";

function formatValue(musd: number) {
  if (musd >= 999.5) {
    const b = musd / 1000;
    return `$${b >= 10 ? Math.round(b) : b.toFixed(1)}B`;
  }
  return `$${Math.round(musd)}M`;
}

// attach the estimate and every answer to the booking so we know what number a lead saw
// and the full profile behind it. calendly captures utm params via analytics, webhooks and
// integrations; they are not shown in the booking form.
const FIELD_LABELS: Record<string, string> = {
  devStage: "Stage",
  therapeuticArea: "Area",
  assetType: "Type",
  approvals: "Approvals",
  patentLife: "Patent life",
  annualSales: "Annual sales",
  peakSales: "Peak sales",
  lmicBurden: "Patients",
  coreMarkets: "Core markets",
  footprint: "Footprint",
  emDeals: "EM deals",
};

function schedulingUrl(answers: Record<string, string>, result: Result) {
  const profile = Object.keys(FIELD_LABELS)
    .filter((k) => answers[k])
    .map((k) => `${FIELD_LABELS[k]}: ${answers[k]}`)
    .join(" · ");
  const summary = `Estimate ${formatValue(result.valueMusd)} across ${result.markets} markets · ${profile}`;
  const params = new URLSearchParams({
    utm_source: "originators",
    utm_medium: "valuation-funnel",
    utm_campaign: "fo-estimate",
    utm_content: summary,
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}

export function ValuationFunnel() {
  const [stage, setStage] = useState<Stage>("form");
  const [result, setResult] = useState<Result | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [devStage, setDevStage] = useState<string>("Approved");
  const clinical = devStage !== "Approved";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setAnswers(data);
    setStage("loading");
    track("valuation_submitted", {
      devStage: data.devStage ?? "",
      therapeuticArea: data.therapeuticArea ?? "",
      assetType: data.assetType ?? "",
      clinical,
    });

    const started = Date.now();
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      const json = (await res.json()) as Result;
      const remaining = MIN_LOADING_MS - (Date.now() - started);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      setResult(json);
      setStage("result");
      track("valuation_result", {
        clinical,
        valueMusd: json.valueMusd,
        markets: json.markets,
      });
    } catch {
      setStage("error");
      track("valuation_error", { clinical });
    }
  }

  return (
    <AnimatedHeight>
      <div aria-live="polite">
        {stage === "loading" && <LoadingSteps />}
        {stage === "result" && result && <ResultView result={result} clinical={clinical} answers={answers} />}
        {stage === "error" && (
          <div className="text-center">
            <p className="text-[17px] text-ink">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => setStage("form")}
              className={`mt-6 inline-flex items-center rounded-lg bg-[#4a72e8] px-7 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-[#3a5fd0] ${focusRing}`}
            >
              Back to the form
            </button>
          </div>
        )}
      </div>
      {stage === "form" && (
        <div className="mx-auto w-full max-w-[560px]">
          <h1 className="font-sans text-[26px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink md:text-[34px]">
            Your asset is worth more than just its core markets.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.55] text-ink md:text-[16px]">
            {clinical
              ? "Fill in the basics about your asset and we'll put a number on its rights outside your core markets."
              : "Fill in the basics about your asset and we'll estimate what it could be earning each year outside your core markets."}
          </p>
          <form onSubmit={onSubmit} className="mt-7 grid gap-4 lg:grid-cols-2">
            <Select label="Development stage" name="devStage" options={DEV_STAGES} value={devStage} onChange={setDevStage} />
            <Select label="Therapeutic area" name="therapeuticArea" options={THERAPEUTIC_AREAS} answers={answers} />
            <Select label="Asset type" name="assetType" options={ASSET_TYPES} answers={answers} />
            {clinical ? (
              <>
                <Select label="Expected worldwide peak sales" name="peakSales" options={PEAK_SALES} answers={answers} />
                <Select label="Where most patients live" name="lmicBurden" options={LMIC_BURDEN} answers={answers} />
                <Select label="Planned core markets" name="coreMarkets" options={FOOTPRINTS} answers={answers} />
                <Select label="Existing emerging-market deals" name="emDeals" options={EM_DEALS} answers={answers} />
              </>
            ) : (
              <>
                <Select label="Regulatory approvals" name="approvals" options={APPROVALS} answers={answers} />
                <Select label="Remaining patent life" name="patentLife" options={PATENT_LIFE} answers={answers} />
                <Select label="Annual net sales in current markets" name="annualSales" options={ANNUAL_SALES} answers={answers} />
                <Select label="Current commercial footprint" name="footprint" options={FOOTPRINTS} answers={answers} />
                <Select label="Where most patients live" name="lmicBurden" options={LMIC_BURDEN} answers={answers} />
                <Select label="Existing emerging-market deals" name="emDeals" options={EM_DEALS} answers={answers} />
              </>
            )}
            <button
              type="submit"
              className={`mt-1 inline-flex w-fit items-center rounded-lg bg-[#4a72e8] px-7 py-3 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[#3a5fd0] lg:col-span-2 ${focusRing}`}
            >
              Get the number
            </button>
            <p className="text-[13px] leading-[1.5] text-ink/55 lg:col-span-2">
              You stay anonymous. We never ask for your name, compound, or email. The estimate is a directional model, not a formal valuation.
            </p>
          </form>
        </div>
      )}
    </AnimatedHeight>
  );
}

// animates to the content's new height when the form branch or stage changes,
// so the vertically centered layout glides instead of snapping
function AnimatedHeight({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{ height }}
      className="w-full overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
    >
      <div ref={inner}>{children}</div>
    </div>
  );
}

function LoadingSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-[#0d9488] motion-reduce:animate-none" />
      <p className="mt-8 text-[17px] font-medium text-ink md:text-[19px]">
        {LOADING_STEPS[step]}
      </p>
      <div className="mt-6 flex gap-2">
        {LOADING_STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              i <= step ? "bg-[#0d9488]" : "bg-ink/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ResultView({
  result,
  clinical,
  answers,
}: {
  result: Result;
  clinical: boolean;
  answers: Record<string, string>;
}) {
  const display = useCountUp(result.valueMusd);

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0d9488]">
        {clinical
          ? "Estimated value of your emerging-market rights"
          : "Estimated untapped annual revenue"}
      </p>
      <p className="mt-4 font-sans text-[72px] font-semibold leading-none tracking-[-0.03em] text-ink md:text-[120px]">
        <span aria-hidden>{formatValue(display)}</span>
        <span className="sr-only">{formatValue(result.valueMusd)}</span>
      </p>
      <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.6] text-ink md:text-[19px]">
        {clinical
          ? `from licensing across ${result.markets} emerging markets while your asset is still in development.`
          : `across ${result.markets} emerging markets your asset has not reached.`}
      </p>
      <a
        href={schedulingUrl(answers, result)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("valuation_book_click", { clinical })}
        className={`mt-10 inline-flex items-center rounded-lg bg-[#4a72e8] px-8 py-4 font-sans text-[17px] font-semibold text-white transition-colors hover:bg-[#3a5fd0] ${focusRing}`}
      >
        Get the market-by-market breakdown
      </a>
      <p className="mt-5 max-w-[44ch] text-[14px] leading-[1.6] text-ink">
        A 30-minute call. We walk through which markets drive this number and
        the route to capture them.
      </p>
      <p className="mt-10 max-w-[52ch] text-[12px] leading-[1.6] text-ink/50">
        Directional estimate, not a formal valuation. Covers Latin America,
        Africa, the Middle East, South and Southeast Asia, Central Asia and
        Eastern Europe. Excludes China.
      </p>
    </div>
  );
}

function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    function tick(now: number) {
      const t = reduce ? 1 : Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, durationMs]);

  return value;
}

const selectClass =
  "w-full appearance-none rounded-lg border border-black/15 bg-white px-4 py-2.5 pr-10 font-sans text-[15px] font-medium text-ink shadow-sm outline-none transition-colors hover:border-black/30 focus:border-[#0d9488] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]";

function Select({
  label,
  name,
  options,
  answers,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: readonly string[];
  answers?: Record<string, string>;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[13px] font-medium text-ink">{label}</span>
      <div className="relative mt-2">
        <select
          name={name}
          required
          {...(onChange
            ? { value, onChange: (e) => onChange(e.target.value) }
            : { defaultValue: answers?.[name] ?? options[0] })}
          aria-label={label}
          className={selectClass}
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-white text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50"
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
