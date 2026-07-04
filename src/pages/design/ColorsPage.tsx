import { Section } from '@sudobility/components';

import React, { useState } from 'react';
import LocalizedLink from '../../components/LocalizedLink';
import {
  SwatchIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { SEOHead } from '@sudobility/seo_lib';
import { ui, textVariants, variants, colors } from '@sudobility/design';

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Component definitions moved outside to avoid creating components during render
interface ColorSwatchProps {
  name: string;
  value: string;
  showName?: boolean;
  className?: string;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  value,
  showName = true,
  className = '',
  copiedValue,
  onCopy,
}) => (
  <div
    className={`group cursor-pointer ${className}`}
    onClick={() => onCopy(value)}
    role="button"
    aria-label={`Copy ${name} color value ${value}`}
  >
    <div
      className="h-16 w-full rounded-lg mb-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 relative overflow-hidden border border-border"
      style={{ backgroundColor: value }}
    >
      {copiedValue === value ? (
        <CheckIcon className="h-6 w-6 text-white bg-black bg-opacity-50 rounded-full p-1" />
      ) : (
        <ClipboardDocumentIcon className="h-6 w-6 text-white bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
    {showName && (
      <div className={textVariants.body.sm()}>
        <div className="font-medium">{name}</div>
        <div className={`${textVariants.code.small()} mt-1`}>{value}</div>
      </div>
    )}
  </div>
);

interface CodeExampleProps {
  title: string;
  description?: string;
  code: string;
  preview?: React.ReactNode;
  copiedValue: string | null;
  onCopy: (value: string) => void;
}

const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  description,
  code,
  preview,
  copiedValue,
  onCopy,
}) => (
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
        <div className="bg-card rounded border p-3">{preview}</div>
      </div>
    )}

    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CodeBracketIcon className="h-4 w-4 text-muted-foreground" />
          <span className={`${textVariants.caption.default()} text-muted-foreground`}>Usage</span>
        </div>
        <button
          onClick={() => onCopy(code)}
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

