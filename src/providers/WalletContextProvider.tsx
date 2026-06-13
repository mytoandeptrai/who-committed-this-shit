'use client';

import { wagmiConfig } from '@/config/wagmi';
import { type Locale, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: false,
    },
  },
});

const RAINBOWKIT_LOCALE_MAP: Record<string, Locale> = {
  en: 'en',
  vi: 'vi-VN',
};

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const rainbowKitTheme = useMemo(
    () => (mounted && resolvedTheme === 'dark' ? darkTheme() : lightTheme()),
    [mounted, resolvedTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize='compact' theme={rainbowKitTheme} locale={RAINBOWKIT_LOCALE_MAP[locale] ?? 'en'}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletContextProvider;
