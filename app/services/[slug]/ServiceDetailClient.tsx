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
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

type Benefit = { title: string; description: string };
type Process = { step: string; title: string; description: string };

interface Props {
  service: {
    title: string;
    subtitle: string;
    description: string;
    longDescription: string | null;
    image: string | null;
    icon: string | null;
    features: string[];
    benefits: Benefit[];
    process: Process[];
    technologies: string[];
  };
}

const BENEFIT_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
];

export default function ServiceDetailClient({ service: s }: Props) {
  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary-950 pt-32 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,114,29,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,114,29,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,114,29,0.14),transparent_55%)] pointer-events-none" />
        {s.image && (
          <div className="absolute inset-0">
            <Image src={s.image} alt={s.title} fill className="object-cover opacity-10" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-950/95 via-secondary-950/80 to-secondary-950/60" />
          </div>
        )}

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-xs text-white/40 font-medium mb-6">
              <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
              <span>/</span>
              <span className="text-secondary-400">{s.title}</span>
            </motion.nav>

            {/* Badge */}
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-secondary-700/50 bg-secondary-900/40 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-secondary-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-400 animate-pulse" />
              {s.subtitle}
            </motion.span>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
              {s.title}
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
              {s.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl bg-secondary-700 px-8 py-4 text-sm font-bold text-white shadow-[0_4px_24px_rgba(232,114,29,0.4)] transition-all hover:bg-secondary-600 hover:-translate-y-0.5">
                Démarrer un projet
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30">
                Demander un devis
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ── Long description + features ──────────────────────────── */}
      {(s.longDescription || s.features.length > 0) && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

              {s.longDescription && (
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                  <motion.span variants={fadeUp} className="mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-600">
                    À propos
                  </motion.span>
                  <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Pourquoi choisir notre expertise ?
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {s.longDescription}
                  </motion.p>
                </motion.div>
              )}

              {s.features.length > 0 && (
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                  <motion.span variants={fadeUp} className="mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-600">
                    Ce qui est inclus
                  </motion.span>
                  <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
                    Nos prestations
                  </motion.h2>
                  <motion.ul variants={stagger} className="space-y-3">
                    {s.features.map((f) => (
                      <motion.li key={f} variants={fadeUp} className="flex items-start gap-3 group">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 transition-colors group-hover:bg-secondary-600 group-hover:text-white">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-slate-700 font-medium">{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits ─────────────────────────────────────────────── */}
      {s.benefits.length > 0 && (
        <section className="py-24 bg-secondary-950">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mb-14 text-center">
              <motion.span variants={fadeUp} className="mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-400">
                Bénéfices
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white">
                Ce que vous gagnez
              </motion.h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.benefits.map((b, i) => (
                <motion.div key={b.title} variants={scaleIn}
                  className="group relative rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-secondary-500/40 hover:-translate-y-1">
                  <span className="absolute top-4 right-4 text-4xl font-black text-white/5 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-900/60 text-secondary-400 border border-secondary-700/40 transition-colors group-hover:bg-secondary-600 group-hover:text-white group-hover:border-secondary-600">
                    {BENEFIT_ICONS[i % BENEFIT_ICONS.length]}
                  </div>
                  <h3 className="mb-2 font-bold text-white">{b.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Process ──────────────────────────────────────────────── */}
      {s.process.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mb-14 text-center">
              <motion.span variants={fadeUp} className="mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-600">
                Méthodologie
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Notre processus
              </motion.h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-secondary-200 via-secondary-400 to-secondary-200 hidden sm:block" />
              <motion.ol variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="space-y-6">
                {s.process.map((step, i) => (
                  <motion.li key={step.title ?? i} variants={fadeUp} className="relative flex gap-6 sm:gap-8 group">
                    <div className="relative z-10 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-secondary-200 bg-white shadow-sm transition-all group-hover:border-secondary-500 group-hover:bg-secondary-50">
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-secondary-400">Étape</span>
                      <span className="text-xl font-black text-secondary-700 leading-none">{step.step ?? String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition-all group-hover:border-secondary-100 group-hover:bg-secondary-50/40">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </section>
      )}

      {/* ── Technologies ─────────────────────────────────────────── */}
      {s.technologies.length > 0 && (
        <section className="py-20 bg-secondary-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.span variants={fadeUp} className="mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-600">
                Stack technique
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-slate-900 mb-10">
                Technologies utilisées
              </motion.h2>
              <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3">
                {s.technologies.map((t) => (
                  <motion.span key={t} variants={scaleIn}
                    className="flex items-center gap-2 rounded-xl border border-secondary-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-secondary-400 hover:text-secondary-700 hover:shadow-md hover:-translate-y-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-500" />
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA final ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
            style={{ background: "linear-gradient(135deg, #3d1606 0%, #703211 40%, #ac470c 100%)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
            <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-secondary-300">Prêt à démarrer ?</p>
            <h2 className="mb-5 text-3xl sm:text-4xl font-extrabold text-white">
              Parlons de votre projet
            </h2>
            <p className="mb-8 text-white/60 text-lg max-w-xl mx-auto">
              Notre équipe vous accompagne de la conception à la mise en production.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-secondary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
                Nous contacter
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/services"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40">
                Voir tous les services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
