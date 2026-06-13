'use client';
import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import useTranslations from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ShowMoreTextProps {
  text: ReactNode;
  initialLines?: number;
  className?: string;
}

export const ShowMoreText: React.FC<ShowMoreTextProps> = ({ text, initialLines = 4, className }) => {
  const { t } = useTranslations('common');
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [heights, setHeights] = useState<{ clamped: number; full: number }>({ clamped: 0, full: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && measureRef.current) {
        measureRef.current.style.width = `${textRef.current.clientWidth}px`;
        const lineHeight = Number.parseFloat(getComputedStyle(textRef.current).lineHeight);
        const clamped = lineHeight * initialLines;
        const full = measureRef.current.scrollHeight;
        setHeights({ clamped, full });
        setNeedsShowMore(full > clamped);
      }
    };
    setTimeout(checkOverflow, 0);
    const handleResize = () => checkOverflow();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text, initialLines]);

  return (
    <div className={cn('relative', className)}>
      <div
        ref={measureRef}
        aria-hidden='true'
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          width: '100%',
        }}
      >
        {typeof text === 'string' ? <Text size='sm'>{text}</Text> : text}
      </div>
      <motion.div
        ref={textRef}
        animate={{ maxHeight: isExpanded ? heights.full : heights.clamped }}
        transition={{
          duration: 0.5,
          ease: isExpanded ? [0.25, 0.1, 0.25, 1] : [0.25, 0.1, 0.25, 1],
        }}
        className='relative overflow-hidden'
      >
        {typeof text === 'string' ? (
          <Text size='sm' className='text-wrap break-words'>
            {text}
          </Text>
        ) : (
          text
        )}
        {needsShowMore && !isExpanded && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-background to-background/50' />
        )}
      </motion.div>
      <AnimatePresence>
        {needsShowMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn('flex w-full justify-center pt-4', {
              'bg-gradient-to-t from-background to-background/0': needsShowMore && !isExpanded,
              'border-t border-t-general-border': isExpanded,
            })}
          >
            <button
              type='button'
              className={cn(
                'flex cursor-pointer flex-nowrap items-center gap-2 text-general-unofficial-ghost-foreground transition-opacity duration-200 ease-in-out',
                {
                  'opacity-70 hover:opacity-100': !isExpanded,
                }
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Text size='xs' weight={500} className='text-general-unofficial-ghost-foreground'>
                {isExpanded ? t('common.see-less') : t('common.see-more')}
              </Text>
              <Icons.chevronDown
                className={cn(
                  'size-3.25 text-general-unofficial-ghost-foreground transition-all duration-200 ease-in-out',
                  {
                    'rotate-180': isExpanded,
                  }
                )}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
