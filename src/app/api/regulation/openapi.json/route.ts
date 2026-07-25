import type { NextRequest } from 'next/server'
import { buildOpenApiSpec } from '@/lib/regulation/api/openapi'
import { json, preflight } from '@/lib/regulation/api/respond'

export const dynamic = 'force-dynamic'

export function OPTIONS() {
  return preflight()
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin
  return json(buildOpenApiSpec('/api/regulation', origin), { cache: 'public, max-age=300' })
}
