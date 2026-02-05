import fs from "node:fs/promises";
import path from "node:path";

type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type PageSection = {
  type: string;
  title?: string;
  body?: string;
  items?: Array<Record<string, unknown>>;
  copy?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
};

export type StructuredPageContent = {
  path: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    badge: string;
    cta: CtaLink[];
  };
  sections: PageSection[];
};

function normalizeLocale(locale: string) {
  if (locale === "en" || locale === "ru" || locale === "zh") {
    return locale;
  }
  return "ru";
}

function pagePathToFileName(pagePath: string) {
  if (pagePath === "/") {
    return "home.json";
  }
  return `${pagePath.replace(/^\//, "").replace(/\//g, "--")}.json`;
}

function assertStructuredPage(data: unknown, source: string): asserts data is StructuredPageContent {
  if (!data || typeof data !== "object") {
    throw new Error(`Invalid content in ${source}: root must be an object.`);
  }
  const page = data as StructuredPageContent;
  if (!page.meta?.title || !page.meta?.description) {
    throw new Error(`Invalid content in ${source}: missing meta.title/meta.description.`);
  }
  if (!page.hero?.headline || !page.hero?.subheadline || !page.hero?.badge) {
    throw new Error(`Invalid content in ${source}: missing hero fields.`);
  }
  if (!Array.isArray(page.hero?.cta)) {
    throw new Error(`Invalid content in ${source}: hero.cta must be an array.`);
  }
  if (!Array.isArray(page.sections)) {
    throw new Error(`Invalid content in ${source}: sections must be an array.`);
  }
}

export async function getStructuredPageContent(locale: string, pagePath: string) {
  const normalizedLocale = normalizeLocale(locale);
  const fileName = pagePathToFileName(pagePath);
  const primary = path.join(process.cwd(), "content", normalizedLocale, "pages", fileName);
  const fallback = path.join(process.cwd(), "content", "ru", "pages", fileName);

  const tryRead = async (filePath: string) => {
    const raw = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(raw);
    assertStructuredPage(json, filePath);
    return json;
  };

  try {
    return await tryRead(primary);
  } catch {
    return tryRead(fallback);
  }
}
