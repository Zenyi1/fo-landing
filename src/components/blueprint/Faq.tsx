import { Plus } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/Reveal";

// Native <details>, so the accordion opens with no JavaScript, is keyboard
// operable and announces its own state. The first one is open, because an FAQ
// that opens fully closed reads as a wall of hairlines.
//
// Every answer here restates something the page has already committed to
// further up. Nothing is asserted for the first time in the FAQ.
const QUESTIONS = [
  {
    q: "what is firstocean?",
    a: "firstocean is building the operating system for everything a biotech does other than the science. it connects the company’s operating context, then gives agents the ability to run repeatable work with evidence and human oversight.",
  },
  {
    q: "what does firstocean look like?",
    a: "your team does not need another dashboard. there is no new interface to adopt — it is an agentic system that works in the channels and systems you already run, so the work lands where your team already is.",
  },
  {
    q: "does firstocean replace our team?",
    a: "no. the system is designed to remove repetitive checking, chasing, reconciliation, and preparation — not judgement, accountability, or scientific direction.",
  },
  {
    q: "how do agents avoid making things up?",
    a: "important outputs remain tied to the evidence and rules that produced them. when the record is incomplete or conflicting, the agent surfaces the uncertainty and asks for a decision instead of guessing.",
  },
  {
    q: "do we need to replace our existing systems?",
    a: "no. firstocean is intended to become the operating layer across the systems a company already uses. a new integration is justified only when it makes the loop more complete or removes a real manual step.",
  },
  {
    q: "what happens as the company changes?",
    a: "the operating model changes with it. new programs, vendors, rules, exceptions, and workflows become context for the next capability rather than another isolated implementation.",
  },
  {
    q: "why start with operations instead of discovery?",
    a: "because scientists should spend their time on the science. the work around it is essential, recurring, and increasingly suited to systems that can connect evidence, follow rules, and escalate judgement.",
  },
];

export function Faq() {
  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <Reveal>
        <p
          className="text-center text-[0.72rem] font-medium uppercase tracking-[0.14em]"
          style={{ color: "var(--bp-blue)" }}
        >
          FAQ
        </p>
        <h2
          className="mt-5 text-balance text-center leading-[1.04] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.25rem)" }}
        >
          Common questions
        </h2>
      </Reveal>

      <Reveal delay={90}>
        <ul className="mt-[clamp(40px,6vh,72px)] space-y-3">
          {QUESTIONS.map((item, i) => (
            <li key={item.q}>
              {/* A card each, on the section wash, rather than rows divided by
                  hairlines: the separation comes from the gap between them, so
                  nothing needs a rule. */}
              <details
                open={i === 0}
                className="group rounded-[var(--bp-r-md)] px-6 py-1 sm:px-8"
                style={{ background: "var(--bp-paper)" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] [&::-webkit-details-marker]:hidden">
                  {/* lowercase in CSS, so the accessible name keeps its
                      capitals */}
                  <h3 className="text-[1.08rem] font-medium lowercase tracking-[-0.015em] sm:text-[1.24rem]">
                    {item.q}
                  </h3>
                  {/* the plus turns into a cross by rotating an eighth turn */}
                  <Plus
                    aria-hidden
                    weight="bold"
                    className="h-[1.15rem] w-[1.15rem] shrink-0 transition-transform duration-200 group-open:rotate-45"
                    style={{ color: "var(--bp-ink)" }}
                  />
                </summary>
                <p
                  className="max-w-[68ch] pb-7 pr-8 text-[1.02rem] leading-relaxed"
                  style={{ color: "var(--bp-ink-muted)" }}
                >
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
