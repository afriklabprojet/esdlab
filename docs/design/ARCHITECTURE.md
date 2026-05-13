# Architecture du Projet ESDLAB

Documentation technique de l'architecture et des patterns utilisés.

## 📐 Architecture Globale

```
┌──────────────────────────────────────────────────────────┐
│                      Frontend (Next.js 14)               │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Pages (App Router)                         │  │
│  │  - Home, Services, About, Contact, Legal, Demo    │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Components                                 │  │
│  │  Layout: Header, Footer                           │  │
│  │  UI: Card, Button, AnimatedSection, Loading       │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Libraries                                  │  │
│  │  - Framer Motion (animations)                     │  │
│  │  - Tailwind CSS (styling)                         │  │
│  │  - Next.js Image (optimization)                   │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    API Layer (Next.js)                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │  /api/contact (Route Handler)                     │  │
│  │  - Validation serveur                             │  │
│  │  - Anti-spam (honeypot + timing)                  │  │
│  │  - Email sending via Resend                       │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────────────┐
│                  External Services                       │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Resend API (resend.com)                          │  │
│  │  - Email delivery                                 │  │
│  │  - 100 emails/day free tier                       │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## 🗂️ Structure des Dossiers

```
esdlab/
├── app/                          # Routes Next.js (App Router)
│   ├── layout.tsx               # Layout racine (Header + Footer)
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Styles globaux + Tailwind
│   ├── sitemap.ts               # Génération dynamique du sitemap
│   ├── robots.ts                # Génération du robots.txt
│   │
│   ├── api/                     # API Routes
│   │   └── contact/
│   │       └── route.ts         # POST /api/contact (formulaire)
│   │
│   ├── services/
│   │   ├── page.tsx            # Liste des services
│   │   └── [slug]/
│   │       └── page.tsx        # Détail service dynamique
│   │
│   ├── a-propos/
│   │   └── page.tsx            # Page À propos
│   │
│   ├── contact/
│   │   └── page.tsx            # Page Contact avec formulaire
│   │
│   ├── demo/
│   │   └── page.tsx            # Démo composants UI
│   │
│   └── mentions-legales/
│       └── page.tsx            # Page légale
│
├── components/                   # Composants React
│   ├── layout/
│   │   ├── Header.tsx          # Navigation responsive
│   │   └── Footer.tsx          # Pied de page
│   │
│   └── ui/                      # Composants UI réutilisables
│       ├── Card.tsx            # Carte avec variants (default, hover3d, glass, gradient)
│       ├── Button.tsx          # Bouton avec variants (primary, secondary, outline, ghost, danger)
│       ├── AnimatedSection.tsx # Wrapper animations au scroll
│       ├── Loading.tsx         # Spinners, dots, skeleton, progress bar
│       └── index.ts            # Exports barrel
│
├── lib/
│   └── animations.ts           # Variants Framer Motion réutilisables
│
├── public/
│   └── images/                 # Assets statiques (logos, photos)
│
├── .env.local                  # Variables d'environnement (NE PAS COMMIT)
├── .env.local.example         # Template des variables
├── .eslintrc.json             # Configuration ESLint
├── .gitignore                 # Fichiers à ignorer
├── next.config.mjs            # Configuration Next.js
├── package.json               # Dépendances
├── tailwind.config.ts         # Configuration Tailwind CSS
├── tsconfig.json              # Configuration TypeScript
├── vercel.json                # Configuration Vercel
│
├── README.md                  # Documentation principale
├── QUICKSTART.md              # Guide de démarrage rapide
├── DEPLOYMENT.md              # Guide de déploiement
└── ARCHITECTURE.md            # Ce fichier
```

## 🧩 Patterns & Principes

### 1. Composants React

**Convention de nommage** :
- PascalCase pour les composants
- camelCase pour les fonctions/hooks
- kebab-case pour les fichiers CSS

**Structure type d'un composant** :
```tsx
"use client"; // Si besoin (hooks, événements)

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
  variant?: "default" | "custom";
  className?: string;
}

export default function Component({
  children,
  variant = "default",
  className = "",
}: ComponentProps) {
  return (
    <motion.div className={`base-classes ${className}`}>
      {children}
    </motion.div>
  );
}
```

### 2. Animations avec Framer Motion

**Patterns utilisés** :
```tsx
// 1. Variants réutilisables (lib/animations.ts)
import { fadeIn, slideUp } from "@/lib/animations";

