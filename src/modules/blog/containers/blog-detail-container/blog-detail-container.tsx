import { GiscusWidgetUI } from '@/modules/blog/components/giscus-widget-ui';
import { PostLangPill } from '@/modules/blog/components/post-lang-pill/post-lang-pill';
import { SeriesNavUI } from '@/modules/blog/components/series-nav-ui';
import { TocUI } from '@/modules/blog/components/toc-ui';
import type { TocItem } from '@/modules/blog/components/toc-ui';
import { getAvailableLocalesForSlug, getPostBySlug, getPostSeries } from '@/modules/blog/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface BlogDetailContainerProps {
  slug: string;
  locale: string;
}

function extractToc(content: string): TocItem[] {
  const matches = [...content.matchAll(/^(#{2,4})\s+(.+)$/gm)];
  return matches.map((match) => {
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    return { id, text, depth };
  });
}

const BackArrow = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='12'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='12'
  >
    <line x1='19' x2='5' y1='12' y2='12' />
    <polyline points='12 19 5 12 12 5' />
  </svg>
);

export async function BlogDetailContainer({ slug, locale }: BlogDetailContainerProps) {
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const tocItems = extractToc(content);
  const seriesPosts = frontmatter.series ? getPostSeries(frontmatter.series, locale) : [];
  const availableLocales = getAvailableLocalesForSlug(slug);

  const date = new Date(frontmatter.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='blog-fade-up mx-auto max-w-[960px] px-6 pb-20'>
      {/* Post header */}
      <div className='mb-9 pt-10'>
        {/* Breadcrumb + tags row */}
        <div className='mb-5 flex flex-wrap items-center gap-2.5'>
          <Link
            href='/blog'
            className='flex items-center gap-1 text-[0.8125rem] text-muted-foreground transition-colors hover:text-blog-ac'
          >
            <BackArrow />
            <span>Blog</span>
          </Link>
          <span className='text-blog-br2 text-xs'>/</span>
          <div className='flex flex-wrap gap-1'>
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-blog-tb bg-blog-bg-t px-2 py-0.5 font-mono text-[0.625rem] text-blog-tt tracking-[0.01em]'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Cover image */}
        {frontmatter.coverImage ? (
          <div className='relative mb-7 aspect-video w-full overflow-hidden rounded-lg'>
            {/* biome-ignore lint/performance/noImgElement: cover images are from content */}
            <img src={frontmatter.coverImage} alt={frontmatter.title} className='h-full w-full object-cover' />
          </div>
        ) : (
          <div
            className='mb-7 flex aspect-video w-full items-center justify-center rounded-lg'
            style={{
              background: 'var(--blog-bg-s)',
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          >
            <span className='font-mono text-[0.625rem] text-muted-foreground uppercase tracking-[0.1em]'>
              cover image
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className='mb-4 font-bold text-[2rem] text-foreground leading-[1.2] tracking-[-0.035em]'
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          {frontmatter.title}
        </h1>

        {/* Meta row */}
        <div className='flex flex-wrap items-center gap-3.5'>
          <div className='flex items-center gap-1.5 font-mono text-muted-foreground text-xs'>
            <span>{date}</span>
            <span className='inline-block size-0.5 shrink-0 rounded-full bg-muted-foreground' />
            <span>{readingTime}</span>
          </div>

          {availableLocales.length > 1 && <PostLangPill availableLocales={availableLocales} />}
        </div>
      </div>

      {/* 2-col grid: content + TOC */}
      <div className='grid gap-14 lg:grid-cols-[1fr_220px]'>
        {/* Left: series box + prose */}
        <div className='min-w-0'>
          {seriesPosts.length > 0 && <SeriesNavUI seriesPosts={seriesPosts} currentSlug={slug} />}

          <div className='blog-prose'>
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: 'github-dark', light: 'github-light' },
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          <GiscusWidgetUI slug={slug} locale={locale} />
        </div>

        {/* Right: TOC */}
        {tocItems.length > 0 && (
          <aside className='hidden lg:block'>
            <TocUI items={tocItems} />
          </aside>
        )}
      </div>
    </div>
  );
}
