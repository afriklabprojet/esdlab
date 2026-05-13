"use client";

import { useState } from "react";

// ─── FAQ item type ────────────────────────────────────────────────────────────
interface FaqItem { q: string; a: string }

const DEFAULT_FAQ: FaqItem[] = [
  { q: "Pourquoi choisir DigiLab ?", a: "DigiLab apporte une expertise de plus de 10 ans dans le digital signage et l'affichage dynamique. Nous proposons des solutions clé en main, de l'installation à la maintenance, avec un accompagnement personnalisé pour chaque client." },
  { q: "Quelles solutions commercialisez-vous ?", a: "Nous proposons des bornes interactives tactiles, des chevalets numériques, des écrans numériques interactifs (ENI), des écrans vitrine haute luminosité, ainsi que des applications logicielles pour piloter l'ensemble de votre parc d'écrans." },
  { q: "Proposez-vous des solutions en location ?", a: "Oui. Nous proposons des solutions de location courte et longue durée, idéales pour les événements ponctuels ou pour étaler le coût de vos équipements dans le temps." },
  { q: "Comment se passe l'installation ?", a: "Notre équipe technique prend en charge l'installation complète sur site. Nous assurons la formation de vos équipes et garantissons un suivi post-installation rigoureux." },
  { q: "Disposez-vous d'un service après-vente ?", a: "Oui. Nous disposons d'un SAV réactif avec des techniciens disponibles pour intervenir rapidement. Nous proposons également des contrats de maintenance préventive." },
];

function parseFaqItems(raw: string | undefined): FaqItem[] {
  if (!raw) return DEFAULT_FAQ;
  try { const v = JSON.parse(raw); return Array.isArray(v) ? v : DEFAULT_FAQ; } catch { return DEFAULT_FAQ; }
}

// ─── FAQ Editor ───────────────────────────────────────────────────────────────
function FaqEditor({ items, onChange }: Readonly<{ items: FaqItem[]; onChange: (items: FaqItem[]) => void }>) {
  function update(i: number, field: "q" | "a", val: string) {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange(next);
  }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }
  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  }
  function moveDown(i: number) {
    if (i === items.length - 1) return;
    const next = [...items];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  }
  function add() { onChange([...items, { q: "", a: "" }]); }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveUp(i)} disabled={i === 0}
                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
              </button>
              <button type="button" onClick={() => moveDown(i)} disabled={i === items.length - 1}
                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <button type="button" onClick={() => remove(i)}
                className="p-1 rounded text-slate-400 hover:text-red-600 transition ml-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <input
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            placeholder="Question"
            value={item.q}
            onChange={(e) => update(i, "q", e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Réponse"
            rows={3}
            value={item.a}
            onChange={(e) => update(i, "a", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={add}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
        Ajouter une question
      </button>
    </div>
  );
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

// ─── Main ─────────────────────────────────────────────────────────────────────
interface ContactAdminClientProps {
  readonly initial: Record<string, string>;
}

export default function ContactAdminClient({ initial }: ContactAdminClientProps) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => parseFaqItems(initial["contact.faq_items"]));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]       = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function handleChange(key: string, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const payload = { ...values, "contact.faq_items": JSON.stringify(faqItems) };
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <Card title="FAQ" description="Questions fréquentes affichées en bas de la page Contact.">
        <Field label="Titre de la section FAQ" hint='Ex : "Questions fréquentes".'>
          <input className={inp} placeholder="Questions fréquentes"
            value={values["contact.faq_title"] ?? ""}
            onChange={(e) => handleChange("contact.faq_title", e.target.value)}
          />
        </Field>
        <Field label="Questions & Réponses" hint="Ajoutez, modifiez ou réordonnez les entrées FAQ.">
          <FaqEditor items={faqItems} onChange={setFaqItems} />
        </Field>
      </Card>

    </div>
  );
}
