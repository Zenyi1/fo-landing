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

const title = "firstocean · the operating system for therapeutics";
const description =
  "The operating system for biotech. firstocean reads the contracts, invoices, protocols and filings a drug company already runs on, builds one live model of how it works, and puts agents on top of it: finance, legal, clinical operations, regulatory and supply chain.";

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

// Every "Book a demo" on the page lands on the form at the foot of it, so
// there is one funnel rather than two competing ones. Calendly is still offered
// from the form's confirmation for anyone who would rather self-schedule.
function BookButton() {
  return (
    <a
      href="#contact"
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--bp-r-sm)] px-7 py-3.5 text-[1.02rem] font-medium text-white transition-colors hover:bg-[var(--bp-blue-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] active:translate-y-[1px]"
      style={{ background: "var(--bp-blue)" }}
    >
      Book a demo <span aria-hidden>→</span>
    </a>
  );
}

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

// Photographs run at full colour, untreated. See public/plates/CREDITS.md for
// provenance.
function Plate({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "var(--bp-wash)", borderRadius: "var(--bp-r-md)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
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
          <Reveal className="relative z-10">
            <h1
              className="text-balance leading-[0.98] tracking-[-0.04em]"
              style={{ fontSize: "min(clamp(2.7rem, 5vw, 4.05rem), 12vh)" }}
            >
              the operating system for biotechs.
            </h1>
            <p
              className="mt-7 max-w-[36rem] text-[1.1rem] leading-relaxed sm:text-[1.22rem]"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              firstocean reads the contracts, invoices, protocols and filings a
              drug company already runs on, builds one live model of how the
              company actually works, and puts agents on top of it. Finance,
              legal, clinical operations, regulatory, supply chain. The
              judgement and the science stay yours.
            </p>
            {/* one call to action in the hero, deliberately */}
            <div className="mt-10">
              <BookButton />
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
        <Reveal>
          <h2
            className="max-w-[20ch] text-balance leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
          >
            Pharma was built for scarcity. It has an abundance problem.
          </h2>
          <div
            className="mt-9 max-w-[62ch] space-y-5 text-[1.08rem] leading-relaxed sm:text-[1.18rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            <p>
              For a century the industry&apos;s constraint was the molecule. Few
              candidates, years between them, each one precious enough to
              justify whatever it took to move it. AI-driven discovery has
              inverted that. Promising compounds now arrive faster than the
              apparatus around them can absorb.
            </p>
            <p>
              That apparatus has not moved. A trial site is still negotiated one
              at a time. A submission is still assembled by hand. The constraint
              has left the bench and settled into the paperwork, and it needs an
              orchestration layer running at the speed discovery now runs at.
            </p>
          </div>
        </Reveal>
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
            Every department, except one.
          </h2>
          <p
            className="mt-7 max-w-[54ch] text-[1.08rem] leading-relaxed sm:text-[1.15rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            This is the whole surface of a clinical-stage biotech that is not
            the science. Open any one to see what sits inside it.
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

      {/* ══ THE END STATE ══════════════════════════════════════════════════ */}
      <Section>
        <Reveal>
          <h2
            className="max-w-[22ch] text-balance leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
          >
            The end state is a company that is only a lab.
          </h2>
          <p
            className="mt-8 max-w-[58ch] text-[1.08rem] leading-relaxed sm:text-[1.18rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            Everything around the science runs itself. The people you hired to
            do research spend the week doing research, and the company is as
            large as its ambition rather than as large as its admin.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <Plate
            src="/plates/lab.jpg"
            alt="An empty laboratory at working scale"
            className="aspect-[8/3] w-full"
            sizes="(min-width: 1240px) 1240px, 100vw"
          />
        </Reveal>
      </Section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════ */}
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
                We will map what your company actually spends its week on, and
                show you what the agents can take over. Thirty minutes, no
                obligation.
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
