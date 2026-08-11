"use client";

import { useEffect, useRef, useState } from "react";

// Three scenes on one stage: what we learn, what the agents then do with it,
// and what it becomes as the company grows.
//
// From lg up the stage pins to the viewport and the scroll position drives
// which scene is showing: the section holds while you scroll through it, then
// releases and the page carries on. Below lg it cannot pin — the stacked
// layout is taller than a phone viewport — so the scenes advance on a timer
// there instead.
//
// Every scene is remounted on change (key={step}), which is what replays the
// entry animations without any imperative restart. It is also what resets the
// execution scene's Send button, so the one interaction on the page is there
// again the next time somebody scrolls back to it.

const STEPS = [
  {
    title: "Discovery",
    body: "We learn how you already work and plug into the systems you already run, until there is a working model of your company, your drug and your pipeline.",
  },
  {
    title: "Execution",
    body: "Agents reconcile, check, chase, prepare, and escalate. when the evidence is unclear, they stop and hand the decision to a person.",
  },
  {
    title: "Learning",
    body: "As you grow we take on more, one domain at a time, until everything the company knows is a single connected record.",
  },
];

const CYCLE_MS = 7000;

// One coordinate space for all three scenes, so the stage never resizes
// between them.
const VB = { w: 468, h: 334 };
const CX = VB.w / 2;
const CY = VB.h / 2;

/* ── scene 1 · discovery ──────────────────────────────────────────────────
   The paper a company is actually made of, scattered across the stage. The
   sheets drift side to side, then draw in and collapse into one record: the
   orb, with the tide still running inside it. It loops, so the gathering is
   something the reader watches happen rather than a finished diagram.

   Positions are a fixed table, not generated: Math.random() at module scope
   would give the server and the client different scatters and blow up
   hydration. They avoid a disc of about 80 units around the centre so nothing
   starts underneath the orb it is travelling to. */

const DOC_W = 26;
const DOC_H = 32;

const DOCS = [
  { x: 18, y: 38 },
  { x: 66, y: 96 },
  { x: 14, y: 140 },
  { x: 58, y: 202 },
  { x: 20, y: 248 },
  { x: 104, y: 268 },
  { x: 96, y: 26 },
  { x: 154, y: 12 },
  { x: 236, y: 22 },
  { x: 312, y: 10 },
  { x: 372, y: 62 },
  { x: 424, y: 40 },
  { x: 416, y: 116 },
  { x: 380, y: 158 },
  { x: 428, y: 198 },
  { x: 366, y: 236 },
  { x: 306, y: 284 },
  { x: 226, y: 292 },
  { x: 148, y: 286 },
] as const;

const ORB_R = 46;
// the waterline sits below the middle of the orb, so the crest reads as a
// surface rather than as a line cutting the circle in half
const TIDE_Y = CY + 8;

/* One period of the wave is 44 units - `q` then seven `t`s, each reflecting the
   previous control point into the next bump. That is what lets the tide loop by
   translating exactly -44 with no seam. It is drawn wide enough that a full
   period of travel never pulls its edge out of the orb. */
const WAVE =
  "M -66 0 q 11 -9 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0";

function Label({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
}) {
  // paint-order puts the paper-coloured stroke behind the glyphs, so a label
  // can sit on top of an edge and still be readable
  return (
    <text
      x={x}
      y={y}
      fontSize={10}
      textAnchor={anchor}
      fill="var(--bp-ink)"
      stroke="var(--bp-paper)"
      strokeWidth={3}
      style={{ paintOrder: "stroke" }}
    >
      {children}
    </text>
  );
}

