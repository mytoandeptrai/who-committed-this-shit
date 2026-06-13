'use client';

import { Icons } from '@/assets/icons';
import { useCopy } from '@/hooks/useCopy';
import useTranslations from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import type React from 'react';
import { toast } from 'sonner';
import Alert from '../ui/alert';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isShowToast?: boolean;
  toastMessage?: string;
  iconClassName?: string;
  asChild?: boolean;
}

const CopyButton = ({
  value,
  className,
  isShowToast = true,
  toastMessage,
  iconClassName,
  asChild,
  ...props
}: Props) => {
  const { t } = useTranslations('common');
  const [copied, copy] = useCopy();

  const handleCopy = () => {
    if (copied) return;
    copy(value);

    if (isShowToast) {
      toast(<Alert variant='success' title={toastMessage || t('common.copied-to-clipboard')} />);
    }
  };

  const Comp = asChild ? 'span' : 'button';

  return (
    <Comp
      type='button'
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      className={cn(
        {
          'cursor-pointer': !copied,
        },
        className
      )}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
      {...props}
    >
      {copied ? (
        <Icons.check className={cn('h-4 w-4 text-general-muted-foreground opacity-50', iconClassName)} />
      ) : (
        <Icons.copy
          className={cn(
            'h-4 w-4 text-general-muted-foreground opacity-50 transition-all duration-100 ease-linear hover:opacity-100 md:h-3 md:w-3',
            iconClassName
          )}
        />
      )}
    </Comp>
  );
};

export default CopyButton;
