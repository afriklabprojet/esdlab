# Plan d’Exécution 30 Jours

## Projet

ESDLAB DigiLab Corporate

## Date

26 avril 2026

## Référence

Ce plan complète le cahier des charges de finalisation et le transforme en feuille de route de delivery opérationnelle sur 30 jours.

---

## 0. Objectif de Livraison

Livrer sous 30 jours un site corporate B2B finalisé, cohérent, administrable et orienté conversion, avec :

- funnel de contact qualifié ;
- stockage des leads en base ;
- espace admin sécurisé ;
- CMS éditorial léger ;
- conformité légale minimale ;
- tracking analytics ;
- monitoring et recette de production.

Le plan n’inclut pas le produit SaaS DigiLab complet. Il couvre uniquement le site corporate et son mini back-office marketing / commercial.

---

## 1. Hypothèses de Delivery

## 1.1 Hypothèses d’équipe

Équipe minimale recommandée :

- 1 Product Owner / Chef de projet à temps partiel.
- 1 Tech Lead Fullstack.
- 1 Développeur Frontend / Fullstack.
- 1 QA / recette à temps partiel.
- 1 Référent contenu / marketing côté métier.

## 1.2 Hypothèses techniques

- Socle conservé : Next.js App Router + TypeScript + Tailwind.
- Base recommandée : PostgreSQL.
- Admin / CMS recommandé : Payload CMS intégré à Next.js.
- Notifications email : Resend.
- Tracking : GA4 + Tag Manager + Clarity.
- Monitoring : Sentry.

## 1.3 Hypothèses de gouvernance

- Arbitrages fonctionnels rendus sous 24 heures.
- Contenus métier fournis au fil de l’eau, au plus tard avant la fin du Sprint 2.
- Données juridiques officielles disponibles avant la fin du Sprint 1.

---

## 2. Périmètre Confirmé

## 2.1 Dans le périmètre des 30 jours

- Finalisation des pages publiques.
- Correction SEO et liens cassés.
- Pages légales obligatoires.
- Formulaire de contact qualifié.
- Page de confirmation et prise de rendez-vous.
- Base leads.
- Dashboard leads.
- Authentification admin.
- CMS de contenus marketing.
- Tracking et monitoring.
- QA responsive et mise en production.

## 2.2 Hors périmètre

- Player écran.
- Cockpit temps réel DigiLab.
- Connecteurs ERP / GPAO.
- Paiement en ligne.
- Espace client self-service.
- Automatisation IA avancée.

---

## 3. Critères de Succès

- Build production stable et reproductible.
- Zéro lien cassé sur le site public.
- Tous les formulaires enregistrent les leads en base.
- Tous les leads sont visibles et actionnables dans le back-office.
- Les pages clés sont modifiables sans déploiement manuel.
- Les pages légales sont complètes et cohérentes.
- Les événements analytics critiques remontent correctement.
- Recette mobile et desktop validée.

---

## 4. Gouvernance de Sprint

## 4.1 Cadence

- Sprint 0 : J1 à J2.
- Sprint 1 : J3 à J9.
- Sprint 2 : J10 à J16.
- Sprint 3 : J17 à J23.
- Sprint 4 : J24 à J30.

## 4.2 Rituels recommandés

- Daily delivery de 15 minutes.
- Revue backlog 2 fois par semaine.
- Démo intermédiaire en fin de Sprint 2.
- Go / No Go en J28.

## 4.3 Livrables attendus par sprint

- Fin Sprint 0 : backlog verrouillé, architecture validée, environnement prêt.
- Fin Sprint 1 : socle légal / SEO / funnel prioritaire prêt.
- Fin Sprint 2 : leads et admin minimum disponibles.
- Fin Sprint 3 : CMS, tracking et notifications finalisés.
- Fin Sprint 4 : QA, hardening, recette, production.

---

## 5. Plan par Sprint

## 5.1 Sprint 0 : Cadrage et Setup

### Objectif

Supprimer les ambiguïtés de périmètre et préparer un chantier exécutable sans blocage technique.

### Résultats attendus

- stack et architecture validées ;
- backlog priorisé ;
- modèle de données validé ;
- environnements prêts ;
- dépendances installées et build vérifié.

### Stories Sprint 0

