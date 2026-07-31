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
      {/* Agency credit — house standard (uafest.ca): wording + MMIX logo on a
          light chip, grayscale until hover, so it sits on light and dark footers. */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "22px 24px 0" }}>
        <a
          href="https://mmix.ua/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "inherit", opacity: 0.7, textDecoration: "none" }}
        >
          Development & promotion —
          <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.9)", borderRadius: 6, padding: "4px 8px" }}>
            <img src="/mmix-logo.png" alt="MMIX — Marketing Mix" width={62} height={60} style={{ height: 36, width: "auto" }} />
          </span>
        </a>
      </div>
    </footer>
  );
}
