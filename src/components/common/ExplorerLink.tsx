'use client';

import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import { env } from '@/utils/const';
import Link, { type LinkProps } from 'next/link';

export interface ExplorerLinkProps extends Omit<LinkProps, 'href'> {
  address?: string;
  className?: string;
  iconClassName?: string;
  icon?: React.ReactElement;
  type?: 'address' | 'tx';
  href?: string;
}

export const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  address,
  className,
  iconClassName,
  icon,
  href,
  type = 'address',
  ...props
}) => {
  if (!address && !href) return null;

  return (
    <Link
      href={href || `${env.EXPLORER_URL}/${type}/${address}`}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(className)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      {...props}
    >
      {icon || (
        <Icons.squareArrowOutUpRight
          className={cn(
            'h-4 w-4 text-general-muted-foreground opacity-50 transition-opacity duration-100 ease-linear hover:opacity-100 md:h-3 md:w-3',
            iconClassName
          )}
        />
      )}
    </Link>
  );
};
