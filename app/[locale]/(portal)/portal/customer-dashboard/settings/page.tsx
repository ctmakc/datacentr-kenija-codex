import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Customer Settings"
      subtitle="Account and API keys."
      summary="Security and account controls for users, roles, API keys, and notification settings."
      metrics={[
        { label: "Team Members", value: "11" },
        { label: "Active API Keys", value: "6" },
        { label: "MFA Coverage", value: "100%" }
      ]}
      primaryActions={[
        { label: "Customer Overview", href: `/${locale}/portal/customer-dashboard/overview` },
        { label: "Services", href: `/${locale}/portal/customer-dashboard/services` },
        { label: "Billing", href: `/${locale}/portal/customer-dashboard/billing` }
      ]}
      checklist={[
        "Rotate API keys older than 90 days.",
        "Review role access for all users.",
        "Confirm alert channels and escalation matrix."
      ]}
    />
  );
}
