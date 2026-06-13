import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Text from '../ui/text';
import type { TextareaProps } from '../ui/textarea';
import { Textarea } from '../ui/textarea';
import { Show } from '../utilities';

interface Props<T extends FieldValues = FieldValues> extends TextareaProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: ReactNode;
  isOptional?: boolean;
  optionalClassName?: string;
  labelClassName?: string;
  subLabel?: string;
  containerClassName?: string;
  isShowError?: boolean;
}

const TextAreaField = <T extends FieldValues>({
  defaultValue,
  labelClassName,
  control,
  label,
  subLabel,
  isOptional = false,
  optionalClassName,
  containerClassName,
  className,
  isShowError = true,
  ...props
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={props.name}
      defaultValue={defaultValue}
      render={({ field, formState: { errors } }) => {
        const hasError = !!errors?.[props.name]?.message;

        return (
          <FormItem>
            <FormControl>
              <div className={containerClassName}>
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
                <Textarea
                  {...field}
                  {...props}
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

export { TextAreaField };
