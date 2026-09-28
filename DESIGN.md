---
name: firstocean
description: A cropped aperture and a two-line headline on the brand gradient, a glass form, then a few lines on black.
colors:
  cream: "#e5e3e0"
  ink: "#1d1c1b"
  gradient-haze: "#898d8c"
  gradient-earth: "#74635a"
  gradient-slate: "#616b6a"
  glass: "rgba(29, 28, 27, 0.42)"
  glass-line: "rgba(229, 227, 224, 0.38)"
typography:
  display:
    fontFamily: '"Feature Display", var(--font-display), "Bodoni Moda", Georgia, serif'
    fontWeight: 400
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Lay Grotesk", var(--font-grotesk), "Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: "clamp(3.8rem, 5.5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Lay Grotesk", var(--font-grotesk), "Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: "1.65rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Lay Grotesk", var(--font-grotesk), "Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  field:
    fontFamily: '"Lay Grotesk", var(--font-grotesk), "Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Lay Grotesk", var(--font-grotesk), "Helvetica Neue", Helvetica, Arial, sans-serif'
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  page-x: "1.5rem"
  page-x-md: "3.5rem"
  stanza: "1.75rem"
  section: "5rem"
  section-md: "7rem"
  label-gap: "0.375rem"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.field}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  glass-panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "32px 24px"
---

# Design System: firstocean

## Overview

**Creative North Star: "The Cropped Symbol"**

The hero is the page. A vertical brand gradient fills the first viewport. From 768px the headline is two lines on the left; below that breakpoint the same words stack to four lines. On the right, the five-element aperture is cream and large enough that the viewport cuts it off. The wordmark Firstocean sits at the top left in the same grotesk. The refused arrangement is a centered logo with a caption underneath.

The next band continues the gradient's last stop and carries a glass form that overlaps the hero. Beneath that, the ground is solid black: two factual lines, then the backers and the copyright. Cream is the only ink. The crescents drift once when the page loads and once more when the form is sent.

Voice is a neutral grotesk. Two words in the headline, therapeutics and markets, switch to display italic. Lay Grotesk and Feature Display are named first in the stacks. Schibsted Grotesk and Bodoni Moda Italic are the faces the page loads.

**Key Characteristics:**
- Three-stop vertical gradient, then the same slate under the form, then solid ink.
- One foreground ink, cream; ink black is the lower ground and the button's hover text.
- Grotesk for sentences; display italic for two headline words only.
- The aperture is cream, enormous, and cropped by the right edge; its crescents drift once.
- The form is the only glass surface: translucent ink, a cream edge, blur, and a soft shadow.
- Square corners and sentence-case labels; structure is a 1px cream hairline.

## Colors

Three ground colors stacked in order — gradient, slate, ink — and one cream ink on top.

### Primary
- **Cream** (`#e5e3e0`): the only foreground. Text, the aperture, the wordmark, hairline strokes, the caret, the focus outline, and the selection background. Resting borders and the footer use the same cream at reduced opacity. Placeholders, when present, are cream at 72% opacity.

### Neutral
- **Gradient Haze** (`#898d8c`): the top stop of the hero gradient, at 3%.
- **Gradient Earth** (`#74635a`): the middle stop, at 52%.
- **Gradient Slate** (`#616b6a`): the bottom stop, at 100%, and the solid band the form sits on.
- **Ink** (`#1d1c1b`): the page ground under the form band, the `html` background, the selection text, and the send button's hover label.
- **Glass** (`rgba(29, 28, 27, 0.42)`): the form panel fill, ink at 42% opacity.
- **Glass Line** (`rgba(229, 227, 224, 0.38)`): the form panel's 1px edge, cream at 38% opacity.

### Named Rules
**The Three-Stop Rule.** The hero gradient is vertical and stops three times: haze at 3%, earth at 52%, slate at 100%. The form band is that same slate. Everything under it is solid ink. No fourth stop.

**The One-Ink Rule.** Cream is the only foreground. Borders, the footer, and the glass edge are cream at reduced opacity. The send button's hover inverts to ink on a cream fill. Errors and the confirmation stay cream; they do not introduce a status hue.

## Typography

