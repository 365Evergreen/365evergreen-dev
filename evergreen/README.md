# 365 Evergreen Frontend (Azure Static Web Apps)

**Headless WordPress + React (Vite) + Azure SWA**

This project is the modern, headless rebuild of the 365 Evergreen frontend. It delivers a fast, secure, globally distributed UI powered by Azure Static Web Apps, with content served from a WordPress headless CMS via REST and GraphQL endpoints. The app is built with React + TypeScript + Vite and follows a modular, scalable architecture designed for long‑term maintainability.

---

## 🎯 Purpose

The goal of this frontend is to provide a **high‑performance, component‑driven UI** that consumes structured content from WordPress while remaining fully decoupled from the CMS. This enables:

- Modern frontend tooling (Vite, TSX, modular components)
- Evergreen‑style design system and layout scaffolding
- Secure, token‑based communication with WordPress APIs
- CI/CD via Azure Static Web Apps
- Zero‑infrastructure hosting with global CDN distribution
- Admin‑friendly content workflows in WordPress

---

## 🏗️ Architecture Overview

### Core Stack

- **React + TypeScript** — component-driven UI
- **Vite** — fast local dev, optimized builds
- **Azure Static Web Apps** — hosting, routing, auth, CI/CD
- **WordPress Headless CMS** — content source (REST + WPGraphQL)
- **SWA API (optional)** — serverless functions for secure proxying

### High-Level Flow

1. WordPress exposes content via REST and/or GraphQL.
2. The frontend fetches content at build time or runtime.
3. Azure SWA serves the static assets globally.
4. Optional SWA Functions handle secure API calls, caching, or token injection.

---

## 📁 Directory Structure

```
/src
  /components
  /layouts
  /pages
  /services
    api/
    auth/
    cms/
  /styles
  /utils
/public
/swa
  /routes.json
  /staticwebapp.config.json
.env
vite.config.ts
package.json
README.md
```

### Key Folders

- **components/** — reusable UI components (Evergreen blocks, cards, nav, footer)
- **layouts/** — page-level layout scaffolds (AppLayout, HomepageLayout, etc.)
- **services/cms/** — WordPress API clients, fetchers, caching helpers
- **services/auth/** — MSAL or custom token handling (if required)
- **swa/** — configuration for routing, headers, and API integration

---

## ⚙️ Local Development

### Prerequisites

- Node 18+
- Azure Static Web Apps CLI (`npm install -g @azure/static-web-apps-cli`)
- WordPress headless CMS endpoint (local or remote)

### Environment Variables

Create `.env`:

```
VITE_WORDPRESS_API_URL=https://your-wp-site.com/wp-json
VITE_WORDPRESS_GRAPHQL_URL=https://your-wp-site.com/graphql
VITE_SWA_API_URL=/api
```

### Start the Dev Server

```
pnpm install - Done
pnpm dev - Done
```

### Run with SWA Emulator (recommended)

```
swa start http://localhost:5173 --api-location ./api
```

This simulates the full Azure environment locally, including routing and functions.

---

## 🚀 Build & Deployment

### Build for Production

```
pnpm build
```

### Deploy via GitHub Actions (default SWA workflow)

Push to `main` and Azure SWA will:

- Build the Vite app
- Deploy static assets to the global CDN
- Deploy API functions (if present)
- Apply routing rules from `staticwebapp.config.json`

### Manual Deployment (optional)

```
swa deploy ./dist --env production
```

---

## 🔌 WordPress Integration

### Supported Content Types

- Pages
- Posts
- Evergreen Blocks (custom post type)
- Navigation menus
- Media assets
- Custom fields (ACF or native)

### Fetching Content

Use the CMS service layer:

```ts
import { getPageBySlug } from '@/services/cms/pages';

const page = await getPageBySlug('home');
```

### GraphQL Example

```ts
import { gql } from 'graphql-request';
import { wpClient } from '@/services/cms/graphql';

const query = gql`
  query GetHomepage {
    page(id: "home", idType: URI) {
      title
      content
    }
  }
`;

const data = await wpClient.request(query);
```

---

## 🧱 Evergreen Design System

This frontend includes a growing library of Evergreen components:

- Card Gallery
- Hero Banner
- Navigation Bar (config-driven)
- Footer
- Section Blocks
- Page Layouts
- Typography + Tokens

Each component is documented with:

- Purpose
- Props
- Usage examples
- Styling notes
- Admin configuration (if applicable)

---

## 🔐 Authentication (Optional)

If the app requires authenticated content or admin-only previews, MSAL can be enabled:

- `AuthService` handles login, logout, token acquisition
- SWA routes enforce protected paths
- API functions can validate tokens before proxying to WordPress

---

## 🧪 Testing

- **Vitest** for unit tests
- **React Testing Library** for component tests
- **Playwright** for end-to-end tests (optional)

Run tests:

```
npm run test
```

---

## 🛠️ Contributor Guide

### Adding a New Page

1. Create a file in `/src/pages/your-page.tsx`
2. Add a route in `staticwebapp.config.json` if needed
3. Fetch WordPress content via CMS services
4. Wrap with the appropriate layout

### Adding a New Component

1. Create a folder in `/src/components/MyComponent`
2. Add `index.tsx`, `styles.css`, and `README.md`
3. Export from `/src/components/index.ts`

### Updating CMS Models

- Update fetchers in `/src/services/cms`
- Add TypeScript interfaces in `/src/types`
- Ensure GraphQL queries match WordPress schema

---

## 📦 Deployment Environments

| Environment | Branch      | URL                                                                          |
| ----------- | ----------- | ---------------------------------------------------------------------------- |
| Production  | `main`      | https://gentle-smoke-0758f3d1e.1.azurestaticapps.net |
| Staging     | `preview/*` | Auto-generated preview URLs                                                  |

---

## 🧭 Roadmap

- Full Evergreen block library
- Dynamic navigation from WordPress menus
- Server-side caching layer for CMS responses
- Search powered by WPGraphQL + Algolia (optional)
- Multi-site support


