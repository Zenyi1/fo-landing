import type { Metadata } from "next";
import Link from "next/link";
import { GameOfLife } from "@/components/GameOfLife";
import { ValuationFunnel } from "@/components/ValuationFunnel";

const title = "Emerging markets asset valuation";
const description =
  "Estimate the emerging-market value of your therapeutic, from preclinical to approved.";

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
      <aside className="relative flex min-h-[40vh] flex-col overflow-hidden md:min-h-screen md:w-1/2">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#071a2b] via-[#0a1730] to-[#120a2e]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <GameOfLife />
        </div>
        {/* light scrim keeps the centered copy legible over the animation */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#071a2b]/25"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col p-6 md:p-10 lg:p-14">
          <Link href="/" className="text-2xl font-semibold lowercase tracking-tight text-white">
            firstocean
          </Link>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="max-w-[16ch] font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[46px]">
              Most of the world can&rsquo;t access your medicine.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.55] text-white md:text-[21px]">
              firstocean turns unlicensed emerging-market rights into capital.
            </p>
            {/* reads as a live feed entry; swap the copy when the next deal closes */}
            <div className="mt-10 rounded-[10px] border border-white/15 bg-white/[0.06] px-5 py-4 text-left backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  Latest deal
                </p>
              </div>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-[1.5] text-white/90 md:text-[16px]">
                MENA rights to a Phase 2 asset, licensed at 20% above the internal valuation.
              </p>
            </div>
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
