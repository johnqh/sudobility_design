import React, { useState } from "react";
import {
  EyeIcon,
  HandRaisedIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  CursorArrowRaysIcon,
  AdjustmentsHorizontalIcon,
  SpeakerWaveIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Card, CardContent } from "@sudobility/components";
import { ui, textVariants, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const AccessibilityPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [_highContrast, _setHighContrast] = useState(false);
  const [showSkipLink, setShowSkipLink] = useState(false);

  return (
    <>
      <SEOHead
        title={`Accessibility & A11Y - Design System - Internal - ${emailDomain}`}
        description="Comprehensive accessibility patterns and inclusive design utilities for WCAG compliance"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-info/10 px-4 py-2 rounded-full mb-6">
              <EyeIcon className="h-5 w-5 text-info mr-2" />
              <span className="text-info font-semibold">
                Accessibility & A11Y
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Inclusive Design System
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
            >
              Comprehensive accessibility patterns and utilities for building
              inclusive, WCAG-compliant Web3 applications. These patterns ensure
              equal access for all users, including those using assistive
              technologies.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  WCAG 2.1
                </div>
                <div className={textVariants.caption.default()}>
                  AA Compliant
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  44px+
                </div>
                <div className={textVariants.caption.default()}>
                  Touch Targets
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-accent mb-1`}
                >
                  4.5:1
                </div>
                <div className={textVariants.caption.default()}>
                  Color Contrast
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-warning mb-1`}
                >
                  Screen Reader
                </div>
                <div className={textVariants.caption.default()}>Compatible</div>
              </div>
            </div>
          </div>

          {/* Accessibility Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Screen Reader Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <SpeakerWaveIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    Screen Reader Support
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  Comprehensive screen reader patterns including skip links,
                  aria labels, and semantic HTML.
                </p>

                <div className="space-y-4">
                  {/* Skip Link Demo */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Skip Link
                    </h4>
                    <div className="bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground overflow-x-auto">
                        {`// Screen Reader Skip Link
<a href="#main-content" 
   className={variants.accessibility.screenReader.skipLink()}>
  Skip to main content
</a>

// Output Classes:
sr-only focus:not-sr-only focus:absolute focus:top-0 
focus:left-0 focus:z-50 focus:px-4 focus:py-2 
focus:bg-blue-600 focus:text-white focus:rounded 
focus:m-2 focus:no-underline`}
                      </pre>
                    </div>
                    <button
                      onFocus={() => setShowSkipLink(true)}
                      onBlur={() => setShowSkipLink(false)}
                      className={variants.accessibility.screenReader.skipLink()}
                    >
                      Skip Link (Focus to see)
                    </button>
                    {showSkipLink && (
                      <p className="text-sm text-success mt-2">
                        ✓ Skip link is now visible! This helps keyboard users
                        navigate quickly.
                      </p>
                    )}
                  </div>

                  {/* Screen Reader Only Content */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Screen Reader Only Content
                    </h4>
                    <div className="bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`<span className={variants.accessibility.screenReader.only()}>
  This text is only visible to screen readers
</span>`}
                      </pre>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This content provides context for screen readers without
                      cluttering the visual design.
                      <span
                        className={variants.accessibility.screenReader.only()}
                      >
                        This text is only visible to screen readers
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Management */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CursorArrowRaysIcon
                    className={`${variants.icon.size.lg()} text-accent mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    Focus Management
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  Clear focus indicators and keyboard navigation patterns for
                  all interactive elements.
                </p>

                <div className="space-y-4">
                  {/* Focus Ring Examples */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Focus Indicators
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="default"
                        className={variants.accessibility.focus.ring()}
                      >
                        Standard Focus
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.accessibility.focus.highContrast()}
                      >
                        High Contrast
                      </Button>
                      <Button
                        variant="default"
                        className={variants.accessibility.focus.wallet()}
                      >
                        Web3 Wallet
                      </Button>
                      <Button
                        variant="destructive"
                        className={variants.accessibility.focus.error()}
                      >
                        Error State
                      </Button>
                    </div>
                    <div className="mt-4 bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`// Focus Ring Variants
variants.accessibility.focus.ring()        // Standard
variants.accessibility.focus.highContrast() // High contrast
variants.accessibility.focus.wallet()      // Web3 specific
variants.accessibility.focus.error()       // Error states`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Contrast */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <AdjustmentsHorizontalIcon
                    className={`${variants.icon.size.lg()} text-success mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>Color Contrast</h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  High contrast text and background combinations that exceed
                  WCAG AA requirements.
                </p>

                <div className="space-y-4">
                  {/* Contrast Examples */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Text Contrast Levels
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.high()}`}
                      >
                        High contrast text (WCAG AAA) - Ratio 7:1+
                      </div>
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.medium()}`}
                      >
                        Medium contrast text (WCAG AA) - Ratio 4.5:1+
                      </div>
                      <div
                        className={`p-3 rounded ${variants.accessibility.contrast.text.low()}`}
                      >
                        Low contrast text (for secondary content)
                      </div>
                    </div>

                    <h4 className={`${textVariants.heading.h5()} mb-3 mt-6`}>
                      High Contrast Backgrounds
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.primary()}`}
                      >
                        Primary
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.success()}`}
                      >
                        Success
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.warning()}`}
                      >
                        Warning
                      </div>
                      <div
                        className={`p-3 rounded text-center ${variants.accessibility.contrast.background.error()}`}
                      >
                        Error
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Contrast Utilities
variants.accessibility.contrast.text.high()
variants.accessibility.contrast.background.primary()
variants.accessibility.contrast.link.default()`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Motion Preferences */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <BoltIcon
                    className={`${variants.icon.size.lg()} text-warning mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    Motion Preferences
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  Animations that respect user motion preferences and provide
                  alternatives for users with vestibular disorders.
                </p>

                <div className="space-y-4">
                  {/* Motion Controls */}
                  <div className="border rounded-lg p-4">
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Motion Preference Controls
                    </h4>
                    <div className="flex items-center space-x-4 mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={reducedMotion}
                          onChange={(e) => setReducedMotion(e.target.checked)}
                          className="mr-2"
                        />
                        Reduce Motion
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        className={
                          reducedMotion
                            ? variants.accessibility.motion.reduceMotion()
                            : variants.animations.hover.button.lift()
                        }
                      >
                        {reducedMotion ? "No Animation" : "Animated Button"}
                      </Button>
                      <div
                        className={`w-8 h-8 bg-primary rounded mx-auto ${
                          reducedMotion
                            ? variants.accessibility.motion.loading.spin()
                            : "animate-spin"
                        }`}
                      ></div>
                    </div>

                    <div className="mt-4 bg-muted p-4 rounded border">
                      <pre className="text-xs text-foreground">
                        {`// Motion-Safe Animations
variants.accessibility.motion.respectPrefers()
variants.accessibility.motion.safe.fade()
variants.accessibility.motion.loading.spin()

// CSS Output:
motion-safe:transition-all motion-safe:duration-300 
motion-reduce:transition-none`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Accessibility */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <HandRaisedIcon
                  className={`${variants.icon.size.lg()} text-primary mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  Form Accessibility
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                Accessible form patterns with proper labeling, validation, and
                error handling.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Required Field Indicators
                  </h4>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="email-field"
                        className={`block text-sm font-medium mb-1 ${variants.accessibility.form.required.visual()}`}
                      >
                        Email Address
                      </label>
                      <input
                        id="email-field"
                        type="email"
                        className={`w-full px-3 py-2 border border-input rounded-md focus:outline-none ${variants.accessibility.focus.ring()}`}
                        aria-required="true"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password-field"
                        className={`block text-sm font-medium mb-1 ${variants.accessibility.form.required.visual()}`}
                      >
                        Password
                      </label>
                      <input
                        id="password-field"
                        type="password"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${variants.accessibility.form.validation.invalid()}`}
                        aria-invalid="true"
                        aria-describedby="password-error"
                      />
                      <div
                        id="password-error"
                        className={`mt-1 ${variants.accessibility.feedback.error.message()}`}
                        role="alert"
                        aria-live="polite"
                      >
                        Password must be at least 8 characters long
                      </div>
                    </div>
                  </form>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Code Examples
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground overflow-x-auto">
                      {`// Required Field Visual Indicator
variants.accessibility.form.required.visual()
// Output: after:content-["*"] after:ml-1 after:text-red-500

// Form Validation States
variants.accessibility.form.validation.valid()
variants.accessibility.form.validation.invalid()
variants.accessibility.form.validation.pending()

// Error Message
variants.accessibility.feedback.error.container()
variants.accessibility.feedback.error.message()`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Messages */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftRightIcon
                  className={`${variants.icon.size.lg()} text-warning mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  Accessible Feedback
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                Screen reader-friendly feedback messages with appropriate ARIA
                live regions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Message Types
                  </h4>
                  <div className="space-y-4">
                    <div
                      className={variants.accessibility.feedback.success.container()}
                    >
                      <div className="flex">
                        <CheckCircleIcon
                          className={`h-5 w-5 ${variants.accessibility.feedback.success.title()} mr-2 flex-shrink-0`}
                        />
                        <div>
                          <h5
                            className={variants.accessibility.feedback.success.title()}
                          >
                            Success
                          </h5>
                          <p
                            className={variants.accessibility.feedback.success.message()}
                          >
                            Your wallet has been connected successfully!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={variants.accessibility.feedback.error.container()}
                    >
                      <div className="flex">
                        <XCircleIcon
                          className={`h-5 w-5 ${variants.accessibility.feedback.error.title()} mr-2 flex-shrink-0`}
                        />
                        <div>
                          <h5
                            className={variants.accessibility.feedback.error.title()}
                          >
                            Error
                          </h5>
                          <p
                            className={variants.accessibility.feedback.error.message()}
                          >
                            Transaction failed. Please try again.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Live Region Patterns
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Live Regions for Dynamic Content
<div className={variants.accessibility.feedback.liveRegion.polite()}>
  Status updates appear here
</div>

<div className={variants.accessibility.feedback.liveRegion.assertive()}>
  Urgent alerts appear here  
</div>

<div className={variants.accessibility.feedback.liveRegion.status()}>
  Loading states and progress
</div>`}
                    </pre>
                  </div>

                  {/* Live region examples */}
                  <div
                    className={variants.accessibility.feedback.liveRegion.polite()}
                  >
                    This content will be announced politely to screen readers
                  </div>
                  <div
                    className={variants.accessibility.feedback.liveRegion.assertive()}
                  >
                    This content will interrupt screen readers for important
                    alerts
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Web3 Accessibility */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <GlobeAltIcon
                  className={`${variants.icon.size.lg()} text-info mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  Web3 Accessibility
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                Specialized accessibility patterns for Web3 applications
                including wallet connections and transactions.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Web3 Components
                  </h4>
                  <div className="space-y-4">
                    <Button
                      className={variants.accessibility.focus.wallet()}
                      aria-label="Connect your Web3 wallet"
                    >
                      Connect Wallet
                    </Button>

                    <div
                      className={variants.accessibility.semantic.web3.transaction()}
                      aria-label="Transaction Status"
                    >
                      Transaction pending...
                    </div>

                    <div
                      className={variants.accessibility.semantic.web3.balance()}
                      aria-label="Account balance is 1.5 ETH"
                    >
                      1.5 ETH
                    </div>

                    <code
                      className={`text-sm font-mono ${variants.accessibility.semantic.web3.address()}`}
                      aria-label="Wallet address 0x1234...5678"
                    >
                      0x1234...5678
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Implementation
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground">
                      {`// Web3 Semantic Patterns
<button className={variants.accessibility.semantic.web3.wallet()}>
  Connect Wallet
</button>

<div className={variants.accessibility.semantic.web3.transaction()}>
  Transaction Status
</div>

<span className={variants.accessibility.semantic.web3.balance()}>
  Account Balance  
</span>

<code className={variants.accessibility.semantic.web3.address()}>
  Wallet Address
</code>`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckCircleIcon
                  className={`${variants.icon.size.lg()} text-success mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>Best Practices</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    ✅ Do This
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Use semantic HTML elements (button, nav, main, etc.)
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Provide descriptive aria-labels for interactive elements
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Ensure minimum 44px touch targets on mobile
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Test with keyboard-only navigation
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Respect user's motion preferences
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Provide alternative text for complex Web3 concepts
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    ❌ Avoid This
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Using color alone to convey information
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Creating keyboard traps without escape routes
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Auto-playing videos or animations
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Using generic labels like "Click here" or "Read more"
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Removing focus indicators completely
                    </li>
                    <li className="flex items-start">
                      <XCircleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Using Web3 jargon without explanations
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPage;
