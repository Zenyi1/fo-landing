/* The index and the two post pages read their card copy from here, so a title
   or a date is written once. Newest first: the array order is the order the
   index renders in. */
export type Post = {
  slug: string;
  kicker: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  published: string;
  publishedLabel: string;
  author: string;
};

export const POSTS: Post[] = [
  {
    slug: "ai-native-pharma",
    kicker: "Point of view",
    title: "What an AI-native biotech actually is",
    blurb:
      "Not a lab with better tools. A company whose work is done by systems, whose handoffs have been designed out, and whose memory gets more valuable every year.",
    image: "/blog/ai-native/hero.jpg",
    imageAlt:
      "An abstract plot of dense points and lines resolving into a few straight tracks",
    published: "2026-08-11",
    publishedLabel: "11 August 2026",
    author: "Zenyi",
  },
  {
    slug: "firstocean-pre-seed",
    kicker: "Company news",
    title: "Raising our pre-seed to give biotech its week back",
    blurb:
      "firstocean has raised a pre-seed, backed by Entrepreneurs First and Transpose Platform, to build the operating system for everything a biotech does other than the science.",
    image: "/blog/pre-seed-lab.jpg",
    imageAlt: "A researcher working at a laboratory bench",
    published: "2026-08-10",
    publishedLabel: "10 August 2026",
    author: "Zenyi",
  },
];
