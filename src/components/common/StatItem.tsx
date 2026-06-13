import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';
import Text from '../ui/text';
import { Tooltip } from '../ui/tooltip';
import { HStack, Show, VStack } from '../utilities';
import Card from './Card';
import FormattedNumber from './FormattedNumber';

interface StatItemProps {
  title: string;
  value: number | ReactNode;
  tooltip?: string;
  prefix?: string;
  isLoading?: boolean;
  className?: string;
  contentClassName?: string;
  minimumFractionDigits?: number;
  footer?: ReactNode;
}

export const StatItem: FC<StatItemProps> = ({
  title,
  value,
  tooltip,
  prefix,
  isLoading,
  className,
  contentClassName,
  minimumFractionDigits = 0,
  footer,
}) => {
  const content =
    typeof value === 'number' ? (
      <FormattedNumber
        className='w-fit'
        weight={600}
        value={value}
        prefix={prefix}
        minimumFractionDigits={minimumFractionDigits}
      />
    ) : (
      value
    );

  return (
    <Card className={cn('flex flex-col items-start justify-between', className)}>
      <HStack spacing={8} noWrap className='w-full max-md:items-start max-md:justify-between'>
        <Text size='sm' className='text-general-muted-foreground'>
          {title}
        </Text>

        {tooltip && (
          <Tooltip content={tooltip} className='md:max-w-96'>
            <Icons.info className='size-4 text-general-muted-foreground max-md:translate-y-0.5' />
          </Tooltip>
        )}
      </HStack>

      <VStack spacing={4} className='w-full'>
        {isLoading ? <Skeleton className='h-6 w-20' /> : <div className={cn('w-fit', contentClassName)}>{content}</div>}

        <Show when={!!footer}>{footer}</Show>
      </VStack>
    </Card>
  );
};
