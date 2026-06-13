'use client';

import useMobile from '@/hooks/useMobile';
import { ProgressProvider } from '@bprogress/next/app';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

export interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const isMobile = useMobile();

  return (
    <ProgressProvider height='2px' color='#fff' options={{ showSpinner: false }} shallowRouting>
      {children}
      <Toaster
        position={!isMobile ? 'bottom-right' : 'top-right'}
        richColors
        toastOptions={{
          className: '!rounded-xl',
        }}
      />
    </ProgressProvider>
  );
}

export default Providers;
