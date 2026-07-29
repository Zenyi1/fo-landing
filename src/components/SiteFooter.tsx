import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";

const backerLink =
  "font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-[58vh] flex-col justify-end overflow-hidden bg-[#071a2b] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <WaveBackground />
        <div className="absolute inset-0 bg-[#071a2b]/45" />
      </div>
      <div
        className="relative z-10 mx-auto w-full max-w-[1160px] px-6 pb-12 pt-24 md:px-14"
        style={{ textShadow: "0 1px 18px rgba(3,10,18,0.55)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
          {/* left: firstocean + backers */}
          <div>
            <Link href="/" className="text-2xl font-semibold lowercase tracking-tight text-white">
              firstocean
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.8rem] text-white">
              Backed by{" "}
              <a href="https://www.joinef.com/portfolio/" target="_blank" rel="noopener noreferrer" className={backerLink}>
                Entrepreneurs First
              </a>{" "}
              and{" "}
              <a href="https://www.transposeplatform.vc" target="_blank" rel="noopener noreferrer" className={backerLink}>
                Transpose Platform
              </a>
            </div>
          </div>

          {/* right: the two paths, top-aligned with the wordmark */}
          <div className="flex flex-col gap-2.5 text-[1rem] text-white sm:items-end sm:text-right">
            <Link href="/originators" className="w-fit transition-opacity hover:opacity-70">
              See what my drug is worth
            </Link>
            <Link href="/distributors" className="w-fit transition-opacity hover:opacity-70">
              Looking to in-license
            </Link>
          </div>
        </div>

        {/* copyright, below everything, bottom-right */}
        <div className="mt-16 flex justify-end text-[0.8rem] text-white/90">
          © {year} firstocean. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
