import { PageShell } from "@/components/layout/PageShell";

export default function Page() {
  return (
    <PageShell title="CPU Compute" subtitle="General compute, bare metal, edge inference.">
      <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-600">
        <p>
          Content for CPU Compute will live here. This page aggregates its child sections and will be enriched
          with structured content and navigation.
        </p>
      </div>
    </PageShell>
  );
}
