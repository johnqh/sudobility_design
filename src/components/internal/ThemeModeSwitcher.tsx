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

const OPTIONS: { value: Theme; label: string }[] = [
  { value: Theme.LIGHT, label: "Light" },
  { value: Theme.DARK, label: "Dark" },
  { value: Theme.SYSTEM, label: "System" },
];

export default function ThemeModeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Appearance</span>
      <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
        <SelectTrigger
          aria-label="Select appearance"
          className="min-w-[10rem] rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
