import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { getStructuredPageContent } from "@/lib/page-content";

type StructuredPublicPageProps = {
  locale: string;
  pagePath: string;
};

function withLocale(locale: string, href: string) {
  if (!href.startsWith("/")) {
    return `/${locale}/${href}`;
  }
  return `/${locale}${href}`;
}

export async function StructuredPublicPage({ locale, pagePath }: StructuredPublicPageProps) {
  const page = await getStructuredPageContent(locale, pagePath);

  return (
    <div className="space-y-0">
      <section className="bg-gradient-to-br from-white to-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10">
          <span className="inline-flex w-fit rounded-full bg-primary-600/10 px-3 py-1 text-xs font-semibold text-primary-700">
            {page.hero.badge}
          </span>
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">{page.hero.headline}</h1>
          <p className="max-w-3xl text-base text-gray-600">{page.hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            {page.hero.cta.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={withLocale(locale, item.href)}
                className={
                  item.variant === "secondary" || item.variant === "ghost"
                    ? "rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
                    : "rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageShell title={page.meta.title} subtitle={page.meta.description}>
        <div className="space-y-5">
          {page.sections.map((section, index) => (
            <div key={`${section.type}-${index}`} className="rounded-lg border border-gray-100 bg-white p-4">
              <p className="text-xs uppercase text-gray-400">{section.type}</p>
              {section.title && <h2 className="mt-1 text-lg font-semibold text-gray-900">{section.title}</h2>}
              {section.body && <p className="mt-2 text-sm text-gray-700">{section.body}</p>}

              {Array.isArray(section.items) && section.items.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {section.items.map((item, itemIndex) => {
                    const kind = String(item.kind ?? "");
                    if (kind === "image" || kind === "video") {
                      return (
                        <div key={itemIndex} className="rounded-md border border-gray-100 p-3">
                          <p className="text-xs text-gray-500">{kind.toUpperCase()}</p>
                          <p className="text-sm text-gray-700">{String(item.caption ?? item.alt ?? item.src ?? "")}</p>
                        </div>
                      );
                    }
                    if ("label" in item && "value" in item) {
                      return (
                        <div key={itemIndex} className="rounded-md border border-gray-100 p-3 text-sm text-gray-700">
                          <span className="font-semibold text-gray-900">{String(item.label)}:</span> {String(item.value)}
                        </div>
                      );
                    }
                    if ("name" in item) {
                      return (
                        <div key={itemIndex} className="rounded-md border border-gray-100 p-3 text-sm text-gray-700">
                          {String(item.name)}
                        </div>
                      );
                    }
                    return (
                      <div key={itemIndex} className="rounded-md border border-gray-100 p-3 text-sm text-gray-700">
                        {JSON.stringify(item)}
                      </div>
                    );
                  })}
                </div>
              )}

              {section.type === "cta" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {section.primary?.href && (
                    <Link
                      href={withLocale(locale, section.primary.href)}
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                    >
                      {section.primary.label}
                    </Link>
                  )}
                  {section.secondary?.href && (
                    <Link
                      href={withLocale(locale, section.secondary.href)}
                      className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
                    >
                      {section.secondary.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
