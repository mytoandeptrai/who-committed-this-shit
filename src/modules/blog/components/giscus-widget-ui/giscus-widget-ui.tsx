'use client';

import { useEffect, useRef } from 'react';

interface GiscusWidgetUIProps {
  slug: string;
  locale: string;
}

export function GiscusWidgetUI({ slug, locale }: GiscusWidgetUIProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('iframe')) return;

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

    if (!repo || !repoId || !category || !categoryId) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', locale === 'vi' ? 'vi' : 'en');
    script.setAttribute('data-term', slug);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);
  }, [slug, locale]);

  return <div ref={ref} className='mt-8' />;
}
