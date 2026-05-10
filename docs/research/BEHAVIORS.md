# mlp.com — Behavior bible

## Header
- Brand wordmark `millennium` lowercase serif (Prata) on the left.
- 4 main nav links + 1 right-pinned "Investor Login": each followed by `/` slash divider in the same blue.
- Initially transparent over hero (white background visible behind cookie banner; hero is cream-tinted).
- After scroll past 100px the body class swaps to `homepageHero homepageHero--is-scrolled` — nav remains fixed but background may transition to white. Behavior to verify per element.
- Mobile (≤768): nav hidden, replaced by `//` icon button (burger).

## Hero (`homepageHero`)
- Full viewport height (`100vh`).
- **Background layer**: `<video autoplay loop muted>` of `waves.mp4` filling the full hero, low-opacity / blue-tinted.
- **Foreground layer**: `<canvas class="homepageHero__canvas">` 2116×1462 device pixels, drawing animated short tick marks (wind-direction field). Each tick is a small line segment with subtle blue → light-blue color variation. Field is animated continuously, each tick rotates over time as if following a flow vector.
- Headline `Built for an / ever-changing world` — Prata 90px, line-height 1.35.
- Sub `Defined by evolution, innovation and focus since 1989.` — nimbus-sans 34px / lh 1.5.
- **"Explore what's possible"** — link with `/` divider (same style as nav).
- Vertical rotated "Scroll" indicator on far left, with thin blue vertical line accent.
- **Bottom-right circular play button** — solid blue circle with white triangle; clicking it likely scrolls to the next section.

## Featured stats (`featured-stats`)
- White background.
- Lead paragraph: "Millennium is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors." — large blue Prata.
- 5 stat blocks, each:
  - Big number + suffix (35+, $87BN+, 6,700+, 140+, 330+)
  - All-caps small label below (nimbus-sans, slight letter-spacing)
  - Horizontal hairline divider underneath
- Desktop alternates left / right alignment to create a zigzag layout.
- Mobile: all stacked left-aligned, single column.
- Number color is a slightly **lighter blue** than the brand color — appears `rgb(122, 138, 232)` ish (a tint).
- "Discover our Approach" link CTA at the end.

## Carousel (`vcarousel`) — Flickity
- Section background: black.
- Decorative tick-mark pattern band in upper right.
- Each slide is a full-width video card with:
  - Video (loops, muted, autoplay only when active)
  - Right-aligned text block: heading + sub + CTA button (outlined white)
  - Bottom: small play-button on left, current quote/person caption centered, "1 / 3" indicator + arrows on right
- Click prev/next swaps slide; clicking play button likely opens a full video lightbox.
- Heading + sub remain constant; CTA button and caption text differ per slide.
- A small avatar video circle exists for slides 2 & 3 (julia / igor).

## Footer promo (`footerPromo`)
- Reuses `waves.mp4` as ambient animated background, blue-tinted.
- Headline `Make an impact` — large white Prata.
- Single outlined button "Careers" with `/` divider trailing.
- Static — no scroll-driven anim observed.

## Footer
- White background.
- 5 main columns + 1 legal column + social column on right.
- Below the columns: huge clipped `millennium` wordmark image (only top half visible, fades upward into white).
- Social icons in solid blue rounded squares.

## Responsive breakpoints
- **Desktop (1440)**: zigzag stats, 5-col footer, 90px hero h1.
- **Tablet (~768)**: not deeply tested but likely intermediate.
- **Mobile (390)**: hero h1 → 48px, body p → 24px, nav becomes `//` burger, stats single-column left-aligned, footer columns stack.

## Hover / interactive states (to capture per component)
- Nav links: subtle underline / opacity change on hover.
- Buttons (`Meet our People`, `Careers`): outlined; hover likely fills with white or inverts.
- "Discover our Approach" / "Explore what's possible" / "Investor Login": all share the trailing `/` style.
