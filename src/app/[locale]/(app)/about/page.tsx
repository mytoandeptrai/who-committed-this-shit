import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About | ${siteConfig.name}`,
    alternates: { canonical: `${siteConfig.canonicalUrl}/about` },
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const filePath = path.join(process.cwd(), 'content/pages', `about.${locale}.mdx`);

  let content = '';
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    content = parsed.content;
  }

  return (
    <div className='container py-12'>
      <article className='prose prose-neutral dark:prose-invert mx-auto max-w-2xl'>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
