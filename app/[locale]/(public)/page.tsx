import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <div>
      <section className="bg-gradient-to-br from-white to-gray-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14">
          <div className="inline-flex w-fit items-center rounded-full bg-primary-600/10 px-3 py-1 text-xs font-semibold text-primary-700">
            1MW AI Compute + Dedicated Power Generation
          </div>
          <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">
            Powering Africa&apos;s AI Future
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Kenya AI Compute delivers affordable GPU, CPU, and storage capacity with integrated power generation
            and DePIN-ready infrastructure for global AI workloads.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${params.locale}/investors`}
              className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Explore Investment
            </Link>
            <Link
              href={`/${params.locale}/compute`}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
            >
              Buy Compute
            </Link>
            <Link
              href={`/${params.locale}/partners`}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
            >
              Join Network
            </Link>
          </div>
          <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <p className="text-xs uppercase text-gray-400">Capacity</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">1MW</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <p className="text-xs uppercase text-gray-400">Energy Cost</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">$0.04/kWh</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <p className="text-xs uppercase text-gray-400">Target Uptime</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">99.9%</p>
            </div>
          </div>
        </div>
      </section>

      <PageShell
        title="Why Kenya AI Compute"
        subtitle="Optimized infrastructure for AI workloads with a focus on energy efficiency, scale, and DePIN integrations."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              title: "For Investors",
              copy: "Infrastructure asset with 35-50% EBITDA potential and scalable phases."
            },
            {
              title: "For AI Companies",
              copy: "GPU compute priced up to 40% below market with enterprise SLAs."
            },
            {
              title: "For DePIN Networks",
              copy: "Certified nodes powered by green energy and global connectivity."
            },
            {
              title: "For Partners",
              copy: "Build Africa&apos;s AI infrastructure with local and global stakeholders."
            }
          ].map((card) => (
            <div key={card.title} className="rounded-lg border border-gray-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.copy}</p>
            </div>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
