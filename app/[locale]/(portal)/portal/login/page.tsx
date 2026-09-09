import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PageShell title="Portal Login" subtitle="Email, password, and magic link login.">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
            />
          </div>
          <button type="button" className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
            Sign In
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Send Magic Link
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-500">
          Need an account?{" "}
          <Link href={`/${locale}/portal/register`} className="font-semibold text-cyan-700">
            Create one
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
