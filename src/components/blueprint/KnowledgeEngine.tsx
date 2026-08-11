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
    body: "Agents act on that model and carry routine work the whole way through, stopping at the one step that should stay a person's.",
  },
  {
    title: "Growth",
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
   Systems on the left, converging into a model that assembles on the right.
   The chips are the things you already pay for; nothing here asks anyone to
   fill in a form, which is the whole claim of the step. */

const SOURCES = ["Contracts", "Invoices", "eTMF", "Vendor mail", "Ledger"];
const JUNCTION = { x: 216, y: CY };

const MODEL = [
  { label: "company", x: 296, y: 96, leaves: [[352, 58], [380, 112]] },
  { label: "drug", x: 368, y: CY, leaves: [[424, 142], [424, 196]] },
  { label: "pipeline", x: 296, y: 238, leaves: [[352, 278], [380, 222]] },
] as const;

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
      aria-label="Contracts, invoices, the eTMF, vendor mail and the ledger feed into a model of the company, the drug and the pipeline."
    >
      {SOURCES.map((label, i) => {
        const y = 60 + i * 44;
        return (
          <g
            key={label}
            className="bp-fly"
            style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
          >
            <rect
              x={10}
              y={y}
              width={112}
              height={26}
              rx={6}
              fill="var(--bp-paper)"
              stroke="currentColor"
              strokeOpacity={0.3}
            />
            <text x={24} y={y + 17} fontSize={11} fill="var(--bp-ink)">
              {label}
            </text>
            <line
              className="bp-draw"
              x1={122}
              y1={y + 13}
              x2={JUNCTION.x}
              y2={JUNCTION.y}
              pathLength={1}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="3 3"
              style={{ "--d": `${380 + i * 90}ms` } as React.CSSProperties}
            />
          </g>
        );
      })}

      <circle
        className="bp-pop"
        cx={JUNCTION.x}
        cy={JUNCTION.y}
        r={5}
        fill="currentColor"
        style={{ "--d": "820ms" } as React.CSSProperties}
      />

      {MODEL.map((hub, i) => (
        <g key={hub.label}>
          <line
            className="bp-draw"
            x1={JUNCTION.x}
            y1={JUNCTION.y}
            x2={hub.x}
            y2={hub.y}
            pathLength={1}
            stroke="currentColor"
            strokeOpacity={0.45}
            strokeWidth={1}
            style={{ "--d": `${900 + i * 140}ms` } as React.CSSProperties}
          />
          {hub.leaves.map(([lx, ly], j) => (
            <g key={`${lx}-${ly}`}>
              <line
                className="bp-draw"
                x1={hub.x}
                y1={hub.y}
                x2={lx}
                y2={ly}
                pathLength={1}
                stroke="currentColor"
                strokeOpacity={0.32}
                strokeWidth={1}
                style={
                  {
                    "--d": `${1180 + i * 140 + j * 90}ms`,
                  } as React.CSSProperties
                }
              />
              <circle
                className="bp-pop"
                cx={lx}
                cy={ly}
                r={3}
                fill="currentColor"
                fillOpacity={0.75}
                style={
                  {
                    "--d": `${1260 + i * 140 + j * 90}ms`,
                  } as React.CSSProperties
                }
              />
            </g>
          ))}
          <circle
            className="bp-pop"
            cx={hub.x}
            cy={hub.y}
            r={6}
            fill="currentColor"
            style={{ "--d": `${1000 + i * 140}ms` } as React.CSSProperties}
          />
          <g
            className="bp-pop"
            style={{ "--d": `${1080 + i * 140}ms` } as React.CSSProperties}
          >
            <Label x={hub.x} y={hub.y - 13}>
              {hub.label}
            </Label>
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ── scene 2 · execution ──────────────────────────────────────────────────
   The one scene that is not a drawing. It runs a real chain — invoice in,
   audited against the protocol, discrepancy found, email drafted — and then
   stops, because the last step is a person's. The Send button is a real
   button: the reader is the human in the loop rather than being told there is
   one. */

const CHAIN = [
  {
    t: "Invoice received",
    d: "Kelvin CRO · $184,200 · Q3 monitoring",
  },
  {
    t: "Audited against the protocol",
    d: "Every line matched to the schedule of assessments",
  },
  {
    t: "Discrepancy flagged",
    d: "42 monitoring visits billed. The protocol schedules 38.",
  },
];

function Execution() {
  const [sent, setSent] = useState(false);

  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 p-5 sm:p-6">
      <ol className="flex flex-col gap-2.5">
        {CHAIN.map((s, i) => (
          <li
            key={s.t}
            className="bp-fly flex items-start gap-3"
            style={{ "--d": `${i * 260}ms` } as React.CSSProperties}
          >
            <span
              aria-hidden
              className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "currentColor" }}
            />
            <span className="min-w-0">
              <span
                className="block text-[0.82rem] font-medium"
                style={{ color: "var(--bp-ink)" }}
              >
                {s.t}
              </span>
              <span
                className="block text-[0.78rem] leading-snug"
                style={{ color: "var(--bp-ink-muted)" }}
              >
                {s.d}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div
        className="bp-fly rounded-[var(--bp-r-sm)] border p-3.5"
        style={
          {
            "--d": "800ms",
            borderColor: "var(--bp-hairline-strong)",
            background: "var(--bp-paper)",
          } as React.CSSProperties
        }
      >
        <p
          className="text-[0.7rem] uppercase tracking-[0.1em]"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          Drafted · to billing@kelvincro.com
        </p>
        <p
          className="mt-1.5 text-[0.82rem] leading-snug"
          style={{ color: "var(--bp-ink)" }}
        >
          Visits 39–42 sit outside the schedule of assessments. Please issue a
          credit note for <span className="tnum">$19,400</span>.
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          {sent ? (
            <p
              role="status"
              className="text-[0.78rem]"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              Sent. <span className="tnum">$19,400</span> claimed back.
            </p>
          ) : (
            <p
              className="text-[0.78rem]"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              Waiting on you.
            </p>
          )}

          <button
            type="button"
            onClick={() => setSent(true)}
            disabled={sent}
            className={`${sent ? "" : "bp-await"} inline-flex items-center gap-1.5 whitespace-nowrap rounded-[var(--bp-r-sm)] px-4 py-2 text-[0.82rem] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)] disabled:opacity-45`}
            style={{ background: "var(--bp-blue)" }}
          >
            {sent ? "Sent" : "Send"}
            {sent ? null : <span aria-hidden>→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── scene 3 · growth ─────────────────────────────────────────────────────
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

function Growth() {
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
  return <Growth />;
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
            <div>
              <h2
                className="max-w-[16ch] text-balance leading-[1.04] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)" }}
              >
                How firstocean works.
              </h2>

              <ol className="mt-10 space-y-1">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active}
                        className="w-full border-l-2 py-4 pl-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
                        style={{
                          borderColor: active
                            ? "var(--bp-blue)"
                            : "var(--bp-hairline)",
                        }}
                      >
                        <h3
                          className="text-[1.12rem] tracking-[-0.015em]"
                          style={{
                            color: active ? "var(--bp-blue)" : "var(--bp-ink)",
                          }}
                        >
                          {s.title}
                        </h3>
                        <p
                          className="mt-1.5 max-w-[46ch] text-[0.98rem] leading-relaxed"
                          style={{ color: "var(--bp-ink-muted)" }}
                        >
                          {s.body}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div
              className="bp-stage relative aspect-[468/334] overflow-hidden rounded-[var(--bp-r-md)] border"
              style={{
                color: "var(--bp-blue)",
                borderColor: "var(--bp-hairline)",
                background: "var(--bp-paper)",
              }}
            >
              <div
                aria-hidden
                className="bp-grid pointer-events-none absolute inset-0 opacity-70"
              />
              {/* key remounts the scene, which replays its entry animation */}
              <Scene key={step} step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
