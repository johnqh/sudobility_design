/**
 * Light / Dark / System appearance selector for the design-system showcase.
 * Bound to the @sudobility/components ThemeProvider (light/dark), orthogonal to
 * the design-palette ThemeSwitcher.
 */
import {
  useTheme,
  Theme,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";
import { useTranslation } from "react-i18next";

export default function ThemeModeSwitcher() {
  const { t } = useTranslation("common");
  const { theme, setTheme } = useTheme();
  const options: { value: Theme; label: string }[] = [
    { value: Theme.LIGHT, label: t("settings.light") },
    { value: Theme.DARK, label: t("settings.dark") },
    { value: Theme.SYSTEM, label: t("settings.system") },
  ];

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">
        {t("themePreview.appearance")}
      </span>
      <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
        <SelectTrigger
          aria-label={t("themePreview.selectAppearance")}
          className="min-w-[10rem] rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
