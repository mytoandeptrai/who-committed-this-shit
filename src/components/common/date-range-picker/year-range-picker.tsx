import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface YearRangePickerProps {
  onUpdate?: (startYear: Date | undefined, endYear: Date | undefined) => void;
  defaultStartYear?: Date;
  defaultEndYear?: Date;
  maxRangeYears?: number;
  yearStart: number;
}

export default function YearRangePicker({
  onUpdate,
  defaultStartYear,
  defaultEndYear,
  maxRangeYears = 9,
  yearStart,
}: YearRangePickerProps) {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState<Date | undefined>(defaultStartYear);
  const [endYear, setEndYear] = useState<Date | undefined>(defaultEndYear);
  const [selectingStart, setSelectingStart] = useState(true);

  const years = Array.from({ length: maxRangeYears + 1 }, (_, i) => yearStart + i);

  const handleSelectYear = (year: number) => {
    const date = new Date(year, 0, 1);
    if (year > currentYear) return;
    if (selectingStart) {
      setStartYear(date);
      setEndYear(undefined);
      setSelectingStart(false);
      onUpdate?.(date, undefined);
    } else {
      if (!startYear) return;
      if (date < startYear) {
        setEndYear(startYear);
        setStartYear(date);
        setSelectingStart(true);
        onUpdate?.(date, startYear);
      } else {
        setEndYear(date);
        setSelectingStart(true);
        onUpdate?.(startYear, date);
      }
    }
  };

  const isYearInRange = (year: number) => {
    if (!startYear || !endYear) return false;
    const d = new Date(year, 0, 1);
    return d >= startYear && d <= endYear;
  };

  const isYearSelected = (year: number) => {
    if (!startYear && !endYear) return false;
    return (startYear && startYear.getFullYear() === year) || (endYear && endYear.getFullYear() === year);
  };

  return (
    <div className='flex flex-col gap-0.5 rounded-lg bg-background p-0.5'>
      <Text size='xs' weight={500} className='py-1.5 text-center text-general-muted-foreground'>
        Time Range
      </Text>
      <div className='grid grid-cols-2 gap-y-0.5 rounded-sm border border-general-border p-2'>
        {years.map((year) => {
          const selected = isYearSelected(year);
          const inRange = isYearInRange(year);
          const disabled = year > currentYear;
          let btnClass = 'bg-background text-general-foreground';
          if (selected) btnClass = 'bg-general-primary text-general-primary-foreground';
          else if (inRange) btnClass = 'bg-general-unofficial-accent-2 text-general-foreground';
          return (
            <button
              key={year}
              type='button'
              onClick={() => !disabled && !selected && handleSelectYear(year)}
              className={cn(
                'flex h-9 w-31.5 items-center justify-center font-medium font-open-sauce-one text-general-primary-foreground text-xs hover:rounded-sm hover:bg-general-primary hover:text-general-primary-foreground',
                btnClass,
                selected ? 'rounded-sm' : '',
                disabled ? 'pointer-events-none cursor-not-allowed text-general-muted-foreground' : ''
              )}
              disabled={disabled}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}
