import fs from "node:fs/promises";
import path from "node:path";

export type AdminAnalyticsSnapshot = {
  processedBatches: number;
  processedPages: number;
  activeRuPages: number;
  inboxBatches: number;
  lastProcessedAt: string | null;
};

export async function getAdminAnalyticsSnapshot(): Promise<AdminAnalyticsSnapshot> {
  const contentRoot = path.join(process.cwd(), "content");
  const processedIndexPath = path.join(contentRoot, "inbox", "processed", "index.json");
  const inboxPath = path.join(contentRoot, "inbox");
  const ruPagesPath = path.join(contentRoot, "ru", "pages");

  const processedIndex = await fs
    .readFile(processedIndexPath, "utf-8")
    .then((raw) => JSON.parse(raw) as Array<{ pages: number; processedAt: string }>)
    .catch(() => []);

  const inboxEntries = await fs.readdir(inboxPath, { withFileTypes: true }).catch(() => []);
  const inboxBatches = inboxEntries.filter(
    (entry) => entry.isFile() && entry.name.startsWith("batch-") && entry.name.endsWith(".json")
  ).length;

  const ruPages = await fs.readdir(ruPagesPath, { withFileTypes: true }).catch(() => []);

  return {
    processedBatches: processedIndex.length,
    processedPages: processedIndex.reduce((sum, item) => sum + (item.pages ?? 0), 0),
    activeRuPages: ruPages.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).length,
    inboxBatches,
    lastProcessedAt: processedIndex.length > 0 ? processedIndex[processedIndex.length - 1].processedAt : null
  };
}
