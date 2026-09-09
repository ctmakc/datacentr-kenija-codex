import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Investor Communication"
      subtitle="Message center and Q&A."
      summary="Governance and investor Q&A stream with responses, due dates, and accountability ownership."
      metrics={[
        { label: "Open Questions", value: "6" },
        { label: "Due Today", value: "2" },
        { label: "Avg Reply", value: "11h" }
      ]}
      primaryActions={[
        { label: "Investor Dashboard", href: `/${locale}/portal/investor-room/dashboard` },
        { label: "Investor Updates", href: `/${locale}/portal/investor-room/updates` },
        { label: "Investor Documents", href: `/${locale}/portal/investor-room/documents` }
      ]}
      checklist={[
        "Close all overdue investor questions.",
        "Update governance summary note.",
        "Assign owners for new requests."
      ]}
    />
  );
}
