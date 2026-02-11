import { StructuredPublicPage } from "@/components/content/StructuredPublicPage";

export default function Page({ params }: { params: { locale: string } }) {
  return <StructuredPublicPage locale={params.locale} pagePath="/investors/due-diligence/faq" />;
}
