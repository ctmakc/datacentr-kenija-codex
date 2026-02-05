import fs from "node:fs/promises";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");
const locales = ["en", "ru", "zh"];
const requiredFiles = ["home.json"];

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

function validateHomeContent(content, filePath) {
  assertString(content?.meta?.title, `${filePath}: meta.title`);
  assertString(content?.meta?.description, `${filePath}: meta.description`);
  assertString(content?.hero?.badge, `${filePath}: hero.badge`);
  assertString(content?.hero?.headline, `${filePath}: hero.headline`);
  assertString(content?.hero?.subheadline, `${filePath}: hero.subheadline`);
  assertArray(content?.hero?.cta, `${filePath}: hero.cta`);
  assertArray(content?.hero?.metrics, `${filePath}: hero.metrics`);
  assertString(content?.valueProps?.title, `${filePath}: valueProps.title`);
  assertString(content?.valueProps?.subtitle, `${filePath}: valueProps.subtitle`);
  assertArray(content?.valueProps?.items, `${filePath}: valueProps.items`);
  assertString(content?.overview?.title, `${filePath}: overview.title`);
  assertArray(content?.overview?.bullets, `${filePath}: overview.bullets`);
  assertString(content?.overview?.map?.label, `${filePath}: overview.map.label`);
  assertString(content?.overview?.map?.note, `${filePath}: overview.map.note`);
  assertString(content?.media?.title, `${filePath}: media.title`);
  assertArray(content?.media?.items, `${filePath}: media.items`);
  assertString(content?.networks?.title, `${filePath}: networks.title`);
  assertString(content?.networks?.subtitle, `${filePath}: networks.subtitle`);
  assertArray(content?.networks?.items, `${filePath}: networks.items`);
  assertString(content?.updates?.title, `${filePath}: updates.title`);
  assertArray(content?.updates?.items, `${filePath}: updates.items`);
  assertString(content?.trust?.title, `${filePath}: trust.title`);
  assertArray(content?.trust?.items, `${filePath}: trust.items`);
  assertString(content?.cta?.title, `${filePath}: cta.title`);
  assertString(content?.cta?.copy, `${filePath}: cta.copy`);
  assertString(content?.cta?.primary?.label, `${filePath}: cta.primary.label`);
  assertString(content?.cta?.primary?.href, `${filePath}: cta.primary.href`);
}

async function validateFile(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(raw);
  if (filePath.endsWith("home.json")) {
    validateHomeContent(json, filePath);
  }
}

async function run() {
  const errors = [];

  for (const locale of locales) {
    for (const file of requiredFiles) {
      const filePath = path.join(contentRoot, locale, file);
      try {
        await validateFile(filePath);
        console.log(`OK: ${path.relative(process.cwd(), filePath)}`);
      } catch (error) {
        errors.push(`${path.relative(process.cwd(), filePath)} -> ${error.message}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("\nContent validation failed:");
    errors.forEach((line) => console.error(`- ${line}`));
    process.exit(1);
  }

  console.log("\nContent validation passed.");
}

run();
