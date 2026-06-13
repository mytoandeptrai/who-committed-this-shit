'use client';

import { useMemo } from 'react';
import { buildSearchIndex } from '../lib/search-index';
import type { Post } from '../lib/posts';

export function useBlogSearch(posts: Post[], query: string): Post[] {
  const fuse = useMemo(() => buildSearchIndex(posts), [posts]);

  return useMemo(() => {
    if (!query.trim()) return posts;
    return fuse.search(query).map((result) => result.item);
  }, [fuse, posts, query]);
}
