"use client";

import { useState, useTransition } from "react";

type IngestResult = {
  ok: boolean;
  message: string;
};

type ContentIngestPanelProps = {
  inboxFiles: string[];
  processedFiles: Array<{ file: string; processedAt: string; pages: number }>;
  runIngest: () => Promise<IngestResult>;
  requeueBatch: (file: string) => Promise<IngestResult>;
};

export function ContentIngestPanel({ inboxFiles, processedFiles, runIngest, requeueBatch }: ContentIngestPanelProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <p className="text-xs uppercase text-gray-400">Inbox</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {inboxFiles.length === 0 && <li className="text-gray-500">No new batch files.</li>}
          {inboxFiles.map((file) => (
            <li key={file} className="rounded-md border border-gray-100 px-3 py-2">
              {file}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setMessage("");
            startTransition(async () => {
              const result = await runIngest();
              setMessage(result.message);
            });
          }}
          className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          disabled={isPending}
        >
          Run Ingest
        </button>
        {message && <p className="mt-2 text-xs text-gray-600">{message}</p>}
      </div>

      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <p className="text-xs uppercase text-gray-400">Processed</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {processedFiles.length === 0 && <li className="text-gray-500">No processed batches yet.</li>}
          {processedFiles.map((entry) => (
            <li key={entry.file} className="rounded-md border border-gray-100 px-3 py-2">
              <div className="font-medium">{entry.file}</div>
              <div className="text-xs text-gray-500">
                {entry.pages} pages · {entry.processedAt}
              </div>
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  startTransition(async () => {
                    const result = await requeueBatch(entry.file);
                    setMessage(result.message);
                  });
                }}
                className="mt-2 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:border-gray-300"
                disabled={isPending}
              >
                Requeue
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
