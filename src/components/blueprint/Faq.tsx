import { CaretDown } from "@phosphor-icons/react/dist/ssr";

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
    q: "why does this need to exist now?",
    a: "the pace of discovery is increasing, but the coordination layer around discovery is still fragmented. more programs and more external partners create more operating work without creating a system that can see how the pieces fit together.",
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
        <div
          className="mt-[clamp(40px,6vh,72px)] border-t"
          style={{ borderColor: "var(--bp-hairline)" }}
        >
          {QUESTIONS.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group border-b"
              style={{ borderColor: "var(--bp-hairline)" }}
            >
              {/* The caret is taken out of the flow and pinned right, so the
                  question can sit optically centred in the row instead of being
                  pushed off-centre by the width of an icon. */}
              <summary className="relative cursor-pointer list-none py-7 pr-10 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.15rem] font-medium tracking-[-0.015em] sm:text-[1.32rem]">
                  {item.q}
                </h3>
                <CaretDown
                  aria-hidden
                  className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform duration-200 group-open:-translate-y-1/2 group-open:rotate-180"
                  style={{ color: "var(--bp-blue)" }}
                />
              </summary>
              {/* Narrower than the left-aligned version was: centred prose has
                  no straight edge to return to, so a shorter line matters more. */}
              <p
                className="mx-auto max-w-[56ch] pb-8 text-center text-[1.02rem] leading-relaxed"
                style={{ color: "var(--bp-ink-muted)" }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
