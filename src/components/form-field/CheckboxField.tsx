import type { ReactNode } from 'react';
import { useId } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Text from '../ui/text';
import { Show } from '../utilities';

interface CheckboxProps<T extends FieldValues = FieldValues> {
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  required?: boolean;
  subLabel?: ReactNode;
  labelClassName?: string;
  requiredClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  subLabel,
  labelClassName,
  requiredClassName,
  containerClassName,
  ...props
}: CheckboxProps<T>) => {
  const id = useId();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              'my-3 flex items-center gap-2',
              {
                'items-start': subLabel,
              },
              containerClassName
            )}
          >
            <FormControl>
              <Checkbox
                id={id}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={props.disabled}
                {...props}
              />
            </FormControl>
            <Show when={!!label}>
              <FormLabel className={cn('mb-0 flex flex-col gap-1', labelClassName)}>
                <Text className='flex gap-1 text-general-unofficial-foreground-alt text-sm leading-none'>
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
          </div>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
};

export { CheckboxField };
