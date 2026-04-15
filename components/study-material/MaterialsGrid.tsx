"use client";

// CSS :target modal — no React state needed.
// Each material has a hidden modal div with id="preview-{id}".
// The Preview button is <a href="#preview-{id}">.
// CSS [id]:target shows it. Close button is <a href="#close">.

import { useEffect, useState } from "react";
import type { StudyMaterial, MaterialType } from "@/lib/study-material";
import { MATERIAL_TYPE_META } from "@/lib/study-material";

type Props = {
  materials: StudyMaterial[];
};

function getPreviewUrl(material: StudyMaterial, origin: string): string {
  const url = material.fileUrl;
  if (!url || url === "#") return "";
  // Build absolute URL so remote viewers (Office Online, Google Docs) can fetch the file
  const absUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `${origin}${url}`;
  if (material.type === "ppt") {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absUrl)}`;
  }
  return `https://docs.google.com/viewer?url=${encodeURIComponent(absUrl)}&embedded=true`;
}

const TYPE_ORDER: MaterialType[] = ["pdf_notes", "question_notes", "ppt", "video"];

export function MaterialsGrid({ materials }: Props) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const sorted = [...materials].sort(
    (a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)
  );

  return (
    <>
      {/* Flat horizontal grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((material) => {
          const meta = MATERIAL_TYPE_META[material.type];
          return (
            <div
              key={material.id}
              className="group flex flex-col rounded-2xl border border-ink/8 bg-white p-4 shadow-glow transition hover:border-ink/15 hover:shadow-md"
            >
              {/* Top row: icon + type label */}
              <div className="flex items-center gap-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${meta.bgColor}`}>
                  {meta.icon}
                </span>
                <span className={`text-xs font-semibold ${meta.color}`}>{meta.label}</span>
              </div>

              {/* Title — fixed 2-line height so cards stay uniform */}
              <p className="mt-3 text-sm font-semibold text-ink leading-snug line-clamp-2 min-h-[2.5rem]">{material.title}</p>

              {/* Meta chips — fixed height row */}
              <div className="mt-2 flex min-h-[1.5rem] flex-wrap items-center gap-2">
                {material.size && (
                  <span className="rounded-md bg-ink/5 px-2 py-0.5 text-xs text-slate">{material.size}</span>
                )}
                {material.pageCount && (
                  <span className="rounded-md bg-ink/5 px-2 py-0.5 text-xs text-slate">{material.pageCount} pages</span>
                )}
              </div>

              {/* Preview link — always pinned to bottom, consistent style */}
              <a
                href={`#preview-${material.id}`}
                className="mt-auto pt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-ink/6 px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                </svg>
                Open Preview
              </a>
            </div>
          );
        })}
      </div>

      {/* CSS :target modals — one per material, hidden by default, shown when :target */}
      {sorted.map((material) => {
        const meta = MATERIAL_TYPE_META[material.type];
        const previewUrl = origin ? getPreviewUrl(material, origin) : "";

        return (
          <div
            key={`modal-${material.id}`}
            id={`preview-${material.id}`}
            className="material-preview-modal"
          >
            {/* Backdrop — clicking it closes modal */}
            <a
              href="#close"
              className="material-preview-backdrop"
              aria-label="Close preview"
            />

            {/* Modal panel */}
            <div className="material-preview-panel">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-ink/8 px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.bgColor} ${meta.color}`}>
                    {meta.icon} {meta.label}
                  </span>
                  <p className="truncate text-sm font-semibold text-ink">{material.title}</p>
                  {material.size && (
                    <span className="shrink-0 text-xs text-slate">{material.size}</span>
                  )}
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-2">
                  {material.fileUrl && material.fileUrl !== "#" && (
                    <a
                      href={material.fileUrl}
                      download
                      className="flex items-center gap-1.5 rounded-lg bg-ink/6 px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink/10"
                      title="Download file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                      </svg>
                      Download
                    </a>
                  )}
                  <a
                    href="#close"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate transition hover:bg-ink/8 hover:text-ink"
                    aria-label="Close preview"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Preview body */}
              <div className="flex flex-1 overflow-hidden bg-gray-50">
                {!previewUrl ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <span className="text-5xl">{meta.icon}</span>
                    <div>
                      <p className="font-heading text-lg font-bold text-ink">{material.title}</p>
                      <p className="mt-2 text-sm text-slate">Preview will be available once the file is uploaded.</p>
                      {material.size && <p className="mt-1 text-xs text-slate">File size: {material.size}</p>}
                      {material.pageCount && <p className="text-xs text-slate">{material.pageCount} pages</p>}
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={previewUrl}
                    className="h-full w-full border-0"
                    title={material.title}
                    allow="fullscreen"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
