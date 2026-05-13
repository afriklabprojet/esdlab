"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Media {
  id: string;
  url: string;
  filename: string;
  alt: string | null;
  mimeType: string | null;
  size: number | null;
}

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

interface MediaPickerProps {
  value: string;
  onChange: (url: string) => void;
  /** "image" (default) | "video" | "any" */
  accept?: "image" | "video" | "any";
}

export default function MediaPicker({ value, onChange, accept = "image" }: Readonly<MediaPickerProps>) {
  const [open, setOpen]       = useState(false);
  const [items, setItems]     = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  // filter library items by type
  const libraryItems = items.filter((m) => {
    if (accept === "image") return !m.mimeType?.startsWith("video/");
    if (accept === "video") return m.mimeType?.startsWith("video/");
    return true;
  });

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/medias")
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : d.medias ?? []))
      .finally(() => setLoading(false));
  }, [open]);

  async function handleUpload(file: File) {
    setBusy(true);
    setError(null);
    setProgress(0);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const fd  = new FormData();
      fd.append("file", file);

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      });

      xhr.addEventListener("load", async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // refresh library
          const res = await fetch("/api/admin/medias");
          const data = await res.json();
          const fresh: Media[] = Array.isArray(data) ? data : data.medias ?? [];
          setItems(fresh);
          // auto-select the uploaded file
          const uploaded = fresh.find((m) => m.filename === (JSON.parse(xhr.responseText) as Media).filename);
          if (uploaded) { onChange(uploaded.url); setOpen(false); }
          setBusy(false);
          setProgress(0);
          resolve();
        } else {
          let msg = "Upload échoué";
          try { msg = (JSON.parse(xhr.responseText) as { error: string }).error; } catch { /* ignore */ }
          setError(msg);
          setBusy(false);
          setProgress(0);
          reject(new Error(msg));
        }
      });

      xhr.addEventListener("error", () => {
        setError("Erreur réseau");
        setBusy(false);
        setProgress(0);
        reject(new Error("Erreur réseau"));
      });

      xhr.open("POST", "/api/admin/medias");
      xhr.send(fd);
    });
  }

  const inputAccept =
    accept === "video"
      ? "video/mp4,video/webm,video/ogg,video/quicktime"
      : accept === "image"
        ? "image/*,application/pdf"
        : "image/*,video/mp4,video/webm,video/ogg,video/quicktime,application/pdf";

  const isVideo = value && (value.endsWith(".mp4") || value.endsWith(".webm") || value.endsWith(".ogg") || value.endsWith(".mov"));

  return (
    <div className="space-y-2">
      {/* ── Input + boutons ─────────────────────────────────────── */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/…  ou  https://…"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium whitespace-nowrap"
        >
          Bibliothèque
        </button>
        <label className="px-3 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer">
          Uploader
          <input
            type="file"
            accept={inputAccept}
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { handleUpload(f); e.target.value = ""; }
            }}
          />
        </label>
      </div>

      {/* ── Barre de progression ────────────────────────────────── */}
      {busy && (
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">{progress < 100 ? `Envoi… ${progress}%` : "Traitement…"}</p>
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* ── Aperçu ──────────────────────────────────────────────── */}
      {value && !busy && (
        <div className="relative w-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          {isVideo ? (
            <video
              src={value}
              muted
              controls
              preload="metadata"
              className="w-full max-h-28 object-cover"
            />
          ) : (
            <div className="relative w-48 h-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="aperçu" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* ── Modal bibliothèque ───────────────────────────────────── */}
      {open && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 m-0 max-w-none max-h-none w-screen h-screen"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">
                  {accept === "video" ? "Choisir une vidéo" : accept === "image" ? "Choisir une image" : "Choisir un fichier"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {accept === "video" ? "Formats acceptés : MP4, WebM, OGG, MOV — max 200 Mo" : "Formats acceptés : JPG, PNG, WebP, GIF, SVG, PDF — max 8 Mo"}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-900 text-xl font-bold">✕</button>
            </div>

            {/* Upload zone dans la modale */}
            <div className="px-6 py-3 border-b border-slate-100 bg-slate-50">
              <label className={`flex items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-4 cursor-pointer transition-colors ${busy ? "border-slate-200 opacity-50" : "border-primary-300 hover:border-primary-500 hover:bg-primary-50"}`}>
                <svg className="h-5 w-5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-sm font-medium text-primary-700">
                  {busy ? `Envoi en cours… ${progress}%` : "Cliquer pour uploader un nouveau fichier"}
                </span>
                <input
                  type="file"
                  accept={inputAccept}
                  disabled={busy}
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { handleUpload(f); e.target.value = ""; }
                  }}
                />
              </label>
              {busy && (
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
              )}
              {error && <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>}
            </div>

            {/* Library grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading && <p className="text-sm text-slate-500 text-center py-8">Chargement…</p>}

              {!loading && libraryItems.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  {accept === "video" ? "Aucune vidéo. Uploadez-en une ci-dessus." : "Aucun fichier. Uploadez-en un ci-dessus."}
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {libraryItems.map((m) => {
                  const isVid = m.mimeType?.startsWith("video/");
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { onChange(m.url); setOpen(false); }}
                      className="group relative aspect-video bg-slate-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary-600 transition flex flex-col"
                    >
                      {isVid ? (
                        <>
                          <video
                            src={m.url}
                            muted
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-black/50 flex items-center justify-center">
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Image src={m.url} alt={m.alt ?? m.filename} fill sizes="200px" className="object-cover" />
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white px-1.5 py-1">
                        <p className="text-[10px] truncate">{m.filename}</p>
                        {m.size && <p className="text-[9px] text-white/60">{formatSize(m.size)}</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </dialog>
      )}
    </div>
  );
}
