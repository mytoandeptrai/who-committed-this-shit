'use client';

import { fontEBGaramond, fontMono, fontOpenSauceOne, fontSans } from '@/config/fonts';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang='en'>
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
        <div className='flex min-h-screen flex-col items-center justify-center gap-4 text-white'>
          <h1 className='font-bold text-4xl'>404</h1>
          <p className='text-neutral-400'>Page not found.</p>
          <Link href='/' className='text-sm underline underline-offset-4'>
            Go back home
          </Link>
        </div>
      </body>
    </html>
  );
}
