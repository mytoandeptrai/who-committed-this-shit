import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type { RoundType } from '@/types';
import { formatNumber, numberFormatter } from '@/utils/common';
import { useMemo } from 'react';
import Text, { type TextProps } from '../ui/text';
import { Tooltip } from '../ui/tooltip';
import { HStack } from '../utilities';

interface FormattedPercentProps extends Omit<TextProps, 'prefix'> {
  prefix?: string;
  suffix?: string;
  value: number;
  digits?: number;
  roundType?: RoundType;
  showArrow?: boolean;
}

const FormattedPercent = ({
  value,
  digits = 2,
  roundType = 'floor',
  className,
  prefix,
  suffix,
  showArrow = false,
  ...props
}: FormattedPercentProps) => {
  const isSmallerThanTwoDecimalPlaces = value !== 0 && Math.abs(value) < 0.01;
  const isSmallerThanFiveDecimalPlaces = value !== 0 && Math.abs(value) < 0.00001;
  const isPositive = value > 0;

  const tooltipContent = useMemo(() => {
    if (isSmallerThanFiveDecimalPlaces) return `${value < 0 ? '-' : ''}<0.00001%`;

    const formattedValue = formatNumber(value, 'en-US', {
      roundingMode: roundType === 'round' ? 'halfEven' : roundType,
    });

    return `${formattedValue}%`;
  }, [value, roundType, isSmallerThanFiveDecimalPlaces]);

  const roundTypeValue: RoundType = useMemo(() => {
    if (isSmallerThanFiveDecimalPlaces) {
      return 'floor';
    }

    if (Number(value) < 0) {
      return 'ceil';
    }

    return roundType;
  }, [roundType, isSmallerThanFiveDecimalPlaces, value]);

  return (
    <HStack spacing={8} noWrap className='inline-flex'>
      <Tooltip content={tooltipContent}>
        <Text className={className} {...props}>
          {prefix ? prefix : ''}
          {isSmallerThanTwoDecimalPlaces
            ? `${value < 0 ? '-' : ''}<0.01%`
            : `${numberFormatter(value, digits, roundTypeValue)}%`}
          {suffix ? suffix : ''}
        </Text>
      </Tooltip>

      {showArrow && value !== 0 && (
        <Icons.arrowUp
          className={cn('size-4 text-semantic-success-foreground opacity-50', {
            'rotate-180 text-semantic-error-foreground': !isPositive,
          })}
        />
      )}
    </HStack>
  );
};

export default FormattedPercent;
