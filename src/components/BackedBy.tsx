// The investor line, over the dark film: the homepage hero and the navy wave
// footer. Vertical placement is the caller's business — pass it in via
// className. The global `* { outline-ring/50 }` reset paints the focus ring in
// --ring (#1e3a8a) at half alpha, which is invisible against the navy, so the
// links name their own outline colour rather than inheriting that default.
const link =
  "font-medium underline underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 text-[color:var(--fo-ink-1)] decoration-[color:var(--fo-line-strong)] focus-visible:outline-[color:var(--fo-accent)]";

export function BackedBy({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 text-[0.85rem] text-[color:var(--fo-ink-1)] ${className}`}
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