**Display Font:** Feature Display, then the loaded face, then Bodoni Moda, Georgia, serif. The loaded face is Bodoni Moda Italic at weight 400. The display style sets italic, weight 400, and letter-spacing -0.02em. It has no size of its own; it inherits the headline.
**Body Font:** Lay Grotesk, then the loaded face, then Helvetica Neue, Helvetica, Arial, sans-serif. The loaded face is Schibsted Grotesk. The page sets weight 400.
**Label Font:** the same grotesk stack. There is no mono face.

**Character:** A tight grotesk at regular weight carries every sentence. A high-contrast italic appears for two words of the headline and nowhere else.

### Hierarchy
- **Display** (italic, 400, letter-spacing -0.02em, size inherited): the words therapeutics and markets inside the headline.
- **Headline** (400, `clamp(3.8rem, 5.5vw, 5.5rem)` from 768px, line-height 0.96, letter-spacing -0.035em): the only `h1`. From 768px it is two lines, max-width 12em. Below 768px the same words use `clamp(2.65rem, 11.2vw, 3.5rem)`, max-width 8.2em, and stack to four lines.
- **Title** (400, 1.65rem from 768px, line-height 1, letter-spacing -0.03em): the wordmark Firstocean. Below 768px it is 1.35rem.
- **Body** (400, 1.25rem from 768px, line-height 1.55): the two factual lines, max-width 40rem, with 1.75rem between them. Below 768px the size is 1.125rem.
- **Field** (400, 1.05rem, line-height 1.5): input text and the sent confirmation.
- **Label** (400, 0.95rem, line-height 1.5, sentence case, no extra tracking): field labels and the send action. The footer uses the same size at cream 80% opacity.

### Named Rules
**The Two-Face Rule.** The grotesk sets every sentence. Display italic is only the two headline words, therapeutics and markets.

**The Sentence-Case Rule.** Field labels and the send action are sentence case at the label size, with no added letter-spacing. Tracked uppercase is not a label style in this system.

## Layout

Single column, one page. Horizontal padding is 1.5rem, and 3.5rem from 768px, on the hero, the form band, and the ink section. The only breakpoint in the layout is 768px.

The hero is at least one viewport tall and clips its overflow. Its type column is a flex column, vertically centered, stacked above the mark. The wordmark is absolute: 2rem from the top, aligned to the page padding, and 3rem from the top at 768px.

The aperture is absolute and does not receive clicks. Below 768px it sits 62vw past the right edge and 4vh below the hero, at width `min(150vw, 40rem)`. From 768px it is centered on the hero's vertical middle, 34vw past the right edge, at width `min(88vw, 58rem)`.

The form band is the slate stop. It has almost no top padding and 5rem of bottom padding (7rem from 768px). The glass panel is at most 34rem wide, padded 32px 24px (40px 32px from 768px), and pulled up 2.5rem (4rem from 768px) so it overlaps the hero.

The ink section pads 5rem vertically (7rem from 768px). The two lines and the footer share a 40rem measure. The footer sits 5rem below the lines (7rem from 768px) as a wrapping row: backers on one side, copyright on the other. Smooth scroll applies only when motion is allowed.

### Named Rules
**The Cropped-Mark Rule.** The aperture is cream, sized far past the column, and clipped by the hero's right edge. It is not centered, and the headline is not a caption under it.

## Elevation & Depth

The page is three flat bands: the hero gradient, the slate form band, and solid ink. Depth at the join is the glass panel alone. It blurs 18px of whatever is behind it and casts one soft shadow. Nothing else lifts, and the bands do not use tonal cards.

### Shadow Vocabulary
- **Glass** (`box-shadow: 0 18px 40px rgba(29, 28, 27, 0.28)`): the form panel only.

### Named Rules
**The Glass-Only Rule.** Bands are flat. The form panel is the only surface that lifts: ink at 42% opacity, 18px of backdrop blur, a 1px cream edge at 38% opacity, and the soft shadow. No other shadow.

## Shapes

Corners are square. Radius is 0 on the button, the fields, and the glass panel. The only curves are the aperture's barrel and crescents. Structure is a 1px cream stroke: a full border on the button, a bottom border on fields, and a full border on the glass.

