import Fuse from 'fuse.js';
import type { Post } from './posts';

export function buildSearchIndex(posts: Post[]) {
  return new Fuse(posts, {
    keys: ['frontmatter.title', 'frontmatter.tags', 'frontmatter.excerpt'],
    threshold: 0.4,
    includeScore: true,
  });
}
