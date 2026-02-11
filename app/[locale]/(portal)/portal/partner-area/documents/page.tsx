import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Partner Documents"
      subtitle="Technical specs and templates."
      summary="Repository of contracts, specifications, and templates needed by technical and operations partners."
      metrics={[
        { label: "Files", value: "48" },
        { label: "Pending Signoff", value: "3" },
        { label: "Last Upload", value: "2h ago" }
      ]}
      primaryActions={[
        { label: "Project Workspace", href: `/${locale}/portal/partner-area/project` },
        { label: "Communication", href: `/${locale}/portal/partner-area/communication` },
        { label: "Admin Content", href: `/${locale}/portal/admin/content` }
      ]}
      checklist={[
        "Verify version tags for all latest files.",
        "Archive outdated drafts.",
        "Share links to active execution teams."
      ]}
    />
  );
}
