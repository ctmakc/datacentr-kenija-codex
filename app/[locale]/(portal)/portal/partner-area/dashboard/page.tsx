import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  return (
    <PortalWorkspace
      title="Partner Dashboard"
      subtitle="Partnership status and action items."
      summary="Central workspace for technical, operations, and supply partners. Track deliverables, submission status, and communication flow across implementation phases."
      metrics={[
        { label: "Partner Tasks", value: "18" },
        { label: "Due This Week", value: "5" },
        { label: "SLA Status", value: "On Track" }
      ]}
      primaryActions={[
        { label: "Project Workspace", href: `/${locale}/portal/partner-area/project` },
        { label: "Documents", href: `/${locale}/portal/partner-area/documents` },
        { label: "Communications", href: `/${locale}/portal/partner-area/communication` }
      ]}
      checklist={[
        "Confirm latest technical requirements and revisions.",
        "Upload signed deliverables to partner documents.",
        "Escalate blockers in partner communication channel."
      ]}
    />
  );
}
