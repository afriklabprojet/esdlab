"use client";

import { useState } from "react";

interface Props {
  readonly initialEnabled: boolean;
  readonly initialMessage: string;
  readonly initialEta: string;
}

export default function MaintenanceAdminClient({ initialEnabled, initialMessage, initialEta }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [message, setMessage] = useState(initialMessage);
  const [eta, setEta] = useState(initialEta);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  async function toggle() {
    const next = !enabled;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/maintenance", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next, message, eta }),
      });
      if (res.ok) {
        setEnabled(next);
        setMsg({
          type: "ok",
          text: next
            ? "Mode maintenance activé — les visiteurs voient la page de maintenance."
            : "Mode maintenance désactivé — le site est accessible à tous.",
        });
        setTimeout(() => setMsg(null), 6000);
      } else {
        setMsg({ type: "err", text: "Erreur lors du changement de mode." });
      }
    } catch {
      setMsg({ type: "err", text: "Impossible de contacter le serveur." });
    } finally {
      setSaving(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/maintenance", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, eta }),
      });
      if (res.ok) {
        setMsg({ type: "ok", text: "Paramètres enregistrés." });
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
    <div className="p-6 lg:p-8 max-w-3xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mode maintenance</h1>
        <p className="text-sm text-slate-500 mt-1">
          Activez le mode maintenance pour bloquer l&apos;accès public pendant les mises à jour.
          Vous continuez à naviguer normalement en tant qu&apos;admin.
        </p>
      </div>

      {/* Toast */}
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

      {/* Main toggle card */}
      <div className={`rounded-2xl border-2 p-6 transition-all ${
        enabled ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
      }`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              enabled ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
            }`}>
              {enabled ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-bold text-slate-900">
                {enabled ? "Maintenance activée" : "Site en ligne"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {enabled
                  ? "Les visiteurs voient la page de maintenance. Vous avez un accès complet."
                  : "Le site est accessible à tous les visiteurs."}
              </p>
            </div>
          </div>
          <button
            onClick={toggle}
            disabled={saving}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
              enabled
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {saving ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            ) : null}
            {enabled ? "Désactiver la maintenance" : "Activer la maintenance"}
          </button>
        </div>

        {/* Status indicator */}
        {enabled && (
          <div className="mt-4 flex items-center gap-2 text-xs text-amber-700 bg-amber-100/60 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            Mode maintenance actif — votre session admin vous donne un accès complet au site et au dashboard.
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Paramètres de la page</h3>
            <p className="text-xs text-slate-500 mt-0.5">Message et heure de retour affichés aux visiteurs</p>
          </div>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Message affiché aux visiteurs
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition"
              placeholder="Nous effectuons une mise à jour pour améliorer votre expérience."
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              Date/heure de retour estimée
              <span className="ml-1 text-xs font-normal text-slate-400">(optionnel — affiche un compte à rebours)</span>
            </label>
            <input
              type="datetime-local"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white transition"
            />
            {eta && (
              <p className="text-xs text-slate-400">
                Un compte à rebours sera affiché jusqu&apos;à : <strong>{new Date(eta).toLocaleString("fr-FR")}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Aperçu de la page</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ce que voient vos visiteurs pendant la maintenance</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/maintenance"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Ouvrir ↗
            </a>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              {showPreview ? "Masquer" : "Afficher"}
            </button>
          </div>
        </div>
        {showPreview && (
          <div className="w-full h-[500px] bg-slate-900">
            <iframe
              src="/maintenance"
              className="w-full h-full border-0"
              title="Aperçu maintenance"
            />
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 px-4 py-3.5 bg-blue-50 border border-blue-200 rounded-xl">
        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <div className="text-xs text-blue-700 space-y-1">
          <p className="font-semibold text-blue-800">Comment ça fonctionne</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>Les visiteurs non connectés sont redirigés vers la page de maintenance.</li>
            <li>Votre session admin vous donne un accès complet — vous pouvez tester les modifications en live.</li>
            <li>Les APIs admin restent accessibles uniquement aux administrateurs.</li>
            <li>La désactivation est immédiate : le site redevient accessible en quelques secondes.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
