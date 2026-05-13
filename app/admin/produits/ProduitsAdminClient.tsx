"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string | null;
  image: string | null;
  gallery: string;
  iconKey: string | null;
  features: string;
  benefits: string;
  useCases: string;
  specs: string;
  relatedSlugs: string;
  order: number;
  published: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: Date | string;
}

interface EditState {
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  iconKey: string;
  features: string[];
  benefits: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  order: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

function parseJson<T>(raw: string, fallback: T): T {
  try { const v = JSON.parse(raw); return v ?? fallback; } catch { return fallback; }
}
function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}
function rowToEdit(p: ProductRow): EditState {
  return {
    name: p.name,
    kicker: p.kicker,
    tagline: p.tagline,
    description: p.description,
    longDescription: p.longDescription ?? "",
    image: p.image ?? "",
    iconKey: p.iconKey ?? "screen",
    features: parseJson<string[]>(p.features, []),
    benefits: parseJson<{ title: string; description: string }[]>(p.benefits, []),
    useCases: parseJson<{ title: string; description: string }[]>(p.useCases, []),
    specs: parseJson<{ label: string; value: string }[]>(p.specs, []),
    order: p.order,
    published: p.published,
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
  };
}

const inp = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";
const ta  = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";

function Label({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1.5">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}

export default function ProduitsAdminClient({ initialProducts }: { initialProducts: ProductRow[] }) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [form, setForm] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [creating, setCreating] = useState(false);
  const [newSlug, setNewSlug] = useState("");

  function notify(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  function openEdit(p: ProductRow) {
    setEditing(p);
    setForm(rowToEdit(p));
  }

  function closePanel() {
    setEditing(null);
    setForm(null);
  }

  function setField<K extends keyof EditState>(k: K, v: EditState[K]) {
    setForm((f) => f ? { ...f, [k]: v } : f);
  }

  async function togglePublished(p: ProductRow) {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    if (res.ok) {
      setProducts((prev) => prev.map((r) => r.id === p.id ? { ...r, published: !r.published } : r));
      notify(`Produit ${!p.published ? "publié" : "dépublié"}`);
    }
  }

  async function saveProduct() {
    if (!editing || !form) return;
    setSaving(true);
    const payload = {
      ...form,
      features: JSON.stringify(form.features),
      benefits: JSON.stringify(form.benefits),
      useCases: JSON.stringify(form.useCases),
      specs: JSON.stringify(form.specs),
    };
    const res = await fetch(`/api/admin/products/${editing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json() as ProductRow;
      setProducts((prev) => prev.map((r) => r.id === editing.id ? updated : r));
      closePanel();
      notify("Produit mis à jour !");
    } else {
      notify("Erreur lors de la sauvegarde", "error");
    }
  }

  async function deleteProduct(p: ProductRow) {
    if (!confirm(`Supprimer "${p.name}" ? Cette action est irréversible.`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((r) => r.id !== p.id));
      if (editing?.id === p.id) closePanel();
      notify("Produit supprimé");
    } else {
      notify("Erreur lors de la suppression", "error");
    }
  }

  async function createProduct() {
    if (!newSlug.trim()) return;
    setCreating(true);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: newSlug.trim().toLowerCase().replace(/\s+/g, "-"),
        name: "Nouveau produit",
        kicker: "",
        tagline: "",
        description: "",
        order: products.length,
      }),
    });
    setCreating(false);
    if (res.ok) {
      const created = await res.json() as ProductRow;
      setProducts((prev) => [...prev, created]);
      setNewSlug("");
      openEdit(created);
      notify("Produit créé !");
    } else {
      notify("Erreur lors de la création", "error");
    }
  }

  /* ── List item component ──────────────────────────────────────── */
  function ProductRow({ p }: { p: ProductRow }) {
    return (
      <div className={`flex items-center gap-4 rounded-2xl border bg-white p-4 transition hover:shadow-md ${editing?.id === p.id ? "border-primary-400 ring-2 ring-primary-100" : "border-slate-100"}`}>
        {/* Thumbnail */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary-50">
          {p.image
            ? <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
            : <div className="flex h-full w-full items-center justify-center text-secondary-400">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
          }
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-slate-900 truncate">{p.name}</p>
            <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase ${p.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {p.published ? "Publié" : "Brouillon"}
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate">/produits/{p.slug} · Mis à jour {formatDate(p.updatedAt)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/produits/${p.slug}`} target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
            title="Voir la page">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <button type="button" onClick={() => togglePublished(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${p.published ? "border-green-200 bg-green-50 text-green-600 hover:bg-green-100" : "border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
            title={p.published ? "Dépublier" : "Publier"}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.published ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
            </svg>
          </button>
          <button type="button" onClick={() => openEdit(p)}
            className="flex h-8 px-3 items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 text-primary-700 text-xs font-semibold hover:bg-primary-100 transition">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Modifier
          </button>
          <button type="button" onClick={() => deleteProduct(p)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition" title="Supprimer">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  /* ── String list editor ───────────────────────────────────────── */
  function StringListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inp}
              value={item}
              onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
              placeholder={placeholder}
            />
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="px-2.5 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition text-lg leading-none">×</button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, ""])}
          className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition">+ Ajouter</button>
      </div>
    );
  }

  /* ── Key-value list editor ────────────────────────────────────── */
  function KvListEditor({ items, onChange, keyPlaceholder, valuePlaceholder }: {
    items: { title?: string; label?: string; description?: string; value?: string }[];
    onChange: (v: typeof items) => void;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
  }) {
    const key = "title" in (items[0] ?? {}) ? "title" : "label";
    const val = "description" in (items[0] ?? {}) ? "description" : "value";
    return (
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 space-y-1.5">
              <input className={inp} value={(item as Record<string, string>)[key] ?? ""} placeholder={keyPlaceholder ?? "Titre"}
                onChange={(e) => { const n = [...items] as Record<string, string>[]; n[i] = { ...n[i], [key]: e.target.value }; onChange(n as typeof items); }} />
              <textarea rows={2} className={ta} value={(item as Record<string, string>)[val] ?? ""} placeholder={valuePlaceholder ?? "Description"}
                onChange={(e) => { const n = [...items] as Record<string, string>[]; n[i] = { ...n[i], [val]: e.target.value }; onChange(n as typeof items); }} />
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="mt-1 px-2.5 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition text-lg leading-none">×</button>
          </div>
        ))}
        <button type="button"
          onClick={() => onChange([...items, key === "title" ? { title: "", description: "" } as Record<string, string> : { label: "", value: "" } as Record<string, string>] as typeof items)}
          className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition">+ Ajouter</button>
      </div>
    );
  }

  /* ── Layout ───────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-xl px-5 py-3 text-sm font-semibold shadow-xl ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produits</h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.length} produit{products.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="slug-du-produit"
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            onKeyDown={(e) => e.key === "Enter" && createProduct()}
          />
          <button
            type="button"
            onClick={createProduct}
            disabled={creating || !newSlug.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition disabled:opacity-50"
          >
            {creating ? "Création…" : "+ Nouveau produit"}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_440px]">

        {/* Products list */}
        <div className="space-y-3">
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 text-slate-400">
              <p className="font-semibold">Aucun produit</p>
              <p className="text-sm mt-1">Créez votre premier produit ci-dessus</p>
            </div>
          )}
          {products.map((p) => <ProductRow key={p.id} p={p} />)}
        </div>

        {/* Edit panel */}
        {editing && form && (
          <div className="h-fit rounded-2xl border border-slate-100 bg-white shadow-xl overflow-hidden sticky top-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-primary-700 to-primary-800 px-5 py-4">
              <p className="font-bold text-white">Modifier le produit</p>
              <button type="button" onClick={closePanel} className="text-white/70 hover:text-white transition text-xl leading-none">×</button>
            </div>

            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-5 space-y-6">

              {/* Identité */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Identité</p>
                <div className="space-y-4">
                  <div>
                    <Label label="Nom du produit" />
                    <input className={inp} value={form.name} onChange={(e) => setField("name", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label label="Kicker" hint="Ex: Accueil, paiement" />
                      <input className={inp} value={form.kicker} onChange={(e) => setField("kicker", e.target.value)} />
                    </div>
                    <div>
                      <Label label="Icône" hint="kiosk, chevalet, screen, vitrine" />
                      <input className={inp} value={form.iconKey} onChange={(e) => setField("iconKey", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label label="Tagline" hint="Phrase d'accroche courte" />
                    <input className={inp} value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} />
                  </div>
                  <div>
                    <Label label="Description courte" />
                    <textarea rows={3} className={ta} value={form.description} onChange={(e) => setField("description", e.target.value)} />
                  </div>
                  <div>
                    <Label label="Description longue" hint="Affiché sur la page détail" />
                    <textarea rows={5} className={ta} value={form.longDescription} onChange={(e) => setField("longDescription", e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Image principale</p>
                <MediaPicker
                  value={form.image}
                  onChange={(url) => setField("image", url)}
                />
              </div>

              {/* Fonctionnalités */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Fonctionnalités</p>
                <StringListEditor
                  items={form.features}
                  onChange={(v) => setField("features", v)}
                  placeholder="Ex: Interface tactile multi-points"
                />
              </div>

              {/* Avantages */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Avantages (bénéfices)</p>
                <KvListEditor
                  items={form.benefits}
                  onChange={(v) => setField("benefits", v as EditState["benefits"])}
                  keyPlaceholder="Titre de l'avantage"
                  valuePlaceholder="Description de l'avantage"
                />
              </div>

              {/* Cas d'usage */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Cas d&apos;usage</p>
                <KvListEditor
                  items={form.useCases}
                  onChange={(v) => setField("useCases", v as EditState["useCases"])}
                  keyPlaceholder="Titre du cas d'usage"
                  valuePlaceholder="Description"
                />
              </div>

              {/* Spécifications */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Spécifications techniques</p>
                <KvListEditor
                  items={form.specs}
                  onChange={(v) => setField("specs", v as EditState["specs"])}
                  keyPlaceholder="Label (ex: Taille écran)"
                  valuePlaceholder="Valeur (ex: 43 pouces)"
                />
              </div>

              {/* SEO */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">SEO</p>
                <div className="space-y-3">
                  <div>
                    <Label label="Titre SEO" hint="Laissez vide pour utiliser le nom du produit" />
                    <input className={inp} value={form.seoTitle} onChange={(e) => setField("seoTitle", e.target.value)} />
                  </div>
                  <div>
                    <Label label="Description SEO" />
                    <textarea rows={2} className={ta} value={form.seoDescription} onChange={(e) => setField("seoDescription", e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Paramètres */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Paramètres</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label label="Ordre d'affichage" />
                    <input type="number" className={inp} value={form.order} onChange={(e) => setField("order", parseInt(e.target.value) || 0)} />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setField("published", !form.published)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{form.published ? "Publié" : "Brouillon"}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save footer */}
            <div className="border-t border-slate-100 px-5 py-4 flex gap-3">
              <button type="button" onClick={closePanel} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Annuler
              </button>
              <button type="button" onClick={saveProduct} disabled={saving}
                className="flex-1 rounded-xl bg-primary-600 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition disabled:opacity-60">
                {saving ? "Sauvegarde…" : "Enregistrer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
