import { getExampleDetailRequest, getExamplesRequest } from '@/api/_example';
import { Badge } from '@/components/ui/badge';

export default async function ServerRequestPage() {
  // Both calls run on the server — no useQuery, no loading state, data is in the HTML
  const [listData, detailData] = await Promise.all([
    getExamplesRequest({ page: 1, limit: 10 }),
    getExampleDetailRequest({ id: 1 }),
  ]);

  const items = listData.data ?? [];
  const detail = detailData.data;

  return (
    <div className='container py-10'>
      <div className='mb-6'>
        <h1 className='mb-1 font-semibold text-2xl'>Server Request</h1>
        <p className='text-muted-foreground text-sm'>
          Data fetched server-side via{' '}
          <code className='rounded bg-muted px-1 py-0.5 text-xs'>async Server Component</code> →{' '}
          <code className='rounded bg-muted px-1 py-0.5 text-xs'>request</code> → backend directly. No JS needed to
          display this data.
        </p>
      </div>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* List — fetched with getExamplesRequest */}
        <div>
          <h2 className='mb-4 font-medium'>
            List{' '}
            <span className='font-normal text-muted-foreground text-xs'>
              getExamplesRequest{'({ page: 1, limit: 10 })'}
            </span>
          </h2>

          <div className='space-y-2'>
            {items.length === 0 && <p className='text-muted-foreground text-sm'>No items.</p>}

            {items.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between rounded-lg border border-border bg-card p-3'
              >
                <div>
                  <p className='font-medium text-sm'>{item.name}</p>
                  <p className='text-muted-foreground text-xs'>{item.description}</p>
                </div>
                <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Detail — fetched with getExampleDetailRequest */}
        <div>
          <h2 className='mb-4 font-medium'>
            Detail{' '}
            <span className='font-normal text-muted-foreground text-xs'>getExampleDetailRequest{'({ id: 1 })'}</span>
          </h2>

          <div className='rounded-lg border border-border bg-card p-4'>
            <div className='mb-3 flex items-center justify-between'>
              <p className='font-medium'>{detail.name}</p>
              <Badge variant={detail.status === 'active' ? 'default' : 'secondary'}>{detail.status}</Badge>
            </div>
            <p className='mb-4 text-muted-foreground text-sm'>{detail.description}</p>

            <div className='space-y-1 rounded-md bg-muted p-3 font-mono text-xs'>
              <p>
                <span className='text-muted-foreground'>id: </span>
                {detail.id}
              </p>
              <p>
                <span className='text-muted-foreground'>createdAt: </span>
                {detail.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
