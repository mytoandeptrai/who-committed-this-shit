'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type * as React from 'react';

import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-9999 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  );
}

function DialogCloseIcon({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' tabIndex={-1} {...props} />;
}

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  showCloseIcon?: boolean;
  closeIconClassName?: string;
  disabledClickOutside?: boolean;
}

function DialogContent({
  className,
  children,
  showCloseIcon = true,
  closeIconClassName,
  disabledClickOutside = false,
  onInteractOutside,
  ...props
}: DialogContentProps) {
  const handleInteractOutside: React.ComponentProps<typeof DialogPrimitive.Content>['onInteractOutside'] = (e) => {
    if (disabledClickOutside) {
      e.preventDefault();
      return;
    }

    onInteractOutside?.(e);
  };

  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        tabIndex={-3}
        onInteractOutside={handleInteractOutside}
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-99999 grid max-h-[65vh] w-full max-w-[calc(100vw-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-y-auto overflow-x-hidden rounded-lg border bg-background shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in max-md:top-auto max-md:bottom-4 max-md:w-[calc(100vw-32px)] max-md:translate-y-0 max-md:pb-[env(safe-area-inset-bottom)] md:max-w-[38.563rem]',
          className
        )}
        {...props}
      >
        {children}
        {showCloseIcon && (
          <DialogPrimitive.Close
            tabIndex={-1}
            className={cn(
              'absolute top-4 right-4 cursor-pointer ring-offset-background transition-opacity hover:opacity-70 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
              closeIconClassName
            )}
          >
            <Icons.close className='size-4 text-general-unofficial-mid-alt' />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-header'
      className={cn('flex flex-col gap-2 border-b border-b-general-border p-4 text-left', className)}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-body'
      className={cn('flex flex-col gap-6 bg-transparent! p-4 md:p-6', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn('flex flex-row gap-2 border-general-border border-t p-4 sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn('font-open-sauce-one font-semibold text-general-foreground text-xl leading-none', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
