import { PageShell } from "@/components/layout/PageShell";

export default function Page() {
  return (
    <PageShell title="FAQ" subtitle="General, investors, customers, partners, technical.">
      <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-600">
        <p>
          Content for FAQ will live here. This page aggregates its child sections and will be enriched
          with structured content and navigation.
        </p>
      </div>
    </PageShell>
  );
}
