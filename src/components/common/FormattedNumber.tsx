import type { RoundType } from '@/types';
import { convertToNumber, formatNumber, numberFormatter } from '@/utils/common';
import { useMemo } from 'react';
import Text, { type TextProps } from '../ui/text';
import { Tooltip } from '../ui/tooltip';

interface FormattedNumberProps extends Omit<TextProps, 'prefix'> {
  value: number | string | null;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  roundType?: RoundType;
  minimumFractionDigits?: number;
  digits?: number;
  tooltipTriggerClassName?: string;
  tooltipClassName?: string;
  showEmpty?: boolean;
  prefixClassName?: string;
  suffixClassName?: string;
}

const FormattedNumber = ({
  value,
  prefix,
  suffix,
  roundType = 'floor',
  minimumFractionDigits = 2,
  digits = 2,
  className,
  tooltipTriggerClassName,
  tooltipClassName,
  showEmpty = true,
  prefixClassName,
  suffixClassName,
  ...props
}: FormattedNumberProps) => {
  const numericValue = convertToNumber(value);
  const isNegative = numericValue < 0;
  const absNumericValue = Math.abs(numericValue);
  const isSmallerThanTwoDecimalPlaces = numericValue !== 0 && absNumericValue < 0.01;
  const isSmallerThanFiveDecimalPlaces = numericValue !== 0 && absNumericValue < 0.00001;

  const tooltipContent = useMemo(() => {
    if (value === undefined || value === null) return null;

    if (convertToNumber(value) === 0) {
      return `${prefix ?? ''}0${suffix ?? ''}`;
    }

    if (isSmallerThanFiveDecimalPlaces) {
      const sign = isNegative ? '-' : '';
      return `${sign}<${prefix ?? ''}0.00001${suffix ?? ''}`;
    }

    const formattedValue = formatNumber(value, 'en-US', {
      roundingMode: roundType === 'round' ? 'halfEven' : roundType,
    });

    return `${prefix ?? ''}${formattedValue}${suffix ?? ''}`;
  }, [prefix, value, suffix, roundType, isNegative, isSmallerThanFiveDecimalPlaces]);

  const roundTypeValue: RoundType = useMemo(() => {
    if (isSmallerThanFiveDecimalPlaces) {
      return 'floor';
    }

    if (Number(value) < 0) {
      return 'ceil';
    }

    return roundType;
  }, [roundType, isSmallerThanFiveDecimalPlaces, value]);

  if (showEmpty && (value === null || value === undefined)) return '-';

  return (
    <Tooltip content={tooltipContent} triggerClassName={tooltipTriggerClassName} className={tooltipClassName}>
      <Text className={className} {...props}>
        {isSmallerThanTwoDecimalPlaces ? (isNegative ? '-<' : '<') : ''}
        <span className={prefixClassName}>{prefix ?? ''}</span>
        {isSmallerThanTwoDecimalPlaces
          ? '0.01'
          : numberFormatter(value || 0, digits, roundTypeValue, { minimumFractionDigits })}
        <span className={suffixClassName}>{suffix ?? ''}</span>
      </Text>
    </Tooltip>
  );
};

export default FormattedNumber;
