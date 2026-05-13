"use client";

import { useEffect, useState, type ReactNode } from "react";
import { slugify } from "@/lib/slug";
import MediaPicker from "@/components/admin/MediaPicker";
import RichEditor from "@/components/admin/RichEditor";

type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  heroImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  published: boolean;
  updatedAt: string;
};

type FormState = {
  slug: string;
  title: string;
  content: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
};

const EMPTY_FORM: FormState = {
  slug: "",
  title: "",
  content: "",
  heroImage: "",
  seoTitle: "",
  seoDescription: "",
  published: true,
};

export default function PagesClient() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/pages");
    if (res.ok) setPages(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  function startEdit(p: Page) {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      content: p.content,
      heroImage: p.heroImage ?? "",
      seoTitle: p.seoTitle ?? "",
      seoDescription: p.seoDescription ?? "",
      published: p.published,
    });
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const url = editing ? `/api/admin/pages/${editing.id}` : "/api/admin/pages";
    const method = editing ? "PATCH" : "POST";
    const body = {
      slug: slugify(form.title),
      title: form.title.trim(),
      content: form.content,
      heroImage: form.heroImage || null,
      seoTitle: form.seoTitle.trim() || null,
      seoDescription: form.seoDescription.trim() || null,
      published: form.published,
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      await load();
      startCreate();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erreur");
    }
    setBusy(false);
  }

  async function remove(p: Page) {
    if (!confirm(`Supprimer la page "${p.title}" ?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/pages/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      if (editing?.id === p.id) startCreate();
      await load();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Suppression impossible");
    }
    setBusy(false);
  }

  let submitLabel = "Créer";
  if (busy) submitLabel = "...";
  else if (editing) submitLabel = "Enregistrer";

  let pageListContent: ReactNode;
  if (loading) {
    pageListContent = (
      <div className="p-8 text-center text-slate-500 text-sm">Chargement…</div>
    );
  } else if (pages.length === 0) {
    pageListContent = (
      <div className="p-8 text-center text-slate-500 text-sm">Aucune page. Créez la première à droite.</div>
    );
  } else {
    pageListContent = (
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Titre / slug</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {pages.map((p) => (
            <tr key={p.id} className={editing?.id === p.id ? "bg-primary-50/40" : ""}>
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">{p.title}</div>
                <div className="text-xs text-slate-500">/{p.slug}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                  {p.published ? "Publié" : "Brouillon"}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => startEdit(p)}
                  className="text-primary-600 hover:underline text-xs font-medium"
                >
                  Éditer
                </button>
                <button
                  onClick={() => remove(p)}
                  className="text-red-600 hover:underline text-xs font-medium"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="text-slate-600 text-sm">Pages statiques éditables (à propos, contact, etc.)</p>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
        >
          + Nouvelle page
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          {pageListContent}
        </div>

        <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 h-fit">
          <h2 className="font-semibold text-slate-900">
            {editing ? `Édition : ${editing.title}` : "Nouvelle page"}
          </h2>

          <div>
            <label htmlFor="page-title" className="block text-xs font-medium text-slate-600 mb-1">Titre *</label>
            <input
              id="page-title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <p className="block text-xs font-medium text-slate-600 mb-1">Image principale</p>
            <MediaPicker
              value={form.heroImage}
              onChange={(url) => setForm({ ...form, heroImage: url })}
            />
          </div>

          <div>
            <label htmlFor="page-slug" className="block text-xs font-medium text-slate-600 mb-1">Slug (auto)</label>
            <input
              id="page-slug"
              value={slugify(form.title) || form.slug}
              readOnly
              placeholder="a-propos"
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg text-sm font-mono"
            />
          </div>

          <div>
            <p className="block text-xs font-medium text-slate-600 mb-1">Contenu</p>
            <RichEditor
              value={form.content}
              onChange={(v) => setForm({ ...form, content: v })}
              placeholder="Rédigez le contenu de la page…"
            />
          </div>

          <div>
            <label htmlFor="page-seoTitle" className="block text-xs font-medium text-slate-600 mb-1">SEO Title</label>
            <input
              id="page-seoTitle"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label htmlFor="page-seoDescription" className="block text-xs font-medium text-slate-600 mb-1">SEO Description</label>
            <textarea
              id="page-seoDescription"
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            <span>Publié</span>
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50"
            >
              {submitLabel}
            </button>
            {editing && (
              <button
                type="button"
                onClick={startCreate}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
