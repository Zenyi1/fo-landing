# mlp.com — Page Topology

Total page height: **4683px** at 1440 viewport. WordPress site (theme: `mlp`). No SPA framework, no smooth-scroll library, no GSAP. Uses Flickity for the carousel.

## Section map (top → bottom)

| # | Class | Top | Height | Purpose |
|---|---|---|---|---|
| 1 | `homepageHero` | 0 | 975 | Full-bleed hero with animated wind-tick canvas + waves video underlay |
| 2 | `featured-stats` | 975 | 1914 | Mission paragraph + 5 stats (zigzag desktop, stacked mobile) + "Discover our Approach" CTA |
| 3 | `vcarousel fixed-width` | 2889 | 780 | Black-background carousel "A network of entrepreneurial minds" — 3 slides, full-bleed video each, Flickity-driven |
| 4 | `footerPromo` | 3669 | 498 | "Make an impact" with looping `waves.mp4` blue background + Careers CTA |
| 5 | `<footer>` | 4167 | 516 | 3-column nav + legal column + social icons + giant `millennium` wordmark |

## Page-level layout
- Single vertical scroll; no scroll-snap, no Lenis.
- Header (`.nav` / brand "millennium" + 4 nav items + Investor Login) sits **fixed** at the top, transparent over the hero, becomes opaque when scrolled past hero.
- A floating circular play/scroll-to-next button bottom-right of the hero (likely scrolls to next section).
- Z-index layers: header (top), main flow content, hero canvas behind hero text.

## Interaction model per section
1. **Hero** — static text + ambient canvas animation + ambient `waves.mp4` looping behind (positioned low/blurred). The visible "tick" pattern is the canvas.
2. **Featured stats** — scroll-driven appear/fade on each stat block.
3. **Carousel** — click-driven (Flickity). 3 slides, prev/next arrows, slide counter "1 / 3". Auto-rotation likely paused unless user clicks. Each slide swaps the background video.
4. **Footer promo** — static; `waves.mp4` re-used as ambient animated background tinted blue.
5. **Footer** — static.

## Carousel slides (verbatim)
- **Slide 1**: heading "A network of entrepreneurial minds" / sub "We seek to empower our global network to deliver on our mission." / CTA "Meet our People" / video `sizzle-reel-2025-preview.mp4` / quote "It's a machine that works."
- **Slide 2**: same heading + sub / CTA "People" / caption "Julia Raiskin, CEO, APAC" / video `v4-julia-5-second-video.mp4`
- **Slide 3**: same heading + sub / caption "Igor Tulchinsky, Founder, Chairman, Chief Executive Officer, Co-Chief Investment Officer and Head of Research, WorldQuant" / video `Igor-5s-Preview.mp4`

## Footer columns
- **Approach** (header link only)
- **People** → Leadership · Investment Professionals · Technology · Core Infrastructure
- **Careers** → Life at Millennium · Students · Jobs
- **Global Presence** (header link only)
- **Investor Login** (header link only)
- **Legal column**: Terms of Use · Privacy Policy · Disclosures · Notices · Media Inquiries
- **Social**: LinkedIn · Instagram · YouTube
- **Wordmark**: huge `footer-Millennium-wordmark-scaled.png` clipped at bottom
