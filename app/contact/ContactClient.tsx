"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { trackEvent } from "@/components/Analytics";

interface ContactClientProps {
  whatsappHref: string;
  email: string;
  phone: string;
  address: string;
}

const FAQ_ITEMS = [
  {
    q: "Pourquoi choisir DigiLab ?",
    a: "DigiLab apporte une expertise de plus de 10 ans dans le digital signage et l'affichage dynamique. Nous proposons des solutions clé en main, de l'installation à la maintenance, avec un accompagnement personnalisé pour chaque client.",
  },
  {
    q: "Quelles solutions commercialisez-vous ?",
    a: "Nous proposons des bornes interactives tactiles, des chevalets numériques, des écrans numériques interactifs (ENI), des écrans vitrine haute luminosité, ainsi que des applications logicielles pour piloter l'ensemble de votre parc d'écrans.",
  },
  {
    q: "Proposez-vous des solutions en location ?",
    a: "Oui. Nous proposons des solutions de location courte et longue durée, idéales pour les événements ponctuels ou pour étaler le coût de vos équipements dans le temps.",
  },
  {
    q: "Comment se passe l'installation ?",
    a: "Notre équipe technique prend en charge l'installation complète sur site. Nous assurons la formation de vos équipes et garantissons un suivi post-installation rigoureux.",
  },
  {
    q: "Disposez-vous d'un service après-vente ?",
    a: "Oui. Nous disposons d'un SAV réactif avec des techniciens disponibles pour intervenir rapidement. Nous proposons également des contrats de maintenance préventive.",
  },
  {
    q: "Peut-on personnaliser les contenus diffusés sur les écrans ?",
    a: "Oui, entièrement. Notre plateforme de gestion de contenus (CMS) vous permet de créer, planifier et diffuser vos propres contenus : vidéos, images, flux RSS, météo, réseaux sociaux, etc. La prise en main est simple et ne nécessite pas de compétences techniques particulières.",
  },
  {
    q: "Vos solutions sont-elles compatibles avec les environnements extérieurs ?",
    a: "Oui. Nous disposons d'une gamme d'écrans et de bornes conçus pour l'extérieur, avec des dalles haute luminosité (jusqu'à 3 500 nits), une protection IP65 contre les intempéries et des systèmes de ventilation/chauffage intégrés.",
  },
  {
    q: "Existe-t-il une solution pour les petites structures ?",
    a: "Absolument. Nos solutions s'adaptent à toutes les tailles d'organisations, de l'artisan indépendant à la multinationale. Contactez-nous pour obtenir une offre sur-mesure.",
  },
  {
    q: "Combien de temps dure l'installation ?",
    a: "Selon la complexité du projet, l'installation peut prendre de quelques heures pour un équipement unique à plusieurs jours pour un déploiement multi-sites. Un chef de projet dédié coordonne chaque étape.",
  },
  {
    q: "Proposez-vous des démonstrations avant achat ?",
    a: "Oui. Vous pouvez venir tester nos équipements en conditions réelles dans nos showrooms à Paris (Saint-Denis) et à Nancy. Contactez notre équipe commerciale pour convenir d'un rendez-vous.",
  },
];

