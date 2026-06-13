import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const common = await import(`../../public/locales/${locale}/common.json`).then((m) => m.default);

  return {
    locale,
    messages: { common },
  };
});
