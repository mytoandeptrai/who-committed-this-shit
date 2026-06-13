'use client';

import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthRangePickerProps {
  onUpdate?: (startMonth: Date | undefined, endMonth: Date | undefined) => void;
  defaultStartMonth?: Date;
  defaultEndMonth?: Date;
  numberOfYears?: 1 | 2;
  maxRangeMonths?: number;
}

export default function MonthRangePicker({
  onUpdate,
  defaultStartMonth,
  defaultEndMonth,
  numberOfYears = 2,
  maxRangeMonths = 24,
}: MonthRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEndMonth);
  const [selectingStart, setSelectingStart] = useState(true);

  const isTwoYears = numberOfYears === 2;

  const [startYear, setStartYear] = useState(() => {
    if (startDate?.getFullYear()) return startDate?.getFullYear();

    return new Date().getFullYear() - 1;
  });
  const [endYear, setEndYear] = useState(
    startDate?.getFullYear() ? startDate?.getFullYear() + 1 : new Date().getFullYear()
  );

  const handleSelectMonth = (year: number, monthIndex: number, side: 'start' | 'end') => {
    const selected = new Date(year, monthIndex, 1);

    if (numberOfYears === 1) {
      if (selectingStart) {
        setStartDate(selected);
        setEndDate(undefined);
        setSelectingStart(false);
        onUpdate?.(selected, undefined);
      } else {
        if (!startDate) return;
        if (selected < startDate) {
          setEndDate(startDate);
          setStartDate(selected);
          setSelectingStart(true);
          onUpdate?.(selected, startDate);
        } else {
          // check max range
          if (maxRangeMonths) {
            const maxAllowed = new Date(startDate);
            maxAllowed.setMonth(maxAllowed.getMonth() + maxRangeMonths);
            if (selected > maxAllowed) return;
          }
          setEndDate(selected);
          setSelectingStart(true);
          onUpdate?.(startDate, selected);
        }
      }
      return;
    }
    if (side === 'start') {
      setStartDate(selected);
      setEndDate(undefined);
      onUpdate?.(selected, undefined);

      if (endDate && endDate <= selected) {
        setEndDate(undefined);
        onUpdate?.(selected, undefined);
      } else {
        onUpdate?.(selected, endDate);
      }
    } else {
      if (!startDate) return;
      if (selected <= startDate) return;
      // check max range
      if (maxRangeMonths) {
        const maxAllowed = new Date(startDate);
        maxAllowed.setMonth(maxAllowed.getMonth() + maxRangeMonths);
        if (selected > maxAllowed) return;
      }
      setEndDate(selected);
      onUpdate?.(startDate, selected);
    }
  };

  const isEndMonthDisabled = (year: number, month: number) => {
    if (!startDate) return false;
    const d = new Date(year, month, 1);
    if (d <= startDate) return true;
    if (maxRangeMonths) {
      const maxAllowed = new Date(startDate);
      maxAllowed.setMonth(maxAllowed.getMonth() + maxRangeMonths);
      if (d > maxAllowed) return true;
    }
    return false;
  };

  const isMonthInRange = (year: number, month: number) => {
    if (!startDate || !endDate) return false;
    const d = new Date(year, month, 1);
    return d >= startDate && d <= endDate;
  };

  const isMonthSelected = (year: number, month: number) => {
    const isStart = startDate?.getFullYear() === year && startDate?.getMonth() === month;
    const isEnd = endDate?.getFullYear() === year && endDate?.getMonth() === month;

    if (isEnd) return true;
    if (isStart) return true;

    return false;
  };

  const renderPanel = (title: string, year: number, setYear: (y: number) => void, side: 'start' | 'end') => (
    <div className='flex flex-col gap-0.5 rounded-lg bg-background'>
      <Text size='xs' className='py-1.5 text-center text-general-muted-foreground'>
        {title}
      </Text>
      <div className='flex items-center justify-between px-3 py-2'>
        <button type='button' onClick={() => setYear(year - 1)} className='cursor-pointer'>
          <Icons.chevronLeft className='size-4' />
        </button>
        <Text size='sm' weight={500} className='text-center'>
          {year}
        </Text>
        <button type='button' onClick={() => setYear(year + 1)} className='cursor-pointer'>
          <Icons.chevronRight className='size-4' />
        </button>
      </div>
      <div className='grid grid-cols-3 rounded-sm border border-general-border p-2'>
        {MONTHS.map((m, idx) => {
          const isSelected = isMonthSelected(year, idx);
          const isRange = isMonthInRange(year, idx);
          const disabled = side === 'end' ? isEndMonthDisabled(year, idx) : false;

          return (
            <button
              key={m}
              type='button'
              onClick={() => {
                if (!disabled && !isSelected) handleSelectMonth(year, idx, side);
              }}
              className={cn(
                'group flex h-9 w-21 flex-1 items-center justify-center font-medium font-open-sauce-one text-xs hover:rounded-xs hover:bg-general-primary hover:text-general-primary-foreground',
                {
                  'rounded-xs bg-general-primary text-general-primary-foreground': isSelected,
                  'bg-general-unofficial-accent-2': !isSelected && isRange,
                  'cursor-not-allowed text-general-muted-foreground': disabled && !isSelected,
                }
              )}
              disabled={disabled}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={cn('p-0.5', isTwoYears ? 'flex gap-4' : '')}>
      {isTwoYears ? (
        <>
          {renderPanel('Start', startYear, setStartYear, 'start')}
          {renderPanel('End', endYear, setEndYear, 'end')}
        </>
      ) : (
        renderPanel('', startYear, setStartYear, selectingStart ? 'start' : 'end')
      )}
    </div>
  );
}
