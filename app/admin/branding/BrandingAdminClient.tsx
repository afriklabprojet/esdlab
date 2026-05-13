"use client";

import { useState, useCallback, useEffect } from "react";
import type { BrandTokens } from "@/lib/brand";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  readonly initial: BrandTokens;
  readonly defaults: BrandTokens;
}

interface Preset {
  name: string;
  tokens: BrandTokens;
}

// ── Presets ───────────────────────────────────────────────────────────────────
const PRESETS: Preset[] = [
  {
    name: "ESDLAB (défaut)",
    tokens: {
      primaryColor: "#3478BE",
      secondaryColor: "#E8721D",
      accentColor: "#D4A843",
      bgColor: "#fff7ed",
      fontHeading: "Cormorant Garamond",
      fontBody: "Plus Jakarta Sans",
      radius: "0.75",
      animationsEnabled: "true",
    },
  },
  {
    name: "Midnight Pro",
    tokens: {
      primaryColor: "#6366f1",
      secondaryColor: "#ec4899",
      accentColor: "#f59e0b",
      bgColor: "#f8fafc",
      fontHeading: "Georgia",
      fontBody: "Inter",
      radius: "0.5",
      animationsEnabled: "true",
    },
  },
  {
    name: "Forest Executive",
    tokens: {
      primaryColor: "#059669",
      secondaryColor: "#d97706",
      accentColor: "#7c3aed",
      bgColor: "#f0fdf4",
      fontHeading: "Georgia",
      fontBody: "system-ui",
      radius: "0.375",
      animationsEnabled: "true",
    },
  },
  {
    name: "Slate Enterprise",
    tokens: {
      primaryColor: "#0f172a",
      secondaryColor: "#0ea5e9",
      accentColor: "#f43f5e",
      bgColor: "#f8fafc",
      fontHeading: "Georgia",
      fontBody: "system-ui",
      radius: "0.25",
      animationsEnabled: "false",
    },
  },
];

const FONT_OPTIONS = [
  "Cormorant Garamond",
  "Georgia",
  "Playfair Display",
  "Merriweather",
  "Lora",
  "EB Garamond",
];
const FONT_BODY_OPTIONS = [
  "Plus Jakarta Sans",
  "Inter",
  "system-ui",
  "DM Sans",
  "Nunito",
  "Poppins",
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "52 120 190";
  return `${r} ${g} ${b}`;
}

function generatePalette(base: string): Record<string, string> {
  const r = parseInt(base.slice(1, 3), 16);
  const g = parseInt(base.slice(3, 5), 16);
  const b = parseInt(base.slice(5, 7), 16);
  const stops: Record<number, number> = {
    50: 0.95, 100: 0.88, 200: 0.74, 300: 0.57, 400: 0.35,
    500: 0, 600: -0.15, 700: -0.3, 800: -0.44, 900: -0.56, 950: -0.72,
  };
  const result: Record<string, string> = {};
  for (const [shade, factor] of Object.entries(stops)) {
    let nr: number, ng: number, nb: number;
    if (factor > 0) {
      nr = Math.round(r + (255 - r) * factor);
      ng = Math.round(g + (255 - g) * factor);
      nb = Math.round(b + (255 - b) * factor);
    } else {
      const abs = Math.abs(factor);
      nr = Math.round(r * (1 - abs));
      ng = Math.round(g * (1 - abs));
      nb = Math.round(b * (1 - abs));
    }
    result[shade] = `${nr} ${ng} ${nb}`;
  }
  return result;
}

function buildLiveCSS(tokens: BrandTokens): string {
  const primary = generatePalette(tokens.primaryColor);
  const secondary = generatePalette(tokens.secondaryColor);
  const accent = generatePalette(tokens.accentColor);

  const lines = [":root {"];
  for (const [shade, rgb] of Object.entries(primary))
    lines.push(`  --color-primary-${shade}: ${rgb};`);
  for (const [shade, rgb] of Object.entries(secondary))
    lines.push(`  --color-secondary-${shade}: ${rgb};`);
  for (const [shade, rgb] of Object.entries(accent))
    lines.push(`  --color-accent-${shade}: ${rgb};`);
  lines.push(`  --color-bg: ${hexToRgb(tokens.bgColor)};`);
  lines.push(`  --font-heading-brand: "${tokens.fontHeading}", Georgia, serif;`);
  lines.push(`  --font-body-brand: "${tokens.fontBody}", system-ui, sans-serif;`);
  lines.push(`  --radius-brand: ${tokens.radius}rem;`);
  lines.push("}");

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorGroups = [
    { name: "primary", var: "--color-primary" },
    { name: "secondary", var: "--color-secondary" },
    { name: "accent", var: "--color-accent" },
  ];
  for (const shade of shades) {
    for (const cg of colorGroups) {
      lines.push(`.bg-${cg.name}-${shade}{background-color:rgb(var(${cg.var}-${shade})/var(--tw-bg-opacity,1))}`);
      lines.push(`.text-${cg.name}-${shade}{color:rgb(var(${cg.var}-${shade})/var(--tw-text-opacity,1))}`);
      lines.push(`.border-${cg.name}-${shade}{border-color:rgb(var(${cg.var}-${shade})/var(--tw-border-opacity,1))}`);
      lines.push(`.from-${cg.name}-${shade}{--tw-gradient-from:rgb(var(${cg.var}-${shade})/1)}`);
      lines.push(`.to-${cg.name}-${shade}{--tw-gradient-to:rgb(var(${cg.var}-${shade})/1)}`);
    }
  }

  return lines.join("\n");
}

