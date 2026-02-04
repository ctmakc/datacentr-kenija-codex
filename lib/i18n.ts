export const locales = ["en", "ru", "zh"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  zh: "中文"
};
