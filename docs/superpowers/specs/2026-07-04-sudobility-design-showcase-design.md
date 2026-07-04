# Sudobility Design System Showcase — Design Spec

**Date:** 2026-07-04
**Status:** Approved (pending spec review)
**Location:** `~/projects/sudobility_design`

## 1. Purpose

Extract the design-system showcase currently living at `/internal/design` in the
`mail_box` app into a standalone web application. The new app is a public,
self-contained reference for the Sudobility design system: it presents the
design-area catalog (colors, typography, components, patterns) as its home page,
lets visitors navigate into per-area showcase pages, and documents the
underlying `@sudobility/*` libraries with links to their GitHub repositories.

It has **no authentication, no wallet, and no backend API** — mirroring the
architecture of the `~/projects/sudobility` landing page, which is the
structural reference for this project.

## 2. Goals & Non-Goals

### Goals

- Standalone React 19 + TypeScript + Vite + Tailwind app at `~/projects/sudobility_design`.
- Reuse the `@sudobility/building_blocks` app shell (topbar, language selector,
  footer) so the language selector and layout come "for free."
- Home page = the ported `DesignSystemPage` (grid of 22 design areas).
- All 21 design sub-pages ported and reachable from the home grid.
- Topbar navigation: **Docs** and **Settings** menu items + built-in language
  selector. No login.
- A **Settings** page with appearance controls (light/dark theme, font size,
  design-theme selector).
- A **Docs** page with design-system overview, a how-to-use snippet, and GitHub
  repo cards for all seven `@sudobility/*` libraries.

### Non-Goals

- No translation of the 21 design showcase pages (they stay English, as in the
  source; only the app chrome is translated).
- No auth, wallet, email, subscription, or analytics-driven features.
- No prerender/SSG pipeline in the initial version.
- No new design components — this app *showcases* existing `@sudobility/design`
  and `@sudobility/components`, it does not extend them.

## 3. Reference Architecture

The project is structurally cloned from `~/projects/sudobility` (the Sudobility
landing page), which demonstrates the minimal setup for a `building_blocks`-based
app with no auth/backend:

- `main.tsx` → `App.tsx` → `SudobilityApp` (from `@sudobility/building_blocks`)
  → Routes.
- `@sudobility/di` `initializeNetworkService()` called once at module load.
- **Stubs system**: `@sudobility/building_blocks` has optional peer dependencies
  this app does not install. `vite.config.ts` aliases redirect those imports to
  no-op stub files. This must be replicated or the build breaks.

  | Import path | Stub file |
  | --- | --- |
  | `firebase/auth` | `src/stubs/firebase-auth.ts` |
  | `@sudobility/di_web` | `src/stubs/di_web.ts` |
  | `@sudobility/auth_lib` | `src/stubs/auth_lib.ts` |
  | `@sudobility/subscription-components` | `src/stubs/subscription-components.ts` |
  | `@sudobility/devops-components` | `src/stubs/devops-components.ts` |
  | `@sudobility/subscription_lib` | `src/stubs/subscription_lib.ts` |

  Note: the real `@sudobility/di_web/vite` `serviceWorkerPlugin` is imported in
  `vite.config.ts` at Node level and is NOT affected by the alias (same as
  reference). If service worker setup is not needed initially, it may be omitted;
  match whatever the reference build requires.

## 4. Dependencies

Match the versions used by `~/projects/sudobility` unless a design showcase page
requires a newer one.

### Runtime `@sudobility/*`
- `@sudobility/building_blocks` — app shell (`SudobilityApp`, `AppTopBar`,
  `AppFooterForHomePage`, and breadcrumb components if used).
- `@sudobility/components` — `ThemeProvider`, `LayoutProvider`, `Theme`,
  `FontSize`, `Select*`, `CodeBlock`, `BreadcrumbSection`, and the UI primitives
  the showcase pages consume.
- `@sudobility/design` — design tokens, `ui`, `textVariants`, `designTokens`,
  and the `@sudobility/design/themes` runtime theme system.
- `@sudobility/di` — `initializeNetworkService`.
- `@sudobility/di_web` — declared but stubbed (see §3).
- `@sudobility/seo_lib` — `SEOHead`, `SEOHeadProvider`.
- `@sudobility/types` — shared types (transitive).

### Other runtime
`@heroicons/react`, `@radix-ui/*` (dialog, select, tabs, switch, label, slot,
alert-dialog — needed by `ThemeSwitcher` and the modal/overlay/forms showcase
pages), `react`, `react-dom`, `react-router-dom` (v7), `i18next`,
`i18next-browser-languagedetector`, `i18next-http-backend`, `react-i18next`,
`react-helmet-async`, `firebase`, `web-vitals`, `class-variance-authority`,
`clsx`, `tailwind-merge`, `bs58` (if a transitive requires it, match reference).

