'use client';

import { cn } from '@/lib/utils';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import * as React from 'react';

export interface DateInputProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value?: Date | null;
  onChange?: (date: Date | null, rawValue: string) => void;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
}

function DateInput({
  className,
  value,
  onChange,
  minDate,
  maxDate,
  error,
  placeholder = 'dd/MM/yyyy',
  disabled,
  ...props
}: DateInputProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sync input value with external value
  React.useEffect(() => {
    if (value && isValid(value) && !isFocused) {
      setInputValue(format(value, 'dd/MM/yyyy'));
    } else if (!value && !isFocused) {
      setInputValue('');
    }
  }, [value, isFocused]);

  const formatInputValue = (raw: string): string => {
    // Remove all non-numeric characters
    let digits = raw.replace(/\D/g, '');
    let result = '';

    // Process day (positions 0-1)
    if (digits.length >= 1) {
      const firstDayDigit = Number.parseInt(digits[0], 10);

      // If first digit > 3, auto-pad with 0 (e.g., "4" -> "04")
      if (firstDayDigit > 3) {
        result = `0${digits[0]}`;
        digits = digits[0] + digits.slice(1);
      } else if (digits.length >= 2) {
        const day = Number.parseInt(digits.slice(0, 2), 10);
        // Cap day at 31
        if (day > 31) {
          result = '31';
        } else if (day === 0) {
          result = '01';
        } else {
          result = digits.slice(0, 2);
        }
      } else {
        result = digits[0];
      }
    }

    // Add slash after day if we have more digits
    if (digits.length > 2 || (digits.length >= 1 && Number.parseInt(digits[0], 10) > 3)) {
      const dayPart = result.slice(0, 2);
      const remainingDigits = Number.parseInt(digits[0], 10) > 3 ? digits.slice(1) : digits.slice(2);

      if (remainingDigits.length >= 1) {
        result = dayPart + '/';

        const firstMonthDigit = Number.parseInt(remainingDigits[0], 10);

        // If first month digit > 1, auto-pad with 0 (e.g., "2" -> "02")
        if (firstMonthDigit > 1) {
          result += `0${remainingDigits[0]}`;

          // Process year if there are more digits
          if (remainingDigits.length > 1) {
            result += '/' + remainingDigits.slice(1, 5);
          }
        } else if (remainingDigits.length >= 2) {
          const month = Number.parseInt(remainingDigits.slice(0, 2), 10);

          // If month > 12, cap at 12
          if (month > 12) {
            result += '12';
          } else if (month === 0) {
            result += '01';
          } else {
            result += remainingDigits.slice(0, 2);
          }

          // Process year
          if (remainingDigits.length > 2) {
            result += '/' + remainingDigits.slice(2, 6);
          }
        } else {
          result += remainingDigits[0];
        }
      }
    }

    return result;
  };

  const validateDate = (dateStr: string): { isValid: boolean; date: Date | null; error: string | null } => {
    if (!dateStr || dateStr.length === 0) {
      return { isValid: true, date: null, error: null };
    }

    // Check if the format is complete (dd/MM/yyyy = 10 characters)
    if (dateStr.length !== 10) {
      return { isValid: false, date: null, error: 'Incomplete date' };
    }

    // Parse the date
    const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());

    if (!isValid(parsedDate)) {
      return { isValid: false, date: null, error: 'Invalid date' };
    }

    // Check if the formatted date matches input (handles invalid dates like 31/02/2024)
    const formattedBack = format(parsedDate, 'dd/MM/yyyy');
    if (formattedBack !== dateStr) {
      return { isValid: false, date: null, error: 'Invalid date' };
    }

    // Check min/max bounds
    if (minDate && isBefore(parsedDate, minDate)) {
      return { isValid: false, date: parsedDate, error: `Date must be after ${format(minDate, 'dd/MM/yyyy')}` };
    }

    if (maxDate && isAfter(parsedDate, maxDate)) {
      return { isValid: false, date: parsedDate, error: `Date must be before ${format(maxDate, 'dd/MM/yyyy')}` };
    }

    return { isValid: true, date: parsedDate, error: null };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatInputValue(raw);

    // Limit to 10 characters (dd/MM/yyyy)
    if (formatted.length > 10) return;

    setInputValue(formatted);

    // Only validate and call onChange when complete
    if (formatted.length === 10) {
      const validation = validateDate(formatted);
      onChange?.(validation.date, formatted);
    } else {
      onChange?.(null, formatted);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Validate on blur
    if (inputValue.length > 0 && inputValue.length < 10) {
      onChange?.(null, inputValue);
    } else if (inputValue.length === 10) {
      const validation = validateDate(inputValue);
      if (!validation.isValid) {
        onChange?.(null, inputValue);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 46, 9, 27, 13].includes(e.keyCode)) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return;
    }

    // Allow: home, end, left, right
    if (e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }

    // Block non-numeric input
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className='relative w-full'>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          inputMode='numeric'
          autoComplete='off'
          data-slot='input'
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'inset-0 h-full w-fit cursor-text bg-transparent text-foreground text-sm outline-none placeholder:text-general-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-calendar-picker-indicator]:hidden',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { DateInput };
