'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const LOCALE_LABELS: Record<string, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  vi: { label: 'Tiếng Việt', flag: '🇻🇳' },
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const current = LOCALE_LABELS[locale];

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='gap-1.5 px-2'>
          <span>{current?.flag}</span>
          <span className='hidden font-medium text-xs uppercase sm:inline'>{locale}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {routing.locales.map((loc) => {
          const item = LOCALE_LABELS[loc];
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleSwitch(loc)}
              className='gap-2'
              data-active={loc === locale}
            >
              <span>{item?.flag}</span>
              <span className='text-sm'>{item?.label}</span>
              {loc === locale && <span className='ml-auto text-muted-foreground text-xs'>✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
