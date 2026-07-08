import {
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Component definition moved outside to avoid creating components during render
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
}) => {
  const { t } = useTranslation("forms");
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
          <div className="bg-card rounded border p-3">{preview}</div>
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
};

const FormsPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const { t } = useTranslation("forms");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

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
            <div className="inline-flex items-center bg-success/10 px-4 py-2 rounded-full mb-6">
              <svg
                className="h-5 w-5 text-success mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-success font-semibold">
                {t("header.badge")}
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              {t("header.title")}
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}
            >
              {t("header.description")}
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-gradient-to-r from-success/10 to-info/10 rounded-xl p-8 border border-success/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-success mr-3" />
                <h2 className={`${textVariants.heading.h2()} text-success`}>
                  {t("quickStart.title")}
                </h2>
              </div>

              <p className={`${textVariants.body.md()} text-success mb-8`}>
                {t("quickStart.description")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Input */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-success mb-3`}
                  >
                    {t("quickStart.textInput.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() =>
                        copyToClipboard(`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Email Address</label>
  <input type="email" className={variants.input.default()} placeholder="Enter your email..." />
</div>`)
                      }
                    >
                      {copiedValue ===
                      `import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Email Address</label>
  <input type="email" className={variants.input.default()} placeholder="Enter your email..." />
</div>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>
    Email Address
  </label>
  <input
    type="email"
    className={variants.input.default()}
    placeholder="Enter your email..."
  />
</div>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="space-y-1">
                      <label
                        className={`${textVariants.label.default()} block`}
                      >
                        {t("quickStart.textInput.label")}
                      </label>
                      <input
                        type="email"
                        className={variants.input.default()}
                        placeholder={t("quickStart.textInput.placeholder")}
                      />
                    </div>
                  </div>
                </div>

                {/* Select Dropdown */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-success mb-3`}
                  >
                    {t("quickStart.select.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() =>
                        copyToClipboard(`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Blockchain Network</label>
  <select className={variants.input.default()}>
    <option value="">Select a network...</option>
    <option value="ethereum">Ethereum</option>
    <option value="polygon">Polygon</option>
    <option value="arbitrum">Arbitrum</option>
  </select>
</div>`)
                      }
                    >
                      {copiedValue ===
                      `import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Blockchain Network</label>
  <select className={variants.input.default()}>
    <option value="">Select a network...</option>
    <option value="ethereum">Ethereum</option>
    <option value="polygon">Polygon</option>
    <option value="arbitrum">Arbitrum</option>
  </select>
</div>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>
    Blockchain Network
  </label>
  <select className={variants.input.default()}>
    <option value="">Select a network...</option>
    <option value="ethereum">Ethereum</option>
    <option value="polygon">Polygon</option>
    <option value="arbitrum">Arbitrum</option>
  </select>
</div>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="space-y-1">
                      <label
                        className={`${textVariants.label.default()} block`}
                      >
                        {t("quickStart.select.label")}
                      </label>
                      <Select>
                        <SelectTrigger className={variants.input.default()}>
                          <SelectValue
                            placeholder={t("quickStart.select.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="polygon">Polygon</SelectItem>
                          <SelectItem value="arbitrum">Arbitrum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-success mb-3`}
                  >
                    {t("quickStart.checkbox.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() =>
                        copyToClipboard(`<label className="flex items-center space-x-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-primary bg-card border-input rounded
               focus:ring-ring focus:ring-2 transition-colors"
  />
  <span className="text-sm text-foreground">
    I agree to the Terms of Service and Privacy Policy
  </span>
</label>`)
                      }
                    >
                      {copiedValue ===
                      `<label className="flex items-center space-x-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-primary bg-card border-input rounded
               focus:ring-ring focus:ring-2 transition-colors"
  />
  <span className="text-sm text-foreground">
    I agree to the Terms of Service and Privacy Policy
  </span>
</label>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<label className="flex items-center space-x-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-primary bg-card border-input rounded
               focus:ring-ring focus:ring-2 transition-colors"
  />
  <span className="text-sm text-foreground">
    I agree to the Terms of Service and Privacy Policy
  </span>
</label>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary bg-card border-input rounded focus:ring-ring focus:ring-2 transition-colors"
                      />
                      <span className="text-sm text-foreground">
                        {t("quickStart.checkbox.agree")}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-success mb-3`}
                  >
                    {t("quickStart.textarea.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
                      onClick={() =>
                        copyToClipboard(`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Message</label>
  <textarea
    rows={4}
    className={\`\${variants.input.default()} resize-vertical\`}
    placeholder="Enter your message..."
  />
</div>`)
                      }
                    >
                      {copiedValue ===
                      `import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Message</label>
  <textarea
    rows={4}
    className={\`\${variants.input.default()} resize-vertical\`}
    placeholder="Enter your message..."
  />
</div>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>
    Message
  </label>
  <textarea
    rows={4}
    className={\`\${variants.input.default()} resize-vertical\`}
    placeholder="Enter your message..."
  />
</div>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="space-y-1">
                      <label
                        className={`${textVariants.label.default()} block`}
                      >
                        {t("quickStart.textarea.label")}
                      </label>
                      <textarea
                        rows={4}
                        className={`${variants.input.default()} resize-vertical`}
                        placeholder={t("quickStart.textarea.placeholder")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Input Types */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("inputTypes.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("inputTypes.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("inputTypes.textInputTypes.title")}
                description={t("inputTypes.textInputTypes.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// All input types share the themed input variant
<input type="text" className={variants.input.default()} placeholder="Text input" />
<input type="email" className={variants.input.default()} placeholder="email@example.com" />
<input type="password" className={variants.input.default()} placeholder="Password" />
<input type="number" className={variants.input.default()} placeholder="123" />
<input type="url" className={variants.input.default()} placeholder="https://example.com" />
<input type="search" className={variants.input.search()} placeholder="Search..." />
<input type="date" className={variants.input.default()} />

// variants.input.default() resolves to a theme-aware set of classes:
// → block w-full rounded-md border px-3 py-2 text-sm bg-* text-* focus:ring-2 ...`}
                preview={
                  <div className="space-y-4">
                    <input
                      type="text"
                      className={variants.input.default()}
                      placeholder={t(
                        "inputTypes.textInputTypes.textPlaceholder",
                      )}
                    />
                    <input
                      type="email"
                      className={variants.input.default()}
                      placeholder="email@example.com"
                    />
                    <input
                      type="password"
                      className={variants.input.default()}
                      placeholder={t(
                        "inputTypes.textInputTypes.passwordPlaceholder",
                      )}
                    />
                    <input
                      type="number"
                      className={variants.input.default()}
                      placeholder="123"
                    />
                  </div>
                }
              />

              <CodeExample
                title={t("inputTypes.sizes.title")}
                description={t("inputTypes.sizes.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { variants } from '@sudobility/design';

// Small Input (Height: 32px)
<input className={\`\${variants.input.small()} h-8\`} />

// Default Input (Height: 40px)
<input className={\`\${variants.input.default()} h-10\`} />

// Large Input (Height: 48px)
<input className={\`\${variants.input.large()} h-12\`} />`}
                preview={
                  <div className="space-y-4">
                    <input
                      className={`${variants.input.small()} h-8`}
                      placeholder={t("inputTypes.sizes.smallPlaceholder")}
                    />
                    <input
                      className={`${variants.input.default()} h-10`}
                      placeholder={t("inputTypes.sizes.defaultPlaceholder")}
                    />
                    <input
                      className={`${variants.input.large()} h-12`}
                      placeholder={t("inputTypes.sizes.largePlaceholder")}
                    />
                  </div>
                }
              />
            </div>
          </Section>

          {/* Validation States */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("validation.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("validation.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("validation.success.title")}
                description={t("validation.success.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Email Address</label>
  <input
    type="email"
    className="w-full rounded-md border border-success bg-card px-3 py-2 text-sm
               text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-success"
    value="user@example.com"
  />
  <p className="text-sm text-success flex items-center">
    <CheckIcon className="h-4 w-4 mr-1" />
    Valid email address
  </p>
</div>`}
                preview={
                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("validation.success.label")}
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-success bg-card px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-success"
                      value="user@example.com"
                      readOnly
                    />
                    <p className="text-sm text-success flex items-center">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      {t("validation.success.message")}
                    </p>
                  </div>
                }
              />

              <CodeExample
                title={t("validation.error.title")}
                description={t("validation.error.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { variants, textVariants } from '@sudobility/design';

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Password</label>
  <input type="password" className={variants.input.error()} value="123" />
  <p className="text-sm text-destructive flex items-center">
    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
    Password must be at least 8 characters
  </p>
</div>`}
                preview={
                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("validation.error.label")}
                    </label>
                    <input
                      type="password"
                      className={variants.input.error()}
                      value="123"
                      readOnly
                    />
                    <p className="text-sm text-destructive flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      {t("validation.error.message")}
                    </p>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Complex Form Components */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("advanced.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("advanced.description")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CodeExample
                title={t("advanced.passwordToggle.title")}
                description={t("advanced.passwordToggle.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { variants, textVariants } from '@sudobility/design';

const [showPassword, setShowPassword] = useState(false);

<div className="space-y-1">
  <label className={\`\${textVariants.label.default()} block\`}>Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      className={\`\${variants.input.default()} pr-10\`}
      placeholder="Enter password..."
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 flex items-center pr-3
                 text-muted-foreground hover:text-foreground"
    >
      {showPassword ? (
        <EyeSlashIcon className="h-4 w-4" />
      ) : (
        <EyeIcon className="h-4 w-4" />
      )}
    </button>
  </div>
</div>`}
                preview={
                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("advanced.passwordToggle.label")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${variants.input.default()} pr-10`}
                        placeholder={t("advanced.passwordToggle.placeholder")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                }
              />

              <CodeExample
                title={t("advanced.radio.title")}
                description={t("advanced.radio.description")}
                copiedValue={copiedValue}
                onCopy={copyToClipboard}
                code={`import { textVariants } from '@sudobility/design';

<div className="space-y-3">
  <label className={\`\${textVariants.label.default()} block\`}>Subscription Plan</label>
  <div className="space-y-2">
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="radio"
        name="plan"
        value="free"
        className="w-4 h-4 text-primary bg-card border-input focus:ring-ring focus:ring-2"
      />
      <span className="text-sm text-foreground">Free Plan - Basic features</span>
    </label>
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="radio"
        name="plan"
        value="pro"
        className="w-4 h-4 text-primary bg-card border-input focus:ring-ring focus:ring-2"
      />
      <span className="text-sm text-foreground">Pro Plan - Advanced features</span>
    </label>
  </div>
</div>`}
                preview={
                  <div className="space-y-3">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("advanced.radio.label")}
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="plan"
                          value="free"
                          className="w-4 h-4 text-primary bg-card border-input focus:ring-ring focus:ring-2"
                        />
                        <span className="text-sm text-foreground">
                          {t("advanced.radio.free")}
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="plan"
                          value="pro"
                          className="w-4 h-4 text-primary bg-card border-input focus:ring-ring focus:ring-2"
                        />
                        <span className="text-sm text-foreground">
                          {t("advanced.radio.pro")}
                        </span>
                      </label>
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Complete Form Example */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("complete.title")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("complete.description")}
            </p>

            <CodeExample
              title={t("complete.form.title")}
              description={t("complete.form.description")}
              copiedValue={copiedValue}
              onCopy={copyToClipboard}
              code={`import { variants, textVariants } from '@sudobility/design';

<form className="space-y-6 max-w-2xl">
  {/* Text Input */}
  <div className="space-y-1">
    <label className={\`\${textVariants.label.default()} block\`}>Display Name</label>
    <input type="text" className={variants.input.default()} placeholder="Your display name" />
  </div>

  {/* Email Input */}
  <div className="space-y-1">
    <label className={\`\${textVariants.label.default()} block\`}>Email Address</label>
    <input type="email" className={variants.input.default()} placeholder="your@email.com" />
  </div>

  {/* Select */}
  <div className="space-y-1">
    <label className={\`\${textVariants.label.default()} block\`}>Preferred Network</label>
    <select className={variants.input.default()}>
      <option value="">Select a network...</option>
      <option value="ethereum">Ethereum</option>
      <option value="polygon">Polygon</option>
      <option value="arbitrum">Arbitrum</option>
    </select>
  </div>

  {/* Textarea */}
  <div className="space-y-1">
    <label className={\`\${textVariants.label.default()} block\`}>Bio</label>
    <textarea
      rows={3}
      className={\`\${variants.input.default()} resize-vertical\`}
      placeholder="Tell us about yourself..."
    />
  </div>

  {/* Checkbox */}
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      className="w-4 h-4 text-primary bg-card border-input rounded
                 focus:ring-ring focus:ring-2 transition-colors"
    />
    <span className="text-sm text-foreground">I agree to receive email notifications</span>
  </label>

  {/* Submit Button */}
  <button type="submit" className={variants.button.primary.fullWidth()}>
    Save Profile
  </button>
</form>`}
              preview={
                <form className="space-y-6 max-w-2xl">
                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("complete.form.displayNameLabel")}
                    </label>
                    <input
                      type="text"
                      className={variants.input.default()}
                      placeholder={t("complete.form.displayNamePlaceholder")}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("complete.form.emailLabel")}
                    </label>
                    <input
                      type="email"
                      className={variants.input.default()}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("complete.form.networkLabel")}
                    </label>
                    <Select>
                      <SelectTrigger className={variants.input.default()}>
                        <SelectValue
                          placeholder={t("complete.form.networkPlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className={`${textVariants.label.default()} block`}>
                      {t("complete.form.bioLabel")}
                    </label>
                    <textarea
                      rows={3}
                      className={`${variants.input.default()} resize-vertical`}
                      placeholder={t("complete.form.bioPlaceholder")}
                    />
                  </div>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-card border-input rounded focus:ring-ring focus:ring-2 transition-colors"
                    />
                    <span className="text-sm text-foreground">
                      {t("complete.form.notifications")}
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={variants.button.primary.fullWidth()}
                  >
                    {t("complete.form.submit")}
                  </button>
                </form>
              }
            />
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("accessibility.title")}
            </h2>
            <div className="bg-info/10 rounded-xl p-6 border border-info">
              <h3 className={`${textVariants.heading.h4()} mb-4 text-info`}>
                {t("accessibility.heading")}
              </h3>
              <ul className="space-y-2 text-info">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    {t("accessibility.items.labelsBefore")}{" "}
                    <code className="bg-info/20 px-1 rounded">label</code>{" "}
                    {t("accessibility.items.labelsAfter")}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t("accessibility.items.errorMessages")}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t("accessibility.items.focusStates")}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t("accessibility.items.inputTypes")}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-info rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t("accessibility.items.contrast")}</span>
                </li>
              </ul>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default FormsPage;
