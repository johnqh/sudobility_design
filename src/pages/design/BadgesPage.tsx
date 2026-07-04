import {
  ArrowLeftIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import LocalizedLink from "../../components/LocalizedLink";
import CodeBlock from "../../components/CodeBlock";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted component to avoid creating components during render
const SectionHeader: React.FC<{
  id: string;
  title: string;
  description: string;
  expandedSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
}> = ({ id, title, description, expandedSections, toggleSection }) => (
  <div className="mb-8">
    <button
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between w-full text-left mb-4"
    >
      <h2 className={textVariants.heading.h2()}>{title}</h2>
      {expandedSections[id] ? (
        <ChevronUpIcon className="h-6 w-6 text-muted-foreground" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
      )}
    </button>
    {expandedSections[id] && (
      <p className={`${textVariants.body.lg()} text-muted-foreground mb-6`}>
        {description}
      </p>
    )}
  </div>
);

const BadgesPage: React.FC<AppProps> = ({ appName }) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "quick-start": true,
    variants: true,
    sizes: true,
    states: true,
    web3: true,
    interactive: true,
    accessibility: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <SEOHead
        title={`Badges - ${appName}`}
        description="Badge components and variants for the design system"
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
            <SparklesIcon className="h-5 w-5 text-accent mr-2" />
            <span className="text-accent font-semibold">Badges</span>
          </div>

          <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
            Badge Components
          </h1>

          <p
            className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
          >
            Small, versatile components for labeling, categorizing, and
            conveying status information with semantic colors and interactive
            states.
          </p>

          {/* Badge Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-accent mb-1`}>
                8
              </div>
              <div className={textVariants.caption.default()}>
                Badge Variants
              </div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-success mb-1`}>
                3
              </div>
              <div className={textVariants.caption.default()}>Size Options</div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div className={`${textVariants.heading.h4()} text-primary mb-1`}>
                5
              </div>
              <div className={textVariants.caption.default()}>State Types</div>
            </div>
            <div className={`${ui.background.subtle} rounded-lg p-4`}>
              <div
                className={`${textVariants.heading.h4()} text-secondary mb-1`}
              >
                4
              </div>
              <div className={textVariants.caption.default()}>
                Web3 Variants
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="quick-start"
            title="🚀 Quick Start"
            description="Get started with the most commonly used badge patterns. Copy and paste these examples to quickly implement badges in your components."
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["quick-start"] && (
            <div className="space-y-8">
              {/* Basic Badges */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  1. Essential Badge Types
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.default()}>Default</span>
                    <span className={variants.badge.primary()}>Primary</span>
                    <span className={variants.badge.success()}>Success</span>
                    <span className={variants.badge.warning()}>Warning</span>
                    <span className={variants.badge.error()}>Error</span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/essential-variants.tsx"
                  title="Essential Badge Variants"
                />
              </div>

              {/* Status Badges with Icons */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  2. Status Badges with Icons
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.success()}>
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Active
                    </span>
                    <span className={variants.badge.warning()}>
                      <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                      Pending
                    </span>
                    <span className={variants.badge.error()}>
                      <XCircleIcon className="h-3 w-3 mr-1" />
                      Failed
                    </span>
                    <span className={variants.badge.primary()}>
                      <InformationCircleIcon className="h-3 w-3 mr-1" />
                      Info
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/status-icons.tsx"
                  title="Status Badges with Icons"
                />
              </div>

              {/* Size Variants */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  3. Size Variations
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.small("primary")}>
                      Small
                    </span>
                    <span className={variants.badge.primary()}>Default</span>
                    <span className={variants.badge.large("primary")}>
                      Large
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/sizes.tsx"
                  title="Badge Sizes"
                />
              </div>

              {/* Web3 Badges */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  4. Web3 Integration Badges
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className={variants.badge.ethereum()}>
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0L5.35 12.11L12 16.22L18.65 12.11L12 0Z" />
                        <path d="M12 17.75L5.35 13.64L12 24L18.65 13.64L12 17.75Z" />
                      </svg>
                      Ethereum
                    </span>
                    <span className={variants.badge.solana()}>
                      <BoltIcon className="h-3 w-3 mr-1" />
                      Solana
                    </span>
                    <span className={variants.badge.primary()}>
                      <ShieldCheckIcon className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
                <CodeBlock
                  filename="internal/badges/web3-variants.tsx"
                  title="Web3 Badge Variants"
                />
              </div>
            </div>
          )}
        </div>

        {/* Badge Variants Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="variants"
            title="🎨 Badge Variants"
            description="Explore all available badge color variants with their semantic meanings and appropriate use cases."
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["variants"] && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Semantic Variants */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    Semantic Colors
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.default()}>
                          Default
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          General purpose, neutral information
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.primary()}>
                          Primary
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Brand colors, important highlights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.success()}>
                          Success
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Completed actions, positive status
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.warning()}>
                          Warning
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Caution required, pending actions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.error()}>Error</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Failed actions, critical issues
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Web3 Variants */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    Web3 Specific
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.ethereum()}>
                          Ethereum
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ethereum blockchain related
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <span className={variants.badge.solana()}>Solana</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Solana blockchain related
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/complete-system.tsx"
                title="Complete Badge System"
              />
            </div>
          )}
        </div>

        {/* Size Variants Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="sizes"
            title="📏 Size Options"
            description="Different badge sizes for various use cases from compact indicators to prominent labels."
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["sizes"] && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Small</h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.small("primary")}>
                      Small Badge
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Compact size for dense layouts
                  </p>
                </div>

                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Default
                  </h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.primary()}>
                      Default Badge
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Standard size for most use cases
                  </p>
                </div>

                <div className="text-center">
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Large</h4>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <span className={variants.badge.large("primary")}>
                      Large Badge
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Prominent size for emphasis
                  </p>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/size-variants.tsx"
                title="Size Variants"
              />
            </div>
          )}
        </div>

        {/* Interactive Examples Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="interactive"
            title="⚡ Interactive Patterns"
            description="Real-world examples of how badges are used in different contexts and components."
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["interactive"] && (
            <div className="space-y-8">
              {/* User Status Example */}
              <div>
                <h3 className={`${textVariants.heading.h4()} mb-4`}>
                  User Status Indicators
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full mr-3"></div>
                        <span>user.eth</span>
                      </div>
                      <span className={variants.badge.success()}>
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary rounded-full mr-3"></div>
                        <span>wallet.sol</span>
                      </div>
                      <span className={variants.badge.warning()}>
                        <ClockIcon className="h-3 w-3 mr-1" />
                        Away
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-muted-foreground rounded-full mr-3"></div>
                        <span>address.crypto</span>
                      </div>
                      <span className={variants.badge.default()}>Offline</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Badges */}
              <div>
                <h3 className={`${textVariants.heading.h4()} mb-4`}>
                  Notification Counts
                </h3>
                <div className="bg-muted p-6 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-6">
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        📧 Messages
                      </button>
                      <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        5
                      </span>
                    </div>
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        🔔 Notifications
                      </button>
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        12
                      </span>
                    </div>
                    <div className="relative">
                      <button className="p-3 bg-card rounded-lg border">
                        ⭐ Updates
                      </button>
                      <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                filename="internal/badges/interactive-patterns.tsx"
                title="Interactive Badge Patterns"
              />
            </div>
          )}
        </div>

        {/* Accessibility Section */}
        <div className={`${variants.card.elevated.padded()} mb-12`}>
          <SectionHeader
            id="accessibility"
            title="♿ Accessibility Guidelines"
            description="Ensure your badges are accessible to all users with proper contrast, screen reader support, and keyboard navigation."
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {expandedSections["accessibility"] && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    ✅ Best Practices
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Use semantic colors that convey meaning consistently
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Provide adequate color contrast (4.5:1 minimum)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Include text labels, not just colors or icons
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Use appropriate ARIA labels for screen readers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Keep badge text concise and meaningful
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    ❌ Avoid
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Relying solely on color to convey information
                      </span>
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Using too many badges in a single interface
                      </span>
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Making badges too small to read comfortably
                      </span>
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Using unclear or ambiguous badge text
                      </span>
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Overusing animated or flashing badges
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className={`${textVariants.heading.h4()} mb-4`}>
                  ARIA Examples
                </h3>
                <CodeBlock
                  filename="internal/badges/accessible-examples.tsx"
                  title="Accessible Badge Examples"
                />
              </div>
            </div>
          )}
        </div>

        {/* Back Navigation */}
        <div className="flex items-center justify-between pt-8 border-t">
          <LocalizedLink
            to="/design"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Design System
          </LocalizedLink>

          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgesPage;
