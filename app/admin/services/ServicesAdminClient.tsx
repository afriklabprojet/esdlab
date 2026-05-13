"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string | null;
  image: string | null;
  features: string | null; // JSON string
  order: number;
  published: boolean;
  updatedAt: Date | string;
}

interface ServiceEditState {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[]; // tableau en mémoire
  order: number;
  published: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function parseFeatures(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Sous-composants admin ─────────────────────────────────────────────────────
const inp = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";
const ta  = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1.5">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}

// ─── Panel d'édition inline ────────────────────────────────────────────────────
interface EditPanelProps {
  service: ServiceRow;
  onSave: (id: string, data: Partial<ServiceEditState>) => Promise<void>;
  onClose: () => void;
  saving: boolean;
}

function EditPanel({ service, onSave, onClose, saving }: EditPanelProps) {
  const [form, setForm] = useState<ServiceEditState>({
    title: service.title,
    subtitle: service.subtitle ?? "",
    description: service.description ?? "",
    image: service.image ?? "",
    features: parseFeatures(service.features),
    order: service.order,
    published: service.published,
  });
  const [newFeature, setNewFeature] = useState("");

  function set<K extends keyof ServiceEditState>(k: K, v: ServiceEditState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function addFeature() {
    const trimmed = newFeature.trim();
    if (!trimmed) return;
    set("features", [...form.features, trimmed]);
    setNewFeature("");
  }

  function removeFeature(idx: number) {
    set("features", form.features.filter((_, i) => i !== idx));
  }

  function updateFeature(idx: number, val: string) {
    set("features", form.features.map((f, i) => (i === idx ? val : f)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(service.id, form);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-end p-4 sm:p-6" onClick={onClose}>
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[calc(100vh-3rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="font-bold text-slate-900">Éditer le service</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">{service.slug}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-xl font-bold"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">

          {/* Identité */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Identité</h3>

            <div>
              <FieldLabel label="Titre" />
              <input className={inp} value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>

            <div>
              <FieldLabel label="Sous-titre" hint="Accroche courte affichée sous le titre." />
              <input className={inp} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
            </div>

            <div>
              <FieldLabel label="Description" hint="Texte principal du service." />
              <textarea className={ta} rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Image de bannière</h3>
            <MediaPicker accept="image" value={form.image} onChange={(v) => set("image", v)} />
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Caractéristiques <span className="text-slate-300 font-normal">({form.features.length})</span>
            </h3>

            <div className="space-y-2">
              {form.features.map((feat, i) => (
                <div key={`feat-${i}`} className="flex gap-2 items-center">
                  <input
                    className={inp}
                    value={feat}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder={`Caractéristique ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition text-xl font-bold"
                    aria-label="Supprimer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Ajouter */}
            <div className="flex gap-2">
              <input
                className={inp}
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                placeholder="Nouvelle caractéristique…"
              />
              <button
                type="button"
                onClick={addFeature}
                className="flex-shrink-0 px-3 py-2 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition"
              >
                + Ajouter
              </button>
            </div>
          </div>

          {/* Ordre & Publié */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel label="Ordre d'affichage" />
              <input
                className={inp}
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value) || 0)}
              />
            </div>
            <div className="flex flex-col justify-end pb-0.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={form.published}
                    onChange={(e) => set("published", e.target.checked)}
                  />
                  <div className="w-10 h-6 bg-slate-200 peer-checked:bg-emerald-500 rounded-full transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {form.published ? "Publié" : "Brouillon"}
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition"
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
            >
              Annuler
            </button>
            <Link
              href={`/admin/services/${service.id}`}
              className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-sm font-medium transition whitespace-nowrap"
            >
              Édition complète ↗
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Ligne de service dans le tableau ─────────────────────────────────────────
interface ServiceRowProps {
  service: ServiceRow;
  busyId: string | null;
  onToggle: (s: ServiceRow) => void;
  onEdit: (s: ServiceRow) => void;
  onRemove: (s: ServiceRow) => void;
}

function ServiceTableRow({ service: s, busyId, onToggle, onEdit, onRemove }: ServiceRowProps) {
  const isBusy = busyId === s.id;
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      {/* Ordre */}
      <td className="px-4 py-3.5 w-12">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
          {s.order}
        </span>
      </td>

      {/* Image miniature */}
      <td className="px-2 py-3.5 w-14">
        {s.image ? (
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
            <Image src={s.image} alt={s.title} fill sizes="44px" className="object-cover" />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A.75.75 0 0021.75 19.5V5.25A.75.75 0 0021 4.5H3A.75.75 0 002.25 5.25v14.25A.75.75 0 003 20.25z" />
            </svg>
          </div>
        )}
      </td>

      {/* Titre / slug */}
      <td className="px-4 py-3.5">
        <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
        {s.subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{s.subtitle}</p>}
        <p className="text-xs text-slate-400 font-mono mt-0.5">/services/{s.slug}</p>
      </td>

      {/* Dernière modif */}
      <td className="hidden sm:table-cell px-4 py-3.5 text-xs text-slate-400">
        {formatDate(s.updatedAt)}
      </td>

      {/* Toggle publié */}
      <td className="px-4 py-3.5">
        <button
          onClick={() => onToggle(s)}
          disabled={isBusy}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
            s.published
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          } disabled:opacity-50`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${s.published ? "bg-emerald-500" : "bg-slate-400"}`} />
          {s.published ? "Publié" : "Brouillon"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(s)}
            disabled={isBusy}
            className="px-3 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition disabled:opacity-50"
          >
            Éditer
          </button>
          <Link
            href={`/services/${s.slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
            title="Voir sur le site"
          >
            ↗
          </Link>
          <button
            onClick={() => onRemove(s)}
            disabled={isBusy}
            className="px-2.5 py-1.5 text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
            title="Supprimer"
          >
            ×
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────────
interface ServicesAdminClientProps {
  readonly initialServices: ServiceRow[];
}

export default function ServicesAdminClient({ initialServices }: ServicesAdminClientProps) {
  const [services, setServices] = useState<ServiceRow[]>(initialServices);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  }

  // Toggle publié ───────────────────────────────────────────────────────────────
  async function togglePublished(s: ServiceRow) {
    setBusyId(s.id);
    const res = await fetch(`/api/admin/services/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !s.published }),
    });
    if (res.ok) {
      setServices((arr) => arr.map((x) => (x.id === s.id ? { ...x, published: !s.published } : x)));
      showToast("ok", `"${s.title}" ${!s.published ? "publié" : "repassé en brouillon"}.`);
    } else {
      showToast("err", "Impossible de modifier le statut.");
    }
    setBusyId(null);
  }

  // Supprimer ───────────────────────────────────────────────────────────────────
  async function remove(s: ServiceRow) {
    if (!confirm(`Supprimer définitivement "${s.title}" ?`)) return;
    setBusyId(s.id);
    const res = await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
    if (res.ok) {
      setServices((arr) => arr.filter((x) => x.id !== s.id));
      showToast("ok", `"${s.title}" supprimé.`);
    } else {
      showToast("err", "Suppression échouée.");
    }
    setBusyId(null);
  }

  // Sauvegarde inline ───────────────────────────────────────────────────────────
  const saveEdit = useCallback(async (id: string, data: Partial<ServiceEditState>) => {
    setSavingEdit(true);
    const payload = {
      ...data,
      features: data.features ? JSON.stringify(data.features) : undefined,
    };
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSavingEdit(false);
    if (res.ok) {
      const updated = await res.json().catch(() => null);
      setServices((arr) =>
        arr.map((x) =>
          x.id === id
            ? {
                ...x,
                title: data.title ?? x.title,
                subtitle: data.subtitle ?? x.subtitle,
                description: data.description ?? x.description,
                image: data.image ?? x.image,
                features: data.features ? JSON.stringify(data.features) : x.features,
                order: data.order ?? x.order,
                published: data.published ?? x.published,
                updatedAt: updated?.updatedAt ?? x.updatedAt,
              }
            : x,
        ),
      );
      setEditingService(null);
      showToast("ok", "Service enregistré.");
    } else {
      showToast("err", "Erreur lors de la sauvegarde.");
    }
  }, []);

  const published = services.filter((s) => s.published).length;
  const drafts    = services.length - published;

  return (
    <div className="p-6 lg:p-8 max-w-5xl">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="text-emerald-600 font-semibold">{published} publié{published > 1 ? "s" : ""}</span>
            {drafts > 0 && <span className="text-slate-400"> · {drafts} brouillon{drafts > 1 ? "s" : ""}</span>}
            <a href="/services" target="_blank" rel="noreferrer" className="ml-2 text-primary-700 hover:underline font-medium">
              Voir sur le site ↗
            </a>
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold transition shadow-sm"
        >
          <span className="text-base leading-none font-bold">+</span> Nouveau service
        </Link>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
          toast.type === "ok"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          <span className="font-bold">{toast.type === "ok" ? "✓" : "✕"}</span>
          {toast.text}
        </div>
      )}

      {/* ── Tableau ─────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-2 py-3 w-14" />
              <th className="px-4 py-3">Service</th>
              <th className="hidden sm:table-cell px-4 py-3">Modifié</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((s) => (
              <ServiceTableRow
                key={s.id}
                service={s}
                busyId={busyId}
                onToggle={togglePublished}
                onEdit={setEditingService}
                onRemove={remove}
              />
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium">Aucun service configuré.</p>
                    <Link href="/admin/services/new" className="text-sm text-primary-700 hover:underline font-semibold">
                      Créer le premier service →
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Note bas de page ──────────────────────────────────────────────── */}
      <p className="mt-4 text-xs text-slate-400">
        Cliquez sur <strong className="text-slate-600">Éditer</strong> pour modifier un service en panneau latéral.
        Utilisez <strong className="text-slate-600">Édition complète</strong> pour accéder à tous les champs (SEO, bénéfices, technologies…).
      </p>

      {/* ── Panel d'édition inline ────────────────────────────────────────── */}
      {editingService && (
        <EditPanel
          service={editingService}
          onSave={saveEdit}
          onClose={() => setEditingService(null)}
          saving={savingEdit}
        />
      )}
    </div>
  );
}
