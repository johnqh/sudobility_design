import { textVariants, ui, variants } from '@sudobility/design';
import { cn } from '@sudobility/components';
import {
  ArchiveBoxIcon,
  Bars3Icon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxIcon,
  PaperAirplaneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { SEOHead } from '@sudobility/seo_lib';
import { Tabs, TabsContent, TabsList, TabsTrigger, Section } from '@sudobility/components';

interface AppProps {
  emailDomain: string;
  appName: string;
}

const NavigationPage: React.FC<AppProps> = ({ emailDomain, appName: _appName }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(3);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      title: 'Breadcrumb Navigation',
      description: 'Hierarchical navigation showing current page location',
      code: `// Basic Breadcrumb
<nav className={variants.navigation.breadcrumb.container()}>
  <ol className={variants.navigation.breadcrumb.list()}>
    <li className={variants.navigation.breadcrumb.item()}>
      <a href="/" className={variants.navigation.breadcrumb.link()}>
        <HomeIcon className={variants.navigation.breadcrumb.home()} />
        Home
      </a>
    </li>
    <ChevronRightIcon className={variants.navigation.breadcrumb.separator()} />
    <li className={variants.navigation.breadcrumb.item()}>
      <span className={variants.navigation.breadcrumb.current()}>
        Current Page
      </span>
    </li>
  </ol>
</nav>`,
    },
    {
      title: 'Tab Navigation',
      description: 'Organize content into multiple views with tab navigation',
      code: `// Tab Navigation
<Tabs defaultValue="overview" className="w-full">
  <TabsList className={variants.navigation.tabs.list()}>
    <TabsTrigger value="overview" className={variants.navigation.tabs.trigger()}>
      Overview
    </TabsTrigger>
    <TabsTrigger value="settings" className={variants.navigation.tabs.trigger()}>
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="overview" className={variants.navigation.tabs.content()}>
    Overview content
  </TabsContent>
</Tabs>`,
    },
    {
      title: 'Pagination',
      description: 'Navigate through multiple pages of content',
      code: `// Pagination Component
<div className={variants.navigation.pagination.container()}>
  <div className={variants.navigation.pagination.nav()}>
    <p className={variants.navigation.pagination.results()}>
      Showing 1 to 10 of 97 results
    </p>
    <div className={variants.navigation.pagination.buttons()}>
      <button className={cn(
        variants.navigation.pagination.button(),
        variants.navigation.pagination.buttonFirst()
      )}>
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      <button className={variants.navigation.pagination.buttonActive()}>
        3
      </button>
      <button className={cn(
        variants.navigation.pagination.button(),
        variants.navigation.pagination.buttonLast()
      )}>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
</div>`,
    },
    {
      title: 'Step Navigation',
      description: 'Guide users through multi-step processes',
      code: `// Step Navigation
<div className={variants.navigation.steps.container()}>
  <ol className={variants.navigation.steps.list()}>
    <li className={variants.navigation.steps.step()}>
      <div className={variants.navigation.steps.circleCompleted()}>
        <CheckIcon className="h-4 w-4" />
      </div>
      <span className={variants.navigation.steps.label()}>
        Complete
      </span>
    </li>
    <div className={variants.navigation.steps.connectorActive()} />
    <li className={variants.navigation.steps.step()}>
      <div className={variants.navigation.steps.circleActive()}>
        2
      </div>
      <span className={variants.navigation.steps.label()}>
        In Progress
      </span>
    </li>
  </ol>
</div>`,
    },
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard', active: true },
    {
      name: 'Inbox',
      icon: InboxIcon,
      href: '/inbox',
      active: false,
      count: 12,
    },
    { name: 'Sent', icon: PaperAirplaneIcon, href: '/sent', active: false },
    { name: 'Archive', icon: ArchiveBoxIcon, href: '/archive', active: false },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/settings', active: false },
  ];

  const steps = [
    {
      id: 1,
      name: 'Account Setup',
      description: 'Create your account',
      status: 'complete',
    },
    {
      id: 2,
      name: 'Wallet Connection',
      description: 'Connect your Web3 wallet',
      status: 'current',
    },
    {
      id: 3,
      name: 'Email Setup',
      description: 'Configure your email preferences',
      status: 'upcoming',
    },
    {
      id: 4,
      name: 'Complete',
      description: 'Start using example.com',
      status: 'upcoming',
    },
  ];

  return (
    <>
      <SEOHead
        title={`Navigation - Design System - Internal - ${emailDomain}`}
        description="Navigation components including breadcrumbs, tabs, pagination, and menu systems"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
              <Bars3Icon className="h-5 w-5 text-accent mr-2" />
              <span className="text-accent font-semibold">Navigation Components</span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>Navigation System</h1>

            <p className={`${textVariants.body.lg()} max-w-3xl text-muted-foreground`}>
              Comprehensive navigation components for Web3 applications including breadcrumbs, tabs,
              pagination, menus, and step navigation. Designed for accessibility and responsive
              behavior.
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
                    <pre className="p-4 text-sm overflow-x-auto bg-muted">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code)}
                      className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-card rounded-md shadow-sm border border-border hover:bg-muted transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Interactive Breadcrumb Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Interactive Breadcrumbs</h2>

            <div className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}>
              <div className="mb-6">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>Live Breadcrumb Example</h3>

                {/* Demo breadcrumb */}
                <nav className={variants.navigation.breadcrumb.container()}>
                  <ol className={variants.navigation.breadcrumb.list()}>
                    <li className={variants.navigation.breadcrumb.item()}>
                      <button className={variants.navigation.breadcrumb.link()}>
                        <HomeIcon className={variants.navigation.breadcrumb.home()} />
                        Home
                      </button>
                    </li>
                    <ChevronRightIcon className={variants.navigation.breadcrumb.separator()} />
                    <li className={variants.navigation.breadcrumb.item()}>
                      <button className={variants.navigation.breadcrumb.link()}>
                        Web3 Projects
                      </button>
                    </li>
                    <ChevronRightIcon className={variants.navigation.breadcrumb.separator()} />
                    <li className={variants.navigation.breadcrumb.item()}>
                      <span className={variants.navigation.breadcrumb.current()}>
                        {emailDomain}
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className={`${textVariants.heading.h5()} mb-2`}>Features</h4>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Structured data for SEO optimization</li>
                  <li>• ARIA accessibility attributes</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Responsive design with truncation</li>
                  <li>• Optional home icon and social sharing</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Tab Variants */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Tab Navigation Variants</h2>

            <div className="space-y-8">
              {/* Default Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>Default Tabs</h3>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className={variants.navigation.tabs.list()}>
                    <TabsTrigger value="overview" className={variants.navigation.tabs.trigger()}>
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className={variants.navigation.tabs.trigger()}>
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="settings" className={variants.navigation.tabs.trigger()}>
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className={variants.navigation.tabs.content()}>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        Overview content with project statistics and recent activity.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics" className={variants.navigation.tabs.content()}>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        Analytics dashboard with charts and metrics.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className={variants.navigation.tabs.content()}>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className={textVariants.body.md()}>
                        Settings panel for configuration options.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Underlined Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>Underlined Tabs</h3>
                <div className="w-full">
                  <div className={variants.navigation.tabs.listUnderlined()}>
                    <button
                      className={cn(
                        variants.navigation.tabs.triggerUnderlined(),
                        'data-[state=active]'
                      )}
                    >
                      Dashboard
                    </button>
                    <button className={variants.navigation.tabs.triggerUnderlined()}>Team</button>
                    <button className={variants.navigation.tabs.triggerUnderlined()}>
                      Projects
                    </button>
                    <button className={variants.navigation.tabs.triggerUnderlined()}>
                      Calendar
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className={textVariants.body.md()}>
                      Dashboard content with clean underlined tab style.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pills Tabs */}
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>Pills Tabs</h3>
                <div className="w-full">
                  <div className={variants.navigation.tabs.listPills()}>
                    <button
                      className={cn(
                        variants.navigation.tabs.triggerPills(),
                        'data-[state=active]:bg-background data-[state=active]:shadow-sm'
                      )}
                    >
                      All
                    </button>
                    <button className={variants.navigation.tabs.triggerPills()}>Active</button>
                    <button className={variants.navigation.tabs.triggerPills()}>Draft</button>
                    <button className={variants.navigation.tabs.triggerPills()}>Archived</button>
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className={textVariants.body.md()}>
                      Content filtered by the selected pill tab.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Pagination Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Pagination</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Email List Pagination</h3>
                <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                  Example pagination for email list navigation
                </p>
              </div>

              <div className="p-6">
                {/* Mock email list */}
                <div className="space-y-3 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center p-3 border border-border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary text-sm font-medium">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className={`${textVariants.body.md()} font-medium`}>
                          Email Subject {currentPage * 5 - 5 + i + 1}
                        </div>
                        <div className={`${textVariants.body.sm()} text-muted-foreground`}>
                          sender{currentPage * 5 - 5 + i + 1}@example.com
                        </div>
                      </div>
                      <div className={`${textVariants.body.sm()} text-muted-foreground`}>
                        2h ago
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className={variants.navigation.pagination.container()}>
                  <div className={variants.navigation.pagination.info()}>
                    <button className={variants.navigation.pagination.mobileButton()}>
                      Previous
                    </button>
                    <button className={variants.navigation.pagination.mobileButton()}>Next</button>
                  </div>
                  <div className={variants.navigation.pagination.nav()}>
                    <div>
                      <p className={variants.navigation.pagination.results()}>
                        Showing <span className="font-medium">{(currentPage - 1) * 5 + 1}</span> to{' '}
                        <span className="font-medium">{currentPage * 5}</span> of{' '}
                        <span className="font-medium">97</span> results
                      </p>
                    </div>
                    <div>
                      <nav className={variants.navigation.pagination.buttons()}>
                        <button
                          className={cn(
                            variants.navigation.pagination.button(),
                            variants.navigation.pagination.buttonFirst()
                          )}
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </button>

                        {[1, 2, 3, 4, 5].map(page => (
                          <button
                            key={page}
                            className={
                              page === currentPage
                                ? variants.navigation.pagination.buttonActive()
                                : variants.navigation.pagination.button()
                            }
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          className={cn(
                            variants.navigation.pagination.button(),
                            variants.navigation.pagination.buttonLast()
                          )}
                          onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Step Navigation */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Step Navigation</h2>

            <div className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}>
              <div className="mb-8">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Web3 Wallet Setup</h3>
                <p className={`${textVariants.body.md()} text-muted-foreground`}>
                  Guide users through the wallet connection process
                </p>
              </div>

              <div className={variants.navigation.steps.container()}>
                <ol className={variants.navigation.steps.list()}>
                  {steps.map((step, stepIdx) => (
                    <React.Fragment key={step.id}>
                      {stepIdx > 0 && (
                        <div
                          className={
                            step.status === 'complete' ||
                            stepIdx < steps.findIndex(s => s.status === 'current')
                              ? variants.navigation.steps.connectorActive()
                              : variants.navigation.steps.connector()
                          }
                        />
                      )}
                      <li className={variants.navigation.steps.step()}>
                        <button
                          onClick={() => setActiveStep(step.id)}
                          className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-2"
                        >
                          <div
                            className={
                              step.status === 'complete'
                                ? variants.navigation.steps.circleCompleted()
                                : step.status === 'current'
                                  ? variants.navigation.steps.circleActive()
                                  : variants.navigation.steps.circle()
                            }
                          >
                            {step.status === 'complete' ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : step.status === 'current' ? (
                              <ClockIcon className="h-4 w-4" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </div>
                          <div className="text-left">
                            <div
                              className={
                                step.status === 'current' || step.status === 'complete'
                                  ? variants.navigation.steps.label()
                                  : variants.navigation.steps.labelInactive()
                              }
                            >
                              {step.name}
                            </div>
                            <div className={`${textVariants.body.sm()} text-muted-foreground`}>
                              {step.description}
                            </div>
                          </div>
                        </button>
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h4 className={`${textVariants.heading.h4()} mb-3`}>
                  Step {activeStep}: {steps.find(s => s.id === activeStep)?.name}
                </h4>
                <p className={textVariants.body.md()}>
                  {activeStep === 1 &&
                    `Create your ${emailDomain} account with your preferred username and security settings.`}
                  {activeStep === 2 &&
                    'Connect your Web3 wallet (MetaMask, WalletConnect, etc.) to enable blockchain features.'}
                  {activeStep === 3 &&
                    'Configure your email preferences, notifications, and privacy settings.'}
                  {activeStep === 4 &&
                    'Your setup is complete! Start sending and receiving Web3 emails.'}
                </p>
              </div>
            </div>
          </Section>

          {/* Sidebar Navigation Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Sidebar Navigation</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>Email Application Sidebar</h3>
                <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                  Persistent navigation for email application
                </p>
              </div>

              <div className="flex h-96">
                {/* Sidebar */}
                <div className="w-64 border-r border-border">
                  <div className={variants.navigation.sidebar.container()}>
                    <nav className={variants.navigation.sidebar.nav()}>
                      {sidebarItems.map(item => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className={
                              item.active
                                ? variants.navigation.sidebar.itemActive()
                                : variants.navigation.sidebar.item()
                            }
                            onClick={e => e.preventDefault()}
                          >
                            <Icon
                              className={
                                item.active
                                  ? variants.navigation.sidebar.iconActive()
                                  : variants.navigation.sidebar.icon()
                              }
                            />
                            {item.name}
                            {item.count && (
                              <span className="ml-auto bg-primary/10 text-primary py-0.5 px-2 text-xs font-medium rounded-full">
                                {item.count}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <InboxIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className={`${textVariants.body.lg()} text-muted-foreground`}>
                        Main content area
                      </p>
                      <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                        Content changes based on sidebar selection
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Navigation Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Web3 Navigation Patterns</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}>
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>Wallet Status Navigation</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Navigation that adapts to wallet connection status
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
                        <span className={`${textVariants.body.sm()} text-success`}>
                          MetaMask Connected
                        </span>
                      </div>
                      <span className={`${textVariants.body.xs()} font-mono text-success`}>
                        0x742d...4e88
                      </span>
                    </div>
                    <nav className="space-y-1">
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-md"
                      >
                        <InboxIcon className="mr-3 h-4 w-4" />
                        Web3 Inbox
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                      >
                        <UserIcon className="mr-3 h-4 w-4" />
                        ENS Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                      >
                        <Cog6ToothIcon className="mr-3 h-4 w-4" />
                        Wallet Settings
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}>
                <div className="p-6 border-b border-border">
                  <h3 className={`${textVariants.heading.h3()} mb-2`}>Multi-Chain Navigation</h3>
                  <p className={`${textVariants.body.sm()} text-muted-foreground`}>
                    Navigation across different blockchain networks
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Chain selector */}
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
                        Ethereum
                      </button>
                      <button className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                        <div className="w-4 h-4 bg-secondary rounded-full mr-2"></div>
                        Solana
                      </button>
                      <button className="flex items-center px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg text-sm font-medium transition-colors">
                        <div className="w-4 h-4 bg-accent rounded-full mr-2"></div>
                        Polygon
                      </button>
                    </div>

                    {/* Chain-specific navigation */}
                    <div className="border-t border-border pt-4">
                      <nav className="space-y-1">
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <InboxIcon className="mr-3 h-4 w-4" />
                          Ethereum Inbox
                          <span className="ml-auto bg-primary/10 text-primary py-0.5 px-2 text-xs font-medium rounded-full">
                            3
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <DocumentTextIcon className="mr-3 h-4 w-4" />
                          ENS Names
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
                        >
                          <Cog6ToothIcon className="mr-3 h-4 w-4" />
                          Gas Settings
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Accessibility Guidelines */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Accessibility Guidelines</h2>

            <div className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}>
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-4`}>Navigation Accessibility</h3>
                <p className={`${textVariants.body.md()} text-muted-foreground`}>
                  Ensure all navigation components are accessible to screen readers and keyboard
                  users.
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>ARIA Landmarks</h4>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code className="text-foreground">{`<nav role="navigation" aria-label="Main navigation">
  <ol role="list" aria-label="Breadcrumb">
    <li><a href="/" aria-current="page">Home</a></li>
  </ol>
</nav>

<nav role="tablist" aria-label="Content sections">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
</nav>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>Keyboard Navigation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className={`${textVariants.body.sm()} font-medium`}>Breadcrumbs</div>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Tab: Navigate through links</li>
                        <li>• Enter/Space: Activate link</li>
                        <li>• Skip links for screen readers</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className={`${textVariants.body.sm()} font-medium`}>Tabs</div>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Arrow keys: Navigate tabs</li>
                        <li>• Tab: Enter tab panel</li>
                        <li>• Enter/Space: Activate tab</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Implementation Notes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Implementation Notes</h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    Performance Considerations
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Lazy load navigation items when possible</li>
                    <li>• Use React.memo for complex navigation components</li>
                    <li>• Debounce search in navigation menus</li>
                    <li>• Virtual scrolling for long navigation lists</li>
                    <li>• Preload critical navigation routes</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>Mobile Responsiveness</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Collapse navigation into hamburger menus</li>
                    <li>• Use bottom navigation for mobile apps</li>
                    <li>• Implement swipe gestures where appropriate</li>
                    <li>• Ensure touch targets are at least 44px</li>
                    <li>• Test on various screen sizes and orientations</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default NavigationPage;
