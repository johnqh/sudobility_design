import { Section } from "@sudobility/components";

import {
  ArrowRightIcon,
  BanknotesIcon,
  BellIcon,
  BoltIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  CogIcon,
  CreditCardIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  PlusIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
  WalletIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon as CheckCircleSolid,
  ExclamationTriangleIcon as ExclamationTriangleSolid,
  HeartIcon as HeartSolid,
  InformationCircleIcon as InformationCircleSolid,
  StarIcon as StarSolid,
  XCircleIcon as XCircleSolid,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import LocalizedLink from "../../components/LocalizedLink";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const IconsIllustrationsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Icon categories for demo
  const iconCategories = [
    { id: "all", name: "All Icons", count: 24 },
    { id: "actions", name: "Actions", count: 6 },
    { id: "status", name: "Status", count: 4 },
    { id: "navigation", name: "Navigation", count: 5 },
    { id: "web3", name: "Web3", count: 4 },
    { id: "decorative", name: "Decorative", count: 5 },
  ];

  // Sample icons for demonstration
  const sampleIcons = [
    {
      name: "HeartIcon",
      component: HeartIcon,
      category: "actions",
      solid: HeartSolid,
    },
    {
      name: "StarIcon",
      component: StarIcon,
      category: "actions",
      solid: StarSolid,
    },
    {
      name: "CheckCircleIcon",
      component: CheckCircleIcon,
      category: "status",
      solid: CheckCircleSolid,
    },
    {
      name: "ExclamationTriangleIcon",
      component: ExclamationTriangleIcon,
      category: "status",
      solid: ExclamationTriangleSolid,
    },
    {
      name: "XCircleIcon",
      component: XCircleIcon,
      category: "status",
      solid: XCircleSolid,
    },
    {
      name: "InformationCircleIcon",
      component: InformationCircleIcon,
      category: "status",
      solid: InformationCircleSolid,
    },
    {
      name: "ArrowRightIcon",
      component: ArrowRightIcon,
      category: "navigation",
    },
    {
      name: "ChevronLeftIcon",
      component: ChevronLeftIcon,
      category: "navigation",
    },
    { name: "HomeIcon", component: HomeIcon, category: "navigation" },
    {
      name: "MagnifyingGlassIcon",
      component: MagnifyingGlassIcon,
      category: "actions",
    },
    { name: "BellIcon", component: BellIcon, category: "actions" },
    { name: "UserIcon", component: UserIcon, category: "actions" },
    { name: "WalletIcon", component: WalletIcon, category: "web3" },
    { name: "CreditCardIcon", component: CreditCardIcon, category: "web3" },
    { name: "BanknotesIcon", component: BanknotesIcon, category: "web3" },
    { name: "ShieldCheckIcon", component: ShieldCheckIcon, category: "web3" },
    { name: "FireIcon", component: FireIcon, category: "decorative" },
    { name: "BoltIcon", component: BoltIcon, category: "decorative" },
    { name: "SparklesIcon", component: SparklesIcon, category: "decorative" },
    { name: "CubeIcon", component: CubeIcon, category: "decorative" },
    { name: "GlobeAltIcon", component: GlobeAltIcon, category: "decorative" },
  ];

  const filteredIcons =
    selectedCategory === "all"
      ? sampleIcons
      : sampleIcons.filter((icon) => icon.category === selectedCategory);

  return (
    <>
      <SEOHead
        title={`Icons & Illustrations - Design System - Internal - ${emailDomain}`}
        description="Comprehensive icon system with consistent sizing, colors, and contextual usage patterns"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
              <PhotoIcon className="h-5 w-5 text-accent mr-2" />
              <span className="text-accent font-semibold">
                Icons & Illustrations
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Icons & Illustrations
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
            >
              Comprehensive icon system with consistent sizing, colors, and
              contextual usage patterns. Built with Heroicons and optimized for
              accessibility and dark mode.
            </p>
          </div>

          {/* Icon Sizes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Icon Sizes</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Size Examples */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Size Variants
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      xs (12px)
                    </div>
                    <StarIcon className={variants.icon.size.xs()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-3 w-3
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      sm (16px)
                    </div>
                    <StarIcon className={variants.icon.size.sm()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-4 w-4
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      md (20px)
                    </div>
                    <StarIcon className={variants.icon.size.md()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-5 w-5
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      lg (24px)
                    </div>
                    <StarIcon className={variants.icon.size.lg()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-6 w-6
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      xl (32px)
                    </div>
                    <StarIcon className={variants.icon.size.xl()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-8 w-8
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      xxl (40px)
                    </div>
                    <StarIcon className={variants.icon.size.xxl()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-10 w-10
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-muted-foreground">
                      xxxl (48px)
                    </div>
                    <StarIcon className={variants.icon.size.xxxl()} />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      h-12 w-12
                    </code>
                  </div>
                </div>
              </div>

              {/* Usage Code */}
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Size Usage
                </h3>
                <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                  <pre className="text-foreground text-sm">
                    <code>{`// Using size variants
<StarIcon className={variants.icon.size.sm()} />
<StarIcon className={variants.icon.size.lg()} />

// Direct Tailwind classes
<StarIcon className="h-4 w-4" />
<StarIcon className="h-6 w-6" />

// Context-specific sizes
<StarIcon className={variants.icon.context.button.leading()} />
<StarIcon className={variants.icon.decorative.hero.medium()} />`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Section>

          {/* Icon Colors */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Icon Colors</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Examples */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Color Variants
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Default
                    </div>
                    <StarIcon className={variants.icon.color.default()} />
                    <span className="text-xs text-muted-foreground">
                      Gray 500 / 400
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Brand
                    </div>
                    <StarIcon className={variants.icon.color.brand()} />
                    <span className="text-xs text-primary">Blue 600 / 400</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Success
                    </div>
                    <CheckCircleIcon
                      className={variants.icon.color.success()}
                    />
                    <span className="text-xs text-success">
                      Green 600 / 400
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Warning
                    </div>
                    <ExclamationTriangleIcon
                      className={variants.icon.color.warning()}
                    />
                    <span className="text-xs text-warning">
                      Amber 600 / 400
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Error
                    </div>
                    <XCircleIcon className={variants.icon.color.error()} />
                    <span className="text-xs text-destructive">
                      Red 600 / 400
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Interactive
                    </div>
                    <HeartIcon className={variants.icon.color.interactive()} />
                    <span className="text-xs text-primary">Hover effects</span>
                  </div>
                </div>
              </div>

              {/* Web3 Colors */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Web3 Colors
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Ethereum
                    </div>
                    <CubeIcon className={variants.icon.color.ethereum()} />
                    <span className="text-xs text-info">Blue 600 / 400</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Solana
                    </div>
                    <BoltIcon className={variants.icon.color.solana()} />
                    <span className="text-xs text-secondary-foreground">
                      Purple 600 / 400
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">
                      Bitcoin
                    </div>
                    <BanknotesIcon className={variants.icon.color.bitcoin()} />
                    <span className="text-xs text-warning">
                      Orange 600 / 400
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Context-Specific Icons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Context-Specific Icons
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Button Icons */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Button Icons
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Leading Icon
                    </h4>
                    <button
                      className={(variants.button as any).primary.default()}
                    >
                      <PlusIcon
                        className={variants.icon.context.button.leading()}
                      />
                      Add Item
                    </button>
                  </div>
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Trailing Icon
                    </h4>
                    <button
                      className={(variants.button as any).outline.default()}
                    >
                      Continue
                      <ArrowRightIcon
                        className={variants.icon.context.button.trailing()}
                      />
                    </button>
                  </div>
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Icon Only
                    </h4>
                    <button className={(variants.button as any).ghost.icon()}>
                      <CogIcon
                        className={variants.icon.context.button.only()}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Input Icons */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Input Icons
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Leading Icon
                    </h4>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className={variants.icon.context.input.leading()}
                      />
                      <input
                        type="text"
                        placeholder="Search..."
                        className={`${(variants.input as any).default()} pl-10`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className={`${textVariants.heading.h5()} mb-3`}>
                      Trailing Interactive
                    </h4>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password"
                        className={`${(variants.input as any).default()} pr-10`}
                      />
                      <EyeIcon
                        className={variants.icon.context.input.interactive()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Status Icons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Status Icons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={(variants.alert as any).success()}>
                <CheckCircleSolid
                  className={variants.icon.context.status.success()}
                />
                <div>
                  <h4 className={textVariants.heading.h5()}>Success</h4>
                  <p className={textVariants.body.sm()}>
                    Operation completed successfully
                  </p>
                </div>
              </div>
              <div className={(variants.alert as any).warning()}>
                <ExclamationTriangleSolid
                  className={variants.icon.context.status.warning()}
                />
                <div>
                  <h4 className={textVariants.heading.h5()}>Warning</h4>
                  <p className={textVariants.body.sm()}>
                    Please review and continue
                  </p>
                </div>
              </div>
              <div className={(variants.alert as any).error()}>
                <XCircleSolid
                  className={variants.icon.context.status.error()}
                />
                <div>
                  <h4 className={textVariants.heading.h5()}>Error</h4>
                  <p className={textVariants.body.sm()}>Something went wrong</p>
                </div>
              </div>
              <div className={(variants.alert as any).info()}>
                <InformationCircleSolid
                  className={variants.icon.context.status.info()}
                />
                <div>
                  <h4 className={textVariants.heading.h5()}>Info</h4>
                  <p className={textVariants.body.sm()}>
                    Additional information
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Icons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Web3 Context Icons
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Wallet Status */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Wallet Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <WalletIcon
                      className={variants.icon.context.web3.walletConnected()}
                    />
                    <div>
                      <div className={textVariants.heading.h5()}>
                        Wallet Connected
                      </div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        0x1234...5678
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <WalletIcon
                      className={variants.icon.context.web3.walletDisconnected()}
                    />
                    <div>
                      <div className={textVariants.heading.h5()}>
                        No Wallet Connected
                      </div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        Connect to continue
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Icons */}
              <div className={`${ui.background.subtle} rounded-xl p-8`}>
                <h3 className={`${textVariants.heading.h3()} mb-6`}>
                  Blockchain Icons
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <CubeIcon
                      className={variants.icon.context.web3.blockchain.ethereum()}
                    />
                    <div>
                      <div className={textVariants.heading.h5()}>Ethereum</div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        ETH Network
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <BoltIcon
                      className={variants.icon.context.web3.blockchain.solana()}
                    />
                    <div>
                      <div className={textVariants.heading.h5()}>Solana</div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        SOL Network
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <BanknotesIcon
                      className={variants.icon.context.web3.blockchain.bitcoin()}
                    />
                    <div>
                      <div className={textVariants.heading.h5()}>Bitcoin</div>
                      <div
                        className={`${textVariants.body.sm()} text-muted-foreground`}
                      >
                        BTC Network
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Decorative Icons */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Decorative Icons
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Hero Icons */}
              <div
                className={`${ui.background.subtle} rounded-xl p-8 text-center`}
              >
                <FireIcon className={variants.icon.decorative.hero.large()} />
                <h3 className={`${textVariants.heading.h3()} mt-4 mb-2`}>
                  Hero Large
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  80px × 80px
                </p>
              </div>

              <div
                className={`${ui.background.subtle} rounded-xl p-8 text-center`}
              >
                <SparklesIcon
                  className={variants.icon.decorative.hero.medium()}
                />
                <h3 className={`${textVariants.heading.h3()} mt-4 mb-2`}>
                  Hero Medium
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  64px × 64px
                </p>
              </div>

              <div
                className={`${ui.background.subtle} rounded-xl p-8 text-center`}
              >
                <ShieldCheckIcon
                  className={variants.icon.decorative.hero.small()}
                />
                <h3 className={`${textVariants.heading.h3()} mt-4 mb-2`}>
                  Hero Small
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  48px × 48px
                </p>
              </div>
            </div>
          </Section>

          {/* Icon Browser */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Icon Browser
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {iconCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredIcons.map((icon) => (
                <div
                  key={icon.name}
                  className={`${ui.background.subtle} rounded-lg p-4 text-center hover:bg-muted transition-colors duration-200 group cursor-pointer`}
                >
                  <icon.component
                    className={`${variants.icon.variant.default.lg()} mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}
                  />
                  <div
                    className={`${textVariants.body.sm()} text-muted-foreground text-xs break-words`}
                  >
                    {icon.name.replace("Icon", "")}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Design Tokens */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Available Icon Variants
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Size Variants */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Size Variants
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.size.xs()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.size.sm()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.size.md()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.size.lg()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.size.xl()
                      </code>
                    </div>
                  </div>
                </div>

                {/* Color Variants */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Color Variants
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.color.default()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.color.brand()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.color.success()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.color.warning()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.color.error()
                      </code>
                    </div>
                  </div>
                </div>

                {/* Context Variants */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Context Variants
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.context.button.leading()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.context.status.success()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.context.web3.wallet()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.decorative.hero.large()
                      </code>
                    </div>
                  </div>
                </div>

                {/* Combined Variants */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Combined Variants
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.variant.default.md()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.variant.interactive.lg()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.variant.success.sm()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.icon.variant.error.md()
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <LocalizedLink
              to="/design/tables-grids"
              className={`${(variants.button as any).secondary.default()} group`}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Tables & Data Grids
            </LocalizedLink>
            <LocalizedLink
              to="/design"
              className={(variants.button as any).outline.default()}
            >
              Back to Design System
            </LocalizedLink>
            <div className="w-32" /> {/* Spacer for next section when added */}
          </div>
        </div>
      </div>
    </>
  );
};

export default IconsIllustrationsPage;
