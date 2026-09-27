export const locales = ['ca', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ca';

export const localeNames: Record<Locale, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  ca: 'CA',
  es: 'ES',
  en: 'EN',
};

const dictionaries = {
  ca: () => import('../../messages/ca.json').then((module) => module.default),
  es: () => import('../../messages/es.json').then((module) => module.default),
  en: () => import('../../messages/en.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }
  return dictionaries[defaultLocale]();
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
