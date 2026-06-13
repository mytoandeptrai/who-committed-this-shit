'use client';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Toggle theme'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Icons.sun className='size-5' /> : <Icons.moon className='size-5' />}
    </Button>
  );
};

export default ThemeToggle;
