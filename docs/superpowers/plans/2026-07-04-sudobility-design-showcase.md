# Sudobility Design System Showcase — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the `/internal/design` design-system showcase from `mail_box` into a standalone React app at `~/projects/sudobility_design`, using the `sudobility` landing page as the structural scaffold.

**Architecture:** React 19 + TypeScript + Vite + Tailwind, no auth/backend. The `@sudobility/building_blocks` `SudobilityApp` shell provides the app frame; a `ScreenContainerLayout` (cloned from `sudobility`) owns the topbar (Docs / Settings menu + language selector), dynamic breadcrumbs, `<main>`, and footer. Design pages render only their inner content. A stubs system aliases the shell's optional peer deps to no-ops.

**Tech Stack:** bun, Vite 6, React 19, react-router v7, i18next, Tailwind 3, `@sudobility/{building_blocks,components,design,di,seo_lib,types}`, `@heroicons/react`, `@radix-ui/*`.

## Global Constraints

- **Package manager:** `bun` (never npm/yarn).
- **Project root:** `~/projects/sudobility_design` (`/Users/johnhuang/projects/sudobility_design`). All paths below are relative to it.
- **Pinned versions:** `@sudobility/design@1.1.43`, `@sudobility/components@5.0.92` (verified same as `mail_box` source + `sudobility` scaffold). Other `@sudobility/*` + tooling versions: copy from `~/projects/sudobility/package.json` verbatim.
- **App name:** "Sudobility Design System". **Package name:** `sudobility-design`.
- **Routing:** all routes under `/:lang`; `/internal` prefix is dropped (`/:lang/design/<area>`).
- **i18n:** 15 languages wired, but only `en` locale authored now; single `common` namespace for chrome only. Design pages stay English.
- **Layout ownership:** topbar, breadcrumbs, `<main>`, footer live ONLY in the shell. Pages render content + `SEOHead` only.
- **TypeScript:** `strict: true` but `noUnusedLocals: false`, `noUnusedParameters: false`.
- **Verification model:** the reference project has **no test framework** and these are static showcase pages. Per-task verification is therefore `bun run build` (`tsc -b` + `vite build`) passing, `bun run lint` clean, and a browser smoke-check of the affected route(s) via `bun run dev` (port 4000). This intentionally replaces unit-test TDD, matching the reference codebase's conventions.
- **Git:** the user commits manually; each task ends with a `git commit` step the executor runs only after the user has initialized the repo (Task 1 Step 2). Do NOT push.
- **Reference files:** when a step says "copy from reference", the source is `~/projects/sudobility/<path>` (scaffold) or `~/projects/mail_box/<path>` (design pages). Read the current file — do not reproduce from memory.

---

## File Structure

```
sudobility_design/
├── package.json                       # deps + bun scripts (T1)
├── tsconfig.json                      # strict, no-unused relaxed (T1)
├── vite.config.ts                     # react plugin + stub aliases + dedupe (T1)
├── tailwind.config.js                 # createTailwindPreset + content globs (T1)
├── postcss.config.js                  # tailwind + autoprefixer (T1)
├── eslint.config.js                   # flat config (T1)
├── wrangler.toml                      # Cloudflare Pages (T12)
├── index.html                         # root HTML shell (T1)
├── .env.example / .gitignore          # (T1)
├── public/
│   ├── logo.png / favicon.ico         # placeholders (T1/T12)
│   └── locales/en/common.json         # chrome strings (T1, grows T2/T10/T11)
└── src/
    ├── main.tsx                       # bootstrap + configureTheme (T1)
    ├── index.css                      # design-token CSS vars + base (T1)
    ├── vite-env.d.ts                  # vite types (T1)
    ├── i18n.ts                        # i18next config, supportedLanguages (T1)
    ├── App.tsx                        # SudobilityApp + routes (T1, grows T2/T5/T7-10/T11)
    ├── config/
    │   ├── constants.ts               # APP_NAME, repo URLs (T1, repos T11)
    │   └── seo.ts                     # SEOHeadProvider config (T1)
    ├── stubs/                         # 6 no-op stubs (T1)
    ├── components/
    │   ├── LocalizedLink.tsx          # language-prefixed Link (T3)
    │   ├── CodeBlock.tsx              # wrapper over components CodeBlock (T3)
    │   ├── ScreenContainerLayout.tsx  # the shell (T2)
    │   └── internal/
    │       ├── ThemeSwitcher.tsx      # design-palette Select (T3)
    │       └── ThemePreview.tsx       # live preview (T3)
    ├── context/
    │   └── DesignThemeContext.tsx     # runtime design-theme provider (T3)
    ├── hooks/
    │   └── useBreadcrumbs.ts          # simplified breadcrumb builder (T3)
    └── pages/
        ├── DesignSystemPage.tsx       # home (T5)
        ├── SettingsPage.tsx           # (T11)
        ├── DocsPage.tsx               # (T11)
        └── design/                    # 21 ported showcase pages (T7-T10)
```

---

