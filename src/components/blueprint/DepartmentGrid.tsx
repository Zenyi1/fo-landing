"use client";

import { useEffect, useRef, useState } from "react";

/* ── data ───────────────────────────────────────────────────────────────────

   Every department of a clinical-stage biotech except research and discovery.
   The tile face carries the name and one concrete line; the full list of what
   sits inside a department only appears once it is opened.                   */

type Department = {
  name: string;
  /* the tile face: one concrete thing the agents do here */
  line: string;
  /* the detail panel's opening paragraph */
  lead: string;
  items: string[];
};

const DEPARTMENTS: Department[] = [
  {
    name: "Finance and accounting",
    line: "Closes the books on what happened, not on what a vendor estimated.",
    lead: "The agents keep the ledger tied to the documents that created it. Accruals are rebuilt from work orders and delivery evidence rather than from a vendor's guess, close runs continuously instead of in the first week of the month, and burn and runway move the day a change order lands.",
    items: [
      "Accrual, burn and runway",
      "AP, PO matching, invoice approval routing",
      "Budget versus actual by program, study, site and vendor",
      "Month-end close, journal entries, GL mapping",
      "Audit prep and workpapers — the annual six-week fight over accrual judgment",
      "Treasury: laddering $50M to $200M of cash across T-bills by hand",
      "FX exposure on European and Asian CROs",
      "R&D tax credits, federal and state, plus UK and Australia rebates",
      "Grant accounting for NIH, BARDA and CARB-X: indirect rates, FFATA, cost allowability",
      "Payroll, benefits, PEO management",
      "Cap table, 409A, option grants, exercise processing",
      "If public: 10-Q and 10-K, SOX controls, XBRL, disclosure committee",
    ],
  },
  {
    name: "Procurement and vendor management",
    line: "Runs the bid, reads the change order, holds the supplier to the signed scope.",
    lead: "Most of the money leaves the building through a handful of suppliers, and most of it moves on paperwork nobody has time to check line by line. The agents run the bid, price the scope, and read every change order against what was actually agreed.",
    items: [
      "RFP issuance, bid grids, bid defense meetings",
      "MSAs, work orders, change order review and pushback",
      "Vendor qualification and requalification audits",
      "Quality agreements — distinct from the commercial contract, and usually inconsistent with it",
      "Governance meetings, KPI scorecards, escalation",
      "Sponsor oversight evidence, which regulators inspect for",
    ],
  },
  {
    name: "Legal and contracts",
    line: "Redlines the same six clauses, and never misses a reversion date.",
    lead: "Legal volume at this stage is repetition: dozens of CDAs a month, the same clauses, negotiated again. The agents redline against your positions, then track every obligation the signed version created — especially the ones with a date and a consequence attached.",
    items: [
      "CDA flow, dozens a month, mostly redlines on the same six clauses",
      "Clinical trial agreements with each site, negotiated individually, plus site budgets",
      "Consulting and advisory board agreements, KOL contracts",
      "Material transfer agreements",
      "In-license obligations from universities: diligence milestones, annual fees, sublicense revenue share, reporting deadlines that trigger reversion if missed",
      "Collaboration and co-development agreements, milestone and royalty tracking",
      "Entity management, subsidiaries, board minutes and consents",
      "Insurance: D&O, clinical trial liability by country, certificates demanded by every site",
    ],
  },
  {
    name: "Intellectual property administration",
    line: "Holds the docket and the annuity calendar across fifty jurisdictions.",
    lead: "A patent docket is a calendar with an irreversible consequence at the end of it, kept across thirty to fifty jurisdictions by an outside firm whose bill nobody can read. The agents hold both the dates and the spend.",
    items: [
      "Patent docketing, office action deadlines",
      "Annuity and maintenance fees across 30 to 50 jurisdictions",
      "Outside counsel spend, which is opaque and among the top five line items",
      "Inventorship and invention disclosure records",
      "Freedom-to-operate monitoring, competitor filing watch",
    ],
  },
  {
    name: "Clinical operations",
    line: "Reconciles investigator payments against the visits that actually happened.",
    lead: "The agents work the operational and financial layer of the trial rather than the medicine: what each site was contracted for, what it has actually done, what it is owed, and which of the separately contracted vendors is behind.",
    items: [
      "Site feasibility and selection",
      "Site contracting and budget negotiation",
      "Investigator payments, per patient per visit, reconciled against actual visits — chronically wrong in both directions",
      "Enrollment forecasting and recruitment vendor management",
      "Monitoring visit reports, query resolution, protocol deviations",
      "Oversight of central lab, imaging core, IRT/RTSM and ePRO, all separately contracted",
      "Study startup: IRB and ethics committee submissions, country regulatory filings, import licences",
      "Trial Master File completeness, the thing inspectors open first",
      "Drug supply to sites, depot inventory, temperature excursion handling",
    ],
  },
  {
    name: "Regulatory affairs",
    line: "Tracks every promise made to a health authority, and the date it comes due.",
    lead: "The agents keep the submission assembled continuously rather than in the six weeks before it is due, and hold the running list of every commitment the company has made to a regulator, each with its deadline.",
    items: [
      "IND and CTA filings, amendments, annual reports, DSURs",
      "eCTD publishing and submission management",
      "Health authority meeting requests and briefing books",
      "Commitment tracking: every promise made to FDA, and its due date",
      "Designation applications: orphan, fast track, breakthrough, priority review voucher",
      "Labelling, and regulatory intelligence by jurisdiction",
    ],
  },
  {
    name: "Quality",
    line: "Keeps SOPs, CAPAs and training records inspection-ready year round.",
    lead: "Inspection readiness is a state, not a project. The agents keep SOPs in periodic review, CAPAs moving, training assigned and completed, and the evidence filed — so the state holds without a scramble when the notice arrives.",
    items: [
      "SOP authoring, periodic review, training assignment and completion records",
      "Deviations, CAPAs, change control",
      "Internal audits, vendor audits, site audits, inspection readiness",
      "Computer system validation for every system the company buys, including ours",
      "Batch record review and disposition, QP release in the EU",
    ],
  },
  {
    name: "CMC and supply chain",
    line: "Books the slot, and checks the CoA against what was ordered and paid for.",
    lead: "Manufacturing runs on slots, lead times and paperwork that has to match. A missed CDMO booking costs six months. The agents hold the schedule and reconcile what arrived against what was ordered, released and invoiced.",
    items: [
      "Tech transfer project management between sites",
      "CDMO slot booking and capacity reservation, where a missed slot costs six months",
      "Certificate of analysis reconciliation against what was ordered and paid for",
      "Long-lead raw materials, single-source components",
      "Stability program scheduling and pull points",
      "Cold chain logistics, customs, importer of record, export licences",
      "Comparator drug sourcing for controlled trials, expensive and semi-gray market",
    ],
  },
  {
    name: "Pharmacovigilance",
    line: "Runs the clocks: seven day, fifteen day, and the weekly literature screen.",
    lead: "Safety runs on deadlines that do not move. The agents handle intake, coding and narrative drafting, hold the expedited reporting clocks, and keep the mandated literature screen from being somebody's Friday afternoon.",
    items: [
      "Case intake, MedDRA coding, narrative writing",
      "Expedited reporting clocks to FDA and EMA, 7 and 15 day",
      "Mandated weekly literature screening",
      "Aggregate reports, signal detection",
      "Safety data exchange agreements with every partner",
    ],
  },
  {
    name: "Program and portfolio management",
    line: "Reprices the timeline against runway the day enrollment slips.",
    lead: "One integrated critical path across a dozen vendors, and the ability to answer the only question that matters when it moves: enrollment slips three months, what happens to runway and to the Series B.",
    items: [
      "Integrated timeline and critical path across a dozen vendors",
      "Scenario modelling: enrollment slips three months, what happens to runway and to the Series B",
      "Milestone tracking against financing triggers",
      "Board-level program dashboards",
    ],
  },
  {
    name: "Corporate, IR and business development",
    line: "Keeps the data room assembled, because it is your contract graph reformatted.",
    lead: "A data room is the contract graph in a different format. The agents keep it assembled between raises rather than built under deadline, and track who has seen what through a partnering process.",
    items: [
      "Data room assembly and maintenance, which is your contract graph reformatted",
      "Board decks, board consents, investor updates",
      "Diligence Q&A tracking during a raise or a partnering process",
      "Partnering: CDA flow around JPM and BIO, non-confidential decks, tracking who saw what",
    ],
  },
  {
    name: "Healthcare compliance",
    line: "Reports every transfer of value, and screens every name before it is paid.",
    lead: "Every payment to a physician is reportable and every counterparty has to be screened. The agents do both from the payment record itself, on both sides of the Atlantic.",
    items: [
      "Sunshine Act and Open Payments reporting on every HCP payment",
      "Debarment and exclusion screening on every investigator, vendor and consultant",
      "FCPA exposure at ex-US sites",
      "Transfer of value reporting in the EU",
    ],
  },
  {
    name: "People and IT",
    line: "Assigns the training, reviews the access, keeps the record for twenty-five years.",
    lead: "The regulated parts of running a company: who was trained and when, who has access to which system, who reviewed that access, and how long every one of those records has to survive.",
    items: [
      "Recruiting, onboarding, GxP training assignment",
      "Consultant and fractional staff management, which is how most of these companies are actually staffed",
      "Part 11 compliant access control, periodic access reviews",
      "Records retention at regulated periods, often 25 years",
    ],
  },
];

