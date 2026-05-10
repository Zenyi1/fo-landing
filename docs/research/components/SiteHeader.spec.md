# SiteHeader Specification

## Overview
- **Target file:** `src/components/SiteHeader.tsx`
- **Reference:** see `docs/research/PAGE_TOPOLOGY.md`
- **Interaction model:** static positioning + scroll-driven (becomes opaque when scrolled past hero)

## DOM structure
```
<header class="header">
  <div class="container">
    <a class="logo">millennium</a>     ← Prata serif, lowercase
    <nav>
      <a>Approach</a><span class="slash">/</span>
      <a>People</a><span class="slash">/</span>
      <a>Careers</a><span class="slash">/</span>
      <a>Global Presence</a><span class="slash">/</span>
    </nav>
    <a class="login">Investor Login<span class="slash">/</span></a>
  </div>
</header>
```

## Computed styles (1440 desktop)

### Header container
- position: fixed
- top: 0; left: 0; right: 0
- height: ~87px
- padding: 33px 0 30px
- z-index: 50 (above hero canvas)
- background: transparent over hero, white when scrolled
- color: var(--brand) `#1434CB`
- font-family: var(--font-sans) `Helvetica Neue, Helvetica, Arial`

### Inner container
- max-width: ~1440px
- padding: 0 40px (left/right symmetric)
- display: flex
- justify-content: space-between
- align-items: center

### Logo
- text: `millennium`
- font-family: var(--font-serif) Prata
- font-size: 28px
- font-weight: 400
- color: var(--brand)
- text-transform: lowercase

### Nav (group of 4 links)
- display: flex; gap: ~48px (between link groups)
- font-size: 16px
- font-family: var(--font-sans)
- color: var(--brand)
- letter-spacing: normal

### Each nav link
- display: inline-flex; align-items: center; gap: 14px
- text-decoration: none
- followed by a slanted `/` slash divider — 1px wide line, ~16px tall, rotated ~20°, same color as text
- hover: subtle opacity 0.7

### Investor Login (right side)
- pinned to right
- same style as nav link with trailing slash

## States & behaviors

### Scroll-triggered "scrolled" state
- **Trigger:** `window.scrollY > window.innerHeight - 100` (after passing hero)
- **State A (default):** background: transparent
- **State B (scrolled):** background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); box-shadow: 0 1px 0 rgba(20,52,203,0.1)
- **Transition:** background 0.3s ease, box-shadow 0.3s ease
- Implement with a scroll listener + state. Use `useEffect`.

### Hover on links
- color stays brand
- opacity transitions 1 → 0.7 over 0.2s

## Responsive behavior
- **Desktop (≥ 1024)**: full nav visible
- **Tablet/Mobile (< 1024)**: nav hidden, replaced by a slash-slash icon button on the right (`MenuSlashIcon`). Logo stays on left.
- **Mobile (≤ 768)**: padding reduced to 20px 16px

## Implementation notes
- Use `position: fixed; top: 0`. The hero section (full viewport) has no top padding to compensate; the header floats over it. Subsequent sections are content-flow so the header overlaps them visibly only when transparent — that's why the scrolled state turns opaque.
- Mobile burger should NOT open a menu in this clone (out of scope) — clicking just shows nothing or `console.log`. Visual placement only.

## Text content (verbatim)
- Logo: `millennium`
- Nav links: `Approach`, `People`, `Careers`, `Global Presence`
- Right link: `Investor Login`

## Imports the builder should use
- `Link` from `next/link`
- `SlashIcon` and `MenuSlashIcon` from `@/components/icons`
- `cn` from `@/lib/utils`
