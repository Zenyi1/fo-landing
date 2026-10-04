import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { ContactForm } from "@/components/ContactForm";

/* One centered column, 24px side padding mobile / 80px desktop. The column
   and the type scale are fluid so a 16" screen reads as generous as a 14":
   1120px of content at lg, up to 1480px on very wide viewports. */
const container =
  "mx-auto w-full max-w-[1280px] px-6 lg:px-20 2xl:max-w-[1640px]";

const body = "text-[clamp(18px,1.45vw,26px)]";

/* Lede: the one big supporting statement each section opens with. */
const lede = "text-[clamp(21px,1.9vw,34px)] leading-[1.3]";

const SCOPE = [
  {
    title: "Market entry",
    text: "We plan where it makes sense to sell. Patient numbers, the achievable price and the registration route decide which territories we propose.",
  },
  {
    title: "Registration",
    text: "We prepare the local submission from the dossier you already hold, and file it through our entity. A licensed professional approves it first.",
  },
  {
    title: "Pricing and reimbursement",
    text: "We set the local price and take the product into the reimbursement and tender processes that apply in that market.",
  },
  {
    title: "Distribution",
    text: "Product moves through specialist distributors and logistics partners. We buy from you at the agreed transfer price and sell to health systems, public tenders and private insurers.",
  },
  {
    title: "Safety",
    text: "For as long as the product is sold, we run adverse-event intake, literature review, periodic reports, renewals and label updates. A licensed professional approves every safety decision.",
  },
];

const STEPS = [
  {
    title: "Assessment",
    text: "Before anyone signs, we forecast patients, price and the registration route for each territory we might take. We only propose a market where that forecast supports a launch.",
    image: "/brand/map-wall.jpg",
    imageAlt: "A strategist marking territories on a wall map",
  },
  {
    title: "Terms",
    text: "One agreement. It sets the territories, the supply, and the transfer price. Your intellectual property stays yours. There is no upfront fee.",
    image: "/brand/agreement.jpg",
    imageAlt: "Two professionals reviewing a printed agreement at a table",
  },
  {
    title: "Registration",
    text: "We draft each local file from your existing dossier: modules, translated labeling, pricing files, and replies to the authority. A licensed professional approves the file before it is submitted. If a question needs data only you hold, it comes back to you.",
    image: "/brand/label.jpg",
    imageAlt: "A physician reading the label of a prescription medicine bottle",
  },
  {
    title: "Launch",
    text: "We take on price, reimbursement and supply into the channel. Distributors deliver. You invoice us at the transfer price as product ships.",
    image: "/brand/distribution.jpg",
    imageAlt: "Medicine cartons and trays of vials on fulfillment shelving",
  },
  {
    title: "The life of the product",
    text: "Safety, renewals and label maintenance stay with us. The agreement does not end at approval.",
    image: "/brand/patient.jpg",
    imageAlt: "An elderly man and his granddaughter sitting together in the sun",
  },
];

const SOFTWARE = [
  {
    title: "Before we sign",
    text: "The assessment: patients, price and route, territory by territory.",
  },
  {
    title: "During registration",
    text: "Draft local modules, translations, pricing files, and draft replies to questions from the authority.",
  },
  {
    title: "On the market",
    text: "Adverse-event intake, daily literature screening, and draft safety reports, plus the work to keep each licence current.",
  },
];

/* A photograph clipped into the brand symbol's circle-and-crescent
   composition — the brand kit's hero treatment. clipId must be unique per
   use; placement art-directs the photograph inside the shapes in viewBox
   units; flip mirrors the whole composition. */
