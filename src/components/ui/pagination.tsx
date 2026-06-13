'use client';

import { Icons } from '@/assets/icons';
import useMobile from '@/hooks/useMobile';
import { usePaginationIndexes } from '@/hooks/usePaginationIndexes';
import useTranslations from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/utils/common';
import type { ComponentProps } from 'react';
import { HStack } from '../utilities';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import Text from './text';

interface PaginationProps extends ComponentProps<'div'> {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  itemCount: number;
  tableName: string;
  hideShowingText?: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const limitOptions = [10, 15, 20, 30, 50, 100] as const;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  itemCount,
  tableName,
  hideShowingText,
  className,
  onPageChange,
  onLimitChange,
  ...props
}) => {
  const isMobile = useMobile();
  const { t } = useTranslations('common');

  const { minIndex, maxIndex } = usePaginationIndexes({
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    itemCount,
  });

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    const start = Math.max(isMobile ? currentPage : currentPage - 1, 2);
    const end = Math.min(isMobile ? currentPage : currentPage + 1, totalPages - 1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pagesToDisplay = getPageNumbers();

  return (
    <div
      className={cn('flex items-center justify-center overflow-x-auto py-0.5 lg:justify-between', className)}
      {...props}
    >
      <HStack spacing={8} noWrap className='hidden lg:flex'>
        <Select value={itemsPerPage.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {limitOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!hideShowingText && !!currentPage && !!itemsPerPage && totalPages !== 0 && (
          <Text size='sm' className='hidden text-nowrap text-general-muted-foreground lg:block'>
            {t('common.showing-min-max', {
              min: formatNumber(minIndex),
              max: formatNumber(maxIndex),
              total: formatNumber(totalItems),
              tableName: tableName,
            })}
          </Text>
        )}
      </HStack>

      <div className='flex items-center lg:justify-end lg:overflow-x-visible'>
        <Button
          variant='ghost'
          prefix={<Icons.chevronLeft />}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <p className='hidden lg:block'>{t('common.previous')}</p>
        </Button>
        <div className='flex items-center gap-2'>
          {pagesToDisplay.map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className='px-2 text-gray-500'>
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? 'outline' : 'ghost'}
                key={page}
                onClick={() => onPageChange(page)}
                className='flex h-9 min-w-8.5 items-center justify-center font-medium font-open-sauce-one text-sm'
              >
                {page}
              </Button>
            )
          )}
        </div>
        <Button
          variant='ghost'
          suffix={<Icons.chevronRight />}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <p className='hidden lg:block'>{t('common.next')}</p>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