/* ── layout ─────────────────────────────────────────────────────────────────

   Deliberately irregular. At lg the rows alternate 1+2 and 2+1 so no two rows
   break in the same place, and every row sizes to its own content, so the block
   reads as a drawn plan rather than as a table.

   The spans still have to close: 2 for the research cell, then 7 narrow and 6
   wide departments is 21 units, exactly seven rows of three. A wide cell never
   starts in the last column, so no row is left with a hole in it. Below lg
   every cell is one column wide and the 14 of them fill two columns exactly. */
const WIDE = new Set([2, 3, 6, 7, 10, 11]);

/* One hue per department, laid in so that neighbouring colour means related
   work: the money departments in sand, the paper ones in clay, the regulated
   middle of the company in teal through blue, the corporate ones in plum, and
   the two that mostly keep records in slate. All are low-chroma and all are
   laid at 20% over white, which holds --bp-ink-muted above 6:1 on every cell.
   Indexed to DEPARTMENTS. Research and discovery takes none of them: it is the
   one white cell, which is what marks it. */
const SAND = "#8a6a2f";
const CLAY = "#8f4f3c";
const TEAL = "#2b6f6b";
const SAGE = "#4a6b3f";
const BLUE = "var(--bp-blue)";
const PLUM = "#5f4076";
const SLATE = "#4a5568";

