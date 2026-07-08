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
import { useTranslation } from "react-i18next";

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
}> = ({ title, description, code, preview, copiedValue, copyToClipboard }) => {
  const { t } = useTranslation("buttons");
  return (
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
              {t("codeExample.preview")}
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
              {t("codeExample.usage")}
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
};

const ButtonsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("buttons");
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
        title={t("seo.title", { emailDomain })}
        description={t("seo.description")}
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
                {t("header.badge")}
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              {t("header.title")}
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}
            >
              {t("header.intro")}
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-accent/10 rounded-xl p-8 border border-accent/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()}`}>
                  {t("quickStart.title")}
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-8`}
              >
                {t("quickStart.description")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Primary Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("quickStart.primary.title")}
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
                      {t("quickStart.primary.button")}
                    </button>
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("quickStart.secondary.title")}
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
                      {t("quickStart.secondary.button")}
                    </button>
                  </div>
                </div>

                {/* Outline Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("quickStart.outline.title")}
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
                      {t("quickStart.outline.button")}
                    </button>
                  </div>
                </div>

                {/* Ghost Button */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} mb-3`}>
                    {t("quickStart.ghost.title")}
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
                      {t("quickStart.ghost.button")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Button Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("variants.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("variants.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("variants.colors.title")}
                copiedValue={copiedValue}
                copyToClipboard={copyToClipboard}
                description={t("variants.colors.description")}
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
                      {t("variants.colors.primary")}
                    </button>
                    <button className="bg-success text-success-foreground hover:bg-success/90 px-4 py-2 rounded-lg font-medium transition-colors">
                      {t("variants.colors.success")}
                    </button>
                    <button className="bg-warning text-warning-foreground hover:bg-warning/90 px-4 py-2 rounded-lg font-medium transition-colors">
                      {t("variants.colors.warning")}
                    </button>
                    <button className={variants.button.destructive.default()}>
                      {t("variants.colors.destructive")}
                    </button>
                  </div>
                }
              />

              <CodeExample
                title={t("variants.sizes.title")}
                description={t("variants.sizes.description")}
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
                      {t("variants.sizes.small")}
                    </button>
                    <button className={variants.button.primary.default()}>
                      {t("variants.sizes.default")}
                    </button>
                    <button className={variants.button.primary.large()}>
                      {t("variants.sizes.large")}
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Button States */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("states.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("states.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("states.interactive.title")}
                description={t("states.interactive.description")}
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
                      {t("states.interactive.button")}
                    </button>
                    <button className={variants.button.secondary.default()}>
                      {t("states.interactive.secondary")}
                    </button>
                  </div>
                }
              />

              <CodeExample
                title={t("states.loading.title")}
                description={t("states.loading.description")}
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
                      <span>
                        {loading
                          ? t("states.loading.loadingLabel")
                          : t("states.loading.demoLabel")}
                      </span>
                    </button>
                    <button
                      disabled
                      className={variants.button.primary.default()}
                    >
                      {t("states.loading.disabled")}
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Icon Buttons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("icons.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("icons.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("icons.withIcons.title")}
                description={t("icons.withIcons.description")}
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
                      <span>{t("icons.withIcons.sendMessage")}</span>
                    </button>
                    <button className="bg-success text-success-foreground hover:bg-success/90 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                      <span>{t("icons.withIcons.download")}</span>
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button
                      className={variants.button.ghost.icon()}
                      title={t("icons.withIcons.settingsTitle")}
                    >
                      <CogIcon className="h-5 w-5" />
                    </button>
                  </div>
                }
              />

              <CodeExample
                title={t("icons.toggle.title")}
                description={t("icons.toggle.description")}
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
                      <span>
                        {liked
                          ? t("icons.toggle.liked")
                          : t("icons.toggle.like")}
                      </span>
                    </button>
                    <button
                      className={`${variants.button.destructive.default()} flex items-center space-x-2`}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>{t("icons.toggle.delete")}</span>
                    </button>
                    <button
                      className={`${variants.button.secondary.default()} flex items-center space-x-2`}
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>{t("icons.toggle.edit")}</span>
                    </button>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Button Groups */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("groups.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("groups.description")}
            </p>

            <div className="grid grid-cols-1 gap-8">
              <CodeExample
                title={t("groups.buttonGroups.title")}
                description={t("groups.buttonGroups.description")}
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
                        {t("groups.buttonGroups.connectedLabel")}
                      </p>
                      <div
                        className="inline-flex rounded-lg shadow-sm"
                        role="group"
                      >
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-ring">
                          {t("groups.buttonGroups.previous")}
                        </button>
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border-t border-b border-border focus:outline-none focus:ring-2 focus:ring-ring">
                          {t("groups.buttonGroups.current")}
                        </button>
                        <button className="bg-card hover:bg-accent text-foreground px-4 py-2 text-sm font-medium border border-border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-ring">
                          {t("groups.buttonGroups.next")}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t("groups.buttonGroups.spacedLabel")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button className={variants.button.primary.default()}>
                          {t("groups.buttonGroups.primary")}
                        </button>
                        <button className={variants.button.secondary.default()}>
                          {t("groups.buttonGroups.secondary")}
                        </button>
                        <button className={variants.button.ghost.default()}>
                          {t("groups.buttonGroups.cancel")}
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title={t("groups.actionBars.title")}
                description={t("groups.actionBars.description")}
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
                          <span>{t("groups.actionBars.new")}</span>
                        </button>
                        <div className="h-4 w-px bg-border"></div>
                        <button
                          className={variants.button.ghost.icon()}
                          title={t("groups.actionBars.editTitle")}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className={variants.button.ghost.icon()}
                          title={t("groups.actionBars.shareTitle")}
                        >
                          <ShareIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className={variants.button.secondary.small()}>
                          {t("groups.actionBars.cancel")}
                        </button>
                        <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center space-x-1">
                          <TrashIcon className="h-4 w-4" />
                          <span>{t("groups.actionBars.delete")}</span>
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
              {t("accessibility.title")}
            </h2>
            <div className="bg-info/10 rounded-xl p-6 border border-info/20">
              <h3 className={`${textVariants.heading.h4()} mb-4`}>
                {t("accessibility.guidelinesTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      {t("accessibility.list.semanticBefore")}{" "}
                      <code className="bg-info/10 text-info px-1 rounded">
                        button
                      </code>{" "}
                      {t("accessibility.list.semanticAfter")}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.contrast")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.focus")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.loadingStates")}</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.ariaLabels")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.touchTarget")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.feedback")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{t("accessibility.list.grouping")}</span>
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
