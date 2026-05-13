"use client";

import { useState } from "react";
import Link from "next/link";

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
  createdAt: Date | string;
}

interface Props {
  readonly leads: Lead[];
  readonly statusCounts: Record<string, number>;
  readonly statusLabels: Record<string, string>;
}

const STATUS_COLORS: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-700",
  qualifie: "bg-yellow-100 text-yellow-700",
  contacte: "bg-purple-100 text-purple-700",
  demo: "bg-orange-100 text-orange-700",
  gagne: "bg-green-100 text-green-700",
  perdu: "bg-red-100 text-red-700",
};

export default function AdminLeadsClient({ leads, statusCounts, statusLabels }: Props) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const total = leads.length;

  // Funnel de conversion
  const totalLeads = Object.values(statusCounts).reduce((s, v) => s + v, 0);
  const funnelSteps = [
    { key: "nouveau", label: "Nouveaux", color: "bg-blue-500" },
    { key: "qualifie", label: "Qualifiés", color: "bg-yellow-500" },
    { key: "contacte", label: "Contactés", color: "bg-purple-500" },
    { key: "demo", label: "Démo", color: "bg-orange-500" },
    { key: "gagne", label: "Gagnés", color: "bg-green-500" },
  ];

  const conversionRate = totalLeads > 0
    ? Math.round(((statusCounts["gagne"] ?? 0) / totalLeads) * 100)
    : 0;

  // Leads des 7 derniers jours
  const now = Date.now();
  const last7d = leads.filter((l) => now - new Date(l.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000).length;

  function exportCsv() {
    const params = filter !== "all" ? `?status=${filter}` : "";
    window.location.href = `/api/admin/leads/export${params}`;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <button
          type="button"
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exporter CSV
        </button>
      </div>
        {/* KPIs synthétiques */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Total leads</p>
            <p className="text-4xl font-bold text-slate-900">{totalLeads}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">7 derniers jours</p>
            <p className="text-4xl font-bold text-primary-600">{last7d}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Taux conversion</p>
            <p className="text-4xl font-bold text-green-600">{conversionRate}%</p>
            <p className="text-xs text-slate-400 mt-0.5">lead → gagné</p>
          </div>
        </div>

        {/* Funnel de conversion */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">Funnel de conversion</h2>
          <div className="flex items-end gap-3 overflow-x-auto pb-2">
            {funnelSteps.map((step, i) => {
              const count = statusCounts[step.key] ?? 0;
              const pct = totalLeads > 0 ? Math.max(10, Math.round((count / totalLeads) * 100)) : 10;
              return (
                <div key={step.key} className="flex flex-col items-center gap-2 flex-1 min-w-[60px]">
                  {i > 0 && (
                    <div className="text-slate-300 text-lg self-center" style={{ position: "relative", top: "-10px" }}>›</div>
                  )}
                  <div className="w-full flex flex-col items-center">
                    <div
                      className={`w-full rounded-t-xl ${step.color} transition-all`}
                      style={{ height: `${pct * 1.2}px`, opacity: 0.85 }}
                    />
                    <div className="bg-slate-50 border border-slate-200 w-full rounded-b-xl px-2 py-2 text-center">
                      <p className="text-lg font-bold text-slate-900">{count}</p>
                      <p className="text-xs text-slate-500 leading-tight">{step.label}</p>
                      {totalLeads > 0 && (
                        <p className="text-xs font-semibold text-slate-400">{Math.round((count / totalLeads) * 100)}%</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats par statut */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {Object.entries(statusLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? "all" : key)}
              className={`rounded-xl border p-3 text-left transition-all ${
                filter === key ? "border-primary-500 bg-primary-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-2xl font-bold text-slate-900">{statusCounts[key] ?? 0}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </button>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            placeholder="Rechercher nom, email, entreprise…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none"
          >
            <option value="all">Tous les statuts ({total})</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label} ({statusCounts[key] ?? 0})
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="text-lg">Aucun lead trouvé</p>
              <p className="text-sm mt-1">Modifiez vos filtres ou attendez de nouvelles demandes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Contact</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Secteur</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Besoin</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Statut</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                        {lead.company && <p className="text-xs text-slate-400">{lead.company}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                        {lead.secteur ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">
                        {lead.besoin ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[lead.status] ?? "bg-slate-100 text-slate-600"}`}>
                          {statusLabels[lead.status] ?? lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs hidden sm:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-primary-600 hover:text-primary-800 font-medium text-xs"
                        >
                          Voir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </div>
  );
}
