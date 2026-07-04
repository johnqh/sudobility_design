import { type SEOHeadConfig } from '@sudobility/seo_lib';
import { CONSTANTS } from './constants';
import { supportedLanguages } from '../i18n';

export const seoHeadConfig: SEOHeadConfig = {
  appName: CONSTANTS.APP_NAME,
  baseUrl: `https://${CONSTANTS.APP_DOMAIN}`,
  defaultOgImage: `https://${CONSTANTS.APP_DOMAIN}/logo.png`,
  twitterHandle: undefined,
  supportedLanguages: supportedLanguages as unknown as string[],
  defaultLanguage: 'en',
  applicationCategory: 'BusinessApplication',
};
