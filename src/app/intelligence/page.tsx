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

/* ── primitives ─────────────────────────────────────────────────────────── */

function Section({
  children,
  wash = false,
  id,
  // off where the section above already ends in space rather than in a rule
  rule = true,
}: {
  children: React.ReactNode;
  wash?: boolean;
  id?: string;
  rule?: boolean;
}) {
  return (
    <section
      id={id}
      // scroll-mt clears the sticky nav, so an anchored section lands below it
      // rather than under it
      className={`w-full scroll-mt-[92px] px-6 py-[clamp(80px,12vh,152px)] sm:px-10 ${rule ? "border-t" : ""}`}
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
          The field runs full-bleed behind the copy. It is dropped to a third
          of its strength there and the copy sits on z-10, because the shapes
          gather around the centre of their own field, which is where centred
          copy is: they pass behind the headline and have to lose that contest.

          The strip and the nav take 112px ABOVE this block, so what shows of
          the reel on load is (cut - 112), not the cut. At 255 that is 143px:
          the reel's own top padding, the line of copy, and the full row of
          marks, with a little underneath. Enough to see who they are, not so
          much that the reel reads as the thing being sold. */}
      <div className="relative flex min-h-[calc(100dvh-255px)] flex-col">
        <HeroMorph variant="background" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 items-center justify-center px-6 pb-16 pt-10 sm:px-10">
          <Reveal className="text-center">
            <h1
              className="text-balance leading-[0.98] tracking-[-0.04em]"
              style={{ fontSize: "min(clamp(2.7rem, 5.4vw, 4.4rem), 13vh)" }}
            >
              The operating system for biotech work outside the lab.
            </h1>
            {/* Full-strength ink, not the muted body tone: this sits over the
                dot field, and a softened grey would be the one thing on the
                page competing with the backdrop instead of sitting on top of
                it. Only the wordmark takes the accent. */}
            <p
              className="mx-auto mt-9 max-w-[40rem] text-[1.1rem] leading-relaxed sm:text-[1.24rem]"
              style={{ color: "var(--bp-ink)" }}
            >
              <span style={{ color: "var(--bp-blue)" }}>firstocean</span> learns
              your contracts, filings, trial data, and SOPs, then runs the
              operational work that slows your team down.
            </p>
            {/* Uppercased in CSS rather than in the text, so the accessible
                name stays "book demo" and is not spelled out letter by letter.
                The dot is decorative: it is a sign of life, not a status. */}
            <div className="mt-11">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-full px-8 py-4 text-[0.86rem] font-medium uppercase tracking-[0.09em] text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-ink)] active:translate-y-[1px]"
                style={{ background: "var(--bp-ink)" }}
              >
                <span aria-hidden className="bp-dot" />
                book demo
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══ WHERE WE CAME FROM ═════════════════════════════════════════════ */}
      <LogoMarquee />

      {/* ══ THE PROBLEM ════════════════════════════════════════════════════ */}
      <Section rule={false}>
        {/* The copy takes the middle track and the bottles take the two
            outside it, so the clearance either side is the grid's rather than
            something measured against the text. The bands hang off this block,
            which is why it is the positioned one. */}
        <div className="relative lg:grid lg:grid-cols-[1fr_minmax(0,42rem)_1fr] lg:gap-10">
          <PillBand edge="top" />
          <PillColumn side="left" />

          <Reveal className="relative z-10">
            {/* A sentence per line, held there rather than left to the
                balancer. No max-width and no text-balance: both exist to
                choose the break points, and the break points are decided here.

                The size is solved for the longer of the two lines, at 30
                characters. Below lg the container is the viewport less its
                padding, so the vw term governs; from lg up it is the grid's
                42rem middle track, so the 2.5rem cap does. Both leave the line
                short of the edge, which is why it never wraps and never
                overflows on the way down to a phone. */}
            <h2
              className="mx-auto text-center leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.05rem, 5.3vw, 2.5rem)" }}
            >
              <span className="block">Pharma was built for scarcity.</span>
              <span className="block">It has an abundance problem.</span>
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
      <Section id="faq" wash>
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
