# BlogGrid Component

## Purpose
Displays the most recent blog posts from WordPress in a responsive grid layout.

## Props
None. The component automatically fetches and displays up to 9 posts.

## Usage
```tsx
import { BlogGrid } from '@/components';

export function HomePage() {
  return (
    <div>
      <h1>Latest posts</h1>
      <BlogGrid />
    </div>
  );
}
```

## Features
- Fetches latest 9 posts from WordPress via GraphQL
- Responsive grid: stacked on mobile, 2 columns on tablet, 3 columns on desktop
- Displays featured image, title, excerpt, and read more link
- Loading and error states
- Cached for 5 minutes (300 seconds)

## Styling
Uses CSS Modules via `styles.module.css`. The grid layout adapts to screen size:
- Mobile: 1 column
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3 columns

## Admin Configuration
Posts are pulled automatically from WordPress. To control which posts appear:
- Publish/unpublish posts in WordPress admin
- Adjust post dates (most recent 9 are shown)
- Set featured images for better visual presentation
