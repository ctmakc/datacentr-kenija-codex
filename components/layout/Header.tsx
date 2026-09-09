"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

type NavSection = {
  label: string;
  href: string;
  children: Array<{ label: string; href: string }>;
};

const navSections: NavSection[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Vision", href: "/about/vision" },
      { label: "Team", href: "/about/team" },
      { label: "Roadmap", href: "/about/roadmap" }
    ]
  },
  {
    label: "Project",
    href: "/project",
    children: [
      { label: "Overview", href: "/project/overview" },
      { label: "Location", href: "/project/location/kenya" },
      { label: "Energy", href: "/project/energy/generation" },
      { label: "Phases", href: "/project/phases/phase-1" }
    ]
  },
  {
    label: "Compute",
    href: "/compute",
    children: [
      { label: "Overview", href: "/compute/overview" },
      { label: "GPU", href: "/compute/gpu/training" },
      { label: "DePIN", href: "/compute/depin/overview" },
      { label: "Pricing", href: "/compute/pricing/calculator" }
    ]
  },
  {
    label: "Investors",
    href: "/investors",
    children: [
      { label: "Overview", href: "/investors/overview" },
      { label: "Financials", href: "/investors/financials/model" },
      { label: "Risks", href: "/investors/risks/analysis" },
      { label: "Due Diligence", href: "/investors/due-diligence/process" }
    ]
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Overview", href: "/partners/overview" },
      { label: "Technical", href: "/partners/technical-partner/role" },
      { label: "Energy", href: "/partners/energy-partner/opportunity" },
      { label: "Suppliers", href: "/partners/equipment-suppliers/tender-process" }
    ]
  },
  {
    label: "Legal",
    href: "/legal/privacy-policy",
    children: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Service", href: "/legal/terms-of-service" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" }
    ]
  }
];

function localized(locale: Locale, href: string) {
  return `/${locale}${href}`;
}

export function Header({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname() || `/${locale}`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="group flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-cyan-500 to-sky-700 shadow-sm transition group-hover:scale-105" />
          <span className="text-sm font-semibold tracking-wide text-slate-900 md:text-base">Kenya AI Compute</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navSections.map((section) => (
            <div
              key={section.href}
              className="relative"
              onMouseEnter={() => setOpenSection(section.href)}
              onMouseLeave={() => setOpenSection((prev) => (prev === section.href ? null : prev))}
            >
              {(() => {
                const sectionPath = localized(locale, section.href);
                const active = pathname === sectionPath || pathname.startsWith(`${sectionPath}/`);
                return (
              <Link
                href={localized(locale, section.href)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {section.label}
              </Link>
                );
              })()}

              {openSection === section.href && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  {section.children.map((child) => (
                    (() => {
                      const childPath = localized(locale, child.href);
                      const childActive = pathname === childPath || pathname.startsWith(`${childPath}/`);
                      return (
                        <Link
                          key={child.href}
                          href={childPath}
                          className={`block rounded-lg px-3 py-2 text-sm transition ${
                            childActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })()
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/portal`}
            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Portal
          </Link>
          <Link
            href={`/${locale}/portal/admin/login`}
            className="rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Admin
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            <LanguageSwitcher locale={locale} />
            {navSections.map((section) => (
              <details
                key={section.href}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">{section.label}</summary>
                <div className="mt-2 flex flex-col gap-1">
                  <Link
                    href={localized(locale, section.href)}
                    className={`rounded px-2 py-1 text-sm ${
                      pathname === localized(locale, section.href) || pathname.startsWith(`${localized(locale, section.href)}/`)
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    Overview
                  </Link>
                  {section.children.map((child) => (
                    <Link
                      key={child.href}
                      href={localized(locale, child.href)}
                      className={`rounded px-2 py-1 text-sm ${
                        pathname === localized(locale, child.href) || pathname.startsWith(`${localized(locale, child.href)}/`)
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}

            <div className="flex gap-2">
              <Link
                href={`/${locale}/portal`}
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700"
                onClick={() => setMobileOpen(false)}
              >
                Portal
              </Link>
              <Link
                href={`/${locale}/portal/admin/login`}
                className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
