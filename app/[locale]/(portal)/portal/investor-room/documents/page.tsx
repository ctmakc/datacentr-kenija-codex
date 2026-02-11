import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Investor Documents"
      subtitle="Pitch decks and data room files."
      summary="Data room access for legal, financial, and execution materials required by current and prospective investors."
      metrics={[
        { label: "Data Room Files", value: "63" },
        { label: "Confidential", value: "18" },
        { label: "Last Sync", value: "Today" }
      ]}
      primaryActions={[
        { label: "Investor Financials", href: `/${locale}/portal/investor-room/financials` },
        { label: "Investor Updates", href: `/${locale}/portal/investor-room/updates` },
        { label: "Communication", href: `/${locale}/portal/investor-room/communication` }
      ]}
      checklist={[
        "Verify all confidential docs have access tags.",
        "Publish revised legal package.",
        "Send changelog to active investor list."
      ]}
    />
  );
}
