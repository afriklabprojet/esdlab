/**
 * fill-homepage-settings.ts
 * Upsert (create OR update) tous les settings de la page d'accueil
 * avec les valeurs exactes affichées sur le frontend.
 *
 * Usage :
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fill-homepage-settings.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Contenu exact affiché sur le frontend ─────────────────────────────────

const SETTINGS: Record<string, string> = {

  // ── Site ──────────────────────────────────────────────────────────────────
  "site.name":              "ESDLAB Technologies",
  "site.tagline":           "Solution d'affichage dynamique Full Web",
  "site.seo_title":         "ESDLAB Technologies — Affichage dynamique Full Web",
  "site.seo_description":   "Solution d'affichage dynamique Full Web pensée pour les hôtels, banques, industries et institutions en Afrique de l'Ouest.",
  "site.seo_og_description":"Pilotez vos écrans, harmonisez votre communication et gagnez en impact avec une solution Full Web sobre et premium.",
  "site.description":       "Solutions d'affichage dynamique pour entreprises, institutions et commerces. Pilotage 100% Full Web, multi-sites.",

  // ── Contact ───────────────────────────────────────────────────────────────
  "contact.email":            "contact@esdlab.pro",
  "contact.phone":            "+225 07 79 56 52 26",
  "contact.phone_raw":        "+2250779565226",
  "contact.address":          "Treichville, Abidjan, Côte d'Ivoire",
  "contact.hours":            "Lun-Ven 8h-18h",
  "contact.whatsapp":         "2250779565226",
  "contact.whatsapp_message": "Bonjour ESDLAB, je souhaite échanger au sujet de DigiLab Corporate.",

  // ── Réseaux sociaux ───────────────────────────────────────────────────────
  "social.linkedin":  "https://www.linkedin.com/company/esdlab",
  "social.facebook":  "",
  "social.instagram": "",
  "social.twitter":   "",
  "social.youtube":   "",

  // ── Header ────────────────────────────────────────────────────────────────
  "header.nav": JSON.stringify([
    { href: "/",         label: "Accueil" },
    { href: "/services", label: "Nos services" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact",  label: "Contact" },
  ]),

  // ── Footer ────────────────────────────────────────────────────────────────
  "footer.copyright": "ESDLAB — Electronic System Development, Lab. Tous droits réservés.",
  "footer.cta_label": "Réserver une démo",
  "footer.cta_href":  "/contact",
  "footer.nav": JSON.stringify([
    { href: "/",                label: "Accueil" },
    { href: "/a-propos",        label: "À propos" },
    { href: "/contact",         label: "Contact" },
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cookies",         label: "Cookies" },
  ]),
  "footer.secteurs": JSON.stringify([
    { href: "/services/industrie-production",  label: "Industrie & Production" },
    { href: "/services/services-tertiaire",    label: "Services & Tertiaire" },
    { href: "/services/commerce-retail",       label: "Commerce & Retail" },
    { href: "/services/institutions-sante",    label: "Institutions & Santé" },
    { href: "/services/education",             label: "Éducation" },
    { href: "/services/hotellerie-tourisme",   label: "Hôtellerie & Tourisme" },
  ]),

  // ── Hero ──────────────────────────────────────────────────────────────────
  "hero.title":
    "Le digital signage qui transforme vos espaces.",
  "hero.subtitle":
    "Informer, annoncer, stimuler — tout depuis une seule plateforme web pensée pour les entreprises africaines.",
  "hero.cta_primary":   "Demander une démo",
  "hero.cta_secondary": "Découvrir nos services",
  "hero.image":         "/images/Créez.jpg",
  "hero.video":         "/videos/hero.mp4",

  // ── Statistiques ──────────────────────────────────────────────────────────
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

  // ── Page d'accueil — Partenaires ──────────────────────────────────────────
  "home.partners_label": "Ils nous font confiance",
  "home.partner_logos": JSON.stringify([
    "CCI",
    "BPI France",
    "France Num",
    "Lorraine Inside",
    "Grand Est",
    "French Tech",
    "Deloitte",
    "Les Vitrines de France",
    "Partnershift",
    "Unimev",
  ]),

  // ── Page d'accueil — Secteurs ─────────────────────────────────────────────
  "home.sectors_title": "Des solutions digitales adaptées à votre secteur d'activité",
  "home.sectors_cta":   "Découvrir tous nos secteurs",
  "home.sectors": JSON.stringify([
    { label: "Zones industrielles",      image: "/images/Créez.jpg",    href: "/services/industrie-production" },
    { label: "Banques & assurances",     image: "/images/Planifiez.jpg", href: "/services/services-tertiaire" },
    { label: "Hôtellerie & restauration",image: "/images/Créez.jpg",    href: "/services/hotellerie-tourisme" },
    { label: "Grande distribution",      image: "/images/Planifiez.jpg", href: "/services/commerce-retail" },
    { label: "Institutions & universités",image: "/images/Diffusez.jpg", href: "/services/institutions-sante" },
    { label: "Éducation",                image: "/images/Diffusez.jpg", href: "/services/education" },
  ]),

  // ── Page d'accueil — Produits ─────────────────────────────────────────────
  "home.products_eyebrow": "Nos produits",
  "home.products_title":   "Les supports digitaux qui donnent du relief à vos espaces",
  "home.products_subtitle":
    "Des équipements sélectionnés pour capter l'attention, diffuser vos contenus et simplifier les parcours sur site.",
  "home.products_cta": "Explorer nos solutions",
  "home.products": JSON.stringify([
    {
      title:   "Bornes tactiles",
      desc:    "Qu'il s'agisse de promouvoir vos produits, d'animer vos événements ou de simplifier les paiements, une seule solution : la borne interactive tactile. Elle vous permet de communiquer de façon originale et interactive avec vos clients.",
      slug:    "bornes-tactiles",
      kicker:  "Accueil, paiement, animation",
      uses:    ["Commande", "Orientation", "Collecte"],
      iconKey: "kiosk",
    },
    {
      title:   "Chevalets numériques",
      desc:    "Le chevalet numérique est l'outil de communication idéal pour tous les commerçants. Vous pourrez l'installer où vous le souhaitez afin de valoriser vos offres, de jour comme de nuit, et même par mauvais temps !",
      slug:    "chevalets-numeriques",
      kicker:  "Vitrine, trottoir, point de vente",
      uses:    ["Offres du jour", "Flux piéton", "Promotions"],
      iconKey: "chevalet",
    },
    {
      title:   "Écrans Numériques Interactifs",
      desc:    "Améliorez la communication entre vos collaborateurs, accroissez la productivité grâce aux réunions flexibles, et économisez du temps et de l'argent en supprimant les déplacements inutiles.",
      slug:    "ecrans-numeriques",
      kicker:  "Réunion, formation, collaboration",
      uses:    ["Réunions", "Cours", "Ateliers"],
      iconKey: "screen",
    },
    {
      title:   "Écrans vitrine",
      desc:    "Remplacez vos affiches traditionnelles en papier par des écrans haute luminosité pour capter davantage l'attention de vos prospects. Les écrans vitrine offrent une flexibilité inégalée pour vos messages publicitaires ciblés !",
      slug:    "ecrans-vitrine",
      kicker:  "Haute luminosité, impact immédiat",
      uses:    ["Vitrine", "Outdoor", "Campagnes"],
      iconKey: "vitrine",
    },
  ]),

  // ── Page d'accueil — Témoignages ──────────────────────────────────────────
  "home.testimonials_eyebrow": "Témoignages",
  "home.testimonials_title":   "Ce que disent nos clients",
  "home.testimonials": JSON.stringify([
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
  ]),

  // ── Page d'accueil — Autres sections ─────────────────────────────────────
  "home.showroom_title":    "Venez tester les solutions en showroom",
  "home.showroom_subtitle": "Comparez les formats, les usages et les interfaces avant de choisir la configuration adaptée à votre site.",
  "home.showroom_cta":      "Prendre un rendez-vous",
  "home.final_eyebrow":     "Passez à l'action",
  "home.final_title":       "Prêt à moderniser votre communication ?",
  "home.final_subtitle":    "Nos experts vous accompagnent de l'étude de votre projet jusqu'à la mise en service de vos solutions.",
  "home.final_primary_cta":   "Prendre un rendez-vous",
  "home.final_secondary_cta": "Demander un devis gratuit",

  // ── À propos ──────────────────────────────────────────────────────────────
  "about.hero_subtitle":
    "Electronic System Development, Lab. — Pionniers de l'affichage dynamique en Afrique de l'Ouest",
  "about.mission_title": "Notre Mission",
  "about.mission_p1":
    "ESDLAB (Electronic System Development, Lab.) développe DigiLab Corporate, une solution d'affichage dynamique full web qui révolutionne la communication d'entreprise. Basés à Treichville, Abidjan, nous sommes pionniers sur le marché ivoirien avec 0 concurrent local identifié.",
  "about.mission_p2":
    "Notre solution permet à plus de 1 000 clients de piloter à distance leurs écrans d'affichage sans aucune compétence technique requise. Avec un taux de conversion de 80%+ après une démo pilote, nous transformons la façon dont les entreprises communiquent avec leurs équipes et leurs clients.",
  "about.mission_p3":
    "Notre mission : rendre la communication digitale accessible à 45 000+ entreprises d'Afrique de l'Ouest, en offrant une solution clé en main incluant matériel, configuration, installation, formation et support.",
  "about.mission_image":  "/images/process images.png",
  "about.creez_image":    "/images/Créez.jpg",
  "about.planifiez_image":"/images/Planifiez.jpg",
  "about.diffusez_image": "/images/Diffusez.jpg",
  "about.cta_title":    "Travaillons ensemble",
  "about.cta_subtitle": "Vous avez un projet ? Discutons de la manière dont nous pouvons vous aider.",
  "about.values": JSON.stringify([
    { icon: "01", title: "Full Web",        description: "Interface 100% web, aucune installation nécessaire. Compatible ordinateur, tablette et smartphone." },
    { icon: "02", title: "Simplicité",      description: "Aucune compétence technique avancée requise. Vos équipes prennent la main très rapidement." },
    { icon: "03", title: "Personnalisation",description: "Des gabarits adaptables à votre identité visuelle, pour une communication plus cohérente." },
    { icon: "04", title: "Visual Management",description: "Connexion à vos outils internes pour diffuser KPI, objectifs et messages opérationnels." },
    { icon: "05", title: "Accompagnement", description: "Installation, formation, support et suivi : un service de bout en bout." },
    { icon: "06", title: "Impact rapide",   description: "Une solution pensée pour être visible vite, comprise vite et utilisée vite." },
  ]),
  "about.stats": JSON.stringify([
    { number: "1 000+",  label: "clients déjà accompagnés" },
    { number: "45 000+", label: "entreprises cibles sur le marché" },
    { number: "< 2 h",   label: "pour la prise en main" },
    { number: "24/7",    label: "support disponible" },
  ]),

  // ── Sections dynamiques ───────────────────────────────────────────────────
  "pillars": JSON.stringify([
    { number: "01", title: "Informer",  description: "Diffusez vos indicateurs, vos annonces et vos messages clés en temps réel sur tous vos écrans." },
    { number: "02", title: "Annoncer", description: "Orchestrez une communication interne et externe plus claire, plus cohérente, plus visible." },
    { number: "03", title: "Stimuler", description: "Valorisez vos équipes, renforcez l'engagement et créez un rythme de communication plus vivant." },
  ]),
  "proof_points": JSON.stringify([
    { text: "Prise en main en moins de 2 heures", icon: "⚡" },
    { text: "Pilotage 100% Full Web",              icon: "🌐" },
    { text: "Déploiement multi-sites",             icon: "🏢" },
  ]),
  "commitments": JSON.stringify([
    { title: "Sobriété premium",       description: "Une présence visuelle plus raffinée, pensée pour les environnements exigeants." },
    { title: "Mise à jour instantanée",description: "Vos contenus évoluent en quelques clics, depuis un PC, une tablette ou un téléphone." },
    { title: "Accompagnement de A à Z",description: "Conseil, installation, formation et suivi, avec une seule équipe à vos côtés." },
  ]),
  "comparisons": JSON.stringify([
    { criterion: "Mise à jour des contenus",  without: "Impression manuelle, 24–48h",      with: "Instantané depuis navigateur" },
    { criterion: "Supervision des écrans",    without: "Intervention physique obligatoire", with: "Dashboard temps réel" },
    { criterion: "KPIs de production",        without: "Tableaux blancs ou Excel imprimé",  with: "Connecté aux données live" },
    { criterion: "Cohérence visuelle",        without: "Variable selon les sites",          with: "Design system unifié" },
    { criterion: "Coût récurrent",            without: "Impression + main d'œuvre",         with: "Abonnement fixe prévisible" },
    { criterion: "Accessibilité multi-sites", without: "Déplacement requis",                with: "100% Full Web, partout" },
    { criterion: "Impact écologique",         without: "Déchets papier importants",         with: "Zéro impression" },
    { criterion: "Réactivité communication",  without: "Délai min. 24h",                    with: "Moins de 5 secondes" },
  ]),
  "sectors": JSON.stringify([
    { label: "Industrie & Production",  icon: "⚙" },
    { label: "Services & Tertiaire",    icon: "◈" },
    { label: "Commerce & Retail",       icon: "⊞" },
    { label: "Institutions & Santé",    icon: "◉" },
    { label: "Éducation",               icon: "◇" },
    { label: "Hôtellerie & Tourisme",   icon: "◈" },
  ]),
};

// ─── Runner ────────────────────────────────────────────────────────────────

async function run() {
  console.log(`Upsert de ${Object.keys(SETTINGS).length} settings…`);
  let created = 0;
  let updated = 0;

  for (const [key, value] of Object.entries(SETTINGS)) {
    const existing = await prisma.setting.findUnique({ where: { key } });
    if (existing) {
      if (existing.value !== value) {
        await prisma.setting.update({ where: { key }, data: { value } });
        updated++;
        console.log(`  UPDATED  ${key}`);
      } else {
        console.log(`  unchanged ${key}`);
      }
    } else {
      await prisma.setting.create({ data: { key, value } });
      created++;
      console.log(`  CREATED  ${key}`);
    }
  }

  const total = await prisma.setting.count();
  console.log(`\n✅ Terminé — ${created} créés, ${updated} mis à jour, ${total} settings au total en base.`);
}

run()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
