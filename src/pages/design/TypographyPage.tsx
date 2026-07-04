import { Section } from '@sudobility/components';

import { textVariants, ui } from '@sudobility/design';
import {
  CheckIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  DocumentTextIcon as TextIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import LocalizedLink from '../../components/LocalizedLink';
import { SEOHead } from '@sudobility/seo_lib';

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
}> = ({ title, className, text, description, token, copiedValue, copyToClipboard }) => (
  <div
    className="group cursor-pointer border border-border rounded-lg p-4 hover:border-primary transition-colors"
    onClick={() => copyToClipboard(className)}
    role="button"
    aria-label={`Copy ${title} class name`}
  >
    <div className="flex items-start justify-between mb-2">
      <h4 className={`${textVariants.body.sm()} font-medium text-muted-foreground`}>{title}</h4>
      <div className="flex-shrink-0">
        {copiedValue === className ? (
          <CheckIcon className="h-4 w-4 text-success" />
        ) : (
          <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
    <div className={className} style={{ lineHeight: 'inherit' }}>
      {text}
    </div>
    {description && <p className={`${textVariants.caption.default()} mt-2`}>{description}</p>}
    {token && (
      <code className={`${textVariants.code.small()} mt-2 block text-primary`}>{token}</code>
    )}
    <code className={`${textVariants.code.small()} mt-2 block`}>className="{className}"</code>
  </div>
);

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
        <div className="bg-card rounded border p-4">{preview}</div>
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

const TypographyPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // Font families with examples
  const fontFamilies = [
    {
      name: 'Sans Serif (Default)',
      token: 'font-sans',
      description: 'Primary font family for UI elements and body text',
      example: 'The quick brown fox jumps over the lazy dog',
      className: 'font-sans',
      usage: 'UI elements, headings, body text',
    },
    {
      name: 'Serif',
      token: 'font-serif',
      description: 'For editorial and formal content',
      example: 'The quick brown fox jumps over the lazy dog',
      className: 'font-serif',
      usage: 'Editorial content, formal documents',
    },
    {
      name: 'Monospace',
      token: 'font-mono',
      description: 'For code blocks and technical text',
      example: 'const message = "Hello, World!";',
      className: 'font-mono',
      usage: 'Code blocks, technical content, wallet addresses',
    },
  ];

  // Typography scale from design tokens
  const typographyScale = [
    {
      name: 'Hero',
      token: 'text-9xl',
      size: '128px',
      className: textVariants.heading.display.hero(),
      usage: 'Landing pages, hero sections',
    },
    {
      name: 'Display XL',
      token: 'text-7xl',
      size: '72px',
      className: textVariants.heading.display.xl(),
      usage: 'Large display headings',
    },
    {
      name: 'Display LG',
      token: 'text-6xl',
      size: '60px',
      className: textVariants.heading.display.lg(),
      usage: 'Medium display headings',
    },
    {
      name: 'Display MD',
      token: 'text-5xl',
      size: '48px',
      className: textVariants.heading.display.md(),
      usage: 'Small display headings',
    },
    {
      name: 'Display SM',
      token: 'text-4xl',
      size: '36px',
      className: textVariants.heading.display.sm(),
      usage: 'Extra small display headings',
    },
    {
      name: 'Heading 1',
      token: 'text-3xl',
      size: '30px',
      className: textVariants.heading.h1(),
      usage: 'Main page headings',
    },
    {
      name: 'Heading 2',
      token: 'text-2xl',
      size: '24px',
      className: textVariants.heading.h2(),
      usage: 'Section headings',
    },
    {
      name: 'Heading 3',
      token: 'text-xl',
      size: '20px',
      className: textVariants.heading.h3(),
      usage: 'Subsection headings',
    },
    {
      name: 'Heading 4',
      token: 'text-lg',
      size: '18px',
      className: textVariants.heading.h4(),
      usage: 'Minor headings',
    },
    {
      name: 'Heading 5',
      token: 'text-base',
      size: '16px',
      className: textVariants.heading.h5(),
      usage: 'Small headings',
    },
    {
      name: 'Heading 6',
      token: 'text-sm',
      size: '14px',
      className: textVariants.heading.h6(),
      usage: 'Smallest headings',
    },
  ];

  // Body text variants
  const bodyTextVariants = [
    {
      name: 'Body XL',
      className: textVariants.body.xl(),
      usage: 'Lead paragraphs, important content',
    },
    {
      name: 'Body Large',
      className: textVariants.body.lg(),
      usage: 'Standard body text, main content',
    },
    {
      name: 'Body Medium',
      className: textVariants.body.md(),
      usage: 'Standard body text (alias for large)',
    },
    {
      name: 'Body Small',
      className: textVariants.body.sm(),
      usage: 'Secondary information, captions',
    },
    {
      name: 'Body Extra Small',
      className: textVariants.body.xs(),
      usage: 'Fine print, minimal details',
    },
  ];

  // Text emphasis variants
  const textEmphasis = [
    {
      name: 'Strong Large',
      className: textVariants.body.strong.lg(),
      usage: 'Important emphasized text',
    },
    {
      name: 'Strong Medium',
      className: textVariants.body.strong.md(),
      usage: 'Medium emphasized text',
    },
    {
      name: 'Strong Small',
      className: textVariants.body.strong.sm(),
      usage: 'Small emphasized text',
    },
    {
      name: 'Emphasis Large',
      className: textVariants.body.emphasis.lg(),
      usage: 'Medium weight emphasis',
    },
    {
      name: 'Emphasis Medium',
      className: textVariants.body.emphasis.md(),
      usage: 'Medium weight emphasis',
    },
    {
      name: 'Emphasis Small',
      className: textVariants.body.emphasis.sm(),
      usage: 'Small medium weight emphasis',
    },
    {
      name: 'Muted Large',
      className: textVariants.body.muted.lg(),
      usage: 'De-emphasized text',
    },
    {
      name: 'Muted Medium',
      className: textVariants.body.muted.md(),
      usage: 'De-emphasized text',
    },
    {
      name: 'Muted Small',
      className: textVariants.body.muted.sm(),
      usage: 'De-emphasized small text',
    },
  ];

  // Caption and special text
  const captionVariants = [
    {
      name: 'Default Caption',
      className: textVariants.caption.default(),
      usage: 'Image captions, additional info',
    },
    {
      name: 'Emphasis Caption',
      className: textVariants.caption.emphasis(),
      usage: 'Important captions',
    },
    {
      name: 'Uppercase Caption',
      className: textVariants.caption.uppercase(),
      usage: 'Section labels, tags',
    },
  ];

  // Lead text variants
  const leadVariants = [
    {
      name: 'Large Lead',
      className: textVariants.lead.lg(),
      usage: 'Introduction paragraphs, article leads',
    },
    {
      name: 'Medium Lead',
      className: textVariants.lead.md(),
      usage: 'Introduction paragraphs',
    },
    {
      name: 'Small Lead',
      className: textVariants.lead.sm(),
      usage: 'Small introduction text',
    },
  ];

  // Link variants
  const linkVariants = [
    {
      name: 'Default Link',
      className: textVariants.link.default(),
      usage: 'Standard links with underline',
    },
    {
      name: 'Subtle Link',
      className: textVariants.link.subtle(),
      usage: 'Links without underline',
    },
    {
      name: 'Muted Link',
      className: textVariants.link.muted(),
      usage: 'Gray colored links',
    },
    {
      name: 'External Link',
      className: textVariants.link.external(),
      usage: 'Links to external sites',
    },
  ];

  // Code variants
  const codeVariants = [
    {
      name: 'Inline Code',
      className: textVariants.code.inline(),
      usage: 'Code within text',
    },
    {
      name: 'Code Block',
      className: textVariants.code.block(),
      usage: 'Multi-line code blocks',
    },
    {
      name: 'Small Code',
      className: textVariants.code.small(),
      usage: 'Small inline code',
    },
  ];

  // Label variants
  const labelVariants = [
    {
      name: 'Default Label',
      className: textVariants.label.default(),
      usage: 'Form field labels',
    },
    {
      name: 'Required Label',
      className: textVariants.label.required(),
      usage: 'Required form fields',
    },
    {
      name: 'Optional Label',
      className: textVariants.label.optional(),
      usage: 'Optional form fields',
    },
    {
      name: 'Helper Text',
      className: textVariants.label.helper(),
      usage: 'Form help text',
    },
    {
      name: 'Error Text',
      className: textVariants.label.error(),
      usage: 'Form error messages',
    },
    {
      name: 'Success Text',
      className: textVariants.label.success(),
      usage: 'Form success messages',
    },
  ];

  // Web3 specific text
  const web3TextVariants = [
    {
      name: 'Wallet Address',
      className: textVariants.web3.address(),
      usage: 'Full wallet addresses',
    },
    {
      name: 'Short Address',
      className: textVariants.web3.addressShort(),
      usage: 'Truncated wallet addresses',
    },
    {
      name: 'Transaction Hash',
      className: textVariants.web3.hash(),
      usage: 'Transaction identifiers',
    },
    {
      name: 'Token Amount',
      className: textVariants.web3.amount(),
      usage: 'Cryptocurrency amounts',
    },
    {
      name: 'Chain Name',
      className: textVariants.web3.chain(),
      usage: 'Blockchain network names',
    },
    {
      name: 'Token Symbol',
      className: textVariants.web3.symbol(),
      usage: 'Cryptocurrency symbols',
    },
  ];

  // Responsive typography examples
  const responsiveExamples = [
    {
      name: 'Responsive H1',
      className: textVariants.heading.responsive.h1(),
      usage: 'Headings that scale with screen size',
    },
    {
      name: 'Responsive H2',
      className: textVariants.heading.responsive.h2(),
      usage: 'Section headings that scale',
    },
    {
      name: 'Responsive H3',
      className: textVariants.heading.responsive.h3(),
      usage: 'Subsection headings that scale',
    },
    {
      name: 'Responsive Display',
      className: textVariants.heading.responsive.display(),
      usage: 'Display text that scales',
    },
  ];

  return (
    <>
      <SEOHead
        title={`Typography - Design System - Internal - ${emailDomain}`}
        description="Complete typography system and text styles showcase for the design system"
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
              View Colors
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
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <TextIcon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">Typography System</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Typography & Text Styles
            </h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground`}>
              Complete typography system including fonts, sizes, weights, and styles with usage
              examples and code samples. Click any example to copy its class name to clipboard.
            </p>
          </div>

          {/* Quick Start Code Examples */}
          <Section>
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <CodeBracketIcon className="h-8 w-8 text-primary mr-3" />
                <h2 className={`${textVariants.heading.h2()} text-primary`}>
                  Quick Start - Typography Examples
                </h2>
              </div>

              <p className={`${textVariants.body.md()} text-primary mb-8`}>
                Ready-to-use typography examples for the most common text patterns. Copy and paste
                directly into your components.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Heading Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Page Heading</h3>
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
                      Welcome to the platform
                    </h1>
                  </div>
                </div>

                {/* Body Text Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Body Text</h3>
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
                      This is a large body text example that demonstrates the proper font size, line
                      height, and spacing for readable content in your application.
                    </p>
                  </div>
                </div>

                {/* Code Block Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Code Block</h3>
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
                        const message = "Hello, Web3!";{'\n'}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Link Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Link Text</h3>
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
                      Learn more about Web3 email
                    </a>
                  </div>
                </div>

                {/* Caption Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Caption Text</h3>
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
                      Last updated: March 15, 2024 at 2:30 PM
                    </p>
                  </div>
                </div>

                {/* Inline Code Example */}
                <div className="space-y-4">
                  <h3 className={`${textVariants.heading.h4()} text-primary mb-3`}>Inline Code</h3>
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
                      Use the <code className={`${textVariants.code.inline()}`}>useState</code> hook
                      to manage component state in React applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Font Families */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Font Families</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Three primary font families used throughout the application for different content
              types.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {fontFamilies.map(font => (
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
              title="Font Family Usage"
              description="How to use font families from the design system"
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
                  <div className="font-sans">This is sans serif text (default UI font)</div>
                  <div className="font-serif">This is serif text for editorial content</div>
                  <div className="font-mono">This is monospace text for code</div>
                </div>
              }
            />
          </Section>

          {/* Typography Scale */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Typography Scale</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Hierarchical type scale from display text to headings, providing consistent sizing
              across the interface.
            </p>
            <div className="space-y-6 mb-8">
              {typographyScale.map(type => (
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
              title="Typography Scale Usage"
              description="How to use heading variants from the design system"
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
                  <h1 className={textVariants.heading.h1()}>Heading 1</h1>
                  <h2 className={textVariants.heading.h2()}>Heading 2</h2>
                  <h3 className={textVariants.heading.h3()}>Heading 3</h3>
                  <p className={textVariants.body.lg()}>Body text follows the headings</p>
                </div>
              }
            />
          </Section>

          {/* Body Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Body Text</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Body text variants for different content types and hierarchy levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {bodyTextVariants.map(variant => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text="This is sample body text demonstrating the font size, weight, and line height of this variant."
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title="Body Text Usage"
              description="How to use body text variants"
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
                    This is extra large body text for lead paragraphs and important introductory
                    content.
                  </p>
                  <p className={textVariants.body.lg()}>
                    This is the standard body text used throughout most of the application for main
                    content.
                  </p>
                  <p className={textVariants.body.sm()}>
                    This is small body text used for secondary information, captions, and helper
                    text.
                  </p>
                </div>
              }
            />
          </Section>

          {/* Text Emphasis */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Text Emphasis</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Text emphasis variants for different weight and prominence levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {textEmphasis.map(variant => (
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
              title="Text Emphasis Usage"
              description="How to use text emphasis variants"
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
                    This is normal text with{' '}
                    <span className={textVariants.body.strong.lg()}>strong emphasis</span> and
                    <span className={textVariants.body.emphasis.lg()}> medium emphasis</span>.
                  </p>
                  <p className={textVariants.body.muted.lg()}>
                    This is muted text with reduced visual prominence.
                  </p>
                </div>
              }
            />
          </Section>

          {/* Caption & Special Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Caption & Special Text</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>Caption Variants</h3>
                <div className="space-y-4 mb-6">
                  {captionVariants.map(variant => (
                    <TextExample
                      key={variant.name}
                      title={variant.name}
                      className={variant.className}
                      text={
                        variant.name === 'Uppercase Caption'
                          ? 'SECTION LABEL'
                          : 'This is a caption example'
                      }
                      description={variant.usage}
                      copiedValue={copiedValue}
                      copyToClipboard={copyToClipboard}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>Lead Text</h3>
                <div className="space-y-4 mb-6">
                  {leadVariants.map(variant => (
                    <TextExample
                      key={variant.name}
                      title={variant.name}
                      className={variant.className}
                      text="This is lead text that introduces the main content and provides context for what follows."
                      description={variant.usage}
                      copiedValue={copiedValue}
                      copyToClipboard={copyToClipboard}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CodeExample
              title="Caption & Lead Text Usage"
              description="How to use captions and lead text"
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
                      This is a caption for the image above
                    </div>
                  </div>
                  <div>
                    <div className={textVariants.caption.uppercase()}>SECTION LABEL</div>
                    <p className={textVariants.lead.lg()}>
                      This is lead text that introduces the section.
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
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Link Styles</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Different link styles for various contexts and emphasis levels.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {linkVariants.map(variant => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={variant.name === 'External Link' ? 'External link →' : variant.name}
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title="Link Styles Usage"
              description="How to use link variants"
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
                    This paragraph contains a{' '}
                    <a href="#" className={textVariants.link.default()}>
                      default link
                    </a>{' '}
                    and a{' '}
                    <a href="#" className={textVariants.link.subtle()}>
                      subtle link
                    </a>
                    .
                  </p>
                  <p>
                    Check out this{' '}
                    <a href="#" className={textVariants.link.external()}>
                      external link →
                    </a>{' '}
                    or this{' '}
                    <a href="#" className={textVariants.link.muted()}>
                      muted link
                    </a>
                    .
                  </p>
                </div>
              }
            />
          </Section>

          {/* Code Text */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Code & Technical Text</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Monospace text styles for code, technical content, and technical documentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {codeVariants.map(variant => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={
                    variant.name === 'Code Block'
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
              title="Code Text Usage"
              description="How to use code text variants"
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
                    Use the <code className={textVariants.code.inline()}>useState</code> hook to
                    manage state.
                  </p>
                  <pre className={textVariants.code.block()}>
                    {`function example() {
  return "Hello, World!";
}`}
                  </pre>
                  <p>
                    Run <code className={textVariants.code.small()}>npm install</code> to get
                    started.
                  </p>
                </div>
              }
              copiedValue={copiedValue}
              copyToClipboard={copyToClipboard}
            />
          </Section>

          {/* Form Labels */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Form Labels & Messages</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Text styles for form elements, labels, and feedback messages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {labelVariants.map(variant => (
                <TextExample
                  key={variant.name}
                  title={variant.name}
                  className={variant.className}
                  text={
                    variant.name === 'Required Label'
                      ? 'Email Address'
                      : variant.name.replace(' Text', '').replace(' Label', '')
                  }
                  description={variant.usage}
                  copiedValue={copiedValue}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>

            <CodeExample
              title="Form Labels Usage"
              description="How to use form label and message variants"
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
                    <label className={textVariants.label.required()}>Email Address</label>
                    <div className="mt-1 p-2 border border-input rounded bg-card text-sm">
                      user@example.com
                    </div>
                    <p className={textVariants.label.helper()}>
                      We'll use this to send you updates
                    </p>
                  </div>
                  <div>
                    <label className={textVariants.label.default()}>Password</label>
                    <div className="mt-1 p-2 border border-destructive rounded bg-card text-sm">
                      ••••••
                    </div>
                    <p className={textVariants.label.error()}>
                      Password must be at least 8 characters
                    </p>
                  </div>
                  <div>
                    <label className={textVariants.label.optional()}>Phone Number</label>
                    <div className="mt-1 p-2 border border-success rounded bg-card text-sm">
                      +1 (555) 123-4567
                    </div>
                    <p className={textVariants.label.success()}>
                      Phone number verified successfully
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
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Web3 Text Styles</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Specialized text styles for Web3 and blockchain-specific content like addresses,
              hashes, and amounts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {web3TextVariants.map(variant => {
                let sampleText = variant.name;
                if (variant.name === 'Wallet Address')
                  sampleText = '0x1234567890abcdef1234567890abcdef12345678';
                if (variant.name === 'Short Address') sampleText = '0x1234...5678';
                if (variant.name === 'Transaction Hash')
                  sampleText = '0xabcdef1234567890abcdef1234567890abcdef12';
                if (variant.name === 'Token Amount') sampleText = '1,250.50 ETH';
                if (variant.name === 'Chain Name') sampleText = 'Ethereum Mainnet';
                if (variant.name === 'Token Symbol') sampleText = 'ETH';

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
              title="Web3 Text Usage"
              description="How to use Web3-specific text styles"
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
                    <span className={textVariants.web3.chain()}>Ethereum Mainnet</span>
                    <span className="text-muted-foreground">•</span>
                    <span className={textVariants.web3.addressShort()}>0x1234...5678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={textVariants.web3.amount()}>1,250.50</span>
                    <span className={textVariants.web3.symbol()}>ETH</span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Transaction Hash:</div>
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
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Responsive Typography</h2>
            <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
              Typography that automatically scales with screen size for optimal readability across
              devices.
            </p>
            <div className="space-y-6 mb-8">
              {responsiveExamples.map(variant => (
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
              title="Responsive Typography Usage"
              description="How to use responsive text variants that scale with screen size"
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
                    This heading scales with screen size
                  </h1>
                  <p className={textVariants.body.lg()}>
                    Resize your browser window to see how responsive headings adapt to different
                    screen sizes.
                  </p>
                </div>
              }
            />
          </Section>

          {/* Usage Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Typography Guidelines</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3 className={`${textVariants.heading.h4()} mb-4 text-success`}>✓ Do</h3>
                <ul className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}>
                  <li>• Use textVariants for consistent styling</li>
                  <li>• Choose appropriate hierarchy levels</li>
                  <li>• Use responsive variants for hero content</li>
                  <li>• Ensure sufficient contrast ratios</li>
                  <li>• Use monospace for code and addresses</li>
                  <li>• Test readability on different screen sizes</li>
                </ul>
              </div>

              <div className={`${ui.background.subtle} rounded-lg p-6`}>
                <h3 className={`${textVariants.heading.h4()} mb-4 text-destructive`}>✗ Don't</h3>
                <ul className={`${textVariants.body.sm()} space-y-2 text-muted-foreground`}>
                  <li>• Use random font sizes outside the scale</li>
                  <li>• Skip heading levels (h1 → h3)</li>
                  <li>• Use too many different text styles</li>
                  <li>• Make text too small on mobile devices</li>
                  <li>• Use serif fonts for UI elements</li>
                  <li>• Ignore dark mode text colors</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Copy Instructions */}
          <div className={`${ui.background.muted} rounded-lg p-6 text-center`}>
            <ClipboardDocumentIcon className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className={`${textVariants.heading.h5()} mb-2`}>Click to Copy Class Names</h3>
            <p className={`${textVariants.body.sm()} text-muted-foreground`}>
              Click on any text example to copy its CSS class name, or use the copy button on code
              examples to copy usage code
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypographyPage;
