import useMobile from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { shortenString } from '@/utils/common';
import Text from '../ui/text';
import { Tooltip } from '../ui/tooltip';

interface Props extends Omit<React.ComponentProps<typeof Text>, 'prefix' | 'suffix'> {
  address: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  tooltipTriggerClassName?: string;
  tooltipContentClassName?: string;
  showTooltip?: boolean;
}

const Address = ({
  address,
  prefix,
  suffix,
  tooltipTriggerClassName,
  tooltipContentClassName,
  showTooltip = true,
  ...props
}: Props) => {
  const isMobile = useMobile();

  if (!showTooltip) {
    return (
      <Text {...props}>
        {!!prefix && prefix}
        {shortenString(address)}
        {!!suffix && suffix}
      </Text>
    );
  }

  return (
    <Tooltip
      triggerClassName={cn('w-fit', tooltipTriggerClassName)}
      className={tooltipContentClassName}
      textClassName='max-w-96'
      content={address}
      side={isMobile ? 'top' : undefined}
    >
      <Text {...props}>
        {!!prefix && prefix}
        {shortenString(address)}
        {!!suffix && suffix}
      </Text>
    </Tooltip>
  );
};

export default Address;
