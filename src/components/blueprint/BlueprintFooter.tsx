import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

import { BackedBy } from "@/components/BackedBy";
import { LINKEDIN_URL } from "@/lib/links";

// One row, a hairline, and nothing else. The page has already said everything
// it has to say by the time a reader reaches this, so the footer's job is to
// stop the page rather than to restate it.
//
// Privacy and Terms sit here because the site runs session recording and those
// pages have to be reachable from every page. They are the only links.
const quiet =
  "text-[13px] transition-colors hover:text-[color:var(--bp-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]";

export function BlueprintFooter({
  // The investor line rides inside the footer rather than above it, so the two
  // share the single hairline instead of stacking one rule each. Off by
  // default: the legal pages get the footer without it.
  backedBy = false,
}: {
  backedBy?: boolean;
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t py-8"
      style={{ borderColor: "var(--bp-hairline)" }}
    >
      {backedBy ? (
        <div className="mx-auto mb-7 w-full max-w-[1240px] px-6 sm:px-10">
          <BackedBy tone="light" />
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 sm:px-10">
        <p className="text-[13px]" style={{ color: "var(--bp-ink-muted)" }}>
          © {year} firstocean
        </p>

        <div
          className="flex items-center gap-6"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          <Link href="/privacy" className={quiet}>
            Privacy
          </Link>
          <Link href="/terms" className={quiet}>
            Terms
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="firstocean on LinkedIn"
            className={quiet}
          >
            <LinkedinLogo className="h-4 w-4" weight="fill" />
          </a>
        </div>
      </div>
    </footer>
  );
}
