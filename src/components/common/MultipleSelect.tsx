import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type { IOption } from '@/types';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { type KeyboardEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Text from '../ui/text';

interface SubGroupSelectProps {
  options: IOption<string>[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  hasAllOption?: boolean;
  isError?: boolean;
}

const MultipleSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select sub-groups',
  disabled = false,
  hasAllOption = false,
  isError = false,
}: SubGroupSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleOption = (col: IOption<string>) => {
    // Handle "All" option
    if (hasAllOption && col.value === 'ALL') {
      if (value.length === options.length && options.length > 0) {
        // If all options are selected, deselect all
        onChange([]);
      } else {
        // Select all options except "All"
        const allValues = options.filter((opt) => opt.value !== 'ALL').map((opt) => opt.value);
        onChange(allValues);
      }
      return;
    }

    const isSelected = value.includes(col.value);
    if (isSelected) {
      onChange(value.filter((v) => v !== col.value));
    } else {
      onChange([...value, col.value]);
    }
  };

  const onCheckboxChange = (col: IOption<string>, checked: CheckedState) => {
    // Handle "All" option
    if (hasAllOption && col.value === 'ALL') {
      if (checked) {
        // Select all options except "All"
        const allValues = options.filter((opt) => opt.value !== 'ALL').map((opt) => opt.value);
        onChange(allValues);
      } else {
        // Deselect all
        onChange([]);
      }
      return;
    }

    if (checked) {
      onChange([...value, col.value]);
    } else {
      onChange(value.filter((v) => v !== col.value));
    }
  };

  // Handle keyboard navigation inside the dropdown list
  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(focusedIndex + 1, options.length - 1);
      setFocusedIndex(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(focusedIndex - 1, 0);
      setFocusedIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Handle keyboard on each item (Enter / Space to toggle)
  const onItemKeyDown = (e: KeyboardEvent<HTMLDivElement>, col: IOption<string>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOption(col);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(focusedIndex + 1, options.length - 1);
      setFocusedIndex(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(focusedIndex - 1, 0);
      setFocusedIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // When dropdown opens, reset focus and focus the first item
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setFocusedIndex(0);
      // Wait for DOM to render before focusing
      setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 0);
    } else {
      setFocusedIndex(-1);
    }
  };

  const getDisplayText = () => {
    // Handle "All" selection display
    if (hasAllOption && value.length > 0 && value.length === options.length) {
      return 'All';
    }

    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const option = options.find((opt) => opt.value === value[0]);
      return option?.label || value[0];
    }

    return value
      .map((v) => {
        const option = options.find((opt) => opt.value === v);
        return option?.label || v;
      })
      .join(', ');
  };

  // Prepare options with "All" option if needed
  const displayOptions = hasAllOption ? [{ value: 'ALL', label: 'All' }, ...options] : options;

  return (
    <div className='w-full'>
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button
            suffix={<Icons.chevronDown className='h-4 w-4' />}
            variant='outline'
            className={cn(
              'w-full justify-between border-general-border font-normal font-open-sauce-one text-sm outline-0 focus-within:ring-0 active:ring-0 max-md:w-full',
              {
                'text-muted-foreground': value.length === 0,
                'border-general-destructive': isError,
              }
            )}
            disabled={disabled}
          >
            <span className='truncate'>{getDisplayText()}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='start'
          className='z-999999999 flex w-(--radix-dropdown-menu-trigger-width) min-w-60 flex-col bg-background'
        >
          {/* onKeyDown on the container handles arrow navigation when focus is
            anywhere inside (fallback if individual item handlers miss it) */}
          <div
            className='max-h-60 overflow-y-auto py-2'
            onKeyDown={onListKeyDown}
            // NOT tabIndex here — individual items are focusable instead
          >
            {displayOptions.map((col, index) => {
              const isSelected =
                col.value === 'ALL' ? value.length === options.length && options.length > 0 : value.includes(col.value);

              return (
                <div
                  key={col.value}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={cn(
                    'flex cursor-pointer items-center justify-between space-x-2 rounded-sm p-2 outline-none hover:bg-general-unofficial-accent-2',
                    'focus:bg-general-unofficial-accent-2 focus-visible:ring-0'
                  )}
                  onClick={() => toggleOption(col)}
                  onKeyDown={(e) => onItemKeyDown(e, col)}
                  onFocus={() => setFocusedIndex(index)}
                  role='option'
                  aria-selected={isSelected}
                  tabIndex={focusedIndex === index ? 0 : -1}
                >
                  <Text size='sm'>{col.label}</Text>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onCheckboxChange(col, checked)}
                    // Prevent checkbox from stealing focus / double-firing
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MultipleSelect;
