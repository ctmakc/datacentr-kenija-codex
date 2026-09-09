/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";

type PageEntry = {
  file: string;
  path: string;
};

type PageData = {
  meta?: { title?: string; description?: string };
  hero?: { headline?: string; subheadline?: string; badge?: string };
  sections?: Array<{ type?: string; title?: string; body?: string }>;
};

type ContentEditorProps = {
  locale: string;
  pageFiles: PageEntry[];
  defaultFile?: string;
  loadPage: (file: string) => Promise<string>;
  savePage: (file: string, raw: string) => Promise<{ ok: boolean; message: string }>;
};

export function ContentEditor({ locale, pageFiles, defaultFile, loadPage, savePage }: ContentEditorProps) {
  const [selected, setSelected] = useState(defaultFile ?? pageFiles[0]?.file ?? "");
  const [raw, setRaw] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedEntry = useMemo(() => pageFiles.find((entry) => entry.file === selected), [pageFiles, selected]);
  const filteredPageFiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pageFiles;
    return pageFiles.filter((entry) => entry.path.toLowerCase().includes(normalized) || entry.file.toLowerCase().includes(normalized));
  }, [pageFiles, query]);

  const parsed = useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PageData;
    } catch (error) {
      return { error: (error as Error).message };
    }
  }, [raw]);

  const handleLoad = (file: string) => {
    setMessage("");
    startTransition(async () => {
      const content = await loadPage(file);
      setRaw(content);
    });
  };

  const handleSave = () => {
    setMessage("");
    startTransition(async () => {
      const result = await savePage(selected, raw);
      setMessage(result.message);
    });
  };

  const handleFormat = () => {
    if (!raw.trim()) return;
    try {
      const formatted = JSON.stringify(JSON.parse(raw), null, 2);
      setRaw(`${formatted}\n`);
      setMessage("Formatted JSON.");
    } catch {
      setMessage("Cannot format: JSON is invalid.");
    }
  };

  useEffect(() => {
    if (selected && !raw) {
      handleLoad(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <p className="text-xs uppercase text-gray-400">Pages</p>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search path or file..."
          className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
        />
        <div className="mt-3 space-y-2 text-sm">
          {filteredPageFiles.map((entry) => (
            <button
              key={entry.file}
              type="button"
              onClick={() => {
                setSelected(entry.file);
                handleLoad(entry.file);
              }}
              className={`w-full rounded-md px-3 py-2 text-left ${
                selected === entry.file ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="block font-medium">{entry.path}</span>
              <span className="block text-xs opacity-70">{entry.file}</span>
            </button>
          ))}
          {filteredPageFiles.length === 0 && <p className="rounded-md border border-gray-100 px-3 py-2 text-xs text-gray-500">No pages found.</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              disabled={isPending || !selected}
            >
              Save JSON
            </button>
            <button
              type="button"
              onClick={handleFormat}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
              disabled={isPending || !selected}
            >
              Format JSON
            </button>
            {selectedEntry && (
              <Link
                href={`/${locale}${selectedEntry.path === "/" ? "" : selectedEntry.path}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300"
              >
                Open Public Page
              </Link>
            )}
            <span className="text-xs text-gray-500">{selected || "No file selected"}</span>
            {message && <span className="text-xs text-emerald-600">{message}</span>}
          </div>
          <textarea
            className="mt-4 h-[420px] w-full rounded-md border border-gray-200 p-3 text-sm text-gray-700"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            placeholder="Select a page to load JSON..."
          />
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-400">Preview</p>
          {!raw && <p className="mt-3 text-sm text-gray-500">Load a page to preview content.</p>}
          {raw && parsed && "error" in parsed && (
            <p className="mt-3 text-sm text-red-600">JSON parse error: {parsed.error as string}</p>
          )}
          {parsed && !("error" in parsed) && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{parsed.meta?.title}</h3>
                <p className="text-sm text-gray-500">{parsed.meta?.description}</p>
              </div>
              <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">{parsed.hero?.badge}</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{parsed.hero?.headline}</p>
                <p className="mt-1 text-sm text-gray-600">{parsed.hero?.subheadline}</p>
              </div>
              <div className="space-y-3">
                {(parsed.sections ?? []).map((section, index) => (
                  <div key={`${section.type}-${index}`} className="rounded-md border border-gray-100 p-3">
                    <p className="text-xs uppercase text-gray-400">{section.type}</p>
                    <p className="text-sm font-semibold text-gray-900">{section.title}</p>
                    {section.body && <p className="mt-1 text-sm text-gray-600">{section.body}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
