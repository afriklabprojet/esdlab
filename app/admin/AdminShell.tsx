"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface AdminShellProps {
  user: { name?: string | null; email?: string | null; role?: string };
  newLeadsCount?: number;
  children: React.ReactNode;
}

// ── Icônes SVG inline (Heroicons outline) ───────────────────────────────────
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}
function IconInbox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  );
}
function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}
function IconCog() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
function IconPhoto() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}
function IconFooter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  );
}
function IconHeader() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
    </svg>
  );
}
function IconInfo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 11v5m0-8.25v.5" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M2.25 6.338c0-.966.694-1.8 1.655-1.96l2.653-.442a1.125 1.125 0 0 1 1.218.756l1.07 3.212c.198.593.014 1.248-.46 1.642L7.1 10.76c.99 2.016 2.587 3.614 4.602 4.603l1.214-1.285a1.125 1.125 0 0 1 1.642-.461l3.212 1.07a1.125 1.125 0 0 1 .756 1.218l-.442 2.653c-.16.961-.994 1.655-1.96 1.655C7.822 20.312 3.687 16.177 2.25 10.838c0-.001 0-.001 0-.002V6.338Z" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
      <path d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
function IconExternalLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
  badge?: number;
}

interface NavLinksProps {
  readonly mobile?: boolean;
  readonly nav: NavItem[];
  readonly pathname: string;
  readonly onClose: () => void;
}

function NavLinks({ mobile = false, nav, pathname, onClose }: NavLinksProps) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Menu</p>
      {nav.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => mobile && onClose()}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active
                ? "bg-primary-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className={`text-[11px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 ${
                active ? "bg-white/20 text-white" : "bg-red-500 text-white"
              }`}>
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

interface UserSectionProps {
  readonly initials: string;
  readonly user: { name?: string | null; email?: string | null; role?: string };
}

function UserSection({ initials, user }: UserSectionProps) {
  return (
    <div className="px-3 py-4 border-t border-slate-100">
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center text-primary-900 font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{user.name || user.email}</p>
          <p className="text-xs text-slate-500 capitalize">{user.role ?? "admin"}</p>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-150"
      >
        <IconLogout />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}

export default function AdminShell({ user, newLeadsCount = 0, children }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav: NavItem[] = [
    { href: "/admin", label: "Tableau de bord", icon: <IconGrid />, exact: true },
    { href: "/admin/leads", label: "Leads", icon: <IconInbox />, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { href: "/admin/home", label: "Page d'accueil", icon: <IconHome /> },
    { href: "/admin/header", label: "En-tête", icon: <IconHeader /> },
    { href: "/admin/a-propos", label: "À propos", icon: <IconInfo /> },
    { href: "/admin/contact", label: "Contact", icon: <IconPhone /> },
    { href: "/admin/footer", label: "Pied de page", icon: <IconFooter /> },
    { href: "/admin/produits", label: "Produits", icon: <IconGrid /> },
    { href: "/admin/services", label: "Services", icon: <IconWrench /> },
    { href: "/admin/pages", label: "Pages", icon: <IconDocument /> },
    { href: "/admin/settings", label: "Réglages", icon: <IconCog /> },
    { href: "/admin/medias", label: "Médias", icon: <IconPhoto /> },
    { href: "/admin/users", label: "Utilisateurs", icon: <IconUsers /> },
  ];

  const initials = (user.name?.[0] || user.email?.[0] || "?").toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar desktop fixe ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-30">
        <div className="px-5 py-4 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              ED
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">ESDLab Technologies</p>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">Administration</p>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium text-primary-700 hover:text-primary-900 bg-primary-50 hover:bg-primary-100 px-2.5 py-1.5 rounded-lg transition w-full"
          >
            <IconExternalLink />
            <span>Voir le site public</span>
          </Link>
        </div>
        <NavLinks nav={nav} pathname={pathname} onClose={() => setSidebarOpen(false)} />
        <UserSection initials={initials} user={user} />
      </aside>

      {/* ── Barre mobile fixe ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 flex items-center justify-between px-4 h-14 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            ED
          </div>
          <span className="font-bold text-slate-900 text-sm">ESDLAB Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          aria-label="Ouvrir le menu"
        >
          <IconMenu />
        </button>
      </div>

      {/* ── Drawer mobile ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
            aria-label="Fermer le menu"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-72 bg-white h-full shadow-2xl z-10">
            <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                  ED
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">ESDLab Technologies</p>
                  <p className="text-[11px] text-slate-400 font-medium">Administration</p>
                </div>
              </Link>
              <div className="flex items-center gap-1">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Voir le site public"
                  className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 transition"
                >
                  <IconExternalLink />
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition">
                  <IconClose />
                </button>
              </div>
            </div>
            <NavLinks mobile nav={nav} pathname={pathname} onClose={() => setSidebarOpen(false)} />
            <UserSection initials={initials} user={user} />
          </aside>
        </div>
      )}

      {/* ── Zone de contenu principale ── */}
      <div className="lg:ml-64 flex-1 min-w-0 flex flex-col">
        <main className="flex-1 pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
