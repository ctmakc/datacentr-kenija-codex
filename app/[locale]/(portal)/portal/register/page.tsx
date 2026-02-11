import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PageShell title="Portal Register" subtitle="Registration and verification flow.">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="company" className="mb-1 block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              id="company"
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">
              Access Role
            </label>
            <select
              id="role"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
              defaultValue="customer"
            >
              <option value="customer">Customer</option>
              <option value="partner">Partner</option>
              <option value="investor">Investor</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="button" className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
              Submit Registration
            </button>
          </div>
        </form>
        <p className="mt-4 text-xs text-slate-500">
          Already registered?{" "}
          <Link href={`/${locale}/portal/login`} className="font-semibold text-cyan-700">
            Sign in
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
