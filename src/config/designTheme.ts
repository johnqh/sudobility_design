/**
 * Design theme integration for mail_box.
 *
 * Bridges the @sudobility/design theme system into the app: resolves the active
 * theme, persists the selection, injects the theme's CSS custom properties, and
 * activates runtime class overrides. Defaults to the `default` theme (no visual
 * change), so the rest of the app needs no changes.
 */
import {
  themes,
  configureTheme,
  generateThemeCSS,
  type ThemeName,
  type ThemeDefinition,
} from '@sudobility/design/themes';

export const DEFAULT_THEME_NAME: ThemeName = 'default';

// Distinct from the light/dark ThemeProvider key (storageKeyPrefix + '-theme',
// i.e. 'sudobility-design-theme') to avoid clobbering each other in localStorage.
const STORAGE_KEY = 'sudobility-design-palette';
const STYLE_ELEMENT_ID = 'sudobility-design-theme';

export interface ThemeOption {
  name: ThemeName;
  displayName: string;
}

/** All available themes as { name, displayName } options for UI. */
export function getThemeOptions(): ThemeOption[] {
  return (Object.keys(themes) as ThemeName[]).map(name => ({
    name,
    displayName: themes[name].displayName,
  }));
}

/** Type guard: is the value a registered theme name? */
export function isValidThemeName(name: string | null | undefined): name is ThemeName {
  return !!name && Object.prototype.hasOwnProperty.call(themes, name);
}

/** Read the persisted theme, falling back to the default. */
export function getStoredDesignTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidThemeName(stored) ? stored : DEFAULT_THEME_NAME;
  } catch {
    return DEFAULT_THEME_NAME;
  }
}

/** Persist the selected theme. No-op if storage is unavailable. */
export function setStoredDesignTheme(name: ThemeName): void {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // Storage may be unavailable (private mode); ignore.
  }
}

/**
 * Activate a theme: enable its class overrides and inject its CSS custom
 * properties into a single managed <style> element.
 */
export function applyDesignTheme(name: ThemeName): void {
  const theme: ThemeDefinition = themes[name] ?? themes[DEFAULT_THEME_NAME];

  // 1. Activate runtime structural class overrides for variants.*
  configureTheme(theme);

  // 2. Inject/replace the CSS custom properties (:root + .dark blocks)
  if (typeof document === 'undefined') return;
  let style = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    document.head.appendChild(style);
  }
  style.textContent = generateThemeCSS(theme);
}
