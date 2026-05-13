// ═══════════════════════════════════════════════════════════════
// HomeView.tsx — Redesign pixel-perfect style digilor.fr
// ═══════════════════════════════════════════════════════════════
"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── Animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Dynamic content fallbacks ───────────────────────────────── */
type HomeSector = { label: string; image?: string; href?: string };
type HomeProduct = { title: string; desc: string; slug: string; kicker: string; uses: string[]; iconKey?: string };
type HomeTestimonial = { quote: string; author: string; role: string; company: string; initial?: string };


const DEFAULT_PARTNER_LOGOS = [
  "CCI", "BPI France", "France Num", "Lorraine Inside",
  "Grand Est", "French Tech", "Deloitte", "Les Vitrines de France",
  "Partnershift", "Unimev",
];

const DEFAULT_SECTORS: HomeSector[] = [
  { label: "Commerces" },
  { label: "Événementiel" },
  { label: "Santé" },
  { label: "Collectivités" },
  { label: "Éducation" },
  { label: "Entreprise & Industrie" },
];

const PRODUCT_ICONS = {
  kiosk: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  chevalet: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  screen: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  vitrine: (
    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

const DEFAULT_PRODUCTS: HomeProduct[] = [
  {
    title: "Bornes tactiles",
    desc:  "Qu'il s'agisse de promouvoir vos produits, d'animer vos événements ou de simplifier les paiements, une seule solution : la borne interactive tactile. Elle vous permet de communiquer de façon originale et interactive avec vos clients.",
    slug:  "bornes-tactiles",
    kicker: "Accueil, paiement, animation",
    uses:  ["Commande", "Orientation", "Collecte"],
    iconKey: "kiosk",
  },
  {
    title: "Chevalets numériques",
    desc:  "Le chevalet numérique est l'outil de communication idéal pour tous les commerçants. Vous pourrez l'installer où vous le souhaitez afin de valoriser vos offres, de jour comme de nuit, et même par mauvais temps !",
    slug:  "chevalets-numeriques",
    kicker: "Vitrine, trottoir, point de vente",
    uses:  ["Offres du jour", "Flux piéton", "Promotions"],
    iconKey: "chevalet",
  },
  {
    title: "Écrans Numériques Interactifs",
    desc:  "Améliorez la communication entre vos collaborateurs, accroissez la productivité grâce aux réunions flexibles, et économisez du temps et de l'argent en supprimant les déplacements inutiles.",
    slug:  "ecrans-numeriques",
    kicker: "Réunion, formation, collaboration",
    uses:  ["Réunions", "Cours", "Ateliers"],
    iconKey: "screen",
  },
  {
    title: "Écrans vitrine",
    desc:  "Remplacez vos affiches traditionnelles en papier par des écrans haute luminosité pour capter davantage l'attention de vos prospects. Les écrans vitrine offrent une flexibilité inégalée pour vos messages publicitaires ciblés !",
    slug:  "ecrans-vitrine",
    kicker: "Haute luminosité, impact immédiat",
    uses:  ["Vitrine", "Outdoor", "Campagnes"],
    iconKey: "vitrine",
  },
];

const DEFAULT_TESTIMONIALS: HomeTestimonial[] = [
  {
    quote:   "DigiLab nous a permis de piloter tous nos écrans depuis un seul tableau de bord. La prise en main par nos équipes s'est faite en une demi-journée.",
    author:  "Marc D.",
    role:    "Directeur des Opérations",
    company: "Groupe Industriel",
    initial: "M",
  },
  {
    quote:   "Nous affichons nos offres du jour sur 32 écrans simultanément. Le retour clients sur l'image de notre réseau est très positif.",
    author:  "Sophie L.",
    role:    "Responsable Communication",
    company: "Réseau de distribution",
    initial: "S",
  },
  {
    quote:   "Nos menus et promotions sont à jour en temps réel. L'équipe a assuré toute la formation sur place, sans friction.",
    author:  "Jean-Pierre K.",
    role:    "Directeur Général",
    company: "Hôtel & Restaurant",
    initial: "J",
  },
];

function parseSettingArray<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw?.trim()) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed as T[] : fallback;
  } catch {
    return fallback;
  }
}

