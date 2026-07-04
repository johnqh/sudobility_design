/**
 * Theme selector for the internal design-system showcase.
 * Bound to DesignThemeContext; switching restyles theme-aware components live.
 */
import { useMemo } from "react";
import type { ThemeName } from "@sudobility/design/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";
import { useDesignTheme } from "../../context/DesignThemeContext";

export default function ThemeSwitcher() {
  const { themeName, themeOptions, setThemeName } = useDesignTheme();

  const sortedThemeOptions = useMemo(
    () =>
      [...themeOptions].sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      ),
    [themeOptions],
  );

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Theme</span>
      <Select
        value={themeName}
        onValueChange={(value) => setThemeName(value as ThemeName)}
      >
        <SelectTrigger
          aria-label="Select design theme"
          className="min-w-[12rem] rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortedThemeOptions.map((opt) => (
            <SelectItem key={opt.name} value={opt.name}>
              {opt.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
