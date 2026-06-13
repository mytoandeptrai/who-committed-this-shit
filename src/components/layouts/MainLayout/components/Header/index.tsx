'use client';

import { ROUTES } from '@/utils/routes';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MoonIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='15'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='15'
  >
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </svg>
);

const SunIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='15'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='15'
  >
    <circle cx='12' cy='12' r='5' />
    <line x1='12' x2='12' y1='1' y2='3' />
    <line x1='12' x2='12' y1='21' y2='23' />
    <line x1='4.22' x2='5.64' y1='4.22' y2='5.64' />
    <line x1='18.36' x2='19.78' y1='18.36' y2='19.78' />
    <line x1='1' x2='3' y1='12' y2='12' />
    <line x1='21' x2='23' y1='12' y2='12' />
    <line x1='4.22' x2='5.64' y1='19.78' y2='18.36' />
    <line x1='18.36' x2='19.78' y1='5.64' y2='4.22' />
  </svg>
);

const MenuIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='15'
    stroke='currentColor'
    strokeLinecap='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='15'
  >
    <line x1='3' x2='21' y1='6' y2='6' />
    <line x1='3' x2='21' y1='12' y2='12' />
    <line x1='3' x2='21' y1='18' y2='18' />
  </svg>
);

const CloseIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    height='13'
    stroke='currentColor'
    strokeLinecap='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='13'
  >
    <line x1='18' x2='6' y1='6' y2='18' />
    <line x1='6' x2='18' y1='6' y2='18' />
  </svg>
);

const nav_links = [
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Uses', href: ROUTES.USES },
];

function LangPill() {
  const locale = useLocale();

  const toggle = (loc: string) => {
    if (loc === locale) return;
    // With localePrefix:'never' the URL never changes after the redirect,
    // so Next.js router cache would serve stale RSC. Set cookie directly
    // and hard-reload so the middleware picks it up on the next request.
    // biome-ignore lint/suspicious/noDocumentCookie: mirrors what next-intl's syncLocaleCookie does internally
    document.cookie = `NEXT_LOCALE=${loc};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className='flex items-center overflow-hidden rounded-[6px] border border-border bg-blog-bg-s'>
      {(['vi', 'en'] as const).map((loc, i) => (
        <span key={loc} className='contents'>
          {i > 0 && <span className='pointer-events-none select-none text-[11px] text-blog-br2 leading-none'>|</span>}
          <button
            type='button'
            onClick={() => toggle(loc)}
            className='px-[9px] py-[5px] font-mono text-[11px] text-muted-foreground transition-colors hover:bg-border'
            style={locale === loc ? { color: 'var(--blog-ac)', fontWeight: 600 } : undefined}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function ThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type='button'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='flex items-center justify-center rounded-[6px] border border-border p-[5px] text-muted-foreground transition-colors hover:bg-blog-bg-s hover:text-foreground'
      aria-label='Toggle theme'
    >
      {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();

  const isActive = (href: string) => currentPath === href || (href !== '/' && currentPath.startsWith(href));

  return (
    <>
      <header
        className='sticky top-0 z-40 border-border border-b'
        style={{ background: 'var(--blog-nav)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className='mx-auto flex h-14 max-w-[960px] items-center gap-3 px-6'>
          <Link
            href={ROUTES.BLOG}
            className='shrink-0 font-medium font-mono text-foreground text-sm tracking-tight transition-colors hover:text-blog-ac'
          >
            whocommitedthisshit
          </Link>

          <nav className='ml-6 hidden items-center gap-0.5 md:flex'>
            {nav_links.map((nav) => (
              <Link
                key={nav.label}
                href={nav.href}
                className='rounded-[5px] px-2.5 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-blog-bg-s'
                style={isActive(nav.href) ? { color: 'var(--foreground)', fontWeight: 600 } : undefined}
              >
                {nav.label}
              </Link>
            ))}
          </nav>

          <div className='ml-auto flex items-center gap-2'>
            <LangPill />
            <ThemeBtn />
            <button
              type='button'
              className='flex items-center justify-center rounded-[6px] border border-border p-[5px] text-muted-foreground md:hidden'
              onClick={() => setMobileOpen(true)}
              aria-label='Open menu'
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className='fixed inset-0 z-48 bg-black/45'
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
            role='button'
            tabIndex={-1}
            aria-label='Close menu'
          />
          <div className='fixed top-0 right-0 bottom-0 z-49 flex w-[272px] flex-col border-border border-l bg-background p-5'>
            <div className='mb-6 flex items-center justify-between'>
              <span className='font-mono text-[13px] text-foreground'>Menu</span>
              <button
                type='button'
                onClick={() => setMobileOpen(false)}
                className='flex items-center justify-center rounded-[6px] border border-border p-[5px] text-muted-foreground hover:bg-blog-bg-s'
                aria-label='Close menu'
              >
                <CloseIcon />
              </button>
            </div>
            <div className='flex flex-col gap-1'>
              {nav_links.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.href}
                  onClick={() => setMobileOpen(false)}
                  className='rounded-md px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-blog-bg-s hover:text-foreground'
                >
                  {nav.label}
                </Link>
              ))}
            </div>
            <div className='mt-auto flex items-center gap-2 border-border border-t pt-4'>
              <span className='text-muted-foreground text-xs'>Language:</span>
              <LangPill />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