### Dev
Match reference: `vite` (v6), `@vitejs/plugin-react`, `typescript`,
`typescript-eslint`, `eslint` + plugins, `prettier`, `tailwindcss` (v3),
`postcss`, `autoprefixer`, `@types/*`.

## 5. Routing

All routes are language-prefixed under `/:lang`. The `/internal` prefix from the
source is **dropped** — this whole app is the design system, so paths are
shorter.

| Route | Page | Notes |
| --- | --- | --- |
| `/:lang` | `DesignSystemPage` (Home) | Eager or lazy; grid of 22 areas |
| `/:lang/design/colors` | `ColorsPage` | lazy |
| `/:lang/design/text` | `TypographyPage` | lazy |
| `/:lang/design/forms` | `FormsPage` | lazy |
| `/:lang/design/buttons` | `ButtonsPage` | lazy |
| `/:lang/design/cards` | `CardsPage` | lazy |
| `/:lang/design/badges` | `BadgesPage` | lazy |
| `/:lang/design/alerts` | `AlertsPage` | lazy |
| `/:lang/design/inputs` | `InputsPage` | lazy |
| `/:lang/design/loading` | `LoadingStatesPage` | lazy |
| `/:lang/design/modals` | `ModalsPage` | lazy |
| `/:lang/design/navigation` | `NavigationPage` | lazy |
| `/:lang/design/data-display` | `DataDisplayPage` | lazy |
| `/:lang/design/forms-advanced` | `FormsAdvancedPage` | lazy |
| `/:lang/design/notifications-feedback` | `NotificationsFeedbackPage` | lazy |
| `/:lang/design/layout-spacing` | `LayoutSpacingPage` | lazy |
| `/:lang/design/tables-grids` | `TablesGridsPage` | lazy |
| `/:lang/design/icons-illustrations` | `IconsIllustrationsPage` | lazy |
| `/:lang/design/overlays-portals` | `OverlaysPortalsPage` | lazy |
| `/:lang/design/micro-interactions-animations` | `MicroInteractionsAnimationsPage` | lazy |
| `/:lang/design/accessibility` | `AccessibilityPage` | lazy |
| `/:lang/design/performance` | `PerformancePage` | lazy |
| `/:lang/settings` | `SettingsPage` (new) | lazy |
| `/:lang/docs` | `DocsPage` (new) | lazy |
| `/` | redirect → `/en` (or detected lang) | |
| `*` | redirect → `/en` | |

**Path updates required in ported pages:** every internal link inside the source
pages currently points at `/internal/design/...`. The home `DesignSystemPage`'s
`designAreas[].path` values and any cross-page links must be rewritten to drop
`/internal` (→ `/design/...`). The `LocalizedLink` component prefixes the active
language automatically.

## 6. Layout Shell (`ScreenContainerLayout`)

Cloned from the reference `sudobility/src/App.tsx` `ScreenContainerLayout`:

- Wraps content in `LayoutProvider mode="standard"` and the app `ThemeProvider`.
- Sticky `AppTopBar` with:
  - `logo` → click navigates to `/:lang` home.
  - `menuItems`: **Docs** (`/:lang/docs`) and **Settings** (`/:lang/settings`).
  - `languages` / `currentLanguage` / `onLanguageChange` → built-in language
    selector, wired to `i18n.changeLanguage` + navigate (same handler shape as
    reference).
  - `LinkComponent` = a `react-router` `Link` wrapper.
- `AppBreadcrumbs` (from `@sudobility/building_blocks`, same as sudobility)
  rendered **in the shell**, with items computed dynamically from the current
  path via the ported `useBreadcrumbs` hook.
- Main `<Outlet>` inside `<Suspense>` with a loading fallback.
- `AppFooterForHomePage` with library/repo link sections and copyright.
- Language-sync `useEffect`: if `:lang` param is unsupported, redirect to `/en`;
  otherwise `i18n.changeLanguage(lang)`.

**Page layout ownership (sudobility pattern):** ALL chrome — topbar,
breadcrumbs, the `<main>` content wrapper, and footer — lives in the shell
(`ScreenContainerLayout`), exactly as in `sudobility/src/App.tsx`. Individual
pages render ONLY their inner content plus `SEOHead`; they do **not** render
their own `<main>` element or `<BreadcrumbSection>`. This is a change from the
source pages, which each rendered their own `<main role="main">` +
`<BreadcrumbSection>` — those wrappers are stripped during porting (see §7/§11).

## 7. Home Page (`DesignSystemPage`) and per-page porting rule

Ported from `mail_box/src/pages/internal/DesignSystemPage.tsx`. Content retained:

- Header badge, title (`{appName} Design System`), intro copy.
- Token stat cards (font families, text sizes, spacing units, border radii) read
  from `designTokens`.
