export type Dictionary = {
  nav: { approach: string; contact: string; home: string; openMenu: string; closeMenu: string };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroHeadline1: string;
    heroHeadline2: string;
    heroSubtitle: string;
    heroCta: string;
    scroll: string;
    scrollAria: string;
    problemKicker: string;
    problemBody: string;
    stats: { value: string; label: string }[];
    solutionKicker: string;
    solutionBody: string;
    contactLink: string;
    workWithUs: string;
  };
  approach: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    headline1: string;
    headline2: string;
    intro: string;
    earthAlt: string;
    gapKicker: string;
    gapHeadline: string;
    gapStat: string;
    gapBody1: string;
    gapBody2: string;
    gapClose: string;
    functionsKicker: string;
    functionsHeadline: string;
    functions: { n: string; title: string; body: string }[];
    marketsKicker: string;
    marketsHeadline: string;
    marketsLatam: string;
    marketsMena: string;
    marketsSea: string;
    marketsBody1: string;
    marketsBody2: string;
    workKicker: string;
    workHeadline: string;
    forOriginators: string;
    forOriginatorsBody: string;
    forInvestors: string;
    forInvestorsBody: string;
    talkToUs: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    headline: string;
    intro: string;
    categories: { label: string; slug: string; email: string }[];
    fields: { name: string; email: string; phone: string; message: string; optional: string };
    submit: string;
    submitting: string;
    successKicker: string;
    successHeadline: string;
    successBody: string;
    genericError: string;
  };
  footer: {
    registeredOffice: string;
    usAddress: string;
    londonHq: string;
    londonAddress: string;
    legal: string;
    rights: string;
  };
};

