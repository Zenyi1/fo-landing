# fo landing

The marketing site for firstocean's licensing business — taking approved and
late-stage medicines into the markets a launch plan leaves out. The homepage,
`/markets`, `/originators` and its valuation estimate, `/distributors`, and the
legal pages. Next.js App Router, React 19, Tailwind v4, deployed on Vercel.

The operating-system side of the business, which was served here at
`/intelligence` along with the blog, moved to its own repo in August 2026 and is
served at ribo.bio. Nothing in this repo depends on it; `next.config.ts`
redirects the paths it left behind so the indexed URLs do not 404.

## Running it

```
nvm use          # node 24
npm install
npm run dev
```

`npm run check` runs lint, typecheck and build — the same three gates CI needs
to pass.

## Environment

Copy `.env.example` to `.env` and fill it in.

| Variable                  | Missing means                                                       |
| ------------------------- | ------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`       | the valuation funnel falls back to its deterministic heuristic       |
| `NEXT_PUBLIC_POSTHOG_KEY` | no analytics and no session replay                                   |

PostHog is ingested through `/ingest` on this domain, rewritten in
`next.config.ts`, so ad blockers do not drop it. The rewrite targets US cloud;
on EU cloud, change the destinations there too.
