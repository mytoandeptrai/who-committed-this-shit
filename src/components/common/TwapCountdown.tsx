'use client';

import Text, { type TextProps } from '@/components/ui/text';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/common';

interface Props extends TextProps {
  startDate: string;
}

const TwapCountdown = ({ startDate, className, weight, ...props }: Props) => {
  const timeLeft = useCountdown(startDate);
  const formatted = formatDuration(timeLeft);

  return (
    <Text weight={weight || 600} className={cn('uppercase', className)} {...props}>
      {formatted}
    </Text>
  );
};

export default TwapCountdown;
