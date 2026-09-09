"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminNavProps = {
  locale: string;
};

const links = [
  { href: "/portal/admin", label: "Overview" },
  { href: "/portal/admin/content", label: "Content" },
  { href: "/portal/admin/analytics", label: "Analytics" }
];

export function AdminNav({ locale }: AdminNavProps) {
  const pathname = usePathname() || `/${locale}/portal/admin`;

  return (
    <nav className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3">
      {links.map((link) => {
        const href = `/${locale}${link.href}`;
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              active ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
