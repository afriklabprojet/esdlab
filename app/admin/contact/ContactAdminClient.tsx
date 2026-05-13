"use client";

import { useState } from "react";

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

// ─── Main ─────────────────────────────────────────────────────────────────────
interface ContactAdminClientProps {
  readonly initial: Record<string, string>;
}

export default function ContactAdminClient({ initial }: ContactAdminClientProps) {
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
          <h1 className="text-2xl font-bold text-slate-900">Contact</h1>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez les contenus de la page Contact.{" "}
            <a href="/contact" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
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
      <Card title="Hero de la page contact" description="Titre et sous-titre affichés en haut de la page Contact.">
        <Field label="Titre (h1)" hint='Ex : "Contactez-nous".'>
          <input className={inp}
            value={values["contact.hero_title"] ?? ""}
            onChange={(e) => handleChange("contact.hero_title", e.target.value)}
          />
        </Field>
        <Field label="Sous-titre" hint="Phrase d'accroche sous le titre.">
          <input className={inp}
            value={values["contact.hero_subtitle"] ?? ""}
            onChange={(e) => handleChange("contact.hero_subtitle", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Card 2 : Coordonnées ───────────────────────────────────────────── */}
      <Card title="Coordonnées" description="Téléphone, email et adresse affichés sur la page Contact.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Téléphone">
            <input className={inp} type="tel" placeholder="+225 07 79 56 52 26"
              value={values["contact.phone"] ?? ""}
              onChange={(e) => handleChange("contact.phone", e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input className={inp} type="email" placeholder="contact@esdlab.com"
              value={values["contact.email"] ?? ""}
              onChange={(e) => handleChange("contact.email", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Adresse">
          <textarea className={ta} rows={2} placeholder="Treichville, Abidjan, Côte d'Ivoire"
            value={values["contact.address"] ?? ""}
            onChange={(e) => handleChange("contact.address", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Card 3 : WhatsApp ──────────────────────────────────────────────── */}
      <Card title="WhatsApp" description="Numéro et message pré-rempli pour le bouton WhatsApp.">
        <Field label="Numéro WhatsApp" hint="Format international sans + ni espaces (ex : 2250779565226).">
          <input className={`${inp} font-mono`} placeholder="2250779565226"
            value={values["contact.whatsapp"] ?? ""}
            onChange={(e) => handleChange("contact.whatsapp", e.target.value)}
          />
        </Field>
        <Field label="Message pré-rempli" hint="Texte envoyé automatiquement à l'ouverture de la conversation WhatsApp.">
          <textarea className={ta} rows={3} placeholder="Bonjour, je souhaite avoir des informations sur vos services."
            value={values["contact.whatsapp_message"] ?? ""}
            onChange={(e) => handleChange("contact.whatsapp_message", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Card 4 : Promesses ─────────────────────────────────────────────── */}
      <Card title="Promesses" description="Engagements affichés pour rassurer les visiteurs.">
        <Field label="Délai de réponse" hint='Texte affiché dans la section "Promesses" (ex : "4 heures ouvrées").'>
          <input className={inp} placeholder="4 heures ouvrées"
            value={values["contact.response_delay"] ?? ""}
            onChange={(e) => handleChange("contact.response_delay", e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Card 5 : FAQ ───────────────────────────────────────────────────── */}
      <Card title="FAQ" description="Section de questions fréquentes affichée en bas de la page Contact.">
        <Field label="Titre de la section FAQ" hint='Ex : "Questions fréquentes".'>
          <input className={inp} placeholder="Questions fréquentes"
            value={values["contact.faq_title"] ?? ""}
            onChange={(e) => handleChange("contact.faq_title", e.target.value)}
          />
        </Field>
        <div className="flex items-start gap-3 px-4 py-3.5 bg-amber-50 border border-amber-200 rounded-xl">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800">Questions et réponses hardcodées</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Les questions et réponses de la FAQ sont définies directement dans le code source (composant FAQ de la page Contact). Pour les modifier, éditez le fichier correspondant dans le projet.
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
}
