"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink = { href: string; label: string };

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

// ─── NavLinks editor ──────────────────────────────────────────────────────────
function NavLinksEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<NavLink>(value, []);
  const update = (idx: number, field: keyof NavLink, val: string) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { href: "/", label: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(JSON.stringify(next));
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(JSON.stringify(next));
  };

  return (
    <div className="space-y-2">
      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_80px_32px] gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wide px-1">
        <span>Libellé</span><span>Lien (href)</span><span>Ordre</span><span />
      </div>
      {items.map((it, i) => (
        <div key={`${it.href}-${i}`} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-center">
          <input className={inp} placeholder="Accueil" value={it.label}
            onChange={(e) => update(i, "label", e.target.value)} />
          <input className={`${inp} font-mono`} placeholder="/page" value={it.href}
            onChange={(e) => update(i, "href", e.target.value)} />
          <div className="flex gap-1">
            <button type="button" onClick={() => moveUp(i)} disabled={i === 0}
              className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition">
              ↑
            </button>
            <button type="button" onClick={() => moveDown(i)} disabled={i === items.length - 1}
              className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition">
              ↓
            </button>
          </div>
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un lien" onClick={add} />
    </div>
  );
}

// ─── Preview mini ─────────────────────────────────────────────────────────────
function FooterPreview({ values }: Readonly<{ values: Record<string, string> }>) {
  const siteName    = values["site.name"]        || "ESDLAB";
  const tagline     = values["site.tagline"]     || "Technologies";
  const description = values["footer.description"] || "—";
  const address     = values["contact.address"]  || "—";
  const email       = values["contact.email"]    || "—";
  const phone       = values["contact.phone"]    || "—";
  const copyright   = values["footer.copyright"] || "—";
  const ctaLabel    = values["footer.cta_label"] || "Réserver une démo";
  const secteurs    = parseArr<NavLink>(values["footer.secteurs"], []);
  const navLinks    = parseArr<NavLink>(values["footer.nav"], []);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-400 ml-2">Aperçu footer</span>
      </div>
      <div className="bg-secondary-950 text-white px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-400 mb-1">{tagline}</p>
            <p className="text-xl font-bold mb-2">{siteName}</p>
            <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{description}</p>
            <div className="mt-3 space-y-0.5 text-xs text-white/50">
              <p>{address}</p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">Secteurs</p>
            <ul className="space-y-1.5">
              {secteurs.slice(0, 5).map((l) => (
                <li key={l.href} className="text-xs text-white/60 truncate">{l.label}</li>
              ))}
              {secteurs.length > 5 && <li className="text-xs text-white/40">+{secteurs.length - 5} autres…</li>}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">Navigation</p>
            <ul className="space-y-1.5">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.href} className="text-xs text-white/60 truncate">{l.label}</li>
              ))}
              {navLinks.length > 5 && <li className="text-xs text-white/40">+{navLinks.length - 5} autres…</li>}
            </ul>
            <div className="mt-4 inline-block rounded-xl border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-secondary-800">
              {ctaLabel}
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4 text-[10px] text-white/40">
          © {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface FooterClientProps {
  readonly initial: Record<string, string>;
}

export default function FooterClient({ initial }: FooterClientProps) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

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
          <h1 className="text-2xl font-bold text-slate-900">Pied de page</h1>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez tous les contenus du footer.{" "}
            <a href="/" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir le site ↗
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-xl text-sm font-medium transition"
          >
            {showPreview ? "Masquer l'aperçu" : "Afficher l'aperçu"}
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors shadow-sm"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
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

      {/* ── Aperçu ─────────────────────────────────────────────────────────── */}
      {showPreview && <FooterPreview values={values} />}

      {/* ── Identité ───────────────────────────────────────────────────────── */}
      <Card title="Identité" description="Nom, tagline et description affichés dans la colonne gauche du footer.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom du site" hint='Affiché en grand (ex : "ESDLAB").'>
            <input className={inp} value={values["site.name"] ?? ""}
              onChange={(e) => handleChange("site.name", e.target.value)} />
          </Field>
          <Field label="Tagline" hint='Petite ligne au-dessus du nom (ex : "Technologies").'>
            <input className={inp} value={values["site.tagline"] ?? ""}
              onChange={(e) => handleChange("site.tagline", e.target.value)} />
          </Field>
        </div>
        <Field label="Description" hint="Paragraphe d'introduction sous le nom de la société.">
          <textarea className={ta} rows={4}
            value={values["footer.description"] ?? ""}
            onChange={(e) => handleChange("footer.description", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <Card title="Coordonnées" description="Adresse, email et téléphone affichés dans la colonne gauche.">
        <Field label="Adresse">
          <input className={inp} value={values["contact.address"] ?? ""}
            onChange={(e) => handleChange("contact.address", e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email">
            <input className={inp} type="email" value={values["contact.email"] ?? ""}
              onChange={(e) => handleChange("contact.email", e.target.value)} />
          </Field>
          <Field label="Téléphone">
            <input className={inp} value={values["contact.phone"] ?? ""}
              onChange={(e) => handleChange("contact.phone", e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <Card title="Bouton d'appel à l'action" description='Bouton blanc dans la colonne "Navigation" du footer.'>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Libellé du bouton">
            <input className={inp} value={values["footer.cta_label"] ?? ""}
              onChange={(e) => handleChange("footer.cta_label", e.target.value)} />
          </Field>
          <Field label="Lien (href)" hint="URL vers laquelle pointe le bouton.">
            <input className={`${inp} font-mono`} placeholder="/contact"
              value={values["footer.cta_href"] ?? ""}
              onChange={(e) => handleChange("footer.cta_href", e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* ── Navigation secteurs ────────────────────────────────────────────── */}
      <Card title="Liens — Secteurs" description='Colonne "Secteurs" du footer. Flèches pour réordonner.'>
        <NavLinksEditor
          value={values["footer.secteurs"] ?? "[]"}
          onChange={(v) => handleChange("footer.secteurs", v)}
        />
      </Card>

      {/* ── Navigation principale ──────────────────────────────────────────── */}
      <Card title="Liens — Navigation" description='Colonne "Navigation" du footer (mentions légales, pages…). Flèches pour réordonner.'>
        <NavLinksEditor
          value={values["footer.nav"] ?? "[]"}
          onChange={(v) => handleChange("footer.nav", v)}
        />
      </Card>

      {/* ── Copyright ──────────────────────────────────────────────────────── */}
      <Card title="Copyright" description="Texte affiché tout en bas du footer, après l'année.">
        <Field label="Texte de copyright" hint="L'année courante est ajoutée automatiquement avant ce texte.">
          <input className={inp} value={values["footer.copyright"] ?? ""}
            onChange={(e) => handleChange("footer.copyright", e.target.value)} />
        </Field>
        <p className="text-xs text-slate-400">
          Aperçu : <span className="font-mono">© {new Date().getFullYear()} {values["footer.copyright"] || "…"}</span>
        </p>
      </Card>

    </div>
  );
}
