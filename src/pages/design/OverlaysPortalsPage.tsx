import {
  ArrowRightOnRectangleIcon,
  CogIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import {
  Button,
  Dropdown,
  LoadingState,
  Modal,
  ModalContent,
  ModalFooter,
  Section,
} from '@sudobility/components';
import { textVariants, ui, variants } from '@sudobility/design';

interface AppProps {
  emailDomain: string;
  appName: string;
}

const OverlaysPortalsPage: React.FC<AppProps> = ({
  emailDomain: _emailDomain,
  appName: _appName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingOverlayOpen, setIsLoadingOverlayOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState('');

  const dropdownItems = [
    {
      id: 'profile',
      label: 'View Profile',
      icon: UserIcon,
      onClick: () => alert('Profile clicked'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: CogIcon,
      onClick: () => alert('Settings clicked'),
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: ArrowRightOnRectangleIcon,
      onClick: () => alert('Sign out clicked'),
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
          <h1 className={textVariants.heading.h1()}>Overlays & Portals</h1>
          <p className={textVariants.body.lg() + ' mt-4'}>
            Comprehensive overlay system including modals, dropdowns, tooltips, sheets, and loading
            states with proper z-index management and accessibility.
          </p>
        </div>

        {/* Modals Section */}
        <Section>
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Modals</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Modal dialogs with backdrop blur, animation states, and multiple sizes. Includes focus
            management and keyboard navigation.
          </p>

          <div className={variants.card.default.padded() + ' mb-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Interactive Example</h3>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="medium"
            >
              <ModalContent>
                <div className="space-y-4">
                  <p className={textVariants.body.md()}>
                    This is an example modal using the new overlay design system. It includes proper
                    backdrop handling, focus management, and animation states.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={ui.background.subtle + ' p-4'}>
                      <h4 className={textVariants.heading.h5() + ' mb-2'}>Features</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Backdrop blur effect</li>
                        <li>• Focus trap and restoration</li>
                        <li>• Keyboard navigation</li>
                        <li>• Multiple size variants</li>
                      </ul>
                    </div>
                    <div className={ui.background.subtle + ' p-4'}>
                      <h4 className={textVariants.heading.h5() + ' mb-2'}>Accessibility</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• ARIA labels and roles</li>
                        <li>• Escape key handling</li>
                        <li>• Screen reader support</li>
                        <li>• Focus management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ModalContent>
              <ModalFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </div>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Dropdowns</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Dropdown menus with multiple positioning options, icons, dividers, and keyboard
            navigation.
          </p>

          <div className={variants.card.default.padded() + ' mb-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Interactive Example</h3>
            <div className="flex space-x-4">
              <Dropdown
                trigger={
                  <Button variant="outline">
                    <EllipsisVerticalIcon className={variants.icon.variant.muted.sm() + ' mr-2'} />
                    Actions
                  </Button>
                }
                items={dropdownItems}
                align="left"
              />

              <Dropdown
                trigger={
                  <Button>
                    User Menu
                    <EllipsisVerticalIcon
                      className={variants.icon.variant.interactive.sm() + ' ml-2'}
                    />
                  </Button>
                }
                items={dropdownItems}
                align="right"
              />
            </div>
          </div>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Tooltips</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Lightweight tooltips with multiple positioning options and color variants.
          </p>

          <div className={variants.card.default.padded() + ' mb-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Interactive Example</h3>
            <div className="flex flex-wrap gap-4">
              {['top', 'bottom', 'left', 'right'].map(position => (
                <div key={position} className="relative">
                  <Button
                    variant="outline"
                    onMouseEnter={() => setTooltipVisible(position)}
                    onMouseLeave={() => setTooltipVisible('')}
                  >
                    Hover for {position} tooltip
                  </Button>
                  {tooltipVisible === position && (
                    <>
                      <div
                        className={`${variants.overlays.tooltip.container()} ${variants.overlays.tooltip[
                          position as keyof typeof variants.overlays.tooltip
                        ]()}`}
                      >
                        Tooltip on {position}
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

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Loading Overlays</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Full-screen and inline loading states with backdrop blur and customizable messaging.
          </p>

          <div className={variants.card.default.padded() + ' mb-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Interactive Example</h3>
            <div className="space-y-4">
              <div>
                <Button onClick={showLoadingOverlay}>Show Loading Overlay</Button>
              </div>

              <div className="border rounded-lg p-4 bg-muted relative h-32">
                <p className={textVariants.body.sm() + ' mb-2'}>Inline Loading State:</p>
                <LoadingState message="Processing your request..." size="small" />
              </div>
            </div>

            {isLoadingOverlayOpen && (
              <LoadingState fullScreen message="Processing your request..." size="large" />
            )}
          </div>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Sheets (Bottom Sheets)</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Mobile-first bottom sheets and action sheets that slide up from the bottom of the
            screen.
          </p>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Context Menus</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Right-click context menus with keyboard shortcuts and nested submenus.
          </p>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Usage</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Portal Management</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Z-index management system and portal utilities for proper overlay stacking.
          </p>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Z-Index Layers</h3>
            <div className="space-y-3">
              {[
                {
                  name: 'Backdrop',
                  value: '40',
                  class: variants.overlays.portal.backdrop(),
                },
                {
                  name: 'Popover',
                  value: '40',
                  class: variants.overlays.portal.popover(),
                },
                {
                  name: 'Dropdown',
                  value: '50',
                  class: variants.overlays.portal.dropdown(),
                },
                {
                  name: 'Tooltip',
                  value: '50',
                  class: variants.overlays.portal.tooltip(),
                },
                {
                  name: 'Modal',
                  value: '50',
                  class: variants.overlays.portal.modal(),
                },
                {
                  name: 'Sheet',
                  value: '50',
                  class: variants.overlays.portal.sheet(),
                },
                {
                  name: 'Context Menu',
                  value: '50',
                  class: variants.overlays.portal.contextMenu(),
                },
                {
                  name: 'Loading',
                  value: '60',
                  class: variants.overlays.portal.loading(),
                },
                {
                  name: 'Notification',
                  value: '70',
                  class: variants.overlays.portal.notification(),
                },
              ].map(layer => (
                <div
                  key={layer.name}
                  className="flex items-center justify-between p-3 bg-muted rounded"
                >
                  <span className={textVariants.body.sm()}>{layer.name}</span>
                  <span className={`${variants.badge.default()} font-mono`}>z-{layer.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={variants.card.default.padded() + ' p-6 mt-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Focus Management</h3>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Animation States</h2>
          <p className={textVariants.body.md() + ' mb-6'}>
            Consistent animation states for enter/exit transitions across all overlay components.
          </p>

          <div className={variants.card.default.padded() + ' p-6'}>
            <h3 className={textVariants.heading.h3() + ' mb-4'}>Available States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={textVariants.heading.h5() + ' mb-3'}>Modal States</h4>
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
                <h4 className={textVariants.heading.h5() + ' mb-3'}>Dropdown States</h4>
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
          <h2 className={textVariants.heading.h2() + ' mb-6'}>Best Practices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={variants.card.default.padded() + ' p-6'}>
              <h3 className={textVariants.heading.h3() + ' mb-4'}>Accessibility</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always provide proper ARIA labels and roles</li>
                <li>• Implement focus trapping for modals</li>
                <li>• Support keyboard navigation (Tab, Escape, Arrow keys)</li>
                <li>• Maintain focus order and restoration</li>
                <li>• Use semantic HTML elements</li>
                <li>• Provide screen reader announcements</li>
              </ul>
            </div>

            <div className={variants.card.default.padded() + ' p-6'}>
              <h3 className={textVariants.heading.h3() + ' mb-4'}>Performance</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use React Portals for proper DOM rendering</li>
                <li>• Implement lazy loading for heavy overlays</li>
                <li>• Clean up event listeners on unmount</li>
                <li>• Use CSS transforms for animations</li>
                <li>• Avoid complex backdrop filters on mobile</li>
                <li>• Minimize layout thrashing</li>
              </ul>
            </div>

            <div className={variants.card.default.padded() + ' p-6'}>
              <h3 className={textVariants.heading.h3() + ' mb-4'}>UX Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep modals focused on single tasks</li>
                <li>• Provide clear close affordances</li>
                <li>• Use appropriate overlay types for context</li>
                <li>• Maintain consistent animation timing</li>
                <li>• Consider mobile viewport constraints</li>
                <li>• Avoid nested overlay interactions</li>
              </ul>
            </div>

            <div className={variants.card.default.padded() + ' p-6'}>
              <h3 className={textVariants.heading.h3() + ' mb-4'}>Technical</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use proper z-index layering system</li>
                <li>• Handle body scroll locking correctly</li>
                <li>• Support both click and keyboard interactions</li>
                <li>• Test across different viewport sizes</li>
                <li>• Consider reduced motion preferences</li>
                <li>• Implement proper error boundaries</li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default OverlaysPortalsPage;
