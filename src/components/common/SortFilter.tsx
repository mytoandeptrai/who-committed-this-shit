'use client';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useTranslations from '@/hooks/useTranslations';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Text from '../ui/text';

type SortDirection = 'asc' | 'desc';
type SortValue<T extends string> = `${T}-${SortDirection}`;

type SortSubValue = SortOption<string> & {
  icon?: React.ReactNode;
};

export type SortOption<T extends string> = {
  value: T;
  label: string;
  subValue?: SortSubValue[];
};

type SortFilterProps<T extends string> = {
  options: readonly SortOption<T>[];
  value?: string;
  onChange: (value: SortValue<T>) => void;
  placeholder?: string;
  onClear?: () => void;
};

export function SortFilter<T extends string>({ options, value, onChange, placeholder, onClear }: SortFilterProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const { t } = useTranslations('common');

  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentField = useMemo(() => {
    if (!value) return undefined;
    const [field, direction] = value?.split('-') as [T, SortDirection];

    return { field, direction };
  }, [value]);

  const currentLabel = options.find((o) => o.value === currentField?.field)?.label ?? currentField?.field ?? '';

  const directionIcon =
    currentField?.direction === 'asc' ? (
      <Icons.arrowDownNarrowWide className='size-4 text-general-foreground' />
    ) : (
      <Icons.arrowDownWideNarrow className='size-4 text-general-foreground' />
    );

  const handleSelect = (field: T, direction: SortDirection) => {
    const newValue = `${field}-${direction}` as SortValue<T>;
    onChange?.(newValue);
  };

  const handleClose = useCallback(() => setOpen(false), []);

  const handleClear = () => {
    onClear?.();

    handleClose();
  };

  const displayPlaceholder = placeholder ? placeholder : t('common.sort');

  const displayText = value ? `${t('common.sort')}: ${currentLabel}` : displayPlaceholder;

  useEffect(() => {
    const handleWindowBlur = () => {
      document.body.click();
      handleClose();
    };

    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [handleClose]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger ref={triggerRef} asChild className='w-full'>
        <Button variant='outline' className='flex items-center justify-between'>
          <span className='line-clamp-1 flex items-center gap-2 truncate'>
            {value ? directionIcon : null}
            <Text size='sm' className='truncate'>
              {displayText}
            </Text>
          </span>
          <Icons.chevronDown className='size-4 text-general-foreground' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='md:min-w-52'>
        <DropdownMenuLabel>{t('common.sort-by')}</DropdownMenuLabel>

        <div className='max-h-60 overflow-y-auto' onScroll={() => setOpenSub(null)}>
          {options.map((option) => {
            return (
              <DropdownMenuSub
                open={openSub === option.value}
                onOpenChange={(open) => setOpenSub(open ? option.value : null)}
                key={option.value}
              >
                <DropdownMenuSubTrigger className='cursor-pointer text-sm'>{option.label}</DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  {option.subValue && option.subValue?.length > 0 ? (
                    <DropdownMenuSubContent className='duration-75'>
                      {option.subValue?.map((subValue) => (
                        <DropdownMenuItem
                          key={subValue.value}
                          onSelect={() => handleSelect(option.value, subValue.value as SortDirection)}
                          className='flex cursor-pointer items-center justify-between text-sm md:min-w-44'
                        >
                          {subValue.label}
                          {subValue.icon}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  ) : (
                    <DropdownMenuSubContent className='duration-75'>
                      <DropdownMenuItem
                        onSelect={() => handleSelect(option.value, 'desc')}
                        className='flex cursor-pointer items-center justify-between text-sm md:min-w-44'
                      >
                        {t('common.descending')}
                        <Icons.arrowDownWideNarrow className='size-4 text-general-foreground' />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleSelect(option.value, 'asc')}
                        className='flex cursor-pointer items-center justify-between text-sm md:min-w-44'
                      >
                        {t('common.ascending')}
                        <Icons.arrowDownNarrowWide className='size-4 text-general-foreground' />
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  )}
                </DropdownMenuPortal>
              </DropdownMenuSub>
            );
          })}
        </div>

        <div className='my-2 h-px w-full bg-general-border' />

        <button
          type='button'
          className='justify-baseline flex w-full cursor-pointer items-center rounded-md px-2 py-1.5 font-open-sauce-one text-general-foreground text-sm hover:bg-general-unofficial-accent-2'
          onClick={handleClear}
        >
          {t('common.clear')}
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
