import { Suspense, lazy, type ComponentType } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SudobilityApp } from '@sudobility/building_blocks';
import { initializeNetworkService } from '@sudobility/di';
import { SEOHeadProvider } from '@sudobility/seo_lib';
import i18n from './i18n';
import { seoHeadConfig } from './config/seo';
import ScreenContainerLayout from './components/ScreenContainerLayout';
import { DesignThemeProvider } from './context/DesignThemeContext';
import { CONSTANTS } from './config/constants';
import DesignSystemPage from './pages/DesignSystemPage';

initializeNetworkService();

type PageProps = { emailDomain: string; appName: string };

const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Lazy-loaded design showcase pages, keyed by route slug (under /:lang/design/).
const designPages: Record<string, ComponentType<PageProps>> = {
  colors: lazy(() => import('./pages/design/ColorsPage')),
  text: lazy(() => import('./pages/design/TypographyPage')),
  buttons: lazy(() => import('./pages/design/ButtonsPage')),
  cards: lazy(() => import('./pages/design/CardsPage')),
  inputs: lazy(() => import('./pages/design/InputsPage')),
  alerts: lazy(() => import('./pages/design/AlertsPage')),
  loading: lazy(() => import('./pages/design/LoadingStatesPage')),
  modals: lazy(() => import('./pages/design/ModalsPage')),
  navigation: lazy(() => import('./pages/design/NavigationPage')),
  'data-display': lazy(() => import('./pages/design/DataDisplayPage')),
  forms: lazy(() => import('./pages/design/FormsPage')),
  'forms-advanced': lazy(() => import('./pages/design/FormsAdvancedPage')),
  'notifications-feedback': lazy(() => import('./pages/design/NotificationsFeedbackPage')),
  'layout-spacing': lazy(() => import('./pages/design/LayoutSpacingPage')),
  'tables-grids': lazy(() => import('./pages/design/TablesGridsPage')),
  badges: lazy(() => import('./pages/design/BadgesPage')),
  'icons-illustrations': lazy(() => import('./pages/design/IconsIllustrationsPage')),
  'overlays-portals': lazy(() => import('./pages/design/OverlaysPortalsPage')),
  'micro-interactions-animations': lazy(
    () => import('./pages/design/MicroInteractionsAnimationsPage')
  ),
  accessibility: lazy(() => import('./pages/design/AccessibilityPage')),
  performance: lazy(() => import('./pages/design/PerformancePage')),
};

const pageProps: PageProps = { emailDomain: CONSTANTS.APP_DOMAIN, appName: CONSTANTS.APP_NAME };

function AppRoutes() {
  const { i18n: i18nInstance } = useTranslation();
  return (
    <Suspense fallback={<div className="p-12">Loading...</div>}>
      <Routes>
        <Route path="/:lang" element={<ScreenContainerLayout />}>
          <Route index element={<DesignSystemPage {...pageProps} />} />
          {Object.entries(designPages).map(([slug, Page]) => (
            <Route key={slug} path={`design/${slug}`} element={<Page {...pageProps} />} />
          ))}
          <Route path="settings" element={<SettingsPage {...pageProps} />} />
        </Route>
        <Route path="/" element={<Navigate to={`/${i18nInstance.language || 'en'}`} replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <SudobilityApp i18n={i18n} storageKeyPrefix="sudobility-design">
      <SEOHeadProvider config={seoHeadConfig}>
        <DesignThemeProvider>
          <AppRoutes />
        </DesignThemeProvider>
      </SEOHeadProvider>
    </SudobilityApp>
  );
}
