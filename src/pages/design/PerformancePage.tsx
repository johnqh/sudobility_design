import { textVariants, ui, variants } from "@sudobility/design";
import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Card, CardContent } from "@sudobility/components";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const PerformancePage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [connectionSpeed, setConnectionSpeed] = useState<
    "fast" | "slow" | "offline"
  >("fast");
  const [webVitalsScore, setWebVitalsScore] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
  });
  const [networkLatency, setNetworkLatency] = useState(0);

  // Simulate performance metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setWebVitalsScore({
        lcp: Math.random() * 4000, // Largest Contentful Paint in ms
        fid: Math.random() * 300, // First Input Delay in ms
        cls: Math.random() * 0.25, // Cumulative Layout Shift
      });
      setNetworkLatency(Math.random() * 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVitalsRating = (metric: string, value: number) => {
    switch (metric) {
      case "lcp":
        if (value <= 2500) return "good";
        if (value <= 4000) return "needsImprovement";
        return "poor";
      case "fid":
        if (value <= 100) return "good";
        if (value <= 300) return "needsImprovement";
        return "poor";
      case "cls":
        if (value <= 0.1) return "good";
        if (value <= 0.25) return "needsImprovement";
        return "poor";
      default:
        return "good";
    }
  };

  const simulateSlowConnection = () => {
    setConnectionSpeed("slow");
    setTimeout(() => setConnectionSpeed("fast"), 5000);
  };

  return (
    <>
      <SEOHead
        title={`Performance & Optimization - Design System - Internal - ${emailDomain}`}
        description="Performance optimization patterns and Core Web Vitals utilities for fast, efficient Web3 applications"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-success/10 px-4 py-2 rounded-full mb-6">
              <RocketLaunchIcon className="h-5 w-5 text-success mr-2" />
              <span className="text-success font-semibold">
                Performance & Optimization
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Performance Optimization System
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
            >
              Comprehensive performance patterns for fast-loading, efficient
              Web3 applications. Optimize bundle size, rendering performance,
              Core Web Vitals, and blockchain interactions.
            </p>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-success mb-1`}
                >
                  Bundle Split
                </div>
                <div className={textVariants.caption.default()}>
                  Code Chunks
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-primary mb-1`}
                >
                  GPU Layers
                </div>
                <div className={textVariants.caption.default()}>
                  Hardware Acceleration
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-accent mb-1`}
                >
                  Web3 Batch
                </div>
                <div className={textVariants.caption.default()}>
                  Transaction Batching
                </div>
              </div>
              <div className={`${ui.background.subtle} rounded-lg p-4`}>
                <div
                  className={`${textVariants.heading.h4()} text-secondary mb-1`}
                >
                  &lt; 2.5s
                </div>
                <div className={textVariants.caption.default()}>LCP Target</div>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <ChartBarIcon
                    className={`${variants.icon.size.lg()} text-primary mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>Core Web Vitals</h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  Real-time monitoring of Core Web Vitals metrics with
                  performance optimization utilities.
                </p>

                <div className="space-y-4">
                  {/* LCP */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        Largest Contentful Paint
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Time to render largest element
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("lcp", webVitalsScore.lcp)
                      ]()}`}
                    >
                      {Math.round(webVitalsScore.lcp)}ms
                    </div>
                  </div>

                  {/* FID */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        First Input Delay
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Time to interactive response
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("fid", webVitalsScore.fid)
                      ]()}`}
                    >
                      {Math.round(webVitalsScore.fid)}ms
                    </div>
                  </div>

                  {/* CLS */}
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className={`${textVariants.heading.h5()}`}>
                        Cumulative Layout Shift
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Visual stability score
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded ${variants.performance.monitoring.metrics[
                        getVitalsRating("cls", webVitalsScore.cls)
                      ]()}`}
                    >
                      {webVitalsScore.cls.toFixed(3)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-muted p-4 rounded border">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    {`// Core Web Vitals Optimization
