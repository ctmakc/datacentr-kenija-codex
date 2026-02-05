import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { getHomeContent } from "@/lib/content";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const content = await getHomeContent(params.locale);

  return (
    <div>
      <section className="bg-gradient-to-br from-white to-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14">
          <div className="inline-flex w-fit items-center rounded-full bg-primary-600/10 px-3 py-1 text-xs font-semibold text-primary-700">
            {content.hero.badge}
          </div>
          <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">{content.hero.headline}</h1>
          <p className="max-w-2xl text-lg text-gray-600">{content.hero.subheadline}</p>
          <div className="flex flex-wrap gap-3">
            {content.hero.cta.map((cta) => (
              <Link
                key={cta.label}
                href={`/${params.locale}${cta.href}`}
                className={
                  cta.variant === "primary"
                    ? "rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                    : "rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
            {content.hero.metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-gray-100 bg-white p-4">
                <p className="text-xs uppercase text-gray-400">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageShell title={content.valueProps.title} subtitle={content.valueProps.subtitle}>
        <div className="grid gap-4 md:grid-cols-4">
          {content.valueProps.items.map((card) => (
            <div key={card.title} className="rounded-lg border border-gray-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.copy}</p>
            </div>
          ))}
        </div>
      </PageShell>

      <PageShell title={content.overview.title} subtitle={content.overview.map.note}>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ul className="space-y-3 text-sm text-gray-600">
            {content.overview.bullets.map((bullet) => (
              <li key={bullet} className="rounded-md border border-gray-100 bg-white px-4 py-3">
                {bullet}
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-gray-100 bg-white p-4">
            <p className="text-xs uppercase text-gray-400">Map Focus</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{content.overview.map.label}</p>
          </div>
        </div>
      </PageShell>

      <PageShell title={content.media.title} subtitle="Images and video blocks ready for production assets.">
        <div className="grid gap-4 md:grid-cols-2">
          {content.media.items.map((item, index) => (
            <div key={`${item.src}-${index}`} className="rounded-lg border border-gray-100 bg-white p-4">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                {item.kind === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    src={item.src}
                    poster={item.poster}
                    controls
                    preload="none"
                  />
                ) : (
                  <img className="h-full w-full object-cover" src={item.src} alt={item.alt ?? "Media item"} />
                )}
              </div>
              {item.caption && <p className="mt-3 text-sm text-gray-600">{item.caption}</p>}
            </div>
          ))}
        </div>
      </PageShell>

      <PageShell title={content.networks.title} subtitle={content.networks.subtitle}>
        <div className="flex flex-wrap gap-3">
          {content.networks.items.map((network) => (
            <span key={network.name} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm">
              {network.name}
            </span>
          ))}
        </div>
      </PageShell>

      <PageShell title={content.updates.title} subtitle="Latest milestones and project news.">
        <div className="space-y-3">
          {content.updates.items.map((item) => (
            <Link
              key={item.title}
              href={`/${params.locale}${item.href}`}
              className="flex flex-col rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-gray-700 hover:border-gray-200"
            >
              <span className="text-xs uppercase text-gray-400">{item.date}</span>
              <span className="mt-1 font-semibold text-gray-900">{item.title}</span>
            </Link>
          ))}
        </div>
      </PageShell>

      <PageShell title={content.trust.title} subtitle="Signals of credibility and momentum.">
        <div className="flex flex-wrap gap-3">
          {content.trust.items.map((item) => (
            <span key={item.name} className="rounded-md border border-gray-100 bg-white px-4 py-2 text-sm text-gray-700">
              {item.name}
            </span>
          ))}
        </div>
      </PageShell>

      <PageShell title={content.cta.title} subtitle={content.cta.copy}>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${params.locale}${content.cta.primary.href}`}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            {content.cta.primary.label}
          </Link>
          {content.cta.secondary && (
            <Link
              href={`/${params.locale}${content.cta.secondary.href}`}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
            >
              {content.cta.secondary.label}
            </Link>
          )}
        </div>
      </PageShell>
    </div>
  );
}
