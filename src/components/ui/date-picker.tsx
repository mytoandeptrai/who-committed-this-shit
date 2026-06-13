'use client';

import { format, isValid } from 'date-fns';
import * as React from 'react';

import { Icons } from '@/assets/icons';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { Matcher } from 'react-day-picker';
import { DateInput } from './date-input';

export interface DatePickerProps extends Omit<ButtonProps, 'value' | 'onValueChange' | 'disabled'> {
  value: Date | undefined;
  onValueChange: (value: Date | undefined) => void;
  dateFormat?: string;
  placeholder?: string;
  disableFuture?: boolean;
  disabledTrigger?: boolean;
  disabled?: Matcher | Matcher[];
  editable?: boolean;
  disableCalendarFocus?: boolean;
}

const DatePicker = ({
  value,
  onValueChange,
  className,
  dateFormat = 'MMM dd, yyyy',
  placeholder = 'Pick a date',
  disableFuture = false,
  disabledTrigger = false,
  disabled,
  editable = false,
  disableCalendarFocus = false,
  ...props
}: DatePickerProps) => {
  const [month, setMonth] = React.useState<Date | undefined>(value);

  // Sync month when value changes externally
  React.useEffect(() => {
    if (value && isValid(value)) {
      setMonth(value);
    }
  }, [value]);

  const handleDateInputChange = (date: Date | undefined) => {
    if (date && isValid(date)) {
      setMonth(date);
    }
    onValueChange(date);
  };

  return (
    <div className='w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-between text-left font-normal',
              !value && 'text-general-muted-foreground',
              className
            )}
            disabled={disabledTrigger}
            {...props}
          >
            {editable ? (
              <DateInput
                value={value}
                onChange={(date) => handleDateInputChange(date || undefined)}
                maxDate={disableFuture ? new Date() : undefined}
                disabled={disabledTrigger}
                placeholder={placeholder}
                className='inset-0 h-full w-fit cursor-text bg-transparent text-foreground text-sm outline-none'
              />
            ) : (
              <span className='pointer-events-none'>
                {value && isValid(value) ? format(value, dateFormat) : placeholder}
              </span>
            )}
            <Icons.calendar className='size-4 shrink-0 text-neutral-600' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='z-99999999 bg-background p-0'
          align='start'
          arrowClassName='bg-background fill-background'
        >
          <Calendar
            mode='single'
            selected={value}
            onSelect={(value) => onValueChange(value)}
            month={month}
            onMonthChange={setMonth}
            initialFocus={!disableCalendarFocus}
            className='w-full bg-background'
            // biome-ignore lint/style/noNestedTernary: <explanation>
            disabled={disabled ? disabled : disableFuture ? { after: new Date() } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