function ShapedImage({
  src,
  alt,
  clipId,
  flip = false,
  zoom = false,
  className,
  placement,
}: {
  src: string;
  alt: string;
  clipId: string;
  flip?: boolean;
  /* The photograph slow-zooms inside its clip, so the frame is never still. */
  zoom?: boolean;
  className?: string;
  placement: { x: number; y: number; width: number; height: number };
}) {
  return (
    /* Shapes span x 0..1550, y 0..1000; the viewBox keeps an 8-unit margin
       so edges never sit exactly on the frame and get shaved on resize. */
    <svg
      viewBox="-8 -8 1566 1016"
      role="img"
      aria-label={alt}
      className={`${flip ? "-scale-x-100 " : ""}${className ?? ""}`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="500" cy="500" r="500" />
          <path d="M875 20 A480 480 0 0 1 875 980 Z" />
          <path d="M1272.5 29.6 A537.5 537.5 0 0 1 1272.5 970.4 Z" />
        </clipPath>
      </defs>
      {/* The clip sits on the group, not the animated image: animating the
          clipped element itself makes Safari drop the clip after a resize. */}
      <g clipPath={`url(#${clipId})`}>
        <image
          href={src}
          x={placement.x}
          y={placement.y}
          width={placement.width}
          height={placement.height}
          preserveAspectRatio="none"
          className={zoom ? "fo-zoom" : undefined}
        />
      </g>
    </svg>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-[72px] lg:mt-[120px]">
      <div className={container}>
        <h2 className="text-[clamp(34px,3.4vw,64px)] leading-[1.1] tracking-[-0.02em]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Rows({ rows }: { rows: { title: string; text: string }[] }) {
  return (
    <div className="mt-10 divide-y divide-cream-200">
      {rows.map((row) => (
        <div key={row.title} className="py-9">
          <h3 className="text-[clamp(22px,1.8vw,32px)] font-medium">
            {row.title}
          </h3>
          <p className={`${body} mt-3 max-w-[880px]`}>{row.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* No bar at all: the wordmark sits in the hero's top-left corner. */}
      <header
        id="top"
        className="relative bg-[linear-gradient(180deg,#898d8c,#74635a,#616b6a)] text-cream"
      >
        <div className={`${container} absolute inset-x-0 top-0 pt-8`}>
          <Wordmark className="w-40 text-cream" />
        </div>
        <div
          className={`${container} grid min-h-svh items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}
        >
          <div>
            <h1 className="text-[clamp(44px,4.6vw,88px)] leading-[1.05] tracking-[-0.02em]">
              Global launch,{" "}
              <em className="font-serif text-[1.06em] italic">simplified.</em>
            </h1>
            <p className={`${lede} mt-8 max-w-[640px]`}>
              The first AI-native commercialization platform to plan, scale,
              and launch therapies worldwide.
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex h-14 items-center rounded-full border border-cream/40 bg-white/15 px-8 text-[17px] text-cream backdrop-blur-xl"
            >
              Talk to us about your asset
            </a>
          </div>
          {/* Oversized and pulled left toward the text; the right edge stays
              inside the column so nothing overflows the page. */}
          <ShapedImage
            src="/brand/hero.jpg"
            alt="A clinician in a white coat reading the label of a prescription medicine"
            clipId="fo-clip-hero"
            placement={{ x: -32, y: -187, width: 1788, height: 1191 }}
            className="w-full lg:-ml-[12%] lg:w-[112%]"
            zoom
          />
        </div>
      </header>

      <main>
        <Section id="scope" title="Services">
          {/* Image left, text right; the image takes the wider column. */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <Image
              src="/brand/team.jpg"
              alt="A team working around a table with laptops and printed reports"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="order-last w-full rounded-2xl lg:order-none"
            />
            <p className={`${lede} max-w-[640px]`}>
              We take your drug into every market where it has demand, at no
              upfront cost. Monetize new regions in months instead of years.
            </p>
          </div>
          {/* Sticky stack: each card pins below the top of the viewport and
              the next one scrolls up from the bottom to cover it. */}
          <div className="mt-10">
            {SCOPE.map((row) => (
              <div
                key={row.title}
                className="sticky top-24 mt-6 flex min-h-[280px] flex-col justify-center rounded-2xl bg-cream-200 p-8 first:mt-0 lg:min-h-[320px] lg:p-14"
              >
                <h3 className="text-[clamp(24px,2.2vw,40px)] font-medium">
                  {row.title}
                </h3>
                <p className={`${body} mt-3 max-w-[880px]`}>{row.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Work with us: the section pins while vertical scroll drives the
            step cards sideways; afterwards the page scrolls on vertically.
            Without scroll-driven animation support it is a swipeable strip. */}
        <section id="agreement" className="fo-steps-wrap mt-[72px] lg:mt-[120px]">
          <div className="fo-steps-pin">
            <div className={container}>
              <h2 className="text-[clamp(34px,3.4vw,64px)] leading-[1.1] tracking-[-0.02em]">
                Work with us
              </h2>
            </div>
            <div className="fo-steps-track mt-10">
              {STEPS.map((step, i) => (
                <article key={step.title} className="w-[min(78vw,520px)] shrink-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={1800}
                    height={1200}
                    sizes="(min-width: 1024px) 520px, 78vw"
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                  />
                  <p className="mt-6 text-[15px]">{i + 1}</p>
                  <h3 className="mt-1 text-[clamp(22px,1.8vw,32px)] font-medium">
                    {step.title}
                  </h3>
                  <p className={`${body} mt-3`}>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Section id="software" title="Where software does the work">
          <p className={`${lede} mt-8 max-w-[760px]`}>
            This is the part a traditional partner staffs with a large writing
            team. It is not a tool you log into.
          </p>
          {/* Full-width cinematic band below the lede, not a side column. */}
          <Image
            src="/brand/dossier.jpg"
            alt="Hands paging through a regulatory dossier binder"
            width={1800}
            height={1200}
            sizes="(min-width: 1640px) 1480px, (min-width: 1024px) 1120px, 100vw"
            className="fo-drift-r mt-10 aspect-[21/9] w-full rounded-2xl object-cover"
          />
          <Rows rows={SOFTWARE} />
          <p className={`${body} mt-6`}>
            A licensed professional approves every filing and every safety
            decision. Software does not submit either.
          </p>
        </Section>

        <Section id="who" title="Who this is for">
          {/* Smaller square image on the left, text in the wide column. */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <Image
              src="/brand/scientist.jpg"
              alt="A scientist in a white lab coat holding a vial up to the light"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="order-last aspect-square w-full rounded-2xl object-cover object-[20%_50%] lg:order-none"
            />
            <p className={`${lede} max-w-[640px]`}>
              Biotechs in the US and Europe with a novel drug. 
            </p>
          </div>
        </Section>

        <Section id="contact" title="Talk about an asset">
          <p className={`${lede} mt-8 max-w-[760px]`}>
            Send the asset name and the stage. We will say whether we can
            assess it.
          </p>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <ContactForm />
            <Image
              src="/brand/handshake.jpg"
              alt="A handshake between two professionals in warm sunlight"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full rounded-2xl"
            />
          </div>
        </Section>
      </main>

      <footer className="relative mt-[72px] lg:mt-[120px]">
        <Image
          src="/brand/skyline.jpg"
          alt=""
          width={1800}
          height={1200}
          sizes="100vw"
          className="h-[320px] w-full object-cover lg:h-[440px]"
        />
        <p
          className={`${container} absolute inset-x-0 bottom-8 text-[13px] text-cream`}
        >
          © Firstocean.
        </p>
      </footer>
    </>
  );
}
