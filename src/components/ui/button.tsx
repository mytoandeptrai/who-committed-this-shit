import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import Spinner from './spinner';

const buttonVariants = cva(
  "inline-flex cursor-pointer font-open-sauce-one items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-within:ring-2 focus-within:ring-focus-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-general-primary text-general-primary-foreground shadow-xs hover:bg-general-unofficial-primary-hover',
        secondary:
          'bg-general-secondary text-general-secondary-foreground hover:bg-general-unofficial-secondary-hover shadow-xs',
        outline:
          'text-general-foreground border border-general-unofficial-border-3 bg-general-unofficial-outline hover:bg-general-unofficial-outline-hover shadow-xs focus-within:border-general-unofficial-border-4',
        ghost:
          'bg-general-unofficial-ghost text-general-unofficial-ghost-foreground hover:bg-general-unofficial-ghost-hover',
        destructive:
          'shadow-xs bg-general-destructive text-white focus-within:ring-focus-ring-error hover:bg-general-destructive',
        'ghost-muted':
          'bg-general-unofficial-ghost text-general-unofficial-ghost-foreground focus-within:bg-general-unofficial-ghost focus-within:text-general-unofficial-ghost-foreground hover:bg-general-unofficial-ghost-hover hover:text-general-foreground',
        link: 'text-general-foreground hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        lg: 'h-10 px-6 py-2.5',
        sm: 'h-8 px-3 py-1.5',
        xs: 'h-6 px-2 py-1 rounded-[4px]',
        icon: 'size-9 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'prefix'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  children,
  isLoading,
  disabled,
  prefix,
  suffix,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  const getContent = () => {
    if (isLoading) return <Spinner />;

    if (asChild) return children;

    return (
      <>
        {prefix && <span className='flex items-center'>{prefix}</span>}
        {children}
        {suffix && <span className='flex items-center'>{suffix}</span>}
      </>
    );
  };

  return (
    <Comp
      disabled={disabled || isLoading}
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {getContent()}
    </Comp>
  );
};

export { Button, buttonVariants };
