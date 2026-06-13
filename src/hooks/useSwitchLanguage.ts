'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useSwitchLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = useCallback(
    (newLocale: string) => {
      const newPath = `/${newLocale}${pathname}`;
      router.replace(newPath);
    },
    [router, pathname]
  );

  return {
    switchLanguage,
  };
};

export default useSwitchLanguage;
