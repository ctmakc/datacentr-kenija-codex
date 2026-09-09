import Link from "next/link";
import { getRelatedPagePaths, getStructuredPageContent } from "@/lib/page-content";

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

function toTitle(pathname: string) {
  return pathname
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " "))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" / ");
}

function buildBreadcrumbs(pagePath: string) {
  const segments = pagePath.split("/").filter(Boolean);
  const breadcrumbs: Array<{ href: string; label: string }> = [{ href: "/", label: "Home" }];
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    breadcrumbs.push({
      href: current,
      label: segment.replace(/-/g, " ").replace(/^\w/, (match) => match.toUpperCase())
    });
  }
  return breadcrumbs;
}

function renderItem(item: Record<string, unknown> | string, index: number, locale: string) {
  if (typeof item === "string") {
    return (
      <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        {item}
      </div>
    );
  }

  if ("question" in item && "answer" in item) {
    return (
      <details key={index} className="rounded-lg border border-slate-200 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-900">{String(item.question)}</summary>
        <p className="mt-2 text-sm text-slate-600">{String(item.answer)}</p>
      </details>
    );
  }

  if ("label" in item && "value" in item) {
    return (
      <div key={index} className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{String(item.label)}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{String(item.value)}</p>
      </div>
    );
  }

  if ("title" in item && ("copy" in item || "body" in item)) {
    const href = "href" in item ? String(item.href ?? "") : "";
    return (
      <div key={index} className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="text-base font-semibold text-slate-900">{String(item.title)}</h4>
        <p className="mt-2 text-sm text-slate-600">{String(item.copy ?? item.body)}</p>
        {href.startsWith("/") && (
          <Link href={withLocale(locale, href)} className="mt-3 inline-block text-xs font-semibold text-cyan-700 hover:text-cyan-800">
            Open page
          </Link>
        )}
      </div>
    );
  }

  if ("name" in item) {
    return (
      <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        {String(item.name)}
      </div>
    );
  }

  return (
    <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-500">
      {JSON.stringify(item)}
    </div>
  );
}

export async function StructuredPublicPage({ locale, pagePath }: StructuredPublicPageProps) {
  const [page, related] = await Promise.all([
    getStructuredPageContent(locale, pagePath),
    getRelatedPagePaths(locale, pagePath, 10)
  ]);
  const breadcrumbs = buildBreadcrumbs(page.path);
  const titledSections = page.sections
    .map((section, index) => ({
      id: `section-${index + 1}`,
      title: section.title?.trim() || section.type
    }))
    .filter((section) => section.title.length > 0);

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.25),_transparent_40%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:py-16">
          <span className="inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
            {page.hero.badge}
          </span>
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">{page.hero.headline}</h1>
          <p className="max-w-3xl text-base text-slate-200 md:text-lg">{page.hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            {page.hero.cta.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={withLocale(locale, item.href)}
                className={
                  item.variant === "secondary" || item.variant === "ghost"
                    ? "rounded-md border border-slate-300/40 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700/40"
                    : "rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="inline-flex items-center gap-2">
                {index > 0 && <span className="text-slate-500">/</span>}
                <Link href={withLocale(locale, crumb.href)} className="hover:text-white">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <header className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-2xl font-semibold text-slate-900">{page.meta.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{page.meta.description}</p>
          </header>

          {page.sections.map((section, index) => (
            <article id={`section-${index + 1}`} key={`${section.type}-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">{section.type}</p>
              {section.title && <h3 className="mt-1 text-xl font-semibold text-slate-900">{section.title}</h3>}
              {section.body && <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{section.body}</p>}

              {section.type === "bullets" && Array.isArray(section.items) && (
                <ul className="mt-4 grid gap-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {typeof item === "string" ? item : JSON.stringify(item)}
                    </li>
                  ))}
                </ul>
              )}

              {section.type === "stats" && Array.isArray(section.items) && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {section.items.map((item, itemIndex) => renderItem(item, itemIndex, locale))}
                </div>
              )}

              {section.type === "media" && Array.isArray(section.items) && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {section.items.map((item, itemIndex) => {
                    if (typeof item === "string") {
                      return (
                        <div key={itemIndex} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                          {item}
                        </div>
                      );
                    }

                    const kind = String(item.kind ?? "");
                    const src = String(item.src ?? "");
                    const caption = String(item.caption ?? item.alt ?? "");

                    return (
                      <div key={itemIndex} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <div className="aspect-video bg-slate-900/80">
                          {kind === "video" ? (
                            <video className="h-full w-full object-cover" src={src} poster={String(item.poster ?? "")} controls preload="none" />
                          ) : (
                            <img className="h-full w-full object-cover" src={src} alt={String(item.alt ?? "Media")} />
                          )}
                        </div>
                        {caption && <p className="px-3 py-2 text-sm text-slate-600">{caption}</p>}
                      </div>
                    );
                  })}
                </div>
              )}

              {section.type !== "bullets" && section.type !== "stats" && section.type !== "media" && Array.isArray(section.items) && section.items.length > 0 && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">{section.items.map((item, itemIndex) => renderItem(item, itemIndex, locale))}</div>
              )}

              {section.type === "cta" && (
                <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                  {section.copy && <p className="text-sm text-slate-700">{section.copy}</p>}
                  <div className="mt-3 flex flex-wrap gap-3">
                  {section.primary?.href && (
                    <Link
                      href={withLocale(locale, section.primary.href)}
                      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      {section.primary.label}
                    </Link>
                  )}
                  {section.secondary?.href && (
                    <Link
                      href={withLocale(locale, section.secondary.href)}
                      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                    >
                      {section.secondary.label}
                    </Link>
                  )}
                </div>
                </div>
              )}
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          {titledSections.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">On this page</h4>
              <div className="mt-3 flex flex-col gap-2">
                {titledSections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100">
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quick actions</h4>
            <div className="mt-3 flex flex-col gap-2">
              {page.hero.cta.map((item) => (
                <Link
                  key={`${item.href}-${item.label}-aside`}
                  href={withLocale(locale, item.href)}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Subsections</h4>
              <div className="mt-3 flex flex-col gap-2">
                {related.map((item) => (
                  <Link key={item} href={withLocale(locale, item)} className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100">
                    {toTitle(item)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
