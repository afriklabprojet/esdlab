"use client";

import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

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
  const items  = parseArr<NavLink>(value, []);
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
        <div key={`nav-${i}`} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-center">
          <input className={inp} placeholder="Accueil" value={it.label}
            onChange={(e) => update(i, "label", e.target.value)} />
          <input className={`${inp} font-mono`} placeholder="/page" value={it.href}
            onChange={(e) => update(i, "href", e.target.value)} />
          <div className="flex gap-1">
            <button type="button" onClick={() => moveUp(i)} disabled={i === 0}
              className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition">↑</button>
            <button type="button" onClick={() => moveDown(i)} disabled={i === items.length - 1}
              className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition">↓</button>
          </div>
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un lien" onClick={add} />
    </div>
  );
}

// ─── Live preview ─────────────────────────────────────────────────────────────
function HeaderPreview({ values }: Readonly<{ values: Record<string, string> }>) {
  const siteName     = values["site.name"]            || "ESDLAB";
  const siteTagline  = values["site.tagline"]         || "Technologies";
  const logo         = values["site.logo"]            || "/images/ESDL.png";
  const phone        = values["contact.phone"]        || "+225 07 79 56 52 26";
  const address      = values["contact.address"]      || "Treichville, Abidjan";
  const phoneLabel   = values["header.phone_label"]   || "Service commercial";
  const resellerLabel= values["header.reseller_label"]|| "Espace revendeur";
  const quoteLabel   = values["header.quote_label"]   || "Demande de devis";
  const navLinks     = parseArr<NavLink>(values["header.nav"], []);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-400 ml-2">Aperçu header</span>
      </div>

      {/* Topbar */}
      <div className="bg-secondary-800 border-b border-secondary-500 px-6 py-2.5 flex items-center justify-between text-white text-xs font-medium">
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <svg className="h-3 w-3 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phoneLabel} {phone}
          </span>
          <span className="h-3 w-px bg-white/25" />
          <span className="flex items-center gap-1.5 text-white/60 truncate">
            <svg className="h-3 w-3 shrink-0 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Showroom — {address}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-white/80">{resellerLabel}</span>
          <span className="h-3 w-px bg-white/25" />
          <span className="rounded bg-white px-3 py-1 font-semibold text-secondary-800">{quoteLabel}</span>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-white/95 backdrop-blur px-6 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          {logo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logo} alt={siteName} className="h-9 w-9 rounded-xl border border-slate-200 object-contain bg-white p-0.5" />
          )}
          <div className="leading-tight">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-secondary-600">{siteTagline}</p>
            <p className="text-sm font-bold text-slate-900">{siteName}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {navLinks.map((l) => (
            <span key={l.href} className="text-xs font-medium text-slate-600">{l.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
interface HeaderClientProps {
  readonly initial: Record<string, string>;
}

export default function HeaderClient({ initial }: HeaderClientProps) {
  const [values, setValues]   = useState<Record<string, string>>(initial);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState<{ type: "ok" | "err"; text: string } | null>(null);
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
          <h1 className="text-2xl font-bold text-slate-900">En-tête du site</h1>
          <p className="text-sm text-slate-500 mt-1">
            Topbar, logo, navigation principale.{" "}
            <a href="/" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir le site ↗
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={() => setShowPreview((v) => !v)}
            className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white text-slate-700 rounded-xl text-sm font-medium transition">
            {showPreview ? "Masquer l'aperçu" : "Afficher l'aperçu"}
          </button>
          <button onClick={save} disabled={saving}
            className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors shadow-sm">
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
      {showPreview && <HeaderPreview values={values} />}

      {/* ── Identité & Logo ────────────────────────────────────────────────── */}
      <Card title="Identité & Logo" description="Nom du site, tagline et logo affichés dans la barre de navigation.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nom du site" hint='Affiché à côté du logo (ex : "ESDLAB").'>
            <input className={inp} value={values["site.name"] ?? ""}
              onChange={(e) => handleChange("site.name", e.target.value)} />
          </Field>
          <Field label="Tagline" hint='Petite ligne au-dessus du nom (ex : "Technologies").'>
            <input className={inp} value={values["site.tagline"] ?? ""}
              onChange={(e) => handleChange("site.tagline", e.target.value)} />
          </Field>
        </div>
        <Field label="Logo" hint="Image carrée recommandée (40×40 px). Formats : PNG, SVG, WebP.">
          <MediaPicker
            accept="image"
            value={values["site.logo"] ?? ""}
            onChange={(v) => handleChange("site.logo", v)}
          />
        </Field>
      </Card>

      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <Card title="Barre supérieure (topbar)" description="Bande sombre affichée au-dessus de la navigation — visible sur desktop uniquement.">

        <Field label="Libellé avant le téléphone" hint='Ex : "Service commercial", "Contactez-nous".'>
          <input className={inp} value={values["header.phone_label"] ?? ""}
            onChange={(e) => handleChange("header.phone_label", e.target.value)} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Numéro de téléphone">
            <input className={inp} value={values["contact.phone"] ?? ""}
              onChange={(e) => handleChange("contact.phone", e.target.value)} />
          </Field>
          <Field label="Adresse (showroom)" hint="Texte affiché après l'icône de localisation.">
            <input className={inp} value={values["contact.address"] ?? ""}
              onChange={(e) => handleChange("contact.address", e.target.value)} />
          </Field>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lien "Espace revendeur"</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Libellé">
              <input className={inp} value={values["header.reseller_label"] ?? ""}
                onChange={(e) => handleChange("header.reseller_label", e.target.value)} />
            </Field>
            <Field label="Lien (href)">
              <input className={`${inp} font-mono`} placeholder="/contact"
                value={values["header.reseller_href"] ?? ""}
                onChange={(e) => handleChange("header.reseller_href", e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bouton "Demande de devis"</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Libellé">
              <input className={inp} value={values["header.quote_label"] ?? ""}
                onChange={(e) => handleChange("header.quote_label", e.target.value)} />
            </Field>
            <Field label="Lien (href)">
              <input className={`${inp} font-mono`} placeholder="/contact"
                value={values["header.quote_href"] ?? ""}
                onChange={(e) => handleChange("header.quote_href", e.target.value)} />
            </Field>
          </div>
        </div>
      </Card>

      {/* ── Navigation principale ──────────────────────────────────────────── */}
      <Card title="Navigation principale" description="Liens affichés dans la barre de navigation (desktop + menu mobile). Flèches pour réordonner.">
        <NavLinksEditor
          value={values["header.nav"] ?? "[]"}
          onChange={(v) => handleChange("header.nav", v)}
        />
      </Card>

      {/* ── WhatsApp ───────────────────────────────────────────────────────── */}
      <Card title="Bouton WhatsApp mobile" description="Affiché dans la barre flottante en bas de l'écran sur mobile uniquement.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Numéro WhatsApp" hint="Format international sans +, sans espaces (ex : 2250779565226).">
            <input className={`${inp} font-mono`} placeholder="2250779565226"
              value={values["contact.whatsapp"] ?? ""}
              onChange={(e) => handleChange("contact.whatsapp", e.target.value)} />
          </Field>
          <Field label="Message pré-rempli" hint="Texte envoyé automatiquement à l'ouverture de WhatsApp.">
            <input className={inp}
              value={values["contact.whatsapp_message"] ?? ""}
              onChange={(e) => handleChange("contact.whatsapp_message", e.target.value)} />
          </Field>
        </div>
      </Card>

    </div>
  );
}
