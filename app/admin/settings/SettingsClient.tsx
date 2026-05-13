"use client";

import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

// ─── Types ─────────────────────────────────────────────────────────────────

type NavLink    = { href: string; label: string };
type Pillar     = { number: string; title: string; description: string };
type ProofPoint = { text: string; icon: string };
type Commitment = { title: string; description: string };
type Comparison = { criterion: string; without: string; with: string };
type Sector     = { label: string; icon: string };
type AboutValue = { icon: string; title: string; description: string };
type AboutStat  = { number: string; label: string };

// ─── Helpers ───────────────────────────────────────────────────────────────

function parseArray<T>(json: string, fallback: T[]): T[] {
  try { return JSON.parse(json) as T[]; } catch { return fallback; }
}

// ─── Scalar field groups ──────────────────────────────────────────────────

const GROUPS: { label: string; prefix: string }[] = [
  { label: "Site", prefix: "site." },
  { label: "Contact", prefix: "contact." },
  { label: "Réseaux sociaux", prefix: "social." },
  { label: "En-tête (header)", prefix: "header." },
  { label: "Pied de page (footer)", prefix: "footer." },
  { label: "Hero (page d'accueil)", prefix: "hero." },
  { label: "Page d'accueil", prefix: "home." },
  { label: "Statistiques", prefix: "stats." },
  { label: "À propos (images + textes)", prefix: "about." },
];

// Keys that have dedicated visual editors (excluded from raw scalar display)
const ARRAY_KEYS = new Set([
  "pillars", "proof_points", "commitments", "comparisons", "sectors",
  "about.values", "about.stats",
  "header.nav", "footer.nav", "footer.secteurs",
]);

const isImageKey = (k: string) => k.endsWith(".image") || k.endsWith("_image") || k.endsWith(".logo");

// ─── SettingField (scalars) ────────────────────────────────────────────────

interface SettingFieldProps {
  readonly fieldKey: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

function SettingField({ fieldKey, value, onChange }: SettingFieldProps) {
  if (isImageKey(fieldKey)) {
    return <MediaPicker value={value ?? ""} onChange={onChange} />;
  }
  if ((value ?? "").length > 80) {
    return (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
      />
    );
  }
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
    />
  );
}

// ─── NavLinksEditor ────────────────────────────────────────────────────────

function NavLinksEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<NavLink>(value, []);
  const update = (idx: number, field: keyof NavLink, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { href: "/", label: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>Libellé</span><span>Lien (href)</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.href}-${it.label}`} className="grid grid-cols-[1fr_1fr_24px] gap-2 items-start">
          <input
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Accueil"
            value={it.label}
            onChange={(e) => update(i, "label", e.target.value)}
          />
          <input
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="/page"
            value={it.href}
            onChange={(e) => update(i, "href", e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            title="Supprimer"
            className="mt-1 text-red-400 hover:text-red-600 text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm text-primary-700 hover:text-primary-900 font-medium"
      >
        + Ajouter un lien
      </button>
    </div>
  );
}

// ─── Shared styles & primitives ────────────────────────────────────────────

const inp = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500";
const ta  = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500";

function RemoveBtn({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Supprimer"
      className="mt-1 text-red-400 hover:text-red-600 text-xl font-bold leading-none"
    >
      ×
    </button>
  );
}

function AddBtn({ label, onClick }: Readonly<{ label: string; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-primary-700 hover:text-primary-900 font-medium"
    >
      + {label}
    </button>
  );
}

// ─── Pillars editor ────────────────────────────────────────────────────────

function PillarsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<Pillar>(value, []);
  const update = (idx: number, field: keyof Pillar, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { number: `0${items.length + 1}`, title: "", description: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[64px_1fr_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>N°</span><span>Titre</span><span>Description</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.number}-${it.title}`} className="grid grid-cols-[64px_1fr_1fr_24px] gap-2 items-start">
          <input className={inp} placeholder="01" value={it.number} onChange={(e) => update(i, "number", e.target.value)} />
          <input className={inp} placeholder="Titre" value={it.title} onChange={(e) => update(i, "title", e.target.value)} />
          <input className={inp} placeholder="Description" value={it.description} onChange={(e) => update(i, "description", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un pilier" onClick={add} />
    </div>
  );
}

