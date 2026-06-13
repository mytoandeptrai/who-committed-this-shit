import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import Text from '../ui/text';
import { HStack, type HStackProps } from '../utilities/h-stack';
import FormattedPercent from './FormattedPercent';

type ProgressSegment = {
  label: string;
  percentage: number;
  color: string;
};

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  segments: ProgressSegment[];
  legend?: boolean;
  containerClassName?: string;
};

const SegmentProgress = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, Props>(
  ({ className, segments, legend = false, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-2', containerClassName)}>
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-2 w-full overflow-hidden rounded bg-slate-200', className)}
          {...props}
        >
          {segments.map((segment, index) => (
            <ProgressPrimitive.Indicator
              key={index}
              className='absolute top-0 h-full transition-all'
              style={{
                width: `${segment.percentage}%`,
                left: `${segments.slice(0, index).reduce((acc, segment) => acc + segment.percentage, 0)}%`,
                zIndex: segments.length - index,
                backgroundColor: segment.color,
              }}
            />
          ))}
        </ProgressPrimitive.Root>

        {legend && (
          <HStack spacing={8}>
            {segments.map((segment, index) => (
              <ProgressLegend key={index} {...segment} />
            ))}
          </HStack>
        )}
      </div>
    );
  }
);

SegmentProgress.displayName = 'SegmentProgress';

interface ProgressLegendProps extends ProgressSegment, Omit<HStackProps, 'value' | 'label' | 'color'> {}

const ProgressLegend = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, ProgressLegendProps>(
  ({ className, color, label, percentage, ...props }, ref) => {
    return (
      <HStack ref={ref} spacing={8} noWrap className={className} {...props}>
        <span className='rounded-full border border-general-border p-1'>
          <Icons.diskCircle style={{ color }} className='size-3.25' />
        </span>
        <Text size='xs' className='text-general-muted-foreground'>
          {label}:
        </Text>

        <FormattedPercent size='xs' weight={500} value={percentage} roundType='round' />
      </HStack>
    );
  }
);

ProgressLegend.displayName = 'ProgressLegend';

export { SegmentProgress };
