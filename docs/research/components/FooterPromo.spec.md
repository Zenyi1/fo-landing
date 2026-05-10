# FooterPromo Specification

## Overview
- **Target file:** `src/components/FooterPromo.tsx`
- **Interaction model:** static; ambient looping `waves.mp4` for background animation

## Visual layout
- Full-width, ~498px tall section
- Background: blue gradient with mid-blue cloud abstract shapes (driven by `waves.mp4`)
- Headline "Make an impact" in large white Prata serif
- Single outlined "Careers" CTA button
- Both elements left-aligned at ~120px padding from left
- Vertically centered

## DOM structure
```
<section className="relative h-[500px] overflow-hidden bg-brand text-white">
  <video src="/videos/waves.mp4" autoPlay loop muted playsInline
         className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/40 to-brand/80" />

  <div className="relative z-10 h-full flex flex-col justify-center px-[120px] gap-12">
    <h2 className="font-serif text-[120px] md:text-[180px] leading-[0.95]">Make an impact</h2>
    <a href="/careers" className="inline-flex items-center gap-3 px-8 py-4 border border-white text-base w-fit">
      Careers <SlashIcon className="w-3.5 h-3.5" />
    </a>
  </div>
</section>
```

## Computed styles

### Section
- height: 500px
- background-color: var(--brand) (fallback while video loads)
- color: white
- position: relative
- overflow: hidden

### Background video
- position: absolute; inset: 0
- width: 100%; height: 100%
- object-fit: cover
- opacity: 0.7 (so the video blue blends with brand, creating the cloud effect)

### Overlay gradient
- linear-gradient(to right, rgba(20,52,203,0.6) 0%, rgba(20,52,203,0.2) 50%, rgba(20,52,203,0.6) 100%)

### h2
- font-family: var(--font-serif) Prata
- font-size: 180px (desktop) / 120px (tablet) / 64px (mobile)
- line-height: 0.95
- color: white
- font-weight: 400

### CTA button
- inline-flex; gap: 12px
- padding: 16px 32px
- border: 1px solid white
- color: white
- font-size: 16px
- hover: background white, color brand, transition 0.25s

## Responsive behavior
- **Desktop (≥1024)**: padding-left 120px, h2 180px
- **Tablet (768-1023)**: padding-left 64px, h2 120px
- **Mobile (<768)**: padding-left 24px, h2 64px, button inline-flex w-fit

## Text content (verbatim)
- h2: `Make an impact`
- CTA: `Careers`

## Assets
- `/videos/waves.mp4` (already downloaded; reused from hero)

## Imports
- `SlashIcon` from `@/components/icons`
