import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <PortalWorkspace
      title="Portal"
      subtitle="Role-based dashboards and data rooms."
      summary="Unified workspace for investor, customer, and partner roles. Use quick actions to jump into your role zone and keep status updates visible to all stakeholders."
      metrics={[
        { label: "Active Rooms", value: "3" },
        { label: "Open Requests", value: "12" },
        { label: "Last Sync", value: "Now" }
      ]}
      primaryActions={[
        { label: "Investor Room", href: `/${locale}/portal/investor-room/dashboard` },
        { label: "Customer Dashboard", href: `/${locale}/portal/customer-dashboard/overview` },
        { label: "Partner Area", href: `/${locale}/portal/partner-area/dashboard` }
      ]}
      checklist={[
        "Confirm role-based access for current session.",
        "Review latest content and operational updates.",
        "Escalate blockers through communication channels."
      ]}
    />
  );
}
