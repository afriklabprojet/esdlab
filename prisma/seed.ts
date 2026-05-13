import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  {
    slug: "industrie-production",
    title: "Industrie & Production",
    subtitle: "Visual Management & KPI",
    description:
      "Améliorez la performance de vos sites industriels avec l'affichage dynamique des KPI en temps réel. Yopougon, Vridi, Port-Bouët.",
    longDescription:
      "Dans les environnements industriels, la clarté visuelle fait gagner du temps et améliore la coordination. DigiLab Corporate permet de diffuser vos indicateurs, consignes de sécurité et tableaux de performance en temps réel, sur un ou plusieurs sites.",
    image: "/images/Créez.jpg",
    icon: "01",
    color: "from-primary-700 to-primary-500",
    features: [
      "Affichage KPI production en temps réel",
      "Consignes de sécurité et alertes visuelles",
      "Visual Management connecté à votre GPAO/ERP",
      "Motivation équipes avec tableaux de performance",
      "Gestion multi-sites et zones industrielles",
    ],
    benefits: [
      { title: "KPI visibles immédiatement", description: "Production, sécurité et performance affichées sans délai." },
      { title: "Pilotage multi-sites", description: "Une seule interface pour plusieurs ateliers ou usines." },
      { title: "Messages prioritaires", description: "Alertes, consignes et changements relayés instantanément." },
      { title: "Lecture simplifiée", description: "Une information claire, pensée pour être vue vite et bien." },
    ],
    process: [
      "Audit des zones de diffusion et des points critiques",
      "Configuration des écrans et des gabarits KPI",
      "Connexion à vos outils internes ou exports métier",
      "Formation rapide des équipes terrain",
      "Suivi et ajustements selon vos usages réels",
    ],
    technologies: ["ERP / GPAO", "TV Pro", "Mode planning", "Multi-sites", "Alerting", "Exports CSV"],
    order: 1,
  },
  {
    slug: "services-tertiaire",
    title: "Services & Tertiaire",
    subtitle: "Communication Professionnelle",
    description:
      "Banques, assurances, cabinets et sociétés de services : SGBCI, BICICI, Ecobank, NSIA — modernisez vos espaces et votre communication client.",
    longDescription:
      "Dans les banques, assurances et sociétés de services, chaque écran doit rassurer, orienter et valoriser vos offres. DigiLab Corporate aide à diffuser les messages commerciaux, les informations pratiques et les temps forts de manière cohérente, premium et centralisée.",
    image: "/images/Planifiez.jpg",
    icon: "02",
    color: "from-primary-800 to-secondary-600",
    features: [
      "Écrans zones d'attente avec contenu dynamique",
      "Communication produits, services et offres",
      "Affichage cours de change et données en temps réel",
      "Gestion de files d'attente numérique",
      "Standards visuels cohérents dans toutes les agences",
    ],
    benefits: [
      { title: "Espaces d'attente valorisés", description: "Un accueil plus lisible, plus calme, plus rassurant." },
      { title: "Messages centralisés", description: "Mêmes standards visuels dans toutes les agences." },
      { title: "Contenus actualisables", description: "Offres, horaires, campagnes ou informations clients en quelques clics." },
      { title: "Image de marque renforcée", description: "Une communication plus cohérente avec votre standing." },
    ],
    process: [
      "Définition des zones d'accueil et d'attente",
      "Création des gabarits d'information et de promotion",
      "Calendrier éditorial et campagnes récurrentes",
      "Mise en service sur les agences pilotes",
      "Déploiement progressif et gouvernance de contenu",
    ],
    technologies: ["Files d'attente", "Écrans agences", "Templates premium", "Planning centralisé", "Contenus temps réel"],
    order: 2,
  },
  {
    slug: "commerce-retail",
    title: "Commerce & Retail",
    subtitle: "PLV Digitale Temps Réel",
    description:
      "Prosuma, Park'N'Shop, Hayat, boutiques et centres commerciaux : boostez vos ventes avec des promotions dynamiques et ciblées.",
    longDescription:
      "En commerce et retail, l'information doit être instantanée, claire et rentable. DigiLab Corporate permet d'orchestrer des promotions dynamiques, de synchroniser les temps forts commerciaux et de centraliser la diffusion pour plusieurs points de vente.",
    image: "/images/Créez.jpg",
    icon: "03",
    color: "from-primary-700 to-secondary-500",
    features: [
      "Promotions et prix temps réel synchronisés",
      "PLV digitale haute visibilité sur le lieu de vente",
      "Gestion centralisée multi-magasins",
      "Programmation horaire des campagnes",
      "Analytics et mesure d'impact commercial",
    ],
    benefits: [
      { title: "Offres en temps réel", description: "Prix, opérations et campagnes relayés sans friction." },
      { title: "Pilotage multi-magasins", description: "Une seule console pour coordonner plusieurs points de vente." },
      { title: "Plus d'impact visuel", description: "Une PLV digitale plus lisible, plus active, plus mesurable." },
      { title: "Programmation fine", description: "Diffusez selon les horaires, les rayons ou les temps forts." },
    ],
    process: [
      "Identification des zones à fort trafic",
      "Création des gabarits promotionnels et marque",
      "Connexion au planning commercial",
      "Déploiement magasin pilote puis réseau",
      "Optimisation continue des campagnes",
    ],
    technologies: ["PLV digitale", "Multi-magasins", "Templates promo", "Planning auto", "Analytics retail"],
    order: 3,
  },
  {
    slug: "institutions-sante",
    title: "Institutions & Santé",
    subtitle: "Gouvernance & Information Publique",
    description:
      "Mairies, Ministères, cliniques et hôpitaux : simplifiez la communication institutionnelle et améliorez l'orientation des usagers.",
    longDescription:
      "Les institutions publiques et établissements de santé ont besoin d'une communication claire, sécurisée et accessible. DigiLab Corporate facilite la diffusion d'informations institutionnelles, l'orientation des usagers et la gestion des annonces urgentes.",
    image: "/images/Planifiez.jpg",
    icon: "04",
    color: "from-primary-600 to-secondary-700",
    features: [
      "Signalétique dynamique et orientation visiteurs",
      "Annonces institutionnelles et messages urgents",
      "Affichage salles d'attente (cliniques, hôpitaux)",
      "Gestion multi-services et droits d'accès",
      "Interface sécurisée multi-départements",
    ],
    benefits: [
      { title: "Information claire", description: "Une communication accessible et facile à comprendre." },
      { title: "Orientation simplifiée", description: "Des usagers mieux guidés dans vos établissements." },
      { title: "Annonces immédiates", description: "Messages urgents diffusés en quelques secondes." },
      { title: "Sécurité renforcée", description: "Accès et contenus contrôlés par service." },
    ],
    process: [
      "Cartographie des points d'affichage",
      "Définition des contenus par service",
      "Configuration des droits d'accès",
      "Formation des référents communication",
      "Suivi et amélioration continue",
    ],
    technologies: ["Signalétique", "Multi-services", "Droits d'accès", "Annonces urgentes", "Templates institutionnels"],
    order: 4,
  },
  {
    slug: "education",
    title: "Éducation",
    subtitle: "Campus & Apprentissage",
    description:
      "HEC, ESATIC, IAA, universités et lycées : facilitez la communication dans vos campus avec des écrans dynamiques et des plannings en temps réel.",
    longDescription:
      "Les campus et établissements éducatifs ont besoin de partager rapidement plannings, annonces et informations. DigiLab Corporate centralise et diffuse ces contenus sur tous les écrans du campus.",
    image: "/images/Diffusez.jpg",
    icon: "05",
    color: "from-secondary-600 to-secondary-400",
    features: [
      "Emplois du temps et salles affichés en temps réel",
      "Annonces campus et informations administratives",
      "Réservation de salles via écran tactile",
      "Signalétique d'orientation et guidage visiteurs",
      "Intégration Google Calendar, Outlook & Microsoft 365",
    ],
    benefits: [
      { title: "Plannings à jour", description: "Cours, salles et examens synchronisés en temps réel." },
      { title: "Communication campus", description: "Annonces et événements relayés partout." },
      { title: "Orientation facile", description: "Visiteurs et nouveaux étudiants mieux guidés." },
      { title: "Intégrations natives", description: "Vos outils administratifs déjà connectés." },
    ],
    process: [
      "Identification des points stratégiques du campus",
      "Connexion aux outils planning existants",
      "Configuration des écrans et des contenus",
      "Formation des équipes administratives",
      "Suivi et évolutions selon les retours étudiants",
    ],
    technologies: ["Google Calendar", "Outlook 365", "Réservation tactile", "Multi-bâtiments", "Annonces campus"],
    order: 5,
  },
  {
    slug: "hotellerie-tourisme",
    title: "Hôtellerie & Tourisme",
    subtitle: "Expérience Premium",
    description:
      "Sofitel, Pullman, Azalaï, Mövenpick, restaurants et resorts : enchantez vos clients avec une communication visuelle haut de gamme.",
    longDescription:
      "Dans l'hôtellerie et le tourisme, l'expérience visuelle est essentielle. DigiLab Corporate vous aide à diffuser informations, événements et contenus premium dans tous vos espaces clients.",
    image: "/images/Créez.jpg",
    icon: "06",
    color: "from-secondary-700 to-primary-600",
    features: [
      "Affichage menus restaurants dynamiques",
      "Informations chambres et services hôteliers",
      "Contenus événementiels et conciergerie",
      "Multilingue (FR/EN/AR/ES)",
      "Templates premium adaptés à votre marque",
    ],
    benefits: [
      { title: "Expérience client premium", description: "Une communication visuelle au niveau de votre établissement." },
      { title: "Multilingue", description: "Contenus adaptés à votre clientèle internationale." },
      { title: "Menus dynamiques", description: "Mise à jour instantanée des cartes et offres." },
      { title: "Informations services", description: "Conciergerie, événements et infos pratiques." },
    ],
    process: [
      "Audit des zones d'affichage clients",
      "Création des templates premium sur-mesure",
      "Configuration multilingue",
      "Mise en service et formation",
      "Évolution selon saisons et événements",
    ],
    technologies: ["Multilingue", "Templates premium", "Menus dynamiques", "Événementiel", "Multi-zones"],
    order: 6,
  },
];