| ID | Sujet | Priorité | Estimation | Dépendance | Done |
|---|---|---|---:|---|---|
| S0-01 | Valider périmètre MVP | Critique | 0,5 j | Aucune | périmètre signé |
| S0-02 | Choisir CMS et stratégie admin | Critique | 0,5 j | S0-01 | décision technique actée |
| S0-03 | Valider modèle leads et rôles | Critique | 0,5 j | S0-01 | schéma validé |
| S0-04 | Restaurer environnement et build | Critique | 0,5 j | Aucune | build OK |
| S0-05 | Définir backlog sprintable | Critique | 0,5 j | S0-01 à S0-04 | backlog priorisé |

## 5.2 Sprint 1 : Stabilisation publique et conversion

### Objectif

Rendre le site public crédible, cohérent et juridiquement exploitable, tout en sécurisant le chemin critique vers la conversion.

### Résultats attendus

- pages publiques cohérentes ;
- pages légales présentes ;
- liens cassés supprimés ;
- funnel de contact clarifié ;
- CTA de démo plus direct.

### Stories Sprint 1

| ID | Sujet | Priorité | Estimation | Dépendance | Done |
|---|---|---|---:|---|---|
| S1-01 | Corriger sitemap et routes SEO | Critique | 0,5 j | S0-04 | sitemap cohérent |
| S1-02 | Créer page confidentialité | Critique | 0,5 j | contenu légal | page publiée |
| S1-03 | Créer page cookies | Critique | 0,5 j | contenu légal | page publiée |
| S1-04 | Refaire mentions légales réelles | Critique | 1 j | données juridiques | page validée |
| S1-05 | Ajouter page merci après formulaire | Important | 0,5 j | S1-06 | page active |
| S1-06 | Requalifier formulaire de contact | Critique | 1 j | S0-03 | champs qualifiants actifs |
| S1-07 | Ajouter CTA mobile persistant | Important | 0,5 j | design | CTA visible mobile |
| S1-08 | Ajouter module booking ou fallback WhatsApp | Critique | 1 j | arbitrage métier | CTA conversion actif |
| S1-09 | Ajouter 404 personnalisée | Important | 0,5 j | Aucune | page 404 active |
| S1-10 | QA responsive publique v1 | Critique | 1 j | S1-01 à S1-09 | anomalies critiques corrigées |

## 5.3 Sprint 2 : Leads et Back-office minimal

### Objectif

Créer la couche métier minimale qui transforme le site en outil commercial exploitable.

### Résultats attendus

- leads persistés en base ;
- auth admin fonctionnelle ;
- back-office minimum disponible ;
- cycle de vie lead actionnable.

### Stories Sprint 2

| ID | Sujet | Priorité | Estimation | Dépendance | Done |
|---|---|---|---:|---|---|
| S2-01 | Provisionner PostgreSQL | Critique | 0,5 j | S0-02 | DB disponible |
| S2-02 | Implémenter schéma leads / users / notes | Critique | 1 j | S2-01 | tables créées |
| S2-03 | Brancher formulaire sur la base leads | Critique | 1 j | S2-02 | lead créé en DB |
| S2-04 | Ajouter auth admin | Critique | 1,5 j | S2-02 | login fonctionnel |
| S2-05 | Créer dashboard leads liste | Critique | 1,5 j | S2-03, S2-04 | liste active |
| S2-06 | Créer fiche lead détail | Critique | 1 j | S2-05 | fiche consultable |
| S2-07 | Ajouter statuts et notes internes | Important | 1 j | S2-06 | workflow commercial utilisable |
| S2-08 | Ajouter attribution lead | Important | 0,5 j | S2-07 | lead assignable |
| S2-09 | Sécuriser accès et rôles | Critique | 0,5 j | S2-04 | permissions appliquées |
| S2-10 | Recette métier du back-office | Critique | 1 j | S2-01 à S2-09 | flux validé |

## 5.4 Sprint 3 : CMS, notifications et tracking

### Objectif

Rendre l’outil autonome pour les équipes marketing et pilotable pour les équipes commerciales.

### Résultats attendus

- contenus éditables sans code ;
- notifications enrichies ;
- analytics en place ;
- monitoring des erreurs actif.

### Stories Sprint 3

