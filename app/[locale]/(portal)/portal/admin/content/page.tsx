import path from "node:path";
import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { AdminNav } from "@/components/admin/AdminNav";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { ContentIngestPanel } from "@/components/admin/ContentIngestPanel";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

type ProcessedEntry = {
  file: string;
  processedAt: string;
  pages: number;
};

function getContentPath(...segments: string[]) {
  return path.join(process.cwd(), "content", ...segments);
}

async function listInboxFiles() {
  const inboxPath = getContentPath("inbox");
  const entries = await fs.readdir(inboxPath, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((entry) => entry.isFile() && entry.name.startsWith("batch-") && entry.name.endsWith(".json"))
    .map((entry) => entry.name);
}

async function readProcessedIndex(): Promise<ProcessedEntry[]> {
  const indexPath = getContentPath("inbox", "processed", "index.json");
  const raw = await fs.readFile(indexPath, "utf-8").catch(() => "[]");
  return JSON.parse(raw) as ProcessedEntry[];
}

async function listPageFiles(locale: string) {
  const pagesPath = getContentPath(locale, "pages");
  let entries = await fs.readdir(pagesPath, { withFileTypes: true }).catch(() => []);
  if (entries.length === 0 && locale !== "ru") {
    entries = await fs.readdir(getContentPath("ru", "pages"), { withFileTypes: true }).catch(() => []);
  }
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => {
      const file = entry.name;
      const pathName = file.replace(".json", "").replace(/--/g, "/");
      return { file, path: pathName === "home" ? "/" : `/${pathName}` };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

async function readPageFile(locale: string, file: string) {
  const filePath = getContentPath(locale, "pages", file);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return fs.readFile(getContentPath("ru", "pages", file), "utf-8");
  }
}

async function writePageFile(locale: string, file: string, raw: string) {
  let filePath = getContentPath(locale, "pages", file);
  const exists = await fs
    .stat(filePath)
    .then(() => true)
    .catch(() => false);
  if (!exists && locale !== "ru") {
    filePath = getContentPath("ru", "pages", file);
  }
  await fs.writeFile(filePath, raw.trim() + "\n", "utf-8");
}

async function runIngestScript() {
  const scriptPath = path.join(process.cwd(), "scripts", "ingest-content.mjs");
  const { stdout, stderr } = await execFileAsync(process.execPath, [scriptPath], {
    cwd: process.cwd()
  });
  return `${stdout}${stderr}`.trim();
}

export default async function AdminContentPage({ params }: { params: { locale: string } }) {
  if (!isAdminAuthenticated()) {
    redirect(`/${params.locale}/portal/admin/login`);
  }

  const inboxFiles = await listInboxFiles();
  const processedFiles = await readProcessedIndex();
  const pageFiles = await listPageFiles(params.locale);

  async function runIngest() {
    "use server";
    try {
      const output = await runIngestScript();
      return { ok: true, message: output || "Ingest completed." };
    } catch (error) {
      return { ok: false, message: (error as Error).message };
    }
  }

  async function requeueBatch(file: string) {
    "use server";
    try {
      const processedPath = getContentPath("inbox", "processed", file);
      const inboxPath = getContentPath("inbox", file);
      await fs.rename(processedPath, inboxPath);

      const index = await readProcessedIndex();
      const next = index.filter((item) => item.file !== file);
      const indexPath = getContentPath("inbox", "processed", "index.json");
      await fs.writeFile(indexPath, JSON.stringify(next, null, 2) + "\n", "utf-8");
      return { ok: true, message: `Requeued ${file}.` };
    } catch (error) {
      return { ok: false, message: (error as Error).message };
    }
  }

  async function loadPage(file: string) {
    "use server";
    return readPageFile(params.locale, file);
  }

  async function savePage(file: string, raw: string) {
    "use server";
    try {
      JSON.parse(raw);
    } catch (error) {
      return { ok: false, message: "Invalid JSON. Fix syntax before saving." };
    }
    await writePageFile(params.locale, file, raw);
    return { ok: true, message: "Saved successfully." };
  }

  return (
    <PageShell title="Admin: Content" subtitle="Ingest batches, validate content, and edit page JSON.">
      <AdminNav locale={params.locale} />
      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Ingest</h2>
          <ContentIngestPanel
            inboxFiles={inboxFiles}
            processedFiles={processedFiles}
            runIngest={runIngest}
            requeueBatch={requeueBatch}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Page Editor (MVP)</h2>
          <p className="text-sm text-gray-500">
            Edit JSON directly for now. WYSIWYG can be layered later without changing the storage format.
          </p>
          <ContentEditor locale={params.locale} pageFiles={pageFiles} loadPage={loadPage} savePage={savePage} />
        </section>
      </div>
    </PageShell>
  );
}
