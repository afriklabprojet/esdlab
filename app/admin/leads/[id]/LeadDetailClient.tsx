"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_OPTIONS = [
  { value: "nouveau", label: "Nouveau", color: "bg-blue-100 text-blue-700" },
  { value: "qualifie", label: "Qualifié", color: "bg-yellow-100 text-yellow-700" },
  { value: "contacte", label: "Contacté", color: "bg-purple-100 text-purple-700" },
  { value: "demo", label: "Démo", color: "bg-orange-100 text-orange-700" },
  { value: "gagne", label: "Gagné", color: "bg-green-100 text-green-700" },
  { value: "perdu", label: "Perdu", color: "bg-red-100 text-red-700" },
];

interface Note {
  id: string;
  note: string;
  createdAt: Date | string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  secteur?: string | null;
  taille?: string | null;
  besoin?: string | null;
  message?: string | null;
  status: string;
  assignedTo?: string | null;
  source?: string | null;
  createdAt: Date | string;
  notes: Note[];
}

export default function LeadDetailClient({ lead: initialLead }: { lead: Lead }) {
  const router = useRouter();
  const [lead, setLead] = useState(initialLead);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const updateStatus = async (status: string) => {
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLead((l) => ({ ...l, status }));
      router.refresh();
    }
    setSaving(false);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    setNoteLoading(true);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote.trim() }),
    });
    if (res.ok) {
      const updated = await fetch(`/api/admin/leads/${lead.id}`).then((r) => r.json());
      setLead(updated);
      setNewNote("");
    }
    setNoteLoading(false);
  };

  const statusInfo = STATUS_OPTIONS.find((s) => s.value === lead.status);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/leads" className="hover:text-slate-800 transition-colors">← Leads</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{lead.name}</span>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom" value={lead.name} />
          <Field label="Email" value={<a href={`mailto:${lead.email}`} className="text-primary-600 hover:underline">{lead.email}</a>} />
          {lead.phone && <Field label="Téléphone" value={<a href={`tel:${lead.phone}`} className="text-primary-600 hover:underline">{lead.phone}</a>} />}
          {lead.company && <Field label="Entreprise" value={lead.company} />}
          {lead.secteur && <Field label="Secteur" value={lead.secteur} />}
          {lead.taille && <Field label="Taille" value={lead.taille} />}
          {lead.besoin && <Field label="Besoin" value={lead.besoin} />}
          <Field label="Source" value={lead.source ?? "formulaire-contact"} />
          <Field
            label="Date"
            value={new Date(lead.createdAt).toLocaleString("fr-FR", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          />
          {lead.message && (
            <div className="sm:col-span-2">
              <Field label="Message" value={<span className="whitespace-pre-wrap">{lead.message}</span>} />
            </div>
          )}
        </div>

        {/* Statut */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Statut commercial</h2>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateStatus(opt.value)}
                disabled={saving}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all border-2 ${
                  lead.status === opt.value
                    ? `${opt.color} border-current`
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {statusInfo && (
            <p className="mt-3 text-sm text-slate-500">
              Statut actuel : <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Notes internes</h2>
          <div className="flex gap-3 mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={2}
              placeholder="Ajouter une note…"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none resize-none"
            />
            <button
              onClick={addNote}
              disabled={noteLoading || !newNote.trim()}
              className="self-start rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {noteLoading ? "…" : "Ajouter"}
            </button>
          </div>
          {lead.notes.length === 0 ? (
            <p className="text-sm text-slate-400 italic">Aucune note pour ce lead.</p>
          ) : (
            <ul className="space-y-3">
              {lead.notes.map((n) => (
                <li key={n.id} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{n.note}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(n.createdAt).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{label}</p>
      <p className="text-sm text-slate-800">{value}</p>
    </div>
  );
}
