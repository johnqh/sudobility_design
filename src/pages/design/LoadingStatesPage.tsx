import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import LocalizedLink from '../../components/LocalizedLink';
import { SEOHead } from '@sudobility/seo_lib';
import { textVariants, ui, variants } from '@sudobility/design';

interface AppProps {
  emailDomain: string;
  appName: string;
}

// Extracted components to avoid creating components during render
const CodeBlock: React.FC<{
  code: string;
  _language?: string;
  copyKey: string;
  copiedStates: { [key: string]: boolean };
  copyToClipboard: (text: string, key: string) => void;
}> = ({ code, _language = 'tsx', copyKey, copiedStates, copyToClipboard }) => (
  <div className="relative">
    <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
    <button
      onClick={() => copyToClipboard(code, copyKey)}
      className="absolute top-3 right-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded text-xs transition-colors"
    >
      {copiedStates[copyKey] ? '✓ Copied!' : 'Copy'}
    </button>
  </div>
);

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
      <h2 className={`${textVariants.heading.h2()}`}>{title}</h2>
      {expandedSections[id] ? (
        <ChevronUpIcon className="h-6 w-6 text-muted-foreground" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
      )}
    </button>
    {expandedSections[id] && (
      <p className={`${textVariants.body.lg()} text-muted-foreground mb-6`}>{description}</p>
    )}
  </div>
);

// Spinner components extracted to avoid creating components during render
const SpinnerSmall = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
);

const SpinnerDefault = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
);

const SpinnerLarge = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
);

const LoadingStatesPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    'quick-start': true,
    spinners: true,
    skeletons: true,
    progress: true,
    web3: true,
    states: true,
    accessibility: true,
  });

  // Demo states
  const [demoStates, setDemoStates] = useState({
    isLoading: false,
    progress: 0,
    transactionState: 'idle', // idle, pending, confirming, confirmed, failed
    uploadProgress: 0,
    isUploading: false,
  });

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Demo functions
  const startSimpleLoading = () => {
    setDemoStates(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, isLoading: false }));
    }, 3000);
  };

  const startProgressDemo = () => {
    setDemoStates(prev => ({ ...prev, progress: 0 }));
    const interval = setInterval(() => {
      setDemoStates(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, progress: Math.min(prev.progress + 10, 100) };
      });
    }, 200);
  };

  const startTransactionDemo = () => {
    setDemoStates(prev => ({ ...prev, transactionState: 'pending' }));
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, transactionState: 'confirming' }));
    }, 2000);
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, transactionState: 'confirmed' }));
    }, 5000);
    setTimeout(() => {
      setDemoStates(prev => ({ ...prev, transactionState: 'idle' }));
    }, 8000);
  };

  const startUploadDemo = () => {
    setDemoStates(prev => ({
      ...prev,
      isUploading: true,
      uploadProgress: 0,
    }));
    const interval = setInterval(() => {
      setDemoStates(prev => {
        if (prev.uploadProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDemoStates(prevState => ({
              ...prevState,
              isUploading: false,
              uploadProgress: 0,
            }));
          }, 1000);
          return prev;
        }
        return {
          ...prev,
          uploadProgress: Math.min(prev.uploadProgress + 15, 100),
        };
      });
    }, 300);
  };

  return (
    <>
      <SEOHead
        title={`Loading States - Design System - Internal - ${emailDomain}`}
        description="Comprehensive loading state documentation with spinners, skeletons, progress indicators, and Web3 patterns"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent px-4 py-2 rounded-full mb-6">
              <ArrowPathIcon className="h-5 w-5 text-accent-foreground mr-2 animate-spin" />
              <span className="text-accent-foreground font-semibold">Loading States</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Loading State Components
            </h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}>
              Loading indicators and progress states that provide clear visual feedback during
              asynchronous operations, specially designed for Web3 transactions and blockchain
              interactions.
            </p>

            {/* Loading Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-accent mb-1`}>6</div>
                <div className={textVariants.caption.default()}>Spinner Types</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-primary mb-1`}>4</div>
                <div className={textVariants.caption.default()}>Skeleton Patterns</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-success mb-1`}>5</div>
                <div className={textVariants.caption.default()}>Progress Types</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-warning mb-1`}>8</div>
                <div className={textVariants.caption.default()}>Web3 Examples</div>
              </div>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="quick-start"
              title="🚀 Quick Start"
              description="Get started with the most commonly used loading patterns. These examples show essential loading states for different use cases."
            />

            {expandedSections['quick-start'] && (
              <div className="space-y-8">
                {/* Basic Spinners */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>1. Basic Loading Spinners</h3>
                  <div className="flex items-center gap-8 p-6 bg-muted rounded-lg mb-4">
                    <div className="text-center">
                      <SpinnerSmall />
                      <p className="text-xs text-muted-foreground mt-2">Small</p>
                    </div>
                    <div className="text-center">
                      <SpinnerDefault />
                      <p className="text-xs text-muted-foreground mt-2">Default</p>
                    </div>
                    <div className="text-center">
                      <SpinnerLarge />
                      <p className="text-xs text-muted-foreground mt-2">Large</p>
                    </div>
                  </div>

                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="basic-spinners"
                    code={`// Basic spinner sizes



// Usage
<SpinnerDefault />
<SpinnerSmall />
<SpinnerLarge />`}
                  />
                </div>

                {/* Loading Button */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>2. Loading Button States</h3>
                  <div className="flex flex-wrap gap-4 p-6 bg-muted rounded-lg mb-4">
                    <button
                      className={(variants.button as any).primary.default()}
                      onClick={startSimpleLoading}
                      disabled={demoStates.isLoading}
                    >
                      {demoStates.isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                          Loading...
                        </div>
                      ) : (
                        'Click to Load'
                      )}
                    </button>

                    <button
                      className={`${(variants.button as any).secondary.default()} flex items-center`}
                    >
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground mr-2"></div>
                      Processing
                    </button>

                    <button
                      className={`${(variants.button as any).primary.default()} flex items-center`}
                      disabled
                    >
                      <div className="animate-pulse h-4 w-4 bg-primary-foreground rounded-full mr-2"></div>
                      Uploading...
                    </button>
                  </div>

                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="loading-buttons"
                    code={`import { variants } from '@sudobility/design';

// Loading button with spinner (spinner uses border-primary-foreground on primary bg)
<button
  className={variants.button.primary.default()}
  disabled={isLoading}
>
  {isLoading ? (
    <div className="flex items-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
      Loading...
    </div>
  ) : (
    'Click to Load'
  )}
</button>

// Always loading state (secondary button -> border-secondary-foreground)
<button className={\`\${variants.button.secondary.default()} flex items-center\`} disabled>
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground mr-2"></div>
  Processing
</button>`}
                  />
                </div>

                {/* Progress Bars */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>3. Progress Indicators</h3>
                  <div className="space-y-4 p-6 bg-muted rounded-lg mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{demoStates.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${demoStates.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      className={(variants.button as any).secondary.default()}
                      onClick={startProgressDemo}
                    >
                      Start Progress Demo
                    </button>

                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-success to-primary h-1 rounded-full animate-pulse"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>

                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="progress-bars"
                    code={`// Basic progress bar (track bg-muted, fill bg-primary)
<div className="w-full bg-muted rounded-full h-2">
  <div
    className="bg-primary h-2 rounded-full transition-all duration-300"
    style={{ width: \`\${progress}%\` }}
  ></div>
</div>

// With percentage display
<div className="flex justify-between text-sm mb-2">
  <span>Progress</span>
  <span>{progress}%</span>
</div>

// Gradient animated progress (semantic gradient stops)
<div className="w-full bg-muted rounded-full h-1">
  <div className="bg-gradient-to-r from-success to-primary h-1 rounded-full animate-pulse" style={{ width: '65%' }}></div>
</div>`}
                  />
                </div>

                {/* Skeleton Loading */}
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>4. Skeleton Loading</h3>
                  <div className="p-6 bg-muted rounded-lg mb-4">
                    <div className="animate-pulse">
                      <div className="flex space-x-4">
                        <div className="rounded-full bg-muted-foreground/20 h-12 w-12"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-muted-foreground/20 rounded"></div>
                            <div className="h-3 bg-muted-foreground/20 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="skeleton-loading"
                    code={`// Skeleton loading for cards/lists
<div className="animate-pulse">
  <div className="flex space-x-4">
    <div className="rounded-full bg-muted-foreground/20 h-12 w-12"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-muted-foreground/20 rounded"></div>
        <div className="h-3 bg-muted-foreground/20 rounded w-5/6"></div>
      </div>
    </div>
  </div>
</div>`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Web3 Loading Patterns */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="web3"
              title="⚡ Web3 Loading Patterns"
              description="Specialized loading states for Web3 operations including wallet connections, transactions, and blockchain confirmations."
            />

            {expandedSections['web3'] && (
              <div className="space-y-8">
                {/* Transaction States */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    Transaction Loading States
                  </h3>
                  <div className="space-y-4 p-6 bg-muted rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <button
                        className={(variants.button as any).primary.default()}
                        onClick={startTransactionDemo}
                        disabled={demoStates.transactionState !== 'idle'}
                      >
                        Start Transaction Demo
                      </button>
                      <span className="text-sm text-muted-foreground">
                        Current state: {demoStates.transactionState}
                      </span>
                    </div>

                    {demoStates.transactionState === 'pending' && (
                      <div className={(variants.alert as any).info()}>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        <div>
                          <div className="font-medium">Transaction Pending</div>
                          <div className="text-sm">
                            Please confirm the transaction in your wallet...
                          </div>
                        </div>
                      </div>
                    )}

                    {demoStates.transactionState === 'confirming' && (
                      <div className={(variants.alert as any).warning()}>
                        <ClockIcon className="h-5 w-5 animate-pulse" />
                        <div>
                          <div className="font-medium">Confirming Transaction</div>
                          <div className="text-sm">
                            Transaction submitted. Waiting for blockchain confirmation...
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Hash: 0x1234...abcd
                          </div>
                        </div>
                      </div>
                    )}

                    {demoStates.transactionState === 'confirmed' && (
                      <div className={(variants.alert as any).success()}>
                        <CheckCircleIcon className="h-5 w-5" />
                        <div>
                          <div className="font-medium">Transaction Confirmed</div>
                          <div className="text-sm">
                            Your transaction has been confirmed on the blockchain!
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Block: #18,234,567
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Wallet Connection */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>Wallet Connection States</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className={`${variants.card.default.padded()} space-y-4`}>
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                      <div className="text-center">
                        <h4 className="font-medium">Connecting Wallet</h4>
                        <p className="text-sm text-muted-foreground">
                          Please approve the connection in your wallet
                        </p>
                      </div>
                    </div>

                    <div className={`${variants.card.default.padded()} space-y-4`}>
                      <div className="flex items-center justify-center py-8">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                          <div
                            className="w-3 h-3 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-3 h-3 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="font-medium">Detecting Network</h4>
                        <p className="text-sm text-muted-foreground">
                          Checking network compatibility...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email/Message Loading */}
                <div>
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>Email & Message Loading</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-success"></div>
                      <div>
                        <p className="font-medium">Encrypting message...</p>
                        <p className="text-sm text-muted-foreground">
                          Securing your email with Web3 encryption
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <EnvelopeIcon className="h-6 w-6 text-primary animate-pulse" />
                      <div>
                        <p className="font-medium">Sending to blockchain...</p>
                        <p className="text-sm text-muted-foreground">
                          Recording email metadata on-chain
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upload Progress</span>
                        <span>{demoStates.uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${demoStates.uploadProgress}%` }}
                        ></div>
                      </div>
                      <button
                        className={(variants.button as any).secondary.small()}
                        onClick={startUploadDemo}
                        disabled={demoStates.isUploading}
                      >
                        {demoStates.isUploading ? 'Uploading...' : 'Start Upload Demo'}
                      </button>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  copyKey="web3-loading-patterns"
                  code={`// Transaction states
{transactionState === 'pending' && (
  <div className={variants.alert.info()}>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
    <div>
      <div className="font-medium">Transaction Pending</div>
      <div className="text-sm">Please confirm the transaction in your wallet...</div>
    </div>
  </div>
)}

// Wallet connection loading
<div className="flex items-center justify-center py-8">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
</div>
<div className="text-center">
  <h4 className="font-medium">Connecting Wallet</h4>
  <p className="text-sm text-muted-foreground">Please approve the connection in your wallet</p>
</div>

// Bouncing dots loader
<div className="flex space-x-1">
  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
</div>

// Upload progress with gradient (track bg-muted, semantic gradient stops)
<div className="w-full bg-muted rounded-full h-2">
  <div
    className="bg-gradient-to-r from-primary to-success h-2 rounded-full transition-all duration-300"
    style={{ width: \`\${uploadProgress}%\` }}
  ></div>
</div>`}
                />
              </div>
            )}
          </div>

          {/* Skeleton Patterns */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="skeletons"
              title="💀 Skeleton Patterns"
              description="Content placeholders that mimic the structure of the loading content for better perceived performance."
            />

            {expandedSections['skeletons'] && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Email List Skeleton */}
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-4`}>Email List Skeleton</h4>
                    <div className="space-y-3 p-4 border rounded-lg">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex space-x-3">
                          <div className="rounded-full bg-muted-foreground/20 h-10 w-10"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                            <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                          </div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-16"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Skeleton */}
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-4`}>Card Content Skeleton</h4>
                    <div className="animate-pulse p-4 border rounded-lg">
                      <div className="h-32 bg-muted-foreground/20 rounded mb-4"></div>
                      <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted-foreground/20 rounded"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  copiedStates={copiedStates}
                  copyToClipboard={copyToClipboard}
                  copyKey="skeleton-patterns"
                  code={`// Email list skeleton
<div className="space-y-3">
  {[1, 2, 3].map((i) => (
    <div key={i} className="animate-pulse flex space-x-3">
      <div className="rounded-full bg-muted-foreground/20 h-10 w-10"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
        <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
      </div>
      <div className="h-3 bg-muted-foreground/20 rounded w-16"></div>
    </div>
  ))}
</div>

// Card skeleton
<div className="animate-pulse p-4 border rounded-lg">
  <div className="h-32 bg-muted-foreground/20 rounded mb-4"></div>
  <div className="h-6 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
  <div className="space-y-2">
    <div className="h-4 bg-muted-foreground/20 rounded"></div>
    <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
  </div>
</div>`}
                />
              </div>
            )}
          </div>

          {/* Accessibility Section */}
          <div className={`${variants.card.elevated.padded()} mb-12`}>
            <SectionHeader
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              id="accessibility"
              title="♿ Accessibility Guidelines"
              description="Ensure your loading states are accessible with proper ARIA attributes, screen reader support, and focus management."
            />

            {expandedSections['accessibility'] && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>✅ Best Practices</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Use ARIA live regions for dynamic loading states
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Provide meaningful loading messages</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Include progress information when possible</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Use reduced motion for users who prefer it</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Maintain focus management during loading</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={`${textVariants.heading.h4()} mb-4`}>❌ Avoid</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Loading indicators without text alternatives
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Indefinite loading without progress indication
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Fast-flashing animations that can trigger seizures
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Removing focus or content without warning</span>
                      </li>
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          Generic "Loading..." messages without context
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`${textVariants.heading.h4()} mb-4`}>
                    Accessibility Implementation
                  </h3>
                  <CodeBlock
                    copiedStates={copiedStates}
                    copyToClipboard={copyToClipboard}
                    copyKey="accessibility-examples"
                    code={`// Loading with ARIA live region
<div 
  role="status" 
  aria-live="polite"
  aria-label="Loading transaction details"
>
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  <span className="sr-only">Loading transaction details, please wait...</span>
</div>

// Progress with accessible labeling
<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
  <div className="w-full bg-muted rounded-full h-2">
    <div
      className="bg-primary h-2 rounded-full transition-all duration-300"
      style={{ width: \`\${progress}%\` }}
    ></div>
  </div>
  <span className="sr-only">{progress}% complete</span>
</div>

// Reduced motion support
<div className="animate-spin motion-reduce:animate-pulse rounded-full h-8 w-8 border-b-2 border-primary"></div>

// Loading button with proper states
<button
  type="button"
  disabled={isLoading}
  aria-describedby={isLoading ? "loading-description" : undefined}
>
  {isLoading && (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" aria-hidden="true"></div>
  )}
  {isLoading ? 'Processing...' : 'Submit'}
</button>
{isLoading && (
  <div id="loading-description" className="sr-only">
    Your transaction is being processed. Please do not close this page.
  </div>
)}`}
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
      </div>
    </>
  );
};

export default LoadingStatesPage;
