import type { Post } from '@/modules/blog/lib/posts';
import Link from 'next/link';

interface PostCardUIProps {
  post: Post;
}

export function PostCardUI({ post }: PostCardUIProps) {
  const { slug, frontmatter, readingTime } = post;

  const date = new Date(frontmatter.date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className='group cursor-pointer'>
      <Link href={`/blog/${slug}`} className='block'>
        <h2
          className='mb-2 font-semibold text-[1.1875rem] text-foreground leading-[1.4] tracking-[-0.02em] transition-colors group-hover:text-blog-ac'
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          {frontmatter.title}
        </h2>

        <div className='mb-3 flex items-center gap-1.5 font-mono text-muted-foreground text-xs'>
          <span>{date}</span>
          <span className='inline-block size-0.5 shrink-0 rounded-full bg-muted-foreground' />
          <span>{readingTime}</span>
        </div>

        {frontmatter.tags.length > 0 && (
          <div className='mb-3 flex flex-wrap gap-1'>
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-blog-tb bg-blog-bg-t px-2 py-0.5 font-mono text-[0.625rem] text-blog-tt tracking-[0.01em]'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {frontmatter.excerpt && (
          <p className='text-[0.9375rem] text-muted-foreground leading-[1.75]'>{frontmatter.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
