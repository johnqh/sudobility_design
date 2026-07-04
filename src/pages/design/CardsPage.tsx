import { Section } from '@sudobility/components';

import React, { useState } from 'react';
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
  StarIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  WifiIcon,
  SignalIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { SEOHead } from '@sudobility/seo_lib';
import { textVariants, variants } from '@sudobility/design';

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted component to avoid creating components during render
const CodeExample: React.FC<{
  title: string;
  description?: string;
  code: string;
  preview?: React.ReactNode;
  copiedValue: string | null;
  copyToClipboard: (value: string) => void;
}> = ({ title, description, code, preview, copiedValue, copyToClipboard }) => (
  <div className="border border-border rounded-lg p-4 space-y-4">
    <div>
      <h4 className={`${textVariants.heading.h5()} mb-1`}>{title}</h4>
      {description && (
        <p className={`${textVariants.body.sm()} text-muted-foreground`}>{description}</p>
      )}
    </div>

    {preview && (
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-destructive rounded-full"></div>
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className={`${textVariants.caption.default()} ml-2`}>Preview</span>
        </div>
        <div className="bg-card rounded border p-6">{preview}</div>
      </div>
    )}

    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CodeBracketIcon className="h-4 w-4 text-muted-foreground" />
          <span className={`${textVariants.caption.default()} text-muted-foreground`}>Usage</span>
        </div>
        <button
          onClick={() => copyToClipboard(code)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copiedValue === code ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <code className="font-mono text-xs font-medium text-foreground block whitespace-pre-wrap">
        {code}
      </code>
    </div>
  </div>
);

const CardsPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(4);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Quick Start copyable snippets (referenced in onClick, comparison, and <pre>)
  const basicCardCode = `import { variants } from '@sudobility/design';

// Basic content card
<div className={variants.card.default.padded()}>
  // → bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm
  <h3 className="text-lg font-semibold text-foreground mb-2">Card Title</h3>
  <p className="text-muted-foreground text-sm">
    This is a basic card with simple content layout and consistent styling.
  </p>
</div>`;

  const interactiveCardCode = `import { variants } from '@sudobility/design';

// Interactive card (hover lift + accent border)
<div className={\`\${variants.card.default.padded()} hover:border-primary
                 cursor-pointer transition-all hover:-translate-y-1\`}>
  <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Card</h3>
  <p className="text-muted-foreground text-sm mb-4">
    Click me for interaction effects and enhanced hover states.
  </p>
  <div className="flex items-center justify-between">
    <span className="text-primary text-sm font-medium">Learn more →</span>
  </div>
</div>`;

  const statsCardCode = `import { variants } from '@sudobility/design';

// Statistics card
<div className={variants.card.default.padded()}>
  <div className="flex items-center">
    <div className="p-2 bg-primary/10 rounded-lg">
      <CurrencyDollarIcon className="h-6 w-6 text-primary" />
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
      <p className="text-2xl font-semibold text-foreground">$45,231.89</p>
    </div>
  </div>
  <div className="mt-4 flex items-center text-sm">
    <span className="text-success flex items-center">
      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
      +20.1%
    </span>
    <span className="text-muted-foreground ml-2">from last month</span>
  </div>
</div>`;

  const featureCardCode = `import { variants } from '@sudobility/design';

// Feature card
<div className={variants.card.default.padded()}>
  <div className="flex items-start">
    <div className="p-2 bg-success/10 rounded-lg">
      <ShieldCheckIcon className="h-6 w-6 text-success" />
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Private</h3>
      <p className="text-muted-foreground text-sm mb-4">
        End-to-end encryption ensures your communications remain private and secure.
      </p>
      <button className="text-success text-sm font-medium hover:text-success/80 transition-colors">
        Learn more →
      </button>
    </div>
  </div>
</div>`;

  return (
    <>
      <SEOHead
        title={`Cards - Design System - Internal - ${emailDomain}`}
        description="Complete card component library with layouts, variants, and interactive patterns"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <svg
                className="h-5 w-5 text-primary mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="text-primary font-semibold">Card Components</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Card Layout & Content Patterns
            </h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}>
              Comprehensive card component system with flexible layouts, interactive elements, and
              content patterns. All cards support elevation, hover states, and responsive design
              with consistent spacing and styling.
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()} text-foreground`}>
                  Quick Start - Essential Card Patterns
                </h2>
              </div>

              <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
                Ready-to-use card components with consistent layouts, interactions, and content
                organization.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Card */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-foreground mb-3`}>
                    Basic Content Card
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(basicCardCode)}
                    >
                      {copiedValue === basicCardCode ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">{basicCardCode}</pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div
                      className={`${variants.card.default.padded()} hover:shadow-md transition-shadow duration-200`}
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">Card Title</h3>
                      <p className="text-muted-foreground text-sm">
                        This is a basic card with simple content layout and consistent styling.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Card */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-foreground mb-3`}>
                    Interactive Card
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(interactiveCardCode)}
                    >
                      {copiedValue === interactiveCardCode ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {interactiveCardCode}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div
                      className={`${variants.card.default.padded()} hover:shadow-lg hover:border-primary cursor-pointer transition-all duration-200 transform hover:-translate-y-1`}
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Interactive Card
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Click me for interaction effects and enhanced hover states.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary text-sm font-medium">Learn more →</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-foreground mb-3`}>
                    Statistics Card
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(statsCardCode)}
                    >
                      {copiedValue === statsCardCode ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">{statsCardCode}</pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className={variants.card.default.padded()}>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CurrencyDollarIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-semibold text-foreground">$45,231.89</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm">
                        <span className="text-success flex items-center">
                          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                          +20.1%
                        </span>
                        <span className="text-muted-foreground ml-2">from last month</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Card */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-foreground mb-3`}>
                    Feature Card
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(featureCardCode)}
                    >
                      {copiedValue === featureCardCode ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">{featureCardCode}</pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className={variants.card.default.padded()}>
                      <div className="flex items-start">
                        <div className="p-2 bg-success/10 rounded-lg">
                          <ShieldCheckIcon className="h-6 w-6 text-success" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Secure & Private
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            End-to-end encryption ensures your communications remain private and
                            secure.
                          </p>
                          <button className="text-success text-sm font-medium hover:text-success/80 transition-colors">
                            Learn more →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Card Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Card Variants & Elevations</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Different card elevations and styling variants for various use cases.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Elevation Levels"
                description="Different shadow depths and hover states for visual hierarchy"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`// Flat Card (no shadow)
<div className="bg-card border border-border rounded-lg p-6">
  Flat Card
</div>

// Default Card (subtle shadow)
<div className="bg-card border border-border rounded-lg p-6 shadow-sm">
  Default Card
</div>

// Elevated Card (medium shadow)
<div className="bg-card border border-border rounded-lg p-6 shadow-md">
  Elevated Card
</div>

// Floating Card (high shadow)
<div className="bg-card border border-border rounded-lg p-6 shadow-lg">
  Floating Card
</div>`}
                preview={
                  <div className="space-y-4">
                    <div className="bg-card border border-border rounded-lg p-4">
                      <span className="text-sm text-muted-foreground">Flat Card</span>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                      <span className="text-sm text-muted-foreground">Default Card</span>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 shadow-md">
                      <span className="text-sm text-muted-foreground">Elevated Card</span>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                      <span className="text-sm text-muted-foreground">Floating Card</span>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title="Color Variants"
                description="Branded and semantic color variants for different contexts"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`// Success Card
<div className="bg-success/10 border border-success/20 rounded-lg p-6">
  <div className="text-success">Success Card</div>
</div>

// Warning Card
<div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
  <div className="text-warning">Warning Card</div>
</div>

// Error Card
<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
  <div className="text-destructive">Error Card</div>
</div>

// Info Card
<div className="bg-info/10 border border-info/20 rounded-lg p-6">
  <div className="text-info">Info Card</div>
</div>`}
                preview={
                  <div className="space-y-4">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="text-success text-sm">Success Card</div>
                    </div>
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <div className="text-warning text-sm">Warning Card</div>
                    </div>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <div className="text-destructive text-sm">Error Card</div>
                    </div>
                    <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                      <div className="text-info text-sm">Info Card</div>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Content Cards */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Content & Media Cards</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Cards with rich content, media, and interactive elements for social and content
              applications.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Social Media Card"
                description="Card with user interaction, engagement metrics, and actions"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

<div className={variants.card.default.padded()}>
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <span className="text-primary-foreground font-medium text-sm">JD</span>
      </div>
      <div className="ml-3">
        <p className="font-medium text-foreground">John Doe</p>
        <p className="text-xs text-muted-foreground">2 hours ago</p>
      </div>
    </div>
    <button className="p-1 hover:bg-muted rounded">
      <EllipsisVerticalIcon className="h-5 w-5 text-muted-foreground" />
    </button>
  </div>

  {/* Content */}
  <p className="text-foreground mb-4">
    Just shipped a new feature! The Web3 integration is now live and ready for testing.
  </p>

  {/* Actions */}
  <div className="flex items-center space-x-6 pt-2 border-t border-border">
    <button className="flex items-center space-x-2 text-muted-foreground
                       hover:text-destructive transition-colors">
      <HeartIcon className="h-5 w-5" />
      <span className="text-sm">24</span>
    </button>
    <button className="flex items-center space-x-2 text-muted-foreground
                       hover:text-primary transition-colors">
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <span className="text-sm">12</span>
    </button>
    <button className="flex items-center space-x-2 text-muted-foreground
                       hover:text-success transition-colors">
      <ShareIcon className="h-5 w-5" />
      <span className="text-sm">Share</span>
    </button>
  </div>
</div>`}
                preview={
                  <div className={variants.card.default.padded()}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-medium text-sm">JD</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-foreground">John Doe</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-muted rounded">
                        <EllipsisVerticalIcon className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </div>

                    {/* Content */}
                    <p className="text-foreground mb-4">
                      Just shipped a new feature! The Web3 integration is now live and ready for
                      testing.
                    </p>

                    {/* Actions */}
                    <div className="flex items-center space-x-6 pt-2 border-t border-border">
                      <button
                        onClick={() => setLiked(!liked)}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        {liked ? (
                          <HeartIconSolid className="h-5 w-5 text-destructive" />
                        ) : (
                          <HeartIcon className="h-5 w-5" />
                        )}
                        <span className="text-sm">{liked ? 25 : 24}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        <span className="text-sm">12</span>
                      </button>
                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-success transition-colors">
                        <ShareIcon className="h-5 w-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title="Product Card"
                description="E-commerce style card with rating, pricing, and actions"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

<div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
  {/* Product Image */}
  <div className="h-48 bg-primary flex items-center justify-center">
    <CpuChipIcon className="h-16 w-16 text-primary-foreground" />
  </div>

  {/* Content */}
  <div className="p-6">
    <h3 className="text-lg font-semibold text-foreground mb-2">
      Web3 Development Kit
    </h3>

    {/* Rating */}
    <div className="flex items-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} className={\`h-4 w-4 \${star <= 4 ? 'text-warning' : 'text-muted-foreground'}\`} />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
    </div>

    <p className="text-muted-foreground text-sm mb-4">
      Complete toolkit for building decentralized applications with ease.
    </p>

    {/* Price & Actions */}
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold text-foreground">$99</div>
      <div className="flex space-x-2">
        <button className="p-2 border border-border rounded-lg
                           hover:bg-muted transition-colors">
          <BookmarkIcon className="h-4 w-4" />
        </button>
        <button className={variants.button.primary.default()}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>`}
                preview={
                  <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                    {/* Product Image */}
                    <div className="h-48 bg-primary flex items-center justify-center">
                      <CpuChipIcon className="h-16 w-16 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Web3 Development Kit
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => setRating(star)}>
                            {star <= rating ? (
                              <StarIconSolid className="h-4 w-4 text-warning" />
                            ) : (
                              <StarIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">(128 reviews)</span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        Complete toolkit for building decentralized applications with ease.
                      </p>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-foreground">$99</div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
                          >
                            {bookmarked ? (
                              <BookmarkIcon className="h-4 w-4 fill-current text-primary" />
                            ) : (
                              <BookmarkIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button className={variants.button.primary.default()}>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Web3 Specific Cards */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Web3 & Crypto Cards</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Specialized card patterns for Web3, crypto, and blockchain applications.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Wallet Connection Card"
                description="Card for wallet connection with status indicators"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

<div className={variants.card.default.padded()}>
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <WifiIcon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-foreground">MetaMask</h3>
        <p className="text-sm text-muted-foreground">
          0x742d...4b1a
        </p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
      <span className="text-sm text-success">Connected</span>
    </div>
  </div>

  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Network</span>
      <span className="text-sm font-medium text-foreground">Ethereum</span>
    </div>
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Balance</span>
      <span className="text-sm font-medium text-foreground">2.45 ETH</span>
    </div>
  </div>

  <button className={\`\${variants.button.destructive.default()} w-full mt-4\`}>
    Disconnect
  </button>
</div>`}
                preview={
                  <div className={variants.card.default.padded()}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <WifiIcon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-foreground">MetaMask</h3>
                          <p className="text-sm text-muted-foreground">0x742d...4b1a</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                        <span className="text-sm text-success">Connected</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Network</span>
                        <span className="text-sm font-medium text-foreground">Ethereum</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Balance</span>
                        <span className="text-sm font-medium text-foreground">2.45 ETH</span>
                      </div>
                    </div>

                    <button className={`${variants.button.destructive.default()} w-full mt-4`}>
                      Disconnect
                    </button>
                  </div>
                }
              />

              <CodeExample
                title="NFT Collection Card"
                description="Card for displaying NFT collections and metadata"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

