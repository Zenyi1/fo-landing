"use client";

import { useEffect, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  ArrowsOutCardinal,
  Gauge,
  Lightning,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/Reveal";

/* Five steps, one open at a time, advancing on their own and looping. The run
   is the point — a loop that is chosen, mapped, made visible, run, and then
   widened — so the steps stay side by side and the reader watches the open one
   move along them rather than reading five columns at once.

   The bodies are far longer than a five-across grid can hold, which is why the
   closed steps give their width to the open one instead of each keeping a
   fifth of the row. */
type Step = { icon: Icon; title: string; body: string };

const STEPS: Step[] = [
  {
    // the loop itself, not the act of choosing it: the icon has to say what a
    // reader is being asked to pick
    icon: ArrowsClockwise,
    title: "choose a recurring loop",
    body: "start with a real operating cycle: a commitment becomes work, work creates evidence, evidence drives a decision, and the decision creates the next action.",
  },
  {
    // dependencies and exceptions, so a branching structure rather than a map
    icon: TreeStructure,
    title: "map how it actually works",
    body: "firstocean identifies the systems, people, rules, dependencies, and exceptions that shape the loop in practice",
  },
  {
    icon: Gauge,
    title: "make the state of the work visible",
    body: "the operating model shows what is known, what is missing, what changed, and what needs attention. each conclusion remains traceable to the underlying evidence.",
  },
  {
    icon: Lightning,
    title: "run the repeatable parts",
    body: "agents handle the checking, reconciliation, preparation, and follow-up that can be performed against clear rules.",
  },
  {
    icon: ArrowsOutCardinal,
    title: "close the loop and expand",
    body: "firstocean comes back to the team with new capabilities shaped by what the company has learned.",
  },
];

// One hold per step, and the bar under the rail is the same six seconds drawn
// out, so what the reader sees filling is the thing that moves the rail on.
const CYCLE_MS = 6000;

export function OnboardingPath() {
  const [active, setActive] = useState(0);

  // Nothing pauses this: the rail sits mid-page, so a pointer resting anywhere
  // over it while the reader scrolls would hold it still and it would look
  // broken rather than paused.
  useEffect(() => {
    // no auto-advance where motion is unwelcome: the steps still open on click,
    // so nothing is unreachable
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setActive((s) => (s + 1) % STEPS.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [active]);

  return (
    <>
      <Reveal>
        <h2
          className="max-w-[20ch] text-balance leading-[1.04] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
        >
          {/* the accent on one word, the same way the hero lifts "firstocean":
              the page holds one highlight colour and uses it sparingly */}
          a system that grows{" "}
          <span style={{ color: "var(--bp-blue)" }}>alongside</span> your
          team
        </h2>
        <p
          className="mt-7 max-w-[56ch] text-[1.08rem] leading-relaxed sm:text-[1.18rem]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          start with one operating loop. build towards the whole company
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
          {/* Stacked and opening downward on a phone, side by side and opening
              sideways from lg up. Both are the same markup keyed off
              data-active; the widths and the clipping are in globals.css,
              since a flex-basis cannot be animated from an inline style. */}
          <ol className="bp-rail flex flex-col gap-2 lg:flex-row lg:gap-3">
            {STEPS.map((step, i) => {
              const open = i === active;
              return (
                <li
                  key={step.title}
                  data-active={open || undefined}
                  className="rounded-[var(--bp-r-sm)] border p-4 transition-colors duration-500"
                  style={{
                    borderColor: open
                      ? "var(--bp-blue-tint)"
                      : "var(--bp-hairline)",
                    background: open
                      ? "color-mix(in srgb, var(--bp-blue) 4%, #fff)"
                      : "var(--bp-paper)",
                  }}
                >
                  {/* the whole head is the control, so a closed step on the
                      rail — which is only its icon — is the thing you click.
                      Spans rather than a heading and a paragraph: a button may
                      only hold phrasing content. */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 text-left lg:flex-col lg:items-start lg:gap-5"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--bp-r-sm)] transition-colors duration-500"
                      style={{
                        background: open
                          ? "var(--bp-blue)"
                          : "color-mix(in srgb, var(--bp-blue) 12%, #fff)",
                        color: open ? "#ffffff" : "var(--bp-blue)",
                      }}
                    >
                      <step.icon className="h-5 w-5" weight="regular" />
                    </span>

                    <span className="bp-rail-meta block text-[1.05rem] font-medium tracking-[-0.01em]">
                      {step.title}
                    </span>
                  </button>

                  {/* Fixed width once it is on the rail, so the copy is
                      uncovered by the step opening rather than rewrapped on
                      every frame of it. */}
                  <p
                    className="bp-rail-body mt-3 text-[0.96rem] leading-relaxed lg:mt-5 lg:w-[25rem] xl:w-[40rem]"
                    style={{ color: "var(--bp-ink-muted)" }}
                  >
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* The hold, drawn. It is keyed on the step, so moving on remounts it
              and the fill starts again from nothing — including on the wrap
              from the fifth step back to the first. Hidden rather than left
              sitting empty where motion is unwelcome, since nothing is
              advancing there for it to measure. */}
          <div
            aria-hidden
            className="mt-8 h-0.5 w-full overflow-hidden motion-reduce:hidden"
            style={{ background: "var(--bp-hairline)" }}
          >
            <div
              key={active}
              className="bp-rail-progress h-full w-full"
              style={{
                background: "var(--bp-blue)",
                animationDuration: `${CYCLE_MS}ms`,
              }}
            />
          </div>
        </div>
      </Reveal>
    </>
  );
}
