import Link from "next/link";
import { Locale } from "@/lib/i18n";

const footerLinks = [
  { href: "contact", label: "Contact" },
  { href: "resources", label: "Resources" },
  { href: "news", label: "News" },
  { href: "careers", label: "Careers" }
];

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold">Kenya AI Compute</div>
          <p className="mt-2 text-sm text-gray-600">
            Powering Africa&apos;s AI future with efficient, sustainable infrastructure.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {footerLinks.map((link) => (
            <Link key={link.href} href={`/${locale}/${link.href}`} className="hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
