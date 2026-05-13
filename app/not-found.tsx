"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-8xl font-bold text-primary-100 select-none mb-6">404</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
              Page introuvable
            </h1>
            <p className="text-lg text-slate-600 mb-10">
              La page que vous cherchez n&apos;existe pas ou a été déplacée.<br />
              Revenez à l&apos;accueil ou explorez nos contenus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-primary-900 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-800"
              >
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                Nous contacter
              </Link>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-500 mb-4">Pages utiles :</p>
              <div className="flex flex-wrap gap-3 justify-center text-sm">
                {[
                  { href: "/services", label: "Nos services" },
                  { href: "/a-propos", label: "À propos" },
                  { href: "/demo", label: "Demander une démo" },
                  { href: "/mentions-legales", label: "Mentions légales" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-slate-600 transition-colors hover:border-primary-300 hover:text-primary-700"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
