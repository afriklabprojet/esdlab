# 🚀 Démarrage Rapide

Guide ultra-rapide en 5 minutes pour avoir le site fonctionnel.

## Étape 1 : Installation (30 secondes)

```bash
npm install
```

## Étape 2 : Configuration Resend (2 minutes)

### Option A : Test Immédiat (RECOMMANDÉ pour commencer)

1. Allez sur https://resend.com
2. Créez un compte gratuit (email + mot de passe)
3. Une fois connecté, allez dans "API Keys"
4. Cliquez "Create API Key"
5. Copiez la clé (commence par `re_`)

### Option B : Plus tard

Vous pouvez lancer le site sans Resend immédiatement, mais le formulaire de contact ne fonctionnera pas.

## Étape 3 : Configurer le .env.local (1 minute)

Éditez le fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=re_COLLEZ_VOTRE_CLE_ICI
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=votre-email@example.com
```

⚠️ **Important** : Remplacez `votre-email@example.com` par votre vrai email où vous voulez recevoir les messages.

## Étape 4 : Lancer le site (10 secondes)

```bash
npm run dev
```

Le site est accessible sur : http://localhost:3000

## Étape 5 : Tester (1 minute)

1. Ouvrez http://localhost:3000
2. Naviguez sur les pages
3. Allez sur `/contact`
4. Remplissez et envoyez le formulaire
5. Vérifiez votre boîte mail (l'email avec `RESEND_TO_EMAIL`)

✅ **Ça marche ?** Félicitations, le site est opérationnel !

## 🎯 Pages Disponibles

- `/` - Page d'accueil
- `/services` - Liste des services
- `/services/creation` - Détail service Création
- `/services/planification` - Détail service Planification
- `/services/diffusion` - Détail service Diffusion
- `/a-propos` - À propos
- `/contact` - **Formulaire de contact fonctionnel**
- `/demo` - **Page de démo des composants UI**
- `/mentions-legales` - Mentions légales

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Build + Démarrer en production
npm run build && npm start

# Vérifier TypeScript
npm run type-check

# Linter
npm run lint
```

## ❓ Problèmes Courants

### "Cannot find module 'resend'"

```bash
npm install resend
```

### Formulaire ne s'envoie pas

1. Vérifiez votre clé API Resend dans `.env.local`
2. Vérifiez que `RESEND_TO_EMAIL` est un email valide
3. Regardez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez les logs du terminal où tourne `npm run dev`

### "Failed to compile"

```bash
# Supprimer et réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

## 📚 Prochaines Étapes

Une fois que tout fonctionne en local :

1. 📖 Lire [README.md](./README.md) pour la vue d'ensemble
2. 🚀 Lire [DEPLOYMENT.md](./DEPLOYMENT.md) pour déployer sur Vercel
3. 🎨 Personnaliser les couleurs dans `tailwind.config.ts`
4. ✏️ Modifier le contenu des pages
5. 📧 Configurer votre domaine Resend (production)

## 🆘 Besoin d'Aide ?

- 📖 Documentation complète : [README.md](./README.md)
- 🚀 Guide de déploiement : [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💬 Resend Docs : https://resend.com/docs
- 🔧 Next.js Docs : https://nextjs.org/docs

---

**✨ Bonne découverte !**
