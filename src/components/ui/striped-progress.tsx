import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/**
 * StripedProgressBar - A customizable progress bar with diagonal stripes
 *
 * @param {number} value - Progress value (0-100)
 * @param {string} label - Label text to display
 * @param {string} className - Additional classes for the container
 */
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: ReactNode;
  color?: string; // hex color
  target?: number;
  max?: number;
}

const StripedProgressBar = ({
  value = 0,
  label,
  className,
  color = '#31BA7C',
  target = 50,
  max = 100,
  ...props
}: Props) => {
  const progress = Math.min(Math.max(value, 0), max);

  const getLabelPosition = () => {
    if (progress <= 10) {
      return { left: '10%', transform: 'translateX(-10%)' };
    }
    if (progress >= 90) {
      return { left: '90%', transform: 'translateX(-90%)' };
    }
    return { left: `${progress}%`, transform: 'translateX(-50%)' };
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        className={cn('relative w-full', {
          'h-10': !!label,
        })}
      >
        <div className='relative h-3 overflow-hidden rounded-full border border-general-border bg-general-background-alt'>
          <div
            className={cn('absolute h-full transition-all duration-500 ease-out', {
              'border-r-2': progress > 0,
            })}
            style={{
              width: `${progress}%`,
              backgroundColor: `${color}40`,
              borderRightColor: color,
            }}
          />
          <div
            className={`absolute h-full border-r-2 border-r-[#80808033] bg-transparent transition-all duration-500 ease-out`}
            style={{
              width: `${target}%`,
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 4.5px,
                rgba(128, 128, 128, 0.2) 4.5px,
                rgba(128, 128, 128, 0.2) 6px
              )`,
            }}
          />
        </div>

        {label && (
          <div className='absolute bottom-0 transition-all duration-500 ease-out' style={getLabelPosition()}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export { StripedProgressBar };
