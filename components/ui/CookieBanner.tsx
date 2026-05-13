"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "esdlab_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage peut être bloqué (SSR ou mode privé strict)
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "declined");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 inset-x-0 z-[60] md:bottom-4 md:left-4 md:right-auto md:max-w-sm"
    >
      <div className="mx-0 md:mx-0 rounded-none md:rounded-2xl border-t md:border border-slate-200 bg-white shadow-2xl p-5">
        <p className="text-sm font-semibold text-slate-900 mb-1">Cookies &amp; vie privée</p>
        <p className="text-xs text-slate-500 leading-5 mb-4">
          Nous utilisons des cookies analytiques (GA4, Microsoft Clarity) pour améliorer votre expérience.
          Vos données ne sont pas revendues.{" "}
          <Link href="/cookies" className="underline text-primary-600 hover:text-primary-700">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Accepter
          </button>
          <button
            onClick={decline}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
