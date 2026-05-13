# Cahier des Charges de Finalisation

## Projet

ESDLAB DigiLab Corporate

## Date

26 avril 2026

## Version

1.0

## Responsable de cadrage

CTO / Product Management / Delivery

---

## 0. Synthèse Exécutive

### Constat

Le dépôt actuel correspond à un site vitrine B2B en Next.js pour la solution DigiLab Corporate, avec un bon niveau d’habillage visuel, plusieurs pages marketing et un formulaire de contact connecté à Resend. En revanche, il ne s’agit pas du produit SaaS DigiLab lui-même. Les documents stratégiques décrivent une plateforme complète de pilotage d’écrans, de contenus, de planification, de KPI et de signalétique, alors que le code livré couvre essentiellement la couche acquisition marketing.

### Décision de cadrage

Pour tenir un objectif de livraison en 30 jours, le projet doit être recadré en deux périmètres distincts :

1. Finaliser le site corporate et son funnel de conversion.
2. Préparer techniquement l’extension future vers un back-office marketing et, plus tard, vers le produit SaaS DigiLab.

### Cible à 30 jours

Livrer un site corporate crédible, cohérent, mesurable et administrable, capable de générer des demandes de démo qualifiées, avec contenus finalisés, conformité légale, tracking, notifications, CMS léger et mini back-office commercial.

### Critères de succès

- Conversion visiteur vers lead qualifié supérieure ou égale à 2,5% sur trafic chaud.
- Temps de réponse commerciale inférieur à 4 heures ouvrées sur les leads entrants.
- Score Lighthouse supérieur ou égal à 85 sur mobile pour Performance, SEO et Accessibility.
- Zéro lien cassé sur le site public.
- 100% des pages légales et SEO critiques finalisées avant mise en production.

---

## 1. Compréhension du Projet

### 1.1 Résumé du concept

DigiLab Corporate est une offre d’affichage dynamique Full Web destinée aux entreprises, banques, hôtels, commerces, institutions et universités d’Afrique de l’Ouest. Le site a pour rôle de présenter la proposition de valeur, contextualiser les usages par secteur, rassurer les décideurs et générer des demandes de démonstration ou de devis.

### 1.2 Objectif principal du site

L’objectif principal n’est pas la vente en ligne, mais la conversion commerciale B2B :

- faire comprendre rapidement l’offre ;
- prouver sa pertinence métier ;
- créer de la confiance ;
- capter des leads qualifiés ;
- faciliter la prise de rendez-vous avec l’équipe commerciale.

### 1.3 Utilisateurs cibles

#### Persona 1 : Directeur de site industriel

- Attentes : pilotage KPI, sécurité, communication interne, multi-sites.
- Motivations : performance, discipline opérationnelle, visibilité temps réel.
- Freins : complexité technique, coût, intégration avec outils existants.

#### Persona 2 : Directeur marketing / communication banque ou assurance

- Attentes : cohérence de marque, valorisation agence, messages centralisés.
- Motivations : image premium, efficacité de communication, standardisation réseau.
- Freins : conformité, sécurité, gouvernance des contenus.

#### Persona 3 : Directeur général hôtel / restauration / retail

- Attentes : promotions, menus, offres, événements, rapidité de mise à jour.
- Motivations : augmentation du chiffre d’affaires, gain de temps, modernité.
- Freins : budget, simplicité d’usage, dépendance à un prestataire.

#### Persona 4 : Responsable SI / communication institutionnelle

- Attentes : signalétique, affichage d’informations, gouvernance multi-services.
- Motivations : clarté pour le public, centralisation, fiabilité.
- Freins : sécurité, droits d’accès, process internes.

#### Persona 5 : Équipe interne ESDLAB

- Rôles : commercial, administrateur, éditeur de contenu.
- Besoins : administrer les pages, suivre les leads, répondre rapidement, qualifier les demandes.

### 1.4 Cas d’usage principaux