// 2. Animation au scroll avec useInView
import { motion, useInView } from "framer-motion";
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

// 3. Stagger children
<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeIn}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 3. Styling avec Tailwind

**Approche** :
- Utility-first (classes Tailwind directement dans JSX)
- Classes conditionnelles avec template literals
- Variables CSS pour couleurs personnalisées
- Configuration centralisée dans `tailwind.config.ts`

**Design Tokens** :
```tsx
// tailwind.config.ts
colors: {
  primary: {
    50: '#eff6ff',
    600: '#2563eb',
    // ...
  }
}

// Usage
<div className="bg-primary-600 text-white" />
```

### 4. API Routes (Backend)

**Pattern utilisé** :
```tsx
// app/api/[endpoint]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 1. Validation
    if (!isValid(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid data' },
        { status: 400 }
      );
    }
    
    // 2. Business logic
    const result = await processData(body);
    
    // 3. Response
    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
```

### 5. Protection Anti-Spam

**Techniques implémentées** :
```tsx
// 1. Honeypot field (champ caché)
<input
  type="text"
  name="website"
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
/>

// 2. Time-based validation
const [pageLoadTime] = useState(Date.now());
// Rejeter si < 3 secondes entre chargement et soumission

// 3. Server-side validation
// Valider tous les champs côté serveur également
```

### 6. SEO Optimization

**Stratégies appliquées** :
```tsx
// 1. Metadata dans layout.tsx
export const metadata: Metadata = {
  title: "ESDLAB DigiLab",
  description: "...",
  openGraph: { ... },
};

// 2. Sitemap dynamique (app/sitemap.ts)
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}

// 3. Robots.txt (app/robots.ts)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

## 🔒 Sécurité

### Headers de Sécurité (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Variables d'Environnement

- ✅ Jamais commiter `.env.local`
- ✅ Utiliser `NEXT_PUBLIC_` pour variables côté client
- ✅ Ne jamais exposer les API keys côté client
- ✅ Valider toutes les entrées utilisateur

## 📊 Performance

### Optimisations Implémentées

**Images** :
```tsx
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy" // Lazy loading automatique
/>
```

**Fonts** :
```tsx
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Évite FOIT
  variable: "--font-inter",
});
```

**Code Splitting** :
- Automatique avec Next.js App Router
- Chaque page charge uniquement son JS nécessaire

**Bundle Sizes** :
- First Load JS: ~87 kB (shared)
- Pages individuelles: 2-5 kB

## 🔄 Data Flow

### Formulaire de Contact

```
┌──────────────┐
│   User       │
│  Fills Form  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  Client-Side Validation  │
│  - Required fields       │
│  - Email format          │
│  - Min length            │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  POST /api/contact       │
│  {                       │
│    formData: {...},      │
│    submittedAt: 123456   │
│  }                       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Server-Side Validation  │
│  - Anti-spam checks      │
│  - Data validation       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Resend API              │
│  - Format HTML email     │
│  - Send email            │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Response to Client      │
│  { success: true }       │
└──────────────────────────┘
```

## 🧪 Testing Strategy

### Approche Recommandée

```bash
# Unit tests (composants UI)
- Vitest + Testing Library

# E2E tests (parcours utilisateur)
- Playwright

# Visual regression
- Chromatic ou Percy
```

### Test du Formulaire

```tsx
// Exemple avec Testing Library
test('submit contact form', async () => {
  render(<ContactPage />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.click(screen.getByText('Send'));
  
  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## 🚀 Déploiement

### CI/CD avec Vercel

1. **Push vers GitHub** → Déclenche build
2. **Build Next.js** → Génère pages statiques/dynamiques
3. **Deploy to Edge** → Réplication mondiale (CDN)
4. **Preview URLs** → Chaque PR = URL de preview

### Environnements

- **Development** : localhost:3000
- **Preview** : `[branch]-[projet].vercel.app`
- **Production** : `[projet].vercel.app` ou domaine custom

## 📚 Ressources

### Documentation Officielle

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Resend](https://resend.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Outils de Développement

- [VS Code](https://code.visualstudio.com/) + Extensions :
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

---

**Dernière mise à jour** : Avril 2026
