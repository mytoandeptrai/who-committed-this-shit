'use client';

import { useCreateExampleMutation, useDeleteExampleMutation, useGetExamplesQuery } from '@/api/_example';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormWrapper } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { EXAMPLE_KEYS } from '@/api/_example';

const createSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(4, 'Description must be at least 4 characters.'),
});

type CreateForm = z.infer<typeof createSchema>;

export default function ClientRequestPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching } = useGetExamplesQuery({ page: 1, limit: 10 });

  const { mutateAsync: createItem, isPending: isCreating } = useCreateExampleMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXAMPLE_KEYS.GET_EXAMPLES] });
      toast.success('Item created!');
      form.reset();
    },
  });

  const { mutateAsync: deleteItem } = useDeleteExampleMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXAMPLE_KEYS.GET_EXAMPLES] });
      toast.success('Item deleted!');
    },
  });

  const form = useForm<CreateForm>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', description: '' },
  });

  const items = data?.data ?? [];

  return (
    <div className='container py-10'>
      <div className='mb-6'>
        <h1 className='mb-1 font-semibold text-2xl'>Client Request</h1>
        <p className='text-muted-foreground text-sm'>
          Data fetched client-side via <code className='rounded bg-muted px-1 py-0.5 text-xs'>useQuery</code> →{' '}
          <code className='rounded bg-muted px-1 py-0.5 text-xs'>requestInternal</code> → BFF{' '}
          <code className='rounded bg-muted px-1 py-0.5 text-xs'>/api/_example</code>
        </p>
      </div>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* List */}
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='font-medium'>Items</h2>
            <Button variant='outline' size='sm' onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>

          {isError && <p className='text-destructive text-sm'>Failed to load items.</p>}

          <div className='space-y-2'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className='h-14 w-full rounded-lg' />)
              : items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between rounded-lg border border-border bg-card p-3'
                  >
                    <div>
                      <p className='font-medium text-sm'>{item.name}</p>
                      <p className='text-muted-foreground text-xs'>{item.description}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>{item.status}</Badge>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-destructive hover:text-destructive'
                        onClick={() => deleteItem({ id: item.id })}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}

            {!isLoading && items.length === 0 && <p className='text-muted-foreground text-sm'>No items found.</p>}
          </div>
        </div>

        {/* Create form */}
        <div>
          <h2 className='mb-4 font-medium'>Create Item</h2>
          <FormWrapper form={form} onSubmit={(values) => createItem(values)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Item name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Item description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isCreating} className='w-full'>
              {isCreating ? 'Creating…' : 'Create'}
            </Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
