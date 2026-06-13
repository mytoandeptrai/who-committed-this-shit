import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { env } from '@/utils/const';
import { ROUTES } from '@/utils/routes';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  socialClassName?: string;
  containerClassName?: string;
  hasContainerClass?: boolean;
}

const Footer = ({ className, socialClassName, containerClassName, hasContainerClass = true, ...props }: Props) => {
  return (
    <footer className={cn('border-t border-t-general-border bg-general-background-alt', className)} {...props}>
      <div
        className={cn(
          hasContainerClass ? 'container' : '',
          'flex flex-col items-start justify-center gap-4 pt-4 md:min-h-21 md:items-center md:justify-between md:gap-6 lg:min-h-23.5 lg:flex-row lg:gap-4',
          containerClassName
        )}
      >
        <div className='flex items-center gap-4'>
          <div className='inline-flex items-center gap-2'>
            <Icons.logo className='h-4 w-31 text-general-muted-foreground' />
          </div>

          <SocialItem
            icon={<Icons.twitter className='size-3 text-general-muted-foreground md:size-4' />}
            href={env.X_URL}
            className={socialClassName}
          />
          <SocialItem
            icon={<Icons.telegram className='size-3 text-general-muted-foreground md:size-4' />}
            href={env.TELEGRAM_URL}
            className={socialClassName}
          />
        </div>

        <div className='flex flex-col items-start gap-4 max-md:w-full md:gap-6 lg:flex-row lg:items-center lg:gap-4'>
          <div className='gap-2 max-md:grid max-md:w-full max-md:grid-cols-2 md:flex md:items-center md:gap-4'>
            <Link
              href={ROUTES.HOME}
              className='order-1 font-medium font-open-sauce-one text-general-muted-foreground text-xs transition-opacity hover:opacity-70 md:text-sm lg:order-0'
            >
              Home
            </Link>
          </div>

          <Text size='xs' className='text-center text-general-muted-foreground md:text-sm'>
            © 2026 All rights reserved
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocialItem = ({ href, icon, className }: { href: string; icon: ReactNode; className?: string }) => {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'rounded-xs border border-general-border p-2 transition-opacity duration-100 ease-linear hover:opacity-70',
        className
      )}
    >
      {icon}
    </Link>
  );
};