## Task 1: Project scaffold — boots to a placeholder home

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, `index.html`, `.env.example`, `.gitignore`, `src/main.tsx`, `src/index.css`, `src/vite-env.d.ts`, `src/i18n.ts`, `src/App.tsx`, `src/config/constants.ts`, `src/config/seo.ts`, `src/stubs/{firebase-auth,di_web,auth_lib,subscription-components,subscription_lib,devops-components}.ts`, `public/locales/en/common.json`, `public/logo.png` (placeholder)

**Interfaces:**
- Produces: `supportedLanguages`, `languageNames`, `SupportedLanguage` (from `src/i18n.ts`); `CONSTANTS` (from `src/config/constants.ts`); `seoHeadConfig` (from `src/config/seo.ts`); a booting `App` rendering `SudobilityApp` with a placeholder route at `/:lang`.

- [ ] **Step 1: Create the project directory and copy static scaffold files**

Create `/Users/johnhuang/projects/sudobility_design`. Copy these files **verbatim** from `~/projects/sudobility` (read each, then write an identical copy): `postcss.config.js`, `eslint.config.js`, `src/index.css`, `src/vite-env.d.ts`. Copy `~/projects/sudobility/src/i18n.ts` verbatim **except** change the `ns` array and `defaultNS` to the single chrome namespace:

```ts
// in src/i18n.ts .init({ ... })
ns: ['common'],
defaultNS: 'common',
```

- [ ] **Step 2: Initialize git and create `.gitignore`**

```bash
cd /Users/johnhuang/projects/sudobility_design
git init
```

Create `.gitignore` by copying `~/projects/sudobility/.gitignore` verbatim.

- [ ] **Step 3: Write `package.json`**

Base it on `~/projects/sudobility/package.json` with these changes: `"name": "sudobility-design"`, `"version": "0.1.0"`. Keep all `dependencies` and `devDependencies` from the reference, and ADD the Radix packages the showcase pages need (already present in reference: alert-dialog, dialog, label, select, slot, switch, tabs — keep them). Replace the `scripts` block with this trimmed set (no remote SEO/prerender fetches):

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json}\"",
  "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json}\""
}
```

- [ ] **Step 4: Write `tsconfig.json`**

Copy `~/projects/sudobility/tsconfig.json` verbatim, then override two flags:

```json
"noUnusedLocals": false,
"noUnusedParameters": false,
```

- [ ] **Step 5: Write `vite.config.ts`**

Copy `~/projects/sudobility/vite.config.ts` verbatim (it already contains the React plugin, `serviceWorkerPlugin()`, React dedupe/aliases, the six stub aliases, and `server.port = 4000`). No changes.

- [ ] **Step 6: Write the six stub files**

Copy each file from `~/projects/sudobility/src/stubs/` verbatim into `src/stubs/`: `firebase-auth.ts`, `di_web.ts`, `auth_lib.ts`, `subscription-components.ts`, `subscription_lib.ts`, `devops-components.ts`.

- [ ] **Step 7: Write `tailwind.config.js`**

Copy `~/projects/sudobility/tailwind.config.js` verbatim (the `createTailwindPreset()` preset, node_modules content globs, `darkMode: 'class'`, and theme extensions are all needed so design-token classes survive purge).

- [ ] **Step 8: Write `index.html`**

Copy `~/projects/sudobility/index.html` but simplify the `<title>`/meta to the design app (no `{{VITE_*}}` templating — this app has no static-processing step). Minimum:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <title>Sudobility Design System</title>
    <meta name="description" content="Sudobility design system documentation and component showcase." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Write `src/config/constants.ts`**

```ts
export const CONSTANTS = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Sudobility Design System',
  APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN || 'design.sudobility.com',
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Sudobility',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'info@sudobility.com',
} as const;
```

- [ ] **Step 10: Write `src/config/seo.ts`**

Copy `~/projects/sudobility/src/config/seo.ts` verbatim (it references `CONSTANTS` + `supportedLanguages`, both of which now exist).

- [ ] **Step 11: Write `public/locales/en/common.json`**

```json
{
  "nav": { "docs": "Docs", "settings": "Settings" },
  "footer": { "librariesTitle": "Libraries", "contactTitle": "Contact" },
  "loading": "Loading..."
}
```

- [ ] **Step 12: Write `src/main.tsx`**

Copy `~/projects/sudobility/src/main.tsx` verbatim (`configureTheme(defaultTheme)` + `createRoot(...).render(<StrictMode><App/></StrictMode>)`).

- [ ] **Step 13: Write a minimal `src/App.tsx` (placeholder)**

```tsx
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SudobilityApp } from '@sudobility/building_blocks';
import { initializeNetworkService } from '@sudobility/di';
import { SEOHeadProvider } from '@sudobility/seo_lib';
import i18n from './i18n';
import { seoHeadConfig } from './config/seo';

initializeNetworkService();

function Placeholder() {
  return <div className="p-12 text-center text-2xl">Sudobility Design System — scaffold OK</div>;
}

