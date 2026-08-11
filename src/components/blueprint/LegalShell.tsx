import Link from "next/link";

import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { OS_HOME } from "@/lib/links";

// Reading shell for /privacy and /terms. Same blueprint tokens as
// /intelligence, one measure, no decoration: these pages are read, not scanned.
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
    <main
      className="bp-root relative w-full"
      style={{ background: "var(--bp-paper)", color: "var(--bp-ink)" }}
    >
      <header className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center px-6 sm:px-10">
        <Link
          href={OS_HOME}
          className="text-[17px] font-medium lowercase tracking-[-0.015em]"
          style={{ color: "var(--bp-ink)" }}
        >
          firstocean
        </Link>
      </header>

      <article className="mx-auto w-full max-w-[68ch] px-6 pb-24 pt-10 sm:px-10">
        <h1
          className="text-balance leading-[1.04] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.1rem)" }}
        >
          {title}
        </h1>
        <p
          className="mt-4 text-[0.92rem]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          Last updated {updated}
        </p>

        <div
          className="mt-12 space-y-10 text-[1.02rem] leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-[1.3rem] [&_h2]:tracking-[-0.02em] [&_h2]:text-[color:var(--bp-ink)] [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          {children}
        </div>
      </article>

      <BlueprintFooter />
    </main>
  );
}
