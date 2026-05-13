"use client";

import { useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

// ─── Types ────────────────────────────────────────────────────────────────────
type Sector      = { label: string; image: string; href: string };
type Product     = { title: string; desc: string; slug: string; kicker: string; uses: string[]; iconKey: string };
type Testimonial = { quote: string; author: string; role: string; company: string; initial: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseArr<T>(raw: string | undefined, fb: T[]): T[] {
  if (!raw?.trim()) return fb;
  try {
    const p = JSON.parse(raw) as unknown;
    return Array.isArray(p) && p.length > 0 ? (p as T[]) : fb;
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
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 transition"
    >
      <span className="text-lg leading-none">+</span> {label}
    </button>
  );
}

function RemoveBtn({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition text-xl font-bold"
      title="Supprimer"
    >
      ×
    </button>
  );
}

function ItemHeader({ label, onRemove }: Readonly<{ label: string; onRemove: () => void }>) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
      <RemoveBtn onClick={onRemove} />
    </div>
  );
}

// ─── Tab 1: Hero ──────────────────────────────────────────────────────────────
interface TabProps {
  values: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

function HeroTab({ values, onChange }: TabProps) {
  return (
    <div className="space-y-5">
      <Card title="Textes principaux" description="Titre et sous-titre affichés au centre de la section héro plein écran.">
        <Field label="Titre principal (H1)" hint="Texte en grand, blanc, au centre du héro.">
          <textarea
            className={ta}
            rows={3}
            value={values["hero.title"] ?? ""}
            onChange={(e) => onChange("hero.title", e.target.value)}
          />
        </Field>
        <Field label="Sous-titre" hint="Phrase courte en-dessous du titre.">
          <textarea
            className={ta}
            rows={3}
            value={values["hero.subtitle"] ?? ""}
            onChange={(e) => onChange("hero.subtitle", e.target.value)}
          />
        </Field>
      </Card>

      <Card title="Boutons d'appel à l'action" description="Les deux boutons visibles sous le titre.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Bouton principal" hint="Bouton orange, au premier plan.">
            <input
              className={inp}
              value={values["hero.cta_primary"] ?? ""}
              onChange={(e) => onChange("hero.cta_primary", e.target.value)}
            />
          </Field>
          <Field label="Bouton secondaire" hint="Bouton transparent, à droite.">
            <input
              className={inp}
              value={values["hero.cta_secondary"] ?? ""}
              onChange={(e) => onChange("hero.cta_secondary", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      <Card
        title="Arrière-plan"
        description="Vidéo en priorité si renseignée — l'image sert de poster (affiché avant le chargement de la vidéo) et de fallback si aucune vidéo n'est définie."
      >
        <Field
          label="Vidéo de fond"
          hint="Uploadez ou choisissez une vidéo (MP4 recommandé, max 200 Mo). Si vide, l'image ci-dessous est affichée seule."
        >
          <MediaPicker
            accept="video"
            value={values["hero.video"] ?? ""}
            onChange={(v) => onChange("hero.video", v)}
          />
          {values["hero.video"]?.trim() && (
            <p className="text-xs text-emerald-600 font-medium mt-1">
              ✓ Vidéo active — l&apos;image ci-dessous sera utilisée comme poster
            </p>
          )}
        </Field>

        <Field
          label="Image de fond"
          hint={values["hero.video"]?.trim() ? "Poster affiché pendant le chargement de la vidéo." : "Affichée en arrière-plan (aucune vidéo définie)."}
        >
          <MediaPicker
            value={values["hero.image"] ?? ""}
            onChange={(v) => onChange("hero.image", v)}
          />
        </Field>
      </Card>
    </div>
  );
}

// ─── Tab 2: Partenaires ───────────────────────────────────────────────────────
function PartnerLogosEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<string>(value, []);
  const update = (idx: number, val: string) => onChange(JSON.stringify(items.map((it, i) => (i === idx ? val : it))));
  const add    = () => onChange(JSON.stringify([...items, ""]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-2">
      {items.map((logo, i) => (
        <div key={`logo-${i}`} className="flex gap-2 items-center">
          <input
            className={inp}
            placeholder="ex : BPI France"
            value={logo}
            onChange={(e) => update(i, e.target.value)}
          />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un logo" onClick={add} />
    </div>
  );
}

function PartenairesTab({ values, onChange }: TabProps) {
  return (
    <div className="space-y-5">
      <Card title="Bandeau de confiance" description="Bande défilante en boucle affichant les noms des partenaires.">
        <Field label="Libellé au-dessus de la bande" hint='Texte centré visible avant les logos (ex : "Ils nous font confiance").'>
          <input
            className={inp}
            value={values["home.partners_label"] ?? ""}
            onChange={(e) => onChange("home.partners_label", e.target.value)}
          />
        </Field>
        <Field label="Logos partenaires" hint="Chaque entrée s'affiche dans une pilule. Ils défilent automatiquement.">
          <PartnerLogosEditor
            value={values["home.partner_logos"] ?? "[]"}
            onChange={(v) => onChange("home.partner_logos", v)}
          />
        </Field>
      </Card>
    </div>
  );
}

// ─── Tab 3: Secteurs ──────────────────────────────────────────────────────────
function SectorsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<Sector>(value, []);
  const update = (idx: number, field: keyof Sector, val: string) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { label: "", image: "", href: "/services" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-4">
      {items.map((sector, i) => (
        <div key={`sector-${i}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <ItemHeader label={`Secteur ${i + 1}`} onRemove={() => remove(i)} />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Nom du secteur">
              <input
                className={inp}
                placeholder="ex : Hôtellerie"
                value={sector.label}
                onChange={(e) => update(i, "label", e.target.value)}
              />
            </Field>
            <Field label="Lien (href)" hint="URL vers laquelle pointe la carte.">
              <input
                className={`${inp} font-mono`}
                placeholder="/services#hotellerie"
                value={sector.href}
                onChange={(e) => update(i, "href", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Image de fond" hint="Photo affichée dans la carte du secteur (ratio 4:3).">
            <MediaPicker value={sector.image} onChange={(v) => update(i, "image", v)} />
          </Field>
        </div>
      ))}
      <AddBtn label="Ajouter un secteur" onClick={add} />
    </div>
  );
}

function SecteursTab({ values, onChange }: TabProps) {
  return (
    <div className="space-y-5">
      <Card title="En-tête de section" description="Titre et bouton affichés au-dessus de la grille de secteurs.">
        <Field label="Titre de la section">
          <textarea
            className={ta}
            rows={2}
            value={values["home.sectors_title"] ?? ""}
            onChange={(e) => onChange("home.sectors_title", e.target.value)}
          />
        </Field>
        <Field label="Label du bouton">
          <input
            className={inp}
            value={values["home.sectors_cta"] ?? ""}
            onChange={(e) => onChange("home.sectors_cta", e.target.value)}
          />
        </Field>
      </Card>

      <Card title="Cartes de secteurs" description="Grille 3×2 de cartes photo. Chaque carte est un lien cliquable.">
        <SectorsEditor
          value={values["home.sectors"] ?? "[]"}
          onChange={(v) => onChange("home.sectors", v)}
        />
      </Card>
    </div>
  );
}

// ─── Tab 4: Produits ──────────────────────────────────────────────────────────
const ICON_OPTIONS = [
  { value: "kiosk",    label: "Borne interactive (kiosk)" },
  { value: "chevalet", label: "Chevalet numérique" },
  { value: "screen",   label: "Écran interactif" },
  { value: "vitrine",  label: "Écran vitrine" },
];

function UsesEditor({ uses, onChange }: Readonly<{ uses: string[]; onChange: (v: string[]) => void }>) {
  const add    = () => onChange([...uses, ""]);
  const update = (i: number, val: string) => onChange(uses.map((u, j) => (j === i ? val : u)));
  const remove = (i: number) => onChange(uses.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500">Usages (badges affichés sur la carte)</p>
      {uses.map((use, i) => (
        <div key={`use-${i}`} className="flex gap-2 items-center">
          <input
            className={inp}
            placeholder="ex : Commande"
            value={use}
            onChange={(e) => update(i, e.target.value)}
          />
          <RemoveBtn onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Ajouter un usage" onClick={add} />
    </div>
  );
}

function ProductsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<Product>(value, []);
  const update = <K extends keyof Product>(idx: number, field: K, val: Product[K]) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { title: "", desc: "", slug: "", kicker: "", uses: [], iconKey: "screen" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-4">
      {items.map((product, i) => (
        <div key={`product-${i}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <ItemHeader label={`Produit ${i + 1}${product.title ? ` — ${product.title}` : ""}`} onRemove={() => remove(i)} />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Titre du produit">
              <input
                className={inp}
                placeholder="ex : Bornes tactiles"
                value={product.title}
                onChange={(e) => update(i, "title", e.target.value)}
              />
            </Field>
            <Field label="Kicker (badge sous-titre)">
              <input
                className={inp}
                placeholder="ex : Accueil, paiement, animation"
                value={product.kicker}
                onChange={(e) => update(i, "kicker", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Slug (URL de la page)" hint="Correspond à /services/[slug]">
              <input
                className={`${inp} font-mono`}
                placeholder="bornes-tactiles"
                value={product.slug}
                onChange={(e) => update(i, "slug", e.target.value)}
              />
            </Field>
            <Field label="Icône">
              <select
                className={inp}
                value={product.iconKey}
                onChange={(e) => update(i, "iconKey", e.target.value)}
              >
                {ICON_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description" hint="Texte affiché dans le corps de la carte produit.">
            <textarea
              className={ta}
              rows={4}
              placeholder="Description détaillée du produit…"
              value={product.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
            />
          </Field>

          <UsesEditor
            uses={product.uses ?? []}
            onChange={(v) => update(i, "uses", v)}
          />
        </div>
      ))}
      <AddBtn label="Ajouter un produit" onClick={add} />
    </div>
  );
}

function ProduitsTab({ values, onChange }: TabProps) {
  return (
    <div className="space-y-5">
      <Card title="En-tête de section" description="Textes affichés au-dessus de la grille de produits.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Badge (eyebrow)" hint='Petit badge au-dessus du titre (ex : "Nos produits").'>
            <input
              className={inp}
              value={values["home.products_eyebrow"] ?? ""}
              onChange={(e) => onChange("home.products_eyebrow", e.target.value)}
            />
          </Field>
          <Field label="Label du bouton CTA">
            <input
              className={inp}
              value={values["home.products_cta"] ?? ""}
              onChange={(e) => onChange("home.products_cta", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Titre de la section">
          <textarea
            className={ta}
            rows={2}
            value={values["home.products_title"] ?? ""}
            onChange={(e) => onChange("home.products_title", e.target.value)}
          />
        </Field>
        <Field label="Sous-titre / accroche">
          <textarea
            className={ta}
            rows={2}
            value={values["home.products_subtitle"] ?? ""}
            onChange={(e) => onChange("home.products_subtitle", e.target.value)}
          />
        </Field>
      </Card>

      <Card
        title="Produits"
        description="Cartes affichées en grille. Le premier produit occupe deux colonnes sur desktop."
      >
        <ProductsEditor
          value={values["home.products"] ?? "[]"}
          onChange={(v) => onChange("home.products", v)}
        />
      </Card>
    </div>
  );
}

// ─── Tab 5: Témoignages ───────────────────────────────────────────────────────
function TestimonialsEditor({ value, onChange }: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const items = parseArr<Testimonial>(value, []);
  const update = (idx: number, field: keyof Testimonial, val: string) =>
    onChange(JSON.stringify(items.map((it, i) => (i === idx ? { ...it, [field]: val } : it))));
  const add    = () => onChange(JSON.stringify([...items, { quote: "", author: "", role: "", company: "", initial: "" }]));
  const remove = (idx: number) => onChange(JSON.stringify(items.filter((_, i) => i !== idx)));

  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <div key={`testimonial-${i}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <ItemHeader label={`Témoignage ${i + 1}${t.author ? ` — ${t.author}` : ""}`} onRemove={() => remove(i)} />

          <Field label="Citation" hint="Texte de la citation entre guillemets.">
            <textarea
              className={ta}
              rows={4}
              placeholder="Texte du témoignage…"
              value={t.quote}
              onChange={(e) => update(i, "quote", e.target.value)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Nom de l'auteur">
              <input
                className={inp}
                placeholder="Marc D."
                value={t.author}
                onChange={(e) => update(i, "author", e.target.value)}
              />
            </Field>
            <Field label="Initiale (avatar)" hint="Lettre(s) affichée(s) dans le cercle coloré.">
              <input
                className={inp}
                placeholder="M"
                maxLength={2}
                value={t.initial}
                onChange={(e) => update(i, "initial", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Poste / Rôle">
              <input
                className={inp}
                placeholder="Directeur des Opérations"
                value={t.role}
                onChange={(e) => update(i, "role", e.target.value)}
              />
            </Field>
            <Field label="Entreprise">
              <input
                className={inp}
                placeholder="Groupe Industriel"
                value={t.company}
                onChange={(e) => update(i, "company", e.target.value)}
              />
            </Field>
          </div>
        </div>
      ))}
      <AddBtn label="Ajouter un témoignage" onClick={add} />
    </div>
  );
}

function TemoignagesTab({ values, onChange }: TabProps) {
  return (
    <div className="space-y-5">
      <Card title="En-tête de section">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Badge (eyebrow)" hint='Ex : "Témoignages"'>
            <input
              className={inp}
              value={values["home.testimonials_eyebrow"] ?? ""}
              onChange={(e) => onChange("home.testimonials_eyebrow", e.target.value)}
            />
          </Field>
          <Field label="Titre de la section">
            <input
              className={inp}
              value={values["home.testimonials_title"] ?? ""}
              onChange={(e) => onChange("home.testimonials_title", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      <Card title="Témoignages clients" description="Affichés en grille de 3 cartes.">
        <TestimonialsEditor
          value={values["home.testimonials"] ?? "[]"}
          onChange={(v) => onChange("home.testimonials", v)}
        />
      </Card>
    </div>
  );
}

// ─── Tabs config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "hero",        label: "Héro",          icon: "✦" },
  { id: "partenaires", label: "Partenaires",   icon: "🤝" },
  { id: "secteurs",    label: "Secteurs",      icon: "🏢" },
  { id: "produits",    label: "Produits",      icon: "📦" },
  { id: "temoignages", label: "Témoignages",   icon: "💬" },
] as const;

type TabId = typeof TABS[number]["id"];

// ─── Main component ────────────────────────────────────────────────────────────
interface HomePageClientProps {
  readonly initial: Record<string, string>;
}

export default function HomePageClient({ initial }: HomePageClientProps) {
  const [values, setValues]     = useState<Record<string, string>>(initial);
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState<{ type: "ok" | "err"; text: string } | null>(null);

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
          <h1 className="text-2xl font-bold text-slate-900">Page d&apos;accueil</h1>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez le contenu de chaque section.{" "}
            <a href="/" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir le site ↗
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

      {/* ── Toast feedback ─────────────────────────────────────────────────── */}
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

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ─────────────────────────────────────────────────────── */}
      {activeTab === "hero"        && <HeroTab values={values} onChange={handleChange} />}
      {activeTab === "partenaires" && <PartenairesTab values={values} onChange={handleChange} />}
      {activeTab === "secteurs"    && <SecteursTab values={values} onChange={handleChange} />}
      {activeTab === "produits"    && <ProduitsTab values={values} onChange={handleChange} />}
      {activeTab === "temoignages" && <TemoignagesTab values={values} onChange={handleChange} />}

    </div>
  );
}
