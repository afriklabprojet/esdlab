"use client";

import Link from "next/link";
import { useState } from "react";

interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  order: number;
  published: boolean;
  updatedAt: Date | string;
}

interface ServicesClientProps { readonly initialServices: Service[] }

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const [services, setServices] = useState(initialServices);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function togglePublished(s: Service) {
    setBusyId(s.id);
    const res = await fetch(`/api/admin/services/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !s.published }),
    });
    if (res.ok) {
      setServices((arr) => arr.map((x) => (x.id === s.id ? { ...x, published: !s.published } : x)));
    }
    setBusyId(null);
  }

  async function remove(s: Service) {
    if (!confirm(`Supprimer "${s.title}" ?`)) return;
    setBusyId(s.id);
    const res = await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
    if (res.ok) setServices((arr) => arr.filter((x) => x.id !== s.id));
    setBusyId(null);
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-600 mt-1">{services.length} services configurés</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg text-sm font-semibold transition"
        >
          + Nouveau service
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-xs font-semibold text-slate-600 uppercase">
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">{s.order}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{s.title}</div>
                  <div className="text-xs text-slate-500">{s.subtitle}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 font-mono">{s.slug}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => togglePublished(s)}
                    disabled={busyId === s.id}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      s.published
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s.published ? "Publié" : "Brouillon"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="text-sm text-primary-700 hover:underline font-medium"
                  >
                    Éditer
                  </Link>
                  <button
                    onClick={() => remove(s)}
                    disabled={busyId === s.id}
                    className="text-sm text-red-600 hover:underline font-medium"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500 text-sm">
                  Aucun service. Créez-en un.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