function AppRoutes() {
  const { i18n: i18nInstance } = useTranslation();
  return (
    <Suspense fallback={<div className="p-12">Loading...</div>}>
      <Routes>
        <Route path="/:lang" element={<Placeholder />} />
        <Route path="/" element={<Navigate to={`/${i18nInstance.language || 'en'}`} replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <SudobilityApp i18n={i18n} storageKeyPrefix="sudobility-design">
      <SEOHeadProvider config={seoHeadConfig}>
        <AppRoutes />
      </SEOHeadProvider>
    </SudobilityApp>
  );
}
```

- [ ] **Step 14: Create `.env.example` and a placeholder logo**

Copy `~/projects/sudobility/.env.example`, changing `VITE_APP_NAME=Sudobility Design System`. Copy `~/projects/sudobility/public/logo.png` to `public/logo.png` (or any placeholder PNG) so the favicon/logo references resolve.

- [ ] **Step 15: Install and verify build**

```bash
cd /Users/johnhuang/projects/sudobility_design
bun install
bun run build
```
Expected: `tsc -b` and `vite build` complete with no errors; `dist/` is produced.

- [ ] **Step 16: Verify dev server + browser smoke**

```bash
bun run dev
```
Open `http://localhost:4000/` → expect redirect to `/en` and the "scaffold OK" text. Check the browser console has no errors. Stop the server.

- [ ] **Step 17: Commit**

```bash
git add -A
git commit -m "chore: scaffold sudobility_design app (boots to placeholder)"
```

---

## Task 2: App shell — ScreenContainerLayout (topbar + breadcrumbs + footer)

**Files:**
- Create: `src/components/ScreenContainerLayout.tsx`
- Modify: `src/App.tsx` (add `LANGUAGE_INFO`, `LinkWrapper`, use the layout as the `/:lang` route element wrapping an `<Outlet>`)
- Modify: `public/locales/en/common.json` (footer strings)

**Interfaces:**
- Consumes: `supportedLanguages`, `languageNames`, `SupportedLanguage`, `CONSTANTS`, `useBreadcrumbs` (defined in T3 — for now pass a static Home item; T3 swaps it in).
- Produces: `ScreenContainerLayout` route-layout component rendering `AppTopBar` (Docs + Settings menu items + language selector) → `AppBreadcrumbs` → `<main><Outlet/></main>` → `AppFooterForHomePage`.

- [ ] **Step 1: Write `src/components/ScreenContainerLayout.tsx`**

Adapt `~/projects/sudobility/src/App.tsx`'s `ScreenContainerLayout` + `LinkWrapper` + `LANGUAGE_INFO` (read that file for the exact structure). Differences from the reference:
- `menuItems` on `AppTopBar` = Docs + Settings:
```tsx
menuItems={[
  { label: t('nav.docs'), href: `/${currentLang}/docs` },
  { label: t('nav.settings'), href: `/${currentLang}/settings` },
]}
```
  (Confirm the `AppTopBar` `menuItems` item shape against `@sudobility/building_blocks` types while implementing; the reference passes `menuItems={[]}`, so read the type from `node_modules/@sudobility/building_blocks/dist` if the `{label, href}` shape errors.)
- `AppBreadcrumbs items` = `[{ label: 'Home', href: `/${currentLang}`, current: true }]` for now (T3 replaces with `useBreadcrumbs()`).
- Footer `linkSections` = a single "Libraries" section is fine as a placeholder now (final repo links come in T11); keep `t('footer.librariesTitle')` as the title and an empty `links: []` array, plus a Contact section with `SUPPORT_EMAIL`.
- Use `useTranslation('common')`.
- Keep the language-sync `useEffect` and `handleLanguageChange` exactly as the reference.

- [ ] **Step 2: Add footer strings to `public/locales/en/common.json`**

Ensure `footer.librariesTitle` and `footer.contactTitle` exist (added in T1 Step 11 — verify).

- [ ] **Step 3: Wire the layout into `src/App.tsx`**

Replace the placeholder route so `/:lang` renders `ScreenContainerLayout` with a nested index route showing the placeholder:

```tsx
<Route path="/:lang" element={<ScreenContainerLayout />}>
  <Route index element={<Placeholder />} />
</Route>
```
Import `ScreenContainerLayout` and keep the `/` and `*` redirects.

- [ ] **Step 4: Verify build + lint**

```bash
bun run build && bun run lint
```
Expected: no errors/warnings that fail the build.

- [ ] **Step 5: Browser smoke**

`bun run dev` → `http://localhost:4000/en`: expect the topbar (logo, Docs + Settings menu items, language selector), a "Home" breadcrumb, the placeholder content, and the footer. Switch language in the selector → URL changes to `/<lang>` and topbar labels stay (English fallback). No console errors. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: app shell with topbar (Docs/Settings), breadcrumbs, footer"
```

---

## Task 3: Support modules — design theme + links + breadcrumbs + code block

**Files:**
- Create: `src/context/DesignThemeContext.tsx`, `src/config/designTheme.ts`, `src/components/internal/ThemeSwitcher.tsx`, `src/components/internal/ThemePreview.tsx`, `src/components/LocalizedLink.tsx`, `src/components/CodeBlock.tsx`, `src/hooks/useBreadcrumbs.ts`
- Modify: `src/App.tsx` (wrap routes in `DesignThemeProvider`), `src/components/ScreenContainerLayout.tsx` (use `useBreadcrumbs`)

**Interfaces:**
- Produces:
  - `useDesignTheme()` → `{ themeName, themeOptions, setThemeName }`; `DesignThemeProvider`.
  - `ThemeSwitcher` (default export), `ThemePreview` (default export).
  - `LocalizedLink` (default + named export): `<LocalizedLink to={string} language?={SupportedLanguage} …/>`.
  - `CodeBlock` (default export): `<CodeBlock filename={string} title?={string} className?={string} />`.
  - `useBreadcrumbs()` → `{ items: BreadcrumbItem[] }` where `BreadcrumbItem = { label: string; href?: string; current?: boolean }`.

- [ ] **Step 1: Port `src/config/designTheme.ts` and `src/context/DesignThemeContext.tsx`**

Copy both from `~/projects/mail_box/src/config/designTheme.ts` and `~/projects/mail_box/src/context/DesignThemeContext.tsx` **verbatim** (they import only `@sudobility/design/themes` and each other — no mail-specific deps). Optionally change the `STORAGE_KEY` in `designTheme.ts` from `'mailbox-design-theme'` to `'sudobility-design-theme'`.

- [ ] **Step 2: Port `ThemeSwitcher.tsx` and `ThemePreview.tsx`**

Copy `~/projects/mail_box/src/components/internal/ThemeSwitcher.tsx` and `ThemePreview.tsx` verbatim into `src/components/internal/`. Their imports (`@sudobility/design`, `@sudobility/components` `Select*`, `../../context/DesignThemeContext`) resolve unchanged at this path.

- [ ] **Step 3: Write `src/components/LocalizedLink.tsx`**

Simplify the mail_box wrapper to use this app's language list:

```tsx
import React from 'react';
import { LocalizedLink as SharedLocalizedLink } from '@sudobility/components';
import type { LinkProps } from 'react-router-dom';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

const isLanguageSupported = (lang: string): boolean =>
  (supportedLanguages as readonly string[]).includes(lang);

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: SupportedLanguage;
}