| ID | Sujet | Priorité | Estimation | Dépendance | Done |
|---|---|---|---:|---|---|
| S3-01 | Intégrer CMS retenu | Critique | 1,5 j | S0-02, S2-01 | admin CMS disponible |
| S3-02 | Modéliser pages marketing | Critique | 1 j | S3-01 | collections créées |
| S3-03 | Modéliser secteurs / FAQ / cas client | Important | 1 j | S3-01 | contenus éditables |
| S3-04 | Ajouter bibliothèque média | Important | 0,5 j | S3-01 | uploads actifs |
| S3-05 | Brancher pages publiques au CMS | Critique | 1,5 j | S3-02 à S3-04 | front alimenté dynamiquement |
| S3-06 | Ajouter email de confirmation prospect | Critique | 0,5 j | S2-03 | email reçu côté prospect |
| S3-07 | Ajouter notification interne enrichie | Critique | 0,5 j | S2-03 | email interne enrichi |
| S3-08 | Ajouter GA4 + Tag Manager + événements | Critique | 1 j | S1-06 | événements visibles |
| S3-09 | Ajouter Clarity | Important | 0,5 j | Aucune | session replay actif |
| S3-10 | Ajouter Sentry front / back | Important | 0,5 j | Aucune | erreurs remontées |

## 5.5 Sprint 4 : Hardening et Mise en Production

### Objectif

Passer du produit fonctionnel au produit livrable et maintenable.

### Résultats attendus

- qualité mobile / desktop validée ;
- performance acceptable ;
- checklist de production fermée ;
- documentation de reprise disponible.

### Stories Sprint 4

| ID | Sujet | Priorité | Estimation | Dépendance | Done |
|---|---|---|---:|---|---|
| S4-01 | Audit accessibilité et corrections | Critique | 1 j | S3-05 | blocants AA levés |
| S4-02 | Audit performance et optimisation | Critique | 1 j | S3-05 | objectifs Lighthouse atteints ou plan de correction clos |
| S4-03 | QA responsive complète | Critique | 1 j | S3-05 | recette multi-breakpoints validée |
| S4-04 | Tests end-to-end du funnel lead | Critique | 1 j | S2-03, S3-06, S3-07 | flux complet validé |
| S4-05 | Vérification SEO on-page finale | Important | 0,5 j | S1-01, S3-05 | checklist SEO validée |
| S4-06 | Mise en place de sauvegarde et runbook | Important | 0,5 j | S2-01, S3-01 | runbook écrit |
| S4-07 | Go / No Go production | Critique | 0,5 j | S4-01 à S4-06 | décision actée |
| S4-08 | Déploiement production | Critique | 0,5 j | S4-07 | production active |
| S4-09 | Smoke test post-prod | Critique | 0,5 j | S4-08 | smoke test validé |
| S4-10 | Handover équipe métier | Important | 0,5 j | S4-09 | passation effectuée |

---

## 6. Backlog Global Priorisé

## 6.1 Priorité critique

Ces items sont obligatoires pour considérer la livraison comme réussie.

| ID | Élément | Sprint | Estimation |
|---|---|---:|---:|
| B-01 | Corriger sitemap et routes SEO | 1 | 0,5 j |
| B-02 | Finaliser mentions légales | 1 | 1 j |
| B-03 | Ajouter confidentialité et cookies | 1 | 1 j |
| B-04 | Requalifier formulaire | 1 | 1 j |
| B-05 | Ajouter page merci et prise de rendez-vous | 1 | 1,5 j |
| B-06 | Créer base leads | 2 | 1,5 j |
| B-07 | Brancher formulaire sur DB | 2 | 1 j |
| B-08 | Ajouter auth admin | 2 | 1,5 j |
| B-09 | Créer dashboard leads | 2 | 2,5 j |
| B-10 | Ajouter CMS et brancher pages | 3 | 4 j |
| B-11 | Ajouter notifications prospect et équipe | 3 | 1 j |
| B-12 | Ajouter analytics critiques | 3 | 1 j |
| B-13 | QA finale et mise en prod | 4 | 5 j |

## 6.2 Priorité importante

| ID | Élément | Sprint | Estimation |
|---|---|---:|---:|
| B-14 | CTA mobile persistant | 1 | 0,5 j |
| B-15 | 404 personnalisée | 1 | 0,5 j |
| B-16 | Statuts, notes et attribution leads | 2 | 2 j |
| B-17 | Bibliothèque média CMS | 3 | 0,5 j |
| B-18 | Clarity | 3 | 0,5 j |
| B-19 | Sentry | 3 | 0,5 j |
| B-20 | Runbook production | 4 | 0,5 j |

