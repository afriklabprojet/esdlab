"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/components/Analytics";

type NavLink = { href: string; label: string };
type ServiceItem = { slug: string; title: string; order: number };

const DEFAULT_NAV: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function normalizeNavLinks(links: NavLink[]): NavLink[] {
  return links.map((link) =>
    link.href === "/services" && link.label === "Secteurs"
      ? { ...link, label: "Nos services" }
      : link
  );
}

function buildWhatsappHref(phone: string, message: string): string {
  const clean = phone.replaceAll(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/* ── Services dropdown ─────────────────────────────────────────── */
function ServicesDropdown({ services, onClose }: { services: ServiceItem[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-72 rounded-2xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] overflow-hidden z-50"
    >
      <div className="p-2">
        <p className="px-3 pt-2 pb-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">
          Nos services
        </p>
        <ul className="space-y-0.5">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                onClick={onClose}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-primary-50 hover:text-primary-800"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 text-xs font-bold transition-colors group-hover:bg-primary-200">
                  {s.title.charAt(0)}
                </span>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 flex items-center justify-between">
        <p className="text-xs text-slate-400">{services.length} services</p>
        <Link
          href="/services"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-700 hover:text-secondary-900 transition-colors"
        >
          Voir tout
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Mobile services accordion ────────────────────────────────── */
function MobileServicesMenu({ services, onClose }: { services: ServiceItem[]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/services");

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary-50 hover:text-secondary-700 ${isActive ? "bg-secondary-50 text-secondary-700" : "text-slate-700"}`}
      >
        <span>Nos services</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pt-1 pb-2 space-y-0.5">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {s.title}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={onClose}
                className="mt-1 block rounded-lg px-3 py-2 text-sm font-semibold text-secondary-700 transition-colors hover:bg-secondary-50"
              >
                → Voir tous les services
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Header ───────────────────────────────────────────────── */
export default function Header({
  settings,
  services = [],
}: {
  readonly settings: Record<string, string>;
  readonly services?: ServiceItem[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navLinks = useMemo<NavLink[]>(() => {
    const raw = settings["header.nav"];
    if (!raw) return DEFAULT_NAV;
    try { return normalizeNavLinks(JSON.parse(raw) as NavLink[]); } catch { return DEFAULT_NAV; }
  }, [settings]);

  const phone          = settings["contact.phone"]         || "+225 07 79 56 52 26";
  const address        = settings["contact.address"]       || "Treichville, Abidjan, Côte d'Ivoire";
  const phoneLabel     = settings["header.phone_label"]    || "Service commercial";
  const resellerLabel  = settings["header.reseller_label"] || "Espace revendeur";
  const resellerHref   = settings["header.reseller_href"]  || "/contact";
  const quoteLabel     = settings["header.quote_label"]    || "Demande de devis";
  const quoteHref      = settings["header.quote_href"]     || "/contact";
  const siteName       = settings["site.name"]             || "ESDLAB";
  const siteTagline    = settings["site.tagline"]          || "Technologies";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMobileMenuOpen(false);
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  /* Close dropdown on route change */
  useEffect(() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      {/* ── Topbar ─────────────────────────────────────────────── */}
      <div className="hidden border-b border-secondary-500 bg-secondary-800 text-white shadow-[0_8px_30px_rgba(120,53,15,0.18)] md:block">
        <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-8 px-10 text-[0.82rem] font-medium uppercase tracking-[0.12em] lg:px-16">
          <div className="flex min-w-0 items-center gap-7">
            <a href={`tel:${phone.replaceAll(/\s/g, "")}`} className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-secondary-100">
              <svg className="h-4 w-4 shrink-0 text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phoneLabel} {phone}
            </a>
            <span className="h-4 w-px bg-white/30" />
            <span className="flex min-w-0 items-center gap-2 truncate normal-case tracking-[0.04em]">
              <svg className="h-4 w-4 shrink-0 text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">Showroom — {address}</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-7">
            <Link
              href={quoteHref}
              className="rounded-md bg-white px-5 py-2.5 font-semibold text-secondary-800 shadow-[0_8px_18px_rgba(61,22,6,0.22)] transition-colors hover:bg-secondary-50"
              onClick={() => trackEvent("quote_request_click", { source: "header_topbar" })}
            >
              {quoteLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Nav bar ────────────────────────────────────────────── */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={settings["site.logo"] || "/images/ESDL.png"}
                alt={siteName}
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-slate-900">{siteName}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-secondary-600">
                {siteTagline}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isServicesLink = link.href === "/services";
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (isServicesLink && services.length > 0) {
                return (
                  <div key={link.href} ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-secondary-700 ${isActive ? "text-secondary-700" : "text-slate-700"}`}
                    >
                      {link.label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <ServicesDropdown
                          services={services}
                          onClose={() => setDropdownOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-secondary-700 ${isActive ? "text-secondary-700" : "text-slate-700"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition-colors hover:text-secondary-700"
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-slate-200"
            >
              <div className="space-y-1 py-4">
                {navLinks.map((link) => {
                  const isServicesLink = link.href === "/services";
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                  if (isServicesLink && services.length > 0) {
                    return (
                      <MobileServicesMenu
                        key={link.href}
                        services={services}
                        onClose={() => setIsMobileMenuOpen(false)}
                      />
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary-50 hover:text-secondary-700 ${isActive ? "text-secondary-700 bg-secondary-50" : "text-slate-700"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

/* ── Mobile CTA bar ────────────────────────────────────────────── */
export function MobileCTABar({ settings }: { readonly settings: Record<string, string> }) {
  const phone = settings["contact.whatsapp"] || "2250779565226";
  const message = settings["contact.whatsapp_message"] || "Bonjour ESDLAB, je souhaite échanger au sujet de DigiLab Corporate.";
  const whatsappHref = buildWhatsappHref(phone, message);
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-slate-200 px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
        aria-label="Contacter ESDLAB sur WhatsApp"
        onClick={() => trackEvent("click_whatsapp", { source: "mobile_cta_bar" })}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0012.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.65a11.9 11.9 0 005.77 1.48h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.45zM12.09 21.8h-.01a9.86 9.86 0 01-5.02-1.37l-.36-.22-3.74.98 1-3.65-.24-.37A9.84 9.84 0 012.2 11.9c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.11 1.03 6.98 2.89a9.8 9.8 0 012.9 6.99c0 5.45-4.44 9.89-9.88 9.89zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.05 9.05 0 01-1.68-2.09c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>
        WhatsApp
      </a>
      <a
        href="/contact"
        className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-secondary-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800"
        onClick={() => trackEvent("book_demo_click", { source: "mobile_cta_bar" })}
      >
        Demander une démo
      </a>
    </div>
  );
}
