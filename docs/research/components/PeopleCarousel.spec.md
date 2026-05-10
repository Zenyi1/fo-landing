# PeopleCarousel Specification

## Overview
- **Target file:** `src/components/PeopleCarousel.tsx`
- **Interaction model:** click-driven (3 slides, prev/next buttons)
- Original uses Flickity. Re-implement with simple useState + transform; no library needed.

## Visual layout
- Black background section, full-bleed (1440 wide).
- Top-right decorative band: animated tick-mark video (`mlp-tm.mp4`) — 520×60px placed top-right.
- Each slide is a full-width video filling the slide area with a dark overlay fade on the right (where text sits).
- Text block right-aligned: heading, sub, CTA button.
- Bottom bar (outside the video): play button (left), centered caption (current slide person/quote), counter "1 / 3" + arrows (right).

## DOM structure
```
<section className="bg-black text-white relative overflow-hidden">
  <div className="absolute top-0 right-0 w-[520px] h-[60px]">
    <video src="/videos/mlp-tm.mp4" autoplay loop muted className="w-full h-full object-cover" />
  </div>

  <div className="relative h-[780px] overflow-hidden">
    <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active*100}%)` }}>
      {slides.map((slide, i) => (
        <div key={i} className="flex-shrink-0 w-full h-full relative">
          <video
            src={slide.videoSrc}
            autoPlay={i === active}
            loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70" />
          <div className="relative z-10 h-full flex items-center justify-end px-12 md:px-20">
            <div className="max-w-[520px] text-right md:text-left">
              <h2 className="font-serif text-[56px] leading-[1.1]">A network of<br/>entrepreneurial minds</h2>
              <p className="mt-6 text-lg leading-[1.5]">We seek to empower our global network to deliver on our mission.</p>
              <a href={slide.ctaHref} className="mt-8 inline-flex items-center gap-3 px-8 py-4 border border-white">
                {slide.ctaLabel} <SlashIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button className="absolute left-8 bottom-8 w-16 h-16 rounded-full bg-brand grid place-items-center" aria-label="Play video">
      <PlayIcon className="w-5 h-5 ml-1 text-white" />
    </button>
  </div>

  <div className="px-8 py-6 flex items-center justify-between text-white text-sm">
    <span /> {/* play btn footprint */}
    <span className="font-serif text-2xl">{slides[active].caption}</span>
    <div className="flex items-center gap-4">
      <span>{active+1} / {slides.length}</span>
      <button onClick={prev} aria-label="Previous"><ArrowLeftIcon className="w-5 h-5" /></button>
      <button onClick={next} aria-label="Next"><ArrowRightIcon className="w-5 h-5" /></button>
    </div>
  </div>
</section>
```

## Computed styles

### Section
- background: black
- color: white
- height: 780px (slide area)

### Heading h2
- font-family: var(--font-serif) Prata
- font-size: 56px (desktop) / 40px (tablet) / 32px (mobile)
- line-height: 1.1
- color: white

### Sub p
- font-family: var(--font-sans)
- font-size: 18px
- line-height: 1.5
- max-width: 480px

### CTA button (outlined)
- border: 1px solid white
- padding: 16px 32px
- color: white
- font-size: 16px
- background: transparent
- hover: background white, color black, transition 0.25s

### Video gradient overlay
- background: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)

### Tick-mark band (top right decorative)
- width: 520px
- height: 60px
- contains a looping `mlp-tm.mp4`

## Slides data
```ts
const slides = [
  {
    videoSrc: "/videos/sizzle-reel.mp4",
    caption: "It's a machine that works.",
    ctaLabel: "Meet our People",
    ctaHref: "/people",
  },
  {
    videoSrc: "/videos/julia.mp4",
    caption: "Julia Raiskin, CEO, APAC",
    ctaLabel: "People",
    ctaHref: "/people/julia-raiskin",
  },
  {
    videoSrc: "/videos/igor.mp4",
    caption: "Igor Tulchinsky, Founder, Chairman, Chief Executive Officer, Co-Chief Investment Officer and Head of Research, WorldQuant",
    ctaLabel: "People",
    ctaHref: "/people/igor-tulchinsky",
  },
];
```

## States & behaviors
- `active` state: number 0..2
- `next()` increments wrap-around; `prev()` decrements wrap-around
- Translate the slide track by `-active * 100%`
- Only the active slide's video should have audio off but autoplay; inactive videos can still autoplay (muted) for instant transition
- Keyboard navigation: ←/→ arrow keys (optional)

## Responsive behavior
- **Desktop**: as designed
- **Tablet**: slide height 600px, h2 40px
- **Mobile**: slide height 480px, h2 32px, text block centered, smaller padding

## Imports
- `useState` (`'use client'`)
- `SlashIcon`, `PlayIcon`, `ArrowLeftIcon`, `ArrowRightIcon` from `@/components/icons`
- `cn` from `@/lib/utils`
