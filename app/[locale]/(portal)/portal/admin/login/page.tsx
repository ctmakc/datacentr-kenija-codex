import { redirect } from "next/navigation";
import { clearAdminSession, getAdminTokenConfigured, isAdminAuthenticated, setAdminSession } from "@/lib/admin-auth";
import { PageShell } from "@/components/layout/PageShell";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLoginPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { error?: string };
}) {
  const locale = params.locale;
  const hasError = searchParams?.error === "invalid_token";

  if (isAdminAuthenticated()) {
    redirect(`/${locale}/portal/admin`);
  }

  async function loginAction(formData: FormData) {
    "use server";
    const token = String(formData.get("token") ?? "");
    const expected = process.env.ADMIN_TOKEN ?? "";
    if (!expected || token !== expected) {
      redirect(`/${locale}/portal/admin/login?error=invalid_token`);
    }
    setAdminSession(token);
    redirect(`/${locale}/portal/admin`);
  }

  async function resetAction() {
    "use server";
    clearAdminSession();
    redirect(`/${locale}/portal/admin/login`);
  }

  const configured = getAdminTokenConfigured();

  return (
    <PageShell title="Admin Login" subtitle="Token-based access for admin operations.">
      <div className="mb-4 max-w-2xl">
        <AdminNav locale={locale} />
      </div>
      <div className="max-w-md rounded-lg border border-gray-100 bg-white p-4">
        {hasError && (
          <p className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            Invalid token. Check `ADMIN_TOKEN` and try again.
          </p>
        )}
        {!configured && (
          <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            `ADMIN_TOKEN` is not configured. Set it in environment variables to enable admin access.
          </p>
        )}
        <form action={loginAction} className="space-y-3">
          <label className="block text-sm text-gray-700" htmlFor="token">
            Admin token
          </label>
          <input
            id="token"
            name="token"
            type="password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            placeholder="Enter ADMIN_TOKEN"
          />
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Sign in
          </button>
        </form>
        <form action={resetAction} className="mt-3">
          <button type="submit" className="text-xs text-gray-500 hover:text-gray-700">
            Clear session
          </button>
        </form>
      </div>
    </PageShell>
  );
}
