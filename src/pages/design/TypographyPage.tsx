import { Section } from "@sudobility/components";

import { textVariants, ui } from "@sudobility/design";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  DocumentTextIcon as TextIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";
import { SEOHead } from "@sudobility/seo_lib";

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted components to avoid creating components during render
const TextExample: React.FC<{
  title: string;
  className: string;
  text: string;
  description?: string;
  token?: string;
  copiedValue: string | null;
  copyToClipboard: (value: string) => void;
}> = ({
  title,
  className,
  text,
  description,
  token,
  copiedValue,
  copyToClipboard,
}) => {
  const { t } = useTranslation("typography");
  return (
    <div
      className="group cursor-pointer border border-border rounded-lg p-4 hover:border-primary transition-colors"
      onClick={() => copyToClipboard(className)}
      role="button"
      aria-label={t("example.aria", { title })}
    >
      <div className="flex items-start justify-between mb-2">
        <h4
          className={`${textVariants.body.sm()} font-medium text-muted-foreground`}
        >
          {title}
        </h4>
        <div className="flex-shrink-0">
          {copiedValue === className ? (
            <CheckIcon className="h-4 w-4 text-success" />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
      <div className={className} style={{ lineHeight: "inherit" }}>
        {text}
      </div>
      {description && (
        <p className={`${textVariants.caption.default()} mt-2`}>
          {description}
        </p>
      )}
      {token && (
        <code
          className={`${textVariants.code.small()} mt-2 block text-primary`}
        >
          {token}
        </code>
      )}
      <code className={`${textVariants.code.small()} mt-2 block`}>
        className="{className}"
      </code>
    </div>
  );
};

const CodeExample: React.FC<{
  title: string;
  description?: string;
  code: string;
  preview?: React.ReactNode;
  copiedValue: string | null;
  copyToClipboard: (value: string) => void;
}> = ({ title, description, code, preview, copiedValue, copyToClipboard }) => {
  const { t } = useTranslation("typography");
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
              {t("example.preview")}
            </span>
          </div>
          <div className="bg-card rounded border p-4">{preview}</div>
        </div>
      )}

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CodeBracketIcon className="h-4 w-4 text-muted-foreground" />
            <span
              className={`${textVariants.caption.default()} text-muted-foreground`}
            >
              {t("example.usage")}
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

const TypographyPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("typography");
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Font families with examples
  const fontFamilies = [
    {
      name: t("fontFamilies.items.sans.name"),
      token: "font-sans",
      description: t("fontFamilies.items.sans.description"),
      example: t("fontFamilies.pangram"),
      className: "font-sans",
      usage: t("fontFamilies.items.sans.usage"),
    },
    {
      name: t("fontFamilies.items.serif.name"),
      token: "font-serif",
      description: t("fontFamilies.items.serif.description"),
      example: t("fontFamilies.pangram"),
      className: "font-serif",
      usage: t("fontFamilies.items.serif.usage"),
    },
    {
      name: t("fontFamilies.items.mono.name"),
      token: "font-mono",
      description: t("fontFamilies.items.mono.description"),
      example: 'const message = "Hello, World!";',
      className: "font-mono",
      usage: t("fontFamilies.items.mono.usage"),
    },
  ];

  // Typography scale from design tokens
  const typographyScale = [
    {
      name: t("scale.items.hero.name"),
      token: "text-9xl",
      size: "128px",
      className: textVariants.heading.display.hero(),
      usage: t("scale.items.hero.usage"),
    },
    {
      name: t("scale.items.xl.name"),
      token: "text-7xl",
      size: "72px",
      className: textVariants.heading.display.xl(),
      usage: t("scale.items.xl.usage"),
    },
    {
      name: t("scale.items.lg.name"),
      token: "text-6xl",
      size: "60px",
      className: textVariants.heading.display.lg(),
      usage: t("scale.items.lg.usage"),
    },
    {
      name: t("scale.items.md.name"),
      token: "text-5xl",
      size: "48px",
      className: textVariants.heading.display.md(),
      usage: t("scale.items.md.usage"),
    },
    {
      name: t("scale.items.sm.name"),
      token: "text-4xl",
      size: "36px",
      className: textVariants.heading.display.sm(),
      usage: t("scale.items.sm.usage"),
    },
    {
      name: t("scale.items.h1.name"),
      token: "text-3xl",
      size: "30px",
      className: textVariants.heading.h1(),
      usage: t("scale.items.h1.usage"),
    },
    {
      name: t("scale.items.h2.name"),
      token: "text-2xl",
      size: "24px",
      className: textVariants.heading.h2(),
      usage: t("scale.items.h2.usage"),
    },
    {
      name: t("scale.items.h3.name"),
      token: "text-xl",
      size: "20px",
      className: textVariants.heading.h3(),
      usage: t("scale.items.h3.usage"),
    },
    {
      name: t("scale.items.h4.name"),
      token: "text-lg",
      size: "18px",
      className: textVariants.heading.h4(),
      usage: t("scale.items.h4.usage"),
    },
    {
      name: t("scale.items.h5.name"),
      token: "text-base",
      size: "16px",
      className: textVariants.heading.h5(),
      usage: t("scale.items.h5.usage"),
    },
    {
      name: t("scale.items.h6.name"),
      token: "text-sm",
      size: "14px",
      className: textVariants.heading.h6(),
      usage: t("scale.items.h6.usage"),
    },
  ];

  // Body text variants
  const bodyTextVariants = [
    {
      name: t("body.items.xl.name"),
      className: textVariants.body.xl(),
      usage: t("body.items.xl.usage"),
    },
    {
      name: t("body.items.lg.name"),
      className: textVariants.body.lg(),
      usage: t("body.items.lg.usage"),
    },
    {
      name: t("body.items.md.name"),
      className: textVariants.body.md(),
      usage: t("body.items.md.usage"),
    },
    {
      name: t("body.items.sm.name"),
      className: textVariants.body.sm(),
      usage: t("body.items.sm.usage"),
    },
    {
      name: t("body.items.xs.name"),
      className: textVariants.body.xs(),
      usage: t("body.items.xs.usage"),
    },
  ];

  // Text emphasis variants
  const textEmphasis = [
    {
      name: t("emphasis.items.strongLg.name"),
      className: textVariants.body.strong.lg(),
      usage: t("emphasis.items.strongLg.usage"),
    },
    {
      name: t("emphasis.items.strongMd.name"),
      className: textVariants.body.strong.md(),
      usage: t("emphasis.items.strongMd.usage"),
    },
    {
      name: t("emphasis.items.strongSm.name"),
      className: textVariants.body.strong.sm(),
      usage: t("emphasis.items.strongSm.usage"),
    },
    {
      name: t("emphasis.items.emphasisLg.name"),
      className: textVariants.body.emphasis.lg(),
      usage: t("emphasis.items.emphasisLg.usage"),
    },
    {
      name: t("emphasis.items.emphasisMd.name"),
      className: textVariants.body.emphasis.md(),
      usage: t("emphasis.items.emphasisMd.usage"),
    },
    {
      name: t("emphasis.items.emphasisSm.name"),
      className: textVariants.body.emphasis.sm(),
      usage: t("emphasis.items.emphasisSm.usage"),
    },
    {
      name: t("emphasis.items.mutedLg.name"),
      className: textVariants.body.muted.lg(),
      usage: t("emphasis.items.mutedLg.usage"),
    },
    {
      name: t("emphasis.items.mutedMd.name"),
      className: textVariants.body.muted.md(),
      usage: t("emphasis.items.mutedMd.usage"),
    },
    {
      name: t("emphasis.items.mutedSm.name"),
      className: textVariants.body.muted.sm(),
      usage: t("emphasis.items.mutedSm.usage"),
    },
  ];

  // Caption and special text
  const captionVariants = [
    {
      key: "default",
      name: t("caption.items.default.name"),
      className: textVariants.caption.default(),
      usage: t("caption.items.default.usage"),
    },
    {
      key: "emphasis",
      name: t("caption.items.emphasis.name"),
      className: textVariants.caption.emphasis(),
      usage: t("caption.items.emphasis.usage"),
    },
    {
      key: "uppercase",
      name: t("caption.items.uppercase.name"),
      className: textVariants.caption.uppercase(),
      usage: t("caption.items.uppercase.usage"),
    },
  ];

  // Lead text variants
  const leadVariants = [
    {
      name: t("caption.leadItems.lg.name"),
      className: textVariants.lead.lg(),
      usage: t("caption.leadItems.lg.usage"),
    },
    {
      name: t("caption.leadItems.md.name"),
      className: textVariants.lead.md(),
      usage: t("caption.leadItems.md.usage"),
    },
    {
      name: t("caption.leadItems.sm.name"),
      className: textVariants.lead.sm(),
      usage: t("caption.leadItems.sm.usage"),
    },
  ];

  // Link variants
  const linkVariants = [
    {
      key: "default",
      name: t("links.items.default.name"),
      className: textVariants.link.default(),
      usage: t("links.items.default.usage"),
    },
    {
      key: "subtle",
      name: t("links.items.subtle.name"),
      className: textVariants.link.subtle(),
      usage: t("links.items.subtle.usage"),
    },
    {
      key: "muted",
      name: t("links.items.muted.name"),
      className: textVariants.link.muted(),
      usage: t("links.items.muted.usage"),
    },
    {
      key: "external",
      name: t("links.items.external.name"),
      className: textVariants.link.external(),
      usage: t("links.items.external.usage"),
    },
  ];

  // Code variants
  const codeVariants = [
    {
      key: "inline",
      name: t("codeText.items.inline.name"),
      className: textVariants.code.inline(),
      usage: t("codeText.items.inline.usage"),
    },
    {
      key: "block",
      name: t("codeText.items.block.name"),
      className: textVariants.code.block(),
      usage: t("codeText.items.block.usage"),
    },
    {
      key: "small",
      name: t("codeText.items.small.name"),
      className: textVariants.code.small(),
      usage: t("codeText.items.small.usage"),
    },
  ];

  // Label variants
  const labelVariants = [
    {
      name: t("labels.items.default.name"),
      sample: t("labels.items.default.sample"),
      className: textVariants.label.default(),
      usage: t("labels.items.default.usage"),
    },
    {
      name: t("labels.items.required.name"),
      sample: t("labels.items.required.sample"),
      className: textVariants.label.required(),
      usage: t("labels.items.required.usage"),
    },
    {
      name: t("labels.items.optional.name"),
      sample: t("labels.items.optional.sample"),
      className: textVariants.label.optional(),
      usage: t("labels.items.optional.usage"),
    },
    {
      name: t("labels.items.helper.name"),
      sample: t("labels.items.helper.sample"),
      className: textVariants.label.helper(),
      usage: t("labels.items.helper.usage"),
    },
    {
      name: t("labels.items.error.name"),
      sample: t("labels.items.error.sample"),
      className: textVariants.label.error(),
      usage: t("labels.items.error.usage"),
    },
    {
      name: t("labels.items.success.name"),
      sample: t("labels.items.success.sample"),
      className: textVariants.label.success(),
      usage: t("labels.items.success.usage"),
    },
  ];

  // Web3 specific text
  const web3TextVariants = [
    {
      key: "address",
      name: t("web3.items.address.name"),
      className: textVariants.web3.address(),
      usage: t("web3.items.address.usage"),
    },
    {
      key: "addressShort",
      name: t("web3.items.addressShort.name"),
      className: textVariants.web3.addressShort(),
      usage: t("web3.items.addressShort.usage"),
    },
    {
      key: "hash",
      name: t("web3.items.hash.name"),
      className: textVariants.web3.hash(),
      usage: t("web3.items.hash.usage"),
    },
    {
      key: "amount",
      name: t("web3.items.amount.name"),
      className: textVariants.web3.amount(),
      usage: t("web3.items.amount.usage"),
    },
    {
      key: "chain",
      name: t("web3.items.chain.name"),
      className: textVariants.web3.chain(),
      usage: t("web3.items.chain.usage"),
    },
    {
      key: "symbol",
      name: t("web3.items.symbol.name"),
      className: textVariants.web3.symbol(),
      usage: t("web3.items.symbol.usage"),
    },
  ];

  // Responsive typography examples
  const responsiveExamples = [
    {
      name: t("responsive.items.h1.name"),
      className: textVariants.heading.responsive.h1(),
      usage: t("responsive.items.h1.usage"),
    },
    {
      name: t("responsive.items.h2.name"),
      className: textVariants.heading.responsive.h2(),
      usage: t("responsive.items.h2.usage"),
    },
    {
      name: t("responsive.items.h3.name"),
      className: textVariants.heading.responsive.h3(),
      usage: t("responsive.items.h3.usage"),
    },
    {
      name: t("responsive.items.display.name"),
      className: textVariants.heading.responsive.display(),
      usage: t("responsive.items.display.usage"),
    },
  ];

  return (
    <>
      <SEOHead
        title={t("seo.title", { emailDomain })}
        description={t("seo.description")}
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Navigation Links */}
          <div className="flex justify-end mb-8">
            <LocalizedLink
              to="/design/colors"
              className="flex items-center text-primary hover:text-primary/80"
            >
              {t("nav.viewColors")}
              <svg
                className="ml-2 h-4 w-4"
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
            </LocalizedLink>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <TextIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">
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
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()} text-primary`}>
                  {t("quickStart.heading")}
                </h2>
              </div>

              <p className={`${textVariants.body.md()} text-primary mb-8`}>
                {t("quickStart.description")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Heading Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.pageHeading.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<h1 className={textVariants.heading.display.xl()}>
  Welcome to the platform
</h1>`)
                      }
                    >
                      {copiedValue ===
                      `<h1 className={textVariants.heading.display.xl()}>
  Welcome to the platform
</h1>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<h1 className={textVariants.heading.display.xl()}>
  Welcome to the platform
</h1>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <h1 className={`${textVariants.heading.display.xl()}`}>
                      {t("quickStart.pageHeading.preview")}
                    </h1>
                  </div>
                </div>

                {/* Body Text Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.bodyText.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<p className={textVariants.body.lg()}>
  This is a large body text example that demonstrates 
  the proper font size, line height, and spacing for 
  readable content in your application.
</p>`)
                      }
                    >
                      {copiedValue ===
                      `<p className={textVariants.body.lg()}>
  This is a large body text example that demonstrates 
  the proper font size, line height, and spacing for 
  readable content in your application.
</p>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<p className={textVariants.body.lg()}>
  This is a large body text example that demonstrates 
  the proper font size, line height, and spacing for 
  readable content in your application.
</p>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <p className={`${textVariants.body.lg()}`}>
                      {t("quickStart.bodyText.preview")}
                    </p>
                  </div>
                </div>

                {/* Code Block Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.codeBlock.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto">
  <code className={textVariants.code.block()}>
    const message = "Hello, Web3!";
  </code>
</pre>`)
                      }
                    >
                      {copiedValue ===
                      `<pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto">
  <code className={textVariants.code.block()}>
    const message = "Hello, Web3!";
  </code>
</pre>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<pre className="bg-muted text-foreground p-4
                rounded-lg overflow-x-auto">
  <code className={textVariants.code.block()}>
    const message = "Hello, Web3!";
  </code>
</pre>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto">
                      <code className={`${textVariants.code.block()}`}>
                        const message = "Hello, Web3!";{"\n"}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Link Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.linkText.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<a href="#" className={textVariants.link.default()}>
  Learn more about Web3 email
</a>`)
                      }
                    >
                      {copiedValue ===
                      `<a href="#" className={textVariants.link.default()}>
  Learn more about Web3 email
</a>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<a href="#" className={textVariants.link.default()}>
  Learn more about Web3 email
</a>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <a href="#" className={`${textVariants.link.default()}`}>
                      {t("quickStart.linkText.preview")}
                    </a>
                  </div>
                </div>

                {/* Caption Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.captionText.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<p className={textVariants.caption.default()}>
  Last updated: March 15, 2024 at 2:30 PM
</p>`)
                      }
                    >
                      {copiedValue ===
                      `<p className={textVariants.caption.default()}>
  Last updated: March 15, 2024 at 2:30 PM
</p>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<p className={textVariants.caption.default()}>
  Last updated: March 15, 2024 at 2:30 PM
</p>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <p className={`${textVariants.caption.default()}`}>
                      {t("quickStart.captionText.preview")}
                    </p>
                  </div>
                </div>

                {/* Inline Code Example */}
                <div className="space-y-4">
                  <h3
                    className={`${textVariants.heading.h4()} text-primary mb-3`}
                  >
                    {t("quickStart.inlineCode.title")}
                  </h3>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <button
                      className="absolute top-2 right-2 p-1 hover:bg-foreground/10 rounded"
                      onClick={() =>
                        copyToClipboard(`<p className={textVariants.body.md()}>
  Use the <code className={textVariants.code.inline()}>useState</code> hook 
  to manage component state in React applications.
</p>`)
                      }
                    >
                      {copiedValue ===
                      `<p className={textVariants.body.md()}>
  Use the <code className={textVariants.code.inline()}>useState</code> hook 
  to manage component state in React applications.
</p>` ? (
                        <CheckIcon className="h-4 w-4 text-success" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`<p className={textVariants.body.md()}>
  Use the <code className={textVariants.code.inline()}>useState</code> hook 
  to manage component state in React applications.
</p>`}
                    </pre>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <p className={`${textVariants.body.md()}`}>
                      {t("quickStart.inlineCode.previewPrefix")}{" "}
                      <code className={`${textVariants.code.inline()}`}>
                        useState
                      </code>{" "}
                      {t("quickStart.inlineCode.previewSuffix")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Font Families */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("fontFamilies.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("fontFamilies.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {fontFamilies.map((font) => (
                <TextExample
                  key={font.name}
                  title={font.name}
                  className={`${font.className} text-2xl`}
                  text={font.example}
                  description={font.description}
                  token={font.token}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("fontFamilies.code.title")}
              description={t("fontFamilies.code.description")}
              code={`import { textVariants, designTokens } from '@/design-system';

// Use predefined text variants (recommended)
className={textVariants.body.lg()}        // Sans serif body text
className={textVariants.code.inline()}    // Monospace for code
className={textVariants.heading.h1()}     // Sans serif heading

// Or use Tailwind classes directly
className="font-sans text-lg"             // Sans serif
className="font-serif text-lg"            // Serif  
className="font-mono text-lg"             // Monospace

// Access design tokens
const sansFamily = designTokens.typography.family.sans;
const monoFamily = designTokens.typography.family.mono;`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <div className="font-sans">
                    {t("fontFamilies.preview.sans")}
                  </div>
                  <div className="font-serif">
                    {t("fontFamilies.preview.serif")}
                  </div>
                  <div className="font-mono">
                    {t("fontFamilies.preview.mono")}
                  </div>
                </div>
              }
            />
          </Section>

          {/* Typography Scale */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("scale.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("scale.description")}
            </p>
            <div className="space-y-6 mb-8">
              {typographyScale.map((type) => (
                <TextExample
                  key={type.name}
                  title={`${type.name} (${type.size})`}
                  className={type.className}
                  text={type.name}
                  description={type.usage}
                  token={type.token}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("scale.code.title")}
              description={t("scale.code.description")}
              code={`import { textVariants } from '@/design-system';

// Display headings (largest)
className={textVariants.heading.display.hero()}  // 128px - Hero sections
className={textVariants.heading.display.xl()}    // 72px - Large displays
className={textVariants.heading.display.lg()}    // 60px - Medium displays

// Standard headings
className={textVariants.heading.h1()}            // 30px - Main headings
className={textVariants.heading.h2()}            // 24px - Section headings
className={textVariants.heading.h3()}            // 20px - Subsection headings

// Responsive headings (scale with screen size)
className={textVariants.heading.responsive.h1()}
className={textVariants.heading.responsive.display()}`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <h1 className={textVariants.heading.h1()}>
                    {t("scale.preview.h1")}
                  </h1>
                  <h2 className={textVariants.heading.h2()}>
                    {t("scale.preview.h2")}
                  </h2>
                  <h3 className={textVariants.heading.h3()}>
                    {t("scale.preview.h3")}
                  </h3>
                  <p className={textVariants.body.lg()}>
                    {t("scale.preview.body")}
                  </p>
                </div>
              }
            />
          </Section>

          {/* Body Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("body.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("body.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {bodyTextVariants.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={t("body.sample")}
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("body.code.title")}
              description={t("body.code.description")}
              code={`import { textVariants } from '@/design-system';

// Body text sizes
className={textVariants.body.xl()}  // 18px - Lead paragraphs
className={textVariants.body.lg()}  // 16px - Standard body (default)
className={textVariants.body.md()}  // 16px - Same as lg (alias)
className={textVariants.body.sm()}  // 14px - Secondary content
className={textVariants.body.xs()}  // 12px - Fine print

// Usage in React
<p className={textVariants.body.lg()}>
  This is the main body text for most content.
</p>
<p className={textVariants.body.sm()}>
  This is smaller text for secondary information.
</p>`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <p className={textVariants.body.xl()}>
                    {t("body.preview.xl")}
                  </p>
                  <p className={textVariants.body.lg()}>
                    {t("body.preview.lg")}
                  </p>
                  <p className={textVariants.body.sm()}>
                    {t("body.preview.sm")}
                  </p>
                </div>
              }
            />
          </Section>

          {/* Text Emphasis */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("emphasis.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("emphasis.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {textEmphasis.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={variant.name}
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("emphasis.code.title")}
              description={t("emphasis.code.description")}
              code={`import { textVariants } from '@/design-system';

// Strong emphasis (bold weight)
className={textVariants.body.strong.lg()}   // Strong large text
className={textVariants.body.strong.md()}   // Strong medium text  
className={textVariants.body.strong.sm()}   // Strong small text

// Medium emphasis (medium weight)
className={textVariants.body.emphasis.lg()} // Medium emphasis large
className={textVariants.body.emphasis.md()} // Medium emphasis medium
className={textVariants.body.emphasis.sm()} // Medium emphasis small

// Muted text (reduced prominence)
className={textVariants.body.muted.lg()}    // Muted large text
className={textVariants.body.muted.md()}    // Muted medium text
className={textVariants.body.muted.sm()}    // Muted small text`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <p>
                    {t("emphasis.preview.normalPrefix")}{" "}
                    <span className={textVariants.body.strong.lg()}>
                      {t("emphasis.preview.strong")}
                    </span>{" "}
                    {t("emphasis.preview.and")}
                    <span className={textVariants.body.emphasis.lg()}>
                      {" "}
                      {t("emphasis.preview.medium")}
                    </span>
                    .
                  </p>
                  <p className={textVariants.body.muted.lg()}>
                    {t("emphasis.preview.muted")}
                  </p>
                </div>
              }
            />
          </Section>

          {/* Caption & Special Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("caption.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  {t("caption.captionTitle")}
                </h3>
                <div className="space-y-4 mb-6">
                  {captionVariants.map((variant) => (
                    <TextExample
                      key={variant.name}
                      title={variant.name}
                      className={variant.className}
                      text={
                        variant.key === "uppercase"
                          ? t("caption.uppercaseSample")
                          : t("caption.sample")
                      }
                      description={variant.usage}
                      copiedValue={copiedValue}
                      copyToClipboard={copyToClipboard}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  {t("caption.leadTitle")}
                </h3>
                <div className="space-y-4 mb-6">
                  {leadVariants.map((variant) => (
                    <TextExample
                      key={variant.name}
                      title={variant.name}
                      className={variant.className}
                      text={t("caption.leadSample")}
                      description={variant.usage}
                      copiedValue={copiedValue}
                      copyToClipboard={copyToClipboard}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CodeExample
              title={t("caption.code.title")}
              description={t("caption.code.description")}
              code={`import { textVariants } from '@/design-system';

// Caption variants
className={textVariants.caption.default()}    // Regular captions
className={textVariants.caption.emphasis()}   // Emphasized captions
className={textVariants.caption.uppercase()}  // Section labels

// Lead text variants
className={textVariants.lead.lg()}            // Large introduction text
className={textVariants.lead.md()}            // Medium introduction text
className={textVariants.lead.sm()}            // Small introduction text

// Usage examples
<figure>
  <img src="image.jpg" alt="Description" />
  <figcaption className={textVariants.caption.default()}>
    Image caption text
  </figcaption>
</figure>

<article>
  <p className={textVariants.lead.lg()}>
    This is the lead paragraph that introduces the article.
  </p>
  <p className={textVariants.body.lg()}>
    Regular body text continues here...
  </p>
</article>`}
              preview={
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded">
                    <div className="w-full h-16 bg-muted-foreground/20 rounded mb-2"></div>
                    <div className={textVariants.caption.default()}>
                      {t("caption.preview.imageCaption")}
                    </div>
                  </div>
                  <div>
                    <div className={textVariants.caption.uppercase()}>
                      {t("caption.preview.sectionLabel")}
                    </div>
                    <p className={textVariants.lead.lg()}>
                      {t("caption.preview.lead")}
                    </p>
                  </div>
                </div>
              }
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
            />
          </Section>

          {/* Links */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("links.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("links.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {linkVariants.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={
                    variant.key === "external"
                      ? t("links.externalSample")
                      : variant.name
                  }
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("links.code.title")}
              description={t("links.code.description")}
              code={`import { textVariants } from '@/design-system';

// Link variants
className={textVariants.link.default()}   // Standard links with underline
className={textVariants.link.subtle()}    // Links without underline
className={textVariants.link.muted()}     // Gray colored links  
className={textVariants.link.external()}  // External links with icon space

// Usage with React Router
<LocalizedLink to="/about" className={textVariants.link.default()}>
  About Us
</LocalizedLink>

// External links
<a 
  href="https://example.com" 
  className={textVariants.link.external()}
  target="_blank" 
  rel="noopener noreferrer"
>
  External Site →
</a>

// Subtle navigation links
<LocalizedLink to="/settings" className={textVariants.link.subtle()}>
  Settings
</LocalizedLink>`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <p>
                    {t("links.preview.paraPrefix")}{" "}
                    <a href="#" className={textVariants.link.default()}>
                      {t("links.preview.defaultLink")}
                    </a>{" "}
                    {t("links.preview.and")}{" "}
                    <a href="#" className={textVariants.link.subtle()}>
                      {t("links.preview.subtleLink")}
                    </a>
                    .
                  </p>
                  <p>
                    {t("links.preview.checkPrefix")}{" "}
                    <a href="#" className={textVariants.link.external()}>
                      {t("links.preview.externalLink")}
                    </a>{" "}
                    {t("links.preview.or")}{" "}
                    <a href="#" className={textVariants.link.muted()}>
                      {t("links.preview.mutedLink")}
                    </a>
                    .
                  </p>
                </div>
              }
            />
          </Section>

          {/* Code Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("codeText.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("codeText.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {codeVariants.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={
                    variant.key === "block"
                      ? 'function example() {\n  return "Hello, World!";\n}'
                      : 'const variable = "value";'
                  }
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("codeText.code.title")}
              description={t("codeText.code.description")}
              code={`import { textVariants } from '@/design-system';

// Code variants
className={textVariants.code.inline()}    // Inline code with background
className={textVariants.code.block()}     // Multi-line code blocks
className={textVariants.code.small()}     // Small inline code

// Usage examples
<p>
  Use the <code className={textVariants.code.inline()}>useState</code> hook
  to manage component state.
</p>

<pre className={textVariants.code.block()}>
{\`function example() {
  return "Hello, World!";
}\`}
</pre>

// For small technical details
<span className={textVariants.code.small()}>npm install</span>`}
              preview={
                <div className="space-y-4">
                  <p>
                    {t("codeText.preview.usePrefix")}{" "}
                    <code className={textVariants.code.inline()}>useState</code>{" "}
                    {t("codeText.preview.useSuffix")}
                  </p>
                  <pre className={textVariants.code.block()}>
                    {`function example() {
  return "Hello, World!";
}`}
                  </pre>
                  <p>
                    {t("codeText.preview.runPrefix")}{" "}
                    <code className={textVariants.code.small()}>
                      npm install
                    </code>{" "}
                    {t("codeText.preview.runSuffix")}
                  </p>
                </div>
              }
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
            />
          </Section>

          {/* Form Labels */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("labels.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("labels.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {labelVariants.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={variant.sample}
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("labels.code.title")}
              description={t("labels.code.description")}
              code={`import { textVariants } from '@/design-system';

// Label variants
className={textVariants.label.default()}   // Standard form labels
className={textVariants.label.required()}  // Required field labels (with *)
className={textVariants.label.optional()}  // Optional field labels
className={textVariants.label.helper()}    // Help text for fields
className={textVariants.label.error()}     // Error messages
className={textVariants.label.success()}   // Success messages

// Form field example
<div>
  <label className={textVariants.label.required()}>
    Email Address
  </label>
  <input
    type="email"
    className="mt-1 block w-full rounded-md border-input"
  />
  <p className={textVariants.label.helper()}>
    We'll use this to send you updates
  </p>
</div>

// Error state
<div>
  <label className={textVariants.label.default()}>Password</label>
  <input type="password" className="border-destructive" />
  <p className={textVariants.label.error()}>
    Password must be at least 8 characters
  </p>
</div>`}
              preview={
                <div className="space-y-6">
                  <div>
                    <label className={textVariants.label.required()}>
                      {t("labels.preview.emailLabel")}
                    </label>
                    <div className="mt-1 p-2 border border-input rounded bg-card text-sm">
                      user@example.com
                    </div>
                    <p className={textVariants.label.helper()}>
                      {t("labels.preview.emailHelper")}
                    </p>
                  </div>
                  <div>
                    <label className={textVariants.label.default()}>
                      {t("labels.preview.passwordLabel")}
                    </label>
                    <div className="mt-1 p-2 border border-destructive rounded bg-card text-sm">
                      ••••••
                    </div>
                    <p className={textVariants.label.error()}>
                      {t("labels.preview.passwordError")}
                    </p>
                  </div>
                  <div>
                    <label className={textVariants.label.optional()}>
                      {t("labels.preview.phoneLabel")}
                    </label>
                    <div className="mt-1 p-2 border border-success rounded bg-card text-sm">
                      +1 (555) 123-4567
                    </div>
                    <p className={textVariants.label.success()}>
                      {t("labels.preview.phoneSuccess")}
                    </p>
                  </div>
                </div>
              }
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
            />
          </Section>

          {/* Web3 Text Styles */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("web3.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("web3.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {web3TextVariants.map((variant) => {
                let sampleText = variant.name;
                if (variant.key === "address")
                  sampleText = "0x1234567890abcdef1234567890abcdef12345678";
                if (variant.key === "addressShort")
                  sampleText = "0x1234...5678";
                if (variant.key === "hash")
                  sampleText = "0xabcdef1234567890abcdef1234567890abcdef12";
                if (variant.key === "amount") sampleText = "1,250.50 ETH";
                if (variant.key === "chain") sampleText = "Ethereum Mainnet";
                if (variant.key === "symbol") sampleText = "ETH";

                return (
                  <TextExample
                    key={variant.name}
                    title={variant.name}
                    className={variant.className}
                    text={sampleText}
                    description={variant.usage}
                    copiedValue={copiedValue}
                    copyToClipboard={copyToClipboard}
                  />
                );
              })}
            </div>

            <CodeExample
              title={t("web3.code.title")}
              description={t("web3.code.description")}
              code={`import { textVariants } from '@/design-system';

// Web3 text variants
className={textVariants.web3.address()}      // Full wallet addresses
className={textVariants.web3.addressShort()} // Truncated addresses
className={textVariants.web3.hash()}         // Transaction hashes
className={textVariants.web3.amount()}       // Token amounts
className={textVariants.web3.chain()}        // Chain names
className={textVariants.web3.symbol()}       // Token symbols

// Usage examples
<div>
  <span className={textVariants.web3.chain()}>Ethereum Mainnet</span>
  <span className={textVariants.web3.addressShort()}>0x1234...5678</span>
</div>

<div>
  <span className={textVariants.web3.amount()}>1,250.50</span>
  <span className={textVariants.web3.symbol()}>ETH</span>
</div>

<div>
  <span className="text-sm text-muted-foreground">Transaction:</span>
  <code className={textVariants.web3.hash()}>
    0xabcdef1234567890abcdef1234567890abcdef12
  </code>
</div>`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={textVariants.web3.chain()}>
                      Ethereum Mainnet
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className={textVariants.web3.addressShort()}>
                      0x1234...5678
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={textVariants.web3.amount()}>1,250.50</span>
                    <span className={textVariants.web3.symbol()}>ETH</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {t("web3.preview.transactionHash")}
                    </div>
                    <code className={textVariants.web3.hash()}>
                      0xabcdef1234567890abcdef1234567890abcdef12
                    </code>
                  </div>
                </div>
              }
            />
          </Section>

          {/* Responsive Typography */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("responsive.heading")}
            </h2>
            <p
              className={`${textVariants.body.md()} text-muted-foreground mb-8`}
            >
              {t("responsive.description")}
            </p>
            <div className="space-y-6 mb-8">
              {responsiveExamples.map((variant) => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={variant.name}
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title={t("responsive.code.title")}
              description={t("responsive.code.description")}
              code={`import { textVariants } from '@/design-system';
import LocalizedLink from "../components/LocalizedLink";

interface AppProps {
  emailDomain: string;
  appName: string;
}


// Responsive headings (scale with screen size)
className={textVariants.heading.responsive.display()} // 4xl -> 8xl
className={textVariants.heading.responsive.h1()}      // 2xl -> 5xl
className={textVariants.heading.responsive.h2()}      // xl -> 4xl
className={textVariants.heading.responsive.h3()}      // lg -> 3xl

// These automatically adjust at breakpoints:
// - base: smallest size
// - sm: small screens and up
// - md: medium screens and up  
// - lg: large screens and up
// - xl: extra large screens and up

// Manual responsive classes
className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"

// Usage for hero sections
<h1 className={textVariants.heading.responsive.display()}>
  Welcome to Our Platform
</h1>

// Usage for page titles
<h1 className={textVariants.heading.responsive.h1()}>
  Page Title
</h1>`}
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
              preview={
                <div className="space-y-4">
                  <h1 className={textVariants.heading.responsive.h1()}>
                    {t("responsive.preview.heading")}
                  </h1>
                  <p className={textVariants.body.lg()}>
                    {t("responsive.preview.body")}
                  </p>
                </div>
              }
            />
          </Section>

          {/* Usage Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              {t("guidelines.heading")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3
                  className={`${textVariants.heading.h4()} mb-4 text-success`}
                >
                  {t("guidelines.doTitle")}
                </h3>
                <ul
                  className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}
                >
                  {(
                    t("guidelines.do", { returnObjects: true }) as string[]
                  ).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3
                  className={`${textVariants.heading.h4()} mb-4 text-destructive`}
                >
                  {t("guidelines.dontTitle")}
                </h3>
                <ul
                  className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}
                >
                  {(
                    t("guidelines.dont", { returnObjects: true }) as string[]
                  ).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Copy Instructions */}
          <div className={`${ui.background.muted} rounded-lg p-6 text-center`}>
            <ClipboardDocumentIcon className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className={`${textVariants.heading.h5()} mb-2`}>
              {t("copyInstructions.title")}
            </h3>
            <p className={`${textVariants.body.sm()} text-muted-foreground`}>
              {t("copyInstructions.description")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypographyPage;
