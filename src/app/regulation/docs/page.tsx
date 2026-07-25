import type { Metadata } from 'next'
import { ApiDocs } from '@/components/regulation/ApiDocs'

export const metadata: Metadata = {
  title: 'Regulatory API reference | First Ocean',
  description:
    'Interactive documentation for the regulatory pathway API — solve filing sequences, parse drug descriptions, and model reference pricing.',
}

export default function RegulationDocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-[var(--line)]">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-baseline justify-between gap-6">
          <div>
            <h1 className="text-base font-semibold text-ink">Regulatory API reference</h1>
            <p className="text-xs text-ink-soft mt-0.5">
              No authentication. Try any endpoint from the panel on the right.
            </p>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="/api/regulation/openapi.json" className="text-brand hover:underline">
              OpenAPI spec
            </a>
            <a href="/regulation" className="text-brand hover:underline">
              ← Back to the router
            </a>
          </nav>
        </div>
      </header>
      <ApiDocs specUrl="/api/regulation/openapi.json" />
    </main>
  )
}
