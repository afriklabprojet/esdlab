"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Media = {
  id: string;
  filename: string;
  url: string;
  alt: string | null;
  size: number | null;
  mimeType: string | null;
  createdAt: string;
};

function formatSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

export default function MediasClient() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/medias");
      if (!res.ok) throw new Error("Chargement échoué");
      setMedias(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez un fichier");
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    if (alt) fd.append("alt", alt);
    try {
      const res = await fetch("/api/admin/medias", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload échoué");
      }
      setAlt("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce média ?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/medias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Suppression échouée");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Médias</h1>
        <p className="text-slate-600 text-sm">Images et fichiers PDF (max 8 Mo) · Vidéos MP4/WebM (max 200 Mo).</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={upload} className="mb-8 bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[240px]">
          <label htmlFor="media-file" className="block text-xs font-medium text-slate-600 mb-1">Fichier</label>
          <input
            id="media-file"
            ref={fileRef}
            type="file"
            accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime,application/pdf"
            className="block w-full text-sm text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-secondary-50 file:text-secondary-700 file:text-sm"
            required
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="media-alt" className="block text-xs font-medium text-slate-600 mb-1">Texte alternatif</label>
          <input
            id="media-alt"
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
            placeholder="Description (optionnel)"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="bg-secondary-600 text-white px-5 py-2 rounded-md hover:bg-secondary-700 disabled:opacity-50 text-sm font-medium"
        >
          {busy ? "..." : "Uploader"}
        </button>
      </form>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Chargement...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {medias.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-500 text-sm bg-white rounded-xl border border-slate-200">
              Aucun média. Uploadez le premier ci-dessus.
            </div>
          )}
          {medias.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-slate-50">
                {m.mimeType?.startsWith("image/") ? (
                  <Image
                    src={m.url}
                    alt={m.alt || m.filename}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : m.mimeType?.startsWith("video/") ? (
                  <div className="relative w-full h-full">
                    <video
                      src={m.url}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="h-8 w-8 rounded-full bg-black/50 flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">{m.mimeType || "fichier"}</div>
                )}
              </div>
              <div className="p-2 text-xs space-y-1">
                <div className="truncate font-medium text-slate-700" title={m.filename}>{m.filename}</div>
                <div className="text-slate-500">{formatSize(m.size)}</div>
                <div className="flex gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => copy(m.url)}
                    className="flex-1 px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
                    title="Copier l'URL"
                  >
                    Copier
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    disabled={busy}
                    className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 rounded disabled:opacity-50"
                  >
                    Suppr.
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
