'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import type * as React from 'react';

import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />;
}

function SheetOverlay({
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay> & {
  showCloseButton?: boolean;
}) {
  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-104 bg-[#666666] data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    >
      {showCloseButton && (
        <SheetPrimitive.Close className='absolute top-4 right-4 cursor-pointer p-2.5 transition-opacity hover:opacity-70 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
          <Icons.close className='size-4 text-white' />

          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Overlay>
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  overlayClassName,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  overlayClassName?: string;
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay className={overlayClassName} showCloseButton={showCloseButton} />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'fixed z-105 flex flex-col gap-4 bg-[#0A0A0A] p-4 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sheet-header' className={cn('flex flex-col gap-1.5', className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sheet-footer' className={cn('mt-auto flex flex-col gap-2', className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={cn('font-open-sauce-one font-semibold text-general-foreground text-xl', className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger };
