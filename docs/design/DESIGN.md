# 🎨 Plan de Conception - ESDLAB DigiLab

Document de référence pour le design system et les principes visuels du site web.

---

## 📋 Table des Matières

1. [Vision & Principes](#-vision--principes)
2. [Palette de Couleurs](#-palette-de-couleurs)
3. [Typographie](#-typographie)
4. [Espacements & Grille](#-espacements--grille)
5. [Composants UI](#-composants-ui)
6. [Animations & Micro-interactions](#-animations--micro-interactions)
7. [Iconographie](#-iconographie)
8. [Responsive Design](#-responsive-design)
9. [Accessibilité](#-accessibilité)
10. [Maquettes des Pages](#-maquettes-des-pages)

---

## 🎯 Vision & Principes

### Vision Globale
Site web moderne, élégant et professionnel incarnant l'innovation digitale. L'identité visuelle reflète l'expertise technique d'ESDLAB tout en restant accessible et engageante.

### Principes de Design

#### 1. **Clarté**
- Hiérarchie visuelle forte
- Espaces blancs généreux
- Navigation intuitive
- Information progressive

#### 2. **Élégance**
- Animations subtiles et fluides
- Transitions douces
- Palette de couleurs raffinée
- Typographie soignée

#### 3. **Performance**
- Chargement rapide (< 2s)
- Animations 60 FPS
- Images optimisées
- Code léger

#### 4. **Cohérence**
- Design system strict
- Composants réutilisables
- Patterns uniformes
- Expérience prévisible

---

## 🎨 Palette de Couleurs

### Couleurs Primaires

#### Bleu Principal (Primary)
```css
/* Identité de marque - Innovation, Technologie, Confiance */
--primary-50:  #eff6ff;  /* Backgrounds légers */
--primary-100: #dbeafe;  /* Hover subtils */
--primary-200: #bfdbfe;  /* Borders light */
--primary-300: #93c5fd;  /* Accent light */
--primary-400: #60a5fa;  /* Interactive secondaire */
--primary-500: #3b82f6;  /* ★ Couleur principale */
--primary-600: #2563eb;  /* Hover / Active */
--primary-700: #1d4ed8;  /* Pressed states */
--primary-800: #1e40af;  /* Dark mode accent */
--primary-900: #1e3a8a;  /* Textes sombres */
```

**Utilisation** :
- ✅ CTA principaux (boutons, liens)
- ✅ Navigation active
- ✅ Accents interactifs
- ✅ Icônes principales

#### Violet Secondaire (Secondary)
```css
/* Créativité, Innovation, Premium */
--secondary-50:  #faf5ff;
--secondary-100: #f3e8ff;
--secondary-200: #e9d5ff;
--secondary-300: #d8b4fe;
--secondary-400: #c084fc;
--secondary-500: #a855f7;  /* ★ Couleur secondaire */
--secondary-600: #9333ea;  /* Hover */
--secondary-700: #7e22ce;
--secondary-800: #6b21a8;
--secondary-900: #581c87;
```

**Utilisation** :
- ✅ Accents graphiques
- ✅ Gradients
- ✅ Badges premium
- ✅ Hover effects spéciaux

### Couleurs Neutres

#### Gris (Gray)
```css
/* Textes, backgrounds, UI elements */
--gray-50:  #f9fafb;  /* Background ultra-léger */
--gray-100: #f3f4f6;  /* Background cards */
--gray-200: #e5e7eb;  /* Borders */
--gray-300: #d1d5db;  /* Disabled states */
--gray-400: #9ca3af;  /* Placeholders */
--gray-500: #6b7280;  /* Secondary text */
--gray-600: #4b5563;  /* Body text */
--gray-700: #374151;  /* Headings */
--gray-800: #1f2937;  /* Dark headings */
--gray-900: #111827;  /* ★ Texte principal */
```

### Couleurs Sémantiques

#### Succès (Success)
```css
--success-50:  #f0fdf4;
--success-500: #22c55e;  /* ★ Messages de succès */
--success-600: #16a34a;  /* Hover */
```

#### Erreur (Error)
```css
--error-50:  #fef2f2;
--error-500: #ef4444;  /* ★ Messages d'erreur */
--error-600: #dc2626;  /* Hover */
```

#### Avertissement (Warning)
```css
--warning-50:  #fffbeb;
--warning-500: #f59e0b;  /* ★ Alertes */
--warning-600: #d97706;
```

#### Info
```css
--info-50:  #eff6ff;
--info-500: #3b82f6;  /* ★ Informations */
--info-600: #2563eb;
```

### Gradients Signature

#### Gradient Principal (Hero sections)
```css
background: linear-gradient(
  135deg,
  #3b82f6 0%,    /* Primary-500 */
  #a855f7 100%   /* Secondary-500 */
);
```

#### Gradient Subtil (Backgrounds)
```css
background: linear-gradient(
  180deg,
  #f9fafb 0%,    /* Gray-50 */
  #ffffff 100%
);
```

#### Gradient Glass (Cards premium)
```css
background: linear-gradient(
  135deg,
  rgba(59, 130, 246, 0.05) 0%,
  rgba(168, 85, 247, 0.05) 100%
);
backdrop-filter: blur(10px);
```

---

## ✍️ Typographie

### Familles de Polices

#### Police Principale (Corps)
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```
- **Usage** : Paragraphes, labels, UI text
- **Caractéristiques** : Lisible, moderne, optimisée écrans
- **Poids disponibles** : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

#### Police Titres (Display)
```css
font-family: 'Poppins', 'Inter', sans-serif;
```
- **Usage** : H1, H2, H3, CTA, Navigation
- **Caractéristiques** : Géométrique, impactante, premium
- **Poids disponibles** : 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Échelle Typographique

#### Desktop (≥ 1024px)

```css
/* Titres */
.h1 {
  font-family: 'Poppins';
  font-size: 4rem;        /* 64px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.h2 {
  font-family: 'Poppins';
  font-size: 3rem;        /* 48px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.h3 {
  font-family: 'Poppins';
  font-size: 2.25rem;     /* 36px */
  font-weight: 600;
  line-height: 1.3;
}

.h4 {
  font-family: 'Poppins';
  font-size: 1.5rem;      /* 24px */
  font-weight: 600;
  line-height: 1.4;
}

/* Corps de texte */
.body-large {
  font-family: 'Inter';
  font-size: 1.125rem;    /* 18px */
  font-weight: 400;
  line-height: 1.7;
}

.body {
  font-family: 'Inter';
  font-size: 1rem;        /* 16px */
  font-weight: 400;
  line-height: 1.6;
}

.body-small {
  font-family: 'Inter';
  font-size: 0.875rem;    /* 14px */
  font-weight: 400;
  line-height: 1.5;
}

/* UI Elements */
.button-text {
  font-family: 'Inter';
  font-size: 1rem;        /* 16px */
  font-weight: 600;
  letter-spacing: 0.01em;
}

.caption {
  font-family: 'Inter';
  font-size: 0.75rem;     /* 12px */
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.02em;
}
```

#### Mobile (< 768px)

```css
.h1-mobile {
  font-size: 2.5rem;      /* 40px */
  font-weight: 800;
  line-height: 1.15;
}

.h2-mobile {
  font-size: 2rem;        /* 32px */
  font-weight: 700;
  line-height: 1.2;
}

.h3-mobile {
  font-size: 1.5rem;      /* 24px */
  font-weight: 600;
  line-height: 1.3;
}
```

### Hiérarchie & Contraste

| Élément | Couleur | Poids | Utilisation |
|---------|---------|-------|-------------|
| **Titres principaux** | Gray-900 | 700-800 | H1, H2 |
| **Sous-titres** | Gray-800 | 600-700 | H3, H4 |
| **Corps de texte** | Gray-600 | 400 | Paragraphes |
| **Texte secondaire** | Gray-500 | 400 | Descriptions, labels |
| **Texte désactivé** | Gray-400 | 400 | Disabled states |
| **Liens** | Primary-600 | 500 | Hover: Primary-700 |
| **CTA** | White | 600 | Sur backgrounds colorés |

---

## 📏 Espacements & Grille

### Système d'Espacement (8pt Grid)

```css
/* Base: 4px (0.25rem) */
--space-1:  0.25rem;   /* 4px  */
--space-2:  0.5rem;    /* 8px  */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Marges Recommandées

| Contexte | Desktop | Mobile |
|----------|---------|--------|
| **Entre sections** | 6rem (96px) | 3rem (48px) |
| **Entre blocs** | 3rem (48px) | 2rem (32px) |
| **Entre éléments** | 1.5rem (24px) | 1rem (16px) |
| **Padding container** | 2rem (32px) | 1rem (16px) |
| **Padding card** | 2rem (32px) | 1.5rem (24px) |

### Grille & Breakpoints

#### Breakpoints
```css
/* Mobile First Approach */
sm:  640px   /* Small devices */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

#### Container
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}
```

#### Colonnes
```css
/* 12-column grid system */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* Layouts courants */
.layout-2col { grid-template-columns: repeat(2, 1fr); }
.layout-3col { grid-template-columns: repeat(3, 1fr); }
.layout-4col { grid-template-columns: repeat(4, 1fr); }
```

---

## 🧩 Composants UI

### 1. Boutons (Buttons)

#### Variants

##### Primary (CTA Principal)
```tsx
// Style
background: primary-600
color: white
padding: 0.75rem 1.5rem
border-radius: 0.5rem
font-weight: 600
transition: all 0.2s

// Hover
background: primary-700
transform: translateY(-2px)
box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3)

// Active
transform: translateY(0)
```

##### Secondary
```tsx
background: secondary-600
color: white
// Mêmes propriétés que Primary
```

##### Outline
```tsx
background: transparent
border: 2px solid primary-600
color: primary-600

// Hover
background: primary-50
```

##### Ghost
```tsx
background: transparent
color: gray-700

// Hover
background: gray-100
```

##### Danger
```tsx
background: error-500
color: white

// Hover
background: error-600
```

#### Tailles
```css
/* Small */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Medium (Default) */
.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Large */
.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Extra Large */
.btn-xl {
  padding: 1.25rem 2.5rem;
  font-size: 1.25rem;
}
```

#### États
- **Default** : État normal
- **Hover** : Transform Y -2px + ombre
- **Active** : Transform Y 0
- **Loading** : Spinner + opacité 0.7
- **Disabled** : Opacité 0.5 + cursor not-allowed

---

### 2. Cards

#### Variants

##### Default
```tsx
background: white
border: 1px solid gray-200
border-radius: 1rem
padding: 2rem
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

// Hover
border-color: primary-200
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1)
```

##### Hover 3D
```tsx
// Effet de perspective au survol
transform-style: preserve-3d
transition: transform 0.3s

// Hover
transform: rotateX(5deg) rotateY(5deg) scale(1.05)
```

##### Glass (Glassmorphism)
```tsx
background: rgba(255, 255, 255, 0.1)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.2)
```

##### Gradient
```tsx
background: linear-gradient(135deg, primary-500, secondary-500)
color: white
border: none
```

#### Structure
```tsx
<Card variant="default">
  <Card.Header>
    {/* Icône ou image */}
  </Card.Header>
  <Card.Title>
    {/* Titre H3 */}
  </Card.Title>
  <Card.Description>
    {/* Texte descriptif */}
  </Card.Description>
  <Card.Footer>
    {/* CTA ou metadata */}
  </Card.Footer>
</Card>
```

---

### 3. Formulaires

#### Input Fields
```tsx
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid gray-300;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.input:focus {
  border-color: primary-500;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:disabled {
  background: gray-100;
  cursor: not-allowed;
}

.input.error {
  border-color: error-500;
}
```

#### Select
```tsx
// Même style que input avec icône chevron
appearance: none;
background-image: url("chevron-down.svg");
background-position: right 1rem center;
background-repeat: no-repeat;
```

#### Textarea
```tsx
// Même style que input
resize: vertical;
min-height: 150px;
```

#### Checkbox & Radio
```tsx
.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid gray-300;
  border-radius: 0.25rem;
}

.checkbox:checked {
  background: primary-600;
  border-color: primary-600;
}
```

---

### 4. Navigation

#### Header Desktop
```tsx
height: 80px
background: white
backdrop-filter: blur(10px)
position: sticky
top: 0
z-index: 50

// Scroll: background semi-transparent
background: rgba(255, 255, 255, 0.9)
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)
```

#### Header Mobile
```tsx
height: 64px
burger-menu: right
transition: 300ms ease

// Menu ouvert
position: fixed
width: 100%
height: 100vh
background: white
```

#### Nav Links
```tsx
.nav-link {
  color: gray-700;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-link:hover {
  color: primary-600;
  background: primary-50;
}

.nav-link.active {
  color: primary-600;
  background: primary-100;
}
```

---

### 5. Loading States

#### Spinner
```tsx
// Cercle tournant
width: 40px;
height: 40px;
border: 4px solid gray-200;
border-top-color: primary-600;
border-radius: 50%;
animation: spin 0.8s linear infinite;

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Dots
```tsx
// 3 points bondissants
display: flex;
gap: 0.5rem;

.dot {
  width: 0.5rem;
  height: 0.5rem;
  background: primary-600;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
```

#### Skeleton
```tsx
// Placeholder animé
background: linear-gradient(
  90deg,
  gray-200 25%,
  gray-300 50%,
  gray-200 75%
);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Progress Bar
```tsx
.progress {
  width: 100%;
  height: 0.5rem;
  background: gray-200;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: primary-600;
  transition: width 0.3s ease;
}
```

---

## 🎬 Animations & Micro-interactions

### Principes d'Animation

1. **Subtilité** : Animations discrètes, jamais distrayantes
2. **Performance** : 60 FPS minimum, GPU-accelerated
3. **Consistance** : Mêmes durées et easings
4. **Signification** : Chaque animation a un but

### Durées Standards

```css
--duration-instant: 100ms;   /* Hover immédiat */
--duration-fast:    200ms;   /* Transitions rapides */
--duration-normal:  300ms;   /* Par défaut */
--duration-slow:    500ms;   /* Animations complexes */
--duration-slower:  800ms;   /* Entrées de sections */
```

### Easing Functions

```css
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animations par Type

#### Fade In (Apparition)
```tsx
variants={{
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}}
```

#### Slide Up (Montée)
```tsx
variants={{
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}}
```

#### Scale (Zoom)
```tsx
variants={{
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  }
}}
```

#### Stagger Children (Cascade)
```tsx
// Parent
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}}

// Enfants héritent des variants
```

### Micro-interactions

#### Bouton Hover
```tsx
whileHover={{ 
  scale: 1.05,
  y: -2,
  transition: { duration: 0.2 }
}}

whileTap={{ 
  scale: 0.98
}}
```

#### Card Hover
```tsx
whileHover={{
  y: -8,
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 }
}}
```

#### Icon Rotation
```tsx
// Rotation au hover
whileHover={{ rotate: 90 }}
transition={{ duration: 0.2 }}
```

#### Text Reveal (Lettre par lettre)
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};
```

---

## 🎯 Iconographie

### Famille d'Icônes
**Heroicons** (outline & solid) - Cohérence avec Tailwind CSS

### Styles
- **Outline** : Interfaces, navigation, actions secondaires
- **Solid** : CTA, états actifs, notifications

### Tailles
```css
.icon-sm { width: 1rem; height: 1rem; }      /* 16px */
.icon-md { width: 1.25rem; height: 1.25rem; } /* 20px */
.icon-lg { width: 1.5rem; height: 1.5rem; }   /* 24px */
.icon-xl { width: 2rem; height: 2rem; }       /* 32px */
```

### Couleurs
- **Primary** : Actions principales (primary-600)
- **Secondary** : Informations complémentaires (gray-500)
- **Success** : Validations (success-500)
- **Error** : Erreurs (error-500)
- **Inherit** : Hérite de la couleur du texte parent

---

## 📱 Responsive Design

### Approche Mobile-First

#### Philosophie
1. Design pour mobile d'abord
2. Enrichir progressivement pour desktop
3. Performance sur petits écrans prioritaire
4. Touch-friendly (44x44px minimum)

### Breakpoints & Layouts

#### Mobile (< 768px)
```tsx
- Navigation: Burger menu
- Grid: 1 colonne
- Font sizes: Réduits de 20-30%
- Spacing: Marges compactes
- Images: 100% width
- Cards: Empilées verticalement
```

#### Tablet (768px - 1024px)
```tsx
- Navigation: Horizontal avec icônes
- Grid: 2 colonnes
- Font sizes: Intermédiaires
- Spacing: Standard
- Images: 50% ou 100% selon context
- Cards: 2 par ligne
```

#### Desktop (≥ 1024px)
```tsx
- Navigation: Full horizontal
- Grid: 3-4 colonnes
- Font sizes: Pleins
- Spacing: Généreux
- Images: Tailles optimales
- Cards: 3-4 par ligne
```

### Patterns Responsifs

#### Stack → Grid
```tsx
// Mobile: Stack vertical
<div className="flex flex-col gap-6">

// Desktop: Grid 3 colonnes
<div className="md:grid md:grid-cols-3 md:gap-8">
```

#### Show/Hide
```tsx
// Mobile uniquement
<div className="block md:hidden">

// Desktop uniquement
<div className="hidden md:block">
```

#### Fluid Typography
```tsx
// Technique clamp()
font-size: clamp(1.5rem, 4vw, 3rem);
```

---

## ♿ Accessibilité

### Standards WCAG 2.1 AA

#### Contraste de Couleurs
```
Minimum requis:
- Texte normal: 4.5:1
- Texte large (18px+): 3:1
- UI components: 3:1

Notre implémentation:
✅ Gray-900 sur blanc: 16.2:1
✅ Primary-600 sur blanc: 4.8:1
✅ Secondary-600 sur blanc: 4.2:1
```

#### Navigation Clavier
```tsx
// Focus visible
.focus-visible {
  outline: 2px solid primary-600;
  outline-offset: 2px;
}

// Skip to content
<a href="#main" className="sr-only focus:not-sr-only">
  Aller au contenu principal
</a>

// Tab order logique
tabIndex={0} // Focusable
tabIndex={-1} // Non-focusable
```

#### ARIA Labels
```tsx
// Boutons sans texte
<button aria-label="Fermer le menu">
  <XIcon />
</button>

// Liens externes
<a href="..." target="_blank" rel="noopener noreferrer" 
   aria-label="Ouvrir dans un nouvel onglet">

// États
<button aria-expanded={isOpen} aria-controls="menu-id">

// Loading
<div role="status" aria-live="polite">
  Chargement en cours...
</div>
```

#### Sémantique HTML
```tsx
✅ <header>, <nav>, <main>, <section>, <article>, <footer>
✅ <h1> → <h6> hiérarchie
✅ <button> pour actions
✅ <a> pour navigation
✅ <form>, <label>, <input> associés
```

---

## 🖼️ Maquettes des Pages

### Page d'Accueil

```
┌─────────────────────────────────────────────────┐
│ [Logo]         Nav Links              [CTA Btn] │
├─────────────────────────────────────────────────┤
│                                                 │
│           ░░ HERO SECTION ░░                   │
│                                                 │
│   Titre H1 (64px, Bold)                        │
│   Sous-titre (18px, Regular)                   │
│   [CTA Primary]  [CTA Secondary]               │
│                                                 │
│              [Hero Image]                       │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│     ═══ NOS SERVICES ═══                       │
│                                                 │
│   [Card 1]    [Card 2]    [Card 3]            │
│   Création    Planif.     Diffusion           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│     ═══ STATISTIQUES ═══                       │
│                                                 │
│   [Stat 1]    [Stat 2]    [Stat 3]            │
│   +500 Proj   15 Ans      98% Sat.            │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│     ═══ CALL TO ACTION ═══                     │
│                                                 │
│   "Prêt à digitaliser votre entreprise?"       │
│           [Contactez-nous]                      │
│                                                 │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ [Logo] Liens   Réseaux   Contact               │
└─────────────────────────────────────────────────┘
```

### Page Services (Liste)

```
┌─────────────────────────────────────────────────┐
│ [Header]                                        │
├─────────────────────────────────────────────────┤
│                                                 │
│   Titre: "Nos Services"                        │
│   Intro paragraph                               │
│                                                 │
├─┬─────────────────────────────────────────────┬─┤
│ │                                             │ │
│ │  ┌───────────────────────────────────┐     │ │
│ │  │ [Image Création]                  │     │ │
│ │  │                                   │     │ │
│ │  │ Création de Contenus              │     │ │
│ │  │ Description...                    │     │ │
│ │  │ • Studios équipés                 │     │ │
│ │  │ • Équipe experte                  │     │ │
│ │  │ [En savoir plus →]                │     │ │
│ │  └───────────────────────────────────┘     │ │
│ │                                             │ │
│ │  ┌───────────────────────────────────┐     │ │
│ │  │ [Image Planification]             │     │ │
│ │  │ ...                               │     │ │
│ │  └───────────────────────────────────┘     │ │
│ │                                             │ │
│ │  ┌───────────────────────────────────┐     │ │
│ │  │ [Image Diffusion]                 │     │ │
│ │  │ ...                               │     │ │
│ │  └───────────────────────────────────┘     │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
├─────────────────────────────────────────────────┤
│ [Footer]                                        │
└─────────────────────────────────────────────────┘
```

### Page Contact

```
┌─────────────────────────────────────────────────┐
│ [Header]                                        │
├─────────────────────────────────────────────────┤
│                                                 │
│   Titre: "Contactez-nous"                      │
│   Sous-titre...                                 │
│                                                 │
├─┬───────────────────────┬───────────────────────┤
│ │                       │                       │
│ │ ┌─────────────────┐   │  ┌─────────────────┐ │
│ │ │ [Form]          │   │  │ Informations    │ │
│ │ │                 │   │  │                 │ │
│ │ │ Nom*            │   │  │ 📧 Email        │ │
│ │ │ [___________]   │   │  │ 📞 Téléphone    │ │
│ │ │                 │   │  │ 📍 Adresse      │ │
│ │ │ Email*          │   │  │                 │ │
│ │ │ [___________]   │   │  │ Horaires:       │ │
│ │ │                 │   │  │ Lun-Ven 9h-18h  │ │
│ │ │ Téléphone*      │   │  │                 │ │
│ │ │ [___________]   │   │  │ [Map Image]     │ │
│ │ │                 │   │  │                 │ │
│ │ │ Service*        │   │  └─────────────────┘ │
│ │ │ [▼ Dropdown ]   │   │                       │
│ │ │                 │   │                       │
│ │ │ Message*        │   │                       │
│ │ │ [___________]   │   │                       │
│ │ │ [___________]   │   │                       │
│ │ │ [___________]   │   │                       │
│ │ │                 │   │                       │
│ │ │ [Envoyer →]     │   │                       │
│ │ │                 │   │                       │
│ │ └─────────────────┘   │                       │
│ │                       │                       │
│ └───────────────────────┴───────────────────────┘
│                                                 │
├─────────────────────────────────────────────────┤
│ [Footer]                                        │
└─────────────────────────────────────────────────┘
```

---

## 📐 Patterns de Composition

### Hero Section Pattern
```tsx
<section className="relative min-h-screen flex items-center">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl">
      <AnimatedSection animation="fade">
        <h1>Titre Impactant</h1>
      </AnimatedSection>
      
      <AnimatedSection animation="slideUp" delay={0.2}>
        <p>Sous-titre descriptif</p>
      </AnimatedSection>
      
      <AnimatedSection animation="slideUp" delay={0.4}>
        <div className="flex gap-4">
          <Button variant="primary">CTA Principal</Button>
          <Button variant="outline">CTA Secondaire</Button>
        </div>
      </AnimatedSection>
    </div>
  </div>
  
  {/* Background gradient */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 to-secondary-50" />
</section>
```

### Services Grid Pattern
```tsx
<section className="py-24">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2>Nos Services</h2>
      <p>Description des services offerts</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <AnimatedSection 
          key={service.id} 
          animation="slideUp" 
          delay={i * 0.1}
        >
          <Card variant="hover3d">
            <Card.Header>
              <Image src={service.image} />
            </Card.Header>
            <Card.Title>{service.title}</Card.Title>
            <Card.Description>{service.description}</Card.Description>
            <Card.Footer>
              <Button variant="ghost">En savoir plus →</Button>
            </Card.Footer>
          </Card>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>
```

### CTA Section Pattern
```tsx
<section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
  <div className="container mx-auto px-4 text-center">
    <AnimatedSection animation="scale">
      <h2 className="text-white mb-6">
        Prêt à digitaliser votre entreprise ?
      </h2>
      <p className="text-white/90 mb-8 max-w-2xl mx-auto">
        Contactez-nous pour discuter de votre projet
      </p>
      <Button 
        variant="secondary" 
        size="lg"
        className="bg-white text-primary-600 hover:bg-gray-100"
      >
        Contactez-nous
      </Button>
    </AnimatedSection>
  </div>
</section>
```

---

## ✅ Checklist Qualité Design

### Avant Déploiement

#### Cohérence Visuelle
- [ ] Toutes les couleurs viennent du design system
- [ ] Typographie cohérente (Inter/Poppins uniquement)
- [ ] Espacements respectent la grille 8pt
- [ ] Aucun pixel-perfect mismatch

#### Responsive
- [ ] Testé sur mobile (375px, 414px)
- [ ] Testé sur tablet (768px, 1024px)
- [ ] Testé sur desktop (1280px, 1920px)
- [ ] Pas de débordement horizontal
- [ ] Images adaptatives

#### Performance
- [ ] Animations à 60 FPS
- [ ] Pas de layout shift (CLS < 0.1)
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Fonts préchargées

#### Accessibilité
- [ ] Contrastes WCAG AA minimum
- [ ] Navigation clavier fonctionnelle
- [ ] ARIA labels présents
- [ ] Focus visible sur tous les interactifs
- [ ] Ordre de tabulation logique

#### Micro-interactions
- [ ] Hover states sur tous les boutons/liens
- [ ] Transitions fluides (200-300ms)
- [ ] Loading states clairs
- [ ] Error states visibles
- [ ] Success feedback immédiat

---

## 📚 Ressources

### Outils de Design
- **Figma** : Maquettes et prototypes
- **Tailwind Play** : Test rapide de styles
- **Coolors** : Palettes de couleurs
- **Type Scale** : Échelles typographiques

### Références
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)

### Inspiration
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)
- [Behance](https://www.behance.net/)

---

**Version** : 1.0.0  
**Dernière mise à jour** : 10 avril 2026  
**Maintenu par** : Équipe ESDLAB DigiLab

Ce document est la référence unique pour tous les aspects visuels du site web ESDLAB. Toute modification doit être documentée ici avant implémentation.
