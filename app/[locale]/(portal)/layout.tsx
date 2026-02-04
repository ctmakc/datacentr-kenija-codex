import { PageShell } from "@/components/layout/PageShell";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50">
      <PageShell title="Portal" subtitle="Secure dashboards for investors, partners, and customers.">
        {children}
      </PageShell>
    </div>
  );
}
