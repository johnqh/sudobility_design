/**
 * Live preview of theme-aware primitives. Uses variants.* and semantic Tailwind
 * tokens (bg-primary, bg-card, border-border, …) so it restyles when the active
 * theme changes. Render with a key tied to the theme name to pick up structural
 * class overrides on switch.
 */
import { variants } from "@sudobility/design";
import { useTranslation } from "react-i18next";

export default function ThemePreview() {
  const { t } = useTranslation("common");

  return (
    <section className="rounded-xl border border-border bg-card p-8 text-card-foreground">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        {t("themePreview.title")}
      </h2>

      {/* Buttons */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("themePreview.buttons.title")}
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className={variants.button.primary.default()}>
            {t("themePreview.buttons.primary")}
          </button>
          <button className={variants.button.secondary.default()}>
            {t("themePreview.buttons.secondary")}
          </button>
          <button className={variants.button.outline.default()}>
            {t("themePreview.buttons.outline")}
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("themePreview.badges.title")}
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className={variants.badge.default()}>
            {t("themePreview.badges.default")}
          </span>
          <span className={variants.badge.primary()}>
            {t("themePreview.badges.primary")}
          </span>
          <span className={variants.badge.success()}>
            {t("themePreview.badges.success")}
          </span>
          <span className={variants.badge.warning()}>
            {t("themePreview.badges.warning")}
          </span>
          <span className={variants.badge.error()}>
            {t("themePreview.badges.error")}
          </span>
        </div>
      </div>

      {/* Card + input */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={variants.card.default.padded()}>
          <h4 className="mb-2 font-semibold text-foreground">
            {t("themePreview.card.title")}
          </h4>
          <p className="text-sm text-muted-foreground">
            {t("themePreview.card.description")}
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("themePreview.input.title")}
          </h3>
          <input
            className={variants.input.default()}
            placeholder={t("themePreview.input.placeholder")}
          />
        </div>
      </div>

      {/* Semantic color swatches */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("themePreview.colors.title")}
        </h3>
        <div className="flex flex-wrap gap-3">
          <div
            className="h-12 w-24 rounded-md bg-primary"
            title={t("themePreview.colors.primary")}
          />
          <div
            className="h-12 w-24 rounded-md bg-secondary"
            title={t("themePreview.colors.secondary")}
          />
          <div
            className="h-12 w-24 rounded-md bg-accent"
            title={t("themePreview.colors.accent")}
          />
          <div
            className="h-12 w-24 rounded-md bg-muted"
            title={t("themePreview.colors.muted")}
          />
          <div
            className="h-12 w-24 rounded-md bg-destructive"
            title={t("themePreview.colors.destructive")}
          />
        </div>
      </div>
    </section>
  );
}
