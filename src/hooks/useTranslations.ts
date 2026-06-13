import type { AllTranslationKeys, Namespace, NamespaceKeys, TranslationFunction } from '@/types/translation';
import { useTranslations as useTranslationsNextIntl } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Overload signatures
function useTranslations<NS extends Namespace>(namespace: NS): { t: TranslationFunction<NamespaceKeys<NS>> };
function useTranslations(): { t: TranslationFunction<AllTranslationKeys> };

// Implementation
function useTranslations(namespace?: Namespace) {
  const t = useTranslationsNextIntl(namespace as Namespace | undefined);
  return {
    t: namespace
      ? (t as TranslationFunction<NamespaceKeys<typeof namespace>>)
      : (t as TranslationFunction<AllTranslationKeys>),
  };
}

export default useTranslations;

export const useTranslationsServer = async (namespace?: Namespace) => {
  const t = await getTranslations(namespace as Namespace | undefined);
  return {
    t: namespace
      ? (t as TranslationFunction<NamespaceKeys<typeof namespace>>)
      : (t as TranslationFunction<AllTranslationKeys>),
  };
};
