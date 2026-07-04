/**
 * Runtime design-theme context.
 *
 * Holds the active theme and switches it at runtime (apply CSS vars + class
 * overrides, persist, and re-render consumers). Orthogonal to the light/dark
 * ThemeContext, which still owns dark mode.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ThemeName } from '@sudobility/design/themes';
import {
  applyDesignTheme,
  getStoredDesignTheme,
  getThemeOptions,
  setStoredDesignTheme,
  type ThemeOption,
} from '../config/designTheme';

interface DesignThemeContextValue {
  themeName: ThemeName;
  themeOptions: ThemeOption[];
  setThemeName: (name: ThemeName) => void;
}

const DesignThemeContext = createContext<DesignThemeContextValue | undefined>(undefined);

export function DesignThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => getStoredDesignTheme());

  const setThemeName = useCallback((name: ThemeName) => {
    applyDesignTheme(name);
    setStoredDesignTheme(name);
    setThemeNameState(name);
  }, []);

  const value = useMemo<DesignThemeContextValue>(
    () => ({ themeName, themeOptions: getThemeOptions(), setThemeName }),
    [themeName, setThemeName]
  );

  return <DesignThemeContext.Provider value={value}>{children}</DesignThemeContext.Provider>;
}

export function useDesignTheme(): DesignThemeContextValue {
  const ctx = useContext(DesignThemeContext);
  if (!ctx) {
    throw new Error('useDesignTheme must be used within a DesignThemeProvider');
  }
  return ctx;
}
