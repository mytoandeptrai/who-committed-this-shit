import { env } from '@/utils/const';

export type SiteConfig = typeof siteConfig;

export const isProductionEnv = env.APP_ENV === 'production';

export const siteConfig = {
  appUrl: env.APP_URL,
  canonicalUrl: env.APP_URL || 'http://localhost:3000',
  name: env.APP_NAME,
  description: 'Personal technical blog',
  ogImage: `${env.APP_URL}/og-image.jpg`,
};
