## 🧩 Copilot Instructions for VS Code (Project‑Scoped)

These instructions guide GitHub Copilot to generate code, components, services, and documentation that align with the architecture and conventions of the 365 Evergreen headless frontend.

### Project Context
- This repo is an **Azure Static Web App** frontend for a **headless WordPress CMS**.
- The stack is **React + TypeScript + Vite**, with a modular, scalable architecture.
- The design language follows **Evergreen** conventions: sentence case, Fluent‑aligned spacing, clean component boundaries, and admin‑friendly configuration patterns.

---

## 🎛️ Coding Style and Architecture Rules

### Components
- Use **function components** with TypeScript.
- Co-locate files in a folder: `index.tsx`, `styles.css`, and `README.md`.
- Export components from `/src/components/index.ts`.
- Use **CSS Modules** or scoped class names.
- Keep components **pure**, stateless where possible, and accept props with explicit interfaces.

### Layouts
- Place page-level scaffolds in `/src/layouts`.
- Wrap pages with the appropriate layout and avoid duplicating layout logic inside pages.

### Pages
- Pages live in `/src/pages` and follow file-based routing conventions.
- Fetch WordPress content via the CMS service layer, not directly inside components.

---

## 🔌 WordPress CMS Integration

### Fetching
- Use the CMS service layer in `/src/services/cms`.
- Prefer **GraphQL** for structured content; fall back to REST only when necessary.
- All fetchers must:
  - Use typed interfaces from `/src/types`.
  - Handle errors gracefully.
  - Support optional caching.

### Example Pattern
```ts
import { getPageBySlug } from '@/services/cms/pages';

export async function loader() {
  return await getPageBySlug('home');
}
```

---

## 🧱 Evergreen Design System

### Component Expectations
- Follow Evergreen’s tone: clean, minimal, accessible.
- Use Fluent‑aligned spacing tokens and sentence case for labels.
- Provide:
  - A clear purpose statement
  - Props interface
  - Usage examples
  - Styling notes
  - Admin configuration guidance (if applicable)

### Example Component Skeleton
```tsx
import styles from './styles.module.css';

interface MyComponentProps {
  title: string;
  description?: string;
}

export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <section className={styles.root}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </section>
  );
}
```

---

## ⚙️ API & SWA Integration

### SWA Functions
- Place functions in `/api`.
- Use them for:
  - Secure proxying to WordPress
  - Token injection
  - Caching
  - Any server-side logic that shouldn’t run in the browser

### Routing
- All routing rules live in `staticwebapp.config.json`.
- Copilot should not generate ad‑hoc routing logic inside components.

---

## 🧪 Testing

### Unit Tests
- Use **Vitest** + **React Testing Library**.
- Co-locate tests with components using `ComponentName.test.tsx`.

### E2E Tests
- Use **Playwright** (optional).
- Store tests in `/tests/e2e`.

---

## 📝 Documentation Requirements

### For Every Component
- Create a `README.md` inside the component folder.
- Include:
  - Purpose
  - Props
  - Example usage
  - Styling notes
  - Admin configuration (if relevant)

### For Services
- Document:
  - Purpose
  - API shape
  - Expected inputs/outputs
  - Error handling
  - Example usage

---

## 🧭 Copilot Behaviour Expectations

Copilot should:
- Generate code that matches the folder structure and conventions above.
- Prefer TypeScript interfaces over inline types.
- Use named exports.
- Avoid generating unused imports or placeholder code.
- Suggest component scaffolds that include:
  - Props interface
  - Minimal JSX
  - Styles import
  - Clean, readable structure
- Use UK English spelling and sentence case for labels and titles
- Use UK date formats in documentation and comments (e.g., dd/mm/yyyy)

Copilot should **not**:
- Generate inline styles.
- Create new architectural patterns.
- Fetch WordPress content directly inside components.
- Create global state unless explicitly requested.
- Add libraries not already in the project.
