/**
 * Live preview of theme-aware primitives. Uses variants.* and semantic Tailwind
 * tokens (bg-primary, bg-card, border-border, …) so it restyles when the active
 * theme changes. Render with a key tied to the theme name to pick up structural
 * class overrides on switch.
 */
import { variants } from "@sudobility/design";

export default function ThemePreview() {
  return (
    <section className="rounded-xl border border-border bg-card p-8 text-card-foreground">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Live Theme Preview
      </h2>

      {/* Buttons */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Buttons
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className={variants.button.primary.default()}>Primary</button>
          <button className={variants.button.secondary.default()}>
            Secondary
          </button>
          <button className={variants.button.outline.default()}>Outline</button>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className={variants.badge.default()}>Default</span>
          <span className={variants.badge.primary()}>Primary</span>
          <span className={variants.badge.success()}>Success</span>
          <span className={variants.badge.warning()}>Warning</span>
          <span className={variants.badge.error()}>Error</span>
        </div>
      </div>

      {/* Card + input */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={variants.card.default.padded()}>
          <h4 className="mb-2 font-semibold text-foreground">Card</h4>
          <p className="text-sm text-muted-foreground">
            Cards, borders, and surfaces follow the active theme tokens.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input
          </h3>
          <input
            className={variants.input.default()}
            placeholder="Themed input"
          />
        </div>
      </div>

      {/* Semantic color swatches */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Semantic Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          <div className="h-12 w-24 rounded-md bg-primary" title="primary" />
          <div
            className="h-12 w-24 rounded-md bg-secondary"
            title="secondary"
          />
          <div className="h-12 w-24 rounded-md bg-accent" title="accent" />
          <div className="h-12 w-24 rounded-md bg-muted" title="muted" />
          <div
            className="h-12 w-24 rounded-md bg-destructive"
            title="destructive"
          />
        </div>
      </div>
    </section>
  );
}
