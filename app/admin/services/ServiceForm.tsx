"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";
import { slugify } from "@/lib/slug";
import RichEditor from "@/components/admin/RichEditor";

export interface ServiceFormValues {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  color: string;
  features: string[];
  benefits: { title: string; description: string }[];
  process: string[];
  technologies: string[];
  order: number;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const EMPTY_SERVICE: ServiceFormValues = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  longDescription: "",
  image: "",
  icon: "",
  color: "",
  features: [],
  benefits: [],
  process: [],
  technologies: [],
  order: 0,
  published: true,
  seoTitle: "",
  seoDescription: "",
};

interface ServiceFormProps {
  readonly initial: ServiceFormValues;
  readonly mode: "create" | "edit";
}

export default function ServiceForm({ initial, mode }: ServiceFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ServiceFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ServiceFormValues>(k: K, v: ServiceFormValues[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function updateBenefit(i: number, k: "title" | "description", v: string) {
    setForm((f) => {
      const copy = [...f.benefits];
      copy[i] = { ...copy[i], [k]: v };
      return { ...f, benefits: copy };
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const url = mode === "create" ? "/api/admin/services" : `/api/admin/services/${form.id}`;
    const method = mode === "create" ? "POST" : "PATCH";
    const payload = { ...form, slug: slugify(form.title) };
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Erreur");
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  const linesField = (label: string, key: "features" | "process" | "technologies") => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <textarea
        rows={5}
        value={form[key].join("\n")}
        onChange={(e) => set(key, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
        placeholder="Une entrée par ligne"
      />
    </div>
  );

  return (
    <form onSubmit={submit} className="p-6 lg:p-8 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/services" className="text-sm text-primary-700 hover:underline">← Retour</Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {mode === "create" ? "Nouveau service" : `Éditer : ${form.title}`}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          {saving ? "Sauvegarde..." : "Enregistrer"}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Identité</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Titre" value={form.title} onChange={(v) => set("title", v)} required />
          <div>
            <label htmlFor="service-slug-auto" className="block text-sm font-medium text-slate-700 mb-1">Slug (auto)</label>
            <input
              id="service-slug-auto"
              value={slugify(form.title) || form.slug}
              readOnly
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-600 rounded-lg text-sm font-mono"
            />
          </div>
          <Field label="Sous-titre" value={form.subtitle} onChange={(v) => set("subtitle", v)} />
          <Field label="Icône (label court)" value={form.icon} onChange={(v) => set("icon", v)} />
          <div className="md:col-span-2">
            <div className="block text-sm font-medium text-slate-700 mb-1">Image</div>
            <MediaPicker value={form.image} onChange={(v) => set("image", v)} />
          </div>
          <Field label="Couleur (Tailwind gradient)" value={form.color} onChange={(v) => set("color", v)} mono />
          <Field label="Ordre" value={String(form.order)} onChange={(v) => set("order", Number(v) || 0)} />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set("published", e.target.checked)}
                className="w-4 h-4"
              />
              <span>Publié</span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Contenu</h2>
        <Textarea label="Description courte" value={form.description} onChange={(v) => set("description", v)} rows={3} />
        <div>
          <p className="block text-sm font-medium text-slate-700 mb-1">Description longue</p>
          <RichEditor
            value={form.longDescription}
            onChange={(v) => set("longDescription", v)}
            placeholder="Décrivez le service en détail…"
          />
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Listes</h2>
        {linesField("Caractéristiques (une par ligne)", "features")}
        {linesField("Étapes du process", "process")}
        {linesField("Technologies", "technologies")}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Bénéfices</h2>
          <button
            type="button"
            onClick={() => set("benefits", [...form.benefits, { title: "", description: "" }])}
            className="text-sm text-primary-700 hover:underline"
          >
            + Ajouter
          </button>
        </div>
        {form.benefits.map((b, i) => (
          <div key={`benefit-${b.title}-${b.description}`} className="grid md:grid-cols-2 gap-3 p-3 border border-slate-200 rounded-lg">
            <Field label="Titre" value={b.title} onChange={(v) => updateBenefit(i, "title", v)} />
            <Field label="Description" value={b.description} onChange={(v) => updateBenefit(i, "description", v)} />
            <button
              type="button"
              onClick={() => set("benefits", form.benefits.filter((_, j) => j !== i))}
              className="text-xs text-red-600 hover:underline col-span-full text-left"
            >
              Supprimer ce bénéfice
            </button>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">SEO</h2>
        <Field label="Titre SEO" value={form.seoTitle} onChange={(v) => set("seoTitle", v)} />
        <Textarea label="Description SEO" value={form.seoDescription} onChange={(v) => set("seoDescription", v)} rows={2} />
      </section>
    </form>
  );
}

interface FieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (v: string) => void;
  readonly required?: boolean;
  readonly mono?: boolean;
}

function Field({ label, value, onChange, required, mono }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}

interface TextareaProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (v: string) => void;
  readonly rows?: number;
}

function Textarea({ label, value, onChange, rows = 4 }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
      />
    </div>
  );
}
