import { Suspense, useEffect, useMemo } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppTopBar,
  AppBreadcrumbs,
  AppFooterForHomePage,
} from "@sudobility/building_blocks";
import { LayoutProvider } from "@sudobility/components";
import { CONSTANTS, LIBRARIES } from "../config/constants";
import {
  supportedLanguages,
  languageNames,
  type SupportedLanguage,
} from "../i18n";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

// Language display names and flags for AppTopBar.
const LANGUAGE_INFO: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  zh: { name: "简体中文", flag: "🇨🇳" },
  "zh-hant": { name: "繁體中文", flag: "🇹🇼" },
  ja: { name: "日本語", flag: "🇯🇵" },
  ko: { name: "한국어", flag: "🇰🇷" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  it: { name: "Italiano", flag: "🇮🇹" },
  pt: { name: "Português", flag: "🇧🇷" },
  ru: { name: "Русский", flag: "🇷🇺" },
  sv: { name: "Svenska", flag: "🇸🇪" },
  th: { name: "ไทย", flag: "🇹🇭" },
  uk: { name: "Українська", flag: "🇺🇦" },
  vi: { name: "Tiếng Việt", flag: "🇻🇳" },
};

// Link wrapper for building_blocks components (router integration).
const LinkWrapper = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link to={href} className={className}>
    {children}
  </Link>
);

function LoadingFallback() {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">{t("loading")}</div>
    </div>
  );
}

/**
 * Route-level layout: sticky topbar + breadcrumbs, content <Outlet>, footer.
 * Owns ALL page chrome — individual pages render only their inner content.
 */
export default function ScreenContainerLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n: i18nInstance, t } = useTranslation("common");
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang as SupportedLanguage)) {
      if (i18nInstance.language !== lang) {
        i18nInstance.changeLanguage(lang);
      }
    } else if (lang) {
      navigate("/en", { replace: true });
    }
  }, [lang, i18nInstance, navigate]);

  const currentLang = (lang ||
    i18nInstance.language ||
    "en") as SupportedLanguage;

  const { items: breadcrumbItems } = useBreadcrumbs();

  const languages = useMemo(
    () =>
      supportedLanguages.map((code) => ({
        code,
        name: LANGUAGE_INFO[code]?.name || languageNames[code] || code,
        flag: LANGUAGE_INFO[code]?.flag || "🌐",
      })),
    [],
  );

  const handleLanguageChange = (newLang: string) => {
    if (supportedLanguages.includes(newLang as SupportedLanguage)) {
      i18nInstance.changeLanguage(newLang);
      navigate(`/${newLang}`);
    }
  };

  const menuItems = [
    { id: "docs", label: t("nav.docs"), href: `/${currentLang}/docs` },
    {
      id: "settings",
      label: t("nav.settings"),
      href: `/${currentLang}/settings`,
    },
  ];

  const footerLinkSections = [
    {
      title: t("footer.librariesTitle"),
      links: LIBRARIES.map((lib) => ({ label: lib.name, href: lib.repo })),
    },
    {
      title: t("footer.contactTitle"),
      links: [
        {
          label: CONSTANTS.SUPPORT_EMAIL,
          href: `mailto:${CONSTANTS.SUPPORT_EMAIL}`,
        },
      ],
    },
  ];

  return (
    <LayoutProvider mode="standard">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Sticky header: topbar + breadcrumbs */}
        <div className="sticky top-0 z-40">
          <AppTopBar
            logo={{
              src: "/logo.png",
              appName: CONSTANTS.APP_NAME,
              onClick: () => navigate(`/${currentLang}`),
            }}
            menuItems={menuItems}
            languages={languages}
            currentLanguage={currentLang}
            onLanguageChange={handleLanguageChange}
            LinkComponent={LinkWrapper}
          />
          <AppBreadcrumbs items={breadcrumbItems} />
        </div>

        {/* Main content */}
        <main id="main-content" className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>

        {/* Footer */}
        <AppFooterForHomePage
          logo={{ appName: CONSTANTS.APP_NAME }}
          linkSections={footerLinkSections}
          copyrightYear={String(new Date().getFullYear())}
          companyName={CONSTANTS.COMPANY_NAME}
          description={CONSTANTS.APP_NAME}
          isNetworkOnline={true}
          LinkComponent={LinkWrapper}
        />
      </div>
    </LayoutProvider>
  );
}
