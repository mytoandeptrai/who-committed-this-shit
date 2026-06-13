import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Text from '../ui/text';
import { Show } from '../utilities';

interface RadioData {
  value: string;
  label: string;
  subLabel?: string;
}

interface RadioProps<T extends FieldValues = FieldValues> {
  data: RadioData[];
  isChecked?: boolean;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  labelClassName?: string;
  containerClassName?: string;
  className?: string;
}

const RadioGroupField = <T extends FieldValues>({
  control,
  name,
  labelClassName,
  containerClassName,
  data,
  className,
  defaultValue,
  ...props
}: RadioProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn('my-3 flex items-center gap-2', containerClassName)}>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className={cn('flex flex-col gap-2', className)}
                defaultValue={defaultValue}
                {...props}
              >
                {data.map((item) => (
                  <div
                    key={item.value}
                    className={cn('flex items-center gap-2', {
                      'items-start': !!item.subLabel,
                    })}
                  >
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Show when={!!item.label}>
                      <FormLabel htmlFor={item.value} className={cn('mb-0 flex flex-col gap-1', labelClassName)}>
                        <Text className='flex gap-1 text-general-unofficial-foreground-alt text-sm leading-none'>
                          {item.label}
                        </Text>

                        {item.subLabel && (
                          <Text size='xs' className='text-general-muted-foreground'>
                            {item.subLabel}
                          </Text>
                        )}
                      </FormLabel>
                    </Show>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
};

export { RadioGroupField };
