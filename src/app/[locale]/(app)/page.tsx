'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormWrapper } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useTranslations from '@/hooks/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function DemoFormPage() {
  const { t } = useTranslations('common');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t('demo-form.name-error') }),
    email: z.string().email({ message: t('demo-form.email-error') }),
    role: z.string().min(1, { message: t('demo-form.role-error') }),
    bio: z
      .string()
      .max(200, { message: t('demo-form.bio-error') })
      .optional(),
    acceptTerms: z.literal(true, { message: t('demo-form.accept-terms-error') }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const roles = [
    { label: t('demo-form.role-developer'), value: 'developer' },
    { label: t('demo-form.role-designer'), value: 'designer' },
    { label: t('demo-form.role-pm'), value: 'pm' },
    { label: t('demo-form.role-other'), value: 'other' },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', role: '', bio: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(t('demo-form.success', { name: values.name }));
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className='container py-12'>
      <div className='mx-auto max-w-lg'>
        <h1 className='mb-2 font-semibold text-2xl'>{t('demo-form.title')}</h1>
        <p className='mb-8 text-muted-foreground text-sm'>{t('demo-form.subtitle')}</p>

        <FormWrapper form={form} onSubmit={onSubmit} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('demo-form.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('demo-form.name-placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('demo-form.email')}</FormLabel>
                <FormControl>
                  <Input type='email' placeholder={t('demo-form.email-placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('demo-form.role')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('demo-form.role-placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('demo-form.bio')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('demo-form.bio-placeholder')} rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='acceptTerms'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox checked={field.value === true} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>{t('demo-form.accept-terms')}</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isSubmitting} className='w-full'>
            {isSubmitting ? t('demo-form.submitting') : t('demo-form.submit')}
          </Button>
        </FormWrapper>
      </div>
    </div>
  );
}
