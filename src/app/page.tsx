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

/* Three broad services. */
const SCOPE = [
  {
    title: "Market entry",
    text: "We take your drug into new markets and act as your business development team. We register it, and a licensed professional approves every filing.",
  },
  {
    title: "Pricing and reimbursement",
    text: "We secure the price and the reimbursement in every territory we enter, so health systems pay for your innovation.",
  },
  {
    title: "Distribution",
    text: "We move your drug through specialist partners until it reaches every patient who needs it, and we keep it safe on the market for as long as it sells.",
  },
];

const STEPS = [
  {
    title: "Assessment",
    text: "We assess the assets in your portfolio free, no strings attached. Our models forecast patients, price and the registration route, and we only propose a market where the forecast supports a launch.",
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
    text: "Software drafts each local file from your existing dossier: modules, translated labeling, pricing files, and replies to the authority. A licensed professional approves every file before it is submitted, and approval lands in months, not years.",
    image: "/brand/label.jpg",
    imageAlt: "A physician reading the label of a prescription medicine bottle",
  },
  {
    title: "Launch",
    text: "We take on price, reimbursement and supply into the channel. You sell through us and keep the best margins of any commercialization partner.",
    image: "/brand/distribution.jpg",
    imageAlt: "Medicine cartons and trays of vials on fulfillment shelving",
  },
  {
    title: "The life of the product",
    text: "Safety, renewals and label maintenance stay with us for as long as the product sells, and a licensed professional approves every safety decision. The agreement does not end at approval.",
    image: "/brand/patient.jpg",
    imageAlt: "An elderly man and his granddaughter sitting together in the sun",
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
        <h2 className="text-[clamp(34px,3.4vw,64px)] font-medium leading-[1.1] tracking-[-0.02em]">
          {title}
        </h2>
        {children}
      </div>
    </section>
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
              The first AI-native commercialization platform to{" "}
              <em className="font-serif italic">plan, scale, and launch</em>{" "}
              therapies worldwide.
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
            className="w-full lg:-ml-[6%] lg:w-[106%]"
            zoom
          />
        </div>
      </header>

      <main>
        <Section id="scope" title="What we do">
          <p className={`${lede} mt-8 max-w-[760px]`}>
            We take your drug into every market where it has demand, at no
            upfront cost.
          </p>
          <p className={`${lede} mt-4 max-w-[760px]`}>
            Book revenue for new regions in months, not years.
          </p>
          {/* Two-by-two grid: three service cards in the brand tones, and
              one photograph so the section is not all panels. */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl bg-cream-200 p-8 lg:p-12">
              <h3 className="text-[clamp(24px,2.2vw,40px)] font-medium">
                {SCOPE[0].title}
              </h3>
              <p className={`${body} mt-3`}>{SCOPE[0].text}</p>
            </article>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
              <Image
                src="/brand/team.jpg"
                alt="A team working around a table with laptops and printed reports"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {SCOPE.slice(1).map((row) => (
              <article
                key={row.title}
                className="rounded-2xl bg-cream-200 p-8 lg:p-12"
              >
                <h3 className="text-[clamp(24px,2.2vw,40px)] font-medium">
                  {row.title}
                </h3>
                <p className={`${body} mt-3`}>{row.text}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Work with us: the section pins while vertical scroll drives the
            step cards sideways; afterwards the page scrolls on vertically.
            Without scroll-driven animation support it is a swipeable strip. */}
        <section id="agreement" className="fo-steps-wrap mt-[72px] lg:mt-[120px]">
          <div className="fo-steps-pin">
            <div className={container}>
              <h2 className="text-[clamp(34px,3.4vw,64px)] font-medium leading-[1.1] tracking-[-0.02em]">
                Work with us
              </h2>
            </div>
            <div className="fo-steps-track mt-10">
              {STEPS.map((step, i) => (
                <article
                  key={step.title}
                  className="w-[min(78vw,520px,68vh)] shrink-0 snap-start"
                >
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

        {/* The platform case as individual statements beside the photograph,
            with the proof points below. */}
        <section id="software" className="mt-[72px] lg:mt-[120px]">
          <div className={container}>
            <h2 className="text-[clamp(34px,3.4vw,64px)] font-medium leading-[1.1] tracking-[-0.02em]">
              A new kind of platform
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="divide-y divide-cream-200">
                <p className={`${lede} pb-5`}>
                  Pharma veterans and world-class engineers: the first{" "}
                  <span className="font-medium">
                    AI-native commercialization team
                  </span>
                  .
                </p>
                <p className={`${lede} py-5`}>The fastest route to approval.</p>
                <p className={`${lede} py-5`}>Full ownership of your asset.</p>
                <p className={`${lede} pt-5`}>
                  <em className="font-serif italic">
                    The best margins in the market.
                  </em>
                </p>
              </div>
              <Image
                src="/brand/safety.jpg"
                alt="A professional reading a report at a desk by a tall window"
                width={1800}
                height={1200}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full rounded-2xl"
              />
            </div>
            <p className={`${lede} mt-12 max-w-[880px]`}>
              Your team does not spend a single hour on launch work. We take
              it over end to end, and the platform carries the load.
            </p>
            <p className={`${lede} mt-4 max-w-[880px]`}>
              We already partner with some of the world&apos;s top biotechs to
              capture the full value of their novel drugs.
            </p>
          </div>
        </section>

        {/* No heading here: a plain <section> instead of <Section>, which
            requires a title and always renders the h2. */}
        <section id="who" className="mt-[72px] lg:mt-[120px]">
          <div className={container}>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/brand/scientist.jpg"
                alt="A scientist in a white lab coat holding a vial up to the light"
                width={1800}
                height={1200}
                sizes="(min-width: 1640px) 1480px, (min-width: 1024px) 1120px, 100vw"
                className="aspect-[3/2] w-full object-cover object-[center_30%] lg:aspect-[21/9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-8 text-[clamp(30px,3vw,56px)] leading-[1.1] tracking-[-0.02em] text-cream lg:p-14">
                A novel drug,{" "}
                <em className="font-serif text-[1.06em] italic">
                  across the globe.
                </em>
              </p>
            </div>
          </div>
        </section>

        <Section id="contact" title="Tell us about your drug">
          <p className={`${lede} mt-8 max-w-[760px]`}>
            If you are a biotech thinking about capturing the full value of
            your drug at no upfront cost, reach out.
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
          className="h-[clamp(280px,30vw,620px)] w-full object-cover"
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