/* ─── Main component ──────────────────────────────────────────── */
type HomeViewProps = { settings?: Record<string, string> };

export default function HomeView({ settings = {} }: Readonly<HomeViewProps>) {
  const s = (k: string, fb: string) => settings[k]?.trim() || fb;
  const heroRef = useRef<HTMLElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY      = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroTitle    = s("hero.title",      "Borne interactive, affichage dynamique, applications tactiles");
  const heroSubtitle = s("hero.subtitle",   "ESDLAB apporte des solutions pour mettre les technologies au service de tous les individus, entreprises et territoires.");
  const ctaPrimary   = s("hero.cta_primary", s("hero.cta1_label", "Prendre un rendez-vous"));
  const ctaSecondary = s("hero.cta_secondary", s("hero.cta2_label", "Demander un devis"));
  const heroImage    = s("hero.image", "/images/Esdlab-P1_Plan de travail 1.jpg");
  const heroVideo    = settings["hero.video"]?.trim() ?? "";

  const partnerLogos = parseSettingArray<string>(settings["home.partner_logos"], DEFAULT_PARTNER_LOGOS);
  const sectors = parseSettingArray<HomeSector>(settings["home.sectors"], DEFAULT_SECTORS);
  const products = parseSettingArray<HomeProduct>(settings["home.products"], DEFAULT_PRODUCTS);
  const testimonials = parseSettingArray<HomeTestimonial>(settings["home.testimonials"], DEFAULT_TESTIMONIALS);

  return (
    <main className="flex flex-col bg-white text-slate-900 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO — pixel-perfect digilor.fr · plein écran · vidéo · glow
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary-950"
      >
        {/* ── Background ─────────────────────────────────────────── */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          {/* Vidéo plein écran si définie, sinon image seule */}
          {heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroImage}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
            >
              <source src={heroVideo} />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-[0.28]"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          )}
          {/* Overlay gradient orange */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/82 via-secondary-900/62 to-secondary-950/92" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(232,114,29,0.18),transparent_45%)]" />
          {/* Glow centré orange */}
          <motion.div
            animate={{ scale: [1, 1.16, 1], opacity: [0.13, 0.24, 0.13] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full bg-secondary-500 blur-[180px] pointer-events-none"
          />
        </motion.div>

        {/* ── Contenu Hero ────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight text-white max-w-4xl"
            >
              {heroTitle}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/55 font-light"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-secondary-700 px-9 py-4 text-base font-semibold text-white shadow-[0_4px_28px_rgba(232,114,29,0.42)] transition-all duration-200 hover:bg-secondary-800 hover:shadow-[0_6px_36px_rgba(232,114,29,0.58)] hover:-translate-y-0.5"
              >
                {ctaPrimary}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.05] px-9 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/35 hover:-translate-y-0.5"
              >
                {ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Indicateur de scroll ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-white/20">Découvrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-white/12 pt-1.5"
          >
            <div className="h-1.5 w-1 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Bande logos partenaires (marquee) ────────────────────── */}
      <div className="overflow-hidden border-y border-secondary-100 bg-secondary-50/70 py-8">
        <p className="mb-5 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-secondary-700">
          {s("home.partners_label", "Ils nous font confiance")}
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
            style={{ width: "max-content" }}
          >
            {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
              <div
                key={`${logo}-${idx}`}
                className="flex h-12 min-w-[128px] items-center justify-center rounded-xl border border-secondary-100 bg-white px-5 shadow-sm shadow-secondary-100/70"
              >
                <span className="whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.1em] text-secondary-700/70">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTORS — "Des solutions digitales adaptées à votre secteur"
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-secondary-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Header: titre gauche + bouton pill droit */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-bold text-secondary-950 leading-tight max-w-2xl"
            >
              {s("home.sectors_title", "Des solutions digitales adaptées à votre secteur d'activité")}
            </motion.h2>
            <motion.div variants={fadeUp} className="shrink-0">
              <Link
                href="/services"
                className="inline-block rounded-full bg-secondary-700 px-8 py-4 text-base font-semibold text-white shadow-[0_14px_30px_rgba(232,114,29,0.22)] transition-colors hover:bg-secondary-800"
              >
                {s("home.sectors_cta", "Découvrir tous nos secteurs")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Grille photo 3 colonnes × 2 rangées */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {sectors.map((sector) => (
              <motion.div key={sector.label} variants={scaleIn}>
                <Link
                  href={sector.href || "/services"}
                  className="group relative flex items-end overflow-hidden rounded-2xl aspect-[4/3] bg-secondary-800"
                >
                  {/* Photo plein cadre — si disponible */}
                  {sector.image && (
                    <Image
                      src={sector.image}
                      alt={sector.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {/* Dégradé toujours visible (image ou fond uni) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-900/60 to-secondary-700/20 group-hover:from-secondary-800 transition-colors duration-300" />
                  {/* Label centré en bas */}
                  <div className="relative w-full p-6 text-center">
                    <span className="text-white font-bold text-xl leading-snug drop-shadow-lg">
                      {sector.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRODUCTS — "Nos produits"
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-24 text-slate-900">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-secondary-100 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-secondary-200/60 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,114,29,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(232,114,29,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end"
          >
            <div className="flex flex-col gap-4">
              <motion.span variants={fadeUp} className="w-fit rounded-full border border-secondary-200 bg-secondary-50 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-secondary-700">
                {s("home.products_eyebrow", "Nos produits")}
              </motion.span>
              <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 lg:text-5xl">
                {s("home.products_title", "Les supports digitaux qui donnent du relief à vos espaces")}
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="flex flex-col gap-5 text-slate-600 lg:items-start">
              <p className="text-base leading-relaxed lg:text-lg">
                {s("home.products_subtitle", "Des équipements sélectionnés pour capter l'attention, diffuser vos contenus et simplifier les parcours sur site.")}
              </p>
              <Link href="/services" className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-700 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(232,114,29,0.24)] transition-colors hover:bg-secondary-800">
                {s("home.products_cta", "Explorer nos solutions")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product, index) => (
              <motion.div key={product.slug} variants={scaleIn} className={index === 0 ? "lg:col-span-2" : ""}>
                <Link
                  href={`/produits/${product.slug}`}
                  className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-2xl border border-secondary-100 bg-white p-6 shadow-[0_22px_70px_rgba(120,53,15,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-[0_28px_80px_rgba(232,114,29,0.16)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary-300 via-secondary-500 to-secondary-700" />
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary-100 bg-secondary-50 text-secondary-600 shadow-lg shadow-secondary-100/80 transition-transform duration-300 group-hover:scale-105">
                      {PRODUCT_ICONS[product.iconKey as keyof typeof PRODUCT_ICONS] ?? PRODUCT_ICONS.screen}
                    </div>
                    <span className="rounded-full border border-secondary-100 bg-secondary-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-secondary-600">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-secondary-600">
                    {product.kicker}
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <h3 className="text-2xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-secondary-700">
                      {product.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">{product.desc}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {(product.uses || []).map((use) => (
                        <span key={use} className="rounded-full border border-secondary-100 bg-secondary-50/70 px-3 py-1 text-[0.72rem] font-semibold text-secondary-700">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-secondary-600 transition-colors group-hover:text-secondary-800">
                    Voir le produit
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS — "Ce que disent nos clients"
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 text-center"
          >
            <motion.span variants={fadeUp} className="mb-4 inline-block rounded-full border border-secondary-200 bg-secondary-50 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-secondary-700">
              {s("home.testimonials_eyebrow", "Témoignages")}
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-slate-950 lg:text-5xl">
              {s("home.testimonials_title", "Ce que disent nos clients")}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
              >
                <blockquote className="text-[0.88rem] leading-relaxed text-slate-600 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-700 text-sm font-bold text-white">
                    {t.initial || t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.author}</p>
                    <p className="text-[0.75rem] text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === i ? "w-6 bg-secondary-500" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
