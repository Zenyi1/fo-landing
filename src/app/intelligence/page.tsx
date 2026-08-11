import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { TopBar } from "@/components/blueprint/TopBar";
import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { ContactForm } from "@/components/blueprint/ContactForm";
import { DepartmentGrid } from "@/components/blueprint/DepartmentGrid";
import { HeroMorph } from "@/components/blueprint/HeroMorph";
import { LogoMarquee } from "@/components/blueprint/LogoMarquee";
import { OnboardingPath } from "@/components/blueprint/OnboardingPath";
import { Faq } from "@/components/blueprint/Faq";
import { KnowledgeEngine } from "@/components/blueprint/KnowledgeEngine";
import { PillBand, PillColumn } from "@/components/blueprint/PillScatter";
import { TypeCycle } from "@/components/blueprint/TypeCycle";

const title = "firstocean · the operating system for therapeutics";
const description =
  "The operating system for biotech. firstocean is building the intelligence layer for the work around drug discovery";

export const metadata: Metadata = {
  // absolute so the root layout's "%s · firstocean" template doesn't double the suffix
  title: { absolute: title },
  description,
  alternates: { canonical: "/intelligence" },
  openGraph: {
    type: "website",
    url: "/intelligence",
    siteName: "firstocean",
    title,
    description,
    // child openGraph replaces the root's wholesale, so re-declare the share image
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description, images: ["/seo/fo.jpeg"] },
};

/* What the headline cycles through. Each is something the page goes on to
   claim further down, and each is a few words: the line is centred and reflows
   as it types, so lengths are kept close together to stop it swinging. */
const CAPABILITIES = [
  "does the work",
  "chases the vendors",
  "closes the books",
  "files the submission",
  "audits every invoice",
  "tracks the trial spend",
] as const;

/* ── primitives ─────────────────────────────────────────────────────────── */

