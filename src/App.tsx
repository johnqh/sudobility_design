import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SudobilityApp } from '@sudobility/building_blocks';
import { initializeNetworkService } from '@sudobility/di';
import { SEOHeadProvider } from '@sudobility/seo_lib';
import i18n from './i18n';
import { seoHeadConfig } from './config/seo';
import ScreenContainerLayout from './components/ScreenContainerLayout';

initializeNetworkService();

function Placeholder() {
  return (
    <div className="p-12 text-center text-2xl">Sudobility Design System — scaffold OK</div>
  );
}

function AppRoutes() {
  const { i18n: i18nInstance } = useTranslation();
  return (
    <Suspense fallback={<div className="p-12">Loading...</div>}>
      <Routes>
        <Route path="/:lang" element={<ScreenContainerLayout />}>
          <Route index element={<Placeholder />} />
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
        <AppRoutes />
      </SEOHeadProvider>
    </SudobilityApp>
  );
}
