# Guide de Déploiement ESDLAB DigiLab

Ce guide vous accompagne étape par étape pour déployer le site sur Vercel.

## 📋 Prérequis

Avant de déployer, assurez-vous d'avoir :

- [ ] Un compte [Vercel](https://vercel.com) (gratuit)
- [ ] Un compte [Resend](https://resend.com) (100 emails/jour gratuits)
- [ ] Un dépôt Git (GitHub, GitLab, ou Bitbucket)
- [ ] Le code poussé sur votre repo

## 🔐 Configuration Resend

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer le domaine

**Option A : Domaine de test (pour commencer)**
- Utilisez le domaine par défaut : `onboarding@resend.dev`
- Limite : 100 emails/jour
- Parfait pour développement et tests

**Option B : Votre propre domaine (recommandé pour production)**
1. Allez dans "Domains" dans Resend
2. Cliquez "Add Domain"
3. Entrez votre domaine : `esdlab.com`
4. Suivez les instructions pour configurer les DNS records (SPF, DKIM, DMARC)
5. Attendez la vérification (quelques minutes à quelques heures)

### 3. Obtenir la clé API

1. Allez dans "API Keys" dans Resend
2. Cliquez "Create API Key"
3. Nommez-la : "ESDLAB Production"
4. Donnez les permissions : "Sending access"
5. **Copiez la clé immédiatement** (elle ne sera plus visible)

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via Dashboard Vercel (Le plus simple)

1. **Connecter le repo**
   - Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
   - Cliquez "Add New..." → "Project"
   - Sélectionnez votre repo Git
   - Cliquez "Import"

2. **Configurer le projet**
   - Framework Preset : **Next.js** (détecté automatiquement)
   - Root Directory : `.` (racine)
   - Build Command : `npm run build` (par défaut)
   - Output Directory : `.next` (par défaut)

3. **Ajouter les variables d'environnement**
   Cliquez sur "Environment Variables" et ajoutez :

   ```
   RESEND_API_KEY=re_votre_cle_ici
   RESEND_FROM_EMAIL=noreply@esdlab.com
   RESEND_TO_EMAIL=contact@esdlab.com
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
   ```

   ⚠️ **Important** : 
   - Remplacez `re_votre_cle_ici` par votre vraie clé Resend
   - Si vous utilisez le domaine de test Resend, utilisez `RESEND_FROM_EMAIL=onboarding@resend.dev`
   - `NEXT_PUBLIC_SITE_URL` sera votre URL Vercel (ou domaine personnalisé)

4. **Déployer**
   - Cliquez "Deploy"
   - Attendez 2-3 minutes
   - Votre site est en ligne ! 🎉

### Méthode 2 : Via CLI Vercel

```bash
# Installation du CLI Vercel
npm i -g vercel

# Se connecter
vercel login

# Première fois : Configuration interactive
vercel

# Les fois suivantes : Déploiement rapide
vercel --prod
```

Lors de la première exécution, il vous demandera :
- Setup and deploy? → **Yes**
- Which scope? → Sélectionnez votre compte
- Link to existing project? → **No**
- Project name? → `esdlab-digilab` (ou votre choix)
- Directory? → `.` (racine)
- Override settings? → **No**

Ensuite, ajoutez les variables d'environnement dans le dashboard Vercel.

## 🔧 Post-Déploiement

### 1. Tester le formulaire de contact

1. Allez sur `https://votre-site.vercel.app/contact`
2. Remplissez et envoyez le formulaire
3. Vérifiez que vous recevez l'email sur `RESEND_TO_EMAIL`

**En cas d'erreur** :
- Vérifiez les logs Vercel : Dashboard → Functions → Logs
- Vérifiez Resend Dashboard → Emails pour voir l'envoi
- Erreur commune : domaine non vérifié → utilisez `onboarding@resend.dev`

### 2. Configurer un domaine personnalisé (optionnel)

1. Dashboard Vercel → Votre projet → Settings → Domains
2. Ajoutez votre domaine : `www.esdlab.com` ou `esdlab.com`
3. Suivez les instructions DNS pour pointer vers Vercel
4. Attendez la propagation DNS (quelques minutes)
5. **Important** : Mettez à jour `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement

### 3. Activer Analytics (optionnel mais recommandé)

1. Dashboard Vercel → Votre projet → Analytics → Enable
2. Gratuit jusqu'à 100k événements/mois
3. Voir les Core Web Vitals, Real User Monitoring, etc.

### 4. Configuration SSL

✅ **Automatique** : Vercel fournit automatiquement un certificat SSL gratuit via Let's Encrypt.

Vérifiez : `https://votre-site.vercel.app` doit avoir le cadenas 🔒

## 🔄 Workflow de Déploiement Continu

Une fois configuré, chaque push sur votre branche principale déclenche automatiquement :

1. **Build automatique**
2. **Tests** (si configurés)
3. **Déploiement** en production
4. **Preview deployments** pour chaque PR

### Branches

- `main` ou `master` → Production
- Toutes les autres branches → Preview URLs

## 📊 Monitoring & Maintenance

### 1. Vérifier les logs

```bash
# Via CLI
vercel logs

# Ou dans le dashboard
Dashboard → Projet → Deployments → [Cliquer sur un déploiement] → Functions → Logs
```

### 2. Web Vitals

Dashboard → Analytics → Web Vitals

Objectifs :
- **LCP** (Largest Contentful Paint) < 2.5s ✅
- **FID** (First Input Delay) < 100ms ✅
- **CLS** (Cumulative Layout Shift) < 0.1 ✅

### 3. Resend Dashboard

Surveillez :
- Emails envoyés / quota quotidien
- Taux de délivrabilité
- Emails rejetés (bounces)

## 🐛 Dépannage

### Erreur : "Resend API Key is not set"

**Solution** :
1. Vérifiez que `RESEND_API_KEY` est défini dans les variables d'environnement Vercel
2. Redéployez après avoir ajouté la variable

### Erreur : "Domain not verified"

**Solution** :
- Utilisez `onboarding@resend.dev` pour `RESEND_FROM_EMAIL`
- Ou vérifiez votre domaine dans Resend Dashboard

### Formulaire ne s'envoie pas

**Checklist** :
1. Ouvrez la console navigateur (F12) → Voir les erreurs
2. Vérifiez les logs Vercel (Functions → Logs)
3. Testez l'API directement : `curl -X POST https://votre-site.vercel.app/api/contact -H "Content-Type: application/json" -d '{"formData":{"name":"Test","email":"test@test.com","service":"creation","message":"Message de test"},"submittedAt":1234567890}'`

### Site lent / Performances

1. Lancez Lighthouse (DevTools → Lighthouse → Analyze page load)
2. Optimisez les images : utilisez WebP, redimensionnez
3. Vérifiez le bundle size : `npm run build` → Regarde "First Load JS"

## 🎯 Checklist Finale

Avant de considérer le site production-ready :

- [ ] ✅ Formulaire de contact fonctionne
- [ ] ✅ Tous les emails arrivent correctement
- [ ] ✅ Domaine personnalisé configuré
- [ ] ✅ SSL actif (https://)
- [ ] ✅ Analytics activées
- [ ] ✅ Sitemap accessible : `/sitemap.xml`
- [ ] ✅ Robots.txt accessible : `/robots.txt`
- [ ] ✅ Performance Lighthouse > 90
- [ ] ✅ Toutes les pages se chargent
- [ ] ✅ Design responsive (mobile/tablette/desktop)
- [ ] ✅ Informations légales à jour (mentions-legales)

## 📞 Support

**Vercel** : https://vercel.com/support  
**Resend** : https://resend.com/docs  
**Next.js** : https://nextjs.org/docs

## 🚀 Commandes Utiles

```bash
# Déploiement production
vercel --prod

# Voir les logs en temps réel
vercel logs --follow

# Lister les déploiements
vercel ls

# Rollback vers déploiement précédent
vercel rollback [deployment-url]

# Variables d'environnement
vercel env ls
vercel env add RESEND_API_KEY
vercel env rm RESEND_API_KEY
```

---

**✨ Félicitations !** Votre site ESDLAB DigiLab est maintenant en production. 🎉
