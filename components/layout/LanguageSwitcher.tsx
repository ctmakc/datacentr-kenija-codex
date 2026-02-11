"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale, localeLabels, locales, withLocalePath } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const searchParams = useSearchParams();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    const nextPath = withLocalePath(pathname, nextLocale);
    const query = searchParams?.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1">
      <label htmlFor="language-switcher" className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        Lang
      </label>
      <select
        id="language-switcher"
        value={locale}
        onChange={handleChange}
        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-cyan-500"
        aria-label="Select language"
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </div>
  );
}
