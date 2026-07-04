import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  Squares2X2Icon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Section } from "@sudobility/components";
import { cn } from "@sudobility/components";
import { textVariants, ui } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const LayoutSpacingPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [activeBreakpoint, setActiveBreakpoint] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");
  const [selectedContainer, setSelectedContainer] = useState<
    "default" | "narrow" | "wide" | "full"
  >("default");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      title: "Responsive Grid System",
      description: "Flexible grid layouts that adapt to different screen sizes",
      code: `// Responsive Grid
<div className={variants.layout.grid.container()}>
  <div className={variants.layout.grid.responsive()}>
    {/* Auto-fit columns with minimum width */}
    <div className={variants.layout.grid.item()}>
      <div className={variants.layout.card.default()}>
        Card Content
      </div>
    </div>
    <div className={variants.layout.grid.item()}>
      <div className={variants.layout.card.default()}>
        Card Content
      </div>
    </div>
  </div>
</div>

// Specific Column Layouts
<div className={variants.layout.grid.twoColumn()}>
  <div>Left Column</div>
  <div>Right Column</div>
</div>

<div className={variants.layout.grid.threeColumn()}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`,
    },
    {
      title: "Container System",
      description:
        "Responsive containers with consistent max-widths and padding",
      code: `// Container Variants
<div className={variants.layout.container.default()}>
  <div className={variants.layout.container.content()}>
    Standard container with responsive padding
  </div>
</div>

<div className={variants.layout.container.narrow()}>
  <div className={variants.layout.container.content()}>
    Narrow container for focused content
  </div>
</div>

<div className={variants.layout.container.wide()}>
  <div className={variants.layout.container.content()}>
    Wide container for dashboard layouts
  </div>
</div>

<div className={variants.layout.container.fullWidth()}>
  Full-width container with edge-to-edge content
</div>`,
    },
    {
      title: "Flexbox Utilities",
      description: "Common flexbox patterns for component layouts",
      code: `// Flex Patterns
<div className={variants.layout.flex.spaceBetween()}>
  <div>Left Content</div>
  <div>Right Content</div>
</div>

<div className={variants.layout.flex.center()}>
  <div>Centered Content</div>
</div>

<div className={variants.layout.flex.column()}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Web3 Specific
<div className={variants.layout.flex.walletConnect()}>
  <WalletIcon className="h-5 w-5" />
  <span>Connect Wallet</span>
  <ChevronRightIcon className="h-4 w-4 ml-auto" />
</div>`,
    },
    {
      title: "Spacing System",
      description: "Consistent spacing patterns for margins and padding",
      code: `// Spacing Utilities
<div className={variants.layout.spacing.section()}>
  Section with standard vertical spacing
</div>

<div className={variants.layout.spacing.component()}>
  Component with internal padding
</div>

<div className={variants.layout.spacing.stack()}>
  <div>Item with bottom margin</div>
  <div>Item with bottom margin</div>
  <div>Last item</div>
</div>

// Web3 Transaction Layout
<div className={variants.layout.spacing.transaction()}>
  <div className={variants.layout.spacing.transactionHeader()}>
    Transaction Details
  </div>
  <div className={variants.layout.spacing.transactionBody()}>
    Transaction content with proper spacing
  </div>
</div>`,
    },
  ];

  const responsiveExamples = [
    {
      name: "NFT Gallery",
      mobile: "grid-cols-1",
      tablet: "grid-cols-2",
      desktop: "grid-cols-4",
    },
    {
      name: "Dashboard Widgets",
      mobile: "grid-cols-1",
      tablet: "grid-cols-2",
      desktop: "grid-cols-3",
    },
    {
      name: "Transaction History",
      mobile: "grid-cols-1",
      tablet: "grid-cols-1",
      desktop: "grid-cols-2",
    },
  ];

  const containerSizes = [
    {
      name: "Narrow",
      key: "narrow",
      maxWidth: "640px",
      use: "Articles, forms",
    },
    {
      name: "Default",
      key: "default",
      maxWidth: "1024px",
      use: "General content",
    },
    {
      name: "Wide",
      key: "wide",
      maxWidth: "1280px",
      use: "Dashboards, tables",
    },
    {
      name: "Full",
      key: "full",
      maxWidth: "100%",
      use: "Edge-to-edge layouts",
    },
  ];

  return (
    <>
      <SEOHead
        title={`Layout & Spacing - Design System - Internal - ${emailDomain}`}
        description="Layout and spacing system with responsive grids, containers, and Web3-specific patterns"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Squares2X2Icon className="h-5 w-5 text-primary mr-2" />
              <span className="text-primary font-semibold">
                Layout & Spacing
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Layout & Spacing System
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl text-muted-foreground`}
            >
              Comprehensive layout and spacing system with responsive grids,
              flexible containers, and Web3-specific patterns for wallets,
              transactions, and dashboard interfaces.
            </p>
          </div>

          {/* Quick Start Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Quick Start</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {quickStartExamples.map((example, index) => (
                <div
                  key={index}
                  className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
                >
                  <div className="p-6 border-b border-border">
                    <h3 className={`${textVariants.heading.h4()} mb-2`}>
                      {example.title}
                    </h3>
                    <p
                      className={`${textVariants.body.sm()} text-muted-foreground`}
                    >
                      {example.description}
                    </p>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-sm overflow-x-auto bg-muted max-h-96">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code)}
                      className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-card rounded-md shadow-sm border border-border hover:bg-muted transition-colors"
                      title="Copy to clipboard"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Grid System Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Responsive Grid System
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Interactive Grid Examples
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Switch between breakpoints to see how grids adapt
                </p>
              </div>

              <div className="p-6">
                {/* Breakpoint Selector */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-sm font-medium text-foreground">
                    Preview:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveBreakpoint("mobile")}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        activeBreakpoint === "mobile"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <DevicePhoneMobileIcon className="h-4 w-4" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setActiveBreakpoint("tablet")}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        activeBreakpoint === "tablet"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <DeviceTabletIcon className="h-4 w-4" />
                      <span>Tablet</span>
                    </button>
                    <button
                      onClick={() => setActiveBreakpoint("desktop")}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        activeBreakpoint === "desktop"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <ComputerDesktopIcon className="h-4 w-4" />
                      <span>Desktop</span>
                    </button>
                  </div>
                </div>

                {/* Grid Examples */}
                <div className="space-y-8">
                  {responsiveExamples.map((example, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-foreground">
                          {example.name}
                        </h4>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {activeBreakpoint === "mobile" && example.mobile}
                          {activeBreakpoint === "tablet" && example.tablet}
                          {activeBreakpoint === "desktop" && example.desktop}
                        </code>
                      </div>

                      <div
                        className={cn(
                          "grid gap-4",
                          activeBreakpoint === "mobile" && example.mobile,
                          activeBreakpoint === "tablet" && example.tablet,
                          activeBreakpoint === "desktop" && example.desktop,
                        )}
                      >
                        {Array.from({
                          length:
                            activeBreakpoint === "desktop"
                              ? 8
                              : activeBreakpoint === "tablet"
                                ? 4
                                : 2,
                        }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center"
                          >
                            <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-3"></div>
                            <p className="text-sm text-primary font-medium">
                              Item {i + 1}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Container System Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Container System
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Container Variants
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Different container sizes for various content types
                </p>
              </div>

              <div className="p-6">
                {/* Container Selector */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-sm font-medium text-foreground">
                    Container:
                  </span>
                  <div className="flex space-x-2">
                    {containerSizes.map((size) => (
                      <button
                        key={size.key}
                        onClick={() => setSelectedContainer(size.key as any)}
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          selectedContainer === size.key
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Container Info */}
                <div className="mb-6">
                  {containerSizes.map(
                    (size) =>
                      selectedContainer === size.key && (
                        <div
                          key={size.key}
                          className="flex items-center space-x-4 text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">
                              Max Width:
                            </span>
                            <code className="bg-muted px-2 py-1 rounded">
                              {size.maxWidth}
                            </code>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">
                              Best for:
                            </span>
                            <span className="text-foreground">{size.use}</span>
                          </div>
                        </div>
                      ),
                  )}
                </div>

                {/* Container Preview */}
                <div className="border-2 border-dashed border-border p-4">
                  <div
                    className={cn(
                      "mx-auto bg-primary/10 border border-primary/20 rounded-lg p-8",
                      selectedContainer === "narrow" && "max-w-2xl",
                      selectedContainer === "default" && "max-w-4xl",
                      selectedContainer === "wide" && "max-w-5xl",
                      selectedContainer === "full" && "max-w-full",
                    )}
                  >
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-foreground mb-2">
                        {
                          containerSizes.find(
                            (s) => s.key === selectedContainer,
                          )?.name
                        }{" "}
                        Container
                      </h4>
                      <p className="text-muted-foreground">
                        This container adapts to the selected width constraints
                        while maintaining responsive padding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Flexbox Patterns Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Flexbox Patterns
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Common Patterns */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    Common Patterns
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    Standard flexbox layouts for components
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Space Between
                    </label>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div className="w-16 h-8 bg-primary/20 rounded"></div>
                      <div className="w-16 h-8 bg-primary/20 rounded"></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Center
                    </label>
                    <div className="flex justify-center items-center p-3 bg-muted rounded-lg">
                      <div className="w-16 h-8 bg-success/20 rounded"></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Start with Gap
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-12 h-8 bg-accent/20 rounded"></div>
                      <div className="w-12 h-8 bg-accent/20 rounded"></div>
                      <div className="w-12 h-8 bg-accent/20 rounded"></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Column Stack
                    </label>
                    <div className="flex flex-col space-y-2 p-3 bg-muted rounded-lg">
                      <div className="h-6 bg-warning/20 rounded"></div>
                      <div className="h-6 bg-warning/20 rounded"></div>
                      <div className="h-6 bg-warning/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web3 Patterns */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    Web3 Patterns
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    Specialized layouts for blockchain interfaces
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Wallet Connection
                    </label>
                    <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <WalletIcon className="h-5 w-5 text-primary" />
                        <span className="text-foreground font-medium">
                          MetaMask
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-success text-sm">Connected</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Transaction Summary
                    </label>
                    <div className="space-y-3 p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-mono text-foreground">
                          0.5 ETH
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Gas Fee:</span>
                        <span className="font-mono text-foreground">
                          0.002 ETH
                        </span>
                      </div>
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between items-center font-medium">
                          <span className="text-foreground">Total:</span>
                          <span className="font-mono text-foreground">
                            0.502 ETH
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      NFT Card Layout
                    </label>
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="w-full h-32 bg-accent/20 rounded-lg mb-3"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Cool NFT #1234
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Artist Name
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm text-foreground">
                            2.5 ETH
                          </p>
                          <p className="text-xs text-muted-foreground">
                            $4,250
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Spacing System Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Spacing System
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Consistent Spacing Patterns
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Standard spacing utilities for consistent layouts
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Spacing Scale */}
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-4">
                      Spacing Scale
                    </h4>
                    <div className="space-y-4">
                      {[
                        { name: "xs", size: "0.25rem", value: "4px" },
                        { name: "sm", size: "0.5rem", value: "8px" },
                        { name: "md", size: "1rem", value: "16px" },
                        { name: "lg", size: "1.5rem", value: "24px" },
                        { name: "xl", size: "2rem", value: "32px" },
                        { name: "2xl", size: "3rem", value: "48px" },
                        { name: "3xl", size: "4rem", value: "64px" },
                      ].map((spacing) => (
                        <div
                          key={spacing.name}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-16 text-sm font-mono text-muted-foreground">
                            {spacing.name}
                          </div>
                          <div
                            className="bg-primary/20 h-4 rounded"
                            style={{ width: spacing.size }}
                          ></div>
                          <div className="text-sm text-muted-foreground">
                            {spacing.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Component Spacing */}
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-4">
                      Component Spacing
                    </h4>
                    <div className="space-y-6">
                      <div className="p-4 border-2 border-dashed border-border rounded-lg">
                        <div className="bg-primary/10 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-foreground">
                            Section Header
                          </h5>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-muted p-3 rounded">
                            Component 1
                          </div>
                          <div className="bg-muted p-3 rounded">
                            Component 2
                          </div>
                          <div className="bg-muted p-3 rounded">
                            Component 3
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Section spacing:</strong> 32px vertical
                          margins
                        </p>
                        <p>
                          <strong>Component spacing:</strong> 12px between items
                        </p>
                        <p>
                          <strong>Internal padding:</strong> 16px for content
                          areas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Layout Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Web3 Layout Patterns
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Wallet Dashboard */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    Wallet Dashboard
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    Portfolio overview with balance and assets
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Balance Header */}
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <h4 className="text-3xl font-bold text-foreground">
                      $12,456.78
                    </h4>
                    <p className="text-success text-sm mt-1">+2.5% ($298.45)</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <ArrowsPointingOutIcon className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs text-muted-foreground">
                        Send
                      </span>
                    </button>
                    <button className="flex flex-col items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <ArrowsPointingInIcon className="h-5 w-5 text-success mb-1" />
                      <span className="text-xs text-muted-foreground">
                        Receive
                      </span>
                    </button>
                    <button className="flex flex-col items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <CurrencyDollarIcon className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs text-muted-foreground">
                        Swap
                      </span>
                    </button>
                  </div>

                  {/* Asset List */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-foreground">
                      Assets
                    </h5>
                    <div className="space-y-2">
                      {[
                        {
                          symbol: "ETH",
                          name: "Ethereum",
                          amount: "2.45",
                          value: "$4,920.45",
                          change: "+1.2%",
                        },
                        {
                          symbol: "USDC",
                          name: "USD Coin",
                          amount: "7,536.23",
                          value: "$7,536.23",
                          change: "0.0%",
                        },
                      ].map((asset, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-full"></div>
                            <div>
                              <p className="font-medium text-foreground">
                                {asset.symbol}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {asset.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-sm text-foreground">
                              {asset.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {asset.amount} {asset.symbol}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Flow */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>
                    Transaction Flow
                  </h3>
                  <p
                    className={`${textVariants.body.sm()} text-muted-foreground`}
                  >
                    Step-by-step transaction interface
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Step Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div className="flex-1 h-px bg-border"></div>
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div className="flex-1 h-px bg-border"></div>
                    <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Recipient Address
                      </label>
                      <input
                        type="text"
                        placeholder="0x..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full px-3 py-2 pr-16 border border-input rounded-md bg-background text-foreground font-mono"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-muted-foreground text-sm">
                            ETH
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          Balance: 2.45 ETH
                        </span>
                        <button className="text-xs text-primary hover:text-primary/80">
                          Max
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Network Fee:
                        </span>
                        <span className="font-mono">0.002 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-mono font-medium">1.002 ETH</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1">Continue</Button>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default LayoutSpacingPage;