function Discovery() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Contracts, invoices, filings and vendor mail scattered across the page drift, then draw together into one record."
    >
      <defs>
        <clipPath id="bp-orb-clip">
          <circle cx={CX} cy={CY} r={ORB_R} />
        </clipPath>
      </defs>

      {DOCS.map((d, i) => {
        // travel is measured centre to centre, so a sheet lands on the orb
        // rather than beside it
        const tx = CX - (d.x + DOC_W / 2);
        const ty = CY - (d.y + DOC_H / 2);
        return (
          <g
            key={`${d.x}-${d.y}`}
            className="bp-gather"
            opacity={0.32}
            style={
              {
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                // alternating drift, so the field shuffles rather than sliding
                // one way as a block
                "--sx": `${i % 2 ? -11 : 11}px`,
                "--d": `${i * 210}ms`,
              } as React.CSSProperties
            }
          >
            <rect
              x={d.x}
              y={d.y}
              width={DOC_W}
              height={DOC_H}
              rx={3}
              fill="var(--bp-paper)"
              stroke="currentColor"
              strokeOpacity={0.45}
            />
            {[9, 15, 21].map((dy, j) => (
              <line
                key={dy}
                x1={d.x + 6}
                y1={d.y + dy}
                x2={d.x + (j === 2 ? 15 : 20)}
                y2={d.y + dy}
                stroke="currentColor"
                strokeOpacity={0.4}
                strokeWidth={1.4}
              />
            ))}
          </g>
        );
      })}

      {/* the record everything lands in */}
      <g className="bp-pop" style={{ "--d": "700ms" } as React.CSSProperties}>
        <circle
          cx={CX}
          cy={CY}
          r={ORB_R}
          fill="var(--bp-paper)"
          stroke="currentColor"
          strokeWidth={1.4}
        />

        <g clipPath="url(#bp-orb-clip)">
          <g className="bp-tide">
            <path
              d={`${WAVE} V ${VB.h} H -66 Z`}
              transform={`translate(${CX} ${TIDE_Y})`}
              fill="currentColor"
              fillOpacity={0.16}
            />
            <path
              d={WAVE}
              transform={`translate(${CX} ${TIDE_Y})`}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.65}
              strokeWidth={1.4}
            />
          </g>
        </g>

        {/* redrawn over the tide so the rim stays a clean circle */}
        <circle
          cx={CX}
          cy={CY}
          r={ORB_R}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        />
      </g>
    </svg>
  );
}

/* ── scene 2 · execution ──────────────────────────────────────────────────
   The one scene that is not a drawing. It plays the chain out: the agent reads
   the four documents an invoice has to be judged against, one at a time, drafts
   the challenge it found, and then a pointer arrives and sends it. The ripple
   is the money going back out the door.

   It runs itself on a phase timer and loops, so nothing here is clickable. The
   scene used to end on a real Send button the reader pressed; that made the
   point about a human in the loop better, but it also meant the sequence only
   ever completed for people who noticed the button.

   Every visual is derived from `phase`, so the restart needs no teardown: at
   phase 0 nothing is scanned, no draft exists and the pointer is away. */

const DOCUMENTS = [
  { t: "Work order", d: "Kelvin CRO, Q3 monitoring" },
  { t: "Protocol v4.2", d: "Schedule of assessments" },
  { t: "Invoice #KC-1184", d: "$184,200" },
  { t: "Visit log", d: "42 visits" },
];

// phase indices the render reads by name rather than by number
const P_DRAFT = 1 + DOCUMENTS.length; // 5
const P_POINTER = P_DRAFT + 1; // 6
const P_SEND = P_POINTER + 1; // 7
const P_FADE = P_SEND + 1; // 8

// ms per phase: lead-in, one per document, draft, pointer travel, send, fade
const PHASE_MS = [520, 660, 660, 660, 660, 1180, 780, 1800, 640];

