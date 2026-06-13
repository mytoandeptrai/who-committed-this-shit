import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';
import Text from '../ui/text';
import { Tooltip } from '../ui/tooltip';
import { HStack, VStack } from '../utilities';

interface MetaDataProps {
  icon: ReactNode;
  label: string;
  value: ReactNode | string;
  isLoading?: boolean;
  tooltip?: string;
  titleClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
  skeletonClassName?: string;
}

export const MetaData: FC<MetaDataProps> = ({
  icon,
  label,
  value,
  isLoading,
  tooltip,
  titleClassName,
  labelClassName,
  valueClassName,
  className,
  skeletonClassName,
}) => {
  const content =
    typeof value === 'string' ? (
      <Text size='sm' weight={500} className='text-general-primary'>
        {value}
      </Text>
    ) : (
      value
    );

  return (
    <VStack spacing={8} justify='between' className={cn('flex-col lg:flex-row', className)}>
      <HStack spacing={8} className={cn('flex-1', titleClassName)} noWrap>
        {icon}
        <HStack noWrap spacing={8}>
          <Text size='sm' className={cn('text-general-muted-foreground', labelClassName)}>
            {label}
            {tooltip && (
              <Tooltip side='top' content={tooltip} textClassName='lg:max-w-96'>
                <Icons.info className='ml-2 size-4 translate-y-0.5 text-general-muted-foreground' />
              </Tooltip>
            )}
          </Text>
        </HStack>
      </HStack>

      <div className={cn('flex-1', valueClassName)}>
        {isLoading ? <Skeleton className={cn('h-6 w-40', skeletonClassName)} /> : content}
      </div>
    </VStack>
  );
};
