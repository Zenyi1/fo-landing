import { Reveal } from "@/components/Reveal";

/* Five onboarding steps, all of them on screen at once. No carousel, no
   reveal, no timer: the section exists to answer what happens after you say
   yes, how fast it starts, and how much of it lands on your team, and none of
   those can be answered by something the reader has to wait for.

   No state, so this is a Server Component. No icons, no eyebrow and no step
   numbers either: the icons added a 44px tile to every column, and the other
   two were the only mono type left in the section. The rail and the reading
   order carry the sequence without a printed number on each step.

   Bodies are held between 77 and 86 characters. At five across each column is
   about 200px, so that is three lines each and the row reads as one band
   rather than as five columns of different depth. */
const STEPS = [
  {
    title: "Choose one workflow",
    body: "We map the steps, owners, systems, and exceptions with the team that runs it.",
  },
  {
    title: "Build the knowledge layer",
    body: "firstocean learns the contracts, records, rules, and context the workflow depends on.",
  },
  {
    title: "Connect your team",
    body: "We work with the people who run it and integrate with the systems they already use.",
  },
  {
    title: "Go live with oversight",
    body: "Agents run the workflow while your team reviews decisions, exceptions, and actions.",
  },
  {
    title: "Improve and expand",
    body: "We refine it together, then add new work as firstocean learns how the company operates.",
  },
];

export function OnboardingPath() {
  return (
    <>
      <Reveal>
        <h2
          className="leading-[1.06] tracking-[-0.035em]"
          style={{ fontSize: "clamp(1.85rem, 4.4vw, 3rem)" }}
        >
          <span className="block">Start with one workflow.</span>
          <span className="block">
            Go live in as little as{" "}
            <span style={{ color: "var(--bp-blue)" }}>a week</span>.
          </span>
        </h2>
        <p
          className="mt-6 max-w-[58ch] text-[1.06rem] leading-relaxed sm:text-[1.14rem]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          We learn how the work runs today, build the first workflow with your
          team, and improve it together as firstocean takes on more.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-14">
        {/* One rail across the whole row rather than a segment per step, so
            the run cannot break between them, sitting on the centre of the
            nodes. The line is faint and a brighter segment travels it; the
            overflow-hidden is what stops that segment escaping either end.
            Hidden below md, where the steps stack and a horizontal rule would
            mean nothing. */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-1 right-0 top-[4px] hidden h-0.5 overflow-hidden rounded-full md:block"
            style={{
              background: "color-mix(in srgb, var(--bp-blue) 18%, transparent)",
            }}
          >
            <div className="bp-rail-lit h-full" />
          </div>

          {/* Five across from md up and never two rows: the run is the point,
              and a 3+2 wrap reads as two separate processes. */}
          <ol className="relative grid grid-cols-1 gap-x-7 gap-y-11 md:grid-cols-5 lg:gap-x-9">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                {/* The light needs 1.3 rail widths to cross, so a node at
                    fraction f of the rail is reached at ((f + 0.115) / 1.3) of
                    the 60s cycle. The keyframe peaks 3% in, which is the 1.8
                    subtracted here. */}
                <span
                  aria-hidden
                  className="bp-rail-node block h-2.5 w-2.5 origin-center rounded-full"
                  style={{
                    background: "var(--bp-blue)",
                    animationDelay: `${(((i / STEPS.length + 0.115) / 1.3) * 60 - 1.8).toFixed(2)}s`,
                  }}
                />
                <h3 className="mt-5 text-[1.02rem] font-medium tracking-[-0.012em]">
                  {step.title}
                </h3>
                <p
                  className="mt-2.5 text-[0.94rem] leading-relaxed"
                  style={{ color: "var(--bp-ink-muted)" }}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </>
  );
}
