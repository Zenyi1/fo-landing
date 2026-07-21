export const DEV_STAGES = [
  "Preclinical",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Approved",
] as const;

export const THERAPEUTIC_AREAS = [
  "Oncology",
  "Cardiovascular",
  "Central nervous system",
  "Infectious disease",
  "Immunology",
  "Metabolic and endocrine",
  "Respiratory",
  "Rare disease",
  "Other",
] as const;

export const ASSET_TYPES = [
  "Small molecule",
  "Biologic",
  "Vaccine",
  "Cell or gene therapy",
  "Other",
] as const;

export const APPROVALS = [
  "FDA",
  "EMA",
  "FDA and EMA",
  "Other stringent regulator",
] as const;

export const PATENT_LIFE = [
  "Over 10 years",
  "5 to 10 years",
  "2 to 5 years",
  "Under 2 years",
  "None, off patent",
] as const;

export const ANNUAL_SALES = [
  "Under $10M",
  "$10M to $50M",
  "$50M to $250M",
  "$250M to $1B",
  "Over $1B",
] as const;

// peak sales are a forward estimate, so the low buckets that fit an approved
// asset's current sales don't apply here
export const PEAK_SALES = [
  "Under $100M",
  "$100M to $500M",
  "$500M to $1B",
  "$1B to $3B",
  "Over $3B",
  "Not sure yet",
] as const;

export const LMIC_BURDEN = [
  "Mostly high-income countries",
  "Spread evenly worldwide",
  "Mostly low- and middle-income countries",
  "Not sure",
] as const;

export const EM_DEALS = [
  "None",
  "One or two markets licensed",
  "Several regions licensed",
  "Most regions licensed",
] as const;

export const FOOTPRINTS = [
  "North America only",
  "Europe only",
  "North America and Europe",
  "Global except emerging markets",
] as const;
