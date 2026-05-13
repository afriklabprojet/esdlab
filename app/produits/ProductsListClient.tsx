"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const ICONS: Record<string, React.ReactNode> = {
  kiosk: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  chevalet: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  screen: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  vitrine: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

type Product = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  image: string | null;
  iconKey: string | null;
  features: string[];
  order: number;
};

export default function ProductsListClient({ products }: { products: Product[] }) {
  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary-950 pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,114,29,0.18),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,114,29,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,114,29,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-xs text-white/40 font-medium">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-secondary-400">Nos produits</span>
            </motion.nav>
            <motion.span variants={fadeUp} className="rounded-full border border-secondary-700/50 bg-secondary-900/60 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-secondary-400">
              Catalogue produits
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Nos solutions<br />
              <span className="text-secondary-400">d&apos;affichage dynamique</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg text-white/55 leading-relaxed">
              Des équipements haute performance pour capter l&apos;attention, diffuser vos contenus et transformer vos espaces en expériences interactives.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div className="border-b border-secondary-100 bg-secondary-50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "1 000+", label: "Clients équipés" },
              { value: "4", label: "Gammes produits" },
              { value: "48h", label: "Livraison express" },
              { value: "24/7", label: "Support technique" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-secondary-700">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products grid ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {products.map((product, index) => (
              <motion.div key={product.slug} variants={scaleIn}>
                <Link
                  href={`/produits/${product.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-secondary-100 bg-white shadow-[0_8px_40px_rgba(120,53,15,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(232,114,29,0.14)] hover:border-secondary-200"
                >
                  {/* Image banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-secondary-950">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 via-transparent to-transparent" />
                    {/* Number badge */}
                    <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    {/* Icon bottom-left */}
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-700/80 backdrop-blur-sm text-white">
                      {ICONS[product.iconKey ?? "screen"] ?? ICONS.screen}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-secondary-600">
                      {product.kicker}
                    </p>
                    <h2 className="mb-3 text-2xl font-bold text-slate-950 transition-colors group-hover:text-secondary-700">
                      {product.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features list */}
                    {product.features.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {product.features.slice(0, 3).map((feat) => (
                          <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <svg className="h-4 w-4 shrink-0 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                        {product.features.length > 3 && (
                          <li className="text-xs font-semibold text-secondary-600 pl-6">
                            +{product.features.length - 3} autres fonctionnalités
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-secondary-50 border border-secondary-200 px-4 py-2 text-sm font-bold text-secondary-700 transition-all group-hover:bg-secondary-700 group-hover:text-white group-hover:border-secondary-700">
                        Découvrir
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <span className="text-xs font-medium text-slate-400">Voir détails →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #3d1606 0%, #703211 40%, #ac470c 100%)" }}>
            <div className="px-8 py-16 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-secondary-300">Un projet en tête ?</p>
              <h2 className="mb-5 text-3xl sm:text-4xl font-extrabold text-white">
                Parlons de votre besoin
              </h2>
              <p className="mb-8 text-white/65 text-lg max-w-xl mx-auto">
                Notre équipe vous accompagne du choix du matériel jusqu&apos;à la mise en service sur site.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-secondary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Prendre contact
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
                >
                  Voir nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