- Un prospect découvre DigiLab via une campagne ou un bouche-à-oreille et consulte la page d’accueil.
- Un visiteur atterrit directement sur une page secteur pour évaluer l’adéquation avec son métier.
- Un décideur demande une démo via le formulaire de contact.
- Un commercial reçoit la notification, qualifie le lead et planifie un rendez-vous.
- Un administrateur met à jour les contenus, preuves commerciales, FAQs et pages légales.

---

## 2. Fonctionnalités Existantes

### 2.1 Ce qui est déjà développé

#### Site public

- Page d’accueil avec hero, argumentaire, comparatif, preuves et CTA.
- Page secteurs avec présentation des cibles métier.
- Pages dynamiques de détail par secteur.
- Page à propos.
- Page contact.
- Page mentions légales.
- Page démo composants.
- Header et footer responsives.

#### Composants UI

- Design system Tailwind cohérent.
- Animations Framer Motion.
- Composants UI réutilisables.
- Structure App Router Next.js 14 propre.

#### Backend léger

- Route POST de contact.
- Validation serveur minimale.
- Protection anti-spam basique par honeypot et délai de soumission.
- Envoi email via Resend.

#### SEO / technique

- Metadata globale.
- robots.txt généré.
- sitemap.xml généré.
- Favicon et image Open Graph.

### 2.2 Ce qui fonctionne a priori

- Le site public est navigable sur le plan structurel.
- Les pages marketing principales existent.
- Le formulaire a une logique front et back cohérente.
- Le projet est organisé et typé en TypeScript.
- L’architecture front est suffisamment propre pour supporter une finalisation rapide.

### 2.3 Ce qui est cassé ou incomplet

#### Incohérences fonctionnelles

- Le sitemap référence des routes de services qui n’existent plus.
- Les mentions légales contiennent des placeholders, des informations erronées et des liens vers des pages absentes.
- Il n’existe ni page confidentialité ni page cookies alors qu’elles sont appelées depuis le site.
- Le discours marketing fait parfois référence à un cockpit produit et à des capacités non démontrées par des preuves concrètes.

#### Incomplet métier

- Aucun CMS.
- Aucun dashboard admin.
- Aucune base de données pour stocker les leads.
- Aucune qualification commerciale des contacts.
- Aucun module de prise de rendez-vous.
- Aucune intégration CRM.
- Aucun tracking analytics opérationnel visible dans le code.

#### Incomplet exploitation

- Aucun monitoring d’erreurs.
- Aucune gestion formelle des consentements cookies.
- Aucune gouvernance éditoriale.
- Aucune gestion des rôles utilisateurs.

#### Validation technique

- Les dépendances ont dû être restaurées localement via npm install avant validation.
- Le build production a ensuite été validé avec succès le 26 avril 2026.

---

## 3. Manques et Incohérences

### 3.1 Fonctionnalités absentes

- Back-office de gestion de contenus.
- Back-office de gestion des leads.
- Authentification administrateur.
- Réinitialisation mot de passe.
- Notifications internes enrichies.
- Intégration WhatsApp commerciale.
- Base de connaissances / FAQ plus robuste.
- Études de cas réelles.
- Calendrier de réservation de démo.
- Tableau de bord de performance commerciale.

### 3.2 Logique métier incomplète

- Aucun cycle de vie lead : nouveau, qualifié, contacté, démo planifiée, gagné, perdu.
- Aucune segmentation par secteur ou source d’acquisition dans le stockage.
- Pas de mécanisme de scoring des leads.
- Pas de relance automatique ni de confirmation avancée.

### 3.3 UX non terminée

- Parcours contact trop court et peu qualifiant.
- Pas de page de remerciement dédiée.
- Pas de prise de rendez-vous instantanée après soumission.
- Peu de preuves sociales, références clients, cas concrets, captures produit.
- Manque d’un tunnel mobile très direct type bouton WhatsApp fixe ou CTA sticky.

### 3.4 Incohérences de positionnement

- Les documents source décrivent un produit complet de digital signage.
- Le dépôt actuel ne livre que le site corporate.
- Il faut donc éviter de planifier en 30 jours la totalité du produit SaaS si la priorité est la finalisation du site web.

### 3.5 Zones floues à verrouiller immédiatement

Ces zones ne doivent pas rester ouvertes. Elles doivent être arbitées au lancement du sprint.

