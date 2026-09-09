import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_LOCALES = ["en", "ru", "zh"] as const;
const DEFAULT_LOCALE = "en";

export type HomeContent = {
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    cta: Array<{
      label: string;
      href: string;
      variant: "primary" | "secondary" | "ghost";
    }>;
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
  valueProps: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      copy: string;
    }>;
  };
  overview: {
    title: string;
    bullets: string[];
    map: {
      label: string;
      note: string;
    };
  };
  media: {
    title: string;
    items: Array<{
      kind: "image" | "video";
      src: string;
      alt?: string;
      caption?: string;
      poster?: string;
      aspect?: "16:9" | "4:3" | "1:1";
    }>;
  };
  networks: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      href?: string;
    }>;
  };
  updates: {
    title: string;
    items: Array<{
      title: string;
      date: string;
      href: string;
    }>;
  };
  trust: {
    title: string;
    items: Array<{
      name: string;
      href?: string;
    }>;
  };
  cta: {
    title: string;
    copy: string;
    primary: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
};

function normalizeLocale(locale: string): (typeof SUPPORTED_LOCALES)[number] {
  const normalized = locale?.toLowerCase() ?? DEFAULT_LOCALE;
  if (SUPPORTED_LOCALES.includes(normalized as (typeof SUPPORTED_LOCALES)[number])) {
    return normalized as (typeof SUPPORTED_LOCALES)[number];
  }
  return DEFAULT_LOCALE;
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Content validation error: "${field}" must be a non-empty string.`);
  }
}

function assertArray(value: unknown, field: string): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Content validation error: "${field}" must be an array.`);
  }
}

function validateHomeContent(data: unknown): HomeContent {
  if (!data || typeof data !== "object") {
    throw new Error("Content validation error: root object is invalid.");
  }
  const content = data as HomeContent;

  assertString(content.meta?.title, "meta.title");
  assertString(content.meta?.description, "meta.description");
  assertString(content.hero?.badge, "hero.badge");
  assertString(content.hero?.headline, "hero.headline");
  assertString(content.hero?.subheadline, "hero.subheadline");
  assertArray(content.hero?.cta, "hero.cta");
  assertArray(content.hero?.metrics, "hero.metrics");
  assertString(content.valueProps?.title, "valueProps.title");
  assertString(content.valueProps?.subtitle, "valueProps.subtitle");
  assertArray(content.valueProps?.items, "valueProps.items");
  assertString(content.overview?.title, "overview.title");
  assertArray(content.overview?.bullets, "overview.bullets");
  assertString(content.overview?.map?.label, "overview.map.label");
  assertString(content.overview?.map?.note, "overview.map.note");
  assertString(content.media?.title, "media.title");
  assertArray(content.media?.items, "media.items");
  assertString(content.networks?.title, "networks.title");
  assertString(content.networks?.subtitle, "networks.subtitle");
  assertArray(content.networks?.items, "networks.items");
  assertString(content.updates?.title, "updates.title");
  assertArray(content.updates?.items, "updates.items");
  assertString(content.trust?.title, "trust.title");
  assertArray(content.trust?.items, "trust.items");
  assertString(content.cta?.title, "cta.title");
  assertString(content.cta?.copy, "cta.copy");
  assertString(content.cta?.primary?.label, "cta.primary.label");
  assertString(content.cta?.primary?.href, "cta.primary.href");

  return content;
}

async function readJsonFile(filePath: string): Promise<unknown> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function getHomeContent(locale: string): Promise<HomeContent> {
  const normalized = normalizeLocale(locale);
  const contentPath = path.join(process.cwd(), "content", normalized, "home.json");
  try {
    const data = await readJsonFile(contentPath);
    return validateHomeContent(data);
  } catch (error) {
    if (normalized !== DEFAULT_LOCALE) {
      const fallbackPath = path.join(process.cwd(), "content", DEFAULT_LOCALE, "home.json");
      const fallback = await readJsonFile(fallbackPath);
      return validateHomeContent(fallback);
    }
    throw error;
  }
}
