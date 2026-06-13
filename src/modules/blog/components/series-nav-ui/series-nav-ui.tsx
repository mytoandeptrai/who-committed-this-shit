import { cn } from '@/lib/utils';
import type { Post } from '@/modules/blog/lib/posts';
import Link from 'next/link';

interface SeriesNavUIProps {
  seriesPosts: Post[];
  currentSlug: string;
}

export function SeriesNavUI({ seriesPosts, currentSlug }: SeriesNavUIProps) {
  if (seriesPosts.length === 0) return null;

  const seriesName = seriesPosts[0]?.frontmatter.series;

  return (
    <aside className='mb-8 rounded-lg border border-border bg-blog-bg-s px-[1.125rem] py-4'>
      <p className='mb-3 font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.1em]'>
        Series · {seriesName}
      </p>
      <div className='flex flex-col gap-1'>
        {seriesPosts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={cn(
                'flex items-center gap-2.5 rounded-md border border-border px-3 py-[0.4375rem] transition-colors hover:border-blog-ac',
                isCurrent ? 'border-blog-ac bg-blog-ac text-white' : 'bg-background'
              )}
            >
              <span className='shrink-0 font-mono text-[0.625rem] leading-none opacity-55'>{index + 1}</span>
              <span className='text-sm leading-snug'>{post.frontmatter.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
