import { siteConfig } from '@/config/site';
import { BlogDetailContainer } from '@/modules/blog/containers/blog-detail-container';
import { getAllPosts, getPostBySlug } from '@/modules/blog/lib/posts';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const locales = ['vi', 'en'];
  const slugSets = locales.map((locale) => getAllPosts(locale).map((post) => ({ slug: post.slug, locale })));
  return slugSets.flat();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPostBySlug(slug, locale);

  if (!post) return {};

  const { frontmatter } = post;
  const ogUrl = `${siteConfig.canonicalUrl}/og?title=${encodeURIComponent(frontmatter.title)}&locale=${locale}`;

  return {
    title: `${frontmatter.title} | ${siteConfig.name}`,
    description: frontmatter.excerpt,
    alternates: {
      canonical: `${siteConfig.canonicalUrl}/blog/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      images: [{ url: frontmatter.coverImage || ogUrl, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.date,
    author: { '@type': 'Person', name: siteConfig.name },
    url: `${siteConfig.canonicalUrl}/blog/${slug}`,
    image:
      post.frontmatter.coverImage ||
      `${siteConfig.canonicalUrl}/og?title=${encodeURIComponent(post.frontmatter.title)}`,
    description: post.frontmatter.excerpt,
  };

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogDetailContainer slug={slug} locale={locale} />
    </>
  );
}