<div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
  {/* NFT Preview */}
  <div className="h-48 bg-primary flex items-center justify-center relative">
    <div className="text-6xl">🎨</div>
    <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-full
                    px-2 py-1 text-xs text-white">
      #1337
    </div>
  </div>

  {/* Content */}
  <div className="p-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold text-foreground">
        Crypto Punks Collection
      </h3>
      <div className="flex items-center space-x-1">
        <EyeIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">1.2k</span>
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-4">
      Rare digital collectible from the iconic CryptoPunks series.
    </p>

    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Current Price</p>
        <p className="font-semibold text-foreground">125.5 ETH</p>
      </div>
      <div className="flex space-x-2">
        <button className={\`\${variants.button.primary.default()} text-sm\`}>
          Place Bid
        </button>
      </div>
    </div>
  </div>
</div>`}
                preview={
                  <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                    {/* NFT Preview */}
                    <div className="h-48 bg-primary flex items-center justify-center relative">
                      <div className="text-6xl">🎨</div>
                      <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                        #1337
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">Crypto Punks Collection</h3>
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">1.2k</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        Rare digital collectible from the iconic CryptoPunks series.
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Price</p>
                          <p className="font-semibold text-foreground">125.5 ETH</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className={`${variants.button.primary.default()} text-sm`}>
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Card Layouts */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Card Layouts & Grids</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Responsive grid layouts and card arrangements for different screen sizes.
            </p>

            <CodeExample
              title="Responsive Card Grid"
              description="Adaptive grid that works across all screen sizes"
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              code={`{/* Responsive Grid - adapts from 1 column on mobile to 4 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {cardData.map((card, index) => (
    <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-sm
                                hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg
                        flex items-center justify-center">
          <SignalIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-foreground">
            {card.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {card.subtitle}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        {card.description}
      </p>
    </div>
  ))}
</div>

// Breakpoint behavior:
// - Mobile (< 768px): 1 column
// - Tablet (768px - 1023px): 2 columns
// - Desktop (1024px - 1279px): 3 columns
// - Large (≥ 1280px): 4 columns`}
              preview={
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(index => (
                      <div
                        key={index}
                        className="bg-card border border-border rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <SignalIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-foreground text-sm">Card {index}</h3>
                            <p className="text-xs text-muted-foreground">Subtitle</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          Sample card content for grid demonstration.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Accessibility & Best Practices</h2>
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className={`${textVariants.heading.h4()} mb-4 text-foreground`}>
                Card Accessibility Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use semantic HTML structure with proper headings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ensure sufficient color contrast for text content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Add focus states for interactive card elements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use ARIA labels for complex card interactions</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Implement keyboard navigation for card actions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide alternative text for decorative elements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use responsive design for mobile accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Test with screen readers and keyboard navigation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default CardsPage;
