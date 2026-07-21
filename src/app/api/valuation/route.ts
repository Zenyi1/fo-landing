import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
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

export const runtime = "nodejs";
export const maxDuration = 30;

const APPROVED_FIELDS = {
  therapeuticArea: THERAPEUTIC_AREAS,
  assetType: ASSET_TYPES,
  approvals: APPROVALS,
  patentLife: PATENT_LIFE,
  annualSales: ANNUAL_SALES,
  footprint: FOOTPRINTS,
  lmicBurden: LMIC_BURDEN,
  emDeals: EM_DEALS,
} as const;

const CLINICAL_FIELDS = {
  therapeuticArea: THERAPEUTIC_AREAS,
  assetType: ASSET_TYPES,
  peakSales: PEAK_SALES,
  lmicBurden: LMIC_BURDEN,
  coreMarkets: FOOTPRINTS,
  emDeals: EM_DEALS,
} as const;

type Inputs = Record<string, string>;

const SYSTEM_APPROVED = `You are a commercial analyst at firstocean, a platform that helps pharmaceutical originators commercialize approved therapeutics in emerging markets. Given a de-identified profile of an approved therapeutic, estimate the untapped annual revenue opportunity in USD millions across emerging markets where the asset is not yet commercialized (Latin America, Africa, the Middle East, South and Southeast Asia, Central Asia, Eastern Europe).

Count only emerging markets: exclude high-income markets such as the US, Canada, Western Europe, Japan and Australia, and exclude China, from both the revenue figure and the market count, even when the asset is not commercialized there. Ground the estimate in the profile: current sales scale, where the lead indication's patients concentrate, regulatory strength, and remaining patent life. When most patients live in low- and middle-income countries the emerging-market opportunity is larger; when they are mostly in high-income countries it is smaller. Remaining patent life shapes the branded opportunity, but generic erosion in emerging markets is far milder than in the US or Europe: originator brands retain meaningful pricing power after expiry as branded generics, so reduce the estimate moderately for short or expired patent life rather than collapsing it. Weigh the asset type as a distribution-feasibility signal: small molecules are cheapest to reach emerging markets with, cold-chain biologics and especially cell or gene therapies are harder and reach fewer markets, while vaccines travel well given large public-tender demand. Existing emerging-market deals shrink what is left: subtract regions already licensed. One or two markets licensed trims the opportunity modestly, several regions licensed cuts it roughly in half, most regions licensed leaves only a small remainder. Work through it before answering: take the current annual net sales implied by the profile, apply the emerging-market opportunity percentage appropriate to the patient concentration and remaining patent life (typically 10 to 45 percent, higher for infectious disease and vaccines given LMIC disease burden, lower when the asset already has broad global reach, moderately lower when near or past patent expiry), then remove what existing deals already cover, and report the result. Compute a precise figure from the inputs; do not output a round number that is a multiple of 5 or 10. Also estimate how many emerging markets are commercially viable and still open to the originator, an integer between 4 and 54.`;