const TINT = [
  SAND, // finance
  SAND, // procurement
  CLAY, // legal
  CLAY, // IP
  TEAL, // clinical operations
  BLUE, // regulatory
  BLUE, // quality
  SAGE, // CMC
  TEAL, // pharmacovigilance
  PLUM, // program and portfolio
  PLUM, // corporate, IR and BD
  SLATE, // healthcare compliance
  SLATE, // people and IT
];

const CELL = "relative flex flex-col";
const FACE = "relative flex flex-1 flex-col p-6 sm:p-7";
const LEDGER = "text-[0.72rem] tracking-[0.14em]";

/* ── the grid ───────────────────────────────────────────────────────────── */

export function DepartmentGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const [state, setState] = useState<"hidden" | "shown" | "instant">("hidden");
  const root = useRef<HTMLDivElement>(null);
  // so closing the lifted-out card returns focus to the card that opened it
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  // The cells assemble one after another the first time the block scrolls into
  // view. One-shot: it does not re-hide on the way back up.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // matchMedia is client-only, so this must settle in an effect
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("instant");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setState("shown");
            io.disconnect();
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // `order` is the cell's place in the build, not its index in DEPARTMENTS —
  // the research cell is drawn first and counts as 0.
  function build(order: number): React.CSSProperties {
    const visible = state !== "hidden";
    return {
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(18px) scale(0.985)",
      transition:
        state === "instant"
          ? "none"
          : `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${order * 55}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${order * 55}ms`,
    };
  }

  return (
    <>
      <div
        ref={root}
        // The rules between cells are the container's own fill showing through
        // 1px gaps, with a ring of the same around the outside. --bp-blue-tint
        // rather than an ink hairline: a blueprint rule reads as drawn, and it
        // holds its edge against both the white cell and the tinted ones.
        className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--bp-r-md)] sm:grid-cols-2 lg:grid-cols-3"
        style={{
          background: "var(--bp-blue-tint)",
          boxShadow: "0 0 0 1px var(--bp-blue-tint)",
        }}
      >
        {/* the one department we do not run: the only white cell in a grid of
          colour, so it reads as the gap in the plan rather than as one more
          tile. */}
        <div
          className={`${CELL} lg:col-span-2`}
          style={{ background: "var(--bp-paper)", ...build(0) }}
        >
          <div className={FACE}>
            <h3
              className="text-[1.4rem] tracking-[-0.02em] sm:text-[1.6rem]"
              style={{ color: "var(--bp-blue)" }}
            >
              Research and discovery
            </h3>
            <p
              className="mt-3 max-w-[42ch] text-[1rem] leading-relaxed"
              style={{ color: "var(--bp-ink-muted)" }}
            >
              Stays human, and stays yours. We do not touch discovery, molecule
              design or the decision to run a trial. That is the work you exist
              to do.
            </p>
          </div>
        </div>

        {DEPARTMENTS.map((d, i) => (
          <div
            key={d.name}
            className={`${CELL} bg-[color-mix(in_srgb,var(--tint)_20%,white)] ${WIDE.has(i) ? "lg:col-span-2" : ""}`}
            // the hue goes on as a custom property so the face can mix a deeper
            // pour of the same colour for its hover without restating it
            style={
              { "--tint": TINT[i], ...build(i + 1) } as React.CSSProperties
            }
          >
            {/* the whole face is the control. The button is stretched over it
              rather than wrapped around it, so the heading stays a heading. */}
            <div
              // hover deepens the cell's own colour rather than washing it
              // towards a shared one, so the grid keeps its reading of which
              // departments belong together while a card is under the cursor
              className={`${FACE} group cursor-pointer transition-colors hover:bg-[color-mix(in_srgb,var(--tint)_32%,white)]`}
            >
              <div className="flex justify-end">
                <span
                  aria-hidden
                  className="text-[1.15rem] leading-none transition-transform duration-300 group-hover:scale-125"
                  style={{ color: "var(--bp-hairline-strong)" }}
                >
                  +
                </span>
              </div>

              {/* Inter, not the Geist display face the rest of the page's
                  headings use: at card size the department names are labels
                  rather than headlines, and Inter holds them tighter. */}
              <h3
                className="mt-5 text-balance text-[1.08rem] leading-[1.25] tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {d.name}
              </h3>
              <p
                className="mt-2.5 max-w-[52ch] text-[0.94rem] leading-relaxed"
                style={{ color: "var(--bp-ink-muted)" }}
              >
                {d.line}
              </p>

              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
              >
                <span className="sr-only">{d.name}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {open !== null ? (
        <DepartmentView
          department={DEPARTMENTS[open]}
          onClose={() => {
            const returning = open;
            setOpen(null);
            triggers.current[returning]?.focus();
          }}
        />
      ) : null}
    </>
  );
}

/* ── the card, lifted out ───────────────────────────────────────────────────

   The whole department at once. The page behind is washed rather than dimmed:
   a dark scrim over a paper-white page reads as the lights going out, which is
   not what opening a drawer should feel like. The panel separates on its own
   weight instead — a full-strength rule around it and a long soft shadow.    */

function DepartmentView({
  department,
  onClose,
}: {
  department: Department;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // paint the closed state once, then transition in on the next frame
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    panel.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // keep tabbing inside the panel while it is open
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-8"
      style={{
        background: "color-mix(in srgb, var(--bp-wash) 78%, transparent)",
        backdropFilter: "blur(3px)",
        opacity: shown ? 1 : 0,
        transition: "opacity 0.22s ease",
      }}
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="department-view-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-[940px] overflow-y-auto rounded-t-[var(--bp-r-md)] outline-none sm:max-h-[86vh] sm:rounded-[var(--bp-r-md)]"
        style={{
          background: "var(--bp-paper)",
          color: "var(--bp-ink)",
          boxShadow:
            "0 0 0 1px var(--bp-blue-tint), 0 40px 90px -20px rgba(12, 14, 17, 0.35)",
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(16px) scale(0.97)",
          transition:
            "opacity 0.26s cubic-bezier(0.16,1,0.3,1), transform 0.26s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="sticky top-0 flex items-start justify-between gap-6 border-b px-7 py-6 sm:px-10 sm:py-8"
          style={{
            borderColor: "var(--bp-hairline-strong)",
            background: "var(--bp-paper)",
          }}
        >
          <h3
            id="department-view-title"
            className="text-balance text-[1.6rem] leading-[1.1] tracking-[-0.03em] sm:text-[2.1rem]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {department.name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 shrink-0 rounded-[var(--bp-r-sm)] px-3 py-2 text-[1.2rem] leading-none transition-transform hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bp-blue)]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="px-7 py-8 sm:px-10 sm:py-10">
          <p
            className="max-w-[64ch] text-[1.06rem] leading-relaxed"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            {department.lead}
          </p>

          <p
            className={`mt-10 uppercase ${LEDGER}`}
            style={{ color: "var(--bp-ink-muted)" }}
          >
            What sits here
          </p>

          {/* two columns so even the twelve-item departments land in one view
              rather than behind a scroll */}
          <ul className="mt-4 sm:columns-2 sm:gap-x-12">
            {department.items.map((item) => (
              <li
                key={item}
                className="break-inside-avoid border-t py-3.5 text-[0.97rem] leading-relaxed"
                style={{ borderColor: "var(--bp-hairline)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
