import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import type { FC } from 'react';
import Text from '../ui/text';
import { HStack } from '../utilities';
import type { HStackProps } from '../utilities/h-stack';

const badgeVariants = cva('rounded-md px-2 py-0.75', {
  variants: {
    variant: {
      outline: 'border border-general-border bg-general-unofficial-outline',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

export interface BadgeProps extends Omit<HStackProps, 'prefix'>, VariantProps<typeof badgeVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value: string | React.ReactNode;
  valueClassName?: string;
}

const Badge: FC<BadgeProps> = ({ prefix, suffix, value, valueClassName, spacing, variant, className, ...props }) => {
  return (
    <HStack spacing={spacing} noWrap className={cn(badgeVariants({ variant, className }))} {...props}>
      {prefix}
      {typeof value === 'string' ? (
        <Text size='xs' weight={500} className={valueClassName}>
          {value}
        </Text>
      ) : (
        value
      )}
      {suffix}
    </HStack>
  );
};

export default Badge;
