/* Where the team came from. The marks keep their own colour, so heights are
   set per logo rather than uniformly: a three-line stack and a single-line
   wordmark need different boxes to read at the same optical weight.

   Sources: each mark is the published SVG, reduced to one lockup. Blackstone's
   ships as a wordmark knocked out of a full-bleed plate, so only the wordmark
   is kept; American Express is the standalone blue wordmark rather than the
   boxed lockup, which would sit far heavier than everything around it.

   Deliberately not grouped by sector — the finance marks are interleaved so
   the strip reads as a mix rather than as a bank list with a few guests. With
   five finance marks against three others, one adjacent pair is unavoidable,
   so it is put at the end where the fade is already softening the row. */
const LOGOS = [
  { name: "Blackstone", src: "/logos/blackstone.svg", h: 18, w: 113 },
  {
    name: "The Alan Turing Institute",
    src: "/logos/alan-turing-institute.svg",
    h: 40,
    w: 95,
  },
  { name: "Goldman Sachs", src: "/logos/goldman-sachs.svg", h: 30, w: 72 },
  { name: "Palantir", src: "/logos/palantir.svg", h: 22, w: 91 },
  { name: "Averin Capital", src: "/logos/averin.svg", h: 19, w: 72 },
  // A solid blue plate, so it carries far more ink per pixel than the
  // wordmarks around it. Sized down accordingly: matching its height to theirs
  // would make it the loudest thing in the strip.
  { name: "NHS", src: "/logos/nhs.svg", h: 24, w: 59 },
  {
    name: "American Express",
    src: "/logos/american-express.svg",
    h: 27,
    w: 82,
  },
  // the only square mark in the set, and a thin outline at that, so it needs
  // more height than the wordmarks to carry the same weight
  { name: "PAI Partners", src: "/logos/pai-partners.svg", h: 34, w: 34 },
];

// The spacing lives on each item rather than in a flex `gap`, so every item
// occupies exactly the same slot width. That is what lets the track translate
// a flat -50% and land the clone on the seam with no jump.
const SLOT = "pe-[clamp(2.75rem,6vw,5.5rem)]";

function LogoRow({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      // the clone exists only to fill the loop; it is not a second list of
      // employers, so it is hidden from assistive tech entirely
      aria-hidden={clone || undefined}
      data-clone={clone ? "" : undefined}
    >
      {LOGOS.map((l) => (
        <li key={l.name} className={SLOT}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG
              at a fixed height; next/image would need dangerouslyAllowSVG */}
          <img
            src={l.src}
            alt={clone ? "" : l.name}
            width={l.w}
            height={l.h}
            style={{ height: l.h }}
            className="w-auto max-w-none"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section
      className="w-full border-t px-6 py-[clamp(48px,7vh,80px)] sm:px-10"
      style={{ borderColor: "var(--bp-hairline)" }}
      aria-label="Where the team came from"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <p
          className="text-[0.95rem] leading-relaxed sm:text-[1.02rem]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          Bringing pharma, finance and tech backgrounds together.
        </p>

        {/* No padding anywhere on the track: its width has to be exactly two
            rows for the -50% to loop cleanly. The edges are handled by the
            fade mask on the wrapper instead. */}
        <div className="bp-marquee mt-9 overflow-hidden">
          <div className="bp-marquee-track flex w-max">
            <LogoRow />
            <LogoRow clone />
          </div>
        </div>
      </div>
    </section>
  );
}
