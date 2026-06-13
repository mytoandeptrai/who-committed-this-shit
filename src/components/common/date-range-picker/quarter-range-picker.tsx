'use client';

import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const dateToQuarterYear = (date?: Date) => {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = Math.floor(month / 3);
  return { quarter, year };
};

const quarterYearToDate = (q: number, year: number) => new Date(year, q * 3, 1);

interface QuarterRangePickerProps {
  onUpdate?: (start: Date | undefined, end: Date | undefined) => void;
  defaultStart?: Date;
  defaultEnd?: Date;
  numberOfYears?: 1 | 2;
  maxRangeQuarters?: number;
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

export function QuarterRangePicker({
  onUpdate,
  defaultStart,
  defaultEnd,
  numberOfYears = 2,
  maxRangeQuarters = 20,
}: QuarterRangePickerProps) {
  const [start, setStart] = useState<Date | undefined>(defaultStart);
  const [end, setEnd] = useState<Date | undefined>(defaultEnd);
  const [selectingStart, setSelectingStart] = useState(true);

  const isTwoYears = numberOfYears === 2;

  const [startYear, setStartYear] = useState(() => {
    return start?.getFullYear() ?? new Date().getFullYear() - 1;
  });

  const [endYear, setEndYear] = useState(start?.getFullYear() ? start?.getFullYear() + 1 : new Date().getFullYear());

  // --- Core quarter logic ---
  const handleSelectQuarter = (year: number, quarterIdx: number, side: 'start' | 'end') => {
    const selectedDate = quarterYearToDate(quarterIdx, year);
    if (numberOfYears === 1) {
      if (selectingStart) {
        setStart(selectedDate);
        setEnd(undefined);
        setSelectingStart(false);
        onUpdate?.(selectedDate, undefined);
      } else {
        if (!start) return;
        const startQ = dateToQuarterYear(start)!;
        const selQ = { quarter: quarterIdx, year };
        const startNum = startQ.year * 4 + startQ.quarter;
        const selNum = selQ.year * 4 + selQ.quarter;
        if (selNum < startNum) {
          setEnd(start);
          setStart(selectedDate);
          setSelectingStart(true);
          onUpdate?.(selectedDate, start);
        } else {
          // check max range
          if (maxRangeQuarters) {
            if (selNum - startNum + 1 > maxRangeQuarters) return;
          }
          setEnd(selectedDate);
          setSelectingStart(true);
          onUpdate?.(start, selectedDate);
        }
      }
      return;
    }
    if (side === 'start') {
      setStart(selectedDate);
      setEnd(undefined);
      onUpdate?.(selectedDate, undefined);
      if (end) {
        const endQ = dateToQuarterYear(end)!;
        if (endQ.year < year || (endQ.year === year && endQ.quarter <= quarterIdx)) {
          setEnd(undefined);
          onUpdate?.(selectedDate, undefined);
          return;
        }
      }
      onUpdate?.(selectedDate, end);
    } else {
      if (!start) return;
      const startQ = dateToQuarterYear(start)!;
      const selQ = { quarter: quarterIdx, year };
      const startNum = startQ.year * 4 + startQ.quarter;
      const selNum = selQ.year * 4 + selQ.quarter;
      if (selNum <= startNum) return;
      if (maxRangeQuarters) {
        if (selNum - startNum + 1 > maxRangeQuarters) return;
      }
      setEnd(selectedDate);
      onUpdate?.(start, selectedDate);
    }
  };

  const isEndQuarterDisabled = (year: number, quarterIdx: number) => {
    if (!start) return false;
    const startQ = dateToQuarterYear(start)!;
    const startNum = startQ.year * 4 + startQ.quarter;
    const selNum = year * 4 + quarterIdx;
    if (selNum <= startNum) return true;
    if (maxRangeQuarters) {
      if (selNum - startNum + 1 > maxRangeQuarters) return true;
    }
    return false;
  };

  const isQuarterInRange = (year: number, quarterIdx: number) => {
    if (!start || !end) return false;
    const startQ = dateToQuarterYear(start)!;
    const endQ = dateToQuarterYear(end)!;
    const s = startQ.year * 4 + startQ.quarter;
    const e = endQ.year * 4 + endQ.quarter;
    const cur = year * 4 + quarterIdx;
    return cur >= s && cur <= e;
  };

  const isQuarterSelected = (year: number, quarterIdx: number) => {
    const startQ = dateToQuarterYear(start);
    const endQ = dateToQuarterYear(end);
    const isStart = startQ?.year === year && startQ?.quarter === quarterIdx;
    const isEnd = endQ?.year === year && endQ?.quarter === quarterIdx;
    return isStart || isEnd;
  };

  const renderPanel = (title: string, year: number, setYear: (y: number) => void, side: 'start' | 'end') => (
    <div className='flex flex-col gap-0.5 rounded-lg bg-background'>
      <div className='py-1.5 text-center font-semibold text-general-muted-foreground text-xs'>{title}</div>
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
      <div className='grid grid-cols-2 gap-y-0.5 rounded-sm border border-general-border p-2'>
        {QUARTERS.map((q, idx) => {
          const isSelected = isQuarterSelected(year, idx);
          const isRange = isQuarterInRange(year, idx);
          const disabled = side === 'end' ? isEndQuarterDisabled(year, idx) : false;
          return (
            <button
              key={q}
              type='button'
              onClick={() => {
                if (!disabled && !isSelected) handleSelectQuarter(year, idx, side);
              }}
              className={cn(
                'group flex h-9 w-31.5 flex-1 items-center justify-center font-medium font-open-sauce-one text-xs hover:rounded-xs hover:bg-general-primary hover:text-general-primary-foreground',
                {
                  'rounded-xs bg-general-primary text-general-primary-foreground': isSelected,
                  'bg-general-unofficial-accent-2': !isSelected && isRange,
                  'pointer-events-none cursor-not-allowed text-general-muted-foreground': disabled && !isSelected,
                }
              )}
              disabled={disabled}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={['p-0.5', isTwoYears ? 'flex gap-4' : ''].join(' ')}>
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
