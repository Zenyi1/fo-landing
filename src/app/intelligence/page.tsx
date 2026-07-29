import type { Metadata } from "next";

const title = "first ocean · intelligence";
const description =
  "Biotech runway, on autopilot. The financial layer your biotech runs on. We earn when you do.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/intelligence" },
  // deliberately undiscoverable — no index, no follow, no sitemap entry
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    url: "/intelligence",
    siteName: "first ocean",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

function Logo() {
  return (
    <span className="inline-flex items-center gap-3 text-white">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="10" stroke="white" strokeWidth="1" />
        <path
          d="M1.6 12.2c2 0 2-1.8 4-1.8s2 1.8 4 1.8 2-1.8 4-1.8 2 1.8 4 1.8"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-medium tracking-[-0.01em]">
        first ocean
      </span>
    </span>
  );
}

export default function IntelligencePage() {
  return (
    <main className="flex min-h-screen w-full flex-col justify-between bg-black px-8 py-9 text-white sm:px-14 sm:py-12">
      {/* top */}
      <header className="flex items-center justify-between">
        <Logo />
        <a
          href="mailto:hugo@first-ocean.com?subject=first%20ocean%20intelligence"
          className="text-[15px] font-normal text-white underline-offset-[6px] hover:underline"
        >
          Get in touch
        </a>
      </header>

      {/* statement */}
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="text-balance text-[2.6rem] font-normal leading-[1.06] tracking-[-0.03em] sm:text-[4.75rem] sm:leading-[1.02]">
          Biotech runway, on autopilot.
        </h1>
        <p className="mt-7 max-w-2xl text-[1.3rem] font-normal leading-snug text-white sm:text-[1.7rem]">
          A financial intelligence layer that connects to your existing systems
          and produces capital on its own.
        </p>
      </section>

      {/* spacer keeps the statement vertically centred; bottom intentionally empty */}
      <div aria-hidden className="h-6" />
    </main>
  );
}
