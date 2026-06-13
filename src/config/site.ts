import { env } from '@/utils/const';

export type SiteConfig = typeof siteConfig;

export const isProductionEnv = env.APP_ENV === 'production';

export const siteConfig = {
  appUrl: env.APP_URL,
  canonicalUrl: env.APP_URL || 'http://localhost:3000',
  name: env.APP_NAME,
  description: 'A Next.js Web3 dApp boilerplate with RainbowKit, wagmi, and multi-chain support.',
  ogImage: `${env.APP_URL}/og-image.jpg`,
};
