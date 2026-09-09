import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Customer Services"
      subtitle="Resource management."
      summary="Service inventory and consumption view for compute, storage, and network allocations."
      metrics={[
        { label: "GPU Nodes", value: "24" },
        { label: "Storage Used", value: "61%" },
        { label: "Network Util", value: "48%" }
      ]}
      primaryActions={[
        { label: "Customer Overview", href: `/${locale}/portal/customer-dashboard/overview` },
        { label: "Billing", href: `/${locale}/portal/customer-dashboard/billing` },
        { label: "Support", href: `/${locale}/portal/customer-dashboard/support` }
      ]}
      checklist={[
        "Review utilization by service pool.",
        "Scale resources for next workload window.",
        "Validate SLA alignment after changes."
      ]}
    >
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Service Capacity</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-2">Service</th>
                <th className="pb-2">Allocated</th>
                <th className="pb-2">Used</th>
                <th className="pb-2">Headroom</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ["GPU Cluster A", "12 nodes", "9 nodes", "3 nodes", "Healthy"],
                ["CPU Pool", "320 vCPU", "248 vCPU", "72 vCPU", "Healthy"],
                ["Object Storage", "250 TB", "153 TB", "97 TB", "Watch"],
                ["Bandwidth", "20 Gbps", "9.6 Gbps", "10.4 Gbps", "Healthy"]
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