- Périmètre confirmé : site corporate + mini back-office leads/CMS, et non la plateforme player/cockpit complète.
- Source de vérité contenus : équipe ESDLAB marketing/commerciale.
- Juridique : données officielles société à fournir avant J+10.
- Références clients : décider si elles sont publiques ou anonymisées.
- Canaux commerciaux prioritaires : email seul, ou email + WhatsApp + Calendly.

---

## 4. Cahier des Charges Fonctionnel Complet

## 4.1 Module Site Public

### Description

Le site public doit devenir un outil de conversion B2B clair, rassurant et administrable.

### Comportement attendu

- Présenter clairement la promesse de valeur.
- Permettre une navigation par secteur métier.
- Mettre en avant bénéfices, preuves, cas d’usage, FAQ et CTA.
- Générer une prise de contact ou une demande de démo qualifiée.

### Cas d’usage

- En tant que prospect, je veux comprendre en moins de 30 secondes ce que fait DigiLab.
- En tant que décideur, je veux voir des cas concrets liés à mon secteur.
- En tant que visiteur mobile, je veux contacter rapidement l’équipe sans friction.

## 4.2 Authentification

### Décision produit

Pas d’inscription publique utilisateur dans le MVP site. Authentification réservée à l’espace administrateur.

### Description

Le système d’authentification doit permettre l’accès sécurisé au back-office par les équipes ESDLAB.

### Comportement attendu

- Connexion par email/mot de passe sécurisé ou magic link.
- Réinitialisation du mot de passe.
- Déconnexion.
- Sessions sécurisées avec expiration.
- Journalisation minimale des connexions.

### Cas d’usage

- En tant qu’administrateur, je veux me connecter au CMS pour modifier les pages.
- En tant que commercial, je veux accéder à la liste des leads.
- En tant qu’utilisateur autorisé, je veux réinitialiser mon mot de passe si je l’ai oublié.

## 4.3 Gestion utilisateur

### Description

Gestion des comptes internes avec rôles et permissions.

### Comportement attendu

- Création, activation, désactivation d’utilisateurs.
- Rôles minimum : Admin, Éditeur, Commercial.
- Limitation des accès selon rôle.
- Historique basique des actions sensibles.

### Cas d’usage

- En tant qu’admin, je veux créer un compte commercial.
- En tant qu’éditeur, je veux modifier les contenus sans accéder aux paramètres critiques.
- En tant que commercial, je veux voir les leads sans éditer la structure du site.

## 4.4 Produits / services

### Description

Le site doit gérer des offres structurées par secteur, cas d’usage, bénéfices, preuves et CTA.

### Comportement attendu

- Gestion dynamique des secteurs depuis le CMS.
- Ajout/modification des textes, visuels, FAQs, CTA et SEO.
- Possibilité d’ajouter études de cas et témoignages.
- Publication brouillon / publié.

### Cas d’usage

- En tant qu’éditeur, je veux mettre à jour la page Banques & Assurances.
- En tant que prospect, je veux filtrer mentalement l’offre selon mon secteur.
- En tant que commercial, je veux pouvoir envoyer une URL ciblée par secteur.

## 4.5 Panier / commande

### Décision produit

Non applicable au MVP du site corporate.

### Description

Le funnel commercial remplace le panier : demande de démo, demande de devis, prise de rendez-vous.

### Comportement attendu

- CTA primaire orienté démo.
- CTA secondaire orienté devis ou WhatsApp.
- Envoi des informations au CRM / back-office.

### Cas d’usage

- En tant que prospect, je veux demander une démo au lieu d’acheter en ligne.

### Extension future

Si DigiLab évolue vers une offre self-service SaaS, un tunnel commande / abonnement pourra être ajouté en phase 3.

## 4.6 Paiement

### Décision produit

Hors MVP 30 jours pour le site corporate.

### Description

Le paiement n’est pas requis pour la mise en ligne initiale. Si une monétisation en ligne est introduite plus tard, elle devra concerner un acompte, une réservation premium ou un abonnement logiciel.

### Comportement attendu futur

