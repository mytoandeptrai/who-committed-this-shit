import { siteConfig } from '@/config/site';
import { BlogListContainer } from '@/modules/blog/containers/blog-list-container';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog | ${siteConfig.name}`,
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.canonicalUrl}/blog`,
    },
  };
}

export default async function BlogPage() {
  const locale = await getLocale();

  return (
    <main className='blog-fade-up mx-auto max-w-[680px] px-6 pt-12 pb-20'>
      <div className='mb-10'>
        <h1 className='mb-2 font-bold text-[2.125rem] text-foreground leading-[1.15] tracking-[-0.035em]'>Blog</h1>
        <p className='text-base text-muted-foreground leading-relaxed'>
          Ghi chép về web development, tooling, và những thứ tôi học được trong quá trình làm việc.
        </p>
      </div>
      <BlogListContainer locale={locale} />
    </main>
  );
}
