# mlp.com — Design tokens

## Colors
| Token | Value | Where |
|---|---|---|
| `--brand` | `#1434CB` (rgb 20 52 203) | All headings, body text, brand wordmark, links, buttons |
| `--brand-light` | `~#7A8AE8` (lighter blue tint) | Stat numbers (lighter weight visually) |
| `--bg` | `#FFFFFF` | Default page background |
| `--bg-cream` | `~#FFF7F0` | Hero background tint (very subtle peach) |
| `--bg-dark` | `#000000` | Carousel section background |
| `--bg-blue-grad` | dark→mid→light blue cloud gradient | Footer-promo (driven by `waves.mp4`) |
| `--ink-on-dark` | `#FFFFFF` | Text + button outlines on dark sections |

## Typography
- **Display / serif heading** — `Prata` (Google Font). Weight 400. Used for h1, h2, large stat numbers, hero, "millennium" wordmark.
- **UI / sans body** — `nimbus-sans` (Adobe Typekit). Weight 400. Approximate clone with system Helvetica stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`. Used for body, labels, nav, captions.
- Letter-spacing on h2 / labels: ~0.9px / ~0.63px.

### Computed sizes (1440 viewport)
- h1 hero: 90px / lh 1.35
- h2 (stats lead): 48px / lh 1.2
- p (lead in stats): 34px / lh 1.5
- body: 16px / lh 1.1
- stat-number: very large (visually 220px+) — verify per-element

### Mobile (390)
- h1 hero: 48px
- p: 24px

## Spacing
- Container padding desktop: ~120px left
- Hero: 1 fullscreen viewport
- Section vertical padding: large (estimated 120-160px desktop)
- Hairline dividers between stats: 1px solid `var(--brand)` at 20% opacity

## Effects
- Subtle text shadow / animation: none observed
- Stat numbers fade-in on scroll (to verify with IntersectionObserver test)
- No drop shadows on cards
- Outlined buttons: 1.5px stroke, sharp corners, trailing `/` icon

## Iconography
- "/" slash dividers used as link/button accent — implement as inline SVG or text character
- Social icons: solid blue rounded-square backgrounds with white icon glyphs
- LinkedIn, Instagram, YouTube — Lucide React equivalents are fine
