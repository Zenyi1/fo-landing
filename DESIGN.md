---
name: firstocean
description: A single-page brand instrument — the aperture mark breathing on a full-bleed gradient ground, one cream ink, a few quiet lines, a form.
colors:
  cream: "#e5e3e0"
  gradient-haze: "#898d8c"
  gradient-earth: "#74635a"
  gradient-slate: "#606b6b"
  gradient-depth: "#454f4f"
typography:
  headline:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.45rem, 2.6vw, 2.2rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.14em"
  caption:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
spacing:
  page-x: "1.5rem"
  page-x-md: "2.5rem"
  stanza: "1.75rem"
  section: "7rem"
  section-md: "9rem"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.gradient-depth}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  link-action:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
---

# Design System: firstocean

## Overview

**Creative North Star: "The Aperture on Deep Water"**

The identity is the page. There is no hero headline, no card grid, no second
color: a full-bleed brand gradient is the only ground, cream is the only ink,
and the five-element aperture mark — paths verbatim from the client's logo kit —
is the only graphic. The first viewport belongs to the mark, breathing on a
seven-second cycle; the words come after, as a handful of quiet declarative
lines on the deep end of the gradient. The refused default is the
hero-headline-subhead-CTA landing.

Everything structural is drawn with hairlines: the underline on the anchor
link, the bottom borders on form fields, the single-stroke button. No fills,
no shadows, no rounded corners, no icons. The system reads as an established,
deliberate company because nothing on the page competes with the mark.

