export const CONSTANTS = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Sudobility Design System",
  APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN || "design.sudobility.com",
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || "Sudobility",
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || "info@sudobility.com",
} as const;

/** The @sudobility libraries this design system is built on, with repo links. */
export const LIBRARIES = [
  {
    name: "@sudobility/design",
    repo: "https://github.com/johnqh/design_system",
    desc: "Design tokens, textVariants, theme system",
  },
  {
    name: "@sudobility/components",
    repo: "https://github.com/johnqh/mail_box_components",
    desc: "Shared React UI components",
  },
  {
    name: "@sudobility/building_blocks",
    repo: "https://github.com/johnqh/building_blocks",
    desc: "App shell: topbar, footer, layout",
  },
  {
    name: "@sudobility/di",
    repo: "https://github.com/johnqh/di",
    desc: "Dependency-injection container",
  },
  {
    name: "@sudobility/di_web",
    repo: "https://github.com/johnqh/di_web",
    desc: "Web DI bindings (Firebase, service worker, i18n)",
  },
  {
    name: "@sudobility/seo_lib",
    repo: "https://github.com/johnqh/seo_lib",
    desc: "SEO utilities (SEOHead)",
  },
  {
    name: "@sudobility/types",
    repo: "https://github.com/johnqh/types",
    desc: "Shared TypeScript types",
  },
] as const;