const settings: Record<string, string> = {
  "site.title": "ESDLab Technologies",
  "site.tagline": "Affichage dynamique premium en Côte d'Ivoire",
  "site.description":
    "Solutions d'affichage dynamique pour entreprises, institutions et commerces. Pilotage 100% Full Web, multi-sites.",
  "contact.email": "contact@esdlab.pro",
  "contact.phone": "+225 07 79 56 52 26",
  "contact.phone_raw": "+2250779565226",
  "contact.address": "Treichville, Abidjan, Côte d'Ivoire",
  "contact.hours": "Lun-Ven 8h-18h",
  "social.linkedin": "https://www.linkedin.com/company/esdlab",
  "social.facebook": "",
  "social.instagram": "",
  "social.youtube": "",
  "hero.title": "Le digital signage qui transforme vos espaces.",
  "hero.subtitle":
    "Informer, annoncer, stimuler — tout depuis une seule plateforme web pensée pour les entreprises africaines.",
  "hero.cta_primary": "Demander une démo",
  "hero.cta_secondary": "Découvrir nos services",
  "hero.video": "/videos/hero.mp4",
  "stats.clients": "1 000+",
  "stats.clients_label": "Clients accompagnés",
  "stats.screens": "5 000+",
  "stats.screens_label": "Écrans déployés",
  "stats.expertise": "10 ans",
  "stats.expertise_label": "D'expertise digital",
  "stats.satisfaction": "98%",
  "stats.satisfaction_label": "Clients satisfaits",
  "stats.countries": "8",
  "stats.impact": "400%",
  "hero.image": "/images/Créez.jpg",
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
  "about.mission_image": "/images/process images.png",
  "about.creez_image": "/images/Créez.jpg",
  "about.planifiez_image": "/images/Planifiez.jpg",
  "about.diffusez_image": "/images/Diffusez.jpg",
  "about.hero_subtitle": "Electronic System Development, Lab. — Pionniers de l'affichage dynamique en Afrique de l'Ouest",
  "about.mission_title": "Notre Mission",
  "about.mission_p1": "ESDLAB (Electronic System Development, Lab.) développe DigiLab Corporate, une solution d'affichage dynamique full web qui révolutionne la communication d'entreprise. Basés à Treichville, Abidjan, nous sommes pionniers sur le marché ivoirien avec 0 concurrent local identifié.",
  "about.mission_p2": "Notre solution permet à plus de 1 000 clients de piloter à distance leurs écrans d'affichage sans aucune compétence technique requise. Avec un taux de conversion de 80%+ après une démo pilote, nous transformons la façon dont les entreprises communiquent avec leurs équipes et leurs clients.",
  "about.mission_p3": "Notre mission : rendre la communication digitale accessible à 45 000+ entreprises d'Afrique de l'Ouest, en offrant une solution clé en main incluant matériel, configuration, installation, formation et support.",
  "about.values": "[{\"icon\":\"01\",\"title\":\"Full Web\",\"description\":\"Interface 100% web, aucune installation nécessaire. Compatible ordinateur, tablette et smartphone.\"},{\"icon\":\"02\",\"title\":\"Simplicité\",\"description\":\"Aucune compétence technique avancée requise. Vos équipes prennent la main très rapidement.\"},{\"icon\":\"03\",\"title\":\"Personnalisation\",\"description\":\"Des gabarits adaptables à votre identité visuelle, pour une communication plus cohérente.\"},{\"icon\":\"04\",\"title\":\"Visual Management\",\"description\":\"Connexion à vos outils internes pour diffuser KPI, objectifs et messages opérationnels.\"},{\"icon\":\"05\",\"title\":\"Accompagnement\",\"description\":\"Installation, formation, support et suivi : un service de bout en bout.\"},{\"icon\":\"06\",\"title\":\"Impact rapide\",\"description\":\"Une solution pensée pour être visible vite, comprise vite et utilisée vite.\"}]",
  "about.stats": "[{\"number\":\"1 000+\",\"label\":\"clients déjà accompagnés\"},{\"number\":\"45 000+\",\"label\":\"entreprises cibles sur le marché\"},{\"number\":\"< 2 h\",\"label\":\"pour la prise en main\"},{\"number\":\"24/7\",\"label\":\"support disponible\"}]",
  "about.cta_title": "Travaillons ensemble",
  "about.cta_subtitle": "Vous avez un projet ? Discutons de la manière dont nous pouvons vous aider",
  "pillars": "[{\"number\":\"01\",\"title\":\"Informer\",\"description\":\"Diffusez vos indicateurs, vos annonces et vos messages clés en temps réel sur tous vos écrans.\"},{\"number\":\"02\",\"title\":\"Annoncer\",\"description\":\"Orchestrez une communication interne et externe plus claire, plus cohérente, plus visible.\"},{\"number\":\"03\",\"title\":\"Stimuler\",\"description\":\"Valorisez vos équipes, renforcez l'engagement et créez un rythme de communication plus vivant.\"}]",
  "proof_points": "[{\"text\":\"Prise en main en moins de 2 heures\",\"icon\":\"⚡\"},{\"text\":\"Pilotage 100% Full Web\",\"icon\":\"🌐\"},{\"text\":\"Déploiement multi-sites\",\"icon\":\"🏢\"}]",
  "commitments": "[{\"title\":\"Sobriété premium\",\"description\":\"Une présence visuelle plus raffinée, pensée pour les environnements exigeants.\"},{\"title\":\"Mise à jour instantanée\",\"description\":\"Vos contenus évoluent en quelques clics, depuis un PC, une tablette ou un téléphone.\"},{\"title\":\"Accompagnement de A à Z\",\"description\":\"Conseil, installation, formation et suivi, avec une seule équipe à vos côtés.\"}]",
  "comparisons": "[{\"criterion\":\"Mise à jour des contenus\",\"without\":\"Impression manuelle, 24–48h\",\"with\":\"Instantané depuis navigateur\"},{\"criterion\":\"Supervision des écrans\",\"without\":\"Intervention physique obligatoire\",\"with\":\"Dashboard temps réel\"},{\"criterion\":\"KPIs de production\",\"without\":\"Tableaux blancs ou Excel imprimé\",\"with\":\"Connecté aux données live\"},{\"criterion\":\"Cohérence visuelle\",\"without\":\"Variable selon les sites\",\"with\":\"Design system unifié\"},{\"criterion\":\"Coût récurrent\",\"without\":\"Impression + main d'œuvre\",\"with\":\"Abonnement fixe prévisible\"},{\"criterion\":\"Accessibilité multi-sites\",\"without\":\"Déplacement requis\",\"with\":\"100% Full Web, partout\"},{\"criterion\":\"Impact écologique\",\"without\":\"Déchets papier importants\",\"with\":\"Zéro impression\"},{\"criterion\":\"Réactivité communication\",\"without\":\"Délai min. 24h\",\"with\":\"Moins de 5 secondes\"}]",
  "sectors": "[{\"label\":\"Industrie & Production\",\"icon\":\"⚙\"},{\"label\":\"Services & Tertiaire\",\"icon\":\"◈\"},{\"label\":\"Commerce & Retail\",\"icon\":\"⊞\"},{\"label\":\"Institutions & Santé\",\"icon\":\"◉\"},{\"label\":\"Éducation\",\"icon\":\"◇\"},{\"label\":\"Hôtellerie & Tourisme\",\"icon\":\"◈\"}]",
};

