'use client';

import { Icons } from '@/assets/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const SwitchTheme = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const isEnabled = theme === 'dark';

  const onSwitchChange = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !theme) {
      const systemTheme =
        resolvedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      setTheme(systemTheme);
    }
  }, [mounted, theme, resolvedTheme, setTheme]);

  return (
    <button
      type='button'
      onClick={onSwitchChange}
      aria-label={isEnabled ? 'Switch to light mode' : 'Switch to dark mode'}
      className='relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-dark-900 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
    >
      <Icons.sun className='block dark:hidden' />
      <Icons.moon className='hidden dark:block' />
    </button>
  );
};

export default SwitchTheme;
