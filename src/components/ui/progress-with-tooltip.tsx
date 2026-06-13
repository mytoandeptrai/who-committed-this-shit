'use client';

import useMobile from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import FormattedPercent from '../common/FormattedPercent';
import { HStack } from '../utilities';
import Text from './text';

interface ProgressTooltipData {
  label: string;
  value: string;
  percentage: number;
}

interface ProgressWithTooltipProps {
  leftTooltipData: ProgressTooltipData[];
  rightTooltipData: ProgressTooltipData[];
  value: number;
  digits?: number;
  fillColor?: string;
  backgroundColor?: string;
  showPercent?: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

export const ProgressWithTooltip = ({
  leftTooltipData,
  rightTooltipData,
  value,
  digits = 2,
  fillColor = '#31BA7C',
  backgroundColor = '#e5e5e5',
  showPercent = true,
}: ProgressWithTooltipProps) => {
  const [tooltipStyle, setTooltipStyle] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>, side: 'left' | 'right') => {
    e.stopPropagation();

    if (!containerRef.current) return;

    setHoveredSide(side);

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    setMousePos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const isLeft = hoveredSide === 'left';

  const data = isLeft ? leftTooltipData : rightTooltipData;

  const percentage = Number(value || 0).toFixed(digits);
  const remainingPercentage = Number(100 - value || 0).toFixed(digits);

  useEffect(() => {
    if (!isMobile || !hoveredSide) return;

    const hide = () => setHoveredSide(null);

    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('touchmove', hide);

    return () => {
      window.removeEventListener('scroll', hide);
      window.removeEventListener('touchmove', hide);
    };
  }, [isMobile, hoveredSide]);

  useEffect(() => {
    if (!isMobile || !hoveredSide) return;

    const handleOutside = (e: TouchEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setHoveredSide(null);
      }
    };

    document.addEventListener('touchstart', handleOutside, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isMobile, hoveredSide]);

  useLayoutEffect(() => {
    if (!hoveredSide) return;
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const mouseX = mousePos.x + containerRect.left;
    const mouseY = mousePos.y + containerRect.top;

    let left = isLeft ? mouseX + 20 : mouseX - tooltipRect.width - 20;

    if (left + tooltipRect.width > viewportWidth) {
      left = mouseX - tooltipRect.width - 12;
    }

    if (left < 0) {
      left = mouseX + 12;
    }

    left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8));

    let top = mouseY + 12;

    if (top + tooltipRect.height > viewportHeight) {
      top = mouseY - tooltipRect.height - 12;
    }

    top = Math.max(8, Math.min(top, viewportHeight - tooltipRect.height - 8));

    setTooltipStyle({ left, top });
  }, [hoveredSide, mousePos, isLeft]);

  return (
    <div className='relative w-full' ref={containerRef} onMouseMove={isMobile ? undefined : handleMouseMove}>
      {/* Progress Bar Container */}

      <HStack noWrap spacing={8} className='w-full'>
        {showPercent && (
          <Text size='sm' weight={500} style={{ color: fillColor }} className='hidden md:block'>
            {percentage}%
          </Text>
        )}
        <div className='relative flex flex-1 items-center gap-0 rounded-full'>
          {/* Left side progress */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            style={{ width: `${value}%` }}
            className={cn(
              'relative cursor-pointer rounded-l-full border border-general-border border-r-0 transition-opacity duration-200',
              hoveredSide === 'right' && 'opacity-50'
            )}
            onMouseEnter={isMobile ? undefined : () => setHoveredSide('left')}
            onMouseLeave={isMobile ? undefined : () => setHoveredSide(null)}
            onTouchStart={isMobile ? (e) => handleTouch(e, 'left') : undefined}
          >
            <div className='h-2 rounded-l-full' style={{ backgroundColor: fillColor }} />
          </div>

          <span className='h-3.25 w-0.5 rounded-full bg-general-unofficial-accent-2' />

          {/* Right side progress */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className={cn(
              'relative flex-1 cursor-pointer rounded-r-full border border-general-border border-l-0 transition-opacity duration-200',
              hoveredSide === 'left' && 'opacity-50'
            )}
            onMouseEnter={isMobile ? undefined : () => setHoveredSide('right')}
            onMouseLeave={isMobile ? undefined : () => setHoveredSide(null)}
            onTouchStart={isMobile ? (e) => handleTouch(e, 'right') : undefined}
          >
            <div className='h-2 rounded-r-full' style={{ backgroundColor: backgroundColor }} />
          </div>
        </div>

        {showPercent && (
          <Text size='sm' weight={500} style={{ color: backgroundColor }} className='hidden md:block'>
            {remainingPercentage}%
          </Text>
        )}
      </HStack>

      {/* Tracking Tooltip */}
      {hoveredSide && data?.length > 0 && (
        <div
          ref={tooltipRef}
          className='pointer-events-none fixed z-50 rounded-md border border-general-border bg-background p-2 shadow-md md:p-4'
          style={tooltipStyle ?? { visibility: 'hidden' }}
        >
          <div className='space-y-4'>
            {data?.map((item, idx) => (
              <div key={idx} className='flex items-center justify-between gap-1 md:gap-4'>
                <Text size='xs' className='text-general-muted-foreground'>
                  {item.label}
                </Text>
                <div className='flex items-center gap-1'>
                  <Text weight={500} size='xs'>
                    {item.value}
                  </Text>

                  <FormattedPercent
                    size='xs'
                    className='text-general-muted-foreground'
                    value={Number(item.percentage.toFixed(2))}
                    prefix='('
                    suffix=')'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
