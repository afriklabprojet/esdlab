import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Default nav links (mirror Header.tsx DEFAULT_NAV)
const DEFAULT_HEADER_NAV = JSON.stringify([
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
]);

// Default footer nav (mirror Footer.tsx DEFAULT_NAV)
const DEFAULT_FOOTER_NAV = JSON.stringify([
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cookies", label: "Cookies" },
]);

// Default footer secteurs (mirror Footer.tsx DEFAULT_SECTEURS)
const DEFAULT_FOOTER_SECTEURS = JSON.stringify([
  { href: "/services#industrie", label: "Industrie & Production" },
  { href: "/services#services", label: "Services & Tertiaire" },
  { href: "/services#commerce", label: "Commerce & Retail" },
  { href: "/services#institutions", label: "Institutions & Santé" },
  { href: "/services#education", label: "Éducation" },
  { href: "/services#hotellerie", label: "Hôtellerie & Tourisme" },
]);

const DEFAULTS: Record<string, string> = {
  // ── Site ──────────────────────────────────────────────
  "site.name":        "ESDLAB Technologies",
  "site.tagline":     "Solution d'affichage dynamique Full Web",
  "site.description": "La solution d'affichage dynamique Full Web pour les entreprises, banques, hôtels et institutions.",

  // ── Contact ───────────────────────────────────────────
  "contact.email":             "contact@esdlab.pro",
  "contact.phone":             "+225 07 79 56 52 26",
  "contact.address":           "Treichville, Abidjan, Côte d'Ivoire",
  "contact.whatsapp":          "2250779565226",
  "contact.whatsapp_message":  "Bonjour ESDLAB, je souhaite échanger au sujet de DigiLab Corporate.",

  // ── Réseaux sociaux ───────────────────────────────────
  "social.linkedin":  "",
  "social.twitter":   "",
  "social.facebook":  "",
  "social.instagram": "",
  "social.youtube":   "",

  // ── Header ────────────────────────────────────────────
  "header.nav": DEFAULT_HEADER_NAV,

  // ── Footer ────────────────────────────────────────────
  "footer.copyright": "ESDLAB — Electronic System Development, Lab. Tous droits réservés.",
  "footer.cta_label": "Réserver une démo",
  "footer.cta_href":  "/contact",
  "footer.nav":       DEFAULT_FOOTER_NAV,
  "footer.secteurs":  DEFAULT_FOOTER_SECTEURS,

  // ── Hero (page d'accueil) ─────────────────────────────
  "hero.title":         "Une communication plus élégante, plus maîtrisée.",
  "hero.subtitle":      "DigiLab Corporate aide les entreprises, hôtels, banques et institutions à piloter leurs écrans avec une interface claire, rapide et raffinée.",
  "hero.cta_primary":   "Demander une démo",
  "hero.cta_secondary": "Voir les secteurs servis",
  "hero.image":         "",
  "hero.video":         "/videos/hero.mp4",

  // ── Statistiques ──────────────────────────────────────
  "stats.clients":            "1 000+",
  "stats.clients_label":      "Clients accompagnés",
  "stats.screens":            "5 000+",
  "stats.screens_label":      "Écrans déployés",
  "stats.expertise":          "10 ans",
  "stats.expertise_label":    "D'expertise digital",
  "stats.satisfaction":       "98%",
  "stats.satisfaction_label": "Clients satisfaits",
  "stats.countries":          "8",
  "stats.impact":             "400%",

  // ── Page d'accueil ────────────────────────────────────
  "home.partners_label": "Ils nous font confiance",
  "home.partner_logos": JSON.stringify(["CCI", "BPI France", "France Num", "Lorraine Inside", "Grand Est", "French Tech", "Deloitte", "Les Vitrines de France", "Partnershift", "Unimev"]),
  "home.sectors_title": "Des solutions digitales adaptées à votre secteur d'activité",
  "home.sectors_cta": "Découvrir tous nos secteurs",
  "home.sectors": JSON.stringify([
    { label: "Commerces", image: "/images/secteur-commerces.jpg", href: "/services" },
    { label: "Événementiel", image: "/images/secteur-evenementiel.jpg", href: "/services" },
    { label: "Santé", image: "/images/secteur-sante.jpg", href: "/services" },
    { label: "Collectivités", image: "/images/secteur-collectivites.jpg", href: "/services" },
    { label: "Éducation", image: "/images/secteur-education.jpg", href: "/services" },
    { label: "Entreprise & Industrie", image: "/images/secteur-industrie.jpg", href: "/services" },
  ]),
  "home.products_eyebrow": "Nos produits",
  "home.products_title": "Les supports digitaux qui donnent du relief à vos espaces",
  "home.products_subtitle": "Des équipements sélectionnés pour capter l'attention, diffuser vos contenus et simplifier les parcours sur site.",
  "home.products_cta": "Explorer nos solutions",

  "home.products": JSON.stringify([
    { title: "Bornes tactiles", desc: "Qu'il s'agisse de promouvoir vos produits, d'animer vos événements ou de simplifier les paiements, une seule solution : la borne interactive tactile. Elle vous permet de communiquer de façon originale et interactive avec vos clients.", slug: "bornes-tactiles", kicker: "Accueil, paiement, animation", uses: ["Commande", "Orientation", "Collecte"], iconKey: "kiosk" },
    { title: "Chevalets numériques", desc: "Le chevalet numérique est l'outil de communication idéal pour tous les commerçants. Vous pourrez l'installer où vous le souhaitez afin de valoriser vos offres, de jour comme de nuit, et même par mauvais temps !", slug: "chevalets-numeriques", kicker: "Vitrine, trottoir, point de vente", uses: ["Offres du jour", "Flux piéton", "Promotions"], iconKey: "chevalet" },
    { title: "Écrans Numériques Interactifs", desc: "Améliorez la communication entre vos collaborateurs, accroissez la productivité grâce aux réunions flexibles, et économisez du temps et de l'argent en supprimant les déplacements inutiles.", slug: "ecrans-numeriques", kicker: "Réunion, formation, collaboration", uses: ["Réunions", "Cours", "Ateliers"], iconKey: "screen" },
    { title: "Écrans vitrine", desc: "Remplacez vos affiches traditionnelles en papier par des écrans haute luminosité pour capter davantage l'attention de vos prospects. Les écrans vitrine offrent une flexibilité inégalée pour vos messages publicitaires ciblés !", slug: "ecrans-vitrine", kicker: "Haute luminosité, impact immédiat", uses: ["Vitrine", "Outdoor", "Campagnes"], iconKey: "vitrine" },
  ]),
  "home.applications_eyebrow": "Applications",
  "home.applications_title": "Nos solutions les plus populaires",
  "home.applications_subtitle": "Des parcours digitaux prêts à déployer pour accueillir, orienter, vendre, encaisser et piloter vos contenus sur site.",
  "home.applications_cta": "Découvrir toutes nos applications",
  "home.applications": JSON.stringify([
    { title: "Borne d'accueil", desc: "Accueillez vos visiteurs avec style et efficacité", icon: "🚪", slug: "borne-accueil" },
    { title: "Borne de dons", desc: "Facilitez les collectes de fonds avec une interface intuitive", icon: "💝", slug: "borne-dons" },
    { title: "Affichage dynamique", desc: "Diffusez vos contenus en temps réel sur l'ensemble de votre parc", icon: "📡", slug: "affichage-dynamique" },
    { title: "Digital Event", desc: "Animez vos événements et congrès avec des jeux concours interactifs", icon: "🎲", slug: "digital-event" },
    { title: "Commande restaurant", desc: "Modernisez la prise de commandes en libre-service et réduisez les files", icon: "🍽️", slug: "commande-restaurant" },
    { title: "Wayfinder / Orientation", desc: "Guidez vos visiteurs dans tous vos espaces avec fluidité", icon: "🗺️", slug: "wayfinder" },
    { title: "Borne paiement", desc: "Simplifiez l'encaissement avec des solutions de paiement embarquées", icon: "💳", slug: "borne-paiement" },
    { title: "Affichage extérieur", desc: "Supports haute luminosité résistants aux intempéries pour l'extérieur", icon: "🌤️", slug: "affichage-exterieur" },
    { title: "Tableau de bord centralisé", desc: "Gérez l'ensemble de votre parc d'écrans depuis une seule interface", icon: "📊", slug: "tableau-de-bord" },
  ]),
  "home.showroom_title": "Venez tester les solutions en showroom",
  "home.showroom_subtitle": "Comparez les formats, les usages et les interfaces avant de choisir la configuration adaptée à votre site.",
  "home.showroom_cta": "Prendre un rendez-vous",
  "home.stats": "[]",
  "home.final_eyebrow": "Passez à l'action",
  "home.final_title": "Prêt à moderniser votre communication ?",
  "home.final_subtitle": "Nos experts vous accompagnent de l'étude de votre projet jusqu'à la mise en service de vos solutions.",
  "home.final_primary_cta": "Prendre un rendez-vous",
  "home.final_secondary_cta": "Demander un devis gratuit",
  "home.testimonials_eyebrow": "Témoignages",
  "home.testimonials_title": "Ils nous font confiance",
  "home.testimonials": JSON.stringify([
    { quote: "DigiLab nous a permis de piloter tous nos écrans depuis un seul tableau de bord. La prise en main par nos équipes s'est faite en une demi-journée.", author: "Marc D.", role: "Directeur des Opérations", company: "Groupe Industriel", initial: "M" },
    { quote: "Nous affichons nos offres du jour sur 32 écrans simultanément. Le retour clients sur l'image de notre réseau est très positif.", author: "Sophie L.", role: "Responsable Communication", company: "Réseau de distribution", initial: "S" },
    { quote: "Nos menus et promotions sont à jour en temps réel. L'équipe a assuré toute la formation sur place, sans friction.", author: "Jean-Pierre K.", role: "Directeur Général", company: "Hôtel & Restaurant", initial: "J" },
  ]),

  // ── À propos ──────────────────────────────────────────
  "about.title":       "À propos de DigiLab Corporate",
  "about.description": "",
  "about.image":       "",
  "about.values":      "[]",
  "about.stats":       "[]",

  // ── Sections dynamiques (arrays) ──────────────────────
  "pillars":      "[]",
  "proof_points": "[]",
  "commitments":  "[]",
  "comparisons":  "[]",
  "sectors":      "[]",
};

/**
 * POST /api/admin/settings/init
 *
 * Upserts every default setting key WITHOUT overwriting existing values.
 * Only inserts keys that are not yet in the database.
 * Returns { ok: true, inserted: N, skipped: N }
 */
export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Fetch which keys already exist
  const existing = await prisma.setting.findMany({
    select: { key: true },
  });
  const existingKeys = new Set(existing.map((s) => s.key));

  // Only create missing keys (never overwrite)
  const toInsert = Object.entries(DEFAULTS).filter(([key]) => !existingKeys.has(key));

  if (toInsert.length > 0) {
    await prisma.$transaction(
      toInsert.map(([key, value]) =>
        prisma.setting.create({ data: { key, value } }),
      ),
    );
  }

  return NextResponse.json({
    ok: true,
    inserted: toInsert.length,
    skipped: existingKeys.size,
  });
}
