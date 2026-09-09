import { PortalWorkspace } from "@/components/portal/PortalWorkspace";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <PortalWorkspace
      title="Partner Communication"
      subtitle="Meeting scheduling."
      summary="Communication lane for partner updates, agenda tracking, and execution follow-ups."
      metrics={[
        { label: "Threads", value: "9" },
        { label: "Open Items", value: "5" },
        { label: "Response SLA", value: "<24h" }
      ]}
      primaryActions={[
        { label: "Partner Dashboard", href: `/${locale}/portal/partner-area/dashboard` },
        { label: "Project Workspace", href: `/${locale}/portal/partner-area/project` },
        { label: "Documents", href: `/${locale}/portal/partner-area/documents` }
      ]}
      checklist={[
        "Review unresolved conversation threads.",
        "Publish this week meeting summary.",
        "Assign owner for each action item."
      ]}
    />
  );
}
