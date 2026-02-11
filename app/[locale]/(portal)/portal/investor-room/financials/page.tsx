import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Investor Financials"
      subtitle="Scenario builder and reports."
      summary="Financial performance workspace for scenario comparisons, cashflow visibility, and benchmark tracking."
      metrics={[
        { label: "Base EBITDA", value: "41%" },
        { label: "Cash Burn", value: "$210k/mo" },
        { label: "Payback", value: "5.8y" }
      ]}
      primaryActions={[
        { label: "Investor Dashboard", href: `/${locale}/portal/investor-room/dashboard` },
        { label: "Documents", href: `/${locale}/portal/investor-room/documents` },
        { label: "Updates", href: `/${locale}/portal/investor-room/updates` }
      ]}
      checklist={[
        "Validate assumptions in base scenario.",
        "Refresh sensitivity table with latest costs.",
        "Export updated snapshot for stakeholders."
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Conservative", "Utilization 45%", "EBITDA 31%", "Payback 7.2y"],
          ["Base Case", "Utilization 55%", "EBITDA 41%", "Payback 5.8y"],
          ["Upside", "Utilization 68%", "EBITDA 49%", "Payback 4.6y"]
        ].map((scenario) => (
          <article key={scenario[0]} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{scenario[0]}</h3>
            <p className="mt-2 text-sm text-slate-700">{scenario[1]}</p>
            <p className="text-sm text-slate-700">{scenario[2]}</p>
            <p className="text-sm text-slate-700">{scenario[3]}</p>
          </article>
        ))}
      </div>
    </PortalWorkspace>
  );
}