const SYSTEM_CLINICAL = `You are a commercial analyst at firstocean, a platform that helps pharmaceutical originators monetize therapeutics in emerging markets. Given a de-identified profile of a clinical-stage or preclinical therapeutic, estimate what the originator could realistically realize today by out-licensing or selling emerging-market rights (Latin America, Africa, the Middle East, South and Southeast Asia, Central Asia, Eastern Europe) that sit outside their planned core markets. Return the total risk-adjusted deal value in USD millions (upfront plus development and sales milestones, at typical regional licensing terms).

Count only emerging markets: exclude high-income markets such as the US, Canada, Western Europe, Japan and Australia, and exclude China, from both the deal value and the market count, even when they sit outside the planned core markets. Ground the estimate in the profile: expected peak sales, phase probability of reaching approval (roughly 5 to 10 percent from preclinical, about 10 percent from Phase 1, 15 to 30 percent from Phase 2, 50 to 60 percent from Phase 3, varying by therapeutic area), and where the lead indication's patients concentrate. When most patients live in low- and middle-income countries, emerging-market value rises well beyond what core-market peak sales alone imply; when they are mostly in high-income countries, it is lower. Use the therapeutic area to sanity-check this. Weigh the asset type as a distribution-feasibility signal: small molecules are cheapest to reach emerging markets with, cold-chain biologics and especially cell or gene therapies are harder and reach fewer markets, while vaccines travel well given large public-tender demand. Existing emerging-market deals shrink what is left to license: subtract regions already licensed. One or two markets licensed trims the value modestly, several regions licensed cuts it roughly in half, most regions licensed leaves only a small remainder. Parallel filing means emerging-market registration can start during late-stage trials, which raises the value of these rights before approval. Work through it before answering: estimate plausible peak annual sales in the emerging markets still open, multiply by the phase probability of approval, then take typical regional out-licensing economics (a low-double-digit percentage of that risk-adjusted value, combining upfront and milestones). When peak sales is "Not sure yet" or the patient concentration is "Not sure", do not assume a blockbuster: widen your uncertainty, lean to the low end, and infer conservatively from the therapeutic area and asset type. Earlier stages are worth far less. Compute a precise figure from the inputs; do not output a round number that is a multiple of 5 or 10. Also estimate how many emerging markets are viable for parallel filing or regional licensing and still open to the originator, an integer between 4 and 54.`;

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
  // remaining patent life shapes the branded opportunity; em generic erosion is milder
  // than in the us/eu since originator brands hold pricing power as branded generics
  const patentFactor: Record<string, number> = {
    [PATENT_LIFE[0]]: 1.0, // over 10 years
    [PATENT_LIFE[1]]: 0.92, // 5 to 10
    [PATENT_LIFE[2]]: 0.8, // 2 to 5
    [PATENT_LIFE[3]]: 0.65, // under 2
    [PATENT_LIFE[4]]: 0.45, // none, off patent
  };
  // existing em deals shrink what is left; subtract regions already licensed
  const dealsFactor: Record<string, number> = {
    [EM_DEALS[0]]: 1.0, // none
    [EM_DEALS[1]]: 0.8, // one or two markets
    [EM_DEALS[2]]: 0.5, // several regions
    [EM_DEALS[3]]: 0.2, // most regions
  };
  // distribution feasibility in emerging markets; cold-chain and infrastructure-heavy modalities are harder to reach
  const modalityFactor: Record<string, number> = {
    [ASSET_TYPES[0]]: 1.0, // small molecule: oral, stable, easiest
    [ASSET_TYPES[1]]: 0.85, // biologic: cold chain, higher cost
    [ASSET_TYPES[2]]: 1.0, // vaccine: cold chain but large lmic tender demand
    [ASSET_TYPES[3]]: 0.5, // cell or gene therapy: infrastructure-heavy, limited em reach
    [ASSET_TYPES[4]]: 0.9, // other
  };
  let hash = 0;
  for (const ch of Object.values(inputs).join("|")) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  const jitter = 0.85 + (hash % 1000) / 1000 * 0.3;
  const deals = dealsFactor[inputs.emDeals];
  if (inputs.devStage !== "Approved") {
    // deal value ~ peak em revenue x probability of success x disease burden x typical regional deal multiple
    const value =
      peakMid[inputs.peakSales] *
      footprintFactor[inputs.coreMarkets] *
      phasePos[inputs.devStage] *
      burdenFactor[inputs.lmicBurden] *
      modalityFactor[inputs.assetType] *
      deals *
      1.8 *
      jitter;
    return { value_musd: clamp(value, 1, 1500), markets: clamp((10 + (hash % 25)) * deals, 4, 54) };
  }
  const value =
    salesMid[inputs.annualSales] *
    footprintFactor[inputs.footprint] *
    burdenFactor[inputs.lmicBurden] *
    patentFactor[inputs.patentLife] *
    modalityFactor[inputs.assetType] *
    deals *
    jitter;
  return { value_musd: clamp(value, 2, 3000), markets: clamp((24 + (hash % 23)) * deals, 4, 54) };
}

async function fromClaude(inputs: Inputs) {
  const clinical = inputs.devStage !== "Approved";
  const profile = clinical
    ? `Asset profile:
Development stage: ${inputs.devStage}
Therapeutic area: ${inputs.therapeuticArea}
Asset type: ${inputs.assetType}
Expected worldwide peak annual sales at maturity: ${inputs.peakSales}
Where most patients with the lead indication live: ${inputs.lmicBurden}
Planned core commercial markets: ${inputs.coreMarkets}
Existing emerging-market deals already in place: ${inputs.emDeals}`
    : `Asset profile:
Therapeutic area: ${inputs.therapeuticArea}
Asset type: ${inputs.assetType}
Regulatory approvals: ${inputs.approvals}
Remaining patent life: ${inputs.patentLife}
Annual net sales in current markets: ${inputs.annualSales}
Current commercial footprint: ${inputs.footprint}
Where most patients with the lead indication live: ${inputs.lmicBurden}
Existing emerging-market deals already in place: ${inputs.emDeals}`;

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
    markets: clamp(parsed.markets, 4, 54),
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
