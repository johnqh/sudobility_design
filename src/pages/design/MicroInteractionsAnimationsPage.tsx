import {
  ArrowPathIcon,
  BoltIcon,
  CheckIcon,
  CursorArrowRippleIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { SEOHead } from '@sudobility/seo_lib';
import { Button, Card, CardContent } from '@sudobility/components';
import { textVariants, ui, variants } from '@sudobility/design';

interface AppProps {
  emailDomain: string;
  appName: string;
}

const MicroInteractionsAnimationsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [walletStatus, setWalletStatus] = useState<
    'disconnected' | 'connecting' | 'connected' | 'error'
  >('disconnected');

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateWalletConnection = () => {
    setWalletStatus('connecting');
    setTimeout(() => setWalletStatus('connected'), 2000);
    setTimeout(() => setWalletStatus('disconnected'), 4000);
  };

  return (
    <>
      <SEOHead
        title={`Micro-Interactions & Animations - Design System - Internal - ${emailDomain}`}
        description="Comprehensive animation system with hover effects, transitions, and Web3-specific interactions"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
              <CursorArrowRippleIcon className="h-5 w-5 text-accent mr-2" />
              <span className="text-accent font-semibold">Micro-Interactions & Animations</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Micro-Interactions & Animations
            </h1>

            <p className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}>
              Comprehensive animation system with hover effects, loading states, transitions, and
              Web3-specific interactions. All animations respect user motion preferences and provide
              smooth, delightful user experiences.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-accent mb-1`}>200+</div>
                <div className={textVariants.caption.default()}>Animation Variants</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-primary mb-1`}>60fps</div>
                <div className={textVariants.caption.default()}>Smooth Performance</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-success mb-1`}>A11Y</div>
                <div className={textVariants.caption.default()}>Motion Safe</div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div className={`${textVariants.heading.h4()} text-secondary mb-1`}>Web3</div>
                <div className={textVariants.caption.default()}>Specialized</div>
              </div>
            </div>
          </div>

          {/* Hover Effects Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <CursorArrowRippleIcon
                    className={`${variants.icon.size.lg()} text-accent mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>Hover Effects</h2>
                </div>

                <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
                  Subtle but engaging hover effects for buttons, cards, and interactive elements.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>Button Hover Effects</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="default" className={variants.animations.hover.button.lift()}>
                        Lift Effect
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.animations.hover.button.glow()}
                      >
                        Glow Effect
                      </Button>
                      <Button
                        variant="default"
                        className={variants.animations.hover.button.scale()}
                      >
                        Scale Effect
                      </Button>
                      <Button
                        variant="secondary"
                        className={variants.animations.hover.button.shimmer()}
                      >
                        Shimmer Effect
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>Card Hover Effects</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div
                        className={`p-4 border rounded-lg ${variants.animations.hover.card.subtle()}`}
                      >
                        <p className="text-sm">Subtle hover effect - lifts gently</p>
                      </div>
                      <div
                        className={`p-4 border rounded-lg ${variants.animations.hover.card.glow()}`}
                      >
                        <p className="text-sm">Glow hover effect - adds soft glow</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Hover Effect Examples
