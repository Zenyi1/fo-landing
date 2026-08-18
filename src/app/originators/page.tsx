import type { Metadata } from "next";
import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";
import { ValuationFunnel } from "@/components/ValuationFunnel";

const title = "For originators";
const description =
  "A counterpart for the markets you will not enter yourself. Estimate directional value outside your core markets, anonymously, in about two minutes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/originators" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/originators",
    siteName: "firstocean",
    title,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/seo/fo.jpeg"],
  },
};

export default function OriginatorsPage() {
  return (
    <div className="relative min-h-screen text-white md:flex">
      {/* left: brand side, the world-map visual reads as the hero here */}
      <aside className="relative flex min-h-[40vh] flex-col overflow-hidden bg-[#071a2b] md:min-h-screen md:w-1/2">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <WaveBackground />
          <div className="absolute inset-0 bg-[#071a2b]/45" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6 md:p-10 lg:p-14">
          <Link href="/" className="text-2xl font-semibold lowercase tracking-tight text-white">
            firstocean
          </Link>
          {/* The page leads with the counterpart, not with the number. The
              estimate is a directional model and sits to the right of it. */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-[15px] leading-[1.5] text-[color:var(--fo-accent)] md:text-[16px]">
              Most of the world cannot access your medicine.
            </p>
            <h1 className="mt-5 text-balance font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[46px]">
              A counterpart for the markets you will not enter yourself.
            </h1>
            <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.55] text-white md:text-[21px]">
              firstocean commercializes approved and late-stage medicines in the
              markets a launch plan leaves out. One reporting line. Local
              operators. You keep the core.
            </p>
          </div>
        </div>
      </aside>

      {/* right: survey on a solid surface so every field reads cleanly */}
      <main className="relative flex min-h-screen flex-1 items-center justify-center bg-white px-6 py-16 text-ink md:w-1/2">
        <ValuationFunnel />
      </main>
    </div>
  );
}
