# SiteFooter Specification

## Overview
- **Target file:** `src/components/SiteFooter.tsx`
- **Interaction model:** static

## Visual layout
- White background.
- 6 columns: Approach (single link), People (header + 4 sub-links), Careers (header + 3 sub-links), Global Presence (single link), Investor Login (single link), [legal column], [social icons column on right].
- Below the columns, a HUGE clipped `millennium` wordmark image — only the top half is visible, fades into white at the very bottom.

## DOM structure
```
<footer className="bg-white text-brand pt-24 pb-0 overflow-hidden">
  <div className="container max-w-[1440px] mx-auto px-6 grid grid-cols-12 gap-x-8 gap-y-12">

    <div className="col-span-2"><a href="/approach" className="font-bold">Approach</a></div>

    <div className="col-span-2">
      <a href="/people" className="font-bold">People</a>
      <ul className="mt-4 space-y-2 text-sm font-normal">
        <li><a href="/people/leadership">Leadership</a></li>
        <li><a href="/people/investment-professionals">Investment Professionals</a></li>
        <li><a href="/people/technology">Technology</a></li>
        <li><a href="/people/core-infrastructure">Core Infrastructure</a></li>
      </ul>
    </div>

    <div className="col-span-2">
      <a href="/careers" className="font-bold">Careers</a>
      <ul className="mt-4 space-y-2 text-sm font-normal">
        <li><a href="/careers/life-at-millennium">Life at Millennium</a></li>
        <li><a href="/careers/students">Students</a></li>
        <li><a href="/careers/jobs">Jobs</a></li>
      </ul>
    </div>

    <div className="col-span-1"><a href="/global-presence" className="font-bold">Global Presence</a></div>
    <div className="col-span-1"><a href="/login" className="font-bold">Investor Login</a></div>

    <div className="col-span-2">
      <ul className="space-y-2 text-sm font-normal">
        <li><a href="/terms">Terms of Use</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/disclosures">Disclosures</a></li>
        <li><a href="/notices">Notices</a></li>
        <li><a href="/media">Media Inquiries</a></li>
      </ul>
    </div>

    <div className="col-span-2 flex items-start justify-end gap-2">
      <a aria-label="LinkedIn" className="w-9 h-9 bg-brand text-white rounded grid place-items-center">
        <LinkedInIcon className="w-5 h-5" />
      </a>
      <a aria-label="Instagram" className="w-9 h-9 bg-brand text-white rounded grid place-items-center">
        <InstagramIcon className="w-5 h-5" />
      </a>
      <a aria-label="YouTube" className="w-9 h-9 bg-brand text-white rounded grid place-items-center">
        <YouTubeIcon className="w-5 h-5" />
      </a>
    </div>

  </div>

  <div className="mt-24 -mb-12 overflow-hidden">
    <Image
      src="/images/footer-millennium-wordmark.png"
      alt="Millennium"
      width={2560}
      height={358}
      priority={false}
      className="w-full h-auto"
    />
  </div>
</footer>
```

## Computed styles

### Footer
- background: white
- color: var(--brand)
- padding-top: 96px
- font-family: var(--font-sans)

### Bold column headers
- font-weight: 700
- font-size: 16px
- color: var(--brand)
- margin-bottom: 16px

### Sub-link list items
- font-weight: 400
- font-size: 14px
- line-height: 1.6
- color: var(--brand)
- margin-bottom: 8px

### Social icon button
- width/height: 36px
- background: var(--brand)
- color: white
- border-radius: 4px
- icon size: 20×20

### Clipped wordmark
- width: 100% (image stretches across full container)
- aspect ratio preserved
- container has `overflow: hidden` and `negative margin-bottom` so only top half shows; or use `clip-path: inset(0 0 50% 0)` then translate.

## Responsive behavior
- **Desktop (≥1024)**: 12-col grid as above
- **Tablet (768-1023)**: collapse to 6 cols (2 rows of 3); social to second row
- **Mobile (<768)**: stack to single column, social row at the bottom; wordmark still clipped large

## Text content (verbatim)
All link labels and column headers as listed above.

## Assets
- `/images/footer-millennium-wordmark.png`

## Imports
- `Image` from `next/image`
- `LinkedInIcon`, `InstagramIcon`, `YouTubeIcon` from `@/components/icons`
- `Link` from `next/link`