// ─── ProofPoints editor ────────────────────────────────────────────────────

function ProofPointsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<ProofPoint>(value, []);
  const update = (idx: number, field: keyof ProofPoint, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { text: "", icon: "⚡" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[48px_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>Icône</span><span>Texte</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.icon}-${it.text}`} className="grid grid-cols-[48px_1fr_24px] gap-2 items-start">
          <input className={inp} placeholder="⚡" value={it.icon} onChange={(e) => update(i, "icon", e.target.value)} />
          <input className={inp} placeholder="Texte du point clé" value={it.text} onChange={(e) => update(i, "text", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un point" onClick={add} />
    </div>
  );
}

// ─── Commitments editor ────────────────────────────────────────────────────

function CommitmentsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<Commitment>(value, []);
  const update = (idx: number, field: keyof Commitment, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { title: "", description: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={it.title} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1.5">
            <input className={inp} placeholder="Titre de l'engagement" value={it.title} onChange={(e) => update(i, "title", e.target.value)} />
            <textarea className={ta} rows={2} placeholder="Description" value={it.description} onChange={(e) => update(i, "description", e.target.value)} />
          </div>
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un engagement" onClick={add} />
    </div>
  );
}

// ─── Comparisons editor ────────────────────────────────────────────────────

function ComparisonsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<Comparison>(value, []);
  const update = (idx: number, field: keyof Comparison, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { criterion: "", without: "", with: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>Critère</span><span>Sans DigiLab</span><span>Avec DigiLab</span><span />
      </div>
      {items.map((it, i) => (
        <div key={it.criterion} className="grid grid-cols-[1fr_1fr_1fr_24px] gap-2 items-start">
          <input className={inp} placeholder="Critère" value={it.criterion} onChange={(e) => update(i, "criterion", e.target.value)} />
          <input className={inp} placeholder="Sans DigiLab" value={it.without} onChange={(e) => update(i, "without", e.target.value)} />
          <input className={inp} placeholder="Avec DigiLab" value={it.with} onChange={(e) => update(i, "with", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter une ligne" onClick={add} />
    </div>
  );
}

// ─── Sectors editor ────────────────────────────────────────────────────────

function SectorsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<Sector>(value, []);
  const update = (idx: number, field: keyof Sector, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { label: "", icon: "⚙" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[48px_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>Icône</span><span>Secteur</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.icon}-${it.label}`} className="grid grid-cols-[48px_1fr_24px] gap-2 items-start">
          <input className={inp} placeholder="⚙" value={it.icon} onChange={(e) => update(i, "icon", e.target.value)} />
          <input className={inp} placeholder="Nom du secteur" value={it.label} onChange={(e) => update(i, "label", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un secteur" onClick={add} />
    </div>
  );
}

// ─── AboutValues editor ────────────────────────────────────────────────────

function AboutValuesEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<AboutValue>(value, []);
  const update = (idx: number, field: keyof AboutValue, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { icon: "01", title: "", description: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={`${it.icon}-${it.title}`} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1.5">
            <div className="grid grid-cols-2 gap-2">
              <input className={inp} placeholder="Icône / n° (ex: 01)" value={it.icon} onChange={(e) => update(i, "icon", e.target.value)} />
              <input className={inp} placeholder="Titre" value={it.title} onChange={(e) => update(i, "title", e.target.value)} />
            </div>
            <textarea className={ta} rows={2} placeholder="Description" value={it.description} onChange={(e) => update(i, "description", e.target.value)} />
          </div>
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter une valeur" onClick={add} />
    </div>
  );
}

// ─── AboutStats editor ─────────────────────────────────────────────────────

function AboutStatsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArray<AboutStat>(value, []);
  const update = (idx: number, field: keyof AboutStat, val: string) => {
    onChange(JSON.stringify(items.map((it, i) => i === idx ? { ...it, [field]: val } : it)));
  };
  const add = () => onChange(JSON.stringify([...items, { number: "", label: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_24px] gap-2 text-xs text-slate-400 font-medium">
        <span>Chiffre (ex : 1 000+)</span><span>Libellé</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.number}-${it.label}`} className="grid grid-cols-[1fr_1fr_24px] gap-2 items-start">
          <input className={inp} placeholder="1 000+" value={it.number} onChange={(e) => update(i, "number", e.target.value)} />
          <input className={inp} placeholder="Libellé" value={it.label} onChange={(e) => update(i, "label", e.target.value)} />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter une statistique" onClick={add} />
    </div>
  );
}

// ─── Array section registry ────────────────────────────────────────────────

type EditorComponent = (props: { value: string; onChange: (v: string) => void }) => React.JSX.Element;

const ARRAY_SECTIONS: { key: string; label: string; description: string; Editor: EditorComponent }[] = [
  {
    key: "pillars",
    label: "Piliers — Trois usages clés",
    description: "Les 3 colonnes centrales (numéro, titre, description).",
    Editor: PillarsEditor,
  },
  {
    key: "proof_points",
    label: "Points clés — Section hero",
    description: "Puces courtes avec emoji affichées dans le bloc hero.",
    Editor: ProofPointsEditor,
  },
  {
    key: "commitments",
    label: "Engagements — Notre approche",
    description: "Cartes d'engagements (titre + description).",
    Editor: CommitmentsEditor,
  },
  {
    key: "comparisons",
    label: "Tableau de comparaison",
    description: 'Lignes du tableau "Avant / Avec DigiLab".',
    Editor: ComparisonsEditor,
  },
  {
    key: "sectors",
    label: "Secteurs d'activité",
    description: "Défilé de secteurs en bas de page.",
    Editor: SectorsEditor,
  },
  {
    key: "about.values",
    label: "Page À propos — Valeurs (6 cartes)",
    description: "Cartes de valeurs affichées sur la page À propos.",
    Editor: AboutValuesEditor,
  },
  {
    key: "about.stats",
    label: "Page À propos — Statistiques",
    description: "Chiffres clés affichés sur la page À propos.",
    Editor: AboutStatsEditor,
  },
  {
    key: "header.nav",
    label: "Navigation — En-tête",
    description: "Liens du menu principal (ordre, libellé, URL).",
    Editor: NavLinksEditor,
  },
  {
    key: "footer.nav",
    label: "Navigation — Pied de page",
    description: "Liens du pied de page (mentions légales, confidentialité…).",
    Editor: NavLinksEditor,
  },
  {
    key: "footer.secteurs",
    label: "Secteurs — Pied de page",
    description: "Liens vers les sections de secteurs d'activité.",
    Editor: NavLinksEditor,
  },
];

// ─── SettingsClient ────────────────────────────────────────────────────────

interface SettingsClientProps {
  readonly initial: Record<string, string>;
  /** Si fourni, n'affiche que les groupes et clés array listés */
  readonly only?: { groups?: string[]; arrays?: string[] };
  readonly title?: string;
  readonly description?: string;
}

export default function SettingsClient({ initial, only, title, description }: SettingsClientProps) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [initing, setIniting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function initDefaults() {
    if (!confirm("Cela va ajouter toutes les clés manquantes avec leurs valeurs par défaut. Continuer ?")) return;
    setIniting(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings/init", { method: "POST" });
      if (res.ok) {
        const data = await res.json() as { inserted: number; skipped: number };
        setMsg({ type: "ok", text: `✅ ${data.inserted} clé(s) ajoutée(s) — ${data.skipped} existante(s) inchangée(s). Rechargez la page pour les voir.` });
      } else {
        setMsg({ type: "err", text: "❌ Erreur lors de l'initialisation." });
      }
    } catch {
      setMsg({ type: "err", text: "❌ Impossible de contacter le serveur." });
    } finally {
      setIniting(false);
    }
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
        setMsg({ type: "ok", text: "✅ Réglages sauvegardés — visibles sur le site." });
        setTimeout(() => setMsg(null), 3000);
      } else {
        setMsg({ type: "err", text: "❌ Erreur lors de la sauvegarde." });
      }
    } catch {
      setMsg({ type: "err", text: "❌ Impossible de contacter le serveur." });
    } finally {
      setSaving(false);
    }
  }

  function addCustom() {
    if (!newKey.trim()) return;
    setValues((v) => ({ ...v, [newKey.trim()]: newValue }));
    setNewKey("");
    setNewValue("");
  }

  function handleChange(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  const allKeys = Object.keys(values).sort((a, b) => a.localeCompare(b));
  const visibleGroups = only?.groups ? GROUPS.filter((g) => only.groups!.includes(g.prefix)) : GROUPS;
  const visibleArrayKeys = only?.arrays ? new Set(only.arrays) : null;

  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title ?? "Contenu du site"}</h1>
          <p className="text-sm text-slate-500 mt-1">
            {description ?? "Modifiez tous les textes et sections sans toucher au code."}{" "}
            <a href="/" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir le site ↗
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={initDefaults}
            disabled={initing}
            className="px-4 py-2.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
            title="Ajoute les clés manquantes sans écraser les valeurs existantes"
          >
            {initing ? "Initialisation..." : "Initialiser les défauts"}
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors"
          >
            {saving ? "Sauvegarde..." : "Tout enregistrer"}
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {msg && (
        <div
          className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
            msg.type === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Scalar groups */}
      {visibleGroups.map((g) => {
        const keys = allKeys.filter((k) => k.startsWith(g.prefix) && !ARRAY_KEYS.has(k));
        if (keys.length === 0) return null;
        return (
          <section key={g.prefix} className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="font-semibold text-slate-900">{g.label}</h2>
            <div className="space-y-3">
              {keys.map((k) => (
                <div key={k}>
                  <label className="block text-xs font-mono text-slate-400 mb-1">{k}</label>
                  <SettingField fieldKey={k} value={values[k] ?? ""} onChange={(v) => handleChange(k, v)} />
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Visual array editors */}
      {ARRAY_SECTIONS.filter((s) => s.key in values && (!visibleArrayKeys || visibleArrayKeys.has(s.key))).map(({ key, label, description, Editor }) => (
        <section key={key} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-slate-900">{label}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          </div>
          <Editor value={values[key] ?? "[]"} onChange={(v) => handleChange(key, v)} />
        </section>
      ))}

      {/* Orphan scalar keys (not matched by any group or array editor) */}
      {!only && (() => {
        const orphans = allKeys.filter(
          (k) => !GROUPS.some((g) => k.startsWith(g.prefix)) && !ARRAY_KEYS.has(k)
        );
        if (orphans.length === 0) return null;
        return (
          <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h2 className="font-semibold text-slate-900">Autres</h2>
            {orphans.map((k) => (
              <div key={k}>
                <label className="block text-xs font-mono text-slate-400 mb-1">{k}</label>
                <input
                  type="text"
                  value={values[k] ?? ""}
                  onChange={(e) => handleChange(k, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            ))}
          </section>
        );
      })()}

      {/* Add a custom key */}
      {!only && <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
        <h2 className="font-semibold text-slate-900">Ajouter une clé</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="ex: footer.copyright"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
          />
          <input
            type="text"
            placeholder="Valeur"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <button
          type="button"
          onClick={addCustom}
          className="text-sm text-primary-700 hover:underline font-medium"
        >
          + Ajouter
        </button>
      </section>}
    </div>
  );
}
