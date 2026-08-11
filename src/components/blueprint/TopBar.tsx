import Link from "next/link";

// Announcement strip plus the floating nav. The strip is in normal flow, so it
// scrolls away once read; the nav sticks. No JS: sticky and the glass fill are
// both CSS, which keeps the whole header a Server Component.
const NAV = [
  { href: "#graph", label: "The model" },
  { href: "#departments", label: "What we do" },
  { href: "#how", label: "Getting started" },
  { href: "#faq", label: "FAQ" },
];

export function TopBar() {
  return (
    <>
      <Link
        href="/blog/firstocean-pre-seed"
        className="group flex w-full items-center justify-center gap-2 px-4 py-2.5 text-[0.82rem] font-medium text-white transition-colors hover:bg-[var(--bp-blue-strong)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
        style={{ background: "var(--bp-blue)" }}
      >
        firstocean raises pre-seed to build the operating layer for biotech

        <span
          aria-hidden
          className="transition-transform motion-safe:group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>

      <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <nav
          className="mx-auto flex h-[56px] w-full max-w-[1240px] items-center justify-between gap-6 rounded-full pl-6 pr-2"
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(16px) saturate(150%)",
            WebkitBackdropFilter: "blur(16px) saturate(150%)",
            border: "1px solid var(--bp-hairline)",
            boxShadow: "0 10px 30px -18px rgba(12, 14, 17, 0.4)",
          }}
        >
          <Link
            href="/"
            className="text-[17px] font-medium lowercase tracking-[-0.015em]"
            style={{ color: "var(--bp-ink)" }}
          >
            firstocean
          </Link>

          {/* the anchors are a desktop affordance; on a phone the page is short
              enough to scroll and the pill keeps only the wordmark and the CTA */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.92rem] transition-colors hover:text-[color:var(--bp-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
                  style={{ color: "var(--bp-ink-muted)" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="whitespace-nowrap rounded-full px-5 py-2.5 text-[0.9rem] font-medium leading-none text-white transition-colors hover:bg-[var(--bp-blue-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] active:translate-y-[1px]"
            style={{ background: "var(--bp-blue)" }}
          >
            Book a demo
          </a>
        </nav>
      </div>
    </>
  );
}
