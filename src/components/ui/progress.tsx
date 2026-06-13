'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { HStack } from '../utilities';
import Text from './text';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  showPercent?: boolean;
  fillColor?: string;
  backgroundColor?: string;
}

function Progress({
  className,
  value,
  showPercent = false,
  fillColor = '#31BA7C',
  backgroundColor = '#e5e5e5',
  ...props
}: ProgressProps) {
  const remainingValue = 100 - (value || 0);

  return (
    <HStack noWrap spacing={8} className='w-full'>
      {showPercent && (
        <Text size='sm' weight={500} style={{ color: fillColor }} className='hidden md:block'>
          {value?.toFixed(2)}%
        </Text>
      )}

      <ProgressPrimitive.Root
        data-slot='progress'
        className={cn('relative h-2 w-full flex-1 overflow-hidden rounded-full', className)}
        style={{ backgroundColor }}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot='progress-indicator'
          className='h-full w-full flex-1 transition-all'
          style={{ transform: `translateX(-${remainingValue}%)`, backgroundColor: fillColor }}
        />
      </ProgressPrimitive.Root>

      {showPercent && (
        <Text size='sm' weight={500} style={{ color: backgroundColor }} className='hidden md:block'>
          {remainingValue.toFixed(2)}%
        </Text>
      )}
    </HStack>
  );
}

export { Progress };
