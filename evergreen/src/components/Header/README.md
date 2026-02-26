# Header

## Purpose
Provides a simple Evergreen-styled header for the application shell.

## Props
This component has no props.

## Example usage
```tsx
import { Header } from '@/components'

<AppLayout header={<Header />}>...</AppLayout>
```

## Styling notes
Uses `styles.module.css` for layout and typographic emphasis.

## Admin configuration
Navigation items are fetched from WordPress using a menu ID.
