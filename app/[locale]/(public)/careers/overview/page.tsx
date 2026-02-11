import { StructuredPublicPage } from "@/components/content/StructuredPublicPage";

export default function Page({ params }: { params: { locale: string } }) {
  return <StructuredPublicPage locale={params.locale} pagePath="/careers/overview" />;
}
