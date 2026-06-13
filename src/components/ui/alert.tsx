import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type React from 'react';
import Text from './text';

interface AlertProps {
  variant?: 'success' | 'error';
  title: string;
  message?: React.ReactNode;
  icon?: React.ReactNode;
  messageClassName?: string;
  titleClassName?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'success',
  title,
  message,
  icon,
  className,
  titleClassName,
  messageClassName,
}) => {
  // Icon for each variant
  const icons = {
    success: <Icons.check className='size-4 text-general-unofficial-mid-alt' />,
    error: <Icons.circleAlert className='size-4 text-general-unofficial-destructive-foreground' />,
  };

  return (
    <div className={cn('w-full rounded-md bg-background p-4', className)}>
      <div
        className={cn('flex items-start gap-3', {
          'items-center': !message,
        })}
      >
        <div>{icon || icons[variant]}</div>

        <div className='space-y-0.5'>
          <Text weight={500} size='sm' className={cn(titleClassName)}>
            {title}
          </Text>

          {message && (
            <Text size='sm' className={cn('text-general-muted-foreground', messageClassName)}>
              {message}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
