import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_META: Record<
  string,
  { label: string; color: string; bg: string; bar: string; dot: string }
> = {
  nouveau:  { label: "Nouveau",  color: "text-blue-700",    bg: "bg-blue-50",    bar: "bg-blue-400",    dot: "bg-blue-400" },
  qualifie: { label: "Qualifié", color: "text-indigo-700",  bg: "bg-indigo-50",  bar: "bg-indigo-400",  dot: "bg-indigo-400" },
  contacte: { label: "Contacté", color: "text-amber-700",   bg: "bg-amber-50",   bar: "bg-amber-400",   dot: "bg-amber-400" },
  demo:     { label: "Démo",     color: "text-violet-700",  bg: "bg-violet-50",  bar: "bg-violet-400",  dot: "bg-violet-400" },
  gagne:    { label: "Gagné",    color: "text-emerald-700", bg: "bg-emerald-50", bar: "bg-emerald-500", dot: "bg-emerald-500" },
  perdu:    { label: "Perdu",    color: "text-rose-700",    bg: "bg-rose-50",    bar: "bg-rose-400",    dot: "bg-rose-400" },
};

const FUNNEL_STEPS = ["nouveau", "qualifie", "contacte", "demo", "gagne"] as const;

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function fmtDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}
function fmtDateTime(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}
function fmtMonth(d: Date) {
  return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
}