- **Retained:** the `ThemeSwitcher` (design-palette selector) + live
  `ThemePreview` panel above the grid (per user decision).
- 3-column responsive grid of design-area cards; each `LocalizedLink` points to
  its `/design/<area>` route (paths updated per §5).
- "Design System Architecture" info section at the bottom.

**Uniform porting transform applied to the home page AND all 21 sub-pages:**

1. Copy source file → new location (`src/pages/DesignSystemPage.tsx` for home,
   `src/pages/design/<Name>.tsx` for sub-pages).
2. **Strip the chrome wrapper** (per §6): remove the `import { BreadcrumbSection }`
   and `useBreadcrumbs` imports, the `const { items } = useBreadcrumbs()` line,
   the `<BreadcrumbSection … />` element, and the outer
   `<main className="flex-1 overflow-auto" role="main" …>` element — keeping the
   inner content (typically the `<div className="max-w-7xl mx-auto px-4 py-12">`
   container) wrapped in a fragment alongside `<SEOHead>`.
3. Replace every `/internal/design` link/path with `/design` (drops the prefix).
4. Keep the `{ emailDomain, appName }` prop signature; the route element supplies
   them from `CONSTANTS` (`appName` = "Sudobility Design System",
   `emailDomain` = `CONSTANTS.APP_DOMAIN`).
5. **`BadgesPage` only:** replace its `<StandardPageLayout>` wrapper (and the
   `standard-page-layout` import) with the same fragment shell as its siblings —
   `<><SEOHead …/><div className="max-w-7xl mx-auto px-4 py-12">{content}</div></>`.
   Keep the `CodeBlock` import (→ ported `../../components/CodeBlock`).

## 8. Settings Page (`/:lang/settings`) — new

A new page presenting appearance controls:

- **Light/Dark theme** toggle — via `@sudobility/components` `ThemeProvider`
  theme state (the app-level `ThemeProvider` exposes current theme + setter;
  confirm the exact hook/API from `@sudobility/components` during implementation).
- **Font size** control — `FontSize` from `@sudobility/components`.
- **Design theme** selector — the `ThemeSwitcher` bound to `DesignThemeContext`.

Uses `textVariants`/`ui` for styling. Renders `SEOHead` (may be indexable or
`noIndex` — default `noIndex` to match the dev-tool origin; can revisit).

## 9. Docs Page (`/:lang/docs`) — new

Content:

1. **Overview** — what the Sudobility design system is: design tokens +
   `textVariants` approach, Tailwind integration, class-based dark mode, runtime
   theme system.
2. **How to use** — a `CodeBlock` install snippet: add `@sudobility/design` +
   `@sudobility/components`, configure Tailwind to scan the design package, use
   `textVariants`/`ui` instead of hardcoded classes.
3. **Library repos** — a responsive grid of cards, one per library, each linking
   to its GitHub repo with a one-line description:

   | Library | Repo | One-liner |
   | --- | --- | --- |
   | `@sudobility/design` | github.com/johnqh/design_system | Design tokens, `textVariants`, theme system |
   | `@sudobility/components` | github.com/johnqh/mail_box_components | Shared React UI components |
   | `@sudobility/building_blocks` | github.com/johnqh/building_blocks | App shell: topbar, footer, layout |
   | `@sudobility/di` | github.com/johnqh/di | Dependency-injection container |
   | `@sudobility/di_web` | github.com/johnqh/di_web | Web DI bindings (Firebase, SW, i18n) |
   | `@sudobility/seo_lib` | github.com/johnqh/seo_lib | SEO utilities (`SEOHead`) |
   | `@sudobility/types` | github.com/johnqh/types | Shared TypeScript types |

   Repo URLs are read from each installed package's `package.json` `repository`
   field (verified during exploration).

Chrome prose on this page is translated via the chrome i18n namespace (§10);
code snippets stay literal.

## 10. Internationalization

- Same 15 languages as the reference: `en, zh, zh-hant, ja, ko, es, fr, de, it,
  pt, ru, sv, th, uk, vi`.
- `/:lang` routing, `i18n.ts` `supportedLanguages` canonical list, `LANGUAGE_INFO`
  (name + flag) for the topbar selector — cloned from reference.
- A single **chrome** locale namespace (e.g. `common`) holds only the app-shell
  strings: topbar menu labels (Docs, Settings), footer sections, Settings page
  labels, and Docs page prose. `public/locales/{lang}/common.json`.
- The 21 design showcase pages remain hardcoded English and carry `noIndex`.
- English (`en`) is the source of truth. **Initial version ships `en` only** —
  the `/:lang` routing, `supportedLanguages` list, and topbar language selector
  are all in place, but only `public/locales/en/common.json` is authored. Other
  locales are generated later via the reference `localize`/`localized` scripts.
  Non-`en` languages selected in the selector fall back to English chrome until
  their locale files exist.

