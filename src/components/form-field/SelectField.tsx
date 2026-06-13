import type { LucideIcon } from 'lucide-react';
import type React from 'react';
import { useState, type ReactNode } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Icons } from '@/assets/icons';
import useTranslations from '@/hooks/useTranslations';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import ImageLoader from '../ui/image-loader';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import Text from '../ui/text';
import { Tooltip } from '../ui/tooltip';
import { HStack, Show, VStack } from '../utilities';

export interface ISelectData {
  label: string | React.JSX.Element | ReactNode;
  subLabel?: string | React.JSX.Element | ReactNode;
  value: string;
  image?: string;
  group?: string;
  tooltip?: string;
}

interface Props<T extends FieldValues = FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  subLabel?: ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  data: ISelectData[];
  iconClassName?: string;
  arrowIcon?: LucideIcon;
  requiredClassName?: string;
  isShowCheck?: boolean;
  isError?: boolean;
  noDataText?: ReactNode | string;
  isShowIcon?: boolean;
  isShowError?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  selectContentClassName?: string;
  onValueChange?: (value: string | undefined) => void;
  canClear?: boolean;
  placeholderClassName?: string;
  viewportClassName?: string;
}

const SelectField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  label,
  subLabel,
  required,
  data,
  fullWidth,
  className,
  labelClassName,
  placeholder = 'Select an item',
  requiredClassName,
  isShowCheck = true,
  noDataText = 'No data',
  iconClassName,
  isShowIcon = true,
  isShowError = true,
  header,
  footer,
  selectContentClassName,
  onValueChange,
  canClear = false,
  placeholderClassName,
  viewportClassName,
  ...props
}: Props<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslations('common');

  const handleOpenChange = (open: boolean) => setOpen(open);

  const handleClose = () => setOpen(false);

  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const hasError = !!errors?.[name]?.message;
        const selectedItem = data.find((x) => x.value === field.value);
        return (
          <div className={cn('relative', fullWidth ? 'w-full' : '')}>
            <FormItem>
              <Select
                open={open}
                onOpenChange={handleOpenChange}
                onValueChange={(value) => {
                  if (value) {
                    field.onChange(value);
                    onValueChange?.(value);
                  }
                }}
                value={field.value || ''}
                disabled={props.disabled}
              >
                <FormControl>
                  <div>
                    <Show when={!!label}>
                      <FormLabel className={cn('flex flex-col gap-1', labelClassName)}>
                        <Text className='flex gap-1 text-sm'>
                          {label}
                          {required && <span className={cn('text-general-destructive', requiredClassName)}>*</span>}
                        </Text>
                        {subLabel && (
                          <Text size='xs' className='text-general-muted-foreground'>
                            {subLabel}
                          </Text>
                        )}
                      </FormLabel>
                    </Show>
                    <SelectTrigger
                      className={cn(
                        'font-medium font-open-sauce-one',
                        {
                          'w-full': fullWidth,
                          'text-general-foreground': !!field.value,
                          'border-general-unofficial-destructive-border!': hasError,
                        },
                        className
                      )}
                    >
                      {selectedItem ? (
                        <div className='flex w-full items-center gap-2 overflow-hidden'>
                          {isShowIcon && selectedItem.image && (
                            <div className='relative size-5 shrink-0 overflow-hidden rounded-full'>
                              <ImageLoader src={selectedItem.image} alt='selected' fill className='object-cover' />
                            </div>
                          )}

                          <Text size='sm' className='truncate text-left'>
                            {selectedItem.label}
                          </Text>
                        </div>
                      ) : (
                        <Text size='xs' className={cn('truncate text-general-muted-foreground', placeholderClassName)}>
                          {placeholder}
                        </Text>
                      )}
                    </SelectTrigger>
                  </div>
                </FormControl>

                <SelectContent className={selectContentClassName} viewportClassName={viewportClassName}>
                  <Show when={!!header}>{header}</Show>

                  <Show when={!data?.length}>
                    {typeof noDataText === 'string' ? (
                      <Text className='py-2 text-center text-sm'>{noDataText}</Text>
                    ) : (
                      noDataText
                    )}
                  </Show>

                  {!!data?.length &&
                    data?.map((x) => (
                      <SelectItem key={x.value} value={x.value}>
                        {x.image || x.subLabel ? (
                          <HStack spacing={8} className='w-full'>
                            {x.image && (
                              <div
                                className={cn('relative aspect-square w-8 overflow-hidden rounded-full', iconClassName)}
                              >
                                <ImageLoader src={x.image!} alt='options img' fill className='object-cover' />
                              </div>
                            )}

                            <VStack spacing={0}>
                              <Text size='sm' className='truncate text-left'>
                                {x.label}
                              </Text>
                              {x?.subLabel && <Text className='text-left'>{x?.subLabel}</Text>}
                            </VStack>
                          </HStack>
                        ) : (
                          <HStack noWrap>
                            <Text size='sm' className='text-left'>
                              {x.label}
                            </Text>

                            {!!x?.tooltip && (
                              <Tooltip content={x.tooltip} className='z-999999999999999'>
                                <Icons.info className='size-4 text-general-muted-foreground' />
                              </Tooltip>
                            )}
                          </HStack>
                        )}
                      </SelectItem>
                    ))}

                  <Show when={canClear}>
                    <div className='my-2 h-px w-full bg-general-border' />

                    <button
                      type='button'
                      disabled={!field.value}
                      className='justify-baseline flex w-full cursor-pointer items-center rounded-md px-2 py-1.5 font-open-sauce-one text-general-foreground text-sm hover:bg-general-unofficial-accent-2 disabled:cursor-not-allowed disabled:opacity-50'
                      onClick={() => {
                        field.onChange('');
                        if (onValueChange) {
                          onValueChange(undefined);
                        }
                        handleClose();
                      }}
                    >
                      {t('common.clear')}
                    </button>
                  </Show>

                  <Show when={!!footer}>{footer}</Show>
                </SelectContent>
              </Select>
              {isShowError && <FormMessage className='mt-1 text-general-destructive text-sm' />}
            </FormItem>
          </div>
        );
      }}
    />
  );
};

export { SelectField };
