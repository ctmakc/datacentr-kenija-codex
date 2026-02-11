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
  items?: Array<Record<string, unknown> | string>;
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

function fileNameToPagePath(fileName: string) {
  if (fileName === "home.json") {
    return "/";
  }
  const base = fileName.replace(/\.json$/, "");
  return `/${base.replace(/--/g, "/")}`;
}

function titleFromPath(pagePath: string) {
  return pagePath
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " "))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" / ");
}

function buildFallbackPage(pagePath: string): StructuredPageContent {
  const title = titleFromPath(pagePath) || "Page";
  return {
    path: pagePath,
    meta: {
      title: `${title} | Kenya AI Compute`,
      description: "This page is available and ready for content update."
    },
    hero: {
      headline: title,
      subheadline: "Section prepared in platform structure. Content can be expanded from the inbox batches.",
      badge: "In Progress",
      cta: [
        {
          label: "Back to Home",
          href: "/",
          variant: "primary"
        }
      ]
    },
    sections: [
      {
        type: "text",
        title: "Content status",
        body: "This route is configured and rendered via the structured content system. If this page needs richer copy, add or update the corresponding JSON file in the content directory."
      }
    ]
  };
}

async function listAvailablePagePaths(locale: string) {
  const primaryDir = path.join(process.cwd(), "content", locale, "pages");
  const fallbackDir = path.join(process.cwd(), "content", "ru", "pages");

  const readDir = async (dirPath: string) => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => entry.name);
    } catch {
      return [] as string[];
    }
  };

  const [primaryFiles, fallbackFiles] = await Promise.all([readDir(primaryDir), readDir(fallbackDir)]);
  const unique = Array.from(new Set([...primaryFiles, ...fallbackFiles]));
  return unique.map(fileNameToPagePath);
}

async function readPageByPath(locale: string, pagePath: string): Promise<StructuredPageContent | null> {
  const fileName = pagePathToFileName(pagePath);
  const primary = path.join(process.cwd(), "content", locale, "pages", fileName);
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
    try {
      return await tryRead(fallback);
    } catch {
      return null;
    }
  }
}

async function buildCompositePage(locale: string, pagePath: string): Promise<StructuredPageContent> {
  const allPaths = await listAvailablePagePaths(locale);
  const descendants = allPaths
    .filter((candidate) => candidate !== pagePath && candidate.startsWith(`${pagePath === "/" ? "" : pagePath}/`))
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 12);

  const childPages = (
    await Promise.all(
      descendants.map(async (childPath) => {
        const page = await readPageByPath(locale, childPath);
        if (!page) return null;
        return {
          path: childPath,
          title: page.meta.title,
          description: page.meta.description
        };
      })
    )
  ).filter(Boolean) as Array<{ path: string; title: string; description: string }>;

  if (childPages.length === 0) {
    return buildFallbackPage(pagePath);
  }

  const title = titleFromPath(pagePath) || "Overview";
  const sample = childPages.slice(0, 8).map((item) => ({
    title: item.title,
    copy: item.description,
    href: item.path
  }));

  return {
    path: pagePath,
    meta: {
      title: `${title} | Kenya AI Compute`,
      description: `Structured index of ${childPages.length} available pages in this section.`
    },
    hero: {
      headline: `${title}: Section Overview`,
      subheadline: "This page aggregates the available materials and routes you to detailed subpages.",
      badge: "Section Navigator",
      cta: [
        {
          label: "Open First Subsection",
          href: childPages[0].path,
          variant: "primary"
        }
      ]
    },
    sections: [
      {
        type: "text",
        title: "Available Materials",
        body: `This section currently has ${childPages.length} structured pages generated from your content pipeline. Use the cards below to drill into each topic.`
      },
      {
        type: "cards",
        title: "Subsections",
        items: sample
      },
      {
        type: "cta",
        title: "Need a deeper page?",
        copy: "If a subsection needs additional narrative depth, extend its JSON page content in the admin editor.",
        primary: {
          label: "Open Admin Content",
          href: "/portal/admin/content"
        },
        secondary: {
          label: "Back to Home",
          href: "/"
        }
      }
    ]
  };
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
    try {
      return await tryRead(fallback);
    } catch {
      return buildCompositePage(normalizedLocale, pagePath);
    }
  }
}

export async function getRelatedPagePaths(locale: string, pagePath: string, limit = 8) {
  const normalizedLocale = normalizeLocale(locale);
  const primaryDir = path.join(process.cwd(), "content", normalizedLocale, "pages");
  const fallbackDir = path.join(process.cwd(), "content", "ru", "pages");

  const readDir = async (dirPath: string) => {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => entry.name);
    } catch {
      return [] as string[];
    }
  };

  const [primaryFiles, fallbackFiles] = await Promise.all([readDir(primaryDir), readDir(fallbackDir)]);
  const unique = Array.from(new Set([...primaryFiles, ...fallbackFiles]));
  const allPaths = unique.map(fileNameToPagePath).filter((candidate) => candidate !== "/" && candidate !== pagePath);

  const parts = pagePath.split("/").filter(Boolean);
  const sectionRoot = parts[0] ? `/${parts[0]}` : "";

  const scoped = sectionRoot
    ? allPaths.filter((candidate) => candidate.startsWith(`${sectionRoot}/`) || candidate === sectionRoot)
    : allPaths;

  return scoped.sort((a, b) => a.localeCompare(b)).slice(0, limit);
}
