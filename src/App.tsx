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

// Lazy-loaded design showcase pages, keyed by route slug (under /:lang/design/).
const designPages: Record<string, ComponentType<PageProps>> = {
  colors: lazy(() => import('./pages/design/ColorsPage')),
  text: lazy(() => import('./pages/design/TypographyPage')),
  buttons: lazy(() => import('./pages/design/ButtonsPage')),
  cards: lazy(() => import('./pages/design/CardsPage')),
  inputs: lazy(() => import('./pages/design/InputsPage')),
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
