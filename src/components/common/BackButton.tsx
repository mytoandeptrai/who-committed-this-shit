'use client';

import { Icons } from '@/assets/icons';
import useTranslations from '@/hooks/useTranslations';
import { useRouter } from '@bprogress/next/app';
import type { FC, MouseEvent, ReactNode } from 'react';
import { Button, type ButtonProps } from '../ui/button';

export interface BackButtonProps extends ButtonProps {
  text?: string;
  icon?: ReactNode;
}

const BackButton: FC<BackButtonProps> = ({ text, icon, onClick, ...props }) => {
  const { t } = useTranslations('common');
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else {
      router.back();
    }
  };

  return (
    <Button
      tabIndex={-1}
      variant='ghost'
      prefix={icon ?? <Icons.arrowLeft className='h-3.5 w-3.5' />}
      onClick={handleClick}
      {...props}
    >
      {text ?? t('common.back')}
    </Button>
  );
};

export default BackButton;
