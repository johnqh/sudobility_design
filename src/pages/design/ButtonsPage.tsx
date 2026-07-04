import { Section } from "@sudobility/components";

import React, { useState } from "react";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
  PaperAirplaneIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  ShareIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, variants } from "@sudobility/design";

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
        <p className={`${textVariants.body.sm()} text-muted-foreground`}>
          {description}
        </p>
      )}
    </div>

    {preview && (
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-destructive rounded-full"></div>
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className={`${textVariants.caption.default()} ml-2`}>
            Preview
          </span>
        </div>
        <div className="bg-card rounded border p-6 flex flex-wrap items-center gap-3">
          {preview}
        </div>
      </div>
    )}

    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CodeBracketIcon className="h-4 w-4 text-muted-foreground" />
          <span
            className={`${textVariants.caption.default()} text-muted-foreground`}
          >
            Usage
          </span>
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

const ButtonsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const primaryQuickStart = `import { variants } from '@sudobility/design';

// Primary
<button className={variants.button.primary.default()}>
  Primary Action
</button>
// → bg-primary text-primary-foreground hover:bg-primary/90
//   focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50`;

  const secondaryQuickStart = `import { variants } from '@sudobility/design';

// Secondary
<button className={variants.button.secondary.default()}>
  Secondary Action
</button>
// → bg-secondary text-secondary-foreground hover:bg-secondary/80
//   focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50`;

  const outlineQuickStart = `import { variants } from '@sudobility/design';

// Outline
<button className={variants.button.outline.default()}>
  Outline Action
</button>
// → border border-input bg-background hover:bg-accent
//   hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring`;

  const ghostQuickStart = `import { variants } from '@sudobility/design';

// Ghost
<button className={variants.button.ghost.default()}>
  Ghost Action
</button>
// → hover:bg-accent hover:text-accent-foreground
//   focus-visible:ring-2 focus-visible:ring-ring`;

  return (
    <>
      <SEOHead
        title={`Buttons - Design System - Internal - ${emailDomain}`}
        description="Complete button component library with all variants, sizes, states, and interactions"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent px-4 py-2 rounded-full mb-6">
              <svg
                className="h-5 w-5 text-accent-foreground mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span className="text-accent-foreground font-semibold">
                Button Components
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Button Library & Interaction Patterns
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}
            >
              Comprehensive button component system with consistent variants,
              sizes, states, and interactive behaviors. All buttons support
              loading states, proper focus management, and accessibility
              features.
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-accent/10 rounded-xl p-8 border border-accent/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()}`}>
                  Quick Start - Essential Button Patterns
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-8`}
              >
                Ready-to-use button components with consistent styling, states,
                and behavior patterns.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Primary Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    Primary Action Button
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() => copyToClipboard(primaryQuickStart)}
                    >
                      {copiedValue === primaryQuickStart ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {primaryQuickStart}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <button className={variants.button.primary.default()}>
                      Primary Action
                    </button>
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    Secondary Button
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() => copyToClipboard(secondaryQuickStart)}
                    >
                      {copiedValue === secondaryQuickStart ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {secondaryQuickStart}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <button className={variants.button.secondary.default()}>
                      Secondary Action
                    </button>
                  </div>
                </div>

                {/* Outline Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    Outline Button
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() => copyToClipboard(outlineQuickStart)}
                    >
                      {copiedValue === outlineQuickStart ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {outlineQuickStart}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <button className={variants.button.outline.default()}>
                      Outline Action
                    </button>
                  </div>
                </div>

                {/* Ghost Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    Ghost Button
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() => copyToClipboard(ghostQuickStart)}
                    >
                      {copiedValue === ghostQuickStart ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {ghostQuickStart}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <button className={variants.button.ghost.default()}>
                      Ghost Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Button Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Button Variants
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              Different button styles for various use cases and hierarchy
              levels.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Color Variants"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                description="Primary, secondary, success, warning, and destructive button colors"
                code={`import { variants } from '@sudobility/design';

// Primary
<button className={variants.button.primary.default()}>Primary</button>
// → bg-primary text-primary-foreground hover:bg-primary/90

// Success (no variant — use semantic classes)
<button className="bg-success text-success-foreground hover:bg-success/90
                   px-4 py-2 rounded-lg font-medium">Success</button>

// Warning (no variant — use semantic classes)
<button className="bg-warning text-warning-foreground hover:bg-warning/90
                   px-4 py-2 rounded-lg font-medium">Warning</button>

// Destructive
<button className={variants.button.destructive.default()}>Destructive</button>
// → bg-destructive text-destructive-foreground hover:bg-destructive/90`}
                preview={
                  <div className="flex flex-wrap gap-3">
                    <button className={variants.button.primary.default()}>
                      Primary
                    </button>
                    <button className="bg-success text-success-foreground hover:bg-success/90 px-4 py-2 rounded-lg font-medium transition-colors">
                      Success
                    </button>
                    <button className="bg-warning text-warning-foreground hover:bg-warning/90 px-4 py-2 rounded-lg font-medium transition-colors">
                      Warning
                    </button>
                    <button className={variants.button.destructive.default()}>
                      Destructive
                    </button>
                  </div>
                }
              />

              <CodeExample
                title="Button Sizes"
                description="Small, default, and large button sizes for different contexts"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Small
<button className={variants.button.primary.small()}>Small</button>

// Default
<button className={variants.button.primary.default()}>Default</button>

// Large
<button className={variants.button.primary.large()}>Large</button>
// → each resolves to bg-primary text-primary-foreground at the matching size`}
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <button className={variants.button.primary.small()}>
                      Small
                    </button>
                    <button className={variants.button.primary.default()}>
                      Default
                    </button>
                    <button className={variants.button.primary.large()}>
                      Large
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Button States */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Button States
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              Interactive states including hover, active, focus, loading, and
              disabled.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Interactive States"
                description="Normal, hover, active, and focus states with proper transitions"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Interactive (hover / active / focus built in)
<button className={variants.button.primary.default()}>Interactive Button</button>
// → bg-primary text-primary-foreground hover:bg-primary/90
//   focus-visible:ring-2 focus-visible:ring-ring

// Secondary interactive
<button className={variants.button.secondary.default()}>Secondary Interactive</button>`}
                preview={
                  <div className="flex flex-wrap gap-3">
                    <button className={variants.button.primary.default()}>
                      Interactive Button
                    </button>
                    <button className={variants.button.secondary.default()}>
                      Secondary Interactive
                    </button>
                  </div>
                }
              />

              <CodeExample
                title="Loading & Disabled States"
                description="Loading spinner integration and proper disabled styling"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { useState } from 'react';
import { variants } from '@sudobility/design';

// Loading state with spinner
const [loading, setLoading] = useState(false);

<button
  disabled={loading}
  className={variants.button.primary.default() + ' flex items-center space-x-2'}
>
  {loading && <Spinner className="animate-spin h-4 w-4 text-primary-foreground" />}
  <span>{loading ? 'Loading...' : 'Submit'}</span>
</button>

// Disabled state (variant handles disabled:opacity-50)
<button disabled className={variants.button.primary.default()}>Disabled</button>`}
                preview={
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleLoadingDemo}
                      disabled={loading}
                      className={`${variants.button.primary.default()} flex items-center space-x-2`}
                    >
                      {loading && (
                        <svg
                          className="animate-spin h-4 w-4 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="opacity-25"
                          />
                          <path
                            fill="currentColor"
                            className="opacity-75"
                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      <span>{loading ? "Loading..." : "Demo Loading"}</span>
                    </button>
                    <button
                      disabled
                      className={variants.button.primary.default()}
                    >
                      Disabled
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Icon Buttons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Icon Buttons & Combinations
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              Buttons with icons, icon-only buttons, and toggle buttons for
              enhanced usability.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title="Buttons with Icons"
                description="Text buttons enhanced with icons for better recognition"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Icon + text (leading)
<button className={variants.button.primary.withIcon()}>
  <PaperAirplaneIcon className="h-4 w-4" />
  <span>Send Message</span>
</button>
// → bg-primary text-primary-foreground inline-flex items-center gap-2

// Success + icon (trailing) — no variant, use semantic classes
<button className="bg-success text-success-foreground hover:bg-success/90
                   px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
  <span>Download</span>
  <ArrowDownTrayIcon className="h-4 w-4" />
</button>

// Icon only
<button className={variants.button.ghost.icon()} title="Settings">
  <CogIcon className="h-5 w-5" />
</button>`}
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <button className={variants.button.primary.withIcon()}>
                      <PaperAirplaneIcon className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                    <button className="bg-success text-success-foreground hover:bg-success/90 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                      <span>Download</span>
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button
                      className={variants.button.ghost.icon()}
                      title="Settings"
                    >
                      <CogIcon className="h-5 w-5" />
                    </button>
                  </div>
                }
              />

              <CodeExample
                title="Toggle & Action Buttons"
                description="Toggle buttons and specific action button patterns"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { useState } from 'react';
import { variants } from '@sudobility/design';

// Toggle button (like)
const [liked, setLiked] = useState(false);

<button
  onClick={() => setLiked(!liked)}
  className={variants.button.destructive.outline() +
    ' flex items-center space-x-2 ' + (liked ? 'bg-destructive/10' : '')}
>
  {liked ? <HeartIconSolid className="h-4 w-4" /> : <HeartIcon className="h-4 w-4" />}
  <span>{liked ? 'Liked' : 'Like'}</span>
</button>
// → destructive.outline: border border-destructive text-destructive hover:bg-destructive/10

// Destructive action
<button className={variants.button.destructive.default()}>
  <TrashIcon className="h-4 w-4" />
  <span>Delete</span>
</button>`}
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`${variants.button.destructive.outline()} flex items-center space-x-2 ${liked ? "bg-destructive/10" : ""}`}
                    >
                      {liked ? (
                        <HeartIconSolid className="h-4 w-4" />
                      ) : (
                        <HeartIcon className="h-4 w-4" />
                      )}
                      <span>{liked ? "Liked" : "Like"}</span>
                    </button>
                    <button
                      className={`${variants.button.destructive.default()} flex items-center space-x-2`}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                    <button
                      className={`${variants.button.secondary.default()} flex items-center space-x-2`}
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Button Groups */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Button Groups & Combinations
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              Grouped buttons, button bars, and action combinations for complex
              interfaces.
            </p>

            <div className="grid grid-cols-1 gap-8">
              <CodeExample
                title="Button Groups"
                description="Connected button groups for related actions"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Connected button group (semantic tokens keep the shared borders)
<div className="inline-flex rounded-lg shadow-sm" role="group">
  <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm
                     font-medium border border-border rounded-l-lg
                     focus:outline-none focus:ring-2 focus:ring-ring">Previous</button>
  <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm
                     font-medium border-t border-b border-border
                     focus:outline-none focus:ring-2 focus:ring-ring">Current</button>
  <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm
                     font-medium border border-border rounded-r-lg
                     focus:outline-none focus:ring-2 focus:ring-ring">Next</button>
</div>

// Spaced button group (variants)
<div className="flex flex-wrap gap-2">
  <button className={variants.button.primary.default()}>Primary</button>
  <button className={variants.button.secondary.default()}>Secondary</button>
  <button className={variants.button.ghost.default()}>Cancel</button>
</div>`}
                preview={
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Connected Group:
                      </p>
                      <div
                        className="inline-flex rounded-lg shadow-sm"
                        role="group"
                      >
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-ring">
                          Previous
                        </button>
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border-t border-b border-border focus:outline-none focus:ring-2 focus:ring-ring">
                          Current
                        </button>
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border border-border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-ring">
                          Next
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Spaced Group:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button className={variants.button.primary.default()}>
                          Primary
                        </button>
                        <button className={variants.button.secondary.default()}>
                          Secondary
                        </button>
                        <button className={variants.button.ghost.default()}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title="Action Bars & Toolbars"
                description="Complex button combinations for toolbars and action areas"
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Action bar with mixed buttons
<div className="flex items-center justify-between bg-card px-4 py-3 border-b border-border">
  <div className="flex items-center space-x-2">
    <button className={variants.button.primary.small() + ' flex items-center space-x-1'}>
      <PlusIcon className="h-4 w-4" />
      <span>New</span>
    </button>
    <div className="h-4 w-px bg-border"></div>
    <button className={variants.button.ghost.icon()} title="Edit">
      <PencilIcon className="h-4 w-4" />
    </button>
    <button className={variants.button.ghost.icon()} title="Share">
      <ShareIcon className="h-4 w-4" />
    </button>
  </div>

  <div className="flex items-center space-x-2">
    <button className={variants.button.secondary.small()}>Cancel</button>
    <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90
                       px-3 py-1.5 text-sm rounded-lg font-medium
                       flex items-center space-x-1">
      <TrashIcon className="h-4 w-4" />
      <span>Delete</span>
    </button>
  </div>
</div>`}
                preview={
                  <div className="w-full">
                    <div className="flex items-center justify-between bg-card px-4 py-3 border-b border-border rounded-t-lg">
                      <div className="flex items-center space-x-2">
                        <button
                          className={`${variants.button.primary.small()} flex items-center space-x-1`}
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span>New</span>
                        </button>
                        <div className="h-4 w-px bg-border"></div>
                        <button
                          className={variants.button.ghost.icon()}
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className={variants.button.ghost.icon()}
                          title="Share"
                        >
                          <ShareIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className={variants.button.secondary.small()}>
                          Cancel
                        </button>
                        <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center space-x-1">
                          <TrashIcon className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Accessibility & Best Practices
            </h2>
            <div className="bg-info/10 rounded-xl p-6 border border-info/20">
              <h3 className={`${textVariants.heading.h4()} mb-4`}>
                Button Accessibility Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Use semantic{" "}
                      <code className="bg-info/10 text-info px-1 rounded">
                        button
                      </code>{" "}
                      elements instead of divs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Ensure sufficient color contrast (4.5:1 minimum)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Include focus states for keyboard navigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Add loading states to prevent double submissions
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Use appropriate ARIA labels for icon-only buttons
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Maintain minimum touch target size (44px x 44px)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide clear visual feedback for all states</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Group related buttons logically with proper spacing
                    </span>
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

export default ButtonsPage;