- Support cartes bancaires et mobile money.
- Factures et reçus.
- Statut de paiement synchronisé côté admin.

### Cas d’usage futur

- En tant que client, je veux régler un acompte pour lancer un projet.
- En tant qu’admin, je veux voir les paiements validés.

### Recommandation technique future

- CinetPay ou PayDunya pour l’Afrique francophone.
- Stripe en complément si besoin international.

## 4.7 Notifications email / WhatsApp

### Description

Le système doit notifier l’équipe commerciale et rassurer le prospect immédiatement.

### Comportement attendu

- Email interne à l’équipe lors d’une nouvelle demande.
- Email automatique au prospect avec accusé de réception.
- Notification WhatsApp interne ou fallback click-to-chat pour réactivité commerciale.
- Gestion de templates de messages.

### Cas d’usage

- En tant que commercial, je reçois instantanément un lead entrant.
- En tant que prospect, je reçois une confirmation de prise en compte.
- En tant que responsable commercial, je veux recevoir les leads prioritaires sur WhatsApp.

## 4.8 Dashboard admin

### Description

Le back-office doit offrir une vue simple et actionnable de l’activité marketing et commerciale.

### Comportement attendu

- Tableau de bord synthétique : nouveaux leads, leads qualifiés, conversion, pages les plus performantes.
- Liste des leads avec filtres.
- Fiche lead détaillée.
- Changement de statut, attribution, notes internes.
- Vue contenus publiés / brouillons.

### Cas d’usage

- En tant que commercial, je veux qualifier un lead et lui attribuer un statut.
- En tant qu’admin, je veux voir si une page convertit moins qu’une autre.
- En tant que dirigeant, je veux suivre les demandes de démo du mois.

## 4.9 Gestion contenu (CMS)

### Description

Le CMS doit permettre à une équipe non technique de maintenir le site sans toucher au code.

### Comportement attendu

- Édition des pages clés.
- Gestion des blocs : hero, preuves, FAQs, CTA, témoignages, études de cas.
- Gestion des médias.
- Prévisualisation avant publication.
- Champs SEO par page.
- Pages légales éditables.

### Cas d’usage

- En tant qu’éditeur, je veux modifier une accroche sans redéployer le code.
- En tant qu’admin, je veux publier une étude de cas.
- En tant que responsable marketing, je veux gérer les métadonnées SEO.

## 4.10 API

### Description

Une couche API est requise pour le formulaire, les leads, le CMS et les intégrations.

### Comportement attendu

- API sécurisée pour création de leads.
- Webhooks pour outils tiers.
- Endpoints internes pour dashboard et contenus si nécessaire.
- Validation stricte des payloads.

### Cas d’usage

- En tant que formulaire public, je crée un lead.
- En tant que Calendly ou HubSpot, je synchronise un événement.
- En tant qu’admin, je consulte la donnée via le dashboard.

---

## 5. Parcours Utilisateur

## 5.1 Parcours principal : visiteur froid vers démo

### Flow

Visite page d’accueil -> compréhension de la promesse -> consultation secteur -> consultation preuves / FAQ -> clic CTA -> formulaire -> confirmation -> prise de contact commerciale

### Frictions actuelles

- Peu de preuves tangibles.
- Pas de rendez-vous immédiat.
- Formulaire trop générique.
- Pas de page de remerciement dédiée.

### Correction recommandée

- Ajouter cas clients, chiffres, captures produit.
- Ajouter calendrier de démo ou lien WhatsApp.
- Ajouter champs de qualification métier.

## 5.2 Parcours campagne sectorielle

### Flow

Landing secteur -> bénéfices métier -> exemples d’usage -> CTA démo -> lead

### Frictions actuelles

- Les pages secteur sont descriptives mais peu démonstratives.
- Pas d’éléments de réassurance suffisants.

### Correction recommandée

- Ajouter témoignages, ROI, objections/réponses, preuve d’implémentation.

## 5.3 Parcours mobile rapide

### Flow

Arrivée mobile -> lecture courte -> CTA sticky -> contact / WhatsApp -> confirmation

### Frictions actuelles

- Pas de CTA fixe mobile.
- Pas de priorité claire entre démo, appel et WhatsApp.

