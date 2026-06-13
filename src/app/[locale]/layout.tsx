import ThemeProvider from '@/components/providers/ThemeProvider';
import { fontEBGaramond, fontMono, fontOpenSauceOne, fontSans } from '@/config/fonts';
import { isProductionEnv, siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import WalletContextProvider from '@/providers/WalletContextProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Providers from './providers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteConfig.canonicalUrl),
    title: siteConfig.name,
    description: siteConfig.description,
    generator: 'Next.js',
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    keywords: [],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: isProductionEnv
      ? undefined
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false, noimageindex: true },
        },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      url: siteConfig.canonicalUrl,
      images: [siteConfig.ogImage],
      description: siteConfig.description,
      // title: {
      //   default: siteConfig.name,
      //   template: `${siteConfig.name} - %s`,
      // },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: `@${siteConfig.name}`,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const revalidate = 300; // Cache for 5 minutes
export const dynamic = 'force-static'; // Enable static generation where possible

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          'bg-background antialiased',
          fontSans.variable,
          fontMono.variable,
          fontEBGaramond.variable,
          fontOpenSauceOne.variable
        )}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <WalletContextProvider>
              <Providers>{children}</Providers>
            </WalletContextProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
    </html>
  );
}
