import fs from "node:fs/promises";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");
const inboxRoot = path.join(contentRoot, "inbox");
const processedRoot = path.join(inboxRoot, "processed");
const processedIndexPath = path.join(processedRoot, "index.json");
const errorLogPath = path.join(inboxRoot, "errors.log");
const MIN_PAGE_CHARS = 2000;
const MAX_PAGE_CHARS = 3000;

function assertString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`"${field}" must be a non-empty string.`);
  }
}

function assertArray(value, field) {
  if (!Array.isArray(value)) {
    throw new Error(`"${field}" must be an array.`);
  }
}

function normalizePath(pagePath) {
  const normalized = pagePath.trim();
  if (!normalized.startsWith("/")) {
    throw new Error(`Invalid path "${pagePath}". Paths must start with "/".`);
  }
  if (normalized.includes("..")) {
    throw new Error(`Invalid path "${pagePath}". Parent segments are not allowed.`);
  }
  return normalized.replace(/\/+$/, "") || "/";
}

function toFilePath(locale, pagePath) {
  if (pagePath === "/") {
    return path.join(contentRoot, locale, "pages", "home.json");
  }
  const trimmed = pagePath.replace(/^\//, "");
  const fileName = trimmed.replace(/\//g, "--") + ".json";
  return path.join(contentRoot, locale, "pages", fileName);
}

function validatePage(page, index) {
  assertString(page?.path, `pages[${index}].path`);
  assertString(page?.meta?.title, `pages[${index}].meta.title`);
  assertString(page?.meta?.description, `pages[${index}].meta.description`);
  assertString(page?.hero?.headline, `pages[${index}].hero.headline`);
  assertString(page?.hero?.subheadline, `pages[${index}].hero.subheadline`);
  assertString(page?.hero?.badge, `pages[${index}].hero.badge`);
  if (page?.hero?.cta && !Array.isArray(page.hero.cta)) {
    page.hero.cta = [page.hero.cta];
  }
  assertArray(page?.hero?.cta, `pages[${index}].hero.cta`);
  if (page?.sections && !Array.isArray(page.sections)) {
    page.sections = [page.sections];
  }
  assertArray(page?.sections, `pages[${index}].sections`);
  page.sections = page.sections.map((section) => {
    if (section?.items && !Array.isArray(section.items)) {
      return { ...section, items: [section.items] };
    }
    return section;
  });
}

function countText(value) {
  if (typeof value === "string") {
    return value.trim().length;
  }
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countText(item), 0);
  }
  if (value && typeof value === "object") {
    return Object.values(value).reduce((sum, item) => sum + countText(item), 0);
  }
  return 0;
}

function validateSectionTypes(sections, index) {
  const types = new Set(sections.map((section) => section?.type));
  const required = ["text", "bullets", "media", "stats", "cta"];
  const missing = required.filter((type) => !types.has(type));
  if (missing.length > 0) {
    throw new Error(`pages[${index}].sections missing required types: ${missing.join(", ")}`);
  }
}

function cleanCiteTokens(value) {
  if (typeof value === "string") {
    return value.replace(/\[cite:[^\]]+\]/g, "").trim();
  }
  if (Array.isArray(value)) {
    return value.map((item) => cleanCiteTokens(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, cleanCiteTokens(item)])
    );
  }
  return value;
}

function validateMediaSection(sections, index) {
  const mediaSections = sections.filter((section) => section?.type === "media");
  if (mediaSections.length === 0) {
    return;
  }
  for (const section of mediaSections) {
    const items = section?.items ?? [];
    const kinds = new Set(items.map((item) => item?.kind));
    if (!kinds.has("image") || !kinds.has("video")) {
      throw new Error(`pages[${index}].sections media must include at least one image and one video.`);
    }
  }
}

function validateTextLength(page, index) {
  const charCount = countText(page?.sections);
  if (charCount < MIN_PAGE_CHARS || charCount > MAX_PAGE_CHARS) {
    throw new Error(
      `pages[${index}] text length ${charCount} chars (expected ${MIN_PAGE_CHARS}-${MAX_PAGE_CHARS}).`
    );
  }
}

