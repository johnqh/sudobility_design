import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Human labels for this app's route segments (design areas + top-level pages).
const SEGMENT_LABELS: Record<string, string> = {
  design: 'Design System',
  colors: 'Colors',
  text: 'Typography',
  forms: 'Forms',
  buttons: 'Buttons',
  cards: 'Cards',
  badges: 'Badges',
  alerts: 'Alerts',
  inputs: 'Inputs',
  loading: 'Loading States',
  modals: 'Modals',
  navigation: 'Navigation',
  'data-display': 'Data Display',
  'forms-advanced': 'Forms Advanced',
  'notifications-feedback': 'Notifications & Feedback',
  'layout-spacing': 'Layout & Spacing',
  'tables-grids': 'Tables & Grids',
  'icons-illustrations': 'Icons & Illustrations',
  'overlays-portals': 'Overlays & Portals',
  'micro-interactions-animations': 'Micro-Interactions & Animations',
  accessibility: 'Accessibility',
  performance: 'Performance',
  settings: 'Settings',
  docs: 'Docs',
};

/**
 * Builds breadcrumb items for the current path against this app's route map.
 * Consumed by the shell (ScreenContainerLayout), not by individual pages.
 */
export const useBreadcrumbs = (): { items: BreadcrumbItem[] } => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  useTranslation(); // re-render on language change

  const items = useMemo<BreadcrumbItem[]>(() => {
    const base = `/${lang || 'en'}`;
    const rest = location.pathname.replace(base, '').split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: base }];
    let acc = base;
    rest.forEach(seg => {
      acc += `/${seg}`;
      crumbs.push({ label: SEGMENT_LABELS[seg] || seg, href: acc });
    });
    const last = crumbs[crumbs.length - 1];
    last.current = true;
    last.href = undefined;
    return crumbs;
  }, [location.pathname, lang]);

  return { items };
};
