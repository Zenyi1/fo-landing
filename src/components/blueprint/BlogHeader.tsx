import Link from "next/link";

import { OS_HOME } from "@/lib/links";

/* The bar the writing pages carry instead of the marketing nav. Both links
   point at explicit routes rather than "/": the proxy only rewrites the root
   to the operating-system page in Europe, North America and Japan, so a
   wordmark pointing at "/" would drop a reader elsewhere onto the licensing
   homepage. */
export function BlogHeader({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  return (
    <header
      className="w-full border-b px-6 sm:px-10"
      style={{ borderColor: "var(--bp-hairline)" }}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between">
        <Link
          href={OS_HOME}
          className="text-[17px] font-medium lowercase tracking-[-0.015em]"
          style={{ color: "var(--bp-ink)" }}
        >
          firstocean
        </Link>
        <Link
          href={backHref}
          className="text-[0.92rem] transition-colors hover:text-[color:var(--bp-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          <span aria-hidden>←</span> {backLabel}
        </Link>
      </div>
    </header>
  );
}
