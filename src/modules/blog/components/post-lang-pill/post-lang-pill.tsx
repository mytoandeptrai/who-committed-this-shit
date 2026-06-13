'use client';

import { useLocale } from 'next-intl';

interface PostLangPillProps {
  availableLocales: string[];
}

export function PostLangPill({ availableLocales }: PostLangPillProps) {
  const locale = useLocale();

  const toggle = (loc: string) => {
    if (loc === locale) return;
    // biome-ignore lint/suspicious/noDocumentCookie: mirrors what next-intl's syncLocaleCookie does internally
    document.cookie = `NEXT_LOCALE=${loc};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className='ml-auto flex items-center overflow-hidden rounded-[6px] border border-border bg-blog-bg-s'>
      {availableLocales.map((loc, i) => (
        <span key={loc} className='contents'>
          {i > 0 && <span className='pointer-events-none select-none text-[10px] text-blog-br2 leading-none'>|</span>}
          <button
            type='button'
            onClick={() => toggle(loc)}
            className='px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:bg-border'
            style={loc === locale ? { color: 'var(--blog-ac)', fontWeight: 600 } : undefined}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
