import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

/* The hero follows the brand guidelines' "Hero Website" application: glass
   pill nav on the gradient, grotesk headline with a Feature-Display-italic
   turn, the photograph masked into the symbol's circle-and-crescent, and the
   tagline pinned small at the bottom. */

/* Below the hero the page leaves the gradient: sections sit on the brand
   kit's secondary colors (Cream, 100 Cream, 200 Cream, Black) with black
   ink, laid out like the guidelines' own pages — label left, content right.
   The serif italic voice belongs to the hero alone. */

const SERVICES = [
  "You submit once. Our platform prepares every market's filing from your existing dossier, in parallel.",
  "We register the medicine in each territory and become the licence holder.",
  "We run the commercial operation on the ground.",
  "We are paid out of what the medicine earns. Nothing lands on your team."
];

const PLATFORM = [
  {
    title: "One dossier, every filing",
    body: "The platform reads the dossier your medicine was approved with and assembles each market's submission from it — formats, modules, translations — in parallel rather than one country at a time."
  },
  {
    title: "Regulation, encoded",
    body: "Every territory's requirements, timelines and correspondence live in the system, not in institutional memory. AI drafts; our regulatory team signs."
  },
  {
    title: "The long tail, automated",
    body: "Renewals, variations, safety reporting — the standing work that usually needs a local office — runs through the platform."
  }
];

const MARKETS = ["Latin America", "Middle East & North Africa", "Southeast Asia"];

const PARTNERING = [
  {
    q: "Who holds the licence?",
    a: "We do. firstocean becomes the marketing-authorisation holder in each territory and carries everything that entails. The medicine, the brand and the IP stay yours."
  },
  {
    q: "What do you need from us?",
    a: "The dossier you already have, and someone to answer the questions only an originator can. The platform does the rest."
  },
  {
    q: "How is firstocean paid?",
    a: "Out of what the medicine earns in each territory. Our incentive is the same as yours: revenue from markets you would not otherwise enter."
  },
  {
    q: "What happens to our core markets?",
    a: "Nothing. You stay focused on the US, Europe and Japan; we carry the rest."
  }
];

/* The hero shape replayed as flat tonal background art, the way the
   guidelines' Backgrounds page plays with elements from the symbol. */
function Shapes({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1550 1000"
      fill="currentColor"
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      <circle cx="500" cy="500" r="500" />
      <path d="M875 20 A480 480 0 0 1 875 980 Z" />
      <path d="M1272.5 29.6 A537.5 537.5 0 0 1 1272.5 970.4 Z" />
    </svg>
  );
}