export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ to, language, children, ...props }) => (
  <SharedLocalizedLink
    to={to}
    language={language}
    isLanguageSupported={isLanguageSupported}
    defaultLanguage="en"
    {...props}
  >
    {children}
  </SharedLocalizedLink>
);

export default LocalizedLink;
```
(If `SharedLocalizedLink`'s prop names differ, read `node_modules/@sudobility/components/dist/**/LocalizedLink.d.ts` and match.)

- [ ] **Step 4: Write `src/components/CodeBlock.tsx`**

Copy `~/projects/mail_box/src/components/CodeBlock.tsx` verbatim (thin wrapper over `@sudobility/components` `CodeBlock`).

- [ ] **Step 5: Write `src/hooks/useBreadcrumbs.ts` (simplified)**

```tsx
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Human labels for this app's route segments (design areas + top-level pages).
const SEGMENT_LABELS: Record<string, string> = {
  design: 'Design System',
  colors: 'Colors',
  text: 'Typography',
  forms: 'Forms',
  buttons: 'Buttons',
  cards: 'Cards',
  badges: 'Badges',
  alerts: 'Alerts',
  inputs: 'Inputs',
  loading: 'Loading States',
  modals: 'Modals',
  navigation: 'Navigation',
  'data-display': 'Data Display',
  'forms-advanced': 'Forms Advanced',
  'notifications-feedback': 'Notifications & Feedback',
  'layout-spacing': 'Layout & Spacing',
  'tables-grids': 'Tables & Grids',
  'icons-illustrations': 'Icons & Illustrations',
  'overlays-portals': 'Overlays & Portals',
  'micro-interactions-animations': 'Micro-Interactions & Animations',
  accessibility: 'Accessibility',
  performance: 'Performance',
  settings: 'Settings',
  docs: 'Docs',
};

export const useBreadcrumbs = (): { items: BreadcrumbItem[] } => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  useTranslation(); // re-render on language change

  const items = useMemo<BreadcrumbItem[]>(() => {
    const base = `/${lang || 'en'}`;
    // Strip the leading /:lang, split remaining segments.
    const rest = location.pathname.replace(base, '').split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: base }];
    let acc = base;
    rest.forEach(seg => {
      acc += `/${seg}`;
      crumbs.push({ label: SEGMENT_LABELS[seg] || seg, href: acc });
    });
    // Last crumb is current, no href.
    const last = crumbs[crumbs.length - 1];
    last.current = true;
    last.href = undefined;
    return crumbs;
  }, [location.pathname, lang]);

  return { items };
};
```

- [ ] **Step 6: Use `useBreadcrumbs` in the shell**

In `src/components/ScreenContainerLayout.tsx`, replace the static breadcrumb items with:

```tsx
const { items: breadcrumbItems } = useBreadcrumbs();
// ...
<AppBreadcrumbs items={breadcrumbItems} shareConfig={{ title: CONSTANTS.APP_NAME, description: 'Sudobility design system', hashtags: ['Sudobility', 'DesignSystem'] }} />
```
(Match `AppBreadcrumbs`'s prop shape from the reference usage.)

- [ ] **Step 7: Wrap the app in `DesignThemeProvider`**

In `src/App.tsx`, import `DesignThemeProvider` and wrap `<AppRoutes />` (inside `SEOHeadProvider`) so the theme switcher works app-wide:

```tsx
<SEOHeadProvider config={seoHeadConfig}>
  <DesignThemeProvider>
    <AppRoutes />
  </DesignThemeProvider>
