import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { ContactForm } from "@/components/ContactForm";

/* One page. The identity carries it: the gradient is the ground, the mark
   breathes in the first viewport, and everything written fits in a handful of
   quiet lines before the form. */

const LINES = [
  "We register and commercialize approved medicines beyond their core markets.",
  "Latin America, the Middle East, Southeast Asia.",
  "We hold the licence, run the operation, and are paid from what the medicine earns.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* first viewport — the instrument */}
      <header className="relative flex min-h-svh flex-col p-6 md:p-10">
        <Wordmark className="w-44 text-cream md:w-52" />

        <div className="flex flex-1 items-center justify-center py-10">
          <Mark
            breathe
            className="w-[min(84vw,118vh)] text-cream md:w-[min(58vw,118vh)]"
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h1 className="max-w-[24ch] text-[clamp(1.45rem,2.6vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.01em] text-cream">
            The commercial operation you would otherwise have to build.
          </h1>
          <a
            href="#contact"
            className="w-fit shrink-0 border-b border-cream/70 pb-1 text-[0.9rem] uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* the few quiet lines, then the form — on the deep end of the gradient */}
      <main className="mx-auto w-full max-w-[52rem] px-6 pb-16 pt-28 md:px-10 md:pt-40">
        <div className="space-y-7">
          {LINES.map((line) => (
            <p
              key={line}
              className="text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.55] text-cream"
            >
              {line}
            </p>
          ))}
        </div>

        <section id="contact" className="scroll-mt-16 pt-28 md:pt-36">
          <ContactForm />
        </section>

        <footer className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 pt-28 text-[0.8rem] leading-[1.6] text-cream md:pt-36">
          <p>Backed by Entrepreneurs First and Transpose Platform.</p>
          <p>© {year} firstocean</p>
        </footer>
      </main>
    </>
  );
}
