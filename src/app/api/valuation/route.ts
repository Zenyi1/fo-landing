import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  DEV_STAGES,
  THERAPEUTIC_AREAS,
  ASSET_TYPES,
  APPROVALS,
  YEARS_APPROVED,
  ANNUAL_SALES,
  PEAK_SALES,
  LMIC_BURDEN,
  FOOTPRINTS,
} from "@/types/valuation";

export const runtime = "nodejs";
export const maxDuration = 30;

const APPROVED_FIELDS = {
  therapeuticArea: THERAPEUTIC_AREAS,
  assetType: ASSET_TYPES,
  approvals: APPROVALS,
  yearsApproved: YEARS_APPROVED,
  annualSales: ANNUAL_SALES,
  footprint: FOOTPRINTS,
} as const;

const CLINICAL_FIELDS = {
  therapeuticArea: THERAPEUTIC_AREAS,
  assetType: ASSET_TYPES,
  peakSales: PEAK_SALES,
  lmicBurden: LMIC_BURDEN,
  coreMarkets: FOOTPRINTS,
} as const;

type Inputs = Record<string, string>;

const SYSTEM_APPROVED = `You are a commercial analyst at firstocean, a platform that helps pharmaceutical originators commercialize approved therapeutics in emerging markets. Given a de-identified profile of an approved therapeutic, estimate the untapped annual revenue opportunity in USD millions across emerging markets where the asset is not yet commercialized (Latin America, Africa, the Middle East, South and Southeast Asia, Central Asia, Eastern Europe).

Count only emerging markets: exclude high-income markets such as the US, Canada, Western Europe, Japan and Australia from both the revenue figure and the market count, even when the asset is not commercialized there. Ground the estimate in the profile: current sales scale, disease burden in low- and middle-income countries, regulatory strength, and remaining exclusivity. Work through it before answering: take the current annual net sales implied by the profile, apply the emerging-market opportunity percentage appropriate to the disease burden and remaining exclusivity (typically 10 to 45 percent, higher for infectious disease and vaccines given LMIC disease burden, lower when the asset already has broad global reach), and report the result. Compute a precise figure from the inputs; do not output a round number that is a multiple of 5 or 10. Also estimate how many emerging markets are commercially viable for this asset, an integer between 12 and 54.`;

const SYSTEM_CLINICAL = `You are a commercial analyst at firstocean, a platform that helps pharmaceutical originators monetize therapeutics in emerging markets. Given a de-identified profile of a clinical-stage or preclinical therapeutic, estimate what the originator could realistically realize today by out-licensing or selling emerging-market rights (Latin America, Africa, the Middle East, South and Southeast Asia, Central Asia, Eastern Europe) that sit outside their planned core markets. Return the total risk-adjusted deal value in USD millions (upfront plus development and sales milestones, at typical regional licensing terms).

Count only emerging markets: exclude high-income markets such as the US, Canada, Western Europe, Japan and Australia from both the deal value and the market count, even when they sit outside the planned core markets. Ground the estimate in the profile: expected peak sales, phase probability of reaching approval (roughly 5 to 10 percent from preclinical, about 10 percent from Phase 1, 15 to 30 percent from Phase 2, 50 to 60 percent from Phase 3, varying by therapeutic area), and where the lead indication's disease burden concentrates. When the burden falls mostly on low- and middle-income countries, emerging-market value rises well beyond what core-market peak sales alone imply; when it falls mostly on high-income populations, it is lower. Use the therapeutic area to sanity-check this. Parallel filing means emerging-market registration can start during late-stage trials, which raises the value of these rights before approval. Work through it before answering: estimate plausible peak annual sales in the emerging markets in scope, multiply by the phase probability of approval, then take typical regional out-licensing economics (a low-double-digit percentage of that risk-adjusted value, combining upfront and milestones). When peak sales is "Not sure yet" or the disease burden concentration is "Not sure", do not assume a blockbuster: widen your uncertainty, lean to the low end, and infer conservatively from the therapeutic area and asset type. Earlier stages are worth far less. Compute a precise figure from the inputs; do not output a round number that is a multiple of 5 or 10. Also estimate how many emerging markets are viable for parallel filing or regional licensing of this asset, an integer between 8 and 54.`;

const SCHEMA = {
  type: "object",
  properties: {
    value_musd: {
      type: "integer",
      description: "Untapped annual revenue opportunity in USD millions",
    },
    markets: {
      type: "integer",
      description: "Number of commercially viable emerging markets",
    },
  },
  required: ["value_musd", "markets"],
  additionalProperties: false,
} as const;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