### Correction recommandée

- Ajouter barre d’action mobile persistante.

## 5.4 Parcours interne commercial

### Flow

Réception notification -> ouverture dashboard -> qualification -> prise de note -> changement de statut -> relance / démo

### Frictions actuelles

- Aucun stockage lead ni vue commerciale.

### Correction recommandée

- Créer un mini CRM interne orienté leads entrants.

---

## 6. UX/UI à Finaliser

### 6.1 Écrans manquants

- Page confidentialité.
- Page cookies.
- Page merci après formulaire.
- Écran 404 personnalisé.
- Espace login admin.
- Dashboard leads.
- Éditeur de contenus.
- Bibliothèque média.

### 6.2 Améliorations design

- Ajouter de vraies preuves commerciales : logos clients, chiffres, témoignages.
- Ajouter captures produit ou maquettes réelles.
- Clarifier le message principal au-dessus de la ligne de flottaison.
- Uniformiser le niveau de langage entre pages.
- Réduire la part décorative au profit d’éléments de preuve.

### 6.3 Mobile vs desktop

#### Mobile

- Hero plus court.
- CTA principal visible sans scroll.
- CTA fixe téléphone / WhatsApp / démo.
- Formulaire simplifié.

#### Desktop

- Renforcer storytelling, comparatifs et preuves.
- Mieux exploiter la largeur pour cas d’usage et études de cas.

### 6.4 Expérience utilisateur optimale

- 1 message fort par écran.
- 1 CTA primaire dominant.
- 1 chemin court vers conversion.
- 1 niveau de preuve par bloc.
- 1 confirmation claire après action.

---

## 7. Architecture Technique Recommandée

## 7.1 Stack conseillée

### Recommandation principale

- Frontend : Next.js App Router + TypeScript + Tailwind CSS.
- CMS / Admin : Payload CMS intégré au projet Next.js.
- Base de données : PostgreSQL managé.
- ORM : Prisma si hors Payload natif, sinon modèle Payload/Postgres.
- Auth : Auth.js ou auth native Payload pour les utilisateurs internes.
- Emails : Resend.
- Stockage médias : S3 compatible ou Supabase Storage.
- Analytics : GA4 + Search Console + Microsoft Clarity.
- Monitoring : Sentry.

### Justification

Cette architecture respecte l’existant, limite la dette de réécriture, accélère la livraison et permet de couvrir en un seul socle le site, le CMS, l’admin et les leads.

## 7.2 Structure backend recommandée

- Route handlers / server actions pour les actions simples.
- Collections CMS pour pages, services, FAQ, études de cas, médias, paramètres globaux.
- Collection leads.
- Collection users.
- Collection legal pages.
- Webhooks pour intégrations externes.

## 7.3 Structure base de données recommandée

### Table users

- id
- email
- password_hash ou provider
- role
- status
- last_login_at
- created_at

### Table leads

- id
- source
- campaign
- sector
- company
- name
- email
- phone
- message
- need_type
- urgency
- budget_range
- lead_status
- assigned_to
- created_at

### Table lead_notes

- id
- lead_id
- author_id
- note
- created_at

### Table pages

- id
- slug
- title
- body
- seo_title
- seo_description
- status
- updated_at

### Table service_pages

- id
- slug
- sector
- headline
- value_proposition
- benefits
- faq
- cta
- status

### Table media

- id
- url
- alt
- type
- size
- created_at

### Table site_settings

- id
- company_legal_name
- address
- phones
- emails
- social_links
- tracking_ids

## 7.4 API et intégrations

### APIs internes

- POST /api/contact
- GET /api/admin/leads
- PATCH /api/admin/leads/:id
- GET /api/admin/dashboard
- Webhooks calendly / crm / whatsapp si activés

### Intégrations recommandées

- Resend pour email.
- HubSpot ou Brevo pour CRM léger.
- Calendly ou Cal.com pour réservation de démo.
- WhatsApp Business via 360dialog, Twilio ou fallback click-to-chat.
- GA4 et Clarity pour mesure.

---

## 8. Sécurité et Bonnes Pratiques

