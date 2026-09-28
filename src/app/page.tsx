import { Wordmark } from "@/components/brand/Wordmark";
import { ContactForm } from "@/components/ContactForm";

/* The hero follows the brand guidelines' "Hero Website" application: glass
   pill nav on the gradient, grotesk headline with a Feature-Display-italic
   turn, the photograph masked into the symbol's circle-and-crescent, and the
   tagline pinned small at the bottom. */

const ABOUT = [
  "Bringing a new medicine to market takes more than a decade and billions of dollars. Most are only ever launched in the US, Europe and Japan. By the time their patents expire, up to a third of their value has gone unclaimed.",
  "Our platform lets originators launch in a dozen markets at once, from a single submission."
];

const SERVICES = [
  "We register the medicine and become the licence holder in each territory.",
  "We run the commercial operation on the ground.",
  "We are paid out of what the medicine earns."
];

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
              href="#footer"
              className="rounded-full px-5 py-2 text-[0.85rem] transition-colors hover:bg-cream/15"
            >
              Resources
            </a>
          </nav>
          <a
            href="#contact"
            className={`${pill} px-6 py-2.5 text-[0.85rem] transition-colors hover:bg-cream/20`}
          >
            Contact
          </a>
        </div>

        <div className="grid flex-1 items-center gap-10 py-8 md:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] md:gap-2">
          <h1 className="mx-auto max-w-[18ch] text-center text-[clamp(1.9rem,2.9vw,2.6rem)] leading-[1.16] tracking-[-0.01em] text-cream md:mx-0 md:max-w-[15ch] md:text-left">
            Automate the entry of therapeutics{" "}
            <em className="font-serif text-[1.06em] italic">
              into new markets
            </em>
          </h1>
          <HeroVisual className="mx-auto w-[min(92vw,24rem)] md:w-[min(53vw,100svh)] md:justify-self-end" />
        </div>
      </header>

      {/* the quiet lines, then the form — on the deep end of the gradient */}
      <main className="mx-auto w-full max-w-[52rem] px-6 pb-16 pt-28 md:px-10 md:pt-40">
        <section id="about" className="scroll-mt-16">
          <h2 className="text-[0.8rem] uppercase tracking-[0.14em] text-cream/80">
            About us
          </h2>
          <div className="mt-7 space-y-7">
            {ABOUT.map((line) => (
              <p
                key={line}
                className="text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.55] text-cream"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-16 pt-28 md:pt-36">
          <h2 className="text-[0.8rem] uppercase tracking-[0.14em] text-cream/80">
            Services
          </h2>
          <div className="mt-7 space-y-7">
            {SERVICES.map((line) => (
              <p
                key={line}
                className="text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.55] text-cream"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 pt-28 md:pt-36">
          <h2 className="text-[0.8rem] uppercase tracking-[0.14em] text-cream/80">
            Contact
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </section>

        <footer id="footer" className="scroll-mt-16 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 pt-28 text-[0.8rem] leading-[1.6] text-cream md:pt-36">
          <p>Backed by Entrepreneurs First and Transpose Platform.</p>
          <p>© {year} firstocean</p>
        </footer>
      </main>
    </>
  );
}
