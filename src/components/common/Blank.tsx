import { Icons } from '@/assets/icons';
import useTranslations from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type React from 'react';
import type { ComponentProps } from 'react';
import Text from '../ui/text';
import { VStack } from '../utilities';

interface Props extends ComponentProps<'div'> {
  icon?: React.ReactNode;
  text?: string;
  subText?: string;
  textClassName?: Props['className'];
  subTextClassName?: Props['className'];
  iconWrapperClassName?: Props['className'];
  action?: React.ReactNode;
}

const Blank: React.FC<Props> = ({
  icon = <Icons.squareDashedMousePointer className='h-3.5 w-3.5 text-general-foreground' />,
  text,
  subText,
  textClassName,
  subTextClassName,
  iconWrapperClassName,
  action,
  className,
  ...props
}) => {
  const { t } = useTranslations('common');

  return (
    <div className={cn('relative h-full w-full overflow-hidden py-8', className)} {...props}>
      <Image src={'/images/blank-bg.png'} alt='blank' fill className='z-0 object-contain' />
      <VStack spacing={16} justify='center' align='center' className='relative z-10 h-full w-full'>
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xs bg-general-unofficial-accent-2',
            iconWrapperClassName
          )}
        >
          {icon}
        </div>

        <VStack spacing={4} justify='center' align='center'>
          <Text size='md' weight={500} className={cn('text-center text-general-primary', textClassName)}>
            {text === undefined ? t('common.no-data') : text}
          </Text>
          <Text size='sm' className={cn('text-center text-general-muted-foreground', subTextClassName)}>
            {subText === undefined ? t('common.no-data-yet') : subText}
          </Text>
        </VStack>

        {action && action}
      </VStack>
    </div>
  );
};

export default Blank;
