"use client";

import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

// ─── Types ────────────────────────────────────────────────────────────────────
type Value = { icon: string; title: string; description: string };
type Stat  = { number: string; label: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseArr<T>(raw: string | undefined, fb: T[]): T[] {
  if (!raw?.trim()) return fb;
  try {
    const p = JSON.parse(raw) as unknown;
    return Array.isArray(p) ? (p as T[]) : fb;
  } catch { return fb; }
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const inp = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";
const ta  = "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition";

// ─── Primitives ───────────────────────────────────────────────────────────────
function Field({ label, hint, children }: Readonly<{ label: string; hint?: string; children: React.ReactNode }>) {
  return (
    <div className="space-y-1.5">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Card({ title, description, children }: Readonly<{ title: string; description?: string; children: React.ReactNode }>) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  );
}

function AddBtn({ label, onClick }: Readonly<{ label: string; onClick: () => void }>) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 transition">
      <span className="text-lg leading-none">+</span> {label}
    </button>
  );
}

function RemoveBtn({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button type="button" onClick={onClick} title="Supprimer"
      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition text-xl font-bold">
      ×
    </button>
  );
}

// ─── Values editor ────────────────────────────────────────────────────────────
function ValuesEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<Value>(value, []);
  const update = (idx: number, field: keyof Value, val: string) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { icon: "", title: "", description: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Valeur {i + 1}</p>
            <RemoveBtn onClick={() => remove(i)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Icône" hint='Emoji ou code (ex : "⚡", "🎯").'>
              <input className={inp} placeholder="⚡" value={it.icon}
                onChange={(e) => update(i, "icon", e.target.value)} />
            </Field>
            <Field label="Titre">
              <input className={inp} placeholder="Innovation" value={it.title}
                onChange={(e) => update(i, "title", e.target.value)} />
            </Field>
          </div>
          <Field label="Description">
            <textarea className={ta} rows={2} placeholder="Nous repoussons les limites…" value={it.description}
              onChange={(e) => update(i, "description", e.target.value)} />
          </Field>
        </div>
      ))}
      <AddBtn label="Ajouter une valeur" onClick={add} />
    </div>
  );
}

// ─── Stats editor ─────────────────────────────────────────────────────────────
function StatsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<Stat>(value, []);
  const update = (idx: number, field: keyof Stat, val: string) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { number: "", label: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-2">
      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_32px] gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wide px-1">
        <span>Chiffre</span><span>Libellé</span><span />
      </div>
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_32px] gap-2 items-center">
          <input className={inp} placeholder="500+" value={it.number}
            onChange={(e) => update(i, "number", e.target.value)} />
          <input className={inp} placeholder="Clients satisfaits" value={it.label}
            onChange={(e) => update(i, "label", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter une statistique" onClick={add} />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface AboutAdminClientProps {
  readonly initial: Record<string, string>;
}

export default function AboutAdminClient({ initial }: AboutAdminClientProps) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function handleChange(key: string, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setMsg({ type: "ok", text: "Modifications enregistrées — visibles sur le site." });
        setTimeout(() => setMsg(null), 4000);
      } else {
        setMsg({ type: "err", text: "Erreur lors de la sauvegarde." });
      }
    } catch {
      setMsg({ type: "err", text: "Impossible de contacter le serveur." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">À propos</h1>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez les contenus de la page À propos.{" "}
            <a href="/a-propos" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir la page ↗
            </a>
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {msg && (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
          msg.type === "ok"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}>
          <span className="font-bold">{msg.type === "ok" ? "✓" : "✕"}</span>
          {msg.text}
        </div>
      )}

      {/* ── Card 1 : Hero ──────────────────────────────────────────────────── */}
      <Card title="Hero" description="Sous-titre affiché dans la bannière principale de la page.">
        <Field label="Sous-titre du hero" hint='Ex : "Nous transformons vos idées en solutions digitales."'>
          <textarea className={ta} rows={3}
            value={values["about.hero_subtitle"] ?? ""}
            onChange={(e) => handleChange("about.hero_subtitle", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Card 2 : Mission ───────────────────────────────────────────────── */}
      <Card title="Mission" description="Titre, paragraphes et image de la section Mission.">
        <Field label="Titre de la section">
          <input className={inp}
            value={values["about.mission_title"] ?? ""}
            onChange={(e) => handleChange("about.mission_title", e.target.value)}
          />
        </Field>
        <Field label="Paragraphe 1">
          <textarea className={ta} rows={3}
            value={values["about.mission_p1"] ?? ""}
            onChange={(e) => handleChange("about.mission_p1", e.target.value)}
          />
        </Field>
        <Field label="Paragraphe 2">
          <textarea className={ta} rows={3}
            value={values["about.mission_p2"] ?? ""}
            onChange={(e) => handleChange("about.mission_p2", e.target.value)}
          />
        </Field>
        <Field label="Paragraphe 3">
          <textarea className={ta} rows={3}
            value={values["about.mission_p3"] ?? ""}
            onChange={(e) => handleChange("about.mission_p3", e.target.value)}
          />
        </Field>
        <Field label="Image de la section Mission">
          <MediaPicker
            accept="image"
            value={values["about.mission_image"] ?? ""}
            onChange={(v) => handleChange("about.mission_image", v)}
          />
        </Field>
      </Card>

      {/* ── Card 3 : Notre approche — images ──────────────────────────────── */}
      <Card title="Notre approche — images" description='Images des trois étapes : "Créez", "Planifiez" et "Diffusez".'>
        <div className="grid sm:grid-cols-3 gap-6">
          <Field label="Image — Créez">
            <MediaPicker
              accept="image"
              value={values["about.creez_image"] ?? ""}
              onChange={(v) => handleChange("about.creez_image", v)}
            />
          </Field>
          <Field label="Image — Planifiez">
            <MediaPicker
              accept="image"
              value={values["about.planifiez_image"] ?? ""}
              onChange={(v) => handleChange("about.planifiez_image", v)}
            />
          </Field>
          <Field label="Image — Diffusez">
            <MediaPicker
              accept="image"
              value={values["about.diffusez_image"] ?? ""}
              onChange={(v) => handleChange("about.diffusez_image", v)}
            />
          </Field>
        </div>
      </Card>

      {/* ── Card 4 : Valeurs ───────────────────────────────────────────────── */}
      <Card title="Valeurs" description="Liste des valeurs de l'entreprise. Chaque entrée comporte une icône, un titre et une description.">
        <ValuesEditor
          value={values["about.values"] ?? "[]"}
          onChange={(v) => handleChange("about.values", v)}
        />
      </Card>

      {/* ── Card 5 : Statistiques ─────────────────────────────────────────── */}
      <Card title="Statistiques" description="Chiffres clés affichés en évidence (ex : 500+ clients, 10 ans d'expérience).">
        <StatsEditor
          value={values["about.stats"] ?? "[]"}
          onChange={(v) => handleChange("about.stats", v)}
        />
      </Card>

      {/* ── Card 6 : CTA ──────────────────────────────────────────────────── */}
      <Card title="CTA (appel à l'action)" description="Bloc d'appel à l'action affiché en bas de la page.">
        <Field label="Titre du CTA">
          <input className={inp}
            value={values["about.cta_title"] ?? ""}
            onChange={(e) => handleChange("about.cta_title", e.target.value)}
          />
        </Field>
        <Field label="Sous-titre du CTA">
          <input className={inp}
            value={values["about.cta_subtitle"] ?? ""}
            onChange={(e) => handleChange("about.cta_subtitle", e.target.value)}
          />
        </Field>
      </Card>

    </div>
  );
}
