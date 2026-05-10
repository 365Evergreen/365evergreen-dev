# ContentCardGrid

## Purpose
Displays archive-style content cards for posts or custom post types in a responsive grid.

## Props
- `items`: Array of content summaries with title, excerpt, URI, slug, and optional featured image.
- `title`: Optional section heading.
- `intro`: Optional supporting copy.
- `isLoading`: Optional loading state.
- `error`: Optional error message.
- `emptyMessage`: Optional empty-state message.

## Example usage
```tsx
import { ContentCardGrid } from '@/components'

<ContentCardGrid
  title="Latest posts"
  intro="Insights and updates from the team."
  items={items}
/>
```

## Styling notes
Uses responsive cards with one column on mobile, two on tablet, and three on desktop.

## Admin configuration
The component is presentation-only. Data can come from posts, resources, or other WordPress content types.