const pages: Array<{ slug: string; title: string; content: string; seoTitle?: string; seoDescription?: string }> = [
  {
    slug: "a-propos",
    title: "À propos d'ESDLAB",
    seoTitle: "À propos — ESDLab Technologies",
    seoDescription:
      "ESDLAB conçoit et déploie des solutions d'affichage dynamique premium pour entreprises, institutions et commerces en Côte d'Ivoire et en Afrique de l'Ouest.",
    content: `# À propos d'ESDLAB

**ESDLAB** est l'éditeur de **DigiLab Corporate**, la plateforme d'affichage dynamique pensée pour les entreprises africaines.

## Notre mission

Donner aux entreprises, institutions et commerces les moyens de **communiquer en temps réel**, sur tous leurs sites, avec une plateforme **100% Full Web**, multilingue et pilotée à distance.

## Nos valeurs

- **Proximité terrain** — équipes basées à Abidjan, interventions multi-sites.
- **Robustesse** — solutions éprouvées en environnement industriel, bancaire et hospitalier.
- **Souveraineté** — vos contenus restent chez vous, hébergés selon vos exigences.

## Chiffres clés

- **1 000+** clients accompagnés
- **5 000+** écrans pilotés
- **8** pays couverts
- **+400%** d'impact mesuré sur l'engagement

## Nos engagements

Conformité RGPD, formation continue des équipes, support réactif et roadmap produit ouverte.`,
  },
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    seoTitle: "Mentions légales — ESDLab Technologies",
    seoDescription: "Informations légales du site esdlab.pro et de la société ESDLAB.",
    content: `# Mentions légales

## Éditeur du site

**ESDLAB**
Treichville, Abidjan — Côte d'Ivoire
Email : contact@esdlab.pro
Téléphone : +225 07 79 56 52 26

## Directeur de la publication

La direction d'ESDLAB.

## Hébergement

Le site est hébergé chez un prestataire conforme aux standards de sécurité et de disponibilité européens.

## Propriété intellectuelle

L'ensemble des contenus (textes, images, logos, code) est la propriété exclusive d'ESDLAB sauf mention contraire. Toute reproduction est interdite sans autorisation écrite préalable.

## Contact

Pour toute question : contact@esdlab.pro`,
  },
  {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    seoTitle: "Politique de confidentialité — ESDLAB",
    seoDescription:
      "Comment ESDLAB collecte, utilise et protège vos données personnelles. Conforme aux principes RGPD.",
    content: `# Politique de confidentialité

ESDLAB respecte votre vie privée et applique les principes du **RGPD**.

## Données collectées

Lors d'une demande de contact ou de démo, nous collectons : nom, email, téléphone, entreprise, message. Ces données sont utilisées **uniquement** pour répondre à votre demande.

## Conservation

Les données sont conservées 36 mois maximum après le dernier contact, puis supprimées ou anonymisées.

## Vos droits

Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Pour exercer ces droits : **contact@esdlab.pro**.

## Sécurité

Vos données sont stockées sur des serveurs sécurisés, chiffrement en transit (HTTPS) et au repos.

## Sous-traitants

Nous utilisons des prestataires conformes (hébergement, email transactionnel, analytics anonymisés).`,
  },
  {
    slug: "cookies",
    title: "Politique des cookies",
    seoTitle: "Cookies — ESDLAB",
    seoDescription: "Gestion des cookies et traceurs sur le site esdlab.pro.",
    content: `# Politique des cookies

## Cookies utilisés

Le site esdlab.pro utilise un nombre minimal de cookies :

- **Cookies essentiels** : nécessaires au fonctionnement (session, sécurité). Pas de consentement requis.
- **Cookies analytiques** : mesure d'audience anonymisée. Activés uniquement après consentement.

## Gestion du consentement

Un bandeau s'affiche à votre première visite. Vous pouvez modifier vos préférences à tout moment depuis le pied de page.

## Durée de vie

Les cookies analytiques expirent au maximum après 13 mois.

## Contact

Pour toute question : contact@esdlab.pro`,
  },
];

