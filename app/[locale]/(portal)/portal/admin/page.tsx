import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { AdminNav } from "@/components/admin/AdminNav";
import { clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  if (!isAdminAuthenticated()) {
    redirect(`/${locale}/portal/admin/login`);
  }

  async function logoutAction() {
    "use server";
    clearAdminSession();
    redirect(`/${locale}/portal/admin/login`);
  }

  return (
    <PageShell title="Admin" subtitle="Operations, content workflows, and system settings.">
      <AdminNav locale={locale} />
      <form action={logoutAction}>
        <button type="submit" className="mb-4 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:border-gray-300">
          Sign out
        </button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href={`/${locale}/portal/admin/content`}
          className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-700 hover:border-gray-200"
        >
          <p className="text-sm font-semibold text-gray-900">Content Operations</p>
          <p className="mt-2 text-sm text-gray-600">Ingest batches, validate JSON, and edit pages.</p>
        </Link>
        <div className="rounded-lg border border-gray-100 bg-white p-4 text-sm text-gray-600">
          <p className="text-sm font-semibold text-gray-900">Analytics & Users</p>
          <p className="mt-2 text-sm text-gray-600">MVP analytics snapshot is available now. User analytics is next.</p>
          <Link href={`/${locale}/portal/admin/analytics`} className="mt-3 inline-block text-sm text-primary-700 hover:text-primary-800">
            Open Analytics
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