### 8.1 Authentification sécurisée

- Auth réservée aux utilisateurs internes.
- Hash de mot de passe robuste ou magic link.
- MFA recommandé pour les admins.
- Sessions expirables.

### 8.2 Protection des données

- Validation stricte des entrées.
- Sanitization côté serveur.
- Chiffrement des secrets et variables d’environnement.
- Politique de conservation des leads.
- Consentement et information utilisateur conformes.

### 8.3 Sécurité formulaire

- Honeypot conservé.
- Ajout rate limiting IP.
- Ajout Cloudflare Turnstile ou hCaptcha.
- Logs anti-abus.

### 8.4 Paiement sécurisé

- Hors MVP.
- Si activé : PSP certifié, webhooks signés, aucun stockage de carte.

### 8.5 Gestion des erreurs

- Pages d’erreur propres.
- Logging structuré.
- Alerting sur route contact et admin.
- Monitoring front et back.

### 8.6 Gouvernance technique

- Environnements dev / staging / prod séparés.
- Déploiement CI/CD.
- Sauvegardes base de données.
- Revue de code obligatoire.

---

## 9. Données et Tracking

## 9.1 KPIs à suivre

- Sessions par source.
- Taux de conversion visite -> lead.
- Taux de conversion lead -> démo.
- Taux de conversion démo -> opportunité.
- Temps de réponse commerciale.
- CTR des CTA principaux.
- Performance par page secteur.
- Scroll depth sur page d’accueil et pages secteur.

## 9.2 Outils recommandés

- Google Analytics 4.
- Google Search Console.
- Microsoft Clarity.
- Google Tag Manager.
- Meta Pixel et LinkedIn Insight Tag si acquisition payante.
- Sentry pour incidents.

## 9.3 Événements à tracker

- page_view
- view_home
- view_sector_page
- click_primary_cta
- click_whatsapp
- click_phone
- click_email
- submit_contact_start
- submit_contact_success
- submit_contact_error
- book_demo_click
- book_demo_success
- admin_login
- lead_status_updated

---

## 10. Roadmap de Finalisation

## Phase 1 : MVP 30 jours

### Objectif

Mettre en ligne un site corporate finalisé, crédible, mesurable et pilotable.

### Priorités critiques

- 🔴 Corriger les incohérences de routes, pages manquantes et liens cassés.
- 🔴 Finaliser mentions légales, confidentialité, cookies et identité juridique réelle.
- 🔴 Ajouter stockage des leads en base.
- 🔴 Ajouter back-office admin minimal avec auth.
- 🔴 Ajouter tracking analytics.
- 🔴 Ajouter confirmation prospect et notifications internes.
- 🔴 Ajouter prise de rendez-vous ou CTA WhatsApp structuré.

### Priorités importantes

- 🟠 Ajouter CMS éditorial.
- 🟠 Ajouter études de cas et preuves sociales.
- 🟠 Requalifier le formulaire.
- 🟠 Ajouter dashboard leads.
- 🟠 Ajouter monitoring et alerting.

### Priorités optionnelles

- 🟢 Ajouter blog.
- 🟢 Ajouter multi-langue EN.
- 🟢 Ajouter scoring IA simple des leads.

## Phase 2 : Améliorations

- 🟠 CRM avancé et automatisations.
- 🟠 Nurturing email.
- 🟠 Case studies enrichies.
- 🟠 Landing pages par campagne.
- 🟠 A/B tests sur CTA et hero.
- 🟠 Intégration WhatsApp Business avancée.

## Phase 3 : Scaling

- 🟢 Portail client ou self-service.
- 🟢 Paiement en ligne.
- 🟢 Multi-pays / multi-langues.
- 🟢 Extension vers la plateforme SaaS DigiLab complète.

## Planning recommandé sur 30 jours

### Semaine 1

- Audit final contenu / SEO / légal.
- Arbitrage périmètre.
- Mise à plat du modèle de données.
- Cadrage CMS/admin.

### Semaine 2

- Implémentation auth admin.
- Implémentation base leads.
- Implémentation CMS.
- Correction routes et pages manquantes.

### Semaine 3

