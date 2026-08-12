import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlogHeader } from "@/components/blueprint/BlogHeader";
import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { POSTS } from "@/app/blog/posts";

const title = "Blog";
const description =
  "Notes from firstocean on building the operating system for everything a biotech does other than the science.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "firstocean",
    title: `${title} · firstocean`,
    description,
    images: [{ url: "/seo/fo.jpeg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary", title, description, images: ["/seo/fo.jpeg"] },
};

export default function BlogIndex() {
  return (
    <main
      className="bp-root relative flex min-h-dvh w-full flex-col"
      style={{ background: "var(--bp-paper)", color: "var(--bp-ink)" }}
    >
      <BlogHeader backHref="/intelligence" backLabel="Back to the site" />

      <div className="mx-auto w-full max-w-[1240px] flex-1 px-6 pb-24 pt-14 sm:px-10 sm:pt-20">
        <div className="max-w-[46rem]">
          <h1
            className="text-balance leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)" }}
          >
            {title}
          </h1>
          <p
            className="mt-6 text-[1.15rem] leading-relaxed"
            style={{ color: "var(--bp-ink-muted)" }}
          >
            {description}
          </p>
        </div>

        {/* Two posts sit level on a two-column grid. The whole card is the
            link, so the target is the card rather than the title alone. */}
        <ul className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
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
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                  />
                </div>
                <p
                  className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] font-medium uppercase tracking-[0.14em]"
                  style={{ color: "var(--bp-blue)" }}
                >
                  {post.kicker}
                  <span aria-hidden style={{ color: "var(--bp-hairline-strong)" }}>
                    ·
                  </span>
                  <time
                    dateTime={post.published}
                    className="font-normal normal-case tracking-normal"
                    style={{ color: "var(--bp-ink-muted)" }}
                  >
                    {post.publishedLabel}
                  </time>
                </p>
                <h2
                  className="mt-3 text-balance text-[1.5rem] leading-[1.2] tracking-[-0.025em] transition-colors group-hover:text-[color:var(--bp-blue)]"
                  style={{ color: "var(--bp-ink)" }}
                >
                  {post.title}
                </h2>
                <p
                  className="mt-3 max-w-[42ch] text-[1.02rem] leading-relaxed"
                  style={{ color: "var(--bp-ink-muted)" }}
                >
                  {post.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <BlueprintFooter />
    </main>
  );
}
