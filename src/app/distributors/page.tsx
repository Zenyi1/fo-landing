import type { Metadata } from "next";
import { WaveBackground } from "@/components/WaveBackground";
import { DistributorsHeader } from "@/components/DistributorsHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { inlicensorCallUrl } from "@/lib/links";

const title = "Distribution partners";
const description =
  "firstocean holds the registration and runs the commercial operation. We contract licensed distributors across Latin America, the Middle East and Southeast Asia to move the product.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/distributors" },
  openGraph: {
    type: "website",
    url: "/distributors",
    siteName: "firstocean",
    title,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description },
};

/* This page used to be a licensing marketplace: a grid of illustrative assets
   with the compound and originator blurred out, an unlock band, and "opens
   under NDA" three times over. That framing sold firstocean as a broker
   shopping other people's molecules around, which is the opposite of the
   argument the rest of the site makes — that we hold the licence ourselves.
   Distributors are a supply-side input, so the page is now what that actually
   warrants: what we need, what we do not hand over, and one way in. */

export default function DistributorsPage() {
  return (
    <div className="min-h-full bg-[#071a2b]">
      <DistributorsHeader />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#071a2b] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <WaveBackground />
          <div className="absolute inset-0 bg-[#071a2b]/45" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pt-28 md:px-14 md:pt-32">
          <h1 className="font-sans text-[clamp(2.2rem,5vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white">
            <span className="block">You move the product.</span>
            <span className="block">We hold the licence.</span>
          </h1>
          <p className="mt-7 max-w-[58ch] text-[clamp(1.05rem,1.7vw,1.22rem)] leading-[1.55] text-white">
            firstocean registers medicines in its own name, agrees price with
            the regulator and runs the commercial operation. What we contract
            out is physical distribution: warehousing, cold chain where a
            product needs it, and delivery into pharmacies, hospitals and public
            tenders.
          </p>
          <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.6] text-white/80">
            If you are a licensed distributor in Latin America, the Middle East
            or Southeast Asia, tell us what you carry and where.
          </p>
          <div className="mt-9">
            <a
              href={inlicensorCallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[11px] bg-white px-7 py-4 font-sans text-[1.05rem] font-semibold text-[#1e3a8a] transition-colors hover:bg-white/90"
            >
              Apply to partner →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