function Execution() {
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setTick((t) => (t + 1) % PHASE_MS.length),
      PHASE_MS[tick],
    );
    return () => clearTimeout(id);
  }, [tick, reduced]);

  // Under reduced motion the loop never runs and the scene rests on the frame
  // where the work is done, which is the finished state the other scenes also
  // settle on. Derived rather than pushed into state: forcing the tick would
  // mean a setState inside the effect.
  const phase = reduced ? P_SEND : tick;
  const drafted = phase >= P_DRAFT;
  const sent = phase >= P_SEND;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center gap-3 p-5 transition-opacity duration-500 sm:p-6"
      style={{ opacity: phase === P_FADE ? 0 : 1 }}
    >
      <ol className="flex flex-col gap-1.5">
        {DOCUMENTS.map((doc, i) => {
          // the agent is on this row now; everything above it is already read
          const reading = phase === i + 1;
          const read = phase > i + 1;
          return (
            <li
              key={doc.t}
              className="flex items-center gap-2.5 rounded-[var(--bp-r-sm)] border px-2.5 py-1.5 transition-colors duration-300"
              style={{
                borderColor: reading ? "var(--bp-blue)" : "var(--bp-hairline)",
                background: reading
                  ? "color-mix(in srgb, var(--bp-blue) 8%, transparent)"
                  : "var(--bp-paper)",
              }}
            >
              {/* sheet glyph, ticked once the agent has been through it */}
              <span
                aria-hidden
                className="grid h-5 w-4 shrink-0 place-items-center rounded-[2px] border text-[0.6rem] leading-none transition-colors duration-300"
                style={{
                  borderColor:
                    reading || read
                      ? "var(--bp-blue)"
                      : "var(--bp-hairline-strong)",
                  background: read ? "var(--bp-blue)" : "transparent",
                  color: "#ffffff",
                }}
              >
                {read ? "✓" : ""}
              </span>
              {/* title and detail share one line: four stacked two-line rows
                  plus the draft overflow the stage between 1024 and 1200px,
                  where the column is narrowest but the type is not */}
              <span className="min-w-0 truncate text-[0.8rem] leading-tight">
                <span
                  className="font-medium"
                  style={{
                    color: reading ? "var(--bp-blue)" : "var(--bp-ink)",
                  }}
                >
                  {doc.t}
                </span>
                <span style={{ color: "var(--bp-ink-muted)" }}>
                  {" · "}
                  {doc.d}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* The draft is always in the DOM so the list above never reflows when it
          arrives — it only fades and lifts into place. */}
      <div
        className="rounded-[var(--bp-r-sm)] border p-3 transition-all duration-500"
        style={{
          borderColor: "var(--bp-hairline-strong)",
          background: "var(--bp-paper)",
          opacity: drafted ? 1 : 0,
          transform: drafted ? "none" : "translateY(8px)",
        }}
      >
        <p
          className="text-[0.68rem] uppercase tracking-[0.1em]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          Drafted · to billing@kelvincro.com
        </p>
        <p
          className="mt-1 text-[0.78rem] leading-snug"
          style={{ color: "var(--bp-ink)" }}
        >
          Visits 39–42 sit outside the schedule of assessments. Please issue a
          credit note for <span className="tnum">$19,400</span>.
        </p>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
          <p
            className="text-[0.74rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            {sent ? (
              <>
                Sent. <span className="tnum">$19,400</span> claimed back.
              </>
            ) : (
              "Ready to send."
            )}
          </p>

          {/* the pointer and the ripple are anchored to this wrapper, so they
              land on the button wherever the flex row puts it */}
          <span className="relative inline-flex">
            {sent &&
              !reduced &&
              [0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className="bp-ripple pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 rounded-full border"
                  style={
                    {
                      borderColor: "var(--bp-blue)",
                      "--d": `${i * 240}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}

            <span
              className={`${drafted && !sent ? "bp-await" : ""} inline-flex items-center gap-1.5 whitespace-nowrap rounded-[var(--bp-r-sm)] px-3.5 py-1.5 text-[0.78rem] font-medium text-white transition-transform duration-150`}
              style={{
                background: "var(--bp-blue)",
                // the press, on the frame the pointer arrives
                transform: phase === P_SEND ? "translateY(1px)" : "none",
              }}
            >
              {sent ? "Sent" : "Send"}
              {sent ? null : <span aria-hidden>→</span>}
            </span>

            {/* Positioned from the button's centre rather than from the stage,
                then nudged so the arrow's tip — its top-left — is what sits on
                the button rather than its middle. */}
            <svg
              aria-hidden
              viewBox="0 0 12 18"
              className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-3 transition-all duration-700 ease-out"
              style={{
                opacity: phase >= P_POINTER && phase < P_FADE ? 1 : 0,
                transform:
                  phase >= P_SEND
                    ? "translate(-2px, -2px)"
                    : "translate(46px, 34px)",
              }}
            >
              <path
                d="M1 1 L1 15 L4.6 11.6 L7 17 L9.4 16 L7 10.8 L11 10.8 Z"
                fill="var(--bp-ink)"
                stroke="var(--bp-paper)"
                strokeWidth={1.2}
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── scene 3 · learning ───────────────────────────────────────────────────
   One node becomes a domain, that domain becomes six, and the six start
   talking to each other. The cross-links land last on purpose: the density is
   the point, not the branches. */

const DOMAINS = [
  "pharmacovigilance",
  "regulatory",
  "clinical ops",
  "CMC",
  "quality",
  "medical affairs",
];

const HUB_RX = 126;
const HUB_RY = 92;
const LEAF_RX = 196;
const LEAF_RY = 142;

const polar = (deg: number, rx: number, ry: number) => ({
  x: CX + rx * Math.cos((deg * Math.PI) / 180),
  y: CY + ry * Math.sin((deg * Math.PI) / 180),
});

const BRANCHES = DOMAINS.map((label, i) => {
  const deg = -90 + i * 60;
  return {
    label,
    deg,
    hub: polar(deg, HUB_RX, HUB_RY),
    leaves: [-17, 0, 17].map((off) => polar(deg + off, LEAF_RX, LEAF_RY)),
  };
});

// adjacent branches wired together at the rim, which is what turns six spokes
// into one graph
const CROSS = BRANCHES.map((b, i) => [
  b.leaves[2],
  BRANCHES[(i + 1) % BRANCHES.length].leaves[0],
]);

function Learning() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="One node grows into pharmacovigilance, then regulatory, clinical operations, CMC, quality and medical affairs, and the branches connect into one dense graph."
    >
      {BRANCHES.map((b, i) => (
        <g key={b.label}>
          <line
            className="bp-draw"
            x1={CX}
            y1={CY}
            x2={b.hub.x}
            y2={b.hub.y}
            pathLength={1}
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={1.2}
            style={{ "--d": `${320 + i * 170}ms` } as React.CSSProperties}
          />
          {b.leaves.map((l, j) => (
            <g key={`${b.label}-${j}`}>
              <line
                className="bp-draw"
                x1={b.hub.x}
                y1={b.hub.y}
                x2={l.x}
                y2={l.y}
                pathLength={1}
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1}
                style={
                  {
                    "--d": `${760 + i * 170 + j * 70}ms`,
                  } as React.CSSProperties
                }
              />
              <circle
                className="bp-pop"
                cx={l.x}
                cy={l.y}
                r={3}
                fill="currentColor"
                fillOpacity={0.7}
                style={
                  {
                    "--d": `${820 + i * 170 + j * 70}ms`,
                  } as React.CSSProperties
                }
              />
            </g>
          ))}
          <circle
            className="bp-pop"
            cx={b.hub.x}
            cy={b.hub.y}
            r={6}
            fill="currentColor"
            style={{ "--d": `${420 + i * 170}ms` } as React.CSSProperties}
          />
          <g
            className="bp-pop"
            style={{ "--d": `${500 + i * 170}ms` } as React.CSSProperties}
          >
            <Label
              x={b.hub.x}
              y={b.hub.y + (Math.sin((b.deg * Math.PI) / 180) > 0.1 ? 18 : -12)}
            >
              {b.label}
            </Label>
          </g>
        </g>
      ))}

      {CROSS.map(([a, b], i) => (
        <line
          key={i}
          className="bp-draw"
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          pathLength={1}
          stroke="currentColor"
          strokeOpacity={0.26}
          strokeWidth={1}
          style={{ "--d": `${1820 + i * 110}ms` } as React.CSSProperties}
        />
      ))}

      <circle
        className="bp-pop"
        cx={CX}
        cy={CY}
        r={8}
        fill="currentColor"
        style={{ "--d": "0ms" } as React.CSSProperties}
      />
    </svg>
  );
}

function Scene({ step }: { step: number }) {
  if (step === 0) return <Discovery />;
  if (step === 1) return <Execution />;
  return <Learning />;
}

export function KnowledgeEngine() {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  // The scrub only runs where the stage actually pins. Matching the lg
  // breakpoint in JS rather than guessing, so the two never disagree.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    // matchMedia is client-only, so this has to settle in an effect
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pinned: how far through the track we are picks the scene. -top / scrollable
  // is 0 the moment the stage sticks and 1 the moment it lets go, so the three
  // scenes divide the hold evenly.
  useEffect(() => {
    if (!pinned) return;
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / scrollable));
      setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  // Unpinned: nothing is driving the scenes, so run them on a timer. Execution
  // holds a real button, so the timer would pull the scene out from under
  // anyone reaching for it — it stops once the reader is on that step.
  useEffect(() => {
    if (pinned || step === 1) return;
    const id = setTimeout(
      () => setStep((s) => (s + 1) % STEPS.length),
      CYCLE_MS,
    );
    return () => clearTimeout(id);
  }, [pinned, step]);

  // A step is a scroll position now, not a state, so clicking one scrolls to
  // the middle of its band rather than setting it behind the scroll's back.
  function goTo(i: number) {
    const el = track.current;
    if (!pinned || !el) {
      setStep(i);
      return;
    }
    const r = el.getBoundingClientRect();
    const scrollable = r.height - window.innerHeight;
    // no behavior: the html rule already smooths this, and already turns it
    // off under prefers-reduced-motion
    window.scrollTo({
      top: window.scrollY + r.top + (scrollable * (i + 0.5)) / STEPS.length,
    });
  }

  return (
    <section
      id="graph"
      className="w-full scroll-mt-[92px] border-t"
      style={{
        borderColor: "var(--bp-hairline)",
        background: "var(--bp-wash)",
      }}
    >
      {/* The track is the scroll budget. The stage sticks inside it, so it
          holds for the track's height minus one viewport and then releases on
          its own — no scroll hijacking, no wheel handlers, nothing to get
          stuck behind. */}
      <div
        ref={track}
        // The track height is CSS, not state: `pinned` is false on the first
        // render and only settles in an effect, so driving the height from it
        // would shift the layout a frame after paint.
        className="relative py-[clamp(80px,12vh,152px)] lg:h-[300vh] lg:py-0"
      >
        {/* py clears the sticky nav at the top and gives the same breathing
            room at the bottom, so the centred content never sits under it */}
        <div className="px-6 sm:px-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-24">
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="bp-steps">
              <h2
                className="max-w-[16ch] text-balance leading-[1.04] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
              >
                How firstocean works.
              </h2>

              {/* All three steps stay visible as a row; only the current one is
                  lit, and only its copy is on the page. Not role="tablist":
                  these are also driven by scroll position, and tab semantics
                  would promise arrow-key navigation that does not exist. */}
              <ol className="mt-9 flex flex-wrap gap-2">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={s.title}>
                      {/* Ink on paper until it is this step's turn, then the
                          whole pill inverts. State is carried by the reversal
                          alone, which is why there is no longer a dot inside
                          it and why the resting label is full-strength ink
                          rather than a muted grey: nothing here is disabled,
                          so nothing should read as faded.

                          font-sans overrides the display face .bp-root sets on
                          the page, and `lowercase` is a CSS transform rather
                          than the data, so the accessible name stays capitalised. */}
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? "step" : undefined}
                        className="inline-flex items-center rounded-full border px-5 py-2.5 font-sans text-[0.92rem] font-medium lowercase leading-none tracking-[-0.005em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
                        style={{
                          background: active
                            ? "var(--bp-ink)"
                            : "var(--bp-paper)",
                          borderColor: active
                            ? "var(--bp-ink)"
                            : "var(--bp-hairline-strong)",
                          color: active ? "var(--bp-paper)" : "var(--bp-ink)",
                        }}
                      >
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* key remounts the copy, which is what fades the new step in.
                  The min-height is the tallest of the three bodies: without it
                  the centred grid would shift every time the step changes. */}
              <p
                key={step}
                className="bp-fly mt-10 min-h-[10rem] max-w-[38ch] text-[1.18rem] leading-[1.5] sm:text-[1.32rem]"
                style={{ color: "var(--bp-ink)" }}
              >
                {STEPS[step].body}
              </p>
            </div>

            <div
              className="bp-stage relative aspect-[468/334] overflow-hidden rounded-[var(--bp-r-md)] border"
              style={{
                color: "var(--bp-blue)",
                borderColor: "var(--bp-hairline)",
                background: "var(--bp-paper)",
              }}
            >
              {/* key remounts the scene, which replays its entry animation */}
              <Scene key={step} step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
