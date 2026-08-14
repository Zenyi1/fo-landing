import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";

// Reading shell for /privacy and /terms. One measure, no decoration: these
// pages are read, not scanned. It carries its own bar rather than the homepage
// header, whose links are in-page anchors that dead-end anywhere else.
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-white text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center px-6 md:h-20 md:px-14">
          <Link
            href="/"
            className="text-2xl font-semibold lowercase tracking-tight text-ink"
          >
            firstocean
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-[68ch] px-6 pb-24 pt-14 md:px-14">
        <h1 className="text-balance font-sans text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink">
          {title}
        </h1>
        <p className="mt-4 text-[0.92rem] text-ink-soft">
          Last updated {updated}
        </p>

        <div className="mt-12 space-y-10 text-[1.02rem] leading-[1.6] text-ink-soft [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-sans [&_h2]:text-[1.3rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
