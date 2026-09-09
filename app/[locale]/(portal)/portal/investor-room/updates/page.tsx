import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Investor Updates"
      subtitle="Monthly progress reports."
      summary="Single feed for execution updates, risk changes, and achieved milestones shared with the investor room."
      metrics={[
        { label: "Reports", value: "24" },
        { label: "Unreviewed", value: "4" },
        { label: "This Month", value: "3" }
      ]}
      primaryActions={[
        { label: "Investor Dashboard", href: `/${locale}/portal/investor-room/dashboard` },
        { label: "Financials", href: `/${locale}/portal/investor-room/financials` },
        { label: "Communication", href: `/${locale}/portal/investor-room/communication` }
      ]}
      checklist={[
        "Publish this month status deck.",
        "Attach source metrics for KPI deltas.",
        "Notify all investor stakeholders."
      ]}
    />
  );
}