</SEOHeadProvider>
```

- [ ] **Step 8: Verify build + lint**

```bash
bun run build && bun run lint
```
Expected: clean.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: design-theme context, LocalizedLink, CodeBlock, breadcrumbs"
```

---

## Task 4: Home page (DesignSystemPage)

**Files:**
- Create: `src/pages/DesignSystemPage.tsx`
- Modify: `src/App.tsx` (home is the `/:lang` index route)

**Interfaces:**
- Consumes: `LocalizedLink`, `ThemeSwitcher`, `ThemePreview`, `useDesignTheme`, `CONSTANTS`, `SEOHead`, `ui`/`textVariants`/`designTokens` from `@sudobility/design`.
- Produces: `DesignSystemPage` (default export) — props `{ emailDomain: string; appName: string }`.

- [ ] **Step 1: Port the file**

Copy `~/projects/mail_box/src/pages/internal/DesignSystemPage.tsx` → `src/pages/DesignSystemPage.tsx`. Apply the uniform porting transform (spec §7):
- Remove `import { BreadcrumbSection } from '@sudobility/components'` and `import { useBreadcrumbs } from '../../hooks/useBreadcrumbs'` and the `const { items: breadcrumbItems } = useBreadcrumbs();` line and the `<BreadcrumbSection items={breadcrumbItems} />` element.
- Change `import ThemeSwitcher from '../../components/internal/ThemeSwitcher'` → `'../components/internal/ThemeSwitcher'`, `ThemePreview` likewise, `useDesignTheme` from `'../context/DesignThemeContext'`, `LocalizedLink` from `'../components/LocalizedLink'` (this file sits at `src/pages/`, depth 1, so `../` not `../../`).
- Replace the outer `<main className="flex-1 overflow-auto" role="main" …>…</main>` with a fragment, keeping the inner `<div className="max-w-7xl mx-auto px-4 py-12">…</div>`.
- In the `designAreas` array, change every `path: '/internal/design/…'` to `path: '/design/…'`.

- [ ] **Step 2: Wire the route in `src/App.tsx`**

```tsx
import DesignSystemPage from './pages/DesignSystemPage';
import { CONSTANTS } from './config/constants';
// ...
<Route path="/:lang" element={<ScreenContainerLayout />}>
  <Route index element={<DesignSystemPage emailDomain={CONSTANTS.APP_DOMAIN} appName={CONSTANTS.APP_NAME} />} />
</Route>
```
Remove the `Placeholder` component.

- [ ] **Step 3: Verify build + lint**

```bash
bun run build && bun run lint
```

- [ ] **Step 4: Browser smoke**

