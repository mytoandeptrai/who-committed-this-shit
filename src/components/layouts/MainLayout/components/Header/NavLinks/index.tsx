'use client';

import { Icons } from '@/assets/icons';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Text from '@/components/ui/text';
import { HStack, VStack } from '@/components/utilities';
import { ROUTES } from '@/utils/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../../Footer';

const nav_links = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Client Request', href: ROUTES.CLIENT_REQUEST },
  { label: 'Server Request', href: ROUTES.SERVER_REQUEST },
];

const NavLinks = () => {
  return (
    <HStack noWrap spacing={0} className='hidden lg:flex xl:gap-4'>
      {nav_links.map((nav) => (
        <Link key={nav.label} href={nav.href} className='group px-2 py-1 xl:px-4 xl:py-2'>
          <Text
            size='sm'
            weight={500}
            className='text-muted-foreground transition-opacity duration-200 ease-in-out group-hover:opacity-50'
          >
            {nav.label}
          </Text>
        </Link>
      ))}
    </HStack>
  );
};

const MobileNavLinks = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='lg:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='focus-within:outline-none focus-within:ring-0'>
            <Icons.menu className='size-5 text-foreground' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='overflow-y-auto p-0'>
          <SheetHeader className='flex flex-1 flex-col space-y-2'>
            <SheetTitle className='p-4'>
              <HStack noWrap spacing={8}>
                <Icons.logoIllust className='h-4 w-2 text-foreground' />
                <Icons.logo className='h-4 w-31 text-foreground' />
              </HStack>
            </SheetTitle>

            <VStack className='h-[calc(100vh-68px)]' justify='between'>
              <VStack spacing={8} className='px-4'>
                {nav_links.map((nav) => (
                  <Link
                    onClick={() => setOpen(false)}
                    key={nav.label}
                    href={nav.href}
                    className='flex items-center gap-2 py-3'
                  >
                    <Text
                      size='sm'
                      weight={500}
                      className='text-foreground transition-opacity duration-200 ease-in-out hover:opacity-50'
                    >
                      {nav.label}
                    </Text>
                  </Link>
                ))}
              </VStack>

              <VStack spacing={16} className='border-t border-t-border p-4'>
                <HStack spacing={8}>
                  <ConnectButton />
                  <ThemeToggle />
                  <LanguageSwitcher />
                </HStack>

                <Footer
                  className='border-t border-t-border'
                  socialClassName='border-border'
                  containerClassName='md:flex-col'
                  hasContainerClass={false}
                />
              </VStack>
            </VStack>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { MobileNavLinks, NavLinks };
