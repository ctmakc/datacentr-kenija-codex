import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Partner Project"
      subtitle="Timeline and milestones."
      summary="Execution board for implementation milestones and partner-owned tasks across deployment phases."
      metrics={[
        { label: "Milestones", value: "14" },
        { label: "At Risk", value: "2" },
        { label: "Updated", value: "Today" }
      ]}
      primaryActions={[
        { label: "Partner Dashboard", href: `/${locale}/portal/partner-area/dashboard` },
        { label: "Partner Documents", href: `/${locale}/portal/partner-area/documents` },
        { label: "Partner Communication", href: `/${locale}/portal/partner-area/communication` }
      ]}
      checklist={[
        "Validate critical-path dependencies.",
        "Confirm delivery dates and owners.",
        "Escalate blockers to operations lead."
      ]}
    >
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Milestone Tracker</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-2">Milestone</th>
                <th className="pb-2">Owner</th>
                <th className="pb-2">Due</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ["Power subsystem handoff", "Energy Partner", "2026-03-04", "In Progress"],
                ["GPU rack acceptance", "Technical Partner", "2026-03-09", "Planned"],
                ["NOC runbook validation", "Operations Partner", "2026-03-12", "Blocked"],
                ["Phase-1 readiness review", "PMO", "2026-03-16", "Planned"]
              ].map((row) => (
                <tr key={row[0]} className="border-t border-slate-100">
                  {row.map((cell) => (
                    <td key={cell} className="py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalWorkspace>
  );
}
