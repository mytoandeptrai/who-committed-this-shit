import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

import type { HTMLAttributes } from 'react';
import type { Matcher } from 'react-day-picker';
import DatePicker, { type DatePickerProps } from '../ui/date-picker';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Text from '../ui/text';
import { Show } from '../utilities';

interface Props<T extends FieldValues> extends Omit<DatePickerProps, 'value' | 'onValueChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
  required?: boolean;
  containerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  inputContainerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  requiredClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  suffixClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  subLabel?: string;
  isShowError?: boolean;
  onValueChange?: (value: Date | undefined) => void;
  value?: Date;
  disabled?: Matcher | Matcher[] | boolean;
}

const DatePickerField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  containerClassName,
  inputContainerClassName,
  requiredClassName,
  subLabel,
  isShowError = true,
  dateFormat,
  placeholder,
  value,
  onValueChange,
  disableFuture,
  disabled,
  editable,
  disabledTrigger,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field, formState: { errors } }) => {
        const hasError = !!errors?.[props.name]?.message;
        return (
          <FormItem>
            <FormControl>
              <div className={cn('w-full', containerClassName)}>
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
                <DatePicker
                  value={value || field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    onValueChange?.(value);
                  }}
                  className={cn(
                    {
                      'border-general-unofficial-destructive-border focus-visible:border-general-unofficial-destructive-border focus-visible:ring-focus-ring-error':
                        hasError,
                    },
                    className
                  )}
                  dateFormat={dateFormat}
                  placeholder={placeholder}
                  disableFuture={disableFuture}
                  disabled={disabled}
                  disabledTrigger={disabledTrigger}
                  editable={editable}
                />
                {isShowError && <FormMessage className='mt-1 text-general-destructive text-sm' />}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export { DatePickerField };
