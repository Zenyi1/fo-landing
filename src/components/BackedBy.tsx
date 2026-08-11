// The investor line appears on two surfaces with two different ink ladders:
// over the dark film (home hero, /intelligence) and on the white reading half.
// Vertical placement is the caller's business — pass it in via className.
// The global `* { outline-ring/50 }` reset paints the focus ring in --ring
// (#1e3a8a) at half alpha, which is invisible against the navy film — so each
// tone names its own outline colour rather than inheriting that default.
const TONE = {
  dark: {
    root: "text-[color:var(--fo-ink-1)]",
    link: "text-[color:var(--fo-ink-1)] decoration-[color:var(--fo-line-strong)] focus-visible:outline-[color:var(--fo-accent)]",
  },
  light: {
    root: "text-[color:var(--ink-soft)]",
    link: "text-[color:var(--brand)] decoration-[color:var(--line)] focus-visible:outline-[color:var(--brand)]",
  },
} as const;

export function BackedBy({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const t = TONE[tone];
  const link = `font-medium underline underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 ${t.link}`;

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 text-[0.85rem] ${t.root} ${className}`}
    >
      Backed by{" "}
      <a
        href="https://www.joinef.com/portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        Entrepreneurs First
      </a>{" "}
      and{" "}
      <a
        href="https://www.transposeplatform.vc"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        Transpose Platform
      </a>
    </div>
  );
}