function FaqItem({ q, a }: { readonly q: string; readonly a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-[0.95rem] font-semibold text-slate-800 transition-colors duration-200 hover:text-secondary-700"
      >
        <span>{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-secondary-300 bg-secondary-50 text-secondary-600"
              : "border-slate-200 text-slate-400"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[0.875rem] leading-relaxed text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Step progress indicator ─────────────────────────────────── */
const STEP_LABELS = ["Identité", "Projet", "Message"];

function StepIndicator({ current }: { readonly current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8" role="list" aria-label="Étapes du formulaire">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={label} className="flex items-center flex-1" role="listitem">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-secondary-600 text-white"
                    : isActive
                    ? "bg-secondary-500 text-white ring-4 ring-secondary-100"
                    : "bg-slate-100 text-slate-400"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-[0.65rem] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-secondary-600" : isDone ? "text-secondary-400" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`h-px flex-1 mx-2 mb-5 transition-colors duration-300 ${
                  isDone ? "bg-secondary-400" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Why us cards ────────────────────────────────────────────── */
const WHY_US_ITEMS = [
  {
    num: "01",
    title: "Expertise locale",
    text: "Implantés en Côte d'Ivoire depuis plus de 10 ans, nous connaissons les réalités terrain de l'Afrique de l'Ouest.",
  },
  {
    num: "02",
    title: "Clé en main",
    text: "Installation, formation, maintenance SAV : nous gérons l'intégralité du déploiement pour que vous n'ayez rien à faire.",
  },
  {
    num: "03",
    title: "Réponse rapide",
    text: "Notre équipe commerciale s'engage à revenir vers vous sous 4 heures ouvrées avec une proposition adaptée.",
  },
];

/* ─── Main component ──────────────────────────────────────────── */
export default function ContactClient({
  whatsappHref,
  email,
  phone,
  address,
}: Readonly<ContactClientProps>) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    secteur: "",
    taille: "",
    besoin: "",
    message: "",
    website: "", // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [pageLoadTime] = useState(Date.now());

  /* Derive current step from form completion */
  const currentStep =
    formData.name && formData.email && formData.company
      ? formData.secteur && formData.besoin
        ? 3
        : 2
      : 1;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, submittedAt: pageLoadTime }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        trackEvent("submit_contact_success");
        router.push("/merci");
      } else {
        trackEvent("submit_contact_error", { reason: data.message || "server_error" });
        setSubmitError(data.message || "Une erreur s'est produite. Veuillez réessayer.");
        setIsSubmitting(false);
      }
    } catch {
      trackEvent("submit_contact_error", { reason: "network_error" });
      setSubmitError("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* ═══════════════════════════════════════════════
          HERO — dark gradient + stats strip
          ═══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3d1606 0%, #703211 40%, #8a3a11 70%, #ac470c 100%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,114,29,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,114,29,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Glow blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(232,114,29,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(52,120,190,0.6) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-0 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-400/30 bg-secondary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-300">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-400 animate-pulse-soft" />
                Réponse sous 4h
              </span>
            </motion.div>

            {/* Display title */}
            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl lg:text-7xl xl:text-8xl text-balance max-w-4xl"
            >
              Parlons de votre{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f99338 0%, #E8721D 60%, #fbb870 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                projet
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-200/80"
            >
              Décrivez votre contexte, notre équipe revient vers vous avec une proposition claire
              et adaptée à votre secteur.
            </motion.p>
          </motion.div>
        </div>

        {/* Stats strip — bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mt-16 border-t border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { value: "1 000+", label: "Clients équipés" },
                { value: "Afrique de l'Ouest", label: "Zone de couverture" },
                { value: "Installation", label: "Incluse dans chaque offre" },
              ].map(({ value, label }) => (
                <div key={label} className="px-6 py-6 text-center first:pl-0 last:pr-0">
                  <div className="stat-number text-2xl font-bold text-white sm:text-3xl">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-secondary-300/70 font-medium uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          MAIN SECTION — 2-col layout
          ═══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

            {/* ── Left column: dark info card (2/5) ─────────────── */}
            <motion.aside
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col"
            >
              <div
                className="flex h-full flex-col rounded-2xl p-8"
                style={{ background: "linear-gradient(160deg, #3d1606 0%, #703211 60%, #8a3a11 100%)" }}
              >
                {/* Brand badge */}
                <div className="mb-8 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #E8721D 0%, #f99338 100%)" }}
                  >
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">ESDLAB Technologies</div>
                    <div className="text-xs text-secondary-300/60">Digital Signage · Côte d&apos;Ivoire</div>
                  </div>
                </div>

                <h2 className="font-display text-2xl font-semibold text-white mb-2">
                  Nos coordonnées
                </h2>
                <p className="text-sm text-secondary-200/60 mb-8">
                  Disponibles du lundi au vendredi, 8h–18h GMT.
                </p>

                {/* Contact items */}
                <div className="space-y-5 mb-8">
                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/8 bg-white/5 p-4 transition-all duration-200 hover:bg-white/10 hover:border-white/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-800/60">
                      <svg className="h-4.5 w-4.5 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "1.125rem", height: "1.125rem" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-secondary-300/60 mb-0.5">Email</div>
                      <div className="text-sm font-medium text-white truncate group-hover:text-secondary-300 transition-colors duration-200">{email}</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${phone.replaceAll(/\s/g, "")}`}
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/8 bg-white/5 p-4 transition-all duration-200 hover:bg-white/10 hover:border-white/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-800/60">
                      <svg className="text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "1.125rem", height: "1.125rem" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-secondary-300/60 mb-0.5">Téléphone</div>
                      <div className="text-sm font-medium text-white group-hover:text-secondary-300 transition-colors duration-200">{phone}</div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-800/60">
                      <svg className="text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "1.125rem", height: "1.125rem" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-secondary-300/60 mb-0.5">Adresse</div>
                      <div className="text-sm font-medium text-white whitespace-pre-line leading-relaxed">{address}</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-8 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-200"
                >
                  <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.52 3.48A11.86 11.86 0 0012.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.65a11.9 11.9 0 005.77 1.48h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.45zM12.09 21.8h-.01a9.86 9.86 0 01-5.02-1.37l-.36-.22-3.74.98 1-3.65-.24-.37A9.84 9.84 0 012.2 11.9c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.11 1.03 6.98 2.89a9.8 9.8 0 012.9 6.99c0 5.45-4.44 9.89-9.88 9.89zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.05 9.05 0 01-1.68-2.09c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                  Échanger sur WhatsApp
                </a>

                {/* Guarantees */}
                <div className="mt-auto">
                  <div className="text-xs font-bold uppercase tracking-widest text-secondary-300/50 mb-3">
                    Ce que vous obtenez
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      "Réponse sous 4h ouvrées garantie",
                      "Démo personnalisée selon votre secteur",
                      "Recommandations de déploiement concrètes",
                      "Devis sans engagement",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-secondary-200/70">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.aside>

            {/* ── Right column: form on white (3/5) ─────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl bg-white p-8 shadow-elegant-lg">
                {/* Form header */}
                <div className="mb-6">
                  <h2 className="font-display text-3xl font-semibold text-slate-900">
                    Envoyez-nous un message
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Tous les champs marqués <span className="text-secondary-500">*</span> sont requis.
                  </p>
                </div>

                {/* Step indicator */}
                <StepIndicator current={currentStep} />

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                    aria-hidden="true"
                  />

                  {/* ── Group 1: Identité ── */}
                  <fieldset className="mb-8">
                    <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #E8721D, #ac470c)" }}
                      >
                        1
                      </span>
                      Identité
                    </legend>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Nom complet <span className="text-secondary-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          className="input-elegant w-full"
                          placeholder="Jean Koné"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Email professionnel <span className="text-secondary-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          className="input-elegant w-full"
                          placeholder="jean@entreprise.ci"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          className="input-elegant w-full"
                          placeholder="+225 07 79 56 52 26"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Entreprise <span className="text-secondary-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          autoComplete="organization"
                          className="input-elegant w-full"
                          placeholder="Mon Entreprise SA"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Group 2: Projet ── */}
                  <fieldset className="mb-8">
                    <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all duration-300 ${
                          currentStep >= 2
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                        style={{ background: "linear-gradient(135deg, #E8721D, #ac470c)" }}
                      >
                        2
                      </span>
                      Projet
                    </legend>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <div>
                        <label htmlFor="secteur" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Secteur d&apos;activité <span className="text-secondary-500">*</span>
                        </label>
                        <select
                          id="secteur"
                          name="secteur"
                          value={formData.secteur}
                          onChange={handleChange}
                          required
                          className="input-elegant w-full cursor-pointer"
                        >
                          <option value="">Sélectionner</option>
                          <option value="zones-industrielles">Zones industrielles</option>
                          <option value="banques-assurances">Banques &amp; assurances</option>
                          <option value="hotellerie-restauration">Hôtellerie &amp; restauration</option>
                          <option value="grande-distribution">Grande distribution</option>
                          <option value="institutions-universites">Institutions &amp; universités</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="taille" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Taille de l&apos;organisation
                        </label>
                        <select
                          id="taille"
                          name="taille"
                          value={formData.taille}
                          onChange={handleChange}
                          className="input-elegant w-full cursor-pointer"
                        >
                          <option value="">Sélectionner</option>
                          <option value="1-10">1 – 10 personnes</option>
                          <option value="11-50">11 – 50 personnes</option>
                          <option value="51-200">51 – 200 personnes</option>
                          <option value="201-500">201 – 500 personnes</option>
                          <option value="500+">500 personnes et plus</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="besoin" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Type de besoin <span className="text-secondary-500">*</span>
                        </label>
                        <select
                          id="besoin"
                          name="besoin"
                          value={formData.besoin}
                          onChange={handleChange}
                          required
                          className="input-elegant w-full cursor-pointer"
                        >
                          <option value="">Sélectionner</option>
                          <option value="demo">Demande de démo</option>
                          <option value="devis">Demande de devis</option>
                          <option value="info">Informations générales</option>
                          <option value="pilote">Pilote / POC</option>
                          <option value="support">Support technique</option>
                          <option value="partenariat">Partenariat</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Group 3: Message ── */}
                  <fieldset className="mb-8">
                    <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all duration-300 ${
                          currentStep >= 3
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                        style={{ background: "linear-gradient(135deg, #E8721D, #ac470c)" }}
                      >
                        3
                      </span>
                      Message
                    </legend>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Votre message <span className="text-secondary-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="input-elegant w-full resize-none"
                        placeholder="Décrivez votre projet, le nombre d'écrans envisagé, vos contraintes d'installation…"
                      />
                    </div>
                  </fieldset>

                  {/* Error message */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        aria-live="polite"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
                      >
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-red-800">Erreur lors de l&apos;envoi</p>
                          <p className="mt-0.5 text-sm text-red-700">{submitError}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full overflow-hidden rounded-xl px-8 py-4 text-base font-semibold text-white transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    style={{
                      background: isSubmitting
                        ? "#ac470c"
                        : "linear-gradient(135deg, #E8721D 0%, #d05d0e 50%, #ac470c 100%)",
                    }}
                  >
                    {/* Shimmer overlay on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
                      }}
                    />
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Envoyer ma demande
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-400">
                    En soumettant ce formulaire, vous acceptez notre{" "}
                    <a href="/confidentialite" className="text-secondary-600 underline-offset-2 hover:underline">
                      politique de confidentialité
                    </a>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          POURQUOI NOUS — 3 horizontal cards
          ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 text-center"
          >
            <span className="eyebrow mb-4">Notre différence</span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 lg:text-4xl">
              Pourquoi choisir ESDLAB ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY_US_ITEMS.map(({ num, title, text }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true, margin: "-60px" }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-elegant transition-all duration-300 hover:border-secondary-100 hover:shadow-elegant-lg cursor-default"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #E8721D 0%, #ac470c 100%)" }}
                >
                  {num}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{text}</p>
                </div>
                {/* Accent corner */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(232,114,29,0.08) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 flex flex-col items-center gap-3 text-center"
          >
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-2 font-display text-4xl font-semibold text-slate-900 lg:text-5xl">
              Questions fréquentes
            </h2>
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-slate-500">
              Tout ce que vous devez savoir sur nos solutions d&apos;affichage dynamique.
              Une autre question ?{" "}
              <a href={`mailto:${email}`} className="font-medium text-secondary-600 underline-offset-2 hover:underline">
                Écrivez-nous
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-6 shadow-elegant"
          >
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
