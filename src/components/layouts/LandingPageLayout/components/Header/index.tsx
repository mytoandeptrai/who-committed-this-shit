'use client';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import Text from '@/components/ui/text';
import { HStack } from '@/components/utilities';
import { ROUTES } from '@/utils/routes';
import Link from 'next/link';

const Header = () => {
  return (
    <header
      className='fixed top-0 right-0 left-0 z-50 h-16 bg-[rgba(0,0,0,0.6)] py-4'
      style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
    >
      <HStack justify='between' className='container w-full'>
        <HStack noWrap spacing={8}>
          <Link href={ROUTES.HOME} className='inline-flex items-center gap-2'>
            <Icons.logo className='h-4 w-31 text-white' />
          </Link>
        </HStack>

        <Link className='w-fit' href={ROUTES.HOME}>
          <Button className='bg-landing-primary text-general-foreground hover:bg-landing-primary/70' asChild>
            <HStack noWrap>
              <Text size='sm' weight={500}>
                Enter App
              </Text>
              <Icons.arrowUpRight2 className='size-4' />
            </HStack>
          </Button>
        </Link>
      </HStack>
    </header>
  );
};

export default Header;
