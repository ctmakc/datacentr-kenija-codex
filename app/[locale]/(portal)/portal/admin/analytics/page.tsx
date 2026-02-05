import { redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAdminAnalyticsSnapshot } from "@/lib/admin-analytics";

export default async function AdminAnalyticsPage({ params }: { params: { locale: string } }) {
  if (!isAdminAuthenticated()) {
    redirect(`/${params.locale}/portal/admin/login`);
  }

  const snapshot = await getAdminAnalyticsSnapshot();

  return (
    <PageShell title="Admin: Analytics (MVP)" subtitle="Initial operational metrics for content workflows.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-400">Processed batches</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{snapshot.processedBatches}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-400">Processed pages</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{snapshot.processedPages}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-400">Active RU pages</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{snapshot.activeRuPages}</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-400">Inbox batches</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{snapshot.inboxBatches}</p>
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-600">
        <p>Last processed: {snapshot.lastProcessedAt ?? "n/a"}</p>
      </div>
    </PageShell>
  );
}
