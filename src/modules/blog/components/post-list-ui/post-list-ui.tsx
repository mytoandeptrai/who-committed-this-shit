'use client';

import { useBlogSearch } from '@/modules/blog/hooks/use-blog-search';
import type { Post } from '@/modules/blog/lib/posts';
import { useState } from 'react';
import { PostCardUI } from '../post-card-ui';

const SearchIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='14'
    stroke='currentColor'
    strokeLinecap='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='14'
  >
    <circle cx='11' cy='11' r='8' />
    <line x1='21' x2='16.65' y1='21' y2='16.65' />
  </svg>
);

interface PostListUIProps {
  posts: Post[];
  allTags: string[];
}

export function PostListUI({ posts, allTags }: PostListUIProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const searched = useBlogSearch(posts, query);
  const filtered = activeTag ? searched.filter((p) => p.frontmatter.tags.includes(activeTag)) : searched;

  return (
    <div>
      <div className='relative mb-[1.375rem]'>
        <span className='-translate-y-1/2 pointer-events-none absolute top-1/2 left-[0.875rem] flex text-muted-foreground'>
          <SearchIcon />
        </span>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Tìm bài viết…'
          className='w-full rounded-lg border border-border bg-blog-bg-s px-[0.875rem] py-[0.625rem] pl-10 text-[0.9375rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blog-ac focus:ring-2 focus:ring-[var(--blog-ac-ring)]'
        />
      </div>

      {allTags.length > 0 && (
        <div className='mb-11 flex flex-wrap gap-1.5'>
          {allTags.map((tag) => (
            <button
              key={tag}
              type='button'
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className='rounded-full border font-mono text-[0.6875rem] tracking-[0.01em] transition-all'
              style={
                activeTag === tag
                  ? {
                      background: 'var(--blog-ac)',
                      color: '#fff',
                      borderColor: 'var(--blog-ac)',
                      padding: '0.25rem 0.625rem',
                    }
                  : {
                      background: 'var(--blog-bg-t)',
                      color: 'var(--blog-tt)',
                      borderColor: 'var(--blog-tb)',
                      padding: '0.25rem 0.625rem',
                    }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className='py-16 text-center text-muted-foreground'>
          <svg
            aria-hidden='true'
            className='mx-auto mb-4 block opacity-40'
            fill='none'
            height='28'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            width='28'
          >
            <circle cx='11' cy='11' r='8' />
            <line x1='21' x2='16.65' y1='21' y2='16.65' />
          </svg>
          <p className='mb-1 font-medium text-[0.9375rem] text-foreground'>Không tìm thấy bài viết</p>
          <p className='text-sm'>Thử từ khóa khác hoặc xóa tag filter.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-14'>
          {filtered.map((post) => (
            <PostCardUI key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