- Dashboard leads.
- Notifications email / WhatsApp.
- Tracking analytics.
- Refonte finale du funnel contact.

### Semaine 4

- QA responsive.
- Performance.
- SEO final.
- recette métier.
- mise en production.

---

## 11. Automatisation et IA

### 11.1 Suggestions IA à forte valeur

- Scoring automatique des leads entrants selon secteur, urgence et qualité du message.
- Résumé automatique des demandes pour les commerciaux.
- Génération assistée de brouillons d’études de cas et de pages secteur.
- Assistant interne pour proposer la meilleure réponse commerciale.

### 11.2 Automatisation marketing

- Email de confirmation instantané.
- Relance automatique si aucun traitement sous X heures.
- Création automatique de fiche CRM à chaque lead.
- Notification Slack / WhatsApp pour leads prioritaires.

### 11.3 Automatisation support / exploitation

- Alertes si le formulaire tombe en erreur.
- Alertes si une page critique n’est plus indexable.
- Rapport hebdomadaire automatique sur trafic et conversions.

### 11.4 Gains de productivité attendus

- Réduction du temps de qualification commerciale.
- Réduction du délai de publication contenu.
- Réduction de la dépendance à l’équipe technique pour les mises à jour courantes.

---

## 12. Cahier des Charges Final Structuré et Exploitable

## 12.1 Périmètre confirmé à livrer

Le livrable à 30 jours doit comprendre :

- site public finalisé ;
- contenus stabilisés ;
- pages légales complètes ;
- tracking opérationnel ;
- funnel de conversion optimisé ;
- stockage et suivi des leads ;
- espace admin sécurisé ;
- CMS pour autonomie éditoriale.

## 12.2 Hors périmètre MVP

Ne pas inclure dans les 30 jours sauf arbitrage explicite :

- player écrans ;
- cockpit temps réel complet ;
- connecteurs ERP/GPAO ;
- réservation de salles tactile ;
- paiement en ligne ;
- espace client self-service.

## 12.3 Dépendances critiques

- Informations juridiques officielles ESDLAB.
- Contenus finaux validés.
- Choix CRM.
- Choix outil de booking.
- Choix canal WhatsApp.
- Validation des références clients publiables.

## 12.4 Definition of Done

Le projet est considéré comme terminé lorsque :

- toutes les pages publiques sont cohérentes et sans placeholders ;
- toutes les routes publiques et SEO sont correctes ;
- le formulaire crée un lead en base, notifie l’équipe et confirme au prospect ;
- le back-office permet de consulter et gérer les leads ;
- les contenus clés sont administrables sans code ;
- les pages légales sont complètes ;
- les KPIs sont traçables ;
- la QA responsive desktop/mobile est validée ;
- la production est monitorée.

## 12.5 Recommandation finale CTO

La meilleure décision pour livrer vite et bien n’est pas d’étendre ce dépôt vers tout le produit DigiLab. La bonne décision est de verrouiller d’abord un site corporate performant et administrable, connecté à un mini back-office commercial. Ce socle servira ensuite d’interface d’acquisition et de base éditoriale pour la future plateforme SaaS.

En d’autres termes :

- MVP 30 jours = machine de conversion B2B.
- Phase suivante = machine de pilotage marketing/commercial.
- Phase long terme = machine produit SaaS complète.

---

## Annexe A. Audit factuel du dépôt actuel

- Frontend Next.js 14 avec App Router.
- UI marketing déjà avancée.
- Une seule API métier : contact.
- Aucune persistance de leads.
- Aucune authentification.
- Aucune page confidentialité.
- Aucune page cookies.
- Sitemap incohérent avec les routes réelles.
- Mentions légales non exploitables en production.
- Build production validé après restauration des dépendances.

## Annexe B. Priorisation finale simple

### À faire maintenant

- Funnel de conversion.
- Légal.
- CMS.
- Leads.
- Dashboard.
- Tracking.

### À faire ensuite

- CRM avancé.
- Automatisation.
- Case studies.
- Landing pages.

### À ne pas mélanger au MVP

- Produit SaaS DigiLab complet.
- Paiement en ligne.
- Espace client.