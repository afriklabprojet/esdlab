"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeIn, staggerContainer } from "@/lib/animations";

/* ─── defaults ──────────────────────────────────────────────────────────── */
const DEFAULT_VALUES: { icon: string; title: string; description: string }[] = [
  { icon: "01", title: "Full Web", description: "Interface 100% web, aucune installation nécessaire. Compatible ordinateur, tablette et smartphone." },
  { icon: "02", title: "Simplicité", description: "Aucune compétence technique avancée requise. Vos équipes prennent la main très rapidement." },
  { icon: "03", title: "Personnalisation", description: "Des gabarits adaptables à votre identité visuelle, pour une communication plus cohérente." },
  { icon: "04", title: "Visual Management", description: "Connexion à vos outils internes pour diffuser KPI, objectifs et messages opérationnels." },
  { icon: "05", title: "Accompagnement", description: "Installation, formation, support et suivi : un service de bout en bout." },
  { icon: "06", title: "Impact rapide", description: "Une solution pensée pour être visible vite, comprise vite et utilisée vite." },
];

const DEFAULT_STATS: { number: string; label: string }[] = [
  { number: "1 000+", label: "clients déjà accompagnés" },
  { number: "45 000+", label: "entreprises cibles sur le marché" },
  { number: "< 2 h", label: "pour la prise en main" },
  { number: "24/7", label: "support disponible" },
];

function parseJSON<T>(str: string | undefined, fallback: T): T {
  if (!str?.trim()) return fallback;
  try { return JSON.parse(str) as T; } catch { return fallback; }
}

interface AboutContentProps { readonly settings: Record<string, string> }

const STEPS = [
  {
    step: "01",
    title: "Créez",
    description: "Concevez vos contenus visuels avec nos gabarits prêts à l'emploi, adaptés à votre identité.",
    imageKey: "about.creez_image",
    imageFallback: "/images/Créez.jpg",
  },
  {
    step: "02",
    title: "Planifiez",
    description: "Programmez la diffusion de vos messages selon vos écrans, horaires et campagnes.",
    imageKey: "about.planifiez_image",
    imageFallback: "/images/Planifiez.jpg",
  },
  {
    step: "03",
    title: "Diffusez",
    description: "Déployez en temps réel sur tous vos écrans depuis n'importe quel appareil connecté.",
    imageKey: "about.diffusez_image",
    imageFallback: "/images/Diffusez.jpg",
  },
];