variants.animations.hover.button.lift()
variants.animations.hover.button.glow() 
variants.animations.hover.card.subtle()
variants.animations.hover.icon.bounce()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <ArrowPathIcon className={`${variants.icon.size.lg()} text-primary mr-3`} />
                  <h2 className={textVariants.heading.h3()}>Loading States</h2>
                </div>

                <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
                  Loading animations and progress indicators that keep users engaged.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>Spinners</h4>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 border-2 border-primary border-t-transparent rounded-full ${variants.animations.loading.spinner.default()}`}
                      ></div>
                      <div
                        className={`w-6 h-6 bg-primary rounded-full ${variants.animations.loading.spinner.pulse()}`}
                      ></div>
                      <div
                        className={`w-6 h-6 bg-primary rounded-full ${variants.animations.loading.spinner.bounce()}`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>Interactive Demo</h4>
                    <Button onClick={simulateLoading} disabled={isLoading} className="mb-4">
                      {isLoading ? (
                        <>
                          <div
                            className={`w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                          ></div>
                          Loading...
                        </>
                      ) : (
                        'Start Loading'
                      )}
                    </Button>

                    <div>
                      <Button onClick={simulateProgress} className="mb-2">
                        Simulate Progress
                      </Button>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${variants.animations.loading.progress.bar()}`}
                          style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Progress: {progress}%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Loading Animations
variants.animations.loading.spinner.default()
variants.animations.loading.spinner.pulse()
variants.animations.loading.progress.bar()`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Animations */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <SparklesIcon className={`${variants.icon.size.lg()} text-accent mr-3`} />
                <h2 className={textVariants.heading.h3()}>Web3 Animations</h2>
              </div>

              <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
                Specialized animations for Web3 interactions including wallet connections and
                transaction states.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Wallet Connection States</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={simulateWalletConnection}
                      className={
                        walletStatus === 'connecting'
                          ? variants.animations.web3.wallet.connecting()
                          : walletStatus === 'connected'
                            ? variants.animations.web3.wallet.connected()
                            : variants.animations.hover.button.connect()
                      }
                      disabled={walletStatus === 'connecting'}
                    >
                      {walletStatus === 'connecting' && (
                        <div
                          className={`w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                        ></div>
                      )}
                      {walletStatus === 'connected' && <CheckIcon className="w-4 h-4 mr-2" />}
                      {walletStatus === 'connecting'
                        ? 'Connecting...'
                        : walletStatus === 'connected'
                          ? 'Connected'
                          : 'Connect Wallet'}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                      Status: <span className="font-medium capitalize">{walletStatus}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Transaction States</h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.pending()}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border-2 border-warning border-t-transparent rounded-full ${variants.animations.loading.spinner.default()} mr-2`}
                        ></div>
                        Transaction Pending
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.confirmed()}`}
                    >
                      <div className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2 text-success" />
                        Transaction Confirmed
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${variants.animations.web3.transaction.failed()}`}
                    >
                      <div className="flex items-center">
                        <XMarkIcon className="w-4 h-4 mr-2 text-destructive" />
                        Transaction Failed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Web3 Animation Examples
variants.animations.web3.wallet.connecting()
variants.animations.web3.wallet.connected()
variants.animations.web3.transaction.pending()
variants.animations.web3.transaction.confirmed()`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Motion Preferences */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <BoltIcon className={`${variants.icon.size.lg()} text-warning mr-3`} />
                <h2 className={textVariants.heading.h3()}>Motion Preferences</h2>
              </div>

              <p className={`${textVariants.body.md()} text-muted-foreground mb-6`}>
                All animations respect user motion preferences and provide alternatives for
                accessibility.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Reduced Motion Support</h4>
                  <div className="space-y-3">
                    <Button className={variants.animations.utility.reduced.respectPrefers()}>
                      Respects Motion Preferences
                    </Button>
                    <Button className={variants.animations.utility.reduced.fadeOnly()}>
                      Fade Only Animation
                    </Button>
                    <Button className={variants.animations.utility.reduced.scaleOnly()}>
                      Scale Only Animation
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>Safe Animations</h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 border rounded-lg ${variants.animations.transitions.fade.default()}`}
                    >
                      <p className="text-sm">Safe fade transition</p>
                    </div>
                    <div
                      className={`p-3 border rounded-lg ${variants.animations.transitions.slide.up()}`}
                    >
                      <p className="text-sm">Safe slide transition</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Motion-Safe CSS
variants.animations.utility.reduced.respectPrefers()
// Output: motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none

variants.animations.utility.reduced.fadeOnly()
// Output: transition-opacity duration-300 ease-out`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckIcon className={`${variants.icon.size.lg()} text-success mr-3`} />
                <h2 className={textVariants.heading.h3()}>Animation Best Practices</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>✅ Do This</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Keep animations under 300ms for micro-interactions
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Use easing functions for natural movement
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Provide immediate feedback on user actions
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Respect prefers-reduced-motion settings
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Use loading states for operations &gt; 500ms
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>❌ Avoid This</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Overusing animations - less is more
                    </li>
                    <li className="flex items-start">
                      <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Long loading animations without progress
                    </li>
                    <li className="flex items-start">
                      <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Animations that interfere with functionality
                    </li>
                    <li className="flex items-start">
                      <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Auto-playing animations on page load
                    </li>
                    <li className="flex items-start">
                      <XMarkIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Complex animations for users with motion sensitivities
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

export default MicroInteractionsAnimationsPage;
