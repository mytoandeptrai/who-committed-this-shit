'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 text-white'>
      <h1 className='font-bold text-4xl'>404</h1>
      <p className='text-neutral-400'>Page not found.</p>
      <Link href='/' className='text-sm underline underline-offset-4'>
        Go back home
      </Link>
    </div>
  );
}
