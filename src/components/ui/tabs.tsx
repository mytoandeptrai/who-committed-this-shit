import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import type { IOption } from '@/types';
import { numberFormatter } from '@/utils/common';
import { HStack } from '../utilities';
import Text, { type TextProps } from './text';

export interface TabData<T> extends IOption<T> {
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

interface TabsProps<T extends string | number> extends Pick<TextProps, 'size' | 'weight'> {
  variant?: 'default' | 'underline';
  data: TabData<T>[];
  value: T;
  onChange: (value: T) => void;
  containerClassname?: string;
  itemClassname?: string;
  labelClassname?: string;
  roundedFull?: boolean;
  layoutId: string;
}

const Tabs = <T extends string | number>({
  data,
  value,
  onChange,
  variant = 'default',
  containerClassname,
  itemClassname,
  labelClassname,
  roundedFull = false,
  size = 'sm',
  weight = 500,
  layoutId,
}: TabsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<T, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const activeTab = tabRefs.current.get(value);
    const container = containerRef.current;

    if (activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      const scrollLeft =
        tabRect.left - containerRect.left + container.scrollLeft - containerRect.width / 2 + tabRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [value]);

  return (
    <div className='flex'>
      <div
        ref={containerRef}
        className={cn(
          'flex h-9 flex-1 overflow-x-scroll p-0.75 shadow-[0rem_0rem_1.25rem_.125rem_rgba(185_185_185_0.25)] [scrollbar-width:none] md:flex-none [&::-webkit-scrollbar]:hidden',
          {
            'rounded-[0.75rem] bg-general-accent': variant === 'default',
            'rounded-full': roundedFull,
          },
          containerClassname
        )}
      >
        {data.map((tabItem) => {
          const pathname = String(value);
          const tabPath = String(tabItem.value);
          const isActive = pathname === tabPath || pathname.startsWith(tabPath + '/');

          return (
            <button
              type='button'
              key={tabItem.value}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(tabItem.value, el);
                }
              }}
              disabled={tabItem.disabled}
              onClick={() => onChange(tabItem.value)}
              className={cn(
                'relative z-0 flex flex-1 cursor-pointer items-center justify-center rounded-lg px-2 py-1 shadow-[0px_0px_20px_2px_rgba(185_185_185_0.25)] transition-all disabled:cursor-not-allowed',
                itemClassname
              )}
            >
              <HStack
                spacing={8}
                noWrap
                className={cn('text-general-muted-foreground', {
                  'text-general-foreground': isActive,
                })}
              >
                {!!tabItem.icon && tabItem.icon}
                <Text
                  size={size}
                  weight={weight}
                  className={cn(
                    'text-nowrap text-general-muted-foreground',
                    {
                      'text-general-foreground': isActive,
                    },
                    labelClassname
                  )}
                >
                  {tabItem.label}
                </Text>

                {tabItem.count !== undefined && tabItem.count > 0 && (
                  <Text
                    size='xs'
                    weight={500}
                    className='flex h-4 items-center justify-center rounded-full bg-general-unofficial-accent-3 px-1'
                  >
                    {numberFormatter(tabItem.count)}
                  </Text>
                )}
              </HStack>

              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className={cn('absolute z-[-1] h-full w-full rounded-lg bg-general-background', {
                    'bottom-0 h-px rounded-none bg-general-foreground': variant === 'underline',
                    'rounded-full': roundedFull,
                  })}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Tabs };
