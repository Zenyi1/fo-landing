# FeaturedStats Specification

## Overview
- **Target file:** `src/components/FeaturedStats.tsx`
- **Interaction model:** scroll-driven (each stat fades in / slides up as it enters the viewport)

## Visual layout
- White background, generous vertical padding
- Lead paragraph at the top (large Prata serif)
- 5 stat blocks below, each:
  - HUGE Prata number (size scales by viewport)
  - Caps label below in nimbus-sans
  - Hairline divider
- Desktop: stat blocks alternate left and right alignment for a zigzag rhythm; max-width controls the column.
- Mobile: all stats stack to the left, single column.
- Final CTA "Discover our Approach" link, left-aligned.

## DOM structure
```
<section className="bg-white text-brand py-32 md:py-48">
  <div className="container max-w-[1280px] mx-auto px-6">
    <p className="font-serif text-[40px] md:text-[60px] leading-[1.2] max-w-[1100px]">
      Millennium is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.
    </p>

    <div className="mt-32 md:mt-48 space-y-24">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "border-b border-brand/20 pb-8",
            stat.align === "right" ? "md:text-right md:ml-auto md:max-w-[60%]" : "md:max-w-[60%]"
          )}
        >
          <div className="font-serif text-[160px] md:text-[220px] leading-[0.9] text-brand-light">{stat.value}</div>
          <div className="mt-6 text-sm tracking-[0.15em] uppercase">{stat.label}</div>
        </div>
      ))}
    </div>

    <a href="/approach" className="inline-flex items-center gap-3 mt-24 text-lg">
      Discover our Approach <SlashIcon className="w-3.5 h-3.5" />
    </a>
  </div>
</section>
```

## Computed styles

### Section
- background: white
- padding: 160px 0
- color: var(--brand)

### Lead paragraph
- font-family: var(--font-serif) Prata
- font-size: 60px (desktop) / 40px (tablet) / 32px (mobile)
- line-height: 1.2
- max-width: ~1100px
- margin-bottom: 192px

### Stat number
- font-family: var(--font-serif) Prata
- font-size: 220px (desktop) / 140px (tablet) / 96px (mobile)
- line-height: 0.9
- color: var(--brand-light) `#7A8AE8` (a lighter blue tint)
- font-weight: 400

### Stat label
- font-family: var(--font-sans)
- font-size: 14px
- letter-spacing: 0.15em
- text-transform: uppercase
- color: var(--brand)
- margin-top: 24px

### Divider
- height: 1px
- background: rgba(20, 52, 203, 0.2)

### CTA link
- inline-flex; gap: 12px
- font-size: 18px
- color: var(--brand)
- margin-top: 96px

## States & behaviors

### Scroll-driven entry animation
- **Trigger:** IntersectionObserver — when each stat block intersects with rootMargin "0px 0px -20% 0px"
- **State A (before):** opacity: 0; transform: translateY(40px)
- **State B (after):** opacity: 1; transform: translateY(0)
- **Transition:** opacity 0.6s ease, transform 0.6s ease
- Use `useEffect` + `IntersectionObserver` per block. Add `'use client'`.

## Stats data
```ts
const stats = [
  { value: "35+", label: "Years of Evolution", align: "left" },
  { value: "$87BN+", label: "AUM", align: "right" },
  { value: "6,700+", label: "Employees Globally", align: "left" },
  { value: "140+", label: "Employee Locations", align: "right" },
  { value: "330+", label: "Investment Teams", align: "left" },
];
```

## Responsive behavior
- **Desktop (≥1024)**: zigzag layout — left/right alternates, max-width 60% per block
- **Tablet (768-1023)**: still alternates; lead text 48px; numbers 160px
- **Mobile (<768)**: ALL stats left-aligned, full width; lead 32px; numbers 96px

## Text content (verbatim)
- Lead: `Millennium is a global, diversified alternative investment firm with the mission to deliver high-quality returns for our investors.`
- Stats data above
- CTA: `Discover our Approach`

## Imports
- `SlashIcon` from `@/components/icons`
- `cn` from `@/lib/utils`
