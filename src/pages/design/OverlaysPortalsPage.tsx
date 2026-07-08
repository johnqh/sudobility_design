import {
  ArrowRightOnRectangleIcon,
  CogIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  LoadingState,
  Modal,
  ModalContent,
  ModalFooter,
  Section,
} from "@sudobility/components";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const OverlaysPortalsPage: React.FC<AppProps> = ({
  emailDomain: _emailDomain,
  appName: _appName,
}) => {
  const { t } = useTranslation("overlaysPortals");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingOverlayOpen, setIsLoadingOverlayOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState("");

  const dropdownItems = [
    {
      id: "profile",
      label: t("dropdownItems.profile"),
      icon: UserIcon,
      onClick: () => alert(t("alerts.profile")),
    },
    {
      id: "settings",
      label: t("dropdownItems.settings"),
      icon: CogIcon,
      onClick: () => alert(t("alerts.settings")),
    },
    {
      id: "logout",
      label: t("dropdownItems.logout"),
      icon: ArrowRightOnRectangleIcon,
      onClick: () => alert(t("alerts.logout")),
    },
  ];

  const showLoadingOverlay = () => {
    setIsLoadingOverlayOpen(true);
    setTimeout(() => setIsLoadingOverlayOpen(false), 3000);
  };

  return (
    <div className={variants.layout.container.default()}>
      <div className="py-8">
        <div className="mb-8">
          <h1 className={textVariants.heading.h1()}>{t("header.title")}</h1>
          <p className={textVariants.body.lg() + " mt-4"}>
            {t("header.description")}
          </p>
        </div>

        {/* Modals Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("modals.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("modals.description")}
          </p>

          <div className={variants.card.default.padded() + " mb-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.interactiveExample")}
            </h3>
            <Button onClick={() => setIsModalOpen(true)}>
              {t("modals.openButton")}
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={t("modals.exampleTitle")}
              size="medium"
            >
              <ModalContent>
                <div className="space-y-4">
                  <p className={textVariants.body.md()}>
                    {t("modals.exampleBody")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={ui.background.subtle + " p-4"}>
                      <h4 className={textVariants.heading.h5() + " mb-2"}>
                        {t("modals.featuresTitle")}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {(
                          t("modals.features", {
                            returnObjects: true,
                          }) as string[]
                        ).map((feature) => (
                          <li key={feature}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={ui.background.subtle + " p-4"}>
                      <h4 className={textVariants.heading.h5() + " mb-2"}>
                        {t("modals.accessibilityTitle")}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {(
                          t("modals.accessibility", {
                            returnObjects: true,
                          }) as string[]
                        ).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ModalContent>
              <ModalFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  {t("modals.cancel")}
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  {t("modals.confirm")}
                </Button>
              </ModalFooter>
            </Modal>
          </div>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`import { Modal, ModalContent, ModalFooter } from "../../components/ui"
import { variants } from '@/design-system';

// Basic modal
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title"
  size="medium"
>
  <ModalContent>
    Content goes here
  </ModalContent>
  <ModalFooter>
    <Button onClick={onClose}>Close</Button>
  </ModalFooter>
</Modal>

// Modal sizes
size="small"     // ${variants.overlays.modal.small()}
size="medium"    // ${variants.overlays.modal.medium()} (default)
size="large"     // ${variants.overlays.modal.large()}
size="extraLarge" // ${variants.overlays.modal.extraLarge()}

// Manual styling
<div className={variants.overlays.modal.backdrop()}>
  <div className={variants.overlays.modal.container()}>
    <div className={variants.overlays.modal.content()}>
      <div className={variants.overlays.modal.header()}>
        <h2 className={variants.overlays.modal.title()}>Title</h2>
      </div>
      <div className={variants.overlays.modal.body()}>Content</div>
      <div className={variants.overlays.modal.footer()}>Actions</div>
    </div>
  </div>
</div>`}
            </pre>
          </div>
        </Section>

        {/* Dropdowns Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("dropdowns.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("dropdowns.description")}
          </p>

          <div className={variants.card.default.padded() + " mb-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.interactiveExample")}
            </h3>
            <div className="flex space-x-4">
              <Dropdown
                trigger={
                  <Button variant="outline">
                    <EllipsisVerticalIcon
                      className={variants.icon.variant.muted.sm() + " mr-2"}
                    />
                    {t("dropdowns.actionsButton")}
                  </Button>
                }
                items={dropdownItems}
                align="left"
              />

              <Dropdown
                trigger={
                  <Button>
                    {t("dropdowns.userMenuButton")}
                    <EllipsisVerticalIcon
                      className={
                        variants.icon.variant.interactive.sm() + " ml-2"
                      }
                    />
                  </Button>
                }
                items={dropdownItems}
                align="right"
              />
            </div>
          </div>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`import { Dropdown } from "../../components/ui"
import { variants } from '@/design-system';

const items = [
  {
    id: 'edit',
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => handleEdit()
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => handleDelete(),
    disabled: true
  }
];

<Dropdown
  trigger={<Button>Menu</Button>}
  items={items}
  align="right"
/>

// Manual dropdown styling
<div className={variants.overlays.dropdown.container()}>
  <div className={variants.overlays.dropdown.trigger()}>Trigger</div>
  <div className={variants.overlays.dropdown.menu()}>
    <div className={variants.overlays.dropdown.itemContainer()}>
      <button className={variants.overlays.dropdown.item()}>
        <Icon className={variants.overlays.dropdown.itemIcon()} />
        Item Label
      </button>
      <div className={variants.overlays.dropdown.divider()} />
      <div className={variants.overlays.dropdown.header()}>Section</div>
    </div>
  </div>
</div>`}
            </pre>
          </div>
        </Section>

        {/* Tooltips Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("tooltips.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("tooltips.description")}
          </p>

          <div className={variants.card.default.padded() + " mb-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.interactiveExample")}
            </h3>
            <div className="flex flex-wrap gap-4">
              {["top", "bottom", "left", "right"].map((position) => (
                <div key={position} className="relative">
                  <Button
                    variant="outline"
                    onMouseEnter={() => setTooltipVisible(position)}
                    onMouseLeave={() => setTooltipVisible("")}
                  >
                    {t("tooltips.hoverButton", { position })}
                  </Button>
                  {tooltipVisible === position && (
                    <>
                      <div
                        className={`${variants.overlays.tooltip.container()} ${variants.overlays.tooltip[
                          position as keyof typeof variants.overlays.tooltip
                        ]()}`}
                      >
                        {t("tooltips.tooltipOn", { position })}
                        <div
                          className={`${variants.overlays.tooltip.arrow()} ${variants.overlays.tooltip[
                            `${position}Arrow` as keyof typeof variants.overlays.tooltip
                          ]()}`}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`// Tooltip variants
className={variants.overlays.tooltip.container()} // Base container
className={variants.overlays.tooltip.dark()}      // Dark theme (default)
className={variants.overlays.tooltip.light()}     // Light theme
className={variants.overlays.tooltip.info()}      // Info variant
className={variants.overlays.tooltip.success()}   // Success variant
className={variants.overlays.tooltip.warning()}   // Warning variant
className={variants.overlays.tooltip.error()}     // Error variant

// Positioning
className={variants.overlays.tooltip.top()}       // Top position
className={variants.overlays.tooltip.bottom()}    // Bottom position
className={variants.overlays.tooltip.left()}      // Left position  
className={variants.overlays.tooltip.right()}     // Right position

// With arrow
<div className={variants.overlays.tooltip.container() + ' ' + variants.overlays.tooltip.top()}>
  Tooltip content
  <div className={variants.overlays.tooltip.arrow() + ' ' + variants.overlays.tooltip.topArrow()} />
</div>`}
            </pre>
          </div>
        </Section>

        {/* Loading Overlays Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("loading.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("loading.description")}
          </p>

          <div className={variants.card.default.padded() + " mb-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.interactiveExample")}
            </h3>
            <div className="space-y-4">
              <div>
                <Button onClick={showLoadingOverlay}>
                  {t("loading.showButton")}
                </Button>
              </div>

              <div className="border rounded-lg p-4 bg-muted relative h-32">
                <p className={textVariants.body.sm() + " mb-2"}>
                  {t("loading.inlineLabel")}
                </p>
                <LoadingState message={t("loading.message")} size="small" />
              </div>
            </div>

            {isLoadingOverlayOpen && (
              <LoadingState
                fullScreen
                message={t("loading.message")}
                size="large"
              />
            )}
          </div>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`import LoadingState from "../../components/ui"
import { variants } from '@/design-system';

interface AppProps {
  emailDomain: string;
  appName: string;
}


// Full-screen loading
<LoadingState
  fullScreen
  message="Loading..."
  size="large"
/>

// Inline loading  
<LoadingState
  message="Processing..."
  size="default"
/>

// Manual loading overlay
<div className={variants.overlays.loading.backdrop()}>
  <div className={variants.overlays.loading.container()}>
    <div className={variants.overlays.loading.spinner()} />
    <p className={variants.overlays.loading.text()}>Loading...</p>
    <p className={variants.overlays.loading.subtext()}>This may take a moment</p>
  </div>
</div>`}
            </pre>
          </div>
        </Section>

        {/* Sheets Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("sheets.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("sheets.description")}
          </p>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`// Sheet structure
<div className={variants.overlays.sheet.backdrop()}>
  <div className={variants.overlays.sheet.container()}>
    <div className={variants.overlays.sheet.content()}>
      <div className={variants.overlays.sheet.handle()}>
        <div className={variants.overlays.sheet.handleBar()} />
      </div>
      <div className={variants.overlays.sheet.header()}>
        <h2 className={variants.overlays.sheet.title()}>Sheet Title</h2>
        <button className={variants.overlays.sheet.closeButton()}>×</button>
      </div>
      <div className={variants.overlays.sheet.body()}>
        Sheet content goes here
      </div>
      <div className={variants.overlays.sheet.footer()}>
        <Button>Action</Button>
      </div>
    </div>
  </div>
</div>

// Animation states
className={variants.overlays.sheet.entering()} // translate-y-full  
className={variants.overlays.sheet.entered()}  // translate-y-0
className={variants.overlays.sheet.exiting()}  // translate-y-full`}
            </pre>
          </div>
        </Section>

        {/* Context Menus Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("contextMenus.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("contextMenus.description")}
          </p>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("common.usage")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`// Context menu structure
<div className={variants.overlays.contextMenu.backdrop()}>
  <div className={variants.overlays.contextMenu.container()}>
    <button className={variants.overlays.contextMenu.item()}>
      <Icon className={variants.overlays.contextMenu.icon()} />
      Copy
      <span className={variants.overlays.contextMenu.shortcut()}>⌘C</span>
    </button>
    <button className={variants.overlays.contextMenu.item()}>
      <Icon className={variants.overlays.contextMenu.icon()} />
      Paste
      <span className={variants.overlays.contextMenu.shortcut()}>⌘V</span>
    </button>
    <div className={variants.overlays.contextMenu.divider()} />
    <button className={variants.overlays.contextMenu.itemDanger()}>
      <Icon className={variants.overlays.contextMenu.icon()} />
      Delete
      <span className={variants.overlays.contextMenu.shortcut()}>Del</span>
    </button>
  </div>
</div>`}
            </pre>
          </div>
        </Section>

        {/* Portal Management Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("portal.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("portal.description")}
          </p>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("portal.zIndexLayersTitle")}
            </h3>
            <div className="space-y-3">
              {[
                {
                  key: "backdrop",
                  value: "40",
                  class: variants.overlays.portal.backdrop(),
                },
                {
                  key: "popover",
                  value: "40",
                  class: variants.overlays.portal.popover(),
                },
                {
                  key: "dropdown",
                  value: "50",
                  class: variants.overlays.portal.dropdown(),
                },
                {
                  key: "tooltip",
                  value: "50",
                  class: variants.overlays.portal.tooltip(),
                },
                {
                  key: "modal",
                  value: "50",
                  class: variants.overlays.portal.modal(),
                },
                {
                  key: "sheet",
                  value: "50",
                  class: variants.overlays.portal.sheet(),
                },
                {
                  key: "contextMenu",
                  value: "50",
                  class: variants.overlays.portal.contextMenu(),
                },
                {
                  key: "loading",
                  value: "60",
                  class: variants.overlays.portal.loading(),
                },
                {
                  key: "notification",
                  value: "70",
                  class: variants.overlays.portal.notification(),
                },
              ].map((layer) => (
                <div
                  key={layer.key}
                  className="flex items-center justify-between p-3 bg-muted rounded"
                >
                  <span className={textVariants.body.sm()}>
                    {t(`portal.layers.${layer.key}`)}
                  </span>
                  <span className={`${variants.badge.default()} font-mono`}>
                    z-{layer.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={variants.card.default.padded() + " p-6 mt-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("portal.focusManagementTitle")}
            </h3>
            <pre className={variants.dataDisplay.code.block()}>
              {`// Focus trap utilities
className={variants.overlays.portal.focusTrap()}    // focus:outline-none
className={variants.overlays.portal.focusVisible()} // focus-visible:ring-2 focus-visible:ring-ring

// Screen reader utilities  
className={variants.overlays.portal.srOnly()}       // sr-only

// Example with focus management
<div 
  className={variants.overlays.modal.container()}
  tabIndex={-1}
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div className={variants.overlays.portal.focusTrap()}>
    Modal content with proper focus handling
  </div>
</div>`}
            </pre>
          </div>
        </Section>

        {/* Animation States */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("animationStates.title")}
          </h2>
          <p className={textVariants.body.md() + " mb-6"}>
            {t("animationStates.description")}
          </p>

          <div className={variants.card.default.padded() + " p-6"}>
            <h3 className={textVariants.heading.h3() + " mb-4"}>
              {t("animationStates.availableStatesTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={textVariants.heading.h5() + " mb-3"}>
                  {t("animationStates.modalStatesTitle")}
                </h4>
                <pre className={variants.dataDisplay.code.block()}>
                  {`// Modal backdrop
${variants.overlays.modal.backdropEntering()} // opacity-0
${variants.overlays.modal.backdropEntered()}  // opacity-100  
${variants.overlays.modal.backdropExiting()}  // opacity-0

// Modal container
${variants.overlays.modal.containerEntering()} // opacity-0 scale-95
${variants.overlays.modal.containerEntered()}  // opacity-100 scale-100
${variants.overlays.modal.containerExiting()}  // opacity-0 scale-95`}
                </pre>
              </div>

              <div>
                <h4 className={textVariants.heading.h5() + " mb-3"}>
                  {t("animationStates.dropdownStatesTitle")}
                </h4>
                <pre className={variants.dataDisplay.code.block()}>
                  {`// Dropdown menu
${variants.overlays.dropdown.menuEntering()} // opacity-0 scale-95 origin-top
${variants.overlays.dropdown.menuEntered()}  // opacity-100 scale-100 origin-top  
${variants.overlays.dropdown.menuExiting()}  // opacity-0 scale-95 origin-top`}
                </pre>
              </div>
            </div>
          </div>
        </Section>

        {/* Best Practices */}
        <Section>
          <h2 className={textVariants.heading.h2() + " mb-6"}>
            {t("bestPractices.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={variants.card.default.padded() + " p-6"}>
              <h3 className={textVariants.heading.h3() + " mb-4"}>
                {t("bestPractices.accessibilityTitle")}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(
                  t("bestPractices.accessibility", {
                    returnObjects: true,
                  }) as string[]
                ).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={variants.card.default.padded() + " p-6"}>
              <h3 className={textVariants.heading.h3() + " mb-4"}>
                {t("bestPractices.performanceTitle")}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(
                  t("bestPractices.performance", {
                    returnObjects: true,
                  }) as string[]
                ).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={variants.card.default.padded() + " p-6"}>
              <h3 className={textVariants.heading.h3() + " mb-4"}>
                {t("bestPractices.uxGuidelinesTitle")}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(
                  t("bestPractices.uxGuidelines", {
                    returnObjects: true,
                  }) as string[]
                ).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={variants.card.default.padded() + " p-6"}>
              <h3 className={textVariants.heading.h3() + " mb-4"}>
                {t("bestPractices.technicalTitle")}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {(
                  t("bestPractices.technical", {
                    returnObjects: true,
                  }) as string[]
                ).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default OverlaysPortalsPage;
