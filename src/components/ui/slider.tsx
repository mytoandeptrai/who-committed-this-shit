'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';
import Text from './text';

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  onChangeValue?: (value: number[]) => void;
  showLabel?: boolean;
  step?: number;
  digit?: number;
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  digit = 0,
  onChangeValue,
  showLabel = false,
  ...props
}: SliderProps) {
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value;

    if (Array.isArray(defaultValue)) return defaultValue;

    return [min, max];
  }, [value, defaultValue, min, max]);

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onChangeValue}
      className={cn(
        'relative mb-10 flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(
          'relative grow overflow-hidden rounded-full bg-general-unofficial-accent-3 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5'
        )}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(
            'absolute bg-general-foreground data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className='block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50'
        >
          {showLabel && (
            <Text
              size='xs'
              className='-translate-x-1/2 -translate-y-1/2 absolute top-8 left-1/2 overflow-visible text-general-muted-foreground'
            >
              {_values[index].toFixed(digit)}%
            </Text>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