export const en: Dictionary = {
  nav: {
    approach: "Approach",
    contact: "Contact Us",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  home: {
    metaTitle: "First Ocean",
    metaDescription:
      "First Ocean is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.",
    heroHeadline1: "Proven medicines.",
    heroHeadline2: "New patients.",
    heroSubtitle:
      "Innovative de-risked therapeutics never reach the markets that need them most. Firstocean changes that.",
    heroCta: "Read our thesis",
    scroll: "Scroll",
    scrollAria: "Scroll to next section",
    problemKicker: "/the problem",
    problemBody:
      "Hundreds of de-risked therapies, approved by the FDA, EMA, and PMDA, never reach the emerging markets where demand is greatest.",
    stats: [
      { value: "2 in 3", label: "FDA-approved drugs never reach LATAM, MENA, or SEA" },
      { value: "450+", label: "Identified Assets" },
      { value: "$390Bn+", label: "Untapped Value" },
      { value: "440M+", label: "Potential Patients" },
    ],
    solutionKicker: "/our solution",
    solutionBody:
      "Firstocean is the AI sourcing engine that resolves it: scoring thousands of candidates against patient populations, regulatory pathways, and commercial fit, then routing the best assets to the right partners.",
    contactLink: "Contact Us",
    workWithUs: "Work with us",
  },
  approach: {
    metaTitle: "Approach",
    metaDescription:
      "FirstOcean's AI sourcing engine scores de-risked, approved therapeutics against patient populations, regulatory pathways, and commercial fit — routing the best assets into LATAM, MENA, and SEA.",
    kicker: "/approach",
    headline1: "Identify de-risked assets.",
    headline2: "Bridge them where they're needed.",
    intro:
      "First Ocean sources therapeutics approved by the FDA, EMA, PMDA and Health Canada, secures the ex-US and ex-EU rights from the originators who hold them, and brings those assets into LATAM, MENA and Southeast Asia through the reliance pathways that now connect them.",
    earthAlt: "Earth at night, viewed from orbit",
    gapKicker: "/the gap today",
    gapHeadline: "A regulatory frontier the industry has not yet crossed.",
    gapStat:
      "Approximately 75% of novel drugs approved by the FDA over the past decade are not commercially available in LATAM, MENA or Southeast Asia.",
    gapBody1:
      "The broader pool is larger: hundreds of therapeutics cleared by the four reference regulators have never been registered in the emerging markets where they are clinically needed.",
    gapBody2:
      "The constraint is not scientific, regulatory or commercial. It is operational. Ex-US and ex-EU rights sit with originators whose priorities lie elsewhere. Reliance pathways now exist but require local execution. Patient populations are large and growing but fragmented across jurisdictions with materially different healthcare systems.",
    gapClose: "First Ocean exists to close this gap.",
    functionsKicker: "/what we do",
    functionsHeadline:
      "Four functions, run in series, across multiple assets and jurisdictions.",
    functions: [
      {
        n: "01",
        title: "Identification",
        body:
          "Screening approved-drug registers of the FDA, EMA, PMDA and Health Canada against clinical fit, payer behaviour, manufacturing feasibility and rights availability in the markets we serve.",
      },
      {
        n: "02",
        title: "Acquisition",
        body:
          "In-licensing and distribution agreements with the originators who hold ex-US and ex-EU rights. Terms structured so the originator protects its core US or EU franchise while the asset reaches the emerging markets it was never going to be launched in.",
      },
      {
        n: "03",
        title: "Regulatory translation",
        body:
          "Adapting an approval issued in one jurisdiction to the evidence package, label and standard-of-care expectations of fifteen others through the reliance pathways that recognise the underlying decision.",
      },
      {
        n: "04",
        title: "In-country execution",
        body:
          "Partnering with the operators who control distribution, tender access, cold-chain logistics and clinical engagement, so that an approval becomes a registered product on a national formulary.",
      },
    ],
    marketsKicker: "/the markets we serve",
    marketsHeadline: "Three regions. Twelve jurisdictions. One body of evidence.",
    marketsLatam: "Brazil (ANVISA) · Mexico (COFEPRIS).",
    marketsMena:
      "Saudi Arabia (SFDA Verification) · UAE (MOHAP) · Egypt (EDA) · Jordan · Israel, recognising FDA and EMA decisions.",
    marketsSea:
      "Singapore (HSA Abridged) · Malaysia (NPRA) · Thailand (TFDA) · Philippines (FDA-PH) · Vietnam (DAV).",
    marketsBody1:
      "A single FDA, EMA or PMDA approval can now anchor submissions across all twelve. Local regulators rely on the reference regulator's evaluation of the underlying clinical dossier, supplemented by the post-market and real-world evidence accumulated since the original approval.",
    marketsBody2:
      "Recognition is not approval. Pricing, labelling and post-market commitments remain national, but the duplication is removed. Timelines compress from years to months, and the cost of redundant clinical work is avoided.",
    workKicker: "/work with us",
    workHeadline: "Start the conversation.",
    forOriginators: "For originators",
    forOriginatorsBody:
      "We acquire the rights you are not pursuing, on terms that protect your primary markets and surface incremental value from assets already in your portfolio.",
    forInvestors: "For investors and co-investors",
    forInvestorsBody:
      "We invest in the only function in this value chain that no one else is running at scale, in the 24 months that the regulatory and commercial conditions for it have existed.",
    talkToUs: "Talk to us",
  },
  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Get in touch with First Ocean — partner with us, invest with us, work with us, or reach our media team.",
    kicker: "/contact",
    headline: "Contact",
    intro: "Any questions? Want to learn more? We look forward to hearing from you.",
    categories: [
      { label: "Partner with us", slug: "partner-with-us", email: "partner@first-ocean.com" },
      { label: "Invest with us", slug: "invest-with-us", email: "invest@first-ocean.com" },
      { label: "Work with us", slug: "work-with-us", email: "careers@first-ocean.com" },
      { label: "Media", slug: "media", email: "media@first-ocean.com" },
    ],
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      optional: "(optional)",
    },
    submit: "Send Message",
    submitting: "Sending...",
    successKicker: "/received",
    successHeadline: "Thanks, we'll be in touch.",
    successBody:
      "Your message has reached the team. We typically respond within two business days.",
    genericError: "Something went wrong",
  },
  footer: {
    registeredOffice: "Registered Office",
    usAddress: "2810 N Church St STE 88318\nWilmington, DE 19802\nUnited States",
    londonHq: "London Headquarters",
    londonAddress: "Shoreditch Exchange\nSenna Building, Gorsuch Pl\nLondon E2 8JF, United Kingdom",
    legal:
      "This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.",
    rights: "© 2026 First Ocean. All rights reserved.",
  },
};