// ── Color picker field ────────────────────────────────────────────────────────
function ColorField({
  label, hint, value, onChange,
}: Readonly<{ label: string; hint?: string; value: string; onChange: (v: string) => void }>) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 uppercase">{value}</span>
          <div
            className="w-8 h-8 rounded-lg border border-slate-200 shadow-inner cursor-pointer overflow-hidden relative"
            style={{ backgroundColor: value }}
          >
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Palette preview */}
      <div className="flex gap-0.5 rounded-lg overflow-hidden h-6">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => {
          const palette = generatePalette(value);
          const rgb = palette[shade];
          return (
            <div
              key={shade}
              className="flex-1 h-full"
              style={{ backgroundColor: `rgb(${rgb})` }}
              title={`${shade}: rgb(${rgb})`}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Range field ───────────────────────────────────────────────────────────────
function RadiusField({
  value, onChange,
}: Readonly<{ value: string; onChange: (v: string) => void }>) {
  const num = parseFloat(value) || 0.75;
  const presets = [{ label: "Sharp", v: "0" }, { label: "Subtle", v: "0.25" }, { label: "Default", v: "0.75" }, { label: "Round", v: "1.25" }, { label: "Full", v: "2" }];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">Border radius</p>
        <span className="text-xs font-mono text-slate-500">{num}rem</span>
      </div>
      <input
        type="range"
        min="0"
        max="2"
        step="0.125"
        value={num}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-primary-600"
      />
      <div className="flex gap-2">
        {presets.map((p) => (
          <button
            key={p.v}
            type="button"
            onClick={() => onChange(p.v)}
            className={`text-xs px-2 py-1 rounded-md border transition ${
              value === p.v
                ? "bg-primary-600 text-white border-primary-600"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      {/* Live preview of radius */}
      <div className="flex gap-3 pt-1">
        {[
          { label: "Button", cls: "px-4 py-2 bg-primary-600 text-white text-xs font-semibold" },
          { label: "Card", cls: "px-4 py-3 bg-white border border-slate-200 text-xs text-slate-700 shadow-sm" },
          { label: "Badge", cls: "px-3 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium" },
        ].map((item) => (
          <div
            key={item.label}
            className={item.cls}
            style={{ borderRadius: `${num}rem` }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BrandingAdminClient({ initial, defaults }: Props) {
  const [tokens, setTokens] = useState<BrandTokens>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Live CSS injection into current admin page for preview
  useEffect(() => {
    const id = "brand-tokens-preview";
    let tag = document.getElementById(id) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.textContent = buildLiveCSS(tokens);
  }, [tokens]);

  function update<K extends keyof BrandTokens>(key: K, value: BrandTokens[K]) {
    setTokens((t) => ({ ...t, [key]: value }));
    setActivePreset(null);
  }

  function applyPreset(preset: Preset) {
    setTokens(preset.tokens);
    setActivePreset(preset.name);
  }

  function resetToDefaults() {
    setTokens(defaults);
    setActivePreset("ESDLAB (défaut)");
  }

  const exportTheme = useCallback(() => {
    const json = JSON.stringify({ version: 1, tokens }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `esdlab-theme-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [tokens]);

  function importTheme(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.tokens) {
          setTokens({ ...defaults, ...data.tokens });
          setActivePreset(null);
        }
      } catch {
        setMsg({ type: "err", text: "Fichier JSON invalide." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const payload: Record<string, string> = {};
      for (const [key, value] of Object.entries(tokens)) {
        payload[`brand.${key}`] = String(value);
      }
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg({ type: "ok", text: "Thème enregistré — les changements sont visibles sur le site." });
        setTimeout(() => setMsg(null), 5000);
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
    <div className="p-6 lg:p-8 max-w-5xl space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branding & Thème</h1>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez l&apos;apparence du site en temps réel.{" "}
            <a href="/" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline font-medium">
              Voir le site ↗
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 cursor-pointer transition-colors">
            Importer
            <input type="file" accept=".json" onChange={importTheme} className="sr-only" />
          </label>
          <button
            type="button"
            onClick={exportTheme}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Exporter
          </button>
          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Réinitialiser
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

      {/* ── Presets ────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Presets de thème</h3>
          <p className="text-xs text-slate-500 mt-0.5">Appliquer un thème complet en un clic</p>
        </div>
        <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                activePreset === preset.name
                  ? "border-primary-600 bg-primary-50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              {/* Color swatches */}
              <div className="flex gap-1.5 mb-3">
                {[preset.tokens.primaryColor, preset.tokens.secondaryColor, preset.tokens.accentColor].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-tight">{preset.name}</p>
              {activePreset === preset.name && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary-600 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Couleurs ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Palette de couleurs</h3>
            <p className="text-xs text-slate-500 mt-0.5">Chaque couleur génère automatiquement 11 nuances (50–950)</p>
          </div>
          <div className="px-6 py-5 space-y-6">
            <ColorField
              label="Couleur primaire"
              hint="Boutons, liens, éléments d'interface admin"
              value={tokens.primaryColor}
              onChange={(v) => update("primaryColor", v)}
            />
            <ColorField
              label="Couleur secondaire"
              hint="Pages publiques, CTAs, accents visuels"
              value={tokens.secondaryColor}
              onChange={(v) => update("secondaryColor", v)}
            />
            <ColorField
              label="Couleur accent"
              hint="Badges, highlights, éléments décoratifs"
              value={tokens.accentColor}
              onChange={(v) => update("accentColor", v)}
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Fond de page</p>
                  <p className="text-xs text-slate-400 mt-0.5">Couleur de fond du body</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 uppercase">{tokens.bgColor}</span>
                  <div
                    className="w-8 h-8 rounded-lg border border-slate-200 shadow-inner cursor-pointer overflow-hidden relative"
                    style={{ backgroundColor: tokens.bgColor }}
                  >
                    <input
                      type="color"
                      value={tokens.bgColor}
                      onChange={(e) => update("bgColor", e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Typographie + Radius + Animations ────────────────────────────── */}
        <div className="space-y-6">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Typographie</h3>
              <p className="text-xs text-slate-500 mt-0.5">Polices appliquées aux titres et au corps de texte</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-slate-800">Police des titres (display)</p>
                <select
                  value={tokens.fontHeading}
                  onChange={(e) => update("fontHeading", e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <p className="text-2xl mt-2" style={{ fontFamily: `"${tokens.fontHeading}", Georgia, serif` }}>
                  Titre exemple — AaBbCc
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-slate-800">Police du corps (body)</p>
                <select
                  value={tokens.fontBody}
                  onChange={(e) => update("fontBody", e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {FONT_BODY_OPTIONS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: `"${tokens.fontBody}", system-ui, sans-serif` }}>
                  Paragraphe exemple — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Arrondi des éléments</h3>
            </div>
            <div className="px-6 py-5">
              <RadiusField value={tokens.radius} onChange={(v) => update("radius", v)} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Animations</h3>
            </div>
            <div className="px-6 py-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Activer les animations</p>
                  <p className="text-xs text-slate-400 mt-0.5">Framer Motion — scroll, entrées, hover</p>
                </div>
                <div
                  onClick={() => update("animationsEnabled", tokens.animationsEnabled === "true" ? "false" : "true")}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    tokens.animationsEnabled === "true" ? "bg-primary-600" : "bg-slate-200"
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    tokens.animationsEnabled === "true" ? "translate-x-5" : "translate-x-0.5"
                  }`} />
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* ── Live Preview ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Aperçu en direct</h3>
            <p className="text-xs text-slate-500 mt-0.5">Les couleurs se mettent à jour en temps réel</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="p-6 space-y-6" style={{ backgroundColor: tokens.bgColor }}>

          {/* Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Boutons</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                style={{ borderRadius: `${tokens.radius}rem` }}>
                Primaire
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-secondary-600 hover:bg-secondary-700 transition-colors"
                style={{ borderRadius: `${tokens.radius}rem` }}>
                Secondaire
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-accent-600 hover:bg-accent-700 transition-colors"
                style={{ borderRadius: `${tokens.radius}rem` }}>
                Accent
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold border border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
                style={{ borderRadius: `${tokens.radius}rem` }}>
                Outline
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Cards</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { bg: "bg-white", border: "border-slate-200", title: "Card standard", sub: "Fond blanc, bordure subtile" },
                { bg: "bg-primary-50", border: "border-primary-200", title: "Card primaire", sub: "Teinte primaire légère" },
                { bg: "bg-secondary-950 text-white", border: "border-secondary-800", title: "Card sombre", sub: "Dark avec accent secondaire" },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`p-4 border ${card.bg} ${card.border}`}
                  style={{ borderRadius: `${tokens.radius}rem` }}
                >
                  <p className="font-semibold text-sm">{card.title}</p>
                  <p className="text-xs mt-1 opacity-70">{card.sub}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">Badge</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">Tag</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Typographie</p>
            <div className="bg-white border border-slate-100 p-5" style={{ borderRadius: `${tokens.radius}rem` }}>
              <p className="text-3xl font-bold text-slate-900" style={{ fontFamily: `"${tokens.fontHeading}", Georgia, serif` }}>
                Titre principal — DigiLab Corporate
              </p>
              <p className="text-sm text-slate-600 mt-2" style={{ fontFamily: `"${tokens.fontBody}", system-ui, sans-serif` }}>
                Corps de texte — Affichage dynamique premium pour entreprises, institutions et commerces d&apos;Afrique de l&apos;Ouest.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-secondary-600"
                  style={{ borderRadius: `${tokens.radius}rem` }}>
                  Demander une démo
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-secondary-700 border border-secondary-300 bg-secondary-50"
                  style={{ borderRadius: `${tokens.radius}rem` }}>
                  Découvrir
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
