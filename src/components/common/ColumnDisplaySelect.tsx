import { Icons } from '@/assets/icons';
import useTranslations from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import type { IOption } from '@/types';
import { shortenString } from '@/utils/common';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { type KeyboardEvent, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import Text from '../ui/text';
import { HStack } from '../utilities';
import Blank from './Blank';

interface ColumnDisplaySelectProps {
  options: IOption<string>[];
  value: string[];
  onChange: (value: string[]) => void;
  defaultOptions?: string[];
}

const ColumnDisplaySelect = ({ options, value, onChange, defaultOptions = [] }: ColumnDisplaySelectProps) => {
  const { t } = useTranslations('common');
  const [search, setSearch] = useState('');

  const isSearching = !!search;

  const filteredOptions = useMemo(() => {
    return options.filter((col) => col.value !== 'no');
  }, [options]);

  const filteredSearchOptions = useMemo(() => {
    if (!search) return filteredOptions;
    return filteredOptions.filter((col) => col.label.toLowerCase().includes(search.toLowerCase().trim()));
  }, [filteredOptions, search]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>, isSelected: boolean, col: IOption<string>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isSelected) {
        onChange(value.filter((v) => v !== col.value));
      } else {
        onChange([...value, col.value]);
      }
    }
  };

  const onClick = (isSelected: boolean, col: IOption<string>) => {
    if (isSelected) {
      onChange(value.filter((v) => v !== col.value));
    } else {
      onChange([...value, col.value]);
    }
  };

  const onCheckboxChange = (col: IOption<string>, checked: CheckedState) => {
    if (checked) {
      onChange([...value, col.value]);
    } else {
      onChange(value.filter((v) => v !== col.value));
    }
  };

  const handleToggleAll = () => {
    const optionValues = options?.map((p) => p?.value) || [];
    const currentDisplayed = value || [];

    const isAllSelected = optionValues.every((key) => currentDisplayed.includes(key));

    if (isAllSelected) {
      onChange(defaultOptions);
    } else {
      onChange(optionValues);
    }
  };

  const allSelected = useMemo(() => {
    if (!filteredOptions || filteredOptions.length === 0) return false;
    const optionValues = filteredOptions.map((p) => String(p?.value));
    return optionValues.every((key) => value.includes(key));
  }, [filteredOptions, value]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          suffix={<Icons.chevronDown className='h-4 w-4' />}
          variant='outline'
          className='justify-between font-open-sauce-one max-md:w-full'
        >
          {t('common.customize')}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='flex min-w-60 flex-col bg-background'>
        <Input
          prefix={<Icons.search className='h-4 w-4 text-muted-foreground' />}
          placeholder={t('common.filter')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <HStack spacing={8} justify='between' className='mx-3 mt-4'>
          <Text size='sm'>{t('common.all-columns')}</Text>
          <Checkbox checked={allSelected} onCheckedChange={handleToggleAll} />
        </HStack>

        <span className='mx-2 mt-4 h-px w-full bg-general-border' />
        <div className='max-h-60 overflow-y-auto py-2'>
          {filteredSearchOptions.map((col) => {
            const isSelected = value.includes(col.value);
            const isDefault = defaultOptions.includes(col.value);
            return (
              <div
                key={col.value}
                className={cn(
                  'flex cursor-pointer items-center justify-between space-x-2 rounded-sm p-2 outline-none hover:bg-general-unofficial-accent-2',
                  isDefault && 'cursor-not-allowed hover:bg-transparent'
                )}
                onClick={() => !isDefault && onClick(isSelected, col)}
                onKeyDown={(e) => !isDefault && onKeyDown(e, isSelected, col)}
                role='button'
                tabIndex={0}
              >
                <Text size='sm'>{col.label}</Text>
                <Checkbox
                  disabled={isDefault}
                  checked={isSelected}
                  onCheckedChange={(checked) => onCheckboxChange(col, checked)}
                />
              </div>
            );
          })}
          {filteredSearchOptions.length === 0 && (
            <Blank
              icon={isSearching ? <Icons.searchX className='h-3.5 w-3.5 text-general-foreground' /> : undefined}
              text={isSearching ? t('common.no-result') : undefined}
              subText={isSearching ? `${t('common.no-result-text')} "${shortenString(search, 6)}"` : undefined}
              action={
                isSearching && (
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSearch('');
                    }}
                  >
                    {t('common.clear-search')}
                  </Button>
                )
              }
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnDisplaySelect;
