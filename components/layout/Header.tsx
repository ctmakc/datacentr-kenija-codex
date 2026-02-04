import Link from "next/link";
import { localeLabels, Locale } from "@/lib/i18n";

const navItems = [
  { href: "about", label: "About" },
  { href: "project", label: "Project" },
  { href: "datacenter", label: "Datacenter" },
  { href: "compute", label: "Compute" },
  { href: "investors", label: "Investors" },
  { href: "partners", label: "Partners" }
];

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold text-gray-900">
          Kenya AI Compute
        </Link>
        <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={`/${locale}/${item.href}`} className="hover:text-gray-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-gray-500">{localeLabels[locale]}</div>
      </div>
    </header>
  );
}
