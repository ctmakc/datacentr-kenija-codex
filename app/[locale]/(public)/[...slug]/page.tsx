import { StructuredPublicPage } from "@/components/content/StructuredPublicPage";

type CatchAllPublicPageProps = {
  params: {
    locale: string;
    slug: string[];
  };
};

export default function CatchAllPublicPage({ params }: CatchAllPublicPageProps) {
  const pagePath = `/${params.slug.join("/")}`;
  return <StructuredPublicPage locale={params.locale} pagePath={pagePath} />;
}
