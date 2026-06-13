'use client';

import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type React from 'react';
import { type HTMLAttributes, useState } from 'react';

const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const getWeekStart = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
};

const getWeekEnd = (date: Date) => {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
};

const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const calendarHeader = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const totalSlots = 42;

interface WeekRangePickerProps {
  onUpdate?: (startDate: Date | undefined, endDate: Date | undefined) => void;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  numberOfMonths?: 1 | 2;
  maxRangeDays?: number;
}

export function WeekRangePicker({
  onUpdate,
  defaultStartDate,
  defaultEndDate,
  numberOfMonths = 2,
  maxRangeDays = 210,
}: WeekRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEndDate);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hoveredWeekStart, setHoveredWeekStart] = useState<Date | undefined>(undefined);
  const [leftMonth, setLeftMonth] = useState(() => {
    const d = defaultStartDate ? new Date(defaultStartDate) : new Date();
    d.setDate(1);
    if (!defaultStartDate) {
      d.setMonth(d.getMonth() - 1);
    }
    return d;
  });
  const [rightMonth, setRightMonth] = useState(() => {
    const d = defaultStartDate ? new Date(defaultStartDate) : new Date();
    d.setDate(1);
    if (defaultStartDate) {
      d.setMonth(d.getMonth() + 1);
    }
    return d;
  });

  const isTwoMonths = numberOfMonths === 2;

  const handlePrevMonth = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftMonth((prev) => {
        const n = new Date(prev);
        n.setMonth(n.getMonth() - 1);
        return n;
      });
    } else {
      setRightMonth((prev) => {
        const n = new Date(prev);
        n.setMonth(n.getMonth() - 1);
        if (n <= leftMonth) setLeftMonth(n);
        return n;
      });
    }
  };

  const handleNextMonth = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftMonth((prev) => {
        const n = new Date(prev);
        n.setMonth(n.getMonth() + 1);
        return n;
      });
    } else {
      setRightMonth((prev) => {
        const n = new Date(prev);
        n.setMonth(n.getMonth() + 1);
        return n;
      });
    }
  };

  const handleDateClick = (day: number, monthDate: Date, side: 'left' | 'right') => {
    const clickedDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const weekStart = getWeekStart(clickedDate);
    const weekEnd = getWeekEnd(clickedDate);

    if (numberOfMonths === 1) {
      if (selectingStart) {
        setStartDate(weekStart);
        setEndDate(undefined);
        setSelectingStart(false);
        onUpdate?.(weekStart, undefined);
      } else {
        if (weekStart < startDate!) {
          const weekEndStartDate = getWeekEnd(startDate!);

          onUpdate?.(weekStart, weekEndStartDate);
          setEndDate(weekEndStartDate);
          setStartDate(weekStart);
        } else {
          setEndDate(weekEnd);
          onUpdate?.(startDate, weekEnd);
        }
        setSelectingStart(true);
      }

      return;
    }

    if (side === 'left') {
      setStartDate(weekStart);
      setEndDate(undefined);
      onUpdate?.(weekStart, undefined);
    } else {
      setEndDate(weekEnd);
      onUpdate?.(startDate, weekEnd);
    }
  };

  const isWeekDisabled = (date: Date, side: 'left' | 'right') => {
    if (side !== 'right') return false;

    if (!startDate) return false;

    const weekStart = getWeekStart(date);
    const weekEnd = getWeekEnd(date);

    if (isTwoMonths && weekEnd < startDate) return true;

    if (maxRangeDays) {
      const maxAllowed = new Date(startDate);
      maxAllowed.setDate(maxAllowed.getDate() + maxRangeDays);

      if (weekStart > maxAllowed) return true;
    }

    return false;
  };

  const isInSelectedRange = (date: Date): boolean => {
    if (!startDate) return false;
    const weekStart = getWeekStart(startDate);
    const weekEnd = endDate || new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
    return date >= weekStart && date <= weekEnd;
  };

  const isInHoveredWeek = (date: Date): boolean => {
    if (!hoveredWeekStart) return false;
    const end = new Date(hoveredWeekStart);
    end.setDate(end.getDate() + 6);
    return date >= hoveredWeekStart && date <= end;
  };

  const getWeekEdgeClass = (date: Date) => {
    const inHover = isInHoveredWeek(date);

    const targetStart = inHover ? hoveredWeekStart! : getWeekStart(date);

    const targetEnd = new Date(targetStart);
    targetEnd.setDate(targetStart.getDate() + 6);

    const isStartDay = date.getTime() === targetStart.getTime();
    const isEndDay = date.getTime() === targetEnd.getTime();

    if (isStartDay) return 'rounded-l-md';

    if (isEndDay) return 'rounded-r-md';

    return '';
  };

  const isInMiddleWeeks = (date: Date): boolean => {
    if (!startDate || !endDate) return false;

    const startWeek = getWeekStart(normalizeDate(startDate)).getTime();
    const endWeek = getWeekStart(normalizeDate(endDate)).getTime();
    const curWeek = getWeekStart(normalizeDate(date)).getTime();

    if (curWeek === startWeek || curWeek === endWeek) return false;

    return curWeek > startWeek && curWeek < endWeek;
  };

  const renderCalendarDays = (month: Date, side: 'left' | 'right') => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const days = [];
    const year = month.getFullYear();
    const monthIdx = month.getMonth();

    // Previous month
    const prevMonth = new Date(year, monthIdx - 1);
    const prevDays = getDaysInMonth(prevMonth);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevDays - i;
      const date = new Date(year, monthIdx - 1, day);
      const disabled = isWeekDisabled(date, side);

      days.push(
        <Day
          key={`prev-${i}`}
          day={day}
          month={prevMonth}
          side={side}
          handleClick={handleDateClick}
          disabled={disabled}
          setHoveredWeekStart={setHoveredWeekStart}
          className={cn(
            'text-general-muted-foreground',
            {
              'cursor-not-allowed': disabled,
              'bg-general-primary': isInHoveredWeek(date) || (isInSelectedRange(date) && !disabled),
              'bg-general-unofficial-accent-2': isInMiddleWeeks(date) && !isInHoveredWeek(date) && !disabled,
            },
            (isInSelectedRange(date) || isInHoveredWeek(date)) && !isInMiddleWeeks(date) && !disabled
              ? getWeekEdgeClass(date)
              : ''
          )}
        />
      );
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIdx, day);
      const isActive =
        isInHoveredWeek(date) || (isInSelectedRange(date) && !isInMiddleWeeks(date) && !isInHoveredWeek(date));
      const disabled = isWeekDisabled(date, side);

      days.push(
        <Day
          key={`cur-${day}`}
          disabled={disabled}
          day={day}
          month={month}
          side={side}
          handleClick={handleDateClick}
          setHoveredWeekStart={setHoveredWeekStart}
          className={cn(
            'hover:text-general-primary-foreground',
            {
              'bg-general-unofficial-accent-2 text-general-foreground': isInMiddleWeeks(date) && !isInHoveredWeek(date),
              'bg-general-primary text-general-primary-foreground': isActive,
              'cursor-not-allowed text-general-muted-foreground': disabled,
            },
            isActive ? getWeekEdgeClass(date) : ''
          )}
        />
      );
    }

    // Next month
    const remaining = totalSlots - days.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(year, monthIdx + 1, day);
      const disabled = isWeekDisabled(date, side);

      days.push(
        <Day
          key={`next-${day}`}
          disabled={disabled}
          day={day}
          month={new Date(year, monthIdx + 1)}
          side={side}
          handleClick={handleDateClick}
          setHoveredWeekStart={setHoveredWeekStart}
          className={cn(
            'text-general-muted-foreground',
            {
              'cursor-not-allowed': disabled,
              'bg-general-primary': isInHoveredWeek(date) || (isInSelectedRange(date) && !disabled),
              'bg-general-unofficial-accent-2': isInMiddleWeeks(date) && !isInHoveredWeek(date) && !disabled,
            },
            (isInSelectedRange(date) || isInHoveredWeek(date)) && !isInMiddleWeeks(date) && !disabled
              ? getWeekEdgeClass(date)
              : ''
          )}
        />
      );
    }

    return days;
  };

  return (
    <div className='space-y-6 rounded-lg bg-background p-0.5 shadow-lg'>
      <div className={cn('grid gap-8', { 'grid-cols-2': isTwoMonths })}>
        {/* Left Calendar - Start Week */}
        <div>
          {isTwoMonths && (
            <Text size='xs' className='py-1.5 text-center text-general-muted-foreground'>
              Start
            </Text>
          )}
          <div className='space-y-0.5'>
            <div className='flex items-center justify-between px-3 py-2'>
              <button type='button' onClick={() => handlePrevMonth('left')}>
                <Icons.chevronLeft className='size-4' />
              </button>
              <Text size='sm' weight={500}>
                {monthNames[leftMonth.getMonth()]} {leftMonth.getFullYear()}
              </Text>
              <button type='button' onClick={() => handleNextMonth('left')}>
                <Icons.chevronRight className='size-4' />
              </button>
            </div>
            <div className='rounded-md border border-general-border'>
              <div className='grid grid-cols-7 gap-y-0.5 px-2 pt-2'>
                {calendarHeader.map((d) => (
                  <Text key={d} size='xs' weight={500} className='flex h-9 items-center justify-center'>
                    {d}
                  </Text>
                ))}
              </div>
              <div className='grid grid-cols-7 gap-y-0.5 px-2 pb-2'>
                {renderCalendarDays(leftMonth, isTwoMonths ? 'left' : 'right')}
              </div>
            </div>
          </div>
        </div>

        {/* Right Calendar - End Week */}
        {isTwoMonths && (
          <div>
            <Text size='xs' className='py-1.5 text-center text-general-muted-foreground'>
              End
            </Text>
            <div className='space-y-0.5'>
              <div className='flex items-center justify-between px-3 py-2'>
                <button type='button' onClick={() => handlePrevMonth('right')}>
                  <Icons.chevronLeft className='size-4' />
                </button>
                <Text size='sm' weight={500}>
                  {monthNames[rightMonth.getMonth()]} {rightMonth.getFullYear()}
                </Text>
                <button type='button' onClick={() => handleNextMonth('right')}>
                  <Icons.chevronRight className='size-4' />
                </button>
              </div>
              <div className='rounded-md border border-general-border'>
                <div className='grid grid-cols-7 gap-y-0.5 px-2 pt-2'>
                  {calendarHeader.map((d) => (
                    <Text key={d} size='xs' weight={500} className='flex h-9 items-center justify-center'>
                      {d}
                    </Text>
                  ))}
                </div>
                <div className='grid grid-cols-7 gap-y-0.5 px-2 pb-2'>{renderCalendarDays(rightMonth, 'right')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface DayProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  day: number;
  month: Date;
  side: 'left' | 'right';
  disabled: boolean;
  handleClick: (day: number, month: Date, side: 'left' | 'right') => void;
  setHoveredWeekStart: (date: Date | undefined) => void;
}

export const Day: React.FC<DayProps> = ({
  day,
  month,
  side,
  handleClick,
  disabled,
  setHoveredWeekStart,
  className,
  ...props
}) => {
  const handleDateHover = (day: number, monthDate: Date) => {
    const d = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    setHoveredWeekStart(getWeekStart(d));
  };

  return (
    <button
      type='button'
      onClick={() => {
        if (!disabled) handleClick(day, month, side);
      }}
      onMouseEnter={() => handleDateHover(day, month)}
      onMouseLeave={() => setHoveredWeekStart(undefined)}
      className={cn(
        'group flex h-9 w-9 items-center justify-center font-open-sauce-one text-xs hover:bg-general-primary',
        {
          'cursor-not-allowed text-general-muted-foreground': disabled,
        },
        className
      )}
      {...props}
    >
      {day}
    </button>
  );
};
