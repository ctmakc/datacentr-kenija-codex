"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";

type Metric = {
  label: string;
  value: string;
};

type Action = {
  label: string;
  href: string;
};

type PortalWorkspaceProps = {
  title: string;
  subtitle: string;
  summary: string;
  metrics: Metric[];
  primaryActions: Action[];
  checklist: string[];
  children?: React.ReactNode;
};

type NavItem = {
  label: string;
  href: string;
};

function withLocale(locale: string, href: string) {
  return `/${locale}${href}`;
}

function detectLocale(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment === "en" || segment === "ru" || segment === "zh" ? segment : "en";
}

function detectScope(pathname: string) {
  if (pathname.includes("/portal/customer-dashboard")) return "customer";
  if (pathname.includes("/portal/investor-room")) return "investor";
  if (pathname.includes("/portal/partner-area")) return "partner";
  if (pathname.includes("/portal/admin")) return "admin";
  if (pathname.includes("/portal/login") || pathname.includes("/portal/register")) return "entry";
  return "portal";
}

function getWorkspaceMap(scope: string): NavItem[] {
  const common: NavItem[] = [{ label: "Portal Home", href: "/portal" }];

  if (scope === "customer") {
    return [
      ...common,
      { label: "Overview", href: "/portal/customer-dashboard/overview" },
      { label: "Services", href: "/portal/customer-dashboard/services" },
      { label: "Billing", href: "/portal/customer-dashboard/billing" },
      { label: "Support", href: "/portal/customer-dashboard/support" },
      { label: "Settings", href: "/portal/customer-dashboard/settings" }
    ];
  }

  if (scope === "investor") {
    return [
      ...common,
      { label: "Dashboard", href: "/portal/investor-room/dashboard" },
      { label: "Financials", href: "/portal/investor-room/financials" },
      { label: "Documents", href: "/portal/investor-room/documents" },
      { label: "Updates", href: "/portal/investor-room/updates" },
      { label: "Communication", href: "/portal/investor-room/communication" }
    ];
  }

  if (scope === "partner") {
    return [
      ...common,
      { label: "Dashboard", href: "/portal/partner-area/dashboard" },
      { label: "Project", href: "/portal/partner-area/project" },
      { label: "Documents", href: "/portal/partner-area/documents" },
      { label: "Communication", href: "/portal/partner-area/communication" }
    ];
  }

  if (scope === "admin") {
    return [
      ...common,
      { label: "Admin Home", href: "/portal/admin" },
      { label: "Content", href: "/portal/admin/content" },
      { label: "Analytics", href: "/portal/admin/analytics" },
      { label: "Admin Login", href: "/portal/admin/login" }
    ];
  }

  if (scope === "entry") {
    return [...common, { label: "Portal Login", href: "/portal/login" }, { label: "Register", href: "/portal/register" }];
  }

  return [
    ...common,
    { label: "Customer", href: "/portal/customer-dashboard/overview" },
    { label: "Investor", href: "/portal/investor-room/dashboard" },
    { label: "Partner", href: "/portal/partner-area/dashboard" },
    { label: "Admin", href: "/portal/admin/login" }
  ];
}

export function PortalWorkspace({
  title,
  subtitle,
  summary,
  metrics,
  primaryActions,
  checklist,
  children
}: PortalWorkspaceProps) {
  const pathname = usePathname() || "/en/portal";
  const locale = detectLocale(pathname);
  const workspaceMap = getWorkspaceMap(detectScope(pathname));

  return (
    <PageShell title={title} subtitle={subtitle}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Workspace summary</h2>
          <p className="text-sm leading-7 text-slate-700">{summary}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Workspace map</h3>
            <div className="mt-3 flex flex-col gap-2">
              {workspaceMap.map((item) => {
                const href = withLocale(locale, item.href);
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-md px-3 py-2 text-sm transition ${
                      active ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Primary actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              {primaryActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Checklist</h3>
            <ul className="mt-3 space-y-2">
              {checklist.map((item) => (
                <li key={item} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {children ? <section className="grid gap-4">{children}</section> : null}
    </PageShell>
  );
}
