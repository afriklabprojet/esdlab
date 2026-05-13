"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
  color: string;
};

// ─── SVG icônes pour le processus ─────────────────────────────────────────────
function IconAnalyse({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
    </svg>
  );
}

function IconConception({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function IconRealisation({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function IconDeploiement({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Analyse",
    description: "Compréhension approfondie de vos besoins, de vos environnements et de vos objectifs stratégiques.",
    Icon: IconAnalyse,
  },
  {
    step: "02",
    title: "Conception",
    description: "Élaboration de solutions sur-mesure, prototypage et validation des choix techniques.",
    Icon: IconConception,
  },
  {
    step: "03",
    title: "Réalisation",
    description: "Développement rigoureux, tests de qualité et intégration dans votre infrastructure.",
    Icon: IconRealisation,
  },
  {
    step: "04",
    title: "Déploiement",
    description: "Mise en production, formation de vos équipes et accompagnement continu.",
    Icon: IconDeploiement,
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative bg-slate-950 overflow-hidden py-28 sm:py-36">
      {/* Texture grille */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />
      {/* Halo orange subtil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,114,29,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeIn} className="flex justify-center mb-6">
            <span className="eyebrow" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(232,114,29,0.3)", color: "#f99338" }}>
              Nos secteurs d&apos;intervention
            </span>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 text-balance"
          >
            Des usages exigeants,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f99338 0%, #E8721D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              une réponse élégante.
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-400 leading-relaxed">
            ESDLAB Technologies adapte chaque solution d&apos;affichage dynamique à votre secteur —
            sobriété, fiabilité et pilotage simplifié.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Navigation sticky ────────────────────────────────────────────────────────
function SectorNav({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null;
  return (
    <div
      className="sticky z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm"
      style={{ top: "var(--header-height, 80px)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Secteurs">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.slug}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-primary-700 hover:bg-orange-50 transition-colors whitespace-nowrap"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ─── Card service individuelle ────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <>
      <motion.section
        id={service.slug}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-[0_2px_24px_-4px_rgba(15,23,42,0.08)] border border-slate-100"
      >
        {/* Numéro décoratif */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-6 font-display font-semibold text-[7rem] leading-none text-slate-900 select-none z-0"
          style={{ opacity: 0.04 }}
        >
          {sectionNumber}
        </span>

        {/* Bannière image */}
        {service.image && (
          <div className="relative w-full aspect-[16/6] overflow-hidden bg-slate-100">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="object-cover"
              priority={index === 0}
            />
            {service.color && (
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-25`} />
            )}
            {/* Dégradé bas */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        {/* Contenu */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          {/* Badge secteur */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold tracking-widest uppercase text-orange-700">
              {service.icon && <span>{service.icon}</span>}
              Secteur {sectionNumber}
            </span>
          </div>

          {/* Titre & sous-titre */}
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mb-2 text-balance">
            {service.title}
          </h2>
          {service.subtitle && (
            <p className="text-base sm:text-lg font-semibold text-primary-600 mb-5">
              {service.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
            {service.description}
          </p>

          {/* Features 2 colonnes */}
          {service.features.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <Link href={`/services/${service.slug}`} className="btn-elegant-primary !px-7 !py-3.5 !text-sm">
            En savoir plus
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </motion.section>

      {/* Séparateur */}
      <div className="separator-line mx-auto max-w-xs" aria-hidden="true" />
    </>
  );
}

// ─── Section Processus ────────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="eyebrow">Notre méthode</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
            Un processus éprouvé
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            De l&apos;analyse à la mise en production, chaque étape est pensée pour garantir le succès de votre projet.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Ligne pointillée desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, rgba(232,114,29,0.35) 0, rgba(232,114,29,0.35) 8px, transparent 8px, transparent 20px)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icône cercle */}
                <div className="relative z-10 mb-5 w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-orange-300 group-hover:shadow-[0_4px_16px_-4px_rgba(232,114,29,0.2)] transition-all duration-300">
                  <step.Icon className="w-8 h-8 text-primary-600" />
                </div>

                {/* Numéro d'étape */}
                <span className="font-display text-xs font-bold tracking-widest text-orange-400 mb-2">
                  {step.step}
                </span>

                <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Connecteur vertical mobile */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="lg:hidden mt-6 w-px h-8 mx-auto"
                    style={{
                      backgroundImage: "repeating-linear-gradient(180deg, rgba(232,114,29,0.4) 0, rgba(232,114,29,0.4) 4px, transparent 4px, transparent 10px)",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-24 bg-secondary-800 relative overflow-hidden">
      {/* motif décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <span
            className="eyebrow"
            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" }}
          >
            Passons à l&apos;action
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5 text-balance">
          Prêt à démarrer votre projet ?
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Discutons de vos besoins et trouvons ensemble la solution d&apos;affichage dynamique idéale pour votre secteur.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-[0_4px_20px_-4px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_8px_32px_-4px_rgba(255,255,255,0.4)] hover:-translate-y-1"
        >
          Contactez-nous
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}

// ─── Vue principale ────────────────────────────────────────────────────────────
export default function ServicesView({ services }: { services: ServiceItem[] }) {
  return (
    <div className="pt-20">
      <HeroSection />
      <SectorNav services={services} />

      {/* Cards services */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
            {services.length === 0 && (
              <p className="text-center text-slate-500 py-24">
                Aucun service disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      <ProcessSection />
      <CtaSection />
    </div>
  );
}