async function main() {
  console.log("🌱 Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@esdlab.pro";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe!2026";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrateur ESDLAB",
      passwordHash,
      role: "admin",
      status: "active",
    },
  });
  console.log(`✅ Admin: ${adminEmail} (mot de passe préservé si déjà existant)`);

  console.log("🌱 Seeding services...");
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        longDescription: s.longDescription,
        image: s.image,
        icon: s.icon,
        color: s.color,
        features: JSON.stringify(s.features),
        benefits: JSON.stringify(s.benefits),
        process: JSON.stringify(s.process),
        technologies: JSON.stringify(s.technologies),
        order: s.order,
        published: true,
      },
      create: {
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        longDescription: s.longDescription,
        image: s.image,
        icon: s.icon,
        color: s.color,
        features: JSON.stringify(s.features),
        benefits: JSON.stringify(s.benefits),
        process: JSON.stringify(s.process),
        technologies: JSON.stringify(s.technologies),
        order: s.order,
        published: true,
      },
    });
  }
  console.log(`✅ ${services.length} services seedés`);

  console.log("🌱 Seeding settings...");
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log(`✅ ${Object.keys(settings).length} settings seedés`);
}

async function seedPages() {
  console.log("🌱 Seeding pages...");
  for (const p of pages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        content: p.content,
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        published: true,
      },
    });
  }
  console.log(`✅ ${pages.length} pages seedées`);
}

async function run() {
  await main();
  await seedPages();
  console.log("✨ Seed terminé.");
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
