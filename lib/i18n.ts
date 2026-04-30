export const locales = ["en", "ru", "zh"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ru: "Russian",
  zh: "Chinese"
};

export function withLocalePath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalized.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${locale}`;
  }

  if (isLocale(parts[0])) {
    parts[0] = locale;
    return `/${parts.join("/")}`;
  }

  return `/${locale}${normalized}`;
}
