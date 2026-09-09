import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Customer Support"
      subtitle="Tickets and knowledge base."
      summary="Support operations hub for incidents, requests, and SLA follow-up with direct links to service context."
      metrics={[
        { label: "Open Tickets", value: "2" },
        { label: "Critical", value: "0" },
        { label: "Avg Resolution", value: "7h" }
      ]}
      primaryActions={[
        { label: "Customer Overview", href: `/${locale}/portal/customer-dashboard/overview` },
        { label: "Customer Services", href: `/${locale}/portal/customer-dashboard/services` },
        { label: "Account Settings", href: `/${locale}/portal/customer-dashboard/settings` }
      ]}
      checklist={[
        "Prioritize tickets by severity and SLA.",
        "Attach diagnostics before escalation.",
        "Close resolved tickets with summary notes."
      ]}
    />
  );
}