`bun run dev` → `/en`: expect the header + token stat cards, the `ThemeSwitcher` + live `ThemePreview` panel, and the 3-column grid of 22 area cards. Change the design theme in the switcher → the `ThemePreview` restyles. Hover a card → it lifts. (Card links will 404 until T5-T8; that's expected.) No console errors. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: design system home page with live theme preview"
```

---

## Tasks 5–8: Port the 21 design showcase pages (4 batches)

Each batch task follows the **identical** procedure below. `<Name>` = source filename; `<slug>` = route slug. Per page:

1. Copy `~/projects/mail_box/src/pages/internal/<Name>.tsx` → `src/pages/design/<Name>.tsx`.
2. Apply the uniform porting transform (spec §7 steps 2–4):
   - Remove the `useBreadcrumbs` import + call, and the `BreadcrumbSection` import + element (if present).
   - The `../../components/LocalizedLink` and `../../hooks/useBreadcrumbs` paths: pages live at `src/pages/design/` (depth 2), so `../../components/LocalizedLink` still resolves to `src/components/LocalizedLink`. Keep `LocalizedLink` import; drop `useBreadcrumbs`.
   - Replace the outer `<main className="flex-1 overflow-auto" role="main" …>…</main>` with a fragment, keeping the inner `<div className="max-w-7xl …">`.
   - Global-replace `/internal/design` → `/design` in the file.
   - Keep the `{ emailDomain, appName }` props.
3. Add a lazy route in `src/App.tsx` (see per-batch route block).
4. After the batch: `bun run build && bun run lint`, then browser-smoke each new route.

Route wiring pattern in `src/App.tsx` (add a `lazy` import + a nested route per page, and pass props):

```tsx
const ColorsPage = lazy(() => import('./pages/design/ColorsPage'));
// inside <Route path="/:lang" element={<ScreenContainerLayout/>}>
<Route path="design/colors" element={<ColorsPage emailDomain={CONSTANTS.APP_DOMAIN} appName={CONSTANTS.APP_NAME} />} />
```

### Task 5 — Batch A (5 pages)

**Files:** Create `src/pages/design/{ColorsPage,TypographyPage,ButtonsPage,CardsPage,InputsPage}.tsx`; Modify `src/App.tsx`.

- [ ] **Step 1: Port pages** — apply the per-page procedure to:
  - `ColorsPage.tsx` → `design/colors`
  - `TypographyPage.tsx` → `design/text`
  - `ButtonsPage.tsx` → `design/buttons`
  - `CardsPage.tsx` → `design/cards`
  - `InputsPage.tsx` → `design/inputs`
- [ ] **Step 2: Add 5 lazy routes** in `src/App.tsx` per the pattern above.
- [ ] **Step 3: Verify** — `bun run build && bun run lint` (expect clean).
- [ ] **Step 4: Browser smoke** — visit `/en/design/{colors,text,buttons,cards,inputs}` from the home grid; each renders inside the shell with correct breadcrumbs (e.g. Home / Design System / Colors). No console errors.
- [ ] **Step 5: Commit** — `git commit -m "feat: port colors, typography, buttons, cards, inputs pages"`

### Task 6 — Batch B (5 pages)

**Files:** Create `src/pages/design/{AlertsPage,LoadingStatesPage,ModalsPage,NavigationPage,DataDisplayPage}.tsx`; Modify `src/App.tsx`.

- [ ] **Step 1: Port pages:**
  - `AlertsPage.tsx` → `design/alerts`
  - `LoadingStatesPage.tsx` → `design/loading`
  - `ModalsPage.tsx` → `design/modals`
  - `NavigationPage.tsx` → `design/navigation`
  - `DataDisplayPage.tsx` → `design/data-display`
- [ ] **Step 2: Add 5 lazy routes.**
- [ ] **Step 3: Verify** — `bun run build && bun run lint`.
- [ ] **Step 4: Browser smoke** — visit each of the 5 routes; verify modal/overlay interactions on `design/modals` open/close correctly.
- [ ] **Step 5: Commit** — `git commit -m "feat: port alerts, loading, modals, navigation, data-display pages"`

### Task 7 — Batch C (5 pages)

**Files:** Create `src/pages/design/{FormsPage,FormsAdvancedPage,NotificationsFeedbackPage,LayoutSpacingPage,TablesGridsPage}.tsx`; Modify `src/App.tsx`.

- [ ] **Step 1: Port pages:**
  - `FormsPage.tsx` → `design/forms`
  - `FormsAdvancedPage.tsx` → `design/forms-advanced`
  - `NotificationsFeedbackPage.tsx` → `design/notifications-feedback`
  - `LayoutSpacingPage.tsx` → `design/layout-spacing`
  - `TablesGridsPage.tsx` → `design/tables-grids`
- [ ] **Step 2: Add 5 lazy routes.**
- [ ] **Step 3: Verify** — `bun run build && bun run lint`.
- [ ] **Step 4: Browser smoke** — visit each; exercise form controls on `design/forms` + `design/forms-advanced` (inputs, wizard steps).
- [ ] **Step 5: Commit** — `git commit -m "feat: port forms, forms-advanced, notifications, layout-spacing, tables-grids pages"`

### Task 8 — Batch D (6 pages, incl. BadgesPage refactor)

**Files:** Create `src/pages/design/{IconsIllustrationsPage,OverlaysPortalsPage,MicroInteractionsAnimationsPage,AccessibilityPage,PerformancePage,BadgesPage}.tsx`; Modify `src/App.tsx`.

- [ ] **Step 1: Port the 5 standard pages:**
  - `IconsIllustrationsPage.tsx` → `design/icons-illustrations`
  - `OverlaysPortalsPage.tsx` → `design/overlays-portals`
  - `MicroInteractionsAnimationsPage.tsx` → `design/micro-interactions-animations`
  - `AccessibilityPage.tsx` → `design/accessibility`
  - `PerformancePage.tsx` → `design/performance`
- [ ] **Step 2: Port `BadgesPage.tsx` → `design/badges` with the StandardPageLayout refactor.** In addition to the uniform transform:
  - Remove `import { StandardPageLayout } from '../../components/layout/standard-page-layout';`.
  - Keep `import CodeBlock from '../../components/CodeBlock';` and `import LocalizedLink from '../../components/LocalizedLink';`.
  - Read the source `<StandardPageLayout …>` opening tag (line ~69) to see which props it set (title/description used for SEO). Replace the wrapper so the return is:
    ```tsx
    return (
      <>
        <SEOHead title={`Badges - ${appName}`} description="Badge component showcase" noIndex />
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* ...the original inner content that was between <StandardPageLayout> and </StandardPageLayout>... */}
        </div>
      </>
    );
    ```
    Add `import { SEOHead } from '@sudobility/seo_lib';` if not already imported. Preserve all inner JSX unchanged.
- [ ] **Step 3: Add 6 lazy routes.**
- [ ] **Step 4: Verify** — `bun run build && bun run lint`.
- [ ] **Step 5: Browser smoke** — visit all 6 routes; confirm `design/badges` renders content (no StandardPageLayout), `design/overlays-portals` overlays work, `design/micro-interactions-animations` animations play. From the home grid, click through and confirm all 21 area cards now resolve.
- [ ] **Step 6: Commit** — `git commit -m "feat: port icons, overlays, micro-interactions, accessibility, performance, badges pages"`

---

## Task 9: Settings page

**Files:**
- Create: `src/pages/SettingsPage.tsx`
- Modify: `src/App.tsx` (add `/:lang/settings` route), `public/locales/en/common.json` (settings labels)

**Interfaces:**
- Consumes: `ThemeSwitcher` (design-palette), `@sudobility/components` theme + font-size API, `useTranslation('common')`, `ui`/`textVariants`.
- Produces: `SettingsPage` (default export), props `{ emailDomain, appName }`.

- [ ] **Step 1: Discover the components theme/font-size API**

The reference app forces `Theme.DARK` and never toggles at runtime, so this is new usage. Read `node_modules/@sudobility/components/dist/**` for the theme hook and font-size hook exposed by `ThemeProvider` (search for `useTheme`, `useFontSize`, `Theme`, `FontSize`, `setTheme`, `setFontSize`):
```bash
grep -rn "useTheme\|useFontSize\|setTheme\|setFontSize\|FontSize" /Users/johnhuang/projects/sudobility_design/node_modules/@sudobility/components/dist/*.d.ts | head -40
```
Note the exact hook names + signatures for Step 2. (If no runtime theme hook exists, fall back to toggling the `dark` class on `document.documentElement` and persisting to localStorage — but prefer the library hook if present.)

- [ ] **Step 2: Write `src/pages/SettingsPage.tsx`**

Compose a page (fragment + `<div className="max-w-3xl mx-auto px-4 py-12">`) with `SEOHead`, a heading, and three labeled controls styled with `textVariants`/`ui`:
- **Appearance (light/dark)** — a toggle wired to the theme hook/setter discovered in Step 1.
- **Font size** — a `Select` (from `@sudobility/components`) bound to the font-size hook/setter (`FontSize.SMALL/MEDIUM/LARGE`).
- **Design theme** — render the existing `<ThemeSwitcher />` (from `src/components/internal/ThemeSwitcher`).

Use `t('...')` from `useTranslation('common')` for the section labels (keys added Step 3).

- [ ] **Step 3: Add settings labels to `public/locales/en/common.json`**

```json
"settings": {
  "title": "Settings",
  "appearance": "Appearance",
  "theme": "Theme",
  "light": "Light",
  "dark": "Dark",
  "fontSize": "Font size",
  "designTheme": "Design theme"
}
```

- [ ] **Step 4: Wire the route in `src/App.tsx`**

```tsx
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
<Route path="settings" element={<SettingsPage emailDomain={CONSTANTS.APP_DOMAIN} appName={CONSTANTS.APP_NAME} />} />
```

- [ ] **Step 5: Verify build + lint.**

- [ ] **Step 6: Browser smoke** — click **Settings** in the topbar → `/en/settings`. Toggle light/dark → the whole app flips theme (and persists across reload). Change font size → text scales. Change design theme → tokens update. No console errors.

- [ ] **Step 7: Commit** — `git commit -m "feat: settings page (theme, font size, design theme)"`

---

## Task 10: Docs page

**Files:**
- Create: `src/pages/DocsPage.tsx`
- Modify: `src/App.tsx` (add `/:lang/docs` route), `src/config/constants.ts` (repo list), `public/locales/en/common.json` (docs prose)

**Interfaces:**
- Consumes: `CodeBlock`, `SEOHead`, `ui`/`textVariants`, `useTranslation('common')`, `CONSTANTS.LIBRARIES`.
- Produces: `DocsPage` (default export), props `{ emailDomain, appName }`.

- [ ] **Step 1: Add the library repo list to `src/config/constants.ts`**

```ts
export const LIBRARIES = [
  { name: '@sudobility/design', repo: 'https://github.com/johnqh/design_system', desc: 'Design tokens, textVariants, theme system' },
  { name: '@sudobility/components', repo: 'https://github.com/johnqh/mail_box_components', desc: 'Shared React UI components' },
  { name: '@sudobility/building_blocks', repo: 'https://github.com/johnqh/building_blocks', desc: 'App shell: topbar, footer, layout' },
  { name: '@sudobility/di', repo: 'https://github.com/johnqh/di', desc: 'Dependency-injection container' },
  { name: '@sudobility/di_web', repo: 'https://github.com/johnqh/di_web', desc: 'Web DI bindings (Firebase, service worker, i18n)' },
  { name: '@sudobility/seo_lib', repo: 'https://github.com/johnqh/seo_lib', desc: 'SEO utilities (SEOHead)' },
  { name: '@sudobility/types', repo: 'https://github.com/johnqh/types', desc: 'Shared TypeScript types' },
] as const;
```

- [ ] **Step 2: Write `src/pages/DocsPage.tsx`**

Fragment + `<div className="max-w-5xl mx-auto px-4 py-12">` containing:
- `SEOHead` (title `Docs - ${appName}`, description, `noIndex` optional — default index-able here).
- **Overview** section (`t('docs.overviewTitle')`, `t('docs.overviewBody')`): design tokens + `textVariants`, Tailwind integration, class-based dark mode, runtime theme system.
- **How to use** section with a `<pre className={...}>` (or the `CodeBlock` component) showing an install snippet:
  ```
  bun add @sudobility/design @sudobility/components
  ```
  plus a Tailwind-preset snippet (`presets: [createTailwindPreset()]`) and a `textVariants` usage line. (Code content stays literal English.)
- **Libraries** section: a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) mapping `CONSTANTS.LIBRARIES` to cards; each card is an anchor `<a href={lib.repo} target="_blank" rel="noopener noreferrer">` styled with `ui.background.surface` + `ui.border.default`, showing `lib.name`, `lib.desc`, and a "View on GitHub →" affordance.

- [ ] **Step 3: Add docs prose to `public/locales/en/common.json`**

```json
"docs": {
  "title": "Docs",
  "overviewTitle": "About the design system",
  "overviewBody": "The Sudobility design system provides design tokens, typography variants (textVariants), and a runtime theme system built on Tailwind CSS with class-based dark mode.",
  "howToTitle": "How to use",
  "librariesTitle": "Libraries"
}
```

- [ ] **Step 4: Wire the route in `src/App.tsx`**

```tsx
const DocsPage = lazy(() => import('./pages/DocsPage'));
<Route path="docs" element={<DocsPage emailDomain={CONSTANTS.APP_DOMAIN} appName={CONSTANTS.APP_NAME} />} />
```

- [ ] **Step 5: Verify build + lint.**

- [ ] **Step 6: Browser smoke** — click **Docs** in the topbar → `/en/docs`. Verify overview + how-to snippet render, and all 7 repo cards link to the correct GitHub URLs (open in a new tab). No console errors.

- [ ] **Step 7: Commit** — `git commit -m "feat: docs page with design overview and library repo links"`

---

## Task 11: Footer library links, final polish, full verification

**Files:**
- Modify: `src/components/ScreenContainerLayout.tsx` (real footer link sections), `src/config/seo.ts` (optional), `public/favicon.ico`/`public/logo.png`
- Create: `wrangler.toml`, `README.md`

**Interfaces:**
- Consumes: `CONSTANTS.LIBRARIES`, `CONSTANTS.SUPPORT_EMAIL`.

- [ ] **Step 1: Populate the footer link sections**

In `ScreenContainerLayout.tsx`, build `footerLinkSections` from `CONSTANTS.LIBRARIES` (title `t('footer.librariesTitle')`, one link per library → its repo) plus a Contact section (`SUPPORT_EMAIL` → `mailto:`). Match the reference `AppFooterForHomePage` `linkSections` shape.

- [ ] **Step 2: Create `wrangler.toml`**

```toml
name = "sudobility-design"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"
```

- [ ] **Step 3: Add favicon/logo + `README.md`**

Ensure `public/logo.png` exists (from T1); add `public/favicon.ico` if referenced. Write a short `README.md`: what the app is, `bun install`, `bun run dev` (port 4000), `bun run build`, deployment (Cloudflare Pages), and a note that only `en` locale is authored.

- [ ] **Step 4: Full build + lint + format check**

```bash
cd /Users/johnhuang/projects/sudobility_design
bun run build && bun run lint && bun run format:check
```
Expected: all pass (run `bun run format` first if `format:check` flags files).

- [ ] **Step 5: Full-route browser smoke**

`bun run dev`, then visit and eyeball each route with no console errors:
- `/en` (home grid + theme preview)
- All 21 `/en/design/<slug>` pages (via the home grid links)
- `/en/settings` (theme/font/design-theme controls work)
- `/en/docs` (overview + 7 repo cards)
- Topbar Docs/Settings links + language selector; footer library links.
Confirm the design-theme selection persists across a page reload, and light/dark persists.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: footer library links, wrangler config, README, final polish"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** §1–2 goals → T1–T11; §3 stubs → T1 Steps 5–6; §4 deps → T1 Step 3; §5 routing → T1/T2/T4/T5–T8/T9/T10; §6 shell → T2 + T3 (breadcrumbs); §7 home + porting transform → T4 + T5–T8; §8 settings → T9; §9 docs → T10; §10 i18n (en-only) → T1 (i18n.ts, common.json) grown per task; §11 support modules → T3; §12 config → T1 (+ repos T10); §13 build/deploy → T1 (scripts/tailwind) + T11 (wrangler/README). All sections covered.

**Placeholder scan:** no TBD/TODO; every code step shows concrete code or an exact command. The two genuinely dynamic parts — `@sudobility/building_blocks` `AppTopBar`/`AppBreadcrumbs`/`AppFooterForHomePage` prop shapes and the `@sudobility/components` theme/font-size hooks — are handled by explicit "read the .d.ts and match" steps (T2 Step 1, T3 Step 6, T9 Step 1) rather than guessed signatures, because those types aren't visible until `bun install` runs in T1.

**Type consistency:** `BreadcrumbItem` shape (`{label, href?, current?}`) is consistent between T3 (`useBreadcrumbs`) and its shell consumer. `{ emailDomain, appName }` page-prop signature is uniform across the home + all 21 ported pages + Settings + Docs, always supplied from `CONSTANTS`. `LIBRARIES` is defined in T10 Step 1 and reused in T11 Step 1.
