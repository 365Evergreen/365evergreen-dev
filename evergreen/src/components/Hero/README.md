# Hero

## Purpose
Highlights a primary message and call-to-action on key pages.

## Props
- `title`: Primary headline.
- `subtitle`: Optional supporting copy.
- `ctaLabel`: Optional call-to-action label.
- `ctaHref`: Optional call-to-action link.

## Example usage
```tsx
import { Hero } from '@/components'

<Hero
  title="Headless content, evergreen delivery"
  subtitle="WordPress-managed content delivered through a fast, static frontend."
  ctaLabel="Explore the CMS"
  ctaHref="/about"
/>
```

## Styling notes
Uses a gradient background and floating accent shape for depth.

## Admin configuration
Hero content can be mapped to WordPress fields once available.
