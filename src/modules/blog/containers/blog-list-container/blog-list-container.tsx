import { PostListUI } from '@/modules/blog/components/post-list-ui';
import { getAllPosts } from '@/modules/blog/lib/posts';

interface BlogListContainerProps {
  locale: string;
}

export async function BlogListContainer({ locale }: BlogListContainerProps) {
  const posts = getAllPosts(locale);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.frontmatter.tags))).sort();

  return <PostListUI posts={posts} allTags={allTags} />;
}
