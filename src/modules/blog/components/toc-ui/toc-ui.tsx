'use client';

import { cn } from '@/lib/utils';
import { useTocObserver } from '@/modules/blog/hooks/use-toc-observer';

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

interface TocUIProps {
  items: TocItem[];
}

export function TocUI({ items }: TocUIProps) {
  const ids = items.map((item) => item.id);
  const activeId = useTocObserver(ids);

  if (items.length === 0) return null;

  return (
    <nav className='sticky top-[72px] max-h-[calc(100vh-80px)] overflow-y-auto pb-8'>
      <p className='mb-3.5 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-widest'>Nội dung</p>
      <div className='flex flex-col border-border border-l pl-3.5'>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'block w-full py-1 text-left text-[0.8125rem] leading-snug transition-colors hover:text-foreground',
              item.depth === 3 && 'pl-3.5 text-xs',
              activeId === item.id ? 'font-medium text-blog-ac' : 'text-muted-foreground'
            )}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
