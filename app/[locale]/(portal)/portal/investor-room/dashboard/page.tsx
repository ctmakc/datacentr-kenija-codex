import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <PortalWorkspace
      title="Investor Dashboard"
      subtitle="Portfolio status and key metrics."
      summary="This room consolidates milestones, capex usage, and risk indicators so investors can evaluate execution velocity and capital efficiency in one place."
      metrics={[
        { label: "Runway", value: "22 months" },
        { label: "Target IRR", value: "31%" },
        { label: "Mile­stones", value: "7 / 9" }
      ]}
      primaryActions={[
        { label: "Financial Model", href: `/${locale}/portal/investor-room/financials` },
        { label: "Data Room", href: `/${locale}/portal/investor-room/documents` },
        { label: "Latest Updates", href: `/${locale}/portal/investor-room/updates` }
      ]}
      checklist={[
        "Review monthly KPI delta versus base-case model.",
        "Validate risk mitigation status for current quarter.",
        "Prepare questions for next governance call."
      ]}
    />
  );
}
