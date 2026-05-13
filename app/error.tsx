"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-secondary-600 mb-4">Erreur</p>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Une erreur est survenue</h1>
      <p className="text-slate-500 max-w-md mb-8">
        Quelque chose s&apos;est mal passé. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-xl bg-secondary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-secondary-800 transition"
        >
          Réessayer
        </button>
        <Link href="/" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