**Key Characteristics:**
- One ink (cream #e5e3e0) at varying opacity; the gradient supplies all other color.
- The gradient lives on `body` with `svh`-unit stops, so copy bands land on the same ground at every document height.
- Square corners and hairline (1px) strokes everywhere; zero shadows.
- Motion belongs to the mark alone: the crescents' 7s breath, echoed once on the form's sent state.
- Uppercase tracked micro-labels (0.14em) are the only typographic ornament.

## Colors

A four-stop brand gradient as ground, one cream ink on top — nothing else.

### Primary
- **Cream** (`--cream`): the single ink. All text, all strokes, the mark, the wordmark, selection background, focus outlines, caret. Variation is expressed only through opacity: `/70` for resting hairlines (link underline, button border), `/40` for idle field underlines, `rgba(229,227,224,0.85)` for placeholders.

### Neutral
- **Gradient Haze** (`--g-1`): gradient start (0), the sky behind the mark's upper half. Brand kit value.
- **Gradient Earth** (`--g-2`): gradient stop at 44svh, the warm mid-band behind the mark; also the text color inside `::selection`. Brand kit value.
- **Gradient Slate** (`--g-3`): gradient stop at 72svh, the cool band the first viewport settles into. Brand kit value.
- **Gradient Depth** (`--g-4`): gradient end at 118svh and the `html` background; the ground under all body copy and the form. A depth extension of the brand kit added so body text clears 4.5:1 contrast (the kit's own end stop, #606b6b, does not). Also the hover text color on the filled button.

### Named Rules
**The One-Ink Rule.** Cream is the only foreground color. Hierarchy and state are expressed through opacity of cream, never through a second hue.

**The Ground-Is-The-Brand Rule.** The gradient is painted once, on `body`, with stops in `svh` units (0 → 44svh → 72svh → 118svh). Components never paint their own backgrounds; every surface is transparent and sits on the shared ground.

## Typography

**Display/Body Font:** Hanken Grotesk (with Helvetica Neue, Helvetica, Arial fallback)

**Character:** A single Helvetica-class grotesk carries the whole page at
near-book weights. Nothing is bold; nothing is enormous. Scale restraint is the
voice — the largest text on the page is a ~2.2rem thesis line, because the mark,
not type, owns the first viewport.

### Hierarchy
- **Headline** (500, clamp(1.45rem, 2.6vw, 2.2rem), 1.2, -0.01em): the page's one `h1`, a short thesis line pinned to the bottom-left of the first viewport, max-width 24ch. Not a hero headline — it sits below the mark, sized like a caption to it.
- **Body** (400, clamp(1.1rem, 1.8vw, 1.35rem), 1.55): the quiet declarative lines. One sentence or two per paragraph, 1.75rem between stanzas.
- **Body Small** (400, 1.05rem, 1.5): form field text and the sent/error confirmation copy.
- **Label** (400, 0.8rem, 0.14em tracking, uppercase): form field labels and — at 0.9rem with the same 0.14em tracking — the actions ("GET IN TOUCH", "SEND").
- **Caption** (400, 0.8rem, 1.6): footer lines.

### Named Rules
**The No-Shout Rule.** Maximum weight is 500 (medium), on the headline only. Everything else is regular. Uppercase appears only with 0.14em letter-spacing at 0.9rem or below — labels and actions, never sentences.

## Layout

Single column, single page. The first viewport is a `min-h-svh` flex column:
wordmark small at top-left (11rem wide, 13rem at md), the mark centered and
large in the remaining space (`min(84vw, 118vh)` wide, `min(58vw, 118vh)` at
md), and a bottom row that splits at md into headline (left) and anchor action
(right). Page padding is 1.5rem, 2.5rem at md.

Below the fold, content lives in a centered `max-w-[52rem]` column with the
same horizontal padding. The form constrains further to `max-w-[34rem]`.
Vertical rhythm is generous and consistent: 1.75rem between body stanzas and
between form fields, and ~7rem (9rem at md) between sections (lines → contact →
footer). The `#contact` anchor scrolls with `scroll-mt-16` and smooth scrolling
(reduced-motion honored).

## Elevation & Depth

No shadows, no layering, no z-axis at all. Depth is conveyed entirely by the
gradient's descent from haze to depth — the page gets deeper as you scroll,
and body copy begins only after the ground has settled on the darkest stop.

### Named Rules
**The Flat-Water Rule.** Nothing floats. No box-shadow, no overlay surfaces, no cards; the gradient is the only depth in the system.

## Shapes

Square everywhere: 0px radius on buttons, inputs, and every box. The only
curves on the page are the brand's own — the crescents and barrel of the
aperture mark and the drawn letterforms of the wordmark. Structure is drawn
with 1px cream hairlines: full borders on the button, bottom-only borders on
fields and the anchor link.

### Named Rules
**The Hairline Rule.** Strokes are 1px cream, resting at reduced opacity (70% on actionable edges, 40% on idle fields) and rising to full cream on hover/focus. State change is opacity change, animated with a color transition — never thickness, never a new color.

## Components

### Buttons
- **Shape:** square (0px radius)
- **Primary ("SEND"):** transparent ground, 1px cream/70 border, cream uppercase label (0.9rem, 0.14em tracking), padding 12px 32px.
- **Hover:** inverts — cream fill, gradient-depth (#454f4f) text, via color transition.
- **Disabled (sending):** 60% opacity, `cursor: wait`, label swaps to "Sending…".

### Inputs / Fields
- **Style:** transparent, borderless except a 1px bottom hairline at cream/40; no horizontal padding (text aligns to the label); 12px vertical padding; 1.05rem cream text; cream caret; placeholder at rgba(229,227,224,0.85).
- **Focus:** bottom hairline rises to full cream (color transition); no outline on the field itself. Global `:focus-visible` elsewhere is a 1px cream outline offset 4px.
- **Label:** uppercase 0.8rem, 0.14em tracking, stacked 6px above the field.
- **Error:** message in plain cream body-small next to the button, `role="alert"` — no red, per the One-Ink Rule.
- **Textarea:** same treatment, `resize: none`.

### Navigation
- **Anchor action ("GET IN TOUCH"):** uppercase 0.9rem, 0.14em tracking, 1px bottom hairline at cream/70 with 4px gap, hover to full cream. This underlined uppercase hairline link is the only navigation pattern.

### The Aperture Mark (signature)
The five-element symbol, paths verbatim from the brand kit, rendered in
`currentColor` (always cream). Each crescent pair sits in its own `<g>` so the
breath animation can drift them: outer crescents translate ±3.4 viewBox units,
inner ±1.6, over 7s with `cubic-bezier(0.45, 0, 0.55, 1)`, alternating
forever in the first viewport. On the contact form's sent state the mark
reappears small (3.5rem) and breathes exactly once (`fo-once`,
iteration-count 2 = one open-and-close). `prefers-reduced-motion: reduce`
disables all drift. The wordmark (symbol + drawn letterforms) is a separate
static lockup, used small at top-left only.

## Do's and Don'ts

### Do:
- **Do** paint every new surface transparent and let the body gradient be the ground.
- **Do** draw all structure as 1px cream hairlines, resting at cream/70 (actionable) or cream/40 (idle) and rising to full cream on hover/focus via a color transition.
- **Do** set all text in Hanken Grotesk, weight 400–500, with uppercase reserved for 0.14em-tracked labels and actions at ≤0.9rem.
- **Do** keep the mark as the only graphic and `currentColor` cream as its only fill; reuse the 7s breath (or the `fo-once` single-breath echo) as the only motion.
- **Do** honor `prefers-reduced-motion` for any motion, as the breath and smooth scroll already do.

### Don't:
- **Don't** introduce a second ink, an accent color, or semantic reds/greens — errors and confirmations are plain cream text.
- **Don't** add cards, panels, shadows, or rounded corners; the system has zero of each.
- **Don't** exceed weight 500 or the headline's 2.2rem ceiling; type never competes with the mark.
- **Don't** animate anything except the mark's crescents.
- **Don't** redraw or restyle the mark and wordmark paths; they are verbatim from the brand kit (01_Logo).
