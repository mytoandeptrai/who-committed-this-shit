'use client';

import { Icons } from '@/assets/icons';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { type HTMLAttributes, useState } from 'react';

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

interface DateRangePickerProps extends HTMLAttributes<HTMLDivElement> {
  onUpdate?: (startDate: Date | undefined, endDate: Date | undefined) => void;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  numberOfMonths?: 1 | 2;
  maxRangeDays?: number;
  disableFuture?: boolean;
}

export function DateRangePicker({
  onUpdate,
  defaultStartDate,
  defaultEndDate,
  numberOfMonths = 2,
  maxRangeDays,
  disableFuture = false,
  className,
  ...props
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(defaultStartDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultEndDate || undefined);
  const [selectingStart, setSelectingStart] = useState(true);

  const isTwoMonths = numberOfMonths === 2;

  const [leftMonth, setLeftMonth] = useState(() => {
    const month = defaultStartDate ? new Date(defaultStartDate) : new Date();
    month.setDate(1);
    if (!defaultStartDate) {
      month.setMonth(month.getMonth() - 1);
    }
    return month;
  });
  const [rightMonth, setRightMonth] = useState(() => {
    const month = defaultStartDate ? new Date(defaultStartDate) : new Date();
    month.setDate(1);
    if (defaultStartDate) {
      month.setMonth(month.getMonth() + 1);
    }
    return month;
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() - 1);
        return newMonth;
      });
    } else {
      setRightMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() - 1);

        return newMonth;
      });
    }
  };

  const handleNextMonth = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() + 1);
        return newMonth;
      });
    } else {
      setRightMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() + 1);
        return newMonth;
      });
    }
  };

  const handleDateClick = (day: number, month: Date, side: 'left' | 'right') => {
    const selectedDate = new Date(month.getFullYear(), month.getMonth(), day);

    if (numberOfMonths === 1) {
      if (selectingStart) {
        setStartDate(selectedDate);
        setEndDate(undefined);
        setSelectingStart(false);
        onUpdate?.(selectedDate, undefined);
      } else {
        if (selectedDate < startDate!) {
          onUpdate?.(selectedDate, startDate);
          setEndDate(startDate);
          setStartDate(selectedDate);
        } else {
          setEndDate(selectedDate);
          onUpdate?.(startDate, selectedDate);
        }
        setSelectingStart(true);
      }

      return;
    }

    if (side === 'left') {
      setStartDate(selectedDate);
      setEndDate(undefined);
      onUpdate?.(selectedDate, undefined);
    } else {
      setEndDate(selectedDate);
      onUpdate?.(startDate, selectedDate);
    }
  };

  const isEndDateDisabled = (date: Date) => {
    if (!startDate) return false;

    if (isTwoMonths && date < startDate) return true;

    if (maxRangeDays) {
      const maxAllowed = new Date(startDate);
      maxAllowed.setDate(maxAllowed.getDate() + maxRangeDays);
      if (date > maxAllowed) return true;
    }

    if (disableFuture && date > new Date()) return true;

    return false;
  };

  const isStartDateDisabled = (date: Date) => {
    if (disableFuture && date > new Date()) return true;
    return false;
  };

  const isDateInRange = (day: number, month: Date) => {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (day: number, month: Date) => {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    return startDate?.toDateString() === date.toDateString() || endDate?.toDateString() === date.toDateString();
  };

  const renderCalendarDays = (month: Date, side: 'left' | 'right') => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const days = [];

    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    // === Previous month's days ===
    const prevMonth = new Date(year, monthIndex - 1);
    const prevMonthDays = getDaysInMonth(prevMonth);

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const actualDate = new Date(year, monthIndex - 1, day);
      const isInRange = startDate && endDate && actualDate >= startDate && actualDate <= endDate;
      const isStartOrEnd =
        (startDate && actualDate.toDateString() === startDate.toDateString()) ||
        (endDate && actualDate.toDateString() === endDate.toDateString());
      const adjacentMonth = new Date(year, monthIndex - 1, 1);
      const disabled = side === 'right' ? isEndDateDisabled(actualDate) : isStartDateDisabled(actualDate);

      days.push(
        <div
          key={`prev-${i}`}
          className={cn('flex items-center justify-center', {
            'bg-general-unofficial-accent-2': isInRange && !isStartOrEnd,
          })}
        >
          <button
            type='button'
            onClick={() => {
              if (!disabled) {
                handleDateClick(day, adjacentMonth, side);
              }
            }}
            className={cn(
              'group flex aspect-square flex-1 items-center justify-center p-2 font-open-sauce-one text-general-muted-foreground text-xs hover:rounded-xs hover:bg-general-primary hover:text-general-primary-foreground',
              {
                'rounded-xs bg-general-primary text-general-primary-foreground': isStartOrEnd,
                'bg-general-unofficial-accent-2': isInRange && !isStartOrEnd,
                'cursor-not-allowed': disabled,
              }
            )}
          >
            {day}
          </button>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day, month);
      const isRange = isDateInRange(day, month);

      const actualDate = new Date(month.getFullYear(), month.getMonth(), day);
      const disabled = side === 'right' ? isEndDateDisabled(actualDate) : isStartDateDisabled(actualDate);

      days.push(
        <div
          key={`current-${day}`}
          className={cn('flex items-center justify-center', {
            'bg-general-unofficial-accent-2': !isSelected && isRange,
          })}
        >
          <button
            type='button'
            onClick={() => {
              if (!disabled) handleDateClick(day, month, side);
            }}
            className={cn(
              'group flex aspect-square flex-1 items-center justify-center p-2 font-open-sauce-one text-general-foreground text-xs hover:rounded-xs hover:bg-general-primary hover:text-general-primary-foreground',
              {
                'rounded-xs bg-general-primary text-general-primary-foreground': isSelected,
                'bg-general-unofficial-accent-2': !isSelected && isRange,
                'cursor-not-allowed text-general-muted-foreground': disabled,
              }
            )}
          >
            {day}
          </button>
        </div>
      );
    }

    // Next month's days
    const remainingDays = totalSlots - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const actualDate = new Date(year, monthIndex + 1, day);

      const isInRange = startDate && endDate && actualDate >= startDate && actualDate <= endDate;
      const isStartOrEnd =
        (startDate && actualDate.toDateString() === startDate.toDateString()) ||
        (endDate && actualDate.toDateString() === endDate.toDateString());
      const adjacentMonth = new Date(year, monthIndex + 1, 1);
      const disabled = side === 'right' ? isEndDateDisabled(actualDate) : isStartDateDisabled(actualDate);

      days.push(
        <div
          key={`next-${day}`}
          className={cn('flex items-center justify-center', {
            'bg-general-unofficial-accent-2': isInRange && !isStartOrEnd,
          })}
        >
          <button
            type='button'
            onClick={() => {
              if (!disabled) {
                handleDateClick(day, adjacentMonth, side);
              }
            }}
            className={cn(
              'group flex aspect-square flex-1 items-center justify-center p-2 font-open-sauce-one text-general-muted-foreground text-xs hover:rounded-xs hover:bg-general-primary hover:text-general-primary-foreground',
              {
                'rounded-xs bg-general-primary text-general-primary-foreground': isStartOrEnd,
                'bg-general-unofficial-accent-2': isInRange && !isStartOrEnd,
                'cursor-not-allowed': disabled,
              }
            )}
          >
            {day}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={cn('space-y-6 rounded-lg bg-background p-0.5 shadow-lg', className)} {...props}>
      {/* Calendar Grid */}
      <div
        className={cn('grid gap-8', {
          'grid-cols-2': isTwoMonths,
        })}
      >
        {/* Start Date Calendar */}
        <div>
          {isTwoMonths && (
            <Text size='xs' className='py-1.5 text-center text-general-muted-foreground'>
              Start
            </Text>
          )}
          <div className='space-y-0.5'>
            <div className='flex items-center justify-between px-3 py-2'>
              <button type='button' onClick={() => handlePrevMonth('left')} className='cursor-pointer'>
                <Icons.chevronLeft className='size-4' />
              </button>
              <Text size='sm' weight={500} className='text-center'>
                {monthNames[leftMonth.getMonth()]} {leftMonth.getFullYear()}{' '}
              </Text>
              <button type='button' onClick={() => handleNextMonth('left')} className='cursor-pointer'>
                <Icons.chevronRight className='size-4' />
              </button>
            </div>

            <div className='rounded-md border border-general-border'>
              {/* Calendar Days Header */}
              <div className='grid grid-cols-7 gap-y-0.5 px-2 pt-2'>
                {calendarHeader.map((day) => (
                  <Text key={day} size='xs' weight={500} className='flex items-center justify-center p-2'>
                    {day}
                  </Text>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className='grid grid-cols-7 gap-y-0.5 px-2 pb-2'>
                {renderCalendarDays(leftMonth, isTwoMonths ? 'left' : 'right')}
              </div>
            </div>
          </div>
        </div>

        {/* End Date Calendar */}
        {isTwoMonths && (
          <div>
            <Text size='xs' className='py-1.5 text-center text-general-muted-foreground'>
              End
            </Text>
            <div className='space-y-0.5'>
              <div className='flex items-center justify-between px-3 py-2'>
                <button type='button' onClick={() => handlePrevMonth('right')} className='cursor-pointer'>
                  <Icons.chevronLeft className='size-4' />
                </button>
                <Text size='sm' weight={500} className='text-center'>
                  {monthNames[rightMonth.getMonth()]} {rightMonth.getFullYear()}{' '}
                </Text>
                <button type='button' onClick={() => handleNextMonth('right')} className='cursor-pointer'>
                  <Icons.chevronRight className='size-4' />
                </button>
              </div>

              {/* Calendar Days Header */}
              <div className='rounded-md border border-general-border'>
                {/* Calendar Days Header */}
                <div className='grid grid-cols-7 gap-y-0.5 px-2 pt-2'>
                  {calendarHeader.map((day) => (
                    <Text key={day} size='xs' weight={500} className='flex items-center justify-center p-2'>
                      {day}
                    </Text>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className='grid grid-cols-7 gap-y-0.5 px-2 pb-2'>{renderCalendarDays(rightMonth, 'right')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
