import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <PortalWorkspace
      title="Customer Overview"
      subtitle="Services and usage metrics."
      summary="Operational cockpit for active compute tenants. Monitor service health, billing state, and support progress from a single customer-facing control panel."
      metrics={[
        { label: "Active Services", value: "6" },
        { label: "Uptime (30d)", value: "99.96%" },
        { label: "Open Tickets", value: "2" }
      ]}
      primaryActions={[
        { label: "Services", href: `/${locale}/portal/customer-dashboard/services` },
        { label: "Billing", href: `/${locale}/portal/customer-dashboard/billing` },
        { label: "Support", href: `/${locale}/portal/customer-dashboard/support` }
      ]}
      checklist={[
        "Check service utilization against reserved capacity.",
        "Review latest invoice and payment status.",
        "Verify all support tickets have owners and ETAs."
      ]}
    />
  );
}
