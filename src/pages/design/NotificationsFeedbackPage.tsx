import { textVariants, ui, variants } from '@sudobility/design';
import { cn } from '@sudobility/components';
import {
  ArrowPathIcon,
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  SignalIcon,
  WalletIcon,
  WifiIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import React, { useEffect, useState, useRef } from 'react';
import { SEOHead } from '@sudobility/seo_lib';
import { Button, Section } from '@sudobility/components';

interface AppProps {
  emailDomain: string;
  appName: string;
}

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface TransactionStatus {
  id: string;
  hash: string;
  status: 'pending' | 'confirming' | 'confirmed' | 'failed';
  type: string;
  amount?: string;
  confirmations?: number;
  maxConfirmations?: number;
}

const NotificationsFeedbackPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const toastIdCounter = useRef(0);
  const [transactions] = useState<TransactionStatus[]>([
    {
      id: '1',
      hash: '0x742d35...5f0bEb7',
      status: 'confirmed',
      type: 'Send ETH',
      amount: '0.5 ETH',
      confirmations: 12,
      maxConfirmations: 12,
    },
    {
      id: '2',
      hash: '0x8f5a91...3c7d2eA',
      status: 'confirming',
      type: 'Swap Tokens',
      amount: '100 USDC',
      confirmations: 3,
      maxConfirmations: 12,
    },
    {
      id: '3',
      hash: '0x1b4e7a...9f2c8d1',
      status: 'pending',
      type: 'Approve Token',
      amount: 'DAI',
    },
  ]);
  const [systemStatus, setSystemStatus] = useState<'online' | 'degraded' | 'offline'>('online');
  const [progress, setProgress] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied!', 'Code copied to clipboard');
  };

  const addToast = (
    type: ToastNotification['type'],
    title: string,
    message: string,
    persistent = false,
    action?: ToastNotification['action']
  ) => {
    // Use ref-based counter instead of Math.random() to avoid impure function during render
    toastIdCounter.current += 1;
    const id = `toast-${toastIdCounter.current}`;
    const newToast: ToastNotification = {
      id,
      type,
      title,
      message,
      duration: persistent ? undefined : 5000,
      persistent,
      action,
    };

    setToasts(prev => [...prev, newToast]);

    if (!persistent) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          addToast('success', 'Complete!', 'Operation completed successfully');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const quickStartExamples = [
    {
      title: 'Toast Notifications',
      description: 'Temporary notifications with auto-dismiss and actions',
      code: `// Toast Notification
const showToast = (type, title, message) => {
  const toast = document.createElement('div');
  toast.className = variants.notifications.toast.container();
  
  toast.innerHTML = \`
    <div class="\${variants.notifications.toast.content()}">
      <div class="\${variants.notifications.toast.icon()} \${variants.notifications.toast[\`\${type}Icon\`]()}">
        <CheckCircleIcon className="h-5 w-5" />
      </div>
      <div class="\${variants.notifications.toast.text()}">
        <div class="\${variants.notifications.toast.title()}">\${title}</div>
        <div class="\${variants.notifications.toast.message()}">\${message}</div>
      </div>
      <button class="\${variants.notifications.toast.closeButton()}">
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  \`;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
};`,
    },
    {
      title: 'Progress Notifications',
      description: 'Show progress for long-running operations',
      code: `// Progress Notification
const ProgressNotification = ({ progress, title, message }) => (
  <div className={variants.notifications.progress.container()}>
    <div className={variants.notifications.progress.content()}>
      <div className={variants.notifications.progress.text()}>
        <h4 className={variants.notifications.progress.title()}>
          {title}
        </h4>
        <p className={variants.notifications.progress.message()}>
          {message}
        </p>
      </div>
      <div className={variants.notifications.progress.bar()}>
        <div 
          className={variants.notifications.progress.fill()}
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <span className={variants.notifications.progress.percentage()}>
        {progress}%
      </span>
    </div>
  </div>
);`,
    },
    {
      title: 'Transaction Status',
      description: 'Web3 transaction progress with confirmations',
      code: `// Transaction Status
const TransactionStatus = ({ transaction }) => (
  <div className={variants.notifications.transaction.container()}>
    <div className={variants.notifications.transaction.icon()}>
      <WalletIcon className="h-5 w-5" />
    </div>
    <div className={variants.notifications.transaction.content()}>
      <div className={variants.notifications.transaction.header()}>
        <span className={variants.notifications.transaction.type()}>
          {transaction.type}
        </span>
        <span className={cn(
          variants.notifications.transaction.status(),
          variants.notifications.transaction[\`status\${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}\`]()
        )}>
          {transaction.status}
        </span>
      </div>
      <div className={variants.notifications.transaction.details()}>
        <code className={variants.notifications.transaction.hash()}>
          {transaction.hash}
        </code>
      </div>
    </div>
  </div>
);`,
    },
    {
      title: 'System Status Indicator',
      description: 'Real-time system and connection status',
      code: `// System Status
const SystemStatus = ({ status, message }) => (
  <div className={cn(
    variants.notifications.status.indicator(),
    variants.notifications.status[\`status\${status.charAt(0).toUpperCase() + status.slice(1)}\`]()
  )}>
    <div className={variants.notifications.status.dot()} />
    <span className={variants.notifications.status.text()}>
      {message}
    </span>
  </div>
);

// Usage
<SystemStatus status="online" message="All systems operational" />
<SystemStatus status="degraded" message="Some features unavailable" />
<SystemStatus status="offline" message="Connection lost" />`,
    },
  ];

  // Simulate system status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: Array<'online' | 'degraded' | 'offline'> = ['online', 'degraded', 'offline'];
      const currentIndex = statuses.indexOf(systemStatus);
      const nextIndex = (currentIndex + 1) % statuses.length;
      setSystemStatus(statuses[nextIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  return (
    <>
      <SEOHead
        title={`Notifications & Feedback - Design System - Internal - ${emailDomain}`}
        description="Notification and feedback components including toasts, progress indicators, and system status"
        noIndex={true}
      />

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              'transform transition-all duration-300 ease-out',
              'bg-card border border-border rounded-lg shadow-lg p-4'
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === 'success' && <CheckCircleIcon className="h-5 w-5 text-success" />}
                {toast.type === 'error' && <XCircleIcon className="h-5 w-5 text-destructive" />}
                {toast.type === 'warning' && (
                  <ExclamationTriangleIcon className="h-5 w-5 text-warning" />
                )}
                {toast.type === 'info' && <InformationCircleIcon className="h-5 w-5 text-info" />}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-foreground">{toast.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{toast.message}</p>
                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className="mt-2 text-sm text-primary hover:text-primary/80"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-info/10 px-4 py-2 rounded-full mb-6">
              <BellIcon className="h-5 w-5 text-info mr-2" />
              <span className="text-info font-semibold">Notifications & Feedback</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Notifications & Feedback System
            </h1>

            <p className={`${textVariants.body.lg()} max-w-3xl text-muted-foreground`}>
              Comprehensive notification and feedback system including toasts, progress indicators,
              transaction status updates, and system status displays for Web3 applications.
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
                    <h3 className={`${textVariants.heading.h4()} mb-2`}>{example.title}</h3>
                    <p className={`${textVariants.body.sm()} text-muted-foreground`}>
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

          {/* Toast Notifications Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Toast Notifications</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Interactive Toast Demos</h3>
                <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                  Click buttons to trigger different types of toast notifications
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Button
                    onClick={() =>
                      addToast(
                        'success',
                        'Transaction Confirmed!',
                        'Your ETH transfer was successful'
                      )
                    }
                    className="bg-success text-success-foreground hover:bg-success/90"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Success
                  </Button>

                  <Button
                    onClick={() =>
                      addToast('error', 'Transaction Failed', 'Insufficient gas for transaction')
                    }
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <XCircleIcon className="h-4 w-4 mr-2" />
                    Error
                  </Button>

                  <Button
                    onClick={() =>
                      addToast('warning', 'High Gas Fees', 'Network congestion detected', false, {
                        label: 'Adjust Gas',
                        onClick: () =>
                          addToast('info', 'Gas Adjusted', 'Gas price updated to 25 gwei'),
                      })
                    }
                    className="bg-warning text-warning-foreground hover:bg-warning/90"
                  >
                    <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                    Warning
                  </Button>

                  <Button
                    onClick={() =>
                      addToast(
                        'info',
                        'New Feature Available',
                        'Multi-chain swaps now supported',
                        true
                      )
                    }
                    variant="outline"
                  >
                    <InformationCircleIcon className="h-4 w-4 mr-2" />
                    Info
                  </Button>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Toast Types & Features
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Success:</strong> Transaction confirmations, completed actions
                    </li>
                    <li>
                      • <strong>Error:</strong> Failed transactions, network errors
                    </li>
                    <li>
                      • <strong>Warning:</strong> High gas fees, security warnings (with actions)
                    </li>
                    <li>
                      • <strong>Info:</strong> New features, system updates (persistent)
                    </li>
                    <li>• Auto-dismiss after 5 seconds (unless persistent)</li>
                    <li>• Optional action buttons for interactive responses</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Progress Indicators Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Progress Indicators</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Linear Progress */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>Linear Progress</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Progress bars for file uploads and operations
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Email Sync Progress
                      </span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">File Upload</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-3/4" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploading document.pdf (2.3 MB)
                    </p>
                  </div>

                  <Button onClick={simulateProgress} variant="outline" className="w-full">
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Simulate Progress
                  </Button>
                </div>
              </div>

              {/* Circular Progress */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>Loading Spinners</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Various loading states and spinners
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">Loading transactions...</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="animate-pulse flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animation-delay-75"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animation-delay-150"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Connecting to wallet...</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-border"></div>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-transparent border-t-success absolute top-0 left-0"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Syncing blockchain data...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Transaction Status Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Web3 Transaction Status</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Transaction Tracker</h3>
                <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                  Real-time transaction status with confirmation progress
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-full flex items-center justify-center',
                              tx.status === 'confirmed' && 'bg-success/10',
                              tx.status === 'confirming' && 'bg-info/10',
                              tx.status === 'pending' && 'bg-warning/10',
                              tx.status === 'failed' && 'bg-destructive/10'
                            )}
                          >
                            {tx.status === 'confirmed' && (
                              <CheckCircleSolid className="h-5 w-5 text-success" />
                            )}
                            {tx.status === 'confirming' && (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-info border-t-transparent" />
                            )}
                            {tx.status === 'pending' && (
                              <ClockIcon className="h-5 w-5 text-warning" />
                            )}
                            {tx.status === 'failed' && (
                              <XCircleIcon className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-foreground">{tx.type}</span>
                              {tx.amount && (
                                <span className="text-sm text-muted-foreground">{tx.amount}</span>
                              )}
                            </div>
                            <code className="text-xs text-muted-foreground font-mono">
                              {tx.hash}
                            </code>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={cn(
                              'px-2 py-1 text-xs rounded-full font-medium',
                              tx.status === 'confirmed' && 'bg-success/10 text-success',
                              tx.status === 'confirming' && 'bg-info/10 text-info',
                              tx.status === 'pending' && 'bg-warning/10 text-warning',
                              tx.status === 'failed' && 'bg-destructive/10 text-destructive'
                            )}
                          >
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                          {tx.confirmations !== undefined && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {tx.confirmations}/{tx.maxConfirmations} confirmations
                            </div>
                          )}
                        </div>
                      </div>

                      {tx.status === 'confirming' &&
                        tx.confirmations !== undefined &&
                        tx.maxConfirmations && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Confirmations</span>
                              <span>
                                {tx.confirmations}/{tx.maxConfirmations}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-info h-1.5 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(tx.confirmations / tx.maxConfirmations) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-muted rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Transaction States</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Pending:</strong> Transaction submitted to mempool
                    </li>
                    <li>
                      • <strong>Confirming:</strong> Being included in blocks (shows progress)
                    </li>
                    <li>
                      • <strong>Confirmed:</strong> Required confirmations reached
                    </li>
                    <li>
                      • <strong>Failed:</strong> Transaction reverted or rejected
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* System Status Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>System Status & Indicators</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Connection Status */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>Connection Status</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Real-time connection and system status
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full',
                          systemStatus === 'online' && 'bg-success',
                          systemStatus === 'degraded' && 'bg-warning',
                          systemStatus === 'offline' && 'bg-destructive'
                        )}
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">System Status</div>
                        <div className="text-xs text-muted-foreground">
                          {systemStatus === 'online' && 'All systems operational'}
                          {systemStatus === 'degraded' && 'Some services unavailable'}
                          {systemStatus === 'offline' && 'System maintenance'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'px-2 py-1 text-xs rounded-full font-medium',
                        systemStatus === 'online' && 'bg-success/10 text-success',
                        systemStatus === 'degraded' && 'bg-warning/10 text-warning',
                        systemStatus === 'offline' && 'bg-destructive/10 text-destructive'
                      )}
                    >
                      {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <WifiIcon className="h-4 w-4 text-success" />
                      <span className="text-sm text-foreground">Internet Connection</span>
                      <span className="text-xs text-success">Connected</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <WalletIcon className="h-4 w-4 text-info" />
                      <span className="text-sm text-foreground">Wallet Connection</span>
                      <span className="text-xs text-info">MetaMask</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SignalIcon className="h-4 w-4 text-success" />
                      <span className="text-sm text-foreground">Ethereum Network</span>
                      <span className="text-xs text-success">Mainnet</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="h-4 w-4 text-warning" />
                      <span className="text-sm text-foreground">Security Status</span>
                      <span className="text-xs text-warning">Warning</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Badges */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
              >
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h4()} mb-2`}>Notification Badges</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Count indicators and status badges
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Count Badges</h4>

                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <BellIcon className="h-6 w-6 text-muted-foreground" />
                        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          3
                        </span>
                      </div>

                      <div className="relative">
                        <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-muted-foreground" />
                        <span className="absolute -top-1 -right-1 bg-info text-info-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          12
                        </span>
                      </div>

                      <div className="relative">
                        <WalletIcon className="h-6 w-6 text-muted-foreground" />
                        <span className="absolute -top-1 -right-1 bg-success text-success-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          99+
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Status Indicators</h4>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm text-foreground">Online</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-sm text-foreground">Away</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        <span className="text-sm text-foreground">Offline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Contextual Feedback */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Contextual Feedback</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Smart Feedback Patterns</h3>
                <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                  Context-aware feedback that adapts to user actions and system state
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Action Feedback */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Action Feedback</h4>

                    <div className="space-y-3">
                      <div className={(variants.alert as any).success()}>
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-success mr-2" />
                          <span className="text-sm">Email sent successfully</span>
                        </div>
                      </div>

                      <div className={(variants.alert as any).info()}>
                        <div className="flex items-center">
                          <InformationCircleIcon className="h-4 w-4 text-info mr-2" />
                          <span className="text-sm">Auto-save enabled</span>
                        </div>
                      </div>

                      <div className={(variants.alert as any).warning()}>
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 text-warning mr-2" />
                          <span className="text-sm">Draft saved locally</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Smart Suggestions</h4>

                    <div className="space-y-3">
                      <div className="p-3 bg-muted border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-foreground">
                              Enable 2FA for better security
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Recommended for wallet protection
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Enable
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 bg-muted border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-foreground">Back up your seed phrase</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Secure your wallet recovery
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Backup
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default NotificationsFeedbackPage;