## 11. Ported Support Modules

Copied from `mail_box` (adjusting import paths, dropping mail-specific bits):

- `components/LocalizedLink.tsx` — language-prefixed `Link` wrapper.
- `hooks/useBreadcrumbs.ts` — a **simplified** hook (NOT the full mail_box
  `BreadcrumbBuilder`, which pulls mail-specific label maps + `stringExtensions`
  + `languageRouting`). It derives `BreadcrumbItem[]` (`{ label, href?, current? }`,
  the shape `@sudobility/components` `BreadcrumbItem` / `building_blocks`
  `AppBreadcrumbs` expect) from the current pathname against a small label map
  for this app's routes (Home, Design areas, Settings, Docs). Consumed by the
  **shell**, not by pages.
- `components/CodeBlock.tsx` — thin wrapper over `@sudobility/components`
  `CodeBlock` (used by `BadgesPage` and the Docs how-to snippet).
- `components/internal/ThemeSwitcher.tsx` — design-palette `Select`, bound to
  `DesignThemeContext`.
- `components/internal/ThemePreview.tsx` — live palette preview.
- `context/DesignThemeContext.tsx` + `config/designTheme.ts` — runtime design
  theme provider (persists selection, injects CSS vars via
  `@sudobility/design/themes`).

The `DesignThemeProvider` wraps the app (inside `SudobilityApp`) so the switcher
works app-wide and the home/Settings pages share one theme state.

## 12. Config / Constants

- `src/config/constants.ts` — `APP_NAME` = "Sudobility Design System",
  `COMPANY_NAME`, `SUPPORT_EMAIL`, repo URL map for the Docs page.
- `src/config/initialize.ts` — `initializeNetworkService()` (+ any DI the shell
  requires), mirroring reference.
- `src/config/seo.ts` — `SEOHeadProvider` config (base URL, app name, supported
  languages).
- `src/i18n.ts` — i18next config, `supportedLanguages`, `languageNames`.

## 13. Build, Tooling, Deployment

- **Package manager:** bun.
- **Scripts:** clone the reference `package.json` scripts (`dev`, `build`,
  `lint`, `format`, `preview`, `localize`, `localized`). Prune SEO/prerender
  steps not needed initially, keeping the app buildable with `tsc -b && vite
  build`.
- **Tailwind:** `tailwind.config.js` cloned from reference, configured to scan
  `@sudobility/design` (and `@sudobility/components`) so design token classes are
  not purged. Class-based dark mode.
- **Deployment:** Cloudflare Pages via `wrangler.toml` (output `dist/`), same as
  reference. Firebase config via `VITE_FIREBASE_*` env vars (optional; analytics
  can be a no-op if unset).
- **Logo:** reuse a `public/logo.png` placeholder (text logo acceptable
  initially).

## 14. Assumed Defaults (approved)

- App name: "Sudobility Design System"; package name: `sudobility-design`.
- Deployment: Cloudflare Pages via `wrangler.toml`.
- Logo: simple text / `logo.png` placeholder.
- SEO: `SEOHeadProvider` + per-page `SEOHead`; design pages `noIndex`; no
  prerender pipeline initially.

## 15. Risks & Open Items

- **`@sudobility/components` theme/font-size API:** the exact hook/setter used by
  the Settings page (light/dark + font size) must be confirmed from the installed
  package during implementation; the reference forces `Theme.DARK` and does not
  expose a runtime toggle, so this is new usage.
- **Package versions (LOW risk — verified):** `@sudobility/design@1.1.43` and
  `@sudobility/components@5.0.92` are the *same* versions in both `mail_box` (which
  runs the source pages) and `sudobility` (the scaffold reference), so the pages
  and scaffold are known-compatible. The `@sudobility/design/themes` subpath
  (used by the theme system) ships in 1.1.43. Pin to these versions.
- **Ported-page dependencies (verified):** all 21 pages import only from
  `@sudobility/*`, `@heroicons/*`, `react`, plus `../../hooks/useBreadcrumbs`
  (removed during porting per §7) and `../../components/LocalizedLink`. The
  `@/design-system` references (ColorsPage, TypographyPage, OverlaysPortalsPage)
  are all inside display-only `code`/`<pre>` strings — NOT real imports — so no
  `@/design-system` alias is required. `BadgesPage` is the only page needing the
  `StandardPageLayout` refactor (§7 step 5).
- **TypeScript strictness:** the reference `tsconfig.json` sets `strict: true`,
  `noUnusedLocals: true`, `noUnusedParameters: true`, while the source pages come
  from a `strict: false` project. To avoid dozens of unused-var failures during
  the port, the new app's `tsconfig.json` keeps `strict: true` but sets
  `noUnusedLocals: false` and `noUnusedParameters: false`.
```