### Named Rules
**The Square Rule.** Corner radius is 0. The only curves are the aperture's own.

**The Hairline Rule.** The button's border is 1px cream at 70% opacity. An idle field is a bottom stroke at 40% that becomes full cream on focus. The glass edge is cream at 38% opacity. State changes color, not thickness.

## Components

### Buttons
- **Shape:** square (0px radius).
- **Primary:** transparent ground, 1px cream border at 70% opacity, cream sentence-case label "Send" at 0.95rem, padding 12px 32px.
- **Hover:** cream fill, ink label. The border stays cream at 70%. Color transition, 150ms.
- **Focus:** 1px cream outline, 4px offset.
- **Disabled:** while sending, the label is "Sending…", opacity 60%, cursor wait.

### Inputs / Fields
- **Style:** transparent, no radius, no side borders. A 1px bottom stroke at cream 40%. No horizontal padding; 12px vertical padding. Text is cream at 1.05rem, line-height 1.5. The caret is cream.
- **Label:** sentence case, 0.95rem, stacked 0.375rem above the field. The shipped labels are "Email" and "Message".
- **Focus:** the bottom stroke becomes full cream. The field clears its own outline. Focus elsewhere on the page is the 1px cream outline, 4px offset.
- **Placeholder:** the shipped fields have no placeholder copy. The global placeholder color is cream at 72% opacity.
- **Error:** cream text at 0.9rem, line-height 1.5, beside the button. No status hue.
- **Textarea:** the same underline, with resizing turned off.
- **Sent:** the form is replaced by a row — the aperture at 3.5rem wide, then "Received. We read everything and will reply." at the field size. That small aperture runs the once-drift.

### Glass panel
- **Corner Style:** square (0px radius).
- **Background:** ink at 42% opacity, with 18px backdrop blur.
- **Shadow Strategy:** the glass shadow only. See Elevation & Depth.
- **Border:** 1px cream at 38% opacity.
- **Internal Padding:** 32px 24px, and 40px 32px from 768px. Max width 34rem. The panel holds the form and nothing else.

### Wordmark
Typeset "Firstocean", not a drawn lockup. Grotesk, 1.65rem from 768px (1.35rem below), line-height 1, letter-spacing -0.03em, cream. Absolute at the hero's top left, aligned to the page padding. It is not a link.

### The Aperture Mark
The five-element symbol, paths verbatim from the brand kit, filled with `currentColor` (cream on this page). Each crescent pair is its own group. Outer crescents translate 3.4px outward; inner crescents translate 1.6px; the timing is 7s, `cubic-bezier(0.45, 0, 0.55, 1)`, alternate. The shipped mark always sets the iteration count to 2, so the pair runs once out and once back. The hero mark does this on load. The sent-state mark, 3.5rem wide, does it again. Reduced motion sets the drift to none.

### Named Rules
**The Once-Drift Rule.** Crescent motion is a 7s alternate drift, outer 3.4px and inner 1.6px. The shipped mark caps that at two iterations: one open and one close. It runs on load and again when the form is sent. Reduced motion removes it.

## Do's and Don'ts

### Do:
- **Do** paint the hero with the three-stop vertical gradient (haze at 3%, earth at 52%, slate at 100%) and paint the page under the form band with solid ink.
- **Do** set sentences in the grotesk stack, Lay Grotesk named first and Schibsted Grotesk loaded behind it, and set only therapeutics and markets in display italic, Feature Display named first and Bodoni Moda Italic loaded behind it.
- **Do** crop the cream aperture on the hero's right edge, and run its crescent drift once on load and once when the form is sent.
- **Do** place the form on the glass panel and keep every other surface flat.
- **Do** draw controls square and sentence case: cream hairlines, and a send button that fills cream with an ink label on hover.
- **Do** honor reduced motion by disabling the drift and smooth scroll.

### Don't:
- **Don't** center the mark, or set the headline as a caption under a logo.
- **Don't** add a fourth gradient stop, or paint the factual lines on the gradient.
- **Don't** set the page in one family, or use display italic outside those two headline words.
- **Don't** style labels or the send action as tracked uppercase.
- **Don't** add a shadow to anything except the glass panel.
- **Don't** redraw the aperture paths.
