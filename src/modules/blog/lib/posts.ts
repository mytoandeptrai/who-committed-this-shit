import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  series: string | null;
  coverImage: string;
  draft: boolean;
  excerpt: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export interface PostWithContent extends Post {
  content: string;
}

function parsePost(slug: string, locale: string): Post | null {
  const filePath = path.join(POSTS_DIR, slug, `index.${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      series: data.series ?? null,
      coverImage: data.coverImage ?? '',
      draft: data.draft ?? false,
      excerpt: data.excerpt ?? '',
    },
    readingTime: stats.text,
  };
}

export function getAllPosts(locale: string): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const slugs = fs.readdirSync(POSTS_DIR).filter((name) => {
    return fs.statSync(path.join(POSTS_DIR, name)).isDirectory();
  });

  return slugs
    .map((slug) => parsePost(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getPostBySlug(slug: string, locale: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, slug, `index.${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title ?? '',
      date: data.date ?? '',
      tags: data.tags ?? [],
      series: data.series ?? null,
      coverImage: data.coverImage ?? '',
      draft: data.draft ?? false,
      excerpt: data.excerpt ?? '',
    },
    content,
    readingTime: stats.text,
  };
}

export function getPostSeries(seriesName: string, locale: string): Post[] {
  return getAllPosts(locale).filter((post) => post.frontmatter.series === seriesName);
}

export function getAvailableLocalesForSlug(slug: string): string[] {
  const locales = ['vi', 'en'];
  return locales.filter((locale) => {
    const filePath = path.join(POSTS_DIR, slug, `index.${locale}.mdx`);
    return fs.existsSync(filePath);
  });
}
