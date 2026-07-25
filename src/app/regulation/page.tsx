import type { Metadata } from 'next'
import { KB } from '@/lib/regulation/data'
import { ASSET_PRESETS } from '@/lib/regulation/data/assets'
import { isRouteEligible } from '@/lib/regulation/solver/eligibility'
import { Router, type AssetOption, type MarketOption } from '@/components/regulation/Router'

const MFN_THRESHOLD = 60

export const metadata: Metadata = {
  title: 'Regulatory Pathway Router | First Ocean',
  description:
    'Optimal filing sequences across global medicines regulators, exploiting reliance pathways where one approval unlocks a faster route elsewhere.',
}

export default function RegulationPage() {
  const markets: MarketOption[] = KB.markets
    .filter((m) => m.populationM > 0)
    .map((m) => ({
      id: m.id,
      name: m.name,
      region: m.region,
      regulator: m.regulator,
      isAnchor: m.isAnchor,
      inMfnBasket:
        m.oecdMember && m.gdpPerCapitaPctUs !== null && m.gdpPerCapitaPctUs >= MFN_THRESHOLD,
      routeCount: KB.routes.filter((r) => r.marketId === m.id).length,
    }))

  const programNames = new Map(KB.programs.map((p) => [p.id, p.name]))
  const assets: AssetOption[] = ASSET_PRESETS.map((a) => ({
    id: a.id,
    name: a.name,
    kind: a.kind,
    indication: a.indication,
    orphan: a.orphan,
    whoEoiEligible: a.whoEoiEligible,
    priorityReviewGrade: a.priorityReviewGrade,
    reachablePrograms: [
      ...new Set(
        KB.routes
          .filter((r) => isRouteEligible(r, a) && r.programId)
          .map((r) => programNames.get(r.programId as string) ?? (r.programId as string)),
      ),
    ],
  }))

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-[var(--line)]">
        <div className="max-w-[1500px] mx-auto px-6 py-5 flex items-baseline justify-between gap-6">
          <div>
            <h1 className="text-lg font-semibold text-ink">Regulatory Pathway Router</h1>
            <p className="text-sm text-ink-soft mt-0.5">
              Filing sequences across {KB.markets.length} markets and {KB.routes.length} routes,
              routed through reliance pathways.
            </p>
          </div>
          <a
            href="/api/regulation"
            className="text-sm text-brand hover:underline whitespace-nowrap"
          >
            API reference →
          </a>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto px-6 py-8 flex-1 w-full">
        <Router markets={markets} assets={assets} />
      </div>

      <footer className="bg-footer text-ink-on-dark mt-16">
        <div className="max-w-[1500px] mx-auto px-6 py-8 text-sm space-y-2">
          <p className="font-medium">How to read the numbers</p>
          <p className="text-white/70 max-w-3xl leading-relaxed">
            Durations are agency clocks in calendar days; real elapsed time runs 1.5–3× longer.
            Reliance pathways shorten registration, not reimbursement — an approval is not access.
            Every route carries a confidence level and a link to its regulator source, and rows
            marked low confidence are estimates rather than published figures.
          </p>
        </div>
      </footer>
    </main>
  )
}
