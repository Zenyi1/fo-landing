import { Mark } from "@/components/brand/Mark";
import { ContactForm } from "@/components/ContactForm";

const LINES = [
  "Bringing a new medicine to market takes more than a decade and billions of dollars. Most are only ever launched in the US, Europe and Japan. By the time their patents expire, up to a third of their value has gone unclaimed.",
  "Our platform lets originators launch in a dozen markets at once, from a single submission.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="hero-ground relative min-h-svh overflow-hidden">
        <Mark breathe className="hero-mark fo-once" />
        <div className="relative z-10 flex min-h-svh flex-col justify-center px-6 py-8 md:px-14 md:py-12">
          <p className="absolute top-8 left-6 text-[1.35rem] leading-none tracking-[-0.03em] text-cream md:top-12 md:left-14 md:text-[1.65rem]">
            Firstocean
          </p>
          <h1 className="max-w-[8.2em] text-[clamp(2.65rem,11.2vw,3.5rem)] font-normal leading-[0.96] tracking-[-0.035em] text-cream md:max-w-[12em] md:text-[clamp(3.8rem,5.5vw,5.5rem)]">
            <span className="md:hidden">
              Automate
              <br />
              the entry of
              <br />
              <span className="font-display">therapeutics</span>
              <br />
              into <span className="font-display">markets</span>
            </span>
            <span className="hidden md:inline">
              Automate the entry of
              <br />
              <span className="font-display">therapeutics</span> into{" "}
              <span className="font-display">markets</span>
            </span>
          </h1>
        </div>
      </header>

      <section
        id="contact"
        className="bg-[#616b6a] px-6 pb-20 pt-2 md:px-14 md:pb-28 md:pt-0"
      >
        <div className="glass relative z-10 -mt-10 max-w-[34rem] px-6 py-8 md:-mt-16 md:px-8 md:py-10">
          <ContactForm />
        </div>
      </section>

      <main className="bg-ink px-6 py-20 md:px-14 md:py-28">
        <div className="max-w-[40rem] space-y-7">
          {LINES.map((line) => (
            <p
              key={line}
              className="text-[1.125rem] leading-[1.55] text-cream md:text-[1.25rem]"
            >
              {line}
            </p>
          ))}
        </div>
        <footer className="mt-20 flex max-w-[40rem] flex-wrap items-baseline justify-between gap-x-10 gap-y-2 text-[0.95rem] leading-[1.5] text-cream/80 md:mt-28">
          <p>Backed by Entrepreneurs First and Transpose Platform.</p>
          <p>© {year} Firstocean</p>
        </footer>
      </main>
    </>
  );
}
