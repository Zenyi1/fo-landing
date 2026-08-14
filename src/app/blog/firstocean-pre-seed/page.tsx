import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlogHeader } from "@/components/blueprint/BlogHeader";
import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { CONTACT_EMAIL } from "@/lib/links";

const title = "Raising our pre-seed to give biotech its week back";
const description =
  "firstocean has raised a pre-seed, backed by Entrepreneurs First and Transpose Platform, to build the agent-first operating system for everything a biotech does other than the science.";

const PUBLISHED = "2026-08-10";
const PUBLISHED_LABEL = "10 August 2026";

export const metadata: Metadata = {
  title: { absolute: `${title} · firstocean` },
  description,
  alternates: { canonical: "/blog/firstocean-pre-seed" },
  openGraph: {
    type: "article",
    url: "/blog/firstocean-pre-seed",
    siteName: "firstocean",
    title,
    description,
    publishedTime: PUBLISHED,
    images: [{ url: "/blog/pre-seed-lab.jpg", width: 2400, height: 1601 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog/pre-seed-lab.jpg"],
  },
};

/* Article structured data. An announcement post is the page most likely to be
   quoted by someone checking whether the company is real, so the machine-
   readable version of the byline and date ships with it. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: PUBLISHED,
  image: "https://first-ocean.com/blog/pre-seed-lab.jpg",
  author: { "@type": "Person", name: "Zenyi" },
  publisher: { "@type": "Organization", name: "firstocean" },
  mainEntityOfPage: "https://first-ocean.com/blog/firstocean-pre-seed",
};

export default function PreSeedPost() {
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
        {/* the title block runs to the reading measure even though the image
            below it runs to the full column */}
        <div className="max-w-[46rem]">
          <p
            className="text-[0.82rem] font-medium uppercase tracking-[0.14em]"
            style={{ color: "var(--bp-blue)" }}
          >
            Company news
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
            firstocean has raised a pre-seed, backed by Entrepreneurs First and
            Transpose Platform, to build the operating system for everything a
            biotech does other than the science.
          </p>
          <p
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem]"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            <span style={{ color: "var(--bp-ink)" }}>Zenyi</span>
            <span aria-hidden>·</span>
            <time dateTime={PUBLISHED}>{PUBLISHED_LABEL}</time>
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
              src="/blog/pre-seed-lab.jpg"
              alt="A researcher working at a laboratory bench"
              fill
              priority
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        {/* One measure, one column. The paragraph rules below are the same set
            /privacy and /terms use, so every reading page on the site sets
            body copy identically. */}
        <div
          className="mt-16 max-w-[46rem] text-[1.08rem] leading-[1.75] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:text-[1.5rem] [&_h2]:tracking-[-0.025em] [&_h2]:text-[color:var(--bp-ink)] [&_p]:mt-6"
          style={{ color: "var(--bp-ink-muted)" }}
        >
          <p>
            A biotech is one of the few companies where you can name the work
            that matters. It is the science. Everything else exists to keep the
            science moving, and almost none of it does.
          </p>
          <p>
            Spend a week inside a twenty-person clinical-stage company and you
            find something closer to a coordination layer than a lab. Most of
            the money leaves the building, through CROs, CDMOs, sites and
            specialist vendors, and most of the week goes to checking work that
            happened somewhere else. Accruals are rebuilt from a vendor&rsquo;s
            estimate rather than from evidence of delivery. A change order
            arrives, and whether anyone reads it line by line against the signed
            scope depends on how busy the person who opens it happens to be.
            Filings, quality agreements, invoices and vendor mail queue up
            behind that.
          </p>
          <p>
            None of this is anybody&rsquo;s fault. It is what happens when a
            company that was funded to run experiments has to become a finance
            department, a procurement department, a compliance department and a
            business development department at the same time, using the same
            dozen people. The result is a scientist reconciling a purchase
            order.
          </p>
          <p>
            What makes this urgent now is that there are about to be far more of
            these companies. AI-accelerated discovery is lowering the cost of
            getting to a credible asset, which is exactly the outcome the field
            wanted. But every one of those companies inherits the same overhead,
            and the overhead has not moved in twenty years. If it does not, the
            gains from faster discovery get spent on administration.
          </p>

          <h2>What we are building</h2>
          <p>
            firstocean is an agent-first operating system for everything a
            biotech does other than the science. It reads the whole company
            first: contracts, invoices, protocols, filings, mail, and the
            systems you already pay for, held as one record instead of six.
            Nothing useful happens until the agents can see the same picture the
            company does.
          </p>
          <p>
            From there it works in the open. Every call the agents make arrives
            with the document it came from, so a challenged invoice or a rebuilt
            accrual is something you can check in a few seconds rather than a
            black box you are asked to trust. That constraint is the product.
            Finance and quality work is not the place for an assistant that
            cannot show you why.
          </p>
          <p>
            And then it acts. It files, reconciles, challenges and follows up on
            its own, and escalates only what genuinely needs a person. The end
            state is a company that is only a lab: everything around the science
            runs itself, and the people you hired to do research spend the week
            doing research.
          </p>

          <h2>Who is building it</h2>
          {/* TODO: replace this paragraph with the named founder bios. Needed
              per person: name, role, and the one prior seat that earns the
              claim. The collective sentence below is the version that the
              homepage logo strip already evidences, so it is safe to ship
              until those facts land. */}
          <p>
            This is not a problem you can solve from one discipline. Pricing a
            change order is a finance problem, holding a supplier to a signed
            scope is a commercial one, and getting an agent to read a protocol
            correctly is a research one. Our team has worked across all three,
            at Goldman Sachs, Blackstone, PAI Partners, Averin, American
            Express, Palantir, the NHS and the Alan Turing Institute, and we
            have spent the last months with the finance and operations people
            who actually carry this work inside biotechs.
          </p>

          <h2>The start of it</h2>
          <p>
            The pre-seed is backed by{" "}
            <a
              href="https://www.joinef.com/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrepreneurs First
            </a>{" "}
            and{" "}
            <a
              href="https://www.transposeplatform.vc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Transpose Platform
            </a>
            . It goes into two things: the knowledge layer that lets the agents
            read a company properly, and the first departments running end to
            end with design partners rather than in a demo.
          </p>
          <p>
            If you are running finance or operations at a clinical-stage
            biotech, we would like to map what your week actually goes on, and
            show you what the agents can take over. That conversation is useful
            to us whether or not you become a customer. You can{" "}
            <Link href="/intelligence#contact">book thirty minutes</Link> or
            write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p style={{ color: "var(--bp-ink)" }}>&mdash; Zenyi</p>
        </div>
      </article>

      <BlueprintFooter />
    </main>
  );
}
