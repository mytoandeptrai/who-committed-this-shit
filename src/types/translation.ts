import enCommon from '@/../public/locales/en/common.json' with { type: 'json' };

export type DotPrefix<T extends string, U> = U extends string ? `${T}.${U}` : never;

export type TranslationKeys<T> = {
  [K in keyof T & string]: T[K] extends object ? DotPrefix<K, TranslationKeys<T[K]>> | K : K;
}[keyof T & string];

// The whole common.json is exposed under the 'common' namespace.
// Keys are accessed as dot-notation paths through the JSON, e.g. t('common.back'), t('demo-form.title').
export type CommonTranslationKey = TranslationKeys<typeof enCommon>;

export type Namespace = 'common';

export type NamespaceKeys<T extends Namespace> = T extends 'common' ? CommonTranslationKey : never;

export type AllTranslationKeys = DotPrefix<'common', CommonTranslationKey>;

export type TranslationParams = Record<string, string | number | undefined>;

export type TranslationFunction<Keys extends string = AllTranslationKeys> = <T extends Keys>(
  key: T,
  params?: TranslationParams
) => string;