variants.performance.webVitals.lcp.optimize()
variants.performance.webVitals.interactivity.optimize()
variants.performance.webVitals.layoutStability.stable()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <BoltIcon
                    className={`${variants.icon.size.lg()} text-warning mr-3`}
                  />
                  <h2 className={textVariants.heading.h3()}>
                    Bundle Optimization
                  </h2>
                </div>

                <p
                  className={`${textVariants.body.md()} text-muted-foreground mb-6`}
                >
                  Code splitting and lazy loading patterns to reduce initial
                  bundle size.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Lazy Loading States
                    </h4>
                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded ${variants.performance.bundle.lazy.component()}`}
                      >
                        <p className="text-sm">Component loading...</p>
                      </div>
                      <div
                        className={`p-3 rounded ${variants.performance.bundle.lazy.componentLoaded()}`}
                      >
                        <p className="text-sm">Component loaded ✓</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Code Splitting Example
                    </h4>
                    <div
                      className={`p-3 rounded border ${variants.performance.bundle.splitting.fallback()}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin mr-2`}
                        ></div>
                        Loading design system chunk...
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Bundle Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-success/10 rounded">
                        <span className="font-medium">Main Bundle:</span> 245KB
                      </div>
                      <div className="p-2 bg-primary/10 rounded">
                        <span className="font-medium">Design System:</span>{" "}
                        128KB
                      </div>
                      <div className="p-2 bg-accent/10 rounded">
                        <span className="font-medium">Web3 Utils:</span> 89KB
                      </div>
                      <div className="p-2 bg-warning/10 rounded">
                        <span className="font-medium">Charts:</span> 56KB
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Optimization */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <GlobeAltIcon
                  className={`${variants.icon.size.lg()} text-accent mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  Network Optimization
                </h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                Adaptive loading strategies based on connection quality and
                caching patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Connection Quality
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded ${variants.performance.network.connection[
                        connectionSpeed
                      ]()}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Current Connection</span>
                        <span className="font-medium capitalize">
                          {connectionSpeed}
                        </span>
                      </div>
                      <div className="text-sm opacity-75 mt-1">
                        Latency: ~{Math.round(networkLatency)}ms
                      </div>
                    </div>

                    <Button onClick={simulateSlowConnection} variant="outline">
                      Simulate Slow Connection
                    </Button>
                  </div>

                  <h4 className={`${textVariants.heading.h5()} mb-3 mt-6`}>
                    Cache Status
                  </h4>
                  <div className="space-y-2">
                    <div
                      className={variants.performance.network.cache.cached()}
                    >
                      <div className="p-3">
                        <span
                          className={variants.performance.network.cache.fresh()}
                        >
                          Fresh Data
                        </span>{" "}
                        - Recently fetched
                      </div>
                    </div>
                    <div
                      className={variants.performance.network.cache.updating()}
                    >
                      <div className="p-3">
                        <span
                          className={variants.performance.network.cache.stale()}
                        >
                          Stale Data
                        </span>{" "}
                        - Needs refresh
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Implementation
                  </h4>
                  <div className="bg-muted p-4 rounded border">
                    <pre className="text-xs text-foreground overflow-x-auto">
                      {`// Network Quality Detection
variants.performance.network.connection.fast()
variants.performance.network.connection.slow()  
variants.performance.network.connection.offline()

// Cache Status Indicators
variants.performance.network.cache.cached()
variants.performance.network.cache.fresh()
variants.performance.network.cache.stale()`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Web3 Performance */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <SparklesIcon
                  className={`${variants.icon.size.lg()} text-accent mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>Web3 Performance</h2>
              </div>

              <p
                className={`${textVariants.body.md()} text-muted-foreground mb-6`}
              >
                Specialized optimizations for blockchain interactions, wallet
                connections, and transaction batching.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Wallet Connection
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded border ${variants.performance.web3.wallet.cached()}`}
                    >
                      <div className="flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2 text-success" />
                        Cached Connection
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border ${variants.performance.web3.wallet.connecting()}`}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Connecting...
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Transaction Batching
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={variants.performance.web3.transaction.batched()}
                    >
                      <div className="p-3">
                        <div className="flex items-center">
                          <BoltIcon className="w-4 h-4 mr-2" />
                          Batched Transactions
                        </div>
                        <div className="text-sm opacity-75 mt-1">
                          5 txs → 1 multicall
                        </div>
                      </div>
                    </div>
                    <div
                      className={variants.performance.web3.transaction.individual()}
                    >
                      <div className="p-3">
                        <div className="flex items-center">
                          <ArrowPathIcon className="w-4 h-4 mr-2" />
                          Individual Transaction
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-3`}>
                    Gas Optimization
                  </h4>
                  <div className="space-y-3">
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasOptimal()}`}
                    >
                      Optimal Gas: 15 gwei
                    </div>
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasHigh()}`}
                    >
                      High Gas: 45 gwei
                    </div>
                    <div
                      className={`text-center p-2 rounded ${variants.performance.web3.transaction.gasVeryHigh()}`}
                    >
                      Very High: 120 gwei
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded border">
                <pre className="text-xs text-foreground overflow-x-auto">
                  {`// Web3 Performance Optimizations
variants.performance.web3.wallet.cached()
variants.performance.web3.transaction.batched()
variants.performance.web3.blockchain.optimistic()

// Gas Price Optimization
variants.performance.web3.transaction.gasOptimal()
variants.performance.web3.transaction.gasHigh()`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CheckIcon
                  className={`${variants.icon.size.lg()} text-success mr-3`}
                />
                <h2 className={textVariants.heading.h3()}>
                  Performance Best Practices
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    ✅ Do This
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Use code splitting for internal/admin features
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Implement lazy loading for images and components
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Batch Web3 transactions when possible
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Use GPU acceleration for smooth animations
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Monitor Core Web Vitals in production
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      Cache wallet connections and blockchain data
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h5()} mb-4`}>
                    ❌ Avoid This
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Loading all components eagerly on initial page load
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Making individual blockchain calls for batch data
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Causing layout shifts with dynamic content
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Using blocking rendering for non-critical features
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Ignoring network conditions for resource loading
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-4 w-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                      Re-fetching already cached blockchain data
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

export default PerformancePage;
