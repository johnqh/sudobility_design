# Sudobility Design System

A standalone showcase for the Sudobility design system, extracted from the
`mail_box` app's `/internal/design` pages. The home page is a catalog of design
areas (colors, typography, components, patterns); each area has its own page
demonstrating the `@sudobility/design` + `@sudobility/components` primitives.

Built with React 19 + TypeScript + Vite + Tailwind CSS, on the
`@sudobility/building_blocks` app shell. No authentication, no backend.

## Commands

```bash
bun install          # install dependencies
bun run dev          # dev server on http://localhost:4000
bun run build        # type-check + production build (tsc -b && vite build)
bun run preview      # preview the production build
bun run lint         # ESLint
bun run format       # Prettier
```

## Structure

- `src/App.tsx` — routes (`/:lang`, `/:lang/design/*`, `/:lang/settings`, `/:lang/docs`)
- `src/components/ScreenContainerLayout.tsx` — app shell (topbar, breadcrumbs, footer)
- `src/pages/DesignSystemPage.tsx` — home (design-area grid + live theme preview)
- `src/pages/design/*` — 21 design showcase pages
- `src/pages/SettingsPage.tsx` — appearance controls (light/dark, font size, design theme)
- `src/pages/DocsPage.tsx` — overview + library repo links
- `src/context/DesignThemeContext.tsx`, `src/config/designTheme.ts` — runtime design-theme system
- `src/stubs/*` — no-op stubs for `building_blocks` optional peer deps (aliased in `vite.config.ts`)

## Internationalization

The `/:lang` routing and language selector support 15 languages, but only the
`en` chrome locale (`public/locales/en/common.json`) is authored. The design
showcase pages themselves are English-only. Other locales fall back to English
until their `common.json` files are added.

## Theming

Two independent systems, both persisted to localStorage under distinct keys:

- **Light / dark + font size** — the `@sudobility/components` `ThemeProvider`
  (key `sudobility-design-theme`), controlled from Settings.
- **Design theme (palette)** — `DesignThemeContext` (key `sudobility-design-palette`),
  swaps the whole design-token palette live; controlled from Settings and the
  home page.

## Deployment

Cloudflare Pages (`wrangler.toml`, output `dist/`). Optional Firebase analytics
via `VITE_FIREBASE_*` env vars (see `.env.example`).