const ColorsPage: React.FC<AppProps> = ({ emailDomain, appName }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Quick-start snippets lead with the design-system call so the copied
  // string always matches its rendered preview (same variant).
  const primaryBtnSnippet = `import { variants } from '@sudobility/design';

// Primary
<button className={variants.button.primary.default()}>
  Primary Action
</button>
// → bg-primary text-primary-foreground hover:bg-primary/90`;

  const successAlertSnippet = `import { variants } from '@sudobility/design';

// Success alert
<div className={variants.alert.success()}>
  <CheckCircleIcon className="h-5 w-5 mr-3" />
  <span className="font-medium">Success!</span>
</div>
// → bg-success/10 text-success border`;

  const ethBadgeSnippet = `import { variants } from '@sudobility/design';

// Blockchain badge
<span className={variants.badge.ethereum()}>Ethereum</span>
// → ethereum-branded badge classes`;

  const inputSnippet = `import { variants } from '@sudobility/design';

// Text input
<input
  className={variants.input.default()}
  placeholder="Enter your email..."
/>
// → border-input bg-background focus:ring-ring`;

  // Raw color palettes from the design system
  const colorPalettes = [
    {
      name: 'Blue (Primary)',
      description: 'Primary brand color palette',
      colors: colors.raw.blue,
    },
    {
      name: 'Purple (Secondary)',
      description: 'Secondary brand color palette',
      colors: colors.raw.purple,
    },
    {
      name: 'Neutral (Grayscale)',
      description: 'Background, text, and border colors',
      colors: colors.raw.neutral,
    },
    {
      name: 'Red (Error)',
      description: 'Error and destructive action colors',
      colors: colors.raw.red,
    },
    {
      name: 'Green (Success)',
      description: 'Success and positive action colors',
      colors: colors.raw.green,
    },
    {
      name: 'Amber (Warning)',
      description: 'Warning and caution colors',
      colors: colors.raw.amber,
    },
    {
      name: 'Orange',
      description: 'Accent and highlight colors',
      colors: colors.raw.orange,
    },
  ];

  // Web3 specific colors
  const web3Colors = [
    {
      name: 'Ethereum',
      color: colors.raw.web3.ethereum.DEFAULT,
      usage: 'Ethereum network branding',
    },
    {
      name: 'Solana',
      color: colors.raw.web3.solana.DEFAULT,
      usage: 'Solana network branding',
    },
    {
      name: 'Polygon',
      color: colors.raw.web3.polygon.DEFAULT,
      usage: 'Polygon network branding',
    },
  ];

  // Semantic color examples
  const semanticColors = [
    {
      category: 'Text Colors',
      colors: [
        {
          name: 'Primary Text',
          light: colors.semantic.text.primary.light,
          dark: colors.semantic.text.primary.dark,
          usage: 'Main content text',
        },
        {
          name: 'Secondary Text',
          light: colors.semantic.text.secondary.light,
          dark: colors.semantic.text.secondary.dark,
          usage: 'Supporting text',
        },
        {
          name: 'Link Text',
          light: colors.semantic.text.link.light,
          dark: colors.semantic.text.link.dark,
          usage: 'Interactive links',
        },
      ],
    },
    {
      category: 'Background Colors',
      colors: [
        {
          name: 'Primary Background',
          light: colors.semantic.background.primary.light,
          dark: colors.semantic.background.primary.dark,
          usage: 'Main page backgrounds',
        },
        {
          name: 'Secondary Background',
          light: colors.semantic.background.secondary.light,
          dark: colors.semantic.background.secondary.dark,
          usage: 'Card backgrounds',
        },
        {
          name: 'Elevated Background',
          light: colors.semantic.background.elevated.light,
          dark: colors.semantic.background.elevated.dark,
          usage: 'Modals and overlays',
        },
      ],
    },
    {
      category: 'State Colors',
      colors: [
        {
          name: 'Success',
          light: colors.semantic.state.success.light,
          dark: colors.semantic.state.success.dark,
          usage: 'Success messages and actions',
        },
        {
          name: 'Warning',
          light: colors.semantic.state.warning.light,
          dark: colors.semantic.state.warning.dark,
          usage: 'Warning messages',
        },
        {
          name: 'Error',
          light: colors.semantic.state.error.light,
          dark: colors.semantic.state.error.dark,
          usage: 'Error messages and destructive actions',
        },
        {
          name: 'Info',
          light: colors.semantic.state.info.light,
          dark: colors.semantic.state.info.dark,
          usage: 'Informational messages',
        },
      ],
    },
  ];

  // Component color examples
  const componentColors = [
    {
      component: 'Button',
      variants: [
        {
          name: 'Primary',
          classes:
            colors.component.button.primary.base + ' ' + colors.component.button.primary.dark,
          usage: 'Main actions',
        },
        {
          name: 'Secondary',
          classes:
            colors.component.button.secondary.base + ' ' + colors.component.button.secondary.dark,
          usage: 'Alternative actions',
        },
        {
          name: 'Destructive',
          classes:
            colors.component.button.destructive.base +
            ' ' +
            colors.component.button.destructive.dark,
          usage: 'Dangerous actions',
        },
        {
          name: 'Success',
          classes:
            colors.component.button.success.base + ' ' + colors.component.button.success.dark,
          usage: 'Positive actions',
        },
      ],
    },
    {
      component: 'Badge',
      variants: [
        {
          name: 'Default',
          classes: colors.component.badge.default.base + ' ' + colors.component.badge.default.dark,
          usage: 'General labels',
        },
        {
          name: 'Primary',
          classes: colors.component.badge.primary.base + ' ' + colors.component.badge.primary.dark,
          usage: 'Important labels',
        },
        {
          name: 'Success',
          classes: colors.component.badge.success.base + ' ' + colors.component.badge.success.dark,
          usage: 'Success states',
        },
        {
          name: 'Warning',
          classes: colors.component.badge.warning.base + ' ' + colors.component.badge.warning.dark,
          usage: 'Warning states',
        },
        {
          name: 'Error',
          classes: colors.component.badge.error.base + ' ' + colors.component.badge.error.dark,
          usage: 'Error states',
        },
      ],
    },
    {
      component: 'Alert',
      variants: [
        {
          name: 'Info',
          classes: colors.component.alert.info.base + ' ' + colors.component.alert.info.dark,
          usage: 'Information messages',
        },
        {
          name: 'Success',
          classes: colors.component.alert.success.base + ' ' + colors.component.alert.success.dark,
          usage: 'Success messages',
        },
        {
          name: 'Warning',
          classes: colors.component.alert.warning.base + ' ' + colors.component.alert.warning.dark,
          usage: 'Warning messages',
        },
        {
          name: 'Error',
          classes: colors.component.alert.error.base + ' ' + colors.component.alert.error.dark,
          usage: 'Error messages',
        },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title={`Colors - Design System - Internal - ${emailDomain}`}
        description="Complete color palette and variations showcase for the design system"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Navigation Links */}
          <div className="flex justify-end mb-8">
            <LocalizedLink
              to="/design/text"
              className="flex items-center text-primary hover:text-primary/80"
            >
              View Typography
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </LocalizedLink>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-destructive/10 px-4 py-2 rounded-full mb-6">
              <SwatchIcon className="h-5 w-5 text-destructive mr-2" />
              <span className="text-destructive font-semibold">Color System</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>Color Palette & Usage</h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}>
              Complete color system used throughout the {appName} application with usage examples
              and code samples. Click any color to copy its hex value to clipboard.
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()}`}>
                  Quick Start - Common Usage Examples
                </h2>
              </div>

              <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
                Ready-to-use code examples for the most common design patterns. Copy and paste
                directly into your components.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Primary Button Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>Primary Button</h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(primaryBtnSnippet)}
                    >
                      {copiedValue === primaryBtnSnippet ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {primaryBtnSnippet}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <button className={variants.button.primary.default()}>Primary Action</button>
                  </div>
                </div>

                {/* Success Alert Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>Success Alert</h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(successAlertSnippet)}
                    >
                      {copiedValue === successAlertSnippet ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {successAlertSnippet}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className={(variants.alert as any).success()}>
                      <div className="flex items-center">
                        <CheckIcon className="h-5 w-5 mr-3" />
                        <span className="font-medium">Success!</span>
                      </div>
                      <p className="mt-1 text-sm">Your action was completed successfully.</p>
                    </div>
                  </div>
                </div>

                {/* Web3 Badge Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>Blockchain Badge</h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(ethBadgeSnippet)}
                    >
                      {copiedValue === ethBadgeSnippet ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">{ethBadgeSnippet}</pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <span className={variants.badge.ethereum()}>Ethereum</span>
                  </div>
                </div>

                {/* Form Input Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>Form Input</h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() => copyToClipboard(inputSnippet)}
                    >
                      {copiedValue === inputSnippet ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">{inputSnippet}</pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <input className={variants.input.default()} placeholder="Enter your email..." />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Raw Color Palettes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Color Palettes</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Base color palettes organized by hue. Each palette includes shades from 50 (lightest)
              to 950 (darkest).
            </p>

            <div className="space-y-12">
              {colorPalettes.map(palette => (
                <div key={palette.name}>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>{palette.name}</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground mb-6`}>
                    {palette.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
                    {Object.entries(palette.colors).map(([shade, value]) => (
                      <ColorSwatch
                        key={shade}
                        name={shade}
                        value={value as string}
                        copiedValue={copiedValue}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Web3 Colors */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Web3 Network Colors</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Colors representing different blockchain networks and Web3 elements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {web3Colors.map(item => (
                <div key={item.name} className="text-center">
                  <ColorSwatch
                    name={item.name}
                    value={item.color}
                    className="mb-2"
                    copiedValue={copiedValue}
                    onCopy={copyToClipboard}
                  />
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>{item.usage}</p>
                </div>
              ))}
            </div>

            <CodeExample
              title="Web3 Color Usage"
              description="How to use Web3 network colors in components"
              copiedValue={copiedValue}
              onCopy={copyToClipboard}
              code={`import { colors } from '@/design-system';

// Access Web3 colors
const ethereumColor = colors.raw.web3.ethereum.DEFAULT; // "${colors.raw.web3.ethereum.DEFAULT}"
const solanaColor = colors.raw.web3.solana.DEFAULT;     // "${colors.raw.web3.solana.DEFAULT}"
const polygonColor = colors.raw.web3.polygon.DEFAULT;   // "${colors.raw.web3.polygon.DEFAULT}"

// Network brand hues (reference data)
className="text-blue-500" // Ethereum blue
className="text-purple-500" // Solana purple
className="text-purple-600" // Polygon purple`}
              preview={
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Ethereum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span>Solana</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                    <span>Polygon</span>
                  </div>
                </div>
              }
            />
          </Section>

          {/* Semantic Colors */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Semantic Colors</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Semantic color tokens that adapt to light and dark themes. These provide consistent
              meaning across the interface.
            </p>

            <div className="space-y-12">
              {semanticColors.map(category => (
                <div key={category.category}>
                  <h3 className={`${textVariants.heading.h3()} mb-6`}>{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {category.colors.map(color => (
                      <div key={color.name} className="space-y-4">
                        <h4 className={`${textVariants.heading.h4()}`}>{color.name}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">
                              Light Mode
                            </div>
                            <ColorSwatch
                              name="Light"
                              value={color.light}
                              showName={false}
                              copiedValue={copiedValue}
                              onCopy={copyToClipboard}
                            />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2">
                              Dark Mode
                            </div>
                            <ColorSwatch
                              name="Dark"
                              value={color.dark}
                              showName={false}
                              copiedValue={copiedValue}
                              onCopy={copyToClipboard}
                            />
                          </div>
                        </div>
                        <p className={`${textVariants.body.xs()} text-muted-foreground`}>
                          {color.usage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <CodeExample
                title="Semantic Colors Usage"
                description="How to use semantic colors from the design system"
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { colors } from '@/design-system';

// Access semantic colors
const textPrimary = colors.semantic.text.primary.light; // Light mode
const textPrimaryDark = colors.semantic.text.primary.dark; // Dark mode

// Background colors
const bgPrimary = colors.semantic.background.primary.light;
const bgSecondary = colors.semantic.background.secondary.light;

// State colors
const successColor = colors.semantic.state.success.light;
const errorColor = colors.semantic.state.error.light;

// Prefer semantic Tailwind tokens in markup
<div className="bg-card text-foreground">
  Content with semantic colors
</div>`}
                preview={
                  <div className="p-4 bg-card text-foreground rounded border">
                    <div className="text-success mb-2">✓ Success message</div>
                    <div className="text-destructive mb-2">✗ Error message</div>
                    <div className="text-warning">⚠ Warning message</div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Component Colors */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Component Colors & Usage Examples
            </h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Pre-configured color combinations for common UI components with built-in hover, focus,
              and theme support.
            </p>

            <div className="space-y-12">
              {componentColors.map(component => (
                <div key={component.component}>
                  <h3 className={`${textVariants.heading.h3()} mb-6`}>
                    {component.component} Examples
                  </h3>

                  {/* Live Examples */}
                  <div className="mb-8 p-6 bg-muted rounded-lg">
                    <h4 className={`${textVariants.heading.h4()} mb-4`}>Live Examples</h4>
                    <div className="flex flex-wrap gap-4">
                      {component.variants.map(variant => (
                        <div key={variant.name} className="space-y-2">
                          {component.component === 'Button' && (
                            <>
                              <button
                                className={`${variant.classes} px-4 py-2 rounded-lg font-medium transition-colors hover:scale-105`}
                              >
                                {variant.name}
                              </button>
                              <div className={`${textVariants.caption.default()} text-center`}>
                                {variant.name}
                              </div>
                            </>
                          )}
                          {component.component === 'Badge' && (
                            <>
                              <div>
                                <span
                                  className={`${variant.classes} px-2.5 py-0.5 rounded-full text-xs font-medium`}
                                >
                                  {variant.name}
                                </span>
                              </div>
                              <div className={`${textVariants.caption.default()}`}>
                                {variant.name}
                              </div>
                            </>
                          )}
                          {component.component === 'Alert' && (
                            <>
                              <div
                                className={`${variant.classes} p-3 rounded-lg border text-sm max-w-xs`}
                              >
                                {variant.name} message
                              </div>
                              <div className={`${textVariants.caption.default()}`}>
                                {variant.name}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Examples with Practical Usage */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CodeExample
                      title={`How to Create ${component.component}s`}
                      description={`Step-by-step guide to create ${component.component.toLowerCase()}s with proper colors`}
                      copiedValue={copiedValue}
                      onCopy={copyToClipboard}
                      code={
                        component.component === 'Button'
                          ? `import { variants } from '@sudobility/design';

// Primary
<button className={variants.button.primary.default()}>
  Primary Action
</button>

// Secondary
<button className={variants.button.secondary.default()}>
  Secondary Action
</button>

// Destructive
<button className={variants.button.destructive.default()}>
  Delete Item
</button>`
                          : component.component === 'Badge'
                            ? `import { variants } from '@sudobility/design';

<span className={variants.badge.primary()}>Primary</span>
<span className={variants.badge.success()}>Success</span>
<span className={variants.badge.error()}>Error</span>

// Custom accent badge (semantic tokens)
<span className="bg-accent/10 text-accent px-2.5 py-0.5 rounded-full text-xs font-medium">
  Custom
</span>`
                            : `import { variants } from '@sudobility/design';

<div className={variants.alert.info()}>
  <strong>Info:</strong> This is an information alert
</div>

<div className={variants.alert.success()}>
  <strong>Success:</strong> Operation completed successfully
</div>

<div className={variants.alert.error()}>
  <strong>Error:</strong> Something went wrong
</div>`
                      }
                      preview={
                        component.component === 'Button' ? (
                          <div className="space-y-3">
                            <button className={variants.button.primary.default()}>
                              Primary Action
                            </button>
                            <button className={variants.button.secondary.default()}>
                              Secondary Action
                            </button>
                            <button className={variants.button.destructive.default()}>
                              Delete Item
                            </button>
                          </div>
                        ) : component.component === 'Badge' ? (
                          <div className="flex flex-wrap gap-2">
                            <span className={variants.badge.primary()}>Primary</span>
                            <span className={variants.badge.success()}>Success</span>
                            <span className={variants.badge.error()}>Error</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className={(variants.alert as any).info()}>
                              <strong>Info:</strong> This is an information alert
                            </div>
                            <div className={(variants.alert as any).success()}>
                              <strong>Success:</strong> Operation completed successfully
                            </div>
                            <div className={(variants.alert as any).error()}>
                              <strong>Error:</strong> Something went wrong
                            </div>
                          </div>
                        )
                      }
                    />

                    <CodeExample
                      title={`${component.component} Variants & States`}
                      description={`All ${component.component.toLowerCase()} color variants with hover and focus states`}
                      copiedValue={copiedValue}
                      onCopy={copyToClipboard}
                      code={
                        component.component === 'Button'
                          ? `import { variants } from '@sudobility/design';

// All button variants
<button className={variants.button.primary.default()}>Primary</button>
<button className={variants.button.secondary.default()}>Secondary</button>

// Success has no variant → use semantic tokens
<button className="bg-success text-success-foreground hover:bg-success/90 px-4 py-2 rounded-lg font-medium">
  Success
</button>

<button className={variants.button.outline.default()}>Outline</button>
<button className={variants.button.primary.default()} disabled>Disabled</button>`
                          : component.component === 'Badge'
                            ? `import { variants } from '@sudobility/design';

// Map status → semantic badge variant
const badge = {
  active: variants.badge.success(),
  pending: variants.badge.warning(),
  inactive: variants.badge.default(),
  error: variants.badge.error(),
};

<span className={badge.active}>Active</span>
<span className={badge.pending}>Pending</span>
<span className={badge.error}>Error</span>`
                            : `import { variants } from '@sudobility/design';

// Map type → semantic alert variant
const alert = {
  info: variants.alert.info(),
  success: variants.alert.success(),
  warning: variants.alert.warning(),
  error: variants.alert.error(),
};

<div className={alert.success}>
  Your changes have been saved successfully.
</div>

<div className={alert.error}>
  Please fix the following errors before continuing.
</div>`
                      }
                      preview={
                        <div className="space-y-4">
                          <div className={`${textVariants.body.sm()} font-medium mb-2`}>
                            Interactive {component.component} Examples:
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {component.variants.slice(0, 3).map(variant => (
                              <div key={variant.name}>
                                {component.component === 'Button' && (
                                  <button
                                    className={`${variant.classes} px-3 py-1.5 rounded text-sm font-medium transition-all hover:scale-105`}
                                  >
                                    {variant.name}
                                  </button>
                                )}
                                {component.component === 'Badge' && (
                                  <span
                                    className={`${variant.classes} px-2 py-0.5 rounded-full text-xs font-medium`}
                                  >
                                    {variant.name}
                                  </span>
                                )}
                                {component.component === 'Alert' && (
                                  <div
                                    className={`${variant.classes} p-2 rounded text-xs border max-w-32`}
                                  >
                                    {variant.name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Practical Usage Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Practical Usage Examples</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Real-world examples showing how to combine colors for common UI patterns.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Form with Color-Coded States"
                description="How to use colors for form validation and states"
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`const FormExample = () => {
  return (
    <form className="space-y-4">
      {/* Success state */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Email (Valid)
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-success rounded-lg focus:outline-none focus:ring-2 focus:ring-success bg-background"
          value="user@example.com"
        />
        <p className="mt-1 text-sm text-success">
          ✓ Email is valid
        </p>
      </div>

      {/* Error state */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Password (Error)
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-destructive rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive bg-background"
        />
        <p className="mt-1 text-sm text-destructive">
          ✗ Password must be at least 8 characters
        </p>
      </div>

      {/* Primary action button */}
      <button className={variants.button.primary.fullWidth()}>
        Submit Form
      </button>
    </form>
  );
};`}
                preview={
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Email (Valid)
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-success rounded-lg focus:outline-none focus:ring-2 focus:ring-success bg-background text-sm"
                        defaultValue="user@example.com"
                        readOnly
                      />
                      <p className="mt-1 text-sm text-success">✓ Email is valid</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Password (Error)
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-destructive rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive bg-background text-sm"
                        defaultValue="123"
                        readOnly
                      />
                      <p className="mt-1 text-sm text-destructive">
                        ✗ Password must be at least 8 characters
                      </p>
                    </div>

                    <button type="button" className={variants.button.primary.fullWidth()}>
                      Submit Form
                    </button>
                  </form>
                }
              />

              <CodeExample
                title="Card with Status Colors"
                description="How to use colors in card components with different states"
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`const StatusCard = ({ status, title, description }) => {
  const statusConfig = {
    online: {
      border: "border-success/30",
      bg: "bg-success/10",
      badge: "bg-success/10 text-success",
      indicator: "bg-success"
    },
    offline: {
      border: "border-destructive/30",
      bg: "bg-destructive/10",
      badge: "bg-destructive/10 text-destructive",
      indicator: "bg-destructive"
    },
    maintenance: {
      border: "border-warning/30",
      bg: "bg-warning/10",
      badge: "bg-warning/10 text-warning",
      indicator: "bg-warning"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={\`\${config.bg} \${config.border} border rounded-lg p-4\`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-foreground">
          {title}
        </h3>
        <span className={\`\${config.badge} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1\`}>
          <div className={\`w-2 h-2 rounded-full \${config.indicator}\`}></div>
          {status}
        </span>
      </div>
      <p className="text-muted-foreground text-sm">
        {description}
      </p>
    </div>
  );
};

// Usage
<StatusCard
  status="online"
  title="API Server"
  description="All systems operational"
/>`}
                preview={
                  <div className="space-y-3">
                    <div className="bg-success/10 border-success/30 border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground text-sm">API Server</h3>
                        <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          online
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs">All systems operational</p>
                    </div>

                    <div className="bg-warning/10 border-warning/30 border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground text-sm">Database</h3>
                        <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-warning"></div>
                          maintenance
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Scheduled maintenance in progress
                      </p>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title="Navigation with Color States"
                description="How to use colors for navigation states and active items"
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`const Navigation = ({ activeItem }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="bg-card border-r border-border w-64 p-4">
      <div className="space-y-1">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={
              activeItem === item.id
                ? "bg-primary/10 text-primary border-r-2 border-primary flex items-center px-3 py-2 rounded-l-lg font-medium transition-colors"
                : "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center px-3 py-2 rounded-lg transition-colors"
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

// Usage
<Navigation activeItem="dashboard" />`}
                preview={
                  <nav className="bg-card border border-border rounded-lg p-3 w-full max-w-xs">
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="bg-primary/10 text-primary border-r-2 border-primary flex items-center px-3 py-2 rounded-l-lg font-medium text-sm"
                      >
                        <span className="mr-2">📊</span>
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <span className="mr-2">👥</span>
                        Users
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <span className="mr-2">⚙️</span>
                        Settings
                      </a>
                    </div>
                  </nav>
                }
              />

              <CodeExample
                title="Progress Indicators with Colors"
                description="How to use colors for progress bars and loading states"
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`const ProgressBar = ({ value, max = 100, status = 'normal' }) => {
  const statusConfig = {
    normal: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-destructive"
  };

  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">
          Progress
        </span>
        <span className="text-sm text-muted-foreground">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={\`\${statusConfig[status]} h-2 rounded-full transition-all duration-300\`}
          style={{ width: \`\${percentage}%\` }}
        ></div>
      </div>
      <div className={\`text-xs \${
        status === 'success' ? 'text-success' :
        status === 'warning' ? 'text-warning' :
        status === 'error' ? 'text-destructive' :
        'text-primary'
      }\`}>
        {percentage.toFixed(0)}% Complete
      </div>
    </div>
  );
};

// Usage examples
<ProgressBar value={75} status="normal" />
<ProgressBar value={100} status="success" />
<ProgressBar value={25} status="error" />`}
                preview={
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">75/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-300"></div>
                      </div>
                      <div className="text-xs text-primary">75% Complete</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Success</span>
                        <span className="text-sm text-muted-foreground">100/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full w-full transition-all duration-300"></div>
                      </div>
                      <div className="text-xs text-success">100% Complete</div>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Usage Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Usage Guidelines</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3 className={`${textVariants.heading.h4()} mb-4 text-success`}>✓ Do</h3>
                <ul className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}>
                  <li>• Use semantic colors for consistent meaning</li>
                  <li>• Prefer component colors for UI elements</li>
                  <li>• Test colors in both light and dark modes</li>
                  <li>• Ensure sufficient contrast for accessibility</li>
                  <li>• Use the color utility functions for consistency</li>
                </ul>
              </div>

              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3 className={`${textVariants.heading.h4()} mb-4 text-destructive`}>✗ Don't</h3>
                <ul className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}>
                  <li>• Use raw hex values directly in components</li>
                  <li>• Mix different color systems</li>
                  <li>• Create custom colors without design approval</li>
                  <li>• Use colors that don't work in dark mode</li>
                  <li>• Ignore accessibility contrast requirements</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Copy Instructions */}
          <div className={`${ui.background.muted} rounded-lg p-6 text-center`}>
            <ClipboardDocumentIcon className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className={`${textVariants.heading.h5()} mb-2`}>Click to Copy Values</h3>
            <p className={`${textVariants.body.sm()} text-muted-foreground`}>
              Click on any color swatch to copy its hex value, or use the copy button on code
              examples to copy usage code
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorsPage;
