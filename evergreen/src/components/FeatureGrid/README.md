# FeatureGrid

## Purpose
Highlights a short set of value propositions in a responsive card grid.

## Props
- `title`: Optional section heading.
- `intro`: Optional supporting copy above the grid.
- `items`: Array of feature cards with `title`, `description`, and optional `bullets`.

## Example usage
```tsx
import { FeatureGrid } from '@/components'

const items = [
  {
    title: 'Faster content delivery',
    description: 'Serve key marketing content through a performant frontend.',
    bullets: [
      'Reduce reliance on slow page assembly',
      'Keep key value points easy to scan',
    ],
  },
  {
    title: 'Cleaner editing workflow',
    description: 'Keep editorial updates manageable while preserving design quality.',
    bullets: [
      'Separate design structure from content updates',
      'Support future CMS mapping when needed',
    ],
  },
  {
    title: 'Responsive by default',
    description: 'Present the same polished story across mobile, tablet, and desktop.',
    bullets: [
      'Single column on mobile',
      'Three columns on desktop',
    ],
  },
]

<FeatureGrid
  title="Why teams choose Evergreen"
  intro="Three core strengths presented in a clear, scannable layout."
  items={items}
/>
```

## Styling notes
Uses CSS Modules and shifts from one column on mobile to three columns on desktop.

## Admin configuration
The current homepage usage is repo-controlled. The `items` prop can later be mapped to WordPress fields if editorial control is needed.
