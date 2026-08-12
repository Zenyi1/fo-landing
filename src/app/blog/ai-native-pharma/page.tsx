import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlogHeader } from "@/components/blueprint/BlogHeader";
import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { POSTS } from "@/app/blog/posts";
import { CONTACT_EMAIL } from "@/lib/links";

const post = POSTS.find((p) => p.slug === "ai-native-pharma")!;
const { title, blurb: description, published, publishedLabel } = post;

export const metadata: Metadata = {
  title: { absolute: `${title} · firstocean` },
  description,
  alternates: { canonical: "/blog/ai-native-pharma" },
  openGraph: {
    type: "article",
    url: "/blog/ai-native-pharma",
    siteName: "firstocean",
    title,
    description,
    publishedTime: published,
    images: [{ url: post.image, width: 1800, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [post.image],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: published,
  image: `https://first-ocean.com${post.image}`,
  author: { "@type": "Person", name: post.author },
  publisher: { "@type": "Organization", name: "firstocean" },
  mainEntityOfPage: "https://first-ocean.com/blog/ai-native-pharma",
};

/* Diagrams. Landscape ones run to the full column, because the whole point of
   a before/after panel is that both halves are legible at once. The square and
   portrait ones are held to the reading measure: at 1240 they would be taller
   than the viewport and the reader would lose the thread of the paragraph
   above them. */
function Figure({
  src,
  alt,
  width,
  height,
  caption,
  size = "full",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  size?: "full" | "measure";
}) {
  return (
    <figure className={`my-14 ${size === "measure" ? "max-w-[42rem]" : ""}`}>
      <div
        className="overflow-hidden border"
        style={{
          borderColor: "var(--bp-hairline)",
          borderRadius: "var(--bp-r-md)",
          background: "var(--bp-paper)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={
            size === "full"
              ? "(min-width: 1240px) 1240px, 100vw"
              : "(min-width: 720px) 672px, 100vw"
          }
          className="h-auto w-full"
        />
      </div>
      <figcaption
        className="mt-3 max-w-[46rem] text-[0.92rem] leading-relaxed"
        style={{ color: "var(--bp-ink-muted)" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

// The measure every block of body copy is set to, matched to the pre-seed post
// and to the legal pages so that all the reading on the site is one width.
const PROSE =
  "max-w-[46rem] text-[1.08rem] leading-[1.75] [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-3 [&_p]:mt-6 [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-6";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-20 max-w-[30ch] text-balance text-[1.5rem] leading-[1.2] tracking-[-0.025em]"
      style={{ color: "var(--bp-ink)" }}
    >
      {children}
    </h2>
  );
}

export default function AiNativePharmaPost() {
  return (
    <main
      className="bp-root relative w-full"
      style={{ background: "var(--bp-paper)", color: "var(--bp-ink)" }}
    >
      <script
        type="application/ld+json"
        // the object is a literal defined above, so there is nothing here that
        // could carry markup out of user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <BlogHeader backHref="/blog" backLabel="All posts" />

      <article className="mx-auto w-full max-w-[1240px] px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
        <div className="max-w-[46rem]">
          <p
            className="text-[0.82rem] font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--bp-blue)" }}
          >
            {post.kicker}
          </p>
          <h1
            className="mt-5 text-balance leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            {title}
          </h1>
          <p
            className="mt-7 text-[1.15rem] leading-relaxed sm:text-[1.28rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            The phrase usually means a company that bought good tools. It should
            mean a company whose work is done by systems, whose handoffs have
            been designed out, and whose memory is worth more every year than it
            was the year before.
          </p>
          <p
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            <span style={{ color: "var(--bp-ink)" }}>{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={published}>{publishedLabel}</time>
          </p>
        </div>

        <figure className="mt-14">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden"
            style={{
              borderRadius: "var(--bp-r-md)",
              background: "var(--bp-wash)",
            }}
          >
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="mt-16">
          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              &ldquo;AI-native&rdquo; is now said about almost every company in
              the industry, and it has stopped carrying information. Most of the
              time it means one of two things: that the company is unusually
              good at building internal tools, or that it has put a model behind
              a lot of buttons. Both are means. Neither is the thing.
            </p>
            <p>
              An AI-native company is one that has been re-architected so that
              whole workflows &mdash; the sort that today span six roles and
              four handoffs &mdash; are carried out by systems, with people
              placed at the points where judgment is genuinely required. The
              test is not how many people use a model. It is whether output can
              grow without headcount growing with it.
            </p>
            <p>
              That distinction is the entire argument for why firstocean exists,
              so it is worth setting out properly.
            </p>

            <H2>Growth that does not scale with people</H2>
            <p>
              A small business grows by adding people and resources roughly in
              proportion to what it produces. A startup is a bet that technology
              breaks that proportionality. Software broke it for anything you
              can write down: rules, forms, thresholds, state machines. A
              handful of engineers can index the web, because indexing the web
              is one rule applied a trillion times.
            </p>
            <p>
              But software only scales the reducible part of the work, the
              patterns you can specify in advance. Everything else stayed
              manual, and in drug development almost everything else is the
              work. A protocol amendment, a change order priced against a signed
              scope, a monitoring report that does not agree with the invoice
              attached to it: these are not edge cases at the margin of a
              codifiable process. They are the process.
            </p>
            <p>
              Large models are the first tool that scales the irreducible part.
              Put plainly:
            </p>
            <ul>
              <li>
                Software scales{" "}
                <strong style={{ color: "var(--bp-ink)" }}>
                  reducible complexity
                </strong>
                , the patterns we can codify.
              </li>
              <li>
                AI scales{" "}
                <strong style={{ color: "var(--bp-ink)" }}>
                  irreducible complexity
                </strong>
                , the contexts nobody can enumerate in advance.
              </li>
            </ul>
            <p>
              The unit of execution changes with it. It stops being a person
              holding a tool and becomes a system running inside guardrails,
              with an expert accountable for what comes out.
            </p>
          </div>

          <Figure
            src="/blog/ai-native/scaling.png"
            alt="Two panels. On the left, a large pyramid of people feeds a row of assets. On the right, four people operate a system that fans out to the same row of assets."
            width={1665}
            height={822}
            caption="Two ways to grow a pipeline. On the left, output is a function of headcount. On the right, output is a function of how good the system is."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              Sublinear scaling is the goal: an asset base that grows faster
              than the operating footprint behind it. Which raises the obvious
              question. If models are this good, why doesn&rsquo;t handing every
              person in the current organisation an assistant get you there?
            </p>

            <H2>Conway&rsquo;s law, and why point tools never move the number</H2>
            <p>
              Conway&rsquo;s law is the observation that an organisation ships
              products shaped like its own communication structure. Two teams,
              two experiences. A frontend team and a backend team, and friction
              exactly at the seam where they meet.
            </p>
            <p>
              It can also be run in reverse: rather than letting the org chart
              dictate the system, design the org chart that would produce the
              system you want. Amazon wanted a fast-moving set of independent
              cloud services and built two-pizza teams to get them.
            </p>
            <p>
              Now apply it to a biotech. Activating one trial site touches
              feasibility, contracting, budget negotiation, regulatory
              documents, site payments, vendor management, quality review and
              finance, and each of those is a different desk. Every desk is
              locally excellent. The cost is everything between them: the status
              meeting, the person on leave, the context that has to be
              re-explained, the document that is authoritative in one system and
              stale in another.
            </p>
            <p>
              Give each of those desks a copilot and you have eight faster desks
              and the same eight handoffs. The fragmentation is structural, so
              the fix has to be structural too.
            </p>
          </div>

          <Figure
            src="/blog/ai-native/conway.png"
            alt="Two panels. On the left, five separate function-based teams push work into a tangled network. On the right, one cross-functional team produces a single ordered system."
            width={1800}
            height={1043}
            caption="Function-shaped teams produce a function-shaped system. The shape of the organisation is the shape of what it can build."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              So the useful question is not &ldquo;where could someone here use
              a model?&rdquo; It is{" "}
              <strong style={{ color: "var(--bp-ink)" }}>
                where does this work genuinely need human judgment, and can
                everything between those points be automated?
              </strong>{" "}
              Some of the checkpoints are load-bearing &mdash; patient safety,
              regulatory accountability, anything with a signature and a
              liability attached &mdash; and those stay exactly where they are.
              A surprising number of the rest exist because a job description
              needed a box.
            </p>
          </div>

          <Figure
            src="/blog/ai-native/execution.png"
            alt="Left: a nine-box org chart of specialised recruitment roles. Right: a small group of super-users operating one system that executes the workflow end to end."
            width={1800}
            height={992}
            caption="The same workflow twice: once as a role-based org chart, once as a single accountable owner running a system end to end. The human job moves from producing the artefact to setting the objective, checking the edge cases and granting the approval."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <H2>Why almost nobody does this</H2>
            <p>
              Most companies are not incentivised to reorganise themselves
              around what systems can now do. Standing teams, entrenched
              expertise and years of local optimisation all pull the other way.
              Vendors cannot sell a product that requires a reorganisation to
              work, and buyers cannot get sign-off for a return that arrives in
              year three, so the market fills up with point solutions that ramp
              in a fortnight and cap out at ten per cent. The honest version is
              either built in from the beginning or arrived at through a painful
              transformation.
            </p>
            <p>
              The prize is worth the difficulty. Call it operational alpha: not
              a percentage off a budget line, but a change in how the company
              scales. Twice the assets on a modestly larger team, and the
              marginal operating cost of the next programme heading toward zero.
              In an industry where the cost of a slow programme is counted in
              years of patients&rsquo; lives, that is not a margin story.
            </p>

            <H2>The tax nobody books</H2>
            <p>
              There is a second half to this, and it is the one that decides
              whether the first half holds. Come back from two weeks away and
              the morning goes on reconstruction: the threads, the comments, the
              three versions of one decision. Studies of knowledge work put the
              search for information a company already owns at twenty to thirty
              per cent of the week. More than a day, every week, spent on
              archaeology.
            </p>
            <p>
              Engineers solved a version of this decades ago. They instrument.
              Requests are logged in enough detail to reconstruct what happened,
              errors route to the right team with the context attached, and
              flows can be traced end to end. It costs discipline and a few per
              cent of effort, and it is the only reason a production system can
              be debugged at all.
            </p>
            <p>
              A company can be instrumented the same way: pay five per cent up
              front to capture context at the source instead of twenty per cent
              later to excavate it. In biotech the source material already
              exists. The contract, the protocol, the change order, the
              CRO&rsquo;s monthly report and the mail thread that changed the
              scope are all sitting there. They are simply held as files rather
              than as facts.
            </p>

            <H2>Memory that appreciates</H2>
            <p>
              In most companies knowledge is a wasting asset. It begins losing
              value the moment it is created. At six months the document is hard
              to find, at a year the context around it has gone, at two years
              the person who held that context has moved on. Institutional
              amnesia is treated as a fact of life rather than as a choice.
            </p>
            <p>
              Instrumented, the same knowledge compounds. Every piece of
              captured context is worth more later than it was on the day it was
              written, because it can be joined to things that had not happened
              yet.
            </p>
          </div>

          <Figure
            src="/blog/ai-native/memory.png"
            alt="Two timelines. In the wasting organisation the grid of records fades from month one to year one. In the compounding organisation it grows denser and better connected over the same period."
            width={1500}
            height={1526}
            size="measure"
            caption="The same company under two information architectures. Only one of them is worth more in year three than it was in month one."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              The returns are non-linear and back-loaded, which is why so few
              companies ever collect them. Month one feels like pure overhead.
              By month twelve there is a connected record of how every decision
              was reached. By year two, patterns are visible that no individual
              could have held in their head. By year three the system recalls
              the company better than its longest-serving employee.
            </p>

            <H2>One document, many uses</H2>
            <p>
              Why instrument so heavily? Because retrieval cost decides reuse.
              If finding an old analysis and rebuilding its context costs more
              than redoing the work, nobody reuses anything &mdash; and because
              everybody knows that in advance, nothing gets captured properly in
              the first place. It is a stable and expensive equilibrium.
            </p>
            <p>
              Drop the cost of retrieval close to zero and it inverts. A single
              well-captured object starts serving uses that were not imagined
              when it was captured. Take one master services agreement with a
              CRO, read once and held as structured facts. It then:
            </p>
            <ul>
              <li>
                prices the change order that arrives eight months later against
                what was actually signed, rather than against what the vendor
                says was signed
              </li>
              <li>
                rebuilds the monthly accrual from evidence of delivery instead
                of from an estimate
              </li>
              <li>
                produces the audit trail when an inspector asks how a payment
                was approved
              </li>
              <li>
                sets the floor for the next negotiation with the same vendor
              </li>
              <li>
                answers a finance hire two years later who wants to know why
                that clause is written the way it is
              </li>
            </ul>
          </div>

          <Figure
            src="/blog/ai-native/recomposability.png"
            alt="Concentric rings around a single document: immediate use cases nearest, downstream use cases beyond them, and faint future use cases in the outermost ring."
            width={1400}
            height={1491}
            size="measure"
            caption="Capture once, and the uses keep arriving. Most of them are not foreseeable at the moment of capture, which is exactly why cheap retrieval matters more than good filing."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              This only works small. In a fifty-thousand-person company spanning
              dozens of divisions, the coordination cost of making those
              connections swallows the benefit. In a thirty-person company
              working off one record, they happen by default. Conway&rsquo;s law
              again, one level down: information architecture shapes decisions.
              If the information is siloed, so is the thinking.
            </p>

            <H2>A second seat at the table</H2>
            <p>
              Push this far enough and the organisation acquires something it
              did not have before: a reasoning system grounded in its own
              history, with total recall of it. Not a search box over a drive.
              Something that:
            </p>
            <ul>
              <li>
                surfaces, when an indication is proposed, that it was assessed
                two years ago, why it was deferred, and which of those reasons
                no longer hold
              </li>
              <li>
                answers a liability question by connecting a contract clause to
                a feasibility constraint and to an adverse-event pattern from an
                old trial &mdash; the risk that is only visible at the
                intersection
              </li>
              <li>
                argues against the decision you are about to make, using your
                own past reasoning, with perfect recall and no ego
              </li>
            </ul>
          </div>

          <Figure
            src="/blog/ai-native/exocortex.jpg"
            alt="Layered translucent planes with people connected to them by dotted paths, representing shared institutional memory."
            width={1600}
            height={1357}
            size="measure"
            caption="Institutional memory as a system rather than as a set of drives and a few long-serving people."
          />

          <div className={PROSE} style={{ color: "var(--bp-ink-muted)" }}>
            <p>
              Within a few years it will look strange to write a development
              plan without asking a model that has read everything the company
              has ever done. It does not replace the experts. It is another seat
              at the table, with better recall than anyone else in the room.
            </p>

            <H2>Why this has to be built for you, not by you</H2>
            <p>
              The four pieces are one loop. Instrumentation captures the context
              that makes reuse possible. Reuse makes the systems good enough to
              justify redesigning the workflow. Redesign collapses the handoffs
              and delivers sublinear scaling. Sublinear scaling keeps the
              company small enough that instrumentation stays cheap. Miss one
              and the other three stall.
            </p>
            <p>
              The usual conclusion drawn from that loop is that each company has
              to build the whole thing itself, from the ground up. For a company
              with a research platform, a balance sheet and a hundred engineers,
              that is right, and it is the correct thing for them to do.
            </p>
            <p>
              It is not available to anybody else, and almost nobody else is who
              the next decade of medicine depends on. AI-driven discovery is
              lowering the cost of reaching a credible asset, which means far
              more sponsors, each much smaller: twenty people, one good
              molecule, no internal platform team and no reason to build one.
              Every one of them inherits the same administrative shell &mdash;
              the same contracts, accruals, filings, quality agreements and
              vendor mail &mdash; and today they carry it with people, because
              the alternative is a two-year engineering programme they cannot
              staff.
            </p>
            <p>
              That gap is what firstocean is built for, and it is why the
              product is not a copilot bolted onto each existing seat. A copilot
              preserves the handoffs this whole piece has been arguing against.
              What a small company needs is the substrate: one record of itself,
              read from the contracts, invoices, protocols, filings and mail it
              already has; agents that carry the work between the checkpoints
              rather than assisting at each of them; and every action delivered
              with the document it came from, so a rebuilt accrual or a
              challenged invoice can be checked in a few seconds instead of
              trusted.
            </p>
            <p>
              A twenty-person biotech should not have to become a software
              company to get compounding memory and sublinear scaling. It should
              be able to start with both on day one, and spend its people on the
              science.
            </p>
            <p>
              If you are running finance or operations at a clinical-stage
              biotech, we would like to map what your week actually goes on, and
              show you what the agents can take over. You can{" "}
              <Link href="/intelligence#contact">book thirty minutes</Link> or
              write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p style={{ color: "var(--bp-ink)" }}>&mdash; {post.author}</p>
          </div>
        </div>
      </article>

      <BlueprintFooter />
    </main>
  );
}
