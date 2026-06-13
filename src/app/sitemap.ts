import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/modules/blog/lib/posts';
import type { MetadataRoute } from 'next';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.canonicalUrl;
  const locales = ['vi', 'en'];

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/uses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const slugsSeen = new Set<string>();
  const postUrls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      if (!slugsSeen.has(post.slug)) {
        slugsSeen.add(post.slug);
        postUrls.push({
          url: `${base}/blog/${post.slug}`,
          lastModified: new Date(post.frontmatter.date),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  return [...staticUrls, ...postUrls];
}
