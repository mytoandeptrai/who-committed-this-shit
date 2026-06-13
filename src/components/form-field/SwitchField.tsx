import { type HTMLAttributes, useId } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';
import Text from '../ui/text';
import { Show } from '../utilities';

interface SwitchProps<T extends FieldValues = FieldValues> {
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  subLabel?: string;
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
  containerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  requiredClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  required?: boolean;
  className?: string;
  isShowError?: boolean;
}

const SwitchField = <T extends FieldValues>({
  className,
  labelClassName,
  requiredClassName,
  control,
  defaultValue,
  label,
  subLabel,
  required,
  name,
  containerClassName,
  isShowError = true,
  ...props
}: SwitchProps<T>) => {
  const id = useId();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div>
              <div
                className={cn(
                  'flex items-center gap-2',
                  {
                    'items-start': subLabel,
                  },
                  containerClassName
                )}
              >
                <Switch id={id} checked={field.value} onCheckedChange={field.onChange} {...props} />

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
              {isShowError && <FormMessage className='mt-1 text-general-destructive text-sm' />}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { SwitchField };