export default async function DashboardPage() {
  const now = new Date();
  const today = startOfDay(now);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [
    totalLeads,
    leadsThisWeek,
    leadsLastWeek,
    leadsLast30,
    leadsSixMonths,
    leadsByStatus,
    leadsBySource,
    leadsBySecteur,
    urgentLeads,
    recentLeads,
    publishedServices,
    publishedPages,
    totalUsers,
    totalMedias,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.count({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } } }),
    prisma.lead.findMany({ where: { createdAt: { gte: thirtyDaysAgo } }, select: { createdAt: true } }),
    prisma.lead.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.lead.groupBy({ by: ["source"], _count: { _all: true }, orderBy: { _count: { source: "desc" } }, take: 5 }),
    prisma.lead.groupBy({ by: ["secteur"], _count: { _all: true }, orderBy: { _count: { secteur: "desc" } }, take: 6 }),
    prisma.lead.count({ where: { status: "nouveau", createdAt: { lt: weekAgo } } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, name: true, email: true, company: true, secteur: true, status: true, source: true, createdAt: true },
    }),
    prisma.service.count({ where: { published: true } }),
    prisma.page.count({ where: { published: true } }),
    prisma.user.count({ where: { status: "active" } }),
    prisma.media.count(),
  ]);

  let weekDelta: number;
  if (leadsLastWeek === 0) {
    weekDelta = leadsThisWeek > 0 ? 100 : 0;
  } else {
    weekDelta = Math.round(((leadsThisWeek - leadsLastWeek) / leadsLastWeek) * 100);
  }

  const wonCount = leadsByStatus.find((s) => s.status === "gagne")?._count._all ?? 0;
  const lostCount = leadsByStatus.find((s) => s.status === "perdu")?._count._all ?? 0;
  const closedCount = wonCount + lostCount;
  const conversionRate = closedCount === 0 ? 0 : Math.round((wonCount / closedCount) * 100);
  const inProgress = totalLeads - wonCount - lostCount;

  // 14-day chart
  const days: { date: Date; count: number; label: string }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({ date: d, count: 0, label: fmtDate(d) });
  }
  for (const lead of leadsLast30) {
    const d = startOfDay(lead.createdAt);
    const idx = days.findIndex((x) => x.date.getTime() === d.getTime());
    if (idx >= 0) days[idx].count++;
  }
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  // 6-month chart
  const months: { label: string; key: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    months.push({ label: fmtMonth(d), key: `${d.getFullYear()}-${d.getMonth()}`, count: 0 });
  }
  for (const lead of leadsSixMonths) {
    const d = lead.createdAt;
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const m = months.find((x) => x.key === key);
    if (m) m.count++;
  }
  const maxMonth = Math.max(1, ...months.map((m) => m.count));

  // Pipeline funnel
  const funnelData = FUNNEL_STEPS.map((step) => ({
    status: step,
    count: leadsByStatus.find((s) => s.status === step)?._count._all ?? 0,
  }));
  const funnelMax = Math.max(1, funnelData[0].count);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-sm text-slate-500 mt-0.5">Vue d&apos;ensemble de votre activité commerciale</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {urgentLeads > 0 && (
            <Link
              href="/admin/leads"
              className="flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              {urgentLeads} lead{urgentLeads > 1 ? "s" : ""} en attente &gt;7j
            </Link>
          )}
          <div className="text-xs text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
            {fmtDateTime(now)}
          </div>
        </div>
      </div>

      {/* ── KPI row ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiCard label="Leads totaux"    value={totalLeads}            accent="from-primary-700 to-primary-500"   href="/admin/leads" />
        <KpiCard label="Cette semaine"   value={leadsThisWeek}         delta={weekDelta} accent="from-blue-600 to-cyan-500" />
        <KpiCard label="En cours"        value={inProgress}            sub="à traiter"   accent="from-amber-500 to-orange-500" href="/admin/leads" />
        <KpiCard label="Taux conversion" value={`${conversionRate}%`}  sub={`${wonCount} gagnés`} accent="from-emerald-600 to-teal-500" />
        <KpiCard
          label="Urgents"
          value={urgentLeads}
          sub="nouveau >7j"
          accent={urgentLeads > 0 ? "from-red-600 to-rose-500" : "from-slate-400 to-slate-300"}
          href="/admin/leads"
          urgency={urgentLeads > 0}
        />
      </div>

      {/* ── 14-day chart + Funnel ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-semibold text-slate-900">Leads — 14 derniers jours</h2>
              <p className="text-xs text-slate-500 mt-0.5">{leadsLast30.length} demandes sur 30j</p>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-44">
            {days.map((d) => {
              const h = (d.count / maxDay) * 100;
              return (
                <div key={d.date.toISOString()} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="text-[10px] font-bold text-primary-700 opacity-0 group-hover:opacity-100 transition leading-none">
                    {d.count > 0 ? d.count : ""}
                  </div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary-700 to-primary-400 hover:opacity-75 transition min-h-[2px]"
                    style={{ height: `${Math.max(h, d.count > 0 ? 4 : 0)}%` }}
                    title={`${d.label} : ${d.count} lead${d.count > 1 ? "s" : ""}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400">
            <span>{days[0].label}</span>
            <span>{days[6].label}</span>
            <span>{days.at(-1)?.label}</span>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-0.5">Entonnoir pipeline</h2>
          <p className="text-xs text-slate-500 mb-4">Flux de conversion</p>
          <div className="space-y-3">
            {funnelData.map((step, i) => {
              const meta = STATUS_META[step.status];
              const pct = Math.round((step.count / funnelMax) * 100);
              const convPct =
                i > 0 && funnelData[i - 1].count > 0
                  ? Math.round((step.count / funnelData[i - 1].count) * 100)
                  : null;
              return (
                <div key={step.status}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${meta.dot} shrink-0`} />
                      <span className="text-xs font-medium text-slate-700">{meta.label}</span>
                      {convPct !== null && (
                        <span className="text-[10px] text-slate-400 ml-0.5">↓{convPct}%</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{step.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${meta.bar} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs">
            <span className="text-slate-500">Perdu : <strong className="text-rose-600">{lostCount}</strong></span>
            <span className="text-slate-500">Gagné : <strong className="text-emerald-600">{wonCount}</strong></span>
          </div>
        </section>
      </div>

      {/* ── Tendance 6 mois + Secteurs ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-0.5">Tendance mensuelle</h2>
          <p className="text-xs text-slate-500 mb-5">Leads sur les 6 derniers mois</p>
          <div className="flex items-end gap-3 h-36">
            {months.map((m) => {
              const h = (m.count / maxMonth) * 100;
              return (
                <div key={m.key} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-xs font-bold text-indigo-700 opacity-0 group-hover:opacity-100 transition">
                    {m.count > 0 ? m.count : ""}
                  </div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-blue-400 transition-all min-h-[3px]"
                    style={{ height: `${Math.max(h, m.count > 0 ? 6 : 0)}%` }}
                    title={`${m.label} : ${m.count}`}
                  />
                  <span className="text-[10px] text-slate-500 font-medium">{m.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-0.5">Par secteur</h2>
          <p className="text-xs text-slate-500 mb-4">
            {leadsBySecteur.length > 0 ? `Top ${leadsBySecteur.length} secteurs` : "Aucune donnée"}
          </p>
          {leadsBySecteur.length === 0 ? (
            <p className="text-sm text-slate-400 italic">Les secteurs apparaîtront ici.</p>
          ) : (
            <div className="space-y-3">
              {leadsBySecteur.map((s) => {
                const pct = totalLeads === 0 ? 0 : Math.round((s._count._all / totalLeads) * 100);
                return (
                  <div key={s.secteur ?? "nc"}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-medium truncate max-w-[160px]">
                        {s.secteur ?? <span className="italic text-slate-400">Non renseigné</span>}
                      </span>
                      <span className="text-slate-900 font-semibold ml-2">
                        {s._count._all}
                        <span className="text-slate-400 font-normal ml-1">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* ── Leads récents + sidebar droite ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Derniers leads</h2>
              <p className="text-xs text-slate-500 mt-0.5">Les 8 plus récents</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-semibold text-primary-700 hover:underline">
              Voir tout →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">Aucun lead pour le moment.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentLeads.map((l) => {
                const meta = STATUS_META[l.status] ?? STATUS_META.nouveau;
                const isUrgent = l.status === "nouveau" && l.createdAt < weekAgo;
                return (
                  <Link
                    key={l.id}
                    href={`/admin/leads/${l.id}`}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${
                      isUrgent
                        ? "bg-red-100 text-red-700 ring-2 ring-red-300"
                        : "bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800"
                    }`}>
                      {l.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-900 truncate">
                        {l.name}
                        {l.company ? <span className="text-slate-500 font-normal"> · {l.company}</span> : null}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-400 truncate">{l.email}</span>
                        {l.secteur && (
                          <>
                            <span className="text-slate-200 text-xs">·</span>
                            <span className="text-xs text-slate-400 truncate">{l.secteur}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isUrgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-200">!</span>
                      )}
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 hidden sm:block min-w-[72px] text-right">
                      {fmtDate(l.createdAt)}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <div className="space-y-4">
          {/* Répartition statuts */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Par statut</h2>
            <div className="space-y-2">
              {Object.keys(STATUS_META).map((key) => {
                const meta = STATUS_META[key];
                const c = leadsByStatus.find((s) => s.status === key)?._count._all ?? 0;
                const pct = totalLeads === 0 ? 0 : Math.round((c / totalLeads) * 100);
                return (
                  <Link key={key} href="/admin/leads" className="flex items-center gap-2.5 group">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${meta.bg} ${meta.color} min-w-[74px] text-center`}>
                      {meta.label}
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${meta.bar} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 min-w-[20px] text-right">{c}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Sources */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Top sources</h2>
            {leadsBySource.length === 0 ? (
              <p className="text-sm text-slate-400">Aucune donnée</p>
            ) : (
              <div className="space-y-2">
                {leadsBySource.map((s) => {
                  const pct = totalLeads === 0 ? 0 : Math.round((s._count._all / totalLeads) * 100);
                  return (
                    <div key={s.source ?? "none"} className="flex items-center gap-2 text-xs">
                      <span className="text-slate-600 truncate flex-1">
                        {s.source ?? <span className="italic text-slate-400">Non spécifiée</span>}
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="font-semibold text-slate-800 min-w-[16px] text-right">{s._count._all}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Contenu publié */}
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Contenu publié</h2>
            <div className="grid grid-cols-2 gap-2">
              <ContentStat href="/admin/services" label="Services" count={publishedServices} />
              <ContentStat href="/admin/pages"    label="Pages"    count={publishedPages} />
              <ContentStat href="/admin/medias"   label="Médias"   count={totalMedias} />
              <ContentStat href="/admin/users"    label="Admins"   count={totalUsers} />
            </div>
          </section>
        </div>
      </div>

      {/* ── Actions rapides ──────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Actions rapides</h2>
          <span className="text-xs text-white/50">{totalLeads} leads au total</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickAction href="/"                   label="Page d'accueil"    sub="Voir le site public" external />
          <QuickAction href="/admin/leads"        label="Gérer les leads"   sub={`${inProgress} en cours`} />
          <QuickAction href="/admin/services/new" label="Nouveau service"   sub="Ajouter au catalogue" />
          <QuickAction href="/admin/pages"        label="Éditer les pages"  sub={`${publishedPages} publiées`} />
          <QuickAction href="/admin/settings"     label="Réglages site"     sub="Configuration générale" />
        </div>
      </section>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────

function getDeltaColor(d: number): string {
  if (d > 0) return "text-emerald-600";
  if (d < 0) return "text-rose-600";
  return "text-slate-500";
}
function getDeltaArrow(d: number): string {
  if (d > 0) return "↑";
  if (d < 0) return "↓";
  return "→";
}

interface KpiCardProps {
  readonly label: string;
  readonly value: number | string;
  readonly sub?: string;
  readonly delta?: number;
  readonly accent: string;
  readonly href?: string;
  readonly urgency?: boolean;
}

function KpiCard({ label, value, sub, delta, accent, href, urgency }: KpiCardProps) {
  const content = (
    <div className={`bg-white rounded-xl border p-5 hover:shadow-md transition ${urgency ? "border-red-200 ring-1 ring-red-200" : "border-slate-200"}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide leading-tight">{label}</span>
        <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent} opacity-90 shrink-0`} />
      </div>
      <div className={`text-3xl font-bold ${urgency ? "text-red-700" : "text-slate-900"}`}>{value}</div>
      {typeof delta === "number" && (
        <div className={`text-xs mt-1 font-medium ${getDeltaColor(delta)}`}>
          {getDeltaArrow(delta)} {Math.abs(delta)}% vs sem. préc.
        </div>
      )}
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

interface QuickActionProps {
  readonly href: string;
  readonly label: string;
  readonly sub: string;
  readonly external?: boolean;
}

function QuickAction({ href, label, sub, external }: QuickActionProps) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl px-4 py-3.5 transition group"
    >
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold truncate">{label}</span>
        {external && <span className="text-white/60 text-xs">↗</span>}
      </div>
      <div className="text-xs text-white/60 mt-0.5 group-hover:text-white/80 transition truncate">{sub}</div>
    </Link>
  );
}

interface ContentStatProps {
  readonly href: string;
  readonly label: string;
  readonly count: number;
}

function ContentStat({ href, label, count }: ContentStatProps) {
  return (
    <Link href={href} className="flex flex-col p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
      <span className="text-lg font-bold text-slate-900">{count}</span>
      <span className="text-[11px] text-slate-500 mt-0.5">{label}</span>
    </Link>
  );
}
