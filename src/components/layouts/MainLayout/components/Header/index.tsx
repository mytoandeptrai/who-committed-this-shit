'use client';

import { Icons } from '@/assets/icons';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';
import { HStack } from '@/components/utilities';
import { ROUTES } from '@/utils/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { MobileNavLinks, NavLinks } from './NavLinks';

const Header = () => {
  return (
    <header className='sticky top-0 z-100 h-16 border-b border-b-border bg-background py-4'>
      <HStack justify='between' className='container'>
        <HStack noWrap spacing={16}>
          <HStack className='gap-0.5'>
            <MobileNavLinks />

            <HStack noWrap spacing={8}>
              <Link href={ROUTES.HOME} className='inline-flex items-center gap-2'>
                <Icons.logo className='h-2.5 w-20 text-foreground md:h-4 md:w-31' />
              </Link>
            </HStack>
          </HStack>

          <NavLinks />
        </HStack>

        <HStack noWrap spacing={8}>
          <LanguageSwitcher />
          <ThemeToggle />
          <ConnectButton />
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
