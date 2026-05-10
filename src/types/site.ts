export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  align: "left" | "right";
};

export type CarouselSlide = {
  videoSrc: string;
  caption: string;
  ctaLabel: string;
  ctaHref: string;
  quote?: string;
};

export type FooterColumn = {
  title: string;
  href?: string;
  links?: NavItem[];
};

export type SocialLink = {
  label: "LinkedIn" | "Instagram" | "YouTube";
  href: string;
};
