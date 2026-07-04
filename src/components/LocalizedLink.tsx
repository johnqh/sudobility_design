import React from 'react';
import { LocalizedLink as SharedLocalizedLink } from '@sudobility/components';
import type { LinkProps } from 'react-router-dom';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

const isLanguageSupported = (lang: string): boolean =>
  (supportedLanguages as readonly string[]).includes(lang);

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: SupportedLanguage;
}

/**
 * App-specific wrapper around the shared LocalizedLink component.
 * Prefixes the active language and validates against this app's language list.
 */
export const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  to,
  language,
  children,
  ...props
}) => (
  <SharedLocalizedLink
    to={to}
    language={language}
    isLanguageSupported={isLanguageSupported}
    defaultLanguage="en"
    {...props}
  >
    {children}
  </SharedLocalizedLink>
);

export default LocalizedLink;
