import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';

import type { HTMLAttributes, RefObject } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, type InputProps } from '../ui/input';
import Text from '../ui/text';
import { Show } from '../utilities';

interface Props<T extends FieldValues = FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
  isOptional?: boolean;
  containerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  inputContainerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  optionalClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  suffixClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  subLabel?: string;
  isShowError?: boolean;
  onValueChange?: (value: string) => void;
  ref?: RefObject<HTMLInputElement | null>;
  blockSpace?: boolean;
}

const TextField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  isOptional = false,
  containerClassName,
  inputContainerClassName,
  optionalClassName,
  subLabel,
  isShowError = true,
  onValueChange,
  ref,
  blockSpace,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field: { onChange, ...field }, formState: { errors } }) => {
        const hasError = !!errors?.[props.name]?.message;
        return (
          <FormItem>
            <FormControl>
              <div className={cn(containerClassName)}>
                <Show when={!!label}>
                  <FormLabel className={cn('flex flex-col gap-1', labelClassName)}>
                    <Text className='flex gap-1 text-sm'>
                      {label}
                      {isOptional && <span className={cn(optionalClassName)}>(optional)</span>}
                    </Text>
                    {subLabel && (
                      <Text size='xs' className='text-general-muted-foreground'>
                        {subLabel}
                      </Text>
                    )}
                  </FormLabel>
                </Show>
                <Input
                  {...field}
                  {...props}
                  ref={ref}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (blockSpace) {
                      value = value.replace(/\s/g, '');
                    }

                    onChange(value);
                    onValueChange?.(value);
                  }}
                  containerClassName={inputContainerClassName}
                  className={cn(
                    {
                      'border-general-unofficial-destructive-border focus-visible:border-general-unofficial-destructive-border focus-visible:ring-focus-ring-error':
                        hasError,
                    },
                    className
                  )}
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

export { TextField };
