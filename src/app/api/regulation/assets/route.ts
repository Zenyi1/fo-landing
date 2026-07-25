import { ASSET_PRESETS, ASSET_KINDS, INDICATIONS } from '@/lib/regulation/data/assets'
import { KB } from '@/lib/regulation/data'
import { isRouteEligible } from '@/lib/regulation/solver/eligibility'
import { json, preflight } from '@/lib/regulation/api/respond'

export function OPTIONS() {
  return preflight()
}

export async function GET() {
  return json({
    count: ASSET_PRESETS.length,
    indications: INDICATIONS,
    kinds: ASSET_KINDS,
    presets: ASSET_PRESETS.map((a) => {
      const eligible = KB.routes.filter((r) => isRouteEligible(r, a))
      const programs = [...new Set(eligible.map((r) => r.programId).filter(Boolean))]
      return {
        ...a,
        eligibleRouteCount: eligible.length,
        reachablePrograms: programs,
      }
    }),
  })
}
