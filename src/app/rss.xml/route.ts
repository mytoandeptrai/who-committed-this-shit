import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/modules/blog/lib/posts';
import { Feed } from 'feed';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts('vi').slice(0, 20);

  const feed = new Feed({
    title: siteConfig.name || 'Blog',
    description: siteConfig.description,
    id: siteConfig.canonicalUrl,
    link: siteConfig.canonicalUrl,
    language: 'vi',
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteConfig.canonicalUrl}/blog/${post.slug}`,
      link: `${siteConfig.canonicalUrl}/blog/${post.slug}`,
      description: post.frontmatter.excerpt,
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
