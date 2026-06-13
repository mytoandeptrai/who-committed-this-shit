'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@mantine/hooks';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import Text from './text';

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />;
}

function TooltipWrapper({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-103 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-primary p-2 text-popover-popover-foreground duration-150 data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='z-103 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-primary fill-primary' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

interface TooltipProps extends Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, 'children' | 'content'> {
  title?: string;
  content: React.ReactNode;
  textClassName?: string;
  triggerClassName?: string;
  arrowClassName?: string;
}

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  title,
  children,
  content,
  className,
  textClassName,
  triggerClassName,
  arrowClassName,
  side = 'right',
  asChild,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 60rem)');
  const popoverRef = React.useRef<HTMLButtonElement>(null);

  useClickOutside(popoverRef, () => setOpen(false), open && isMobile);
  useScroll(() => setOpen(false), open && isMobile);

  if (isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={popoverRef}
          className={triggerClassName}
          asChild={asChild}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {children}
        </PopoverTrigger>
        <PopoverContent
          side={side}
          className={cn(className)}
          arrowClassName={arrowClassName}
          onOpenAutoFocus={(e) => e.preventDefault()}
          {...props}
        >
          {!!title && (
            <Text
              size='xs'
              weight={500}
              className={cn('wrap-break-word w-full max-w-51 text-wrap text-popover-popover-foreground', textClassName)}
            >
              {title}
            </Text>
          )}
          {typeof content === 'string' ? (
            <Text
              size='xs'
              className={cn(
                'wrap-break-word w-full max-w-[37vw] text-wrap text-popover-popover-foreground md:max-w-51',
                textClassName
              )}
            >
              {content}
            </Text>
          ) : (
            content
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipWrapper>
      <TooltipTrigger
        className={triggerClassName}
        asChild={asChild}
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn(className)}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick?.(e);
        }}
        {...props}
      >
        {!!title && (
          <Text
            size='xs'
            weight={500}
            className={cn('wrap-break-word w-full max-w-51 text-wrap text-popover-popover-foreground', textClassName)}
          >
            {title}
          </Text>
        )}

        {typeof content === 'string' ? (
          <Text
            size='xs'
            className={cn('wrap-break-word w-full max-w-51 text-wrap text-popover-popover-foreground', textClassName)}
          >
            {content}
          </Text>
        ) : (
          content
        )}
      </TooltipContent>
    </TooltipWrapper>
  );
};

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipWrapper };
