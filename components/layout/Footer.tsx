import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

const footerSections = [
  {
    title: "Company",
    links: [
      { href: "about", label: "About" },
      { href: "project/overview", label: "Project" },
      { href: "careers", label: "Careers" },
      { href: "news", label: "News" }
    ]
  },
  {
    title: "Platform",
    links: [
      { href: "compute/overview", label: "Compute" },
      { href: "datacenter/overview", label: "Datacenter" },
      { href: "resources", label: "Resources" },
      { href: "contact", label: "Contact" }
    ]
  },
  {
    title: "Business",
    links: [
      { href: "investors/overview", label: "Investors" },
      { href: "partners/overview", label: "Partners" },
      { href: "portal", label: "Portal" },
      { href: "portal/admin/login", label: "Admin" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "legal/privacy-policy", label: "Privacy" },
      { href: "legal/terms-of-service", label: "Terms" },
      { href: "legal/cookie-policy", label: "Cookies" }
    ]
  }
];

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-3">
          <div className="text-lg font-semibold text-slate-900">Kenya AI Compute</div>
          <p className="mt-2 max-w-sm text-sm text-slate-600">
            Powering Africa&apos;s AI future with efficient, sustainable infrastructure.
          </p>
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{section.title}</p>
              <div className="mt-3 flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link key={link.href} href={`/${locale}/${link.href}`} className="text-sm text-slate-600 transition hover:text-slate-900">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Agency credit — house standard: quiet, centered, inherits the footer's own colour. */}
      <div style={{ width: "100%", textAlign: "center", padding: "20px 24px 0" }}>
        <a
          href="https://mmix.ua/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12.5, lineHeight: 1.5, color: "inherit", opacity: 0.6, textDecoration: "none" }}
        >
          Development & promotion — Marketing Mix
        </a>
      </div>
    </footer>
  );
}
