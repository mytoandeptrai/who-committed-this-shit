'use client';

import { Icons } from '@/assets/icons';
import { useState } from 'react';

const STORAGE_KEY = 'announce_banner_dismissed';

const AnnounceBanner = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEY) !== 'true';
  });

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-announce-banner='true'
      className='relative flex items-start justify-center gap-2 bg-[#CEF971] px-4 py-3 pr-10 text-black text-sm sm:py-2.5 min-[60rem]:h-10'
    >
      <span className='flex items-start gap-2 sm:items-center'>
        <span className='align-middle leading-snug'>
          <Icons.telegram size={20} className='mr-2 inline h-5 w-5 shrink-0 fill-black text-black sm:mt-0' />
          Welcome! Connect your wallet to get started.
        </span>
      </span>

      <button
        type='button'
        onClick={handleClose}
        aria-label='Close banner'
        className='-translate-y-1/2 absolute top-1/2 right-4 text-black transition-all hover:opacity-60'
      >
        <Icons.close size={24} className='h-6 w-6' />
      </button>
    </div>
  );
};

export default AnnounceBanner;
