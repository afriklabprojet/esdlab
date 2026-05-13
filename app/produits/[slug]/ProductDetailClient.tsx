"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ICON_MAP: Record<string, React.ReactNode> = {
  kiosk: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  chevalet: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  screen: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  vitrine: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12a2.25 2.25 0 002.25-2.25V3M3.75 3h16.5M3.75 3l.75 1.5M20.25 3l-.75 1.5M12 12.75h.008v.008H12v-.008zm0-3h.008v.008H12V9.75zm0-3h.008v.008H12V6.75z" />
    </svg>
  ),
};

interface ProductData {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string | null;
  image: string | null;
  iconKey: string | null;
  features: string[];
  benefits: { title: string; description: string }[];
  useCases: { title: string; description: string; icon?: string }[];
  specs: { label: string; value: string }[];
}

interface RelatedProduct {
  slug: string;
  name: string;
  kicker: string;
  image: string | null;
  iconKey: string | null;
}

interface Props {
  readonly product: ProductData;
  readonly related: RelatedProduct[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProductDetailClient({ product, related }: Props) {
  const icon = product.iconKey ? ICON_MAP[product.iconKey] : ICON_MAP.screen;

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-end"
        style={{ background: "linear-gradient(135deg, #3d1606 0%, #703211 40%, #8a3a11 70%, #ac470c 100%)" }}
      >
        {/* texture */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        {/* image bg */}
        {product.image && (
          <div className="absolute inset-0">
            <Image src={product.image} alt={product.name} fill className="object-cover opacity-20" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/90 via-secondary-900/60 to-transparent" />
          </div>
        )}

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            {/* breadcrumb */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2 text-sm text-secondary-300/70">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/produits" className="hover:text-white transition-colors">Nos produits</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </motion.div>

            {/* badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-400/30 bg-secondary-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-200">
                <span className="text-secondary-300">{icon}</span>
                {product.kicker}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-5 font-display text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              {product.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-xl leading-relaxed text-secondary-100/80">
              {product.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-secondary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Demander une démo
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Demander un devis
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DESCRIPTION ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}>
              <span className="eyebrow mb-4 block">À propos du produit</span>
              <h2 className="font-display text-4xl font-semibold text-slate-900">{product.name}</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">{product.description}</p>
              {product.longDescription && (
                <p className="mt-4 text-base leading-relaxed text-slate-500 whitespace-pre-line">{product.longDescription}</p>
              )}
            </motion.div>

            {/* Features */}
            {product.features.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}
                className="rounded-2xl border border-secondary-100 bg-secondary-50/40 p-8"
              >
                <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary-700">Caractéristiques techniques</h3>
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── BÉNÉFICES ───────────────────────────────────────────── */}
      {product.benefits.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="mb-14 text-center">
              <span className="eyebrow mb-4 block">Ce que vous y gagnez</span>
              <h2 className="font-display text-4xl font-semibold text-slate-900">Les bénéfices clés</h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.benefits.map((b, i) => (
                <motion.div key={b.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary-200 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 font-bold text-slate-900">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CAS D'USAGE ─────────────────────────────────────────── */}
      {product.useCases.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="mb-14 text-center">
              <span className="eyebrow mb-4 block">Secteurs concernés</span>
              <h2 className="font-display text-4xl font-semibold text-slate-900">Cas d&apos;usage</h2>
              <p className="mt-4 max-w-xl mx-auto text-slate-500">Découvrez comment {product.name} s&apos;intègre dans votre environnement professionnel.</p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.useCases.map((uc, i) => (
                <motion.div key={uc.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-secondary-200 hover:bg-secondary-50/30"
                >
                  <div className="mb-3 h-8 w-8 rounded-lg bg-secondary-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-bold text-slate-900">{uc.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{uc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SPECS ───────────────────────────────────────────────── */}
      {product.specs.length > 0 && (
        <section className="bg-slate-950 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="mb-14 text-center">
              <span className="inline-block mb-4 rounded-full border border-secondary-500/30 bg-secondary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-300">
                Fiche technique
              </span>
              <h2 className="font-display text-4xl font-semibold text-white">Spécifications</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.specs.map((spec, i) => (
                <motion.div key={spec.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
                  className="rounded-2xl border border-white/8 bg-white/5 p-5"
                >
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-secondary-400">{spec.label}</div>
                  <div className="text-base font-semibold text-white">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUITS LIÉS ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="mb-14 text-center">
              <span className="eyebrow mb-4 block">À découvrir aussi</span>
              <h2 className="font-display text-4xl font-semibold text-slate-900">Produits associés</h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <motion.div key={r.slug}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                >
                  <Link href={`/produits/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-secondary-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {r.image && (
                        <Image src={r.image} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-secondary-600">{r.kicker}</div>
                      <h3 className="font-bold text-slate-900 group-hover:text-secondary-700 transition-colors">{r.name}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary-600">
                        Découvrir
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "linear-gradient(135deg, #3d1606 0%, #8a3a11 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
              Prêt à déployer {product.name} ?
            </h2>
            <p className="mt-5 text-lg text-secondary-200/80">
              Notre équipe vous accompagne de l&apos;étude de besoin à l&apos;installation sur site.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-secondary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Demander une démo gratuite
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Voir tous les produits
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
