/* Pill bottles around the abundance section. The section's argument is that
   compounds now arrive faster than the apparatus around them can absorb, so
   the decoration is quantity: a lot of bottles, no two the same colour,
   crowding in on the copy from every side.

   Nothing here is positioned against the copy by guesswork. The columns are
   grid tracks either side of the text, so a bottle cannot reach a line of it
   however wide `62ch` happens to render; the bands sit a fixed distance above
   and below the block, outside it rather than at the top and bottom of it.
   Getting that wrong is what put bottles over the text the first time. */

function Bottle({ i, x, y }: { i: number; x: string; y: string }) {
  /* Hue walks the wheel by the golden angle, the same way the hero's dot field
     does, so no two neighbours land on the same colour and the set still holds
     one saturation and lightness band. Size and tilt come off the index too: a
     table of them would be three more numbers a line for variation nobody is
     meant to read. */
  const hue = ((i * 137.508) % 360).toFixed(1);
  const height = 26 + ((i * 7) % 5) * 5;
  const tilt = ((i * 53) % 37) - 18;

  return (
    <svg
      viewBox="0 0 22 40"
      className="absolute w-auto"
      style={{
        left: x,
        top: y,
        height,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
      }}
    >
      {/* cap, body, label */}
      <rect
        x="5"
        y="0"
        width="12"
        height="7"
        rx="2"
        fill={`hsl(${hue} 44% 46%)`}
      />
      <rect
        x="1"
        y="6"
        width="20"
        height="33"
        rx="4"
        fill={`hsl(${hue} 54% 62%)`}
      />
      <rect
        x="4.5"
        y="15"
        width="13"
        height="12"
        rx="1.5"
        fill="#ffffff"
        opacity="0.62"
      />
    </svg>
  );
}

/* Down its own grid track, and over the top and bottom of it: the y values run
   past both ends so the run wraps the corners of the block rather than stopping
   square with them. x is held to the middle 60% of the track, which keeps a
   bottle off the section's edge on one side and out of the gutter next to the
   text on the other. */
const COLUMN: [x: number, y: number][] = [
  [32, -9],
  [68, 3],
  [24, 16],
  [72, 29],
  [34, 42],
  [70, 55],
  [26, 68],
  [64, 81],
  [36, 94],
  [70, 107],
];

export function PillColumn({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    // stretches to the height of the copy beside it, since a grid item does
    // that on its own and there is no content in here to give it a height
    <div
      aria-hidden
      className="pointer-events-none relative z-0 hidden lg:block"
    >
      {COLUMN.map(([x, y], k) => (
        <Bottle
          key={k}
          // the same run on both sides would read as a mirror, so the right
          // one is turned over and started at a different point on the wheel
          i={left ? k : k + COLUMN.length}
          x={`${x}%`}
          y={`${left ? y : 100 - y}%`}
        />
      ))}
    </div>
  );
}

/* Above the heading and below the last paragraph, spanning the whole block.
   Safe by construction: the row sits 48px clear of the block, so even the
   tallest bottle at the far end of its jitter stops 19px short of the text —
   and 77px out, inside the section's own padding, which is 80px at its
   tightest. */
const BAND = [4, 13, 23, 32, 42, 51, 61, 70, 80, 89, 96];
const BAND_GAP = 48;

export function PillBand({ edge }: { edge: "top" | "bottom" }) {
  const top = edge === "top";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-0 hidden h-0 lg:block"
      style={top ? { top: -BAND_GAP } : { bottom: -BAND_GAP }}
    >
      {BAND.map((x, k) => (
        <Bottle
          key={k}
          i={top ? k + 2 * COLUMN.length : k + 2 * COLUMN.length + BAND.length}
          x={`${x}%`}
          // ±6px off the line, so the row is not a ruler
          y={`${((k * 5) % 13) - 6}px`}
        />
      ))}
    </div>
  );
}
