import { Reveal } from "@/components/Reveal";

/* The capability section. It used to be a list of what happens on the first
   call, which described an agency rather than a product and sold nothing. The
   facts underneath are the same; the framing is the inverse. The agency
   timetable is not the constraint we apologise for, it is the thing we route
   around.

   Two maps sit under the whole argument and neither is optional. Recognition:
   who will accept an assessment somebody else has already done, and in which
   cluster. Price: whose basket each market sits in, and therefore what a launch
   in one does to the price in another. Both are published, both are knowable,
   and across 53 markets neither is tractable by hand. That is the pitch. */

/* The four ways in. The accent line is what the route gets you, which is a
   published agency figure where one exists rather than anything we promise:
   SFDA verification runs up to 30 working days and abridged up to 60 for a
   product already approved by the FDA or EMA, against 8 to 18 months in the
   standard queue. WHO's collaborative procedure recommends 90 working days for
   WHO-prequalified or SRA-approved products.

   SFDA verification and abridged are one lane, not two: they are the same idea
   at two depths, and splitting them was padding that cost the slot Latin
   America needed. ZaZiBoNa is deliberately not here. It is a real work-sharing
   cluster, but its eligible scope is essential medicines and SADC priority
   diseases, its volume is overwhelmingly generic, and its markets are small.
   Wrong door for an on-patent asset, and naming it would say so. */
const LANES = [
  {
    name: "Recognition",
    gain: "30 to 60 working days",
    body: "Saudi Arabia's SFDA verifies or abridges an existing FDA or EMA approval instead of reviewing it again.",
  },
  {
    name: "WHO collaborative",
    gain: "90 working days",
    body: "For prequalified or stringently approved products, in every regulator that takes part.",
  },
  {
    name: "Cluster review",
    gain: "One submission, several countries",
    body: "Gulf centralised review. ASEAN common technical dossier. Format is shared; decisions are still national.",
  },
  {
    name: "Regional reference",
    gain: "One approval carries",
    body: "Latin American regulators rely on a PAHO reference authority: ANVISA, COFEPRIS, INVIMA.",
  },
];

export function Cascade() {
  return (
    <>
      <Reveal>
        <h2 className="text-balance font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
          One approval. A sequence, not a separate build in every market.
        </h2>
        <div className="mt-8 max-w-[64ch] space-y-6 text-[clamp(1.05rem,1.8vw,1.2rem)] leading-[1.6] text-ink">
          <p>
            Many regulators outside the US, Europe and Japan can rely on a
            dossier a stringent authority has already assessed, rather than
            repeating the full review. Price does not follow the same map: many
            countries set price against a basket, so the wrong first launch
            drags the price in markets you already care about.
          </p>
          <p className="font-medium">We sequence both.</p>
        </div>
      </Reveal>

      {/* Four ways in, four cells. The full-dossier case is deliberately not one
          of them: it is the contrast the section is arguing against, so it sits
          underneath as a single line rather than as a fifth equal option. */}
      <Reveal delay={80} className="mt-16">
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {LANES.map((lane) => (
            <li key={lane.name} className="border-t border-ink/15 pt-5">
              <h3 className="font-sans text-[1.1rem] font-semibold tracking-[-0.015em] text-ink">
                {lane.name}
              </h3>
              <p className="mt-2 text-[0.92rem] font-medium text-brand">
                {lane.gain}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.55] text-ink-soft">
                {lane.body}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
