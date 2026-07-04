import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureTheme } from '@sudobility/design';
import { defaultTheme } from '@sudobility/design/themes';
import './index.css';

import App from './App';

// Activate the design-system theme so @sudobility/design + components render
// theme-aware semantic classes (bg-primary, ...) that resolve via the
// :root/.dark CSS variables in index.css + createTailwindPreset() in
// tailwind.config.js — matching the reference tapayoka_vendor_app.
configureTheme(defaultTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
