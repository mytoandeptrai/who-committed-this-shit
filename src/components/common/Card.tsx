import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';
import Text from '../ui/text';
import { Tooltip } from '../ui/tooltip';
import { HStack } from '../utilities';

export interface CardProps extends ComponentProps<'div'> {
  title?: string;
  tooltip?: string;
}

const Card: FC<CardProps> = ({ children, title, tooltip, className, ...props }) => {
  return (
    <div
      className={cn('relative rounded-[0.563rem] border border-general-border bg-general-background p-4', className)}
      {...props}
    >
      {title && (
        <HStack spacing={8} noWrap className='max-md:items-start max-md:justify-between'>
          <h4>
            <Text size='sm' className='text-general-muted-foreground'>
              {title}
            </Text>
          </h4>

          {tooltip && (
            <Tooltip content={tooltip}>
              <Icons.info className='size-4 text-general-muted-foreground' />
            </Tooltip>
          )}
        </HStack>
      )}
      {children}
    </div>
  );
};

export default Card;
