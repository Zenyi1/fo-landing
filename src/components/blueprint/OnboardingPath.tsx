import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  ChatsCircle,
  EnvelopeSimple,
  Files,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/Reveal";

// Five steps, and the fifth deliberately has no end state: the run reads as
// four short moves and then an open one, which is the shape of the offer.
type Step = { icon: Icon; title: string; body: string };

// Bodies are held to roughly ten words. At five across, each column is about
// 200px wide, and anything longer turns the row into five tall paragraphs.
const STEPS: Step[] = [
  {
    icon: EnvelopeSimple,
    title: "First touchpoint",
    body: "A form, an email, or a message on LinkedIn.",
  },
  {
    icon: Files,
    title: "Your documents",
    body: "Contracts, invoices, filings. Whatever shape they are in.",
  },
  {
    icon: ChatsCircle,
    title: "A shared channel",
    body: "Slack, Teams or email. Where your team already works.",
  },
  {
    icon: Lightning,
    title: "Live within a day",
    body: "Your context is structured and the agents start work.",
  },
  {
    icon: ArrowsClockwise,
    title: "And it keeps going",
    body: "New systems, new departments, our engineers on site.",
  },
];

export function OnboardingPath() {
  return (
    <>
      <Reveal>
        <h2
          className="max-w-[20ch] text-balance leading-[1.04] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
        >
          From first message to running agents in a day.
        </h2>
        <p
          className="mt-7 max-w-[56ch] text-[1.08rem] leading-relaxed sm:text-[1.18rem]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          You hand over documents and a channel. Everything after that is our
          side of the line, and the last step never closes.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div
          className="rounded-[var(--bp-r-md)] border p-6 sm:p-9"
          style={{
            borderColor: "var(--bp-hairline)",
            background: "var(--bp-paper)",
          }}
        >
          {/* One rail, drawn once across the whole row rather than as a
              segment per step, so the run cannot break between stages — five
              nodes on a single line instead of five columns that happen to sit
              side by side. It is offset 22px, half the node's height, to pass
              through their centres, and starts at the first node rather than
              at the card edge.

              The right end fades out instead of stopping: step five has no end
              state, and the line should not draw one for it. */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[22px] right-0 top-[22px] hidden h-px md:block"
              style={{
                // a fixed 72px taper, not a percentage: a percentage lands
                // before the fifth node at narrower widths and fades the line
                // out underneath it
                background:
                  "linear-gradient(to right, var(--bp-blue-tint) 0%, var(--bp-blue-tint) calc(100% - 72px), transparent 100%)",
              }}
            />

            {/* five across from md up and never two rows: the run of steps is
                the point, and a 3+2 wrap reads as two separate processes */}
            <ol className="relative grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-5 lg:gap-x-8">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--bp-r-sm)]"
                    style={{
                      background:
                        "color-mix(in srgb, var(--bp-blue) 12%, #fff)",
                      color: "var(--bp-blue)",
                    }}
                  >
                    <step.icon className="h-5 w-5" weight="regular" />
                  </span>

                  <p
                    className="font-ledger mt-5 text-[0.8rem]"
                    style={{ color: "var(--bp-blue)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 text-[1.05rem] font-medium tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[0.96rem] leading-relaxed"
                    style={{ color: "var(--bp-ink-muted)" }}
                  >
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </>
  );
}
