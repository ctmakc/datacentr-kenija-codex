import { PageShell } from "@/components/layout/PageShell";

export default function Page() {
  return (
    <PageShell title="GPU Compute" subtitle="Training, inference, rendering, fine-tuning.">
      <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-600">
        <p>
          Content for GPU Compute will live here. This page aggregates its child sections and will be enriched
          with structured content and navigation.
        </p>
      </div>
    </PageShell>
  );
}
