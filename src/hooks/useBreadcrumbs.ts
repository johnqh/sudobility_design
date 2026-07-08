import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

/**
 * Builds breadcrumb items for the current path against this app's route map.
 * Consumed by the shell (ScreenContainerLayout), not by individual pages.
 */
export const useBreadcrumbs = (): { items: BreadcrumbItem[] } => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation("common");

  const segmentLabels: Record<string, string> = {
    design: t("breadcrumbs.design"),
    colors: t("breadcrumbs.colors"),
    text: t("breadcrumbs.text"),
    forms: t("breadcrumbs.forms"),
    buttons: t("breadcrumbs.buttons"),
    cards: t("breadcrumbs.cards"),
    badges: t("breadcrumbs.badges"),
    alerts: t("breadcrumbs.alerts"),
    inputs: t("breadcrumbs.inputs"),
    loading: t("breadcrumbs.loading"),
    modals: t("breadcrumbs.modals"),
    navigation: t("breadcrumbs.navigation"),
    "data-display": t("breadcrumbs.dataDisplay"),
    "forms-advanced": t("breadcrumbs.formsAdvanced"),
    "notifications-feedback": t("breadcrumbs.notificationsFeedback"),
    "layout-spacing": t("breadcrumbs.layoutSpacing"),
    "tables-grids": t("breadcrumbs.tablesGrids"),
    "icons-illustrations": t("breadcrumbs.iconsIllustrations"),
    "overlays-portals": t("breadcrumbs.overlaysPortals"),
    "micro-interactions-animations": t(
      "breadcrumbs.microInteractionsAnimations",
    ),
    accessibility: t("breadcrumbs.accessibility"),
    performance: t("breadcrumbs.performance"),
    settings: t("nav.settings"),
    docs: t("nav.docs"),
  };

  const items = useMemo<BreadcrumbItem[]>(() => {
    const base = `/${lang || "en"}`;
    const rest = location.pathname.replace(base, "").split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [
      { label: t("breadcrumbs.home"), href: base },
    ];
    let acc = base;
    rest.forEach((seg) => {
      acc += `/${seg}`;
      crumbs.push({ label: segmentLabels[seg] || seg, href: acc });
    });
    const last = crumbs[crumbs.length - 1];
    last.current = true;
    last.href = undefined;
    return crumbs;
  }, [location.pathname, lang, segmentLabels, t]);

  return { items };
};
