import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: ReactNode;
  color?: string;
  max?: number;
  target?: number;
}

const DivergingProgressBar = ({
  value = 0,
  target = 50,
  label,
  className,
  color = '#31BA7C',
  max = 100,
  ...props
}: Props) => {
  const isPositive = value >= 0;
  const normalized = Math.min(Math.abs(value), max);
  const width = (normalized / max) * 50;

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className={cn('relative w-full', { 'h-10': !!label })}>
        <div className='relative h-3 overflow-hidden rounded-full border border-general-border bg-general-background-alt'>
          {/* center line */}
          <div className='absolute top-0 left-1/2 h-full w-px bg-general-border' />

          {/* progress bar */}
          <div
            className='absolute h-full transition-all duration-500 ease-out'
            style={{
              width: `${width}%`,
              backgroundColor: `${color}40`,
              ...(isPositive
                ? {
                    left: '50%',
                    borderRight: `2px solid ${color}`,
                  }
                : {
                    right: '50%',
                    borderLeft: `2px solid ${color}`,
                  }),
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

        {label && <div className='-translate-x-1/2 absolute bottom-0 left-1/2'>{label}</div>}
      </div>
    </div>
  );
};

export { DivergingProgressBar };