## 6.3 Priorité optionnelle

| ID | Élément | Sprint cible | Estimation |
|---|---|---:|---:|
| B-21 | Études de cas enrichies | 3 ou 4 | 1,5 j |
| B-22 | Blog / actualités | Hors MVP | 2 j |
| B-23 | Scoring IA léger des leads | Hors MVP | 1,5 j |
| B-24 | Reporting hebdo automatique | Hors MVP | 1 j |

---

## 7. Chemin Critique

Le chemin critique de livraison est le suivant :

1. Valider périmètre, stack et modèle leads.
2. Corriger le funnel public et les pages légales.
3. Créer la base de données et brancher le formulaire.
4. Activer l’auth admin.
5. Livrer le dashboard leads.
6. Intégrer le CMS et connecter les pages.
7. Ajouter tracking et notifications.
8. Finaliser QA, accessibilité, performance et déploiement.

Tout retard sur les étapes 3 à 6 met directement en risque la livraison à J30.

---

## 8. Dépendances Métier et Techniques

## 8.1 Dépendances métier

- Informations juridiques officielles.
- Choix définitif des CTA de conversion.
- Validation des secteurs et messages finaux.
- Références clients et études de cas.
- Accès aux comptes Resend, Analytics, Vercel et éventuel outil de booking.

## 8.2 Dépendances techniques

- Base PostgreSQL disponible.
- Variables d’environnement complètes.
- Accès aux outils tiers.
- Arbitrage sur Payload ou solution CMS équivalente.

---

## 9. Risques et Plans de Mitigation

| Risque | Impact | Probabilité | Mitigation |
|---|---|---|---|
| Contenus finaux livrés trop tard | Fort | Élevée | utiliser contenus provisoires validés et geler structure avant J10 |
| Flou sur périmètre réel | Fort | Moyen | cadrage signé en Sprint 0 |
| CMS trop ambitieux | Fort | Moyen | limiter aux pages clés et modèles simples |
| Dépendance WhatsApp ou booking non arbitrée | Moyen | Élevée | fallback click-to-chat et formulaire + email |
| Dette sécurité dépendances npm | Moyen | Moyen | plan de mise à jour après mise en ligne ou fenêtre dédiée en Sprint 4 |
| Recette métier tardive | Fort | Moyen | démo intermédiaire fin Sprint 2 |

---

## 10. Plan de Charge Simplifié

Charge indicative hors contenu métier :

- Sprint 0 : 2,5 jours.
- Sprint 1 : 7 jours.
- Sprint 2 : 8 jours.
- Sprint 3 : 8 jours.
- Sprint 4 : 6 jours.

Total indicatif : 31,5 jours de charge brute.

Conclusion :

La tenue du délai à 30 jours est réaliste avec 2 développeurs ou 1 développeur senior très disponible plus 1 renfort ponctuel. Elle devient risquée avec une seule ressource technique si les contenus ou arbitrages métier prennent du retard.

---

## 11. Définition de Terminé par Lot

## 11.1 Lot public

- pages conformes ;
- liens valides ;
- responsive validé ;
- CTA fonctionnels.

## 11.2 Lot commercial

- lead créé en base ;
- notification envoyée ;
- statut modifiable ;
- dashboard exploitable.

## 11.3 Lot éditorial

- contenus gérés sans code ;
- publication et brouillon ;
- médias uploadables ;
- champs SEO éditables.

## 11.4 Lot production

- build OK ;
- monitoring actif ;
- checklist Go Live signée ;
- smoke test post-prod validé.

---

## 12. Recommandation Finale

Le chantier doit être piloté comme une livraison de machine commerciale, pas comme une livraison de produit SaaS complet. La bonne séquence est :

1. Sécuriser la conversion.
2. Structurer l’exploitation commerciale.
3. Donner l’autonomie éditoriale.
4. Stabiliser la production.

Si une réduction de périmètre devient nécessaire en cours de route, l’ordre de coupe recommandé est :

1. Clarity.
2. Études de cas enrichies.
3. Bibliothèque média avancée.
4. CTA WhatsApp avancé.

En revanche, il ne faut pas couper :

1. base leads ;
2. auth admin ;
3. dashboard leads ;
4. pages légales ;
5. tracking minimal ;
6. QA de production.