function Section({
  children,
  wash = false,
  id,
}: {
  children: React.ReactNode;
  wash?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      // scroll-mt clears the sticky nav, so an anchored section lands below it
      // rather than under it
      className="w-full scroll-mt-[92px] border-t px-6 py-[clamp(80px,12vh,152px)] sm:px-10"
      style={{
        borderColor: "var(--bp-hairline)",
        background: wash ? "var(--bp-wash)" : "var(--bp-paper)",
      }}
    >
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

/* ── content ────────────────────────────────────────────────────────────── */

export default function IntelligencePage() {
  return (
    <main
      className="bp-root bp-grain relative w-full"
      style={{ background: "var(--bp-paper)", color: "var(--bp-ink)" }}
    >
      <TopBar />

      {/* ══ HERO ═══════════════════════════════════════════════════════════
          112px is the strip plus the sticky nav's flow height, so the hero
          still fills exactly one viewport under them. */}
      <div className="flex min-h-[calc(100dvh-112px)] flex-col">
        <div className="mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 items-center gap-10 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pt-14">
          {/* above the field: the dots now drift across the whole hero, and the
              headline has to stay readable while they pass behind it */}
          <Reveal className="relative z-10 text-center">
            <h1
              className="leading-[0.98] tracking-[-0.04em]"
              style={{ fontSize: "min(clamp(2.7rem, 5vw, 4.05rem), 12vh)" }}
            >
              <span className="block text-balance">
                <span style={{ color: "var(--bp-blue)" }}>firstocean</span>{" "}
                learns how your biotech operates.
              </span>
              {/* Not text-balance: this line rewrites itself, and balancing
                  would re-break it on almost every keystroke. */}
              <span className="mt-3 block">
                Then it <TypeCycle phrases={CAPABILITIES} />
              </span>
            </h1>
            <p
              className="mx-auto mt-11 max-w-[36rem] text-[1.1rem] leading-relaxed sm:text-[1.22rem]"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              An agent is only as good as what it knows about your company.
              firstocean turns the contracts, filings and trial data you already
              have into a model it can act on.
            </p>
            {/* One call to action, and it sends the reader further down the
                page rather than to the form. "Book a demo" is already in the
                sticky nav, so someone who arrives ready to buy has it in reach
                the whole way down; everyone else needs to see the thing first. */}
            <div className="mt-10">
              <a
                href="#graph"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--bp-r-sm)] px-7 py-3.5 text-[1.02rem] font-medium text-white transition-colors hover:bg-[var(--bp-blue-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] active:translate-y-[1px]"
                style={{ background: "var(--bp-blue)" }}
              >
                How does it work? <span aria-hidden>↓</span>
              </a>
            </div>
          </Reveal>

          {/* No Reveal here: it fades its children in from zero over 0.7s,
              which would swallow the opening drift. The field runs its own
              entrance. Shown from sm up, since only a phone is too narrow. */}
          <div className="relative z-0 hidden sm:block">
            <HeroMorph />
          </div>
        </div>
      </div>

      {/* ══ WHERE WE CAME FROM ═════════════════════════════════════════════ */}
      <LogoMarquee />

      {/* ══ THE PROBLEM ════════════════════════════════════════════════════ */}
      <Section>
        {/* The copy takes the middle track and the bottles take the two
            outside it, so the clearance either side is the grid's rather than
            something measured against the text. The bands hang off this block,
            which is why it is the positioned one. */}
        <div className="relative lg:grid lg:grid-cols-[1fr_minmax(0,42rem)_1fr] lg:gap-10">
          <PillBand edge="top" />
          <PillColumn side="left" />

          <Reveal className="relative z-10">
            <h2
              className="mx-auto max-w-[20ch] text-balance text-center leading-[1.02] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
            >
              Pharma was built for scarcity. It has an abundance problem.
            </h2>
            <div
              className="mx-auto mt-9 max-w-[62ch] space-y-5 text-center text-[1.08rem] leading-relaxed sm:text-[1.18rem]"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              <p>
                For a century the industry&apos;s constraint was the molecule.
                Few candidates, years between them, each one precious enough to
                justify whatever it took to move it. AI-driven discovery has
                inverted that. Promising compounds now arrive faster than the
                apparatus around them can absorb.
              </p>
              <p>
                That apparatus has not moved. A trial site is still negotiated
                one at a time. A submission is still assembled by hand. The
                constraint has left the bench and settled into the paperwork,
                and it needs an orchestration layer running at the speed
                discovery now runs at.
              </p>
            </div>
          </Reveal>

          <PillColumn side="right" />
          <PillBand edge="bottom" />
        </div>
      </Section>

      {/* ══ THE GRAPH ══════════════════════════════════════════════════════
          Not wrapped in Section: it pins to the viewport and so has to own its
          own height and padding. */}
      <KnowledgeEngine />

      {/* ══ THE DEPARTMENTS ════════════════════════════════════════════════ */}
      <Section id="departments">
        <Reveal>
          <h2
            className="max-w-[18ch] text-balance leading-[1.04] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
          >
            We do not touch research. We run the admin around it.
          </h2>
          <p
            className="mt-7 max-w-[54ch] text-[1.08rem] leading-relaxed sm:text-[1.15rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            Everything on this grid except research and discovery is the admin
            shell a biotech has to carry to keep a molecule moving. Open a
            department to see the work inside it.
          </p>
        </Reveal>

        {/* no Reveal wrapper: the grid runs its own cell-by-cell build */}
        <div className="mt-12">
          <DepartmentGrid />
        </div>
      </Section>

      {/* ══ ONBOARDING ═════════════════════════════════════════════════ */}
      <Section id="how" wash>
        <OnboardingPath />
      </Section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════
          On paper, not wash: the section above it is washed, and two washed
          bands in a row read as one long surface. */}
      <Section id="faq">
        <Faq />
      </Section>

      {/* ══ CTA ════════════════════════════════════════════════════════════
          The page's one dark surface. The plate is a calm horizon picked for
          evenness rather than drama: the white copy sits over its left third,
          so the brightest patch there is what governs the choice. It is a light
          photograph, so the scrim runs at 50% to hold the body copy at 5.4:1. */}
      <section id="contact" className="relative isolate scroll-mt-[92px]">
        <Image
          src="/plates/ocean.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />

        <div className="mx-auto w-full max-w-[1240px] px-6 py-[clamp(72px,10vh,120px)] sm:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2
                className="max-w-[16ch] text-balance leading-[1.04] tracking-[-0.035em] text-white"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
              >
                Give the week back to the science.
              </h2>
              <p className="mt-6 max-w-[42ch] text-[1.08rem] leading-relaxed text-white/80">
                we’ll map one recurring process and tell you where the evidence
                is already strong enough for an agent to act.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <BlueprintFooter backedBy />
    </main>
  );
}