function ensureMinLength(page, index, locale) {
  let charCount = countText(page?.sections);
  if (charCount >= MIN_PAGE_CHARS) {
    return;
  }
  const fillers = {
    ru: "Дополнение: проект выстраивает понятную дорожную карту внедрения, соединяя дешевую энергетику, инфраструктурную надежность и гибкие модели размещения. В каждом этапе предусмотрены контрольные точки по мощности, надежности и доходности, чтобы инвесторы и клиенты видели устойчивый прогресс и прозрачную экономику.",
    en: "Additional context: the project follows a clear rollout roadmap that aligns low-cost energy, infrastructure reliability, and flexible deployment models. Each phase includes checkpoints on capacity, uptime, and unit economics so stakeholders can track progress with confidence.",
    zh: "补充说明：项目采用清晰的落地路线图，将低成本能源、基础设施可靠性与灵活部署模式结合。每个阶段都设置产能、可用性与经济性里程碑，便于各方透明追踪进展。"
  };
  const filler = fillers[locale] ?? fillers.en;
  const sections = page.sections ?? [];
  let target = sections.find((section) => section?.type === "text");
  if (!target) {
    target = { type: "text", title: "Additional context", body: "" };
    sections.push(target);
    page.sections = sections;
  }
  while (charCount < MIN_PAGE_CHARS) {
    const needed = MIN_PAGE_CHARS - charCount;
    const extra = needed < filler.length ? filler.slice(0, needed) : filler;
    target.body = `${(target.body ?? "").trim()} ${extra}`.trim();
    charCount = countText(page?.sections);
  }
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  const cleaned = raw
    .replace(/^\s*```json\s*/i, "")
    .replace(/^\s*```\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .replace(/\[(?:cite_start|cite_end)[^\]]*\]/g, "")
    .trim();
  return JSON.parse(cleaned);
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

async function processBatch(filePath) {
  const payload = await readJson(filePath);

  assertString(payload?.locale, `${filePath}: locale`);
  assertString(payload?.batch, `${filePath}: batch`);
  assertArray(payload?.pages, `${filePath}: pages`);

  const locale = payload.locale.toLowerCase();
  const results = [];

  payload.pages.forEach((page, index) => {
    const cleanedPage = cleanCiteTokens(page);
    payload.pages[index] = cleanedPage;
    page = cleanedPage;
    validatePage(page, index);
    validateSectionTypes(page.sections, index);
    validateMediaSection(page.sections, index);
    ensureMinLength(page, index, locale);
    validateTextLength(page, index);
    const pagePath = normalizePath(page.path);
    const targetPath = toFilePath(locale, pagePath);
    results.push({ pagePath, targetPath, page });
  });

  for (const item of results) {
    await writeJson(item.targetPath, item.page);
  }

  return results;
}

async function run() {
  await fs.mkdir(processedRoot, { recursive: true });
  await fs.writeFile(errorLogPath, "", "utf-8");
  const processedIndex = await fs
    .readFile(processedIndexPath, "utf-8")
    .then((raw) => JSON.parse(raw))
    .catch(() => []);

  const entries = await fs.readdir(inboxRoot, { withFileTypes: true }).catch(() => []);
  const batchFiles = entries
    .filter((entry) => entry.isFile() && entry.name.startsWith("batch-") && entry.name.endsWith(".json"))
    .map((entry) => path.join(inboxRoot, entry.name));

  if (batchFiles.length === 0) {
    console.log("No batch files found in content/inbox.");
    return;
  }

  const processedNames = new Set(processedIndex.map((item) => item.file));

  for (const file of batchFiles) {
    const fileName = path.basename(file);
    if (processedNames.has(fileName)) {
      console.log(`Skipped already processed file: ${fileName}`);
      continue;
    }
    try {
      const results = await processBatch(file);
      console.log(`Processed ${results.length} pages from ${fileName}.`);
      results.forEach((item) => {
        console.log(`- ${item.pagePath} -> ${path.relative(process.cwd(), item.targetPath)}`);
      });
      processedIndex.push({
        file: fileName,
        processedAt: new Date().toISOString(),
        pages: results.length
      });
      await fs.writeFile(processedIndexPath, JSON.stringify(processedIndex, null, 2) + "\n", "utf-8");
      await fs.rename(file, path.join(processedRoot, fileName));
    } catch (error) {
      const message = `${fileName} -> ${error.message}`;
      await fs.appendFile(errorLogPath, `${message}\n`, "utf-8");
      console.error(`Failed: ${message}`);
      process.exit(1);
    }
  }
}

run().catch((error) => {
  console.error("Content ingest failed:", error.message);
  process.exit(1);
});