// deterministic fallback so the funnel never dead-ends if the model call fails
function heuristic(inputs: Inputs) {
  const salesMid: Record<string, number> = {
    [ANNUAL_SALES[0]]: 6,
    [ANNUAL_SALES[1]]: 30,
    [ANNUAL_SALES[2]]: 150,
    [ANNUAL_SALES[3]]: 620,
    [ANNUAL_SALES[4]]: 1600,
  };
  const peakMid: Record<string, number> = {
    [PEAK_SALES[0]]: 60,
    [PEAK_SALES[1]]: 280,
    [PEAK_SALES[2]]: 720,
    [PEAK_SALES[3]]: 1800,
    [PEAK_SALES[4]]: 4000,
    [PEAK_SALES[5]]: 280, // "not sure yet": neutral prior
  };
  const footprintFactor: Record<string, number> = {
    [FOOTPRINTS[0]]: 0.34,
    [FOOTPRINTS[1]]: 0.32,
    [FOOTPRINTS[2]]: 0.27,
    [FOOTPRINTS[3]]: 0.13,
  };
  // probability of reaching approval from each stage, industry averages
  const phasePos: Record<string, number> = {
    [DEV_STAGES[0]]: 0.07,
    [DEV_STAGES[1]]: 0.11,
    [DEV_STAGES[2]]: 0.22,
    [DEV_STAGES[3]]: 0.55,
  };
  // disease burden proxy: lmic-concentrated burden lifts em value, high-income burden lowers it
  const burdenFactor: Record<string, number> = {
    [LMIC_BURDEN[0]]: 0.6, // mostly high-income
    [LMIC_BURDEN[1]]: 1.0, // fairly even
    [LMIC_BURDEN[2]]: 1.5, // mostly lmic
    [LMIC_BURDEN[3]]: 1.0, // "not sure": neutral prior
  };
  let hash = 0;
  for (const ch of Object.values(inputs).join("|")) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  const jitter = 0.85 + (hash % 1000) / 1000 * 0.3;
  if (inputs.devStage !== "Approved") {
    // deal value ~ peak em revenue x probability of success x disease burden x typical regional deal multiple
    const value =
      peakMid[inputs.peakSales] *
      footprintFactor[inputs.coreMarkets] *
      phasePos[inputs.devStage] *
      burdenFactor[inputs.lmicBurden] *
      1.8 *
      jitter;
    return { value_musd: clamp(value, 1, 1500), markets: 10 + (hash % 25) };
  }
  const value = salesMid[inputs.annualSales] * footprintFactor[inputs.footprint] * jitter;
  return { value_musd: clamp(value, 2, 3000), markets: 24 + (hash % 23) };
}

async function fromClaude(inputs: Inputs) {
  const clinical = inputs.devStage !== "Approved";
  const profile = clinical
    ? `Asset profile:
Development stage: ${inputs.devStage}
Therapeutic area: ${inputs.therapeuticArea}
Asset type: ${inputs.assetType}
Expected peak annual sales at maturity: ${inputs.peakSales}
Where the lead-indication disease burden concentrates: ${inputs.lmicBurden}
Planned core commercial markets: ${inputs.coreMarkets}`
    : `Asset profile:
Therapeutic area: ${inputs.therapeuticArea}
Asset type: ${inputs.assetType}
Regulatory approvals: ${inputs.approvals}
Time since first approval: ${inputs.yearsApproved}
Annual net sales in current markets: ${inputs.annualSales}
Current commercial footprint: ${inputs.footprint}`;

  const client = new Anthropic();
  const response = await client.messages.create(
    {
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: clinical ? SYSTEM_CLINICAL : SYSTEM_APPROVED,
      output_config: {
        effort: "low",
        format: { type: "json_schema", schema: SCHEMA },
      },
      messages: [{ role: "user", content: profile }],
    },
    // fail fast so the catch -> heuristic fallback runs before the platform kills the function
    { timeout: 8000, maxRetries: 1 },
  );

  const block = response.content.find((b) => b.type === "text");
  if (!block || response.stop_reason === "refusal") throw new Error("no output");
  const parsed = JSON.parse(block.text) as { value_musd: number; markets: number };
  return {
    value_musd: clamp(parsed.value_musd, clinical ? 1 : 2, clinical ? 1500 : 3000),
    markets: clamp(parsed.markets, clinical ? 8 : 12, 54),
  };
}

// the input space is finite (18,000 combinations), so cache per instance to avoid
// re-billing identical profiles; simple per-ip window as a denial-of-wallet backstop
const cache = new Map<string, { value_musd: number; markets: number }>();
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  if (hits.size > 5000) hits.clear();
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const devStage = String(body.devStage ?? "");
  if (!(DEV_STAGES as readonly string[]).includes(devStage)) {
    return NextResponse.json({ error: "Invalid devStage" }, { status: 400 });
  }

  const fields = devStage === "Approved" ? APPROVED_FIELDS : CLINICAL_FIELDS;
  const inputs: Inputs = { devStage };
  for (const [field, options] of Object.entries(fields)) {
    const value = String(body[field] ?? "");
    if (!(options as readonly string[]).includes(value)) {
      return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
    }
    inputs[field] = value;
  }

  const key = Object.values(inputs).join("|");
  let result = cache.get(key);
  if (!result) {
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        result = await fromClaude(inputs);
      } catch {
        result = heuristic(inputs);
      }
    } else {
      result = heuristic(inputs);
    }
    cache.set(key, result);
  }

  return NextResponse.json({ valueMusd: result.value_musd, markets: result.markets });
}
