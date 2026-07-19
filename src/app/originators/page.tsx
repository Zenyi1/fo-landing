import type { Metadata } from "next";
import Link from "next/link";
import { WorldMap } from "@/components/WorldMap";
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
    <div className="relative min-h-screen text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-[#071a2b] via-[#0a1730] to-[#120a2e]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <div className="w-full min-w-[880px] scale-110 opacity-80">
          <WorldMap className="blur-[7px]" />
        </div>
      </div>

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="flex h-16 items-center px-6 md:h-20 md:px-10">
          <Link href="/" className="text-2xl font-semibold lowercase tracking-tight text-white">
            firstocean
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24 pb-10">
        <ValuationFunnel />
      </main>
    </div>
  );
}
