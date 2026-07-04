import React from 'react';
import LocalizedLink from '../components/LocalizedLink';
import {
  SwatchIcon,
  DocumentTextIcon as TextIcon,
  PaintBrushIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  RectangleStackIcon,
  SparklesIcon,
  BellIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  WindowIcon,
  Bars3Icon,
  TableCellsIcon,
  ClipboardDocumentListIcon,
  SpeakerWaveIcon,
  Squares2X2Icon,
  TableCellsIcon as TableIcon,
  PhotoIcon,
  Square3Stack3DIcon,
  CursorArrowRippleIcon,
  EyeIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { SEOHead } from '@sudobility/seo_lib';
import { ui, textVariants, designTokens } from '@sudobility/design';
import ThemeSwitcher from '../components/internal/ThemeSwitcher';
import ThemePreview from '../components/internal/ThemePreview';
import { useDesignTheme } from '../context/DesignThemeContext';

interface AppProps {
  emailDomain: string;
  appName: string;
}

const DesignSystemPage: React.FC<AppProps> = ({ appName }) => {
  const { themeName } = useDesignTheme();

  const designAreas = [
    {
      title: 'Colors',
      description:
        'Explore all color variations, semantic colors, and themes used throughout the application',
      icon: SwatchIcon,
      path: '/design/colors',
      gradient: 'from-destructive to-accent',
      features: [
        'Brand colors and variations',
        'Semantic color system',
        'Light and dark themes',
        'State colors (success, error, warning)',
        'Background and surface colors',
      ],
    },
    {
      title: 'Typography',
      description:
        'View all text styles, fonts, sizes, and typography variants supported by the design system',
      icon: TextIcon,
      path: '/design/text',
      gradient: 'from-primary to-info',
      features: [
        'Font families and weights',
        'Text sizes and scales',
        'Heading variations',
        'Body text styles',
        'Special text variants (code, links, etc.)',
      ],
    },
    {
      title: 'Forms',
      description:
        'Complete form element library with validation states, accessibility features, and consistent styling',
      icon: CubeTransparentIcon,
      path: '/design/forms',
      gradient: 'from-success to-info',
      features: [
        'Input types and variants',
        'Validation states (success, error)',
        'Form controls (select, checkbox, radio)',
        'Advanced patterns (password toggle)',
        'Accessibility guidelines',
      ],
    },
    {
      title: 'Buttons',
      description:
        'Comprehensive button component system with variants, sizes, states, and interactive patterns',
      icon: CursorArrowRaysIcon,
      path: '/design/buttons',
      gradient: 'from-secondary to-accent',
      features: [
        'Color variants (primary, secondary, destructive)',
        'Button sizes (small, default, large)',
        'Interactive states (hover, active, loading)',
        'Icon buttons and combinations',
        'Button groups and toolbars',
      ],
    },
    {
      title: 'Cards',
      description:
        'Flexible card component system with elevation, content variants, and Web3 integration patterns',
      icon: RectangleStackIcon,
      path: '/design/cards',
      gradient: 'from-warning to-destructive',
      features: [
        'Card elevation and shadow variants',
        'Content and media card layouts',
        'Interactive card states and actions',
        'Web3-specific card patterns (wallet, NFT)',
        'Responsive grid layouts',
      ],
    },
    {
      title: 'Badges',
      description:
        'Small, versatile components for labeling, categorizing, and conveying status information',
      icon: SparklesIcon,
      path: '/design/badges',
      gradient: 'from-warning to-accent',
      features: [
        'Semantic color variants (success, warning, error)',
        'Size options (small, default, large)',
        'Web3-specific blockchain badges',
        'Interactive states and notifications',
        'Accessibility and screen reader support',
      ],
    },
    {
      title: 'Alerts',
      description:
        'Contextual feedback messages for important information, warnings, and confirmations',
      icon: BellIcon,
      path: '/design/alerts',
      gradient: 'from-destructive to-accent',
      features: [
        'Standard and compact alert layouts',
        'Dismissible alerts with close actions',
        'Web3 transaction and wallet status alerts',
        'Action buttons and interactive elements',
        'ARIA accessibility and screen reader support',
      ],
    },
    {
      title: 'Inputs',
      description:
        'Form input components with consistent styling, validation states, and accessibility',
      icon: PencilSquareIcon,
      path: '/design/inputs',
      gradient: 'from-info to-primary',
      features: [
        'Text, email, password, and search inputs',
        'Size variations (small, default, large)',
        'Validation states and error handling',
        'Web3 wallet address and token amount inputs',
        'Icon placement and accessibility support',
      ],
    },
    {
      title: 'Loading States',
      description:
        'Comprehensive loading patterns including spinners, progress indicators, and Web3 transaction states',
      icon: ArrowPathIcon,
      path: '/design/loading',
      gradient: 'from-info to-success',
      features: [
        'Spinners and loading buttons',
        'Progress bars and skeleton loading',
        'Web3 transaction and wallet states',
        'Contextual loading messages',
        'Accessibility and screen reader support',
      ],
    },
    {
      title: 'Modals',
      description:
        'Modal and dialog components with Web3 integration patterns and accessibility features',
      icon: WindowIcon,
      path: '/design/modals',
      gradient: 'from-secondary to-primary',
      features: [
        'Modal sizes and layout variants',
        'Web3 wallet connection and transaction modals',
        'Interactive confirmation dialogs',
        'Form modals and settings panels',
        'ARIA accessibility and focus management',
      ],
    },
    {
      title: 'Navigation',
      description:
        'Navigation components including breadcrumbs, tabs, pagination, and menu systems',
      icon: Bars3Icon,
      path: '/design/navigation',
      gradient: 'from-muted to-muted-foreground',
      features: [
        'Breadcrumb navigation with SEO optimization',
        'Tab navigation with multiple variants',
        'Pagination for data sets',
        'Sidebar and menu navigation patterns',
        'Web3-specific navigation (multi-chain, wallet status)',
      ],
    },
    {
      title: 'Data Display',
      description:
        'Components for displaying data including tables, lists, grids, and information layouts',
      icon: TableCellsIcon,
      path: '/design/data-display',
      gradient: 'from-success to-info',
      features: [
        'Data tables with sorting and filtering',
        'List components for emails and transactions',
        'Grid layouts for NFTs and blockchain data',
        'Key-value displays and metadata',
        'Timeline and activity feeds',
      ],
    },
    {
      title: 'Forms Advanced',
      description:
        'Advanced form patterns including multi-step wizards, file uploads, and Web3 inputs',
      icon: ClipboardDocumentListIcon,
      path: '/design/forms-advanced',
      gradient: 'from-secondary to-primary',
      features: [
        'Multi-step form wizards with progress tracking',
        'File upload with drag & drop functionality',
        'Web3-specific inputs (wallet addresses, token amounts)',
        'Advanced validation with real-time feedback',
        'Security patterns for sensitive data',
      ],
    },
    {
      title: 'Notifications & Feedback',
      description:
        'Comprehensive notification system with toasts, progress indicators, and status displays',
      icon: SpeakerWaveIcon,
      path: '/design/notifications-feedback',
      gradient: 'from-primary to-info',
      features: [
        'Toast notifications with auto-dismiss and actions',
        'Progress indicators for long-running operations',
        'Web3 transaction status with confirmation tracking',
        'System status indicators and connection states',
        'Contextual feedback and smart suggestions',
      ],
    },
    {
      title: 'Layout & Spacing',
      description:
        'Comprehensive layout system with responsive grids, containers, and spacing utilities',
      icon: Squares2X2Icon,
      path: '/design/layout-spacing',
      gradient: 'from-success to-primary',
      features: [
        'Responsive grid systems and auto-fit patterns',
        'Container variants for different content widths',
        'Flexible Flexbox patterns for common layouts',
        'Comprehensive spacing utility system',
        'Web3-specific layout patterns (wallets, NFTs, DeFi)',
        'Dashboard and page layout templates',
      ],
    },
    {
      title: 'Tables & Data Grids',
      description:
        'Comprehensive table system with sorting, filtering, pagination, and data grid functionality',
      icon: TableIcon,
      path: '/design/tables-grids',
      gradient: 'from-primary to-secondary',
      features: [
        'Sortable columns with visual indicators',
        'Filterable data with search functionality',
        'Pagination for large datasets',
        'Row selection and bulk actions',
        'Responsive table layouts',
        'Data grid with resizable columns',
        'Loading and empty states',
        'Web3 transaction and address tables',
      ],
    },
    {
      title: 'Icons & Illustrations',
      description:
        'Comprehensive icon system with consistent sizing, colors, and contextual usage patterns',
      icon: PhotoIcon,
      path: '/design/icons-illustrations',
      gradient: 'from-accent to-destructive',
      features: [
        'Consistent icon sizing system (xs to xxxl)',
        'Semantic color variants (success, warning, error)',
        'Context-specific icon patterns (buttons, _inputs, navigation)',
        'Interactive states and hover effects',
        'Web3-specific blockchain icons',
        'Decorative and hero icon variants',
        'Status indicators and loading states',
        'Accessibility and screen reader support',
      ],
    },
    {
      title: 'Overlays & Portals',
      description:
        'Comprehensive overlay system with modals, dropdowns, tooltips, sheets, and loading states',
      icon: Square3Stack3DIcon,
      path: '/design/overlays-portals',
      gradient: 'from-primary to-secondary',
      features: [
        'Modal dialogs with animation states and focus management',
        'Dropdown menus with positioning and keyboard navigation',
        'Tooltips with multiple positioning options',
        'Bottom sheets and drawer overlays for mobile',
        'Context menus and right-click interactions',
        'Loading overlays with backdrop blur effects',
        'Proper z-index layering and portal management',
        'Accessibility with ARIA labels and focus trapping',
      ],
    },
    {
      title: 'Micro-Interactions & Animations',
      description:
        'Comprehensive animation system with hover effects, transitions, and Web3-specific interactions',
      icon: CursorArrowRippleIcon,
      path: '/design/micro-interactions-animations',
      gradient: 'from-accent to-secondary',
      features: [
        'Hover effects with lift, glow, and scale animations',
        'Loading animations and spinner variants',
        'Smooth transitions for state changes',
        'Gesture feedback and interaction responses',
        'Web3-specific animations (wallet connect, transaction states)',
        'Scroll-triggered animations and reveals',
        'Reduced motion accessibility support',
        'Performance-optimized CSS and JavaScript animations',
      ],
    },
    {
      title: 'Accessibility & A11Y',
      description:
        'Comprehensive accessibility patterns and inclusive design utilities for WCAG compliance',
      icon: EyeIcon,
      path: '/design/accessibility',
      gradient: 'from-success to-primary',
      features: [
        'Screen reader support with ARIA labels and skip links',
        'Focus management and keyboard navigation patterns',
        'High contrast color combinations for visibility',
        'Motion preferences and reduced motion support',
        'Semantic HTML roles and interactive patterns',
        'Form accessibility with validation and error handling',
        'Web3-specific accessibility for wallet connections',
        'WCAG 2.1 AA compliance utilities and best practices',
      ],
    },
    {
      title: 'Performance & Optimization',
      description:
        'Comprehensive performance patterns and optimization utilities for fast, efficient applications',
      icon: BoltIcon,
      path: '/design/performance',
      gradient: 'from-warning to-accent',
      features: [
        'Bundle optimization with code splitting and lazy loading',
        'Rendering optimization with GPU acceleration and virtual scrolling',
        'Network optimization with caching and adaptive loading',
        'Core Web Vitals monitoring (LCP, FID/INP, CLS)',
        'Web3-specific optimizations (transaction batching, gas optimization)',
        'Resource optimization with image compression and CDN patterns',
        'Performance monitoring with real-time metrics',
        'Memory optimization and efficient state management',
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title={`Design System - ${appName}`}
        description="Design system documentation and components showcase"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <PaintBrushIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">Design System</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>{appName}</h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}>
              Comprehensive design system documentation showcasing all colors, typography, and
              design tokens used throughout the {appName}.
            </p>

            {/* System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-primary mb-1`}>
                  {Object.keys(designTokens.typography.family).length}
                </div>
                <div className={textVariants.caption.default()}>Font Families</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-success mb-1`}>
                  {Object.keys(designTokens.typography.size).length}
                </div>
                <div className={textVariants.caption.default()}>Text Sizes</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-secondary mb-1`}>
                  {Object.keys(designTokens.spacing).length}
                </div>
                <div className={textVariants.caption.default()}>Spacing Units</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-warning mb-1`}>
                  {Object.keys(designTokens.radius).length}
                </div>
                <div className={textVariants.caption.default()}>Border Radius</div>
              </div>
            </div>
          </div>

          {/* Theme switcher + live preview */}
          <div className="mb-8 flex items-center justify-end">
            <ThemeSwitcher />
          </div>
          <div className="mb-12">
            <ThemePreview key={themeName} />
          </div>

          {/* Design Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {designAreas.map(area => (
              <LocalizedLink
                key={area.path}
                to={area.path}
                className={`${ui.background.surface} ${ui.border.default} border rounded-xl p-8 hover:shadow-xl transition-all duration-300 group`}
                aria-label={`Explore ${area.title} documentation`}
              >
                <div className="flex items-start mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${area.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <area.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h2
                      className={`${textVariants.heading.h3()} mb-3 group-hover:text-primary transition-colors`}
                    >
                      {area.title}
                    </h2>
                    <p className={`${textVariants.body.md()} text-muted-foreground`}>
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {area.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mr-3 flex-shrink-0" />
                      <span className={`${textVariants.body.sm()} text-muted-foreground`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action */}
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-200">
                  <span className={textVariants.link.subtle()}>Explore {area.title}</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </LocalizedLink>
            ))}
          </div>

          {/* System Information */}
          <div className={`${ui.background.subtle} rounded-xl p-8`}>
            <div className="flex items-center mb-4">
              <CubeTransparentIcon className="h-6 w-6 text-muted-foreground mr-3" />
              <h3 className={textVariants.heading.h4()}>Design System Architecture</h3>
            </div>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
              The {appName} is built with consistency, scalability, and accessibility
              in mind. It provides a comprehensive set of design tokens, components, and guidelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`${textVariants.heading.h5()} mb-3`}>Design Tokens</h4>
                <ul className={`${textVariants.body.sm()} text-muted-foreground space-y-1`}>
                  <li>• Typography scales and families</li>
                  <li>• Color palettes and semantic colors</li>
                  <li>• Spacing and sizing systems</li>
                  <li>• Border radius and shadow tokens</li>
                </ul>
              </div>
              <div>
                <h4 className={`${textVariants.heading.h5()} mb-3`}>Implementation</h4>
                <ul className={`${textVariants.body.sm()} text-muted-foreground space-y-1`}>
                  <li>• Tailwind CSS integration</li>
                  <li>• TypeScript support</li>
                  <li>• Dark mode compatibility</li>
                  <li>• Responsive design utilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default DesignSystemPage;
