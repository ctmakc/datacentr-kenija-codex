import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Customer Billing"
      subtitle="Invoices and payment methods."
      summary="Billing center for invoice tracking, payment method management, and cost forecasting."
      metrics={[
        { label: "Outstanding", value: "$48,200" },
        { label: "Due in 7d", value: "2 invoices" },
        { label: "Billing Cycle", value: "Monthly" }
      ]}
      primaryActions={[
        { label: "Customer Overview", href: `/${locale}/portal/customer-dashboard/overview` },
        { label: "Customer Services", href: `/${locale}/portal/customer-dashboard/services` },
        { label: "Customer Support", href: `/${locale}/portal/customer-dashboard/support` }
      ]}
      checklist={[
        "Review new invoice lines and tax fields.",
        "Confirm payment method validity.",
        "Export billing report for accounting."
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Recent Invoices</h3>
          <div className="mt-3 space-y-2 text-sm">
            {[
              ["INV-2026-021", "$18,400", "Due in 2 days"],
              ["INV-2026-020", "$16,900", "Due in 6 days"],
              ["INV-2026-019", "$14,100", "Paid"]
            ].map((row) => (
              <div key={row[0]} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                <p className="font-semibold text-slate-900">{row[0]}</p>
                <p>{row[1]}</p>
                <p className="text-xs text-slate-500">{row[2]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Payment Methods</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
              <p className="font-semibold text-slate-900">Corporate Wire</p>
              <p>Primary settlement method for monthly invoices</p>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
              <p className="font-semibold text-slate-900">Backup Card</p>
              <p>Used for small overage charges and one-off requests</p>
            </div>
          </div>
        </div>
      </div>
    </PortalWorkspace>
  );
}
