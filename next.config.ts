import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const configureSvgWebpack = (config: any) => {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
    // Convert all other *.svg imports to React components
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    }
  );
  // Modify the file loader rule to ignore *.svg, since we have it handled now.
  fileLoaderRule.exclude = /\.svg$/i;

  // Suppress known false-positive warnings from wagmi/WalletConnect/viem deps
  config.ignoreWarnings = [/pino-pretty/, /Critical dependency/];

  return config;
};

const isProductionEnv = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  async headers() {
    if (isProductionEnv) return [];
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  // Turbopack config for dev (replaces deprecated experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: process.env.NODE_ENV === 'development' ? undefined : configureSvgWebpack,
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
