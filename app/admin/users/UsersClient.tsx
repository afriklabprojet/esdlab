"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
};

type FormState = {
  email: string;
  name: string;
  password: string;
  role: string;
  status: string;
};

const EMPTY: FormState = { email: "", name: "", password: "", role: "commercial", status: "active" };

export default function UsersClient({ currentEmail }: Readonly<{ currentEmail: string }>) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => { setEditing(null); setForm(EMPTY); setError(null); };
  const startEdit = (u: User) => {
    setEditing(u);
    setForm({ email: u.email, name: u.name ?? "", password: "", role: u.role, status: u.status });
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const url = editing ? `/api/admin/users/${editing.id}` : "/api/admin/users";
    const method = editing ? "PATCH" : "POST";
    const payload: Record<string, unknown> = {
      email: form.email,
      name: form.name || null,
      role: form.role,
      status: form.status,
    };
    if (form.password) payload.password = form.password;
    if (!editing && !form.password) {
      setError("Mot de passe requis"); setBusy(false); return;
    }
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm(EMPTY); setEditing(null);
      await load();
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Erreur");
    }
    setBusy(false);
  };

  const remove = async (u: User) => {
    if (!confirm(`Supprimer ${u.email} ?`)) return;
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error ?? "Erreur");
    }
  };

  const submitLabel = editing ? "Enregistrer" : "Créer";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Utilisateurs</h1>
          <p className="text-slate-600 text-sm">Gestion des comptes admin</p>
        </div>
        <button onClick={startCreate} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
          + Nouvel utilisateur
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-slate-500">Chargement…</div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-left px-4 py-3 font-medium">Rôle</th>
                    <th className="text-left px-4 py-3 font-medium">Statut</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{u.name ?? u.email}</div>
                        <div className="text-slate-500 text-xs">{u.email}{u.email.toLowerCase() === currentEmail.toLowerCase() ? " (vous)" : ""}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700">{u.role}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => startEdit(u)} className="text-primary-600 hover:underline text-xs font-medium">Éditer</button>
                        <button onClick={() => remove(u)} className="text-red-600 hover:underline text-xs font-medium">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">Aucun utilisateur</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 h-fit">
          <h2 className="font-semibold text-slate-900 mb-4">{editing ? `Éditer ${editing.email}` : "Nouvel utilisateur"}</h2>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label htmlFor="u-email" className="block text-xs font-medium text-slate-700 mb-1">Email</label>
              <input id="u-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
            <div>
              <label htmlFor="u-name" className="block text-xs font-medium text-slate-700 mb-1">Nom</label>
              <input id="u-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
            <div>
              <label htmlFor="u-pwd" className="block text-xs font-medium text-slate-700 mb-1">
                Mot de passe {editing && <span className="text-slate-400">(laisser vide pour conserver)</span>}
              </label>
              <input id="u-pwd" type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
            <div>
              <label htmlFor="u-role" className="block text-xs font-medium text-slate-700 mb-1">Rôle</label>
              <select id="u-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm">
                <option value="admin">admin</option>
                <option value="editor">editor</option>
                <option value="commercial">commercial</option>
              </select>
            </div>
            <div>
              <label htmlFor="u-status" className="block text-xs font-medium text-slate-700 mb-1">Statut</label>
              <select id="u-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>}
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={busy} className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50">
                {busy ? "..." : submitLabel}
              </button>
              {editing && (
                <button type="button" onClick={startCreate} className="px-4 py-2 border border-slate-300 rounded-md text-sm">
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
