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
    q: "Do you train on our data?",
    a: "No. Your documents are used to run your company and nothing else. We do not train models on them, we do not use them to improve anything shared across customers, and we do not sell or share them with anyone. Where a third-party model provider is involved we work under terms that prohibit training on your content. Ask us to delete it and we will.",
    href: { label: "Read the privacy policy", to: "/privacy" },
  },
  {
    q: "How long does it take to start?",
    a: "A day. You send whatever documents you hold and open a channel with us. Your context is structured and the first agents are working on it the day after you hand it over.",
  },
  {
    q: "What do we have to prepare?",
    a: "Nothing. Contracts, invoices and filings in whatever shape they are in. There is no cleanup on your side, no schema to design and no form for anyone to fill in.",
  },
  {
    q: "Do we have to change our systems?",
    a: "No. We read what you already pay for and work in the channel your team already uses. Connecting a system is something we do when it earns its place, not a precondition for starting.",
  },
  {
    q: "How do we know the agents are right?",
    a: "Every output arrives with the document it came from, so a figure can be traced back to the clause and the line that produced it. Where something is genuinely ambiguous the agent stops and gives it to a person rather than guessing. You are reviewing evidence, not taking a number on trust.",
  },
  {
    q: "Does this replace our finance team?",
    a: "At this size there is rarely a team to replace. Finance is usually a fractional CFO, a bookkeeper, and whoever in operations sits closest to the vendor. The agents take the reconciling and the chasing that is currently spread across all three, so the people you do have spend their time deciding instead.",
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
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.15rem] font-medium tracking-[-0.015em] sm:text-[1.32rem]">
                  {item.q}
                </h3>
                <CaretDown
                  aria-hidden
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  style={{ color: "var(--bp-blue)" }}
                />
              </summary>
              <p
                className="max-w-[68ch] pb-8 pr-10 text-[1.02rem] leading-relaxed"
                style={{ color: "var(--bp-ink-muted)" }}
              >
                {item.a}
                {item.href ? (
                  <>
                    {" "}
                    <a
                      href={item.href.to}
                      className="font-medium underline underline-offset-4"
                      style={{ color: "var(--bp-blue)" }}
                    >
                      {item.href.label}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
