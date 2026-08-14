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

/* The four ways in. The mono line is what the route gets you, which is a
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
    body: "Saudi Arabia's SFDA verifies or abridges against an existing FDA or EMA approval instead of reviewing it again.",
  },
  {
    name: "WHO collaborative",
    gain: "90 working days",
    body: "For prequalified or stringently approved products, in every regulator that takes part.",
  },
  {
    name: "Cluster review",
    gain: "One submission, several countries",
    body: "The Gulf reviews centrally and ASEAN assesses jointly, so a single dossier moves a whole region.",
  },
  {
    name: "Regional reference",
    gain: "One approval carries",
    body: "Latin American regulators rely on an approval from a PAHO reference authority: ANVISA, COFEPRIS, INVIMA.",
  },
];

export function Cascade() {
  return (
    <>
      <Reveal>
        <h2 className="text-balance font-sans text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
          One approval, fifty-three markets.
        </h2>
        <div className="mt-8 max-w-[64ch] space-y-6 text-[clamp(1.05rem,1.8vw,1.2rem)] leading-[1.6] text-ink">
          <p>
            Most regulators outside the US, Europe and Japan will not re-review a
            dossier a stringent authority has already assessed. They rely on it.
            That is not a favour, it is published policy, and it is the
            difference between a decision in weeks and a decision in years.
          </p>
          <p>
            Which lane a market opens depends on what you already hold and what
            you register first, because recognition runs in clusters rather than
            country by country. Price runs on a second map that does not match
            the first: most countries set price against a basket of other
            countries, so launching in the wrong market first drags your price
            down in the ones you care about.
          </p>
          <p className="font-medium">
            firstocean solves both maps at once, then cascades your asset across
            the markets we cover in the order those maps allow.
          </p>
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
              <p className="mt-2 font-ledger text-[0.88rem] tracking-[-0.01em] text-brand">
                {lane.gain}
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.55] text-ink-soft">
                {lane.body}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-14 max-w-[64ch] text-[1.02rem] leading-[1.6] text-ink-soft">
          Everywhere else it is a full dossier and a real queue: Brazil&rsquo;s
          ANVISA runs 15 to 18 months, Indonesia&rsquo;s BPOM 12 to 24. Some of
          those queues are worth joining anyway. ANVISA is slow, and it is also
          the approval much of Latin America will then rely on.
        </p>
      </Reveal>
    </>
  );
}