function Section({
  id,
  label,
  className,
  art,
  children
}: {
  id: string;
  label: string;
  className: string;
  art?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative overflow-hidden scroll-mt-0 ${className}`}>
      {art}
      <div className="relative mx-auto grid w-full max-w-[80rem] gap-8 px-6 py-20 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 md:px-10 md:py-28">
        <h2 className="text-[0.8rem] uppercase tracking-[0.14em] opacity-70">
          {label}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

const pill =
  "rounded-full border border-cream/25 bg-cream/10 backdrop-blur-md text-cream";

/* The hero graphic, as constructed in the guidelines: a circle, a true half
   circle whose flat edge sits inside the circle, and a quarter-circle segment
   whose flat edge sits inside the half circle. Because each flat edge
   overlaps the previous shape, the three read as one connected form, and the
   small wedge notches appear naturally where the arcs part ways. All edges
   are vector-crisp; the photograph is clipped inside, placed exactly as in
   the brand deck. */
function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1550 1000"
      role="img"
      aria-label="A clinician in a white coat reading the label of a prescription medicine"
      className={className}
    >
      <defs>
        <clipPath id="fo-hero-clip">
          <circle cx="500" cy="500" r="500" />
          <path d="M875 20 A480 480 0 0 1 875 980 Z" />
          <path d="M1272.5 29.6 A537.5 537.5 0 0 1 1272.5 970.4 Z" />
        </clipPath>
      </defs>
      <image
        href="/brand/hero.jpg"
        x="-32"
        y="-187"
        width="1788"
        height="1191"
        preserveAspectRatio="none"
        clipPath="url(#fo-hero-clip)"
      />
    </svg>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* first viewport — the guidelines' hero */}
      <header className="relative flex min-h-svh flex-col px-6 pb-6 pt-4 md:px-10 md:pb-10 md:pt-5">
        <div className="relative flex items-center justify-between gap-4">
          <Wordmark className="w-40 shrink-0 text-cream md:w-44" />
          <nav
            aria-label="Site"
            className={`${pill} absolute left-1/2 hidden -translate-x-1/2 items-center p-1 md:flex`}
          >
            <a
              href="#about"
              className="rounded-full px-5 py-2 text-[0.85rem] transition-colors hover:bg-cream/15"
            >
              About us
            </a>
            <a
              href="#services"
              className="rounded-full bg-cream/20 px-5 py-2 text-[0.85rem] transition-colors hover:bg-cream/25"
            >
              Services
            </a>
            <a
              href="#markets"
              className="rounded-full px-5 py-2 text-[0.85rem] transition-colors hover:bg-cream/15"
            >
              Markets
            </a>
          </nav>
          <a
            href="#contact"
            className={`${pill} px-6 py-2.5 text-[0.85rem] transition-colors hover:bg-cream/20`}
          >
            Contact
          </a>
        </div>

        <div className="grid flex-1 items-center gap-10 py-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-2">
          <h1 className="mx-auto max-w-[18ch] text-center text-[clamp(1.9rem,2.9vw,2.6rem)] leading-[1.16] tracking-[-0.01em] text-cream md:mx-0 md:max-w-[19ch] md:text-left">
            Automate the entry of therapeutics{" "}
            <em className="font-serif text-[1.06em] italic">
              into new markets
            </em>
          </h1>
          <HeroVisual className="mx-auto w-[min(92vw,24rem)] md:w-[min(53vw,100svh)] md:justify-self-end" />
        </div>
      </header>

      <main>
        <Section id="about" label="About us" className="bg-[#e4e2df] text-[#1c1c1a]">
          <Reveal>
            <p className="max-w-[54rem] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6]">
              Bringing a new medicine to market takes more than a decade and
              billions of dollars. Most are only ever launched in the US,
              Europe and Japan. By the time their patents expire, up to a third
              of their value has gone unclaimed.
            </p>
            <p className="mt-10 max-w-[46rem] text-[clamp(1.5rem,2.7vw,2.2rem)] leading-[1.3] tracking-[-0.01em]">
              Our platform lets originators launch in a dozen markets at once,
              from a single submission.
            </p>
          </Reveal>
        </Section>

        <Section id="services" label="Services" className="bg-[#d8d6d3] text-[#1c1c1a]">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {SERVICES.map((line, i) => (
              <Reveal key={line} delay={i * 90}>
                <p className="text-[0.8rem] tracking-[0.14em] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.55]">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="platform" label="Platform" className="bg-[#1c1c1a] text-cream">
          <Reveal>
            <Mark breathe className="w-16 text-cream" />
            <p className="mt-10 max-w-[46rem] text-[clamp(1.5rem,2.7vw,2.2rem)] leading-[1.3] tracking-[-0.01em]">
              Where our peers build offices, we built software.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {PLATFORM.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <h3 className="text-[1.05rem] font-medium leading-[1.4]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.6] text-cream/80">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="markets"
          label="Markets"
          className="bg-[#afaba5] text-[#1c1c1a]"
          art={
            <Shapes className="-right-[14rem] top-1/2 w-[64rem] -translate-y-1/2 text-[#1c1c1a] opacity-[0.05]" />
          }
        >
          <ul>
            {MARKETS.map((m, i) => (
              <li
                key={m}
                className="border-t border-[#1c1c1a]/25 py-5 first:border-t-0 first:pt-0"
              >
                <Reveal delay={i * 90}>
                  <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2]">
                    {m}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-[46rem] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6]">
              The markets where approved medicines arrive late, or never.
            </p>
          </Reveal>
        </Section>

        <Section id="partnering" label="Partnering" className="bg-[#e4e2df] text-[#1c1c1a]">
          <div className="max-w-[54rem]">
            {PARTNERING.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="border-t border-[#1c1c1a]/20 py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8">
                  <h3 className="text-[1.05rem] font-medium leading-[1.4]">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-[1.05rem] leading-[1.6] md:mt-0">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          label="Contact"
          className="bg-[#1c1c1a] text-cream"
          art={
            <Shapes className="-bottom-[16rem] -left-[18rem] w-[72rem] rotate-180 text-cream opacity-[0.04]" />
          }
        >
          <Reveal>
            <p className="mb-10 text-[clamp(1.5rem,2.7vw,2.2rem)] leading-[1.3] tracking-[-0.01em]">
              Talk to us about your drug.
            </p>
            <ContactForm />
          </Reveal>
          <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 text-[0.8rem] leading-[1.6] text-cream/80">
            <p>Backed by Entrepreneurs First and Transpose Platform.</p>
            <p>© {year} firstocean</p>
          </footer>
        </Section>
      </main>
    </>
  );
}