export default function AboutContent({ settings }: AboutContentProps) {
  const s = (k: string, fb: string) => settings[k]?.trim() || fb;
  const values = parseJSON<{ icon: string; title: string; description: string }[]>(settings["about.values"], DEFAULT_VALUES);
  const stats = parseJSON<{ number: string; label: string }[]>(settings["about.stats"], DEFAULT_STATS);

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          1. HERO — fond sombre dégradé, texte blanc
         ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-primary-950 to-secondary-900 overflow-hidden">
        {/* Image de fond semi-transparente */}
        {(settings["about.mission_image"] || "/images/process images.png") && (
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src={settings["about.mission_image"] || "/images/process images.png"}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-10"
              priority
            />
          </div>
        )}

        {/* Grain overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,120,190,0.18) 0%, transparent 70%), " +
              "radial-gradient(ellipse 50% 40% at 100% 100%, rgba(232,114,29,0.14) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Badge "Pionniers en Afrique de l'Ouest" */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-400/40 bg-secondary-500/20 text-secondary-200 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                <svg className="w-3 h-3 text-secondary-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Pionniers en Afrique de l&apos;Ouest
              </span>
            </motion.div>

            {/* Titre display très grand */}
            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-tight"
            >
              À propos{" "}
              <span className="text-secondary-400">d&apos;ESDLAB</span>
            </motion.h1>

            {/* Sous-titre depuis settings */}
            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              {s(
                "about.hero_subtitle",
                "Electronic System Development, Lab. — Pionniers de l'affichage dynamique en Afrique de l'Ouest"
              )}
            </motion.p>

            {/* Séparateur lumineux */}
            <motion.div
              variants={fadeIn}
              className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-secondary-400 to-transparent"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. MISSION — deux colonnes : texte | image + badge
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Colonne gauche */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="eyebrow">Notre mission</span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">
                {s("about.mission_title", "Révolutionner la communication d'entreprise")}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {s(
                  "about.mission_p1",
                  "ESDLAB (Electronic System Development, Lab.) développe DigiLab Corporate, une solution d'affichage dynamique full web qui révolutionne la communication d'entreprise. Basés à Treichville, Abidjan, nous sommes pionniers sur le marché ivoirien avec 0 concurrent local identifié."
                )}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {s(
                  "about.mission_p2",
                  "Notre solution permet à plus de 1 000 clients de piloter à distance leurs écrans d'affichage sans aucune compétence technique requise. Avec un taux de conversion de 80%+ après une démo pilote, nous transformons la façon dont les entreprises communiquent avec leurs équipes et leurs clients."
                )}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {s(
                  "about.mission_p3",
                  "Notre mission : rendre la communication digitale accessible à 45 000+ entreprises d'Afrique de l'Ouest, en offrant une solution clé en main incluant matériel, configuration, installation, formation et support."
                )}
              </p>
            </motion.div>

            {/* Colonne droite : image + badge superposé */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant-xl">
                <Image
                  src={settings["about.mission_image"] || "/images/process images.png"}
                  alt="Notre processus ESDLAB"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/30 to-transparent" aria-hidden="true" />
              </div>

              {/* Badge chiffre clé en bas-droite */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white rounded-2xl shadow-elegant-lg px-6 py-4 border border-slate-100 min-w-[160px]">
                <div className="font-display text-3xl font-semibold text-secondary-600 stat-number">1 000+</div>
                <div className="text-sm text-slate-500 mt-0.5 font-medium">clients accompagnés</div>
              </div>

              {/* Décoration géométrique */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-primary-100 -z-10 opacity-60"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. TIMELINE / PROCESSUS — horizontal desktop, vertical mobile
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="eyebrow">Notre approche</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900">
              Créez, Planifiez, Diffusez
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Une démarche complète et structurée pour transformer votre communication
            </p>
          </motion.div>

          {/* Timeline wrapper */}
          <div className="relative">
            {/* Ligne connectrice — visible uniquement desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[88px] left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 z-0"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Numéro en cercle primary */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center font-sans font-bold text-base shadow-glow-primary ring-4 ring-white group-hover:bg-primary-700 transition-colors duration-300 cursor-default">
                      {step.step}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant mb-6 group-hover:shadow-elegant-lg transition-shadow duration-300">
                    <Image
                      src={settings[step.imageKey] || step.imageFallback}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-4 left-4 font-display text-2xl font-semibold text-white">
                      {step.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. VALEURS — grid 2 col, numéro grand opacity-5 en bg
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="eyebrow">Ce qui nous guide</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900">
              Nos Valeurs
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 hover:border-primary-200 hover:shadow-elegant transition-all duration-300 cursor-default"
              >
                {/* Numéro grand en arrière-plan */}
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-2 font-display text-[7rem] font-bold text-slate-900 leading-none select-none pointer-events-none"
                  style={{ opacity: 0.04 }}
                >
                  {value.icon}
                </span>

                {/* Petit badge numéro */}
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-xs font-bold text-primary-700">
                  {value.icon}
                </div>

                <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. STATS — bande pleine largeur bg-secondary-800
         ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="font-display text-4xl sm:text-5xl font-semibold text-white stat-number">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-secondary-200 font-medium leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. CTA FINAL — fond primary-700, 2 boutons
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-primary-700 relative overflow-hidden">
        {/* Halo décoratif */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), " +
              "radial-gradient(ellipse 50% 60% at 100% 50%, rgba(232,114,29,0.15) 0%, transparent 55%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-3xl mx-auto">
            {s("about.cta_title", "Travaillons ensemble")}
          </h2>
          <p className="text-lg sm:text-xl text-primary-200 max-w-2xl mx-auto leading-relaxed">
            {s(
              "about.cta_subtitle",
              "Vous avez un projet ? Discutons de la manière dont nous pouvons vous aider à transformer votre communication."
            )}
          </p>

          {/* 2 boutons côte à côte */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Bouton blanc */}
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-primary-700 px-7 py-4 font-semibold text-base shadow-elegant-lg hover:bg-primary-50 hover:shadow-elegant-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-w-[200px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Demander une démo
            </Link>

            {/* Bouton transparent bordure blanche */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/70 text-white px-7 py-4 font-semibold text-base backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 hover:-translate-y-1 cursor-pointer min-w-[200px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
