import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci pour votre message | ESDLab Technologies",
  description: "Votre demande a bien été reçue. Notre équipe vous répondra sous 24h ouvrées.",
  robots: { index: false },
};

export default function MerciPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center py-24">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100">
              <svg className="h-10 w-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold text-slate-900 mb-4">
            Votre demande a bien été reçue
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Notre équipe reviendra vers vous sous <strong>24h ouvrées</strong> avec une
            proposition adaptée à votre contexte.
          </p>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left mb-10 space-y-4 shadow-sm">
            <h2 className="font-semibold text-slate-800">Ce qui se passe ensuite :</h2>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xs">1</span>
                <span>Un expert ESDLab analyse votre demande et prépare une réponse personnalisée.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xs">2</span>
                <span>Vous recevez un e-mail de confirmation avec les prochaines étapes.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold text-xs">3</span>
                <span>Si vous le souhaitez, nous planifions une démo courte adaptée à votre secteur.</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-primary-900 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-800"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              Découvrir les secteurs
            </Link>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Une question urgente ?{" "}
            <a href="tel:+2250779565226" className="text-primary-600 hover:underline font-medium">
              +225 07 79 56 52 26
            </a>
            {" "}ou{" "}
            <a href="https://wa.me/2250779565226" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
