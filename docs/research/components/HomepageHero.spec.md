# HomepageHero Specification

## Overview
- **Target file:** `src/components/HomepageHero.tsx`
- **Reference:** see `docs/research/BEHAVIORS.md`
- **Interaction model:** mostly static; ambient canvas + video animations

## Visual layout
- Full viewport height (`min-height: 100vh`).
- Cream/peach off-white background.
- A looping `waves.mp4` plays full-bleed underneath, very subtle (`opacity: 0.15`, blue-tinted).
- An `<canvas>` overlay renders an animated field of small angled tick marks (wind/flow visualization). Ticks are short line segments, ~6-12px long, rotated by a slowly evolving 2D noise field. Color varies between brand and a lighter tint.
- Text content sits on top, left-aligned, padded ~120px from left edge.
- Vertical "Scroll" indicator + thin blue line on the far left.
- Floating circular play/scroll button at bottom-right.

## DOM structure
```
<section class="hero relative min-h-screen overflow-hidden bg-cream">
  <video autoplay loop muted className="absolute inset-0 w-full h-full object-cover opacity-20" src="/videos/waves.mp4" />
  <canvas className="absolute inset-0 w-full h-full" ref={canvasRef} />

  <div className="relative z-10 flex flex-col h-screen pl-[120px] pr-12 py-32">
    <div className="absolute left-0 top-1/4 bottom-24 w-px bg-brand" />            ← left vertical line
    <span className="absolute left-2 bottom-12 text-xs uppercase tracking-wider rotate-[-90deg] origin-left">Scroll</span>

    <h1 className="font-serif text-[90px] leading-[1.35]">Built for an<br/>ever-changing world</h1>

    <p className="mt-8 max-w-[600px] text-[34px] leading-[1.5]">
      Defined by evolution, innovation and focus since 1989.
    </p>

    <a href="#approach" className="mt-12 inline-flex items-center gap-3 text-base">
      Explore what's possible <SlashIcon className="w-3.5 h-3.5" />
    </a>
  </div>

  <button className="absolute bottom-12 right-12 w-16 h-16 rounded-full bg-brand grid place-items-center text-white">
    <PlayIcon className="w-5 h-5 ml-1" />
  </button>
</section>
```

## Computed styles (desktop)

### Section
- min-height: 100vh
- background: var(--cream) #FFF7F0
- position: relative
- overflow: hidden

### Background video
- position: absolute; inset: 0
- width: 100%; height: 100%
- object-fit: cover
- opacity: 0.2
- filter: hue-rotate(-10deg) saturate(0.8) brightness(1.1)

### Canvas
- position: absolute; inset: 0
- width: 100%; height: 100%
- pointer-events: none

### h1
- font-family: var(--font-serif) Prata
- font-size: 90px
- line-height: 1.35
- color: var(--brand)
- letter-spacing: 0
- font-weight: 400
- max-width: ~900px

### p
- font-family: var(--font-sans)
- font-size: 34px
- line-height: 1.5
- color: var(--brand)
- max-width: 600px
- margin-top: 56px

### "Explore what's possible" link
- font-size: 16px
- inline-flex with trailing slash icon

### Scroll indicator (left)
- a 1px vertical brand-colored line, ~50% of section height, anchored ~ center vertically on left padding zone (~24px from left)
- "Scroll" label rotated -90deg (sideways) below the line

### Play button (bottom-right)
- 64×64px circle
- background: var(--brand)
- color: white
- box-shadow: subtle (none in source — keep flat)
- cursor: pointer
- on click: scrolls to next section (`#stats`)

## Canvas wind-field implementation
The canvas should be a self-contained `useEffect` that:
1. Sizes itself to its container with devicePixelRatio
2. Builds a grid of cells (e.g., 60px spacing)
3. For each cell, draws a short line (~10px) rotated by `noise(x*0.005, y*0.005, t*0.0003) * 2π`
4. Two strokes per tick: a darker brand and a lighter tint, slightly offset, to produce the layered look
5. Uses `requestAnimationFrame` and clears before each draw

You can use a simple value-noise helper inline (no library needed). Pseudo:
```js
function noise(x, y, t) {
  return Math.sin(x + t) * Math.cos(y - t) * 0.5 + 0.5;
}
```

## Responsive behavior
- **Desktop (≥1024)**: as above. Padding-left 120px.
- **Tablet (768-1023)**: padding-left 64px; h1 → 64px
- **Mobile (<768)**: padding-left 20px; padding-right 20px; h1 → 48px / lh 1.15; p → 22px / lh 1.4. Play button shrinks to 56px.

## Text content (verbatim)
- h1: `Built for an\never-changing world`
- p: `Defined by evolution, innovation and focus since 1989.`
- link: `Explore what's possible`
- scroll label: `Scroll`

## Assets
- `/videos/waves.mp4` (downloaded)

## Imports
- `SlashIcon`, `PlayIcon` from `@/components/icons`
- `cn` from `@/lib/utils`
- `useEffect`, `useRef` from React (`'use client'` directive needed)
