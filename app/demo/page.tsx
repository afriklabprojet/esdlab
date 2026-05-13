"use client";

import Image from "next/image";
import { 
  Card, 
  Button, 
  IconButton, 
  AnimatedSection, 
  AnimatedChild,
  AnimatedText,
  LoadingSpinner,
  LoadingDots,
  Skeleton,
  ProgressBar 
} from "@/components/ui";
import { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(45);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <h1 className="font-display text-5xl font-bold text-center mb-4">
              <AnimatedText text="Composants UI" />
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Démonstration des composants réutilisables avec animations et variants
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cards Section */}
      <AnimatedSection className="py-20 bg-white" stagger staggerDelay={0.1}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedChild animation="slideUp">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">
              Composant Card
            </h2>
          </AnimatedChild>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatedChild animation="slideUp">
              <Card variant="default">
                <Card.Header>
                  <Card.Title>Card Défaut</Card.Title>
                  <Card.Description>
                    Une carte simple avec bordure et ombre
                  </Card.Description>
                </Card.Header>
                <p className="text-gray-600 mb-4">
                  Parfait pour du contenu standard, avec un style épuré et professionnel.
                </p>
                <Card.Footer>
                  <Button size="sm" variant="outline">En savoir plus</Button>
                </Card.Footer>
              </Card>
            </AnimatedChild>

            <AnimatedChild animation="slideUp">
              <Card variant="hover3d" interactive>
                <Card.Header>
                  <Card.Title>Card 3D Hover</Card.Title>
                  <Card.Description>
                    Effet 3D au survol de la souris
                  </Card.Description>
                </Card.Header>
                <p className="text-gray-600 mb-4">
                  Passez votre souris dessus pour voir l'effet de transformation 3D.
                </p>
                <Card.Footer>
                  <Button size="sm" variant="primary">Essayer</Button>
                </Card.Footer>
              </Card>
            </AnimatedChild>

            <AnimatedChild animation="slideUp">
              <Card variant="glass">
                <Card.Header>
                  <Card.Title>Card Glass</Card.Title>
                  <Card.Description>
                    Effet verre dépoli moderne
                  </Card.Description>
                </Card.Header>
                <p className="text-gray-600 mb-4">
                  Backdrop blur pour un effet glassmorphism élégant.
                </p>
                <Card.Footer>
                  <Button size="sm" variant="secondary">Découvrir</Button>
                </Card.Footer>
              </Card>
            </AnimatedChild>
          </div>

          {/* Buttons Section */}
          <AnimatedChild animation="slideUp">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">
              Composant Button
            </h2>
          </AnimatedChild>

          <AnimatedChild animation="slideUp">
            <Card>
              <Card.Header>
                <Card.Title>Variants de Boutons</Card.Title>
              </Card.Header>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Variants</h3>
                  <Button.Group className="flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </Button.Group>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Tailles</h3>
                  <Button.Group className="flex-wrap items-center">
                    <Button size="sm" variant="primary">Small</Button>
                    <Button size="md" variant="primary">Medium</Button>
                    <Button size="lg" variant="primary">Large</Button>
                    <Button size="xl" variant="primary">Extra Large</Button>
                  </Button.Group>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Avec Icônes</h3>
                  <Button.Group className="flex-wrap">
                    <Button 
                      variant="primary"
                      leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      }
                    >
                      Ajouter
                    </Button>
                    <Button 
                      variant="outline"
                      rightIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      }
                    >
                      Continuer
                    </Button>
                  </Button.Group>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">États</h3>
                  <Button.Group className="flex-wrap">
                    <Button variant="primary" onClick={handleLoadingDemo}>Tester Loading</Button>
                    <Button variant="primary" loading={loading}>Loading...</Button>
                    <Button variant="primary" disabled>Désactivé</Button>
                  </Button.Group>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Icon Buttons</h3>
                  <Button.Group>
                    <IconButton variant="primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </IconButton>
                    <IconButton variant="outline">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </IconButton>
                    <IconButton variant="ghost">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </IconButton>
                  </Button.Group>
                </div>
              </div>
            </Card>
          </AnimatedChild>

          {/* Loading States */}
          <AnimatedSection animation="slideUp" className="mt-12">
            <Card>
              <Card.Header>
                <Card.Title>Loading States</Card.Title>
              </Card.Header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Spinners</h3>
                  <div className="flex items-center gap-6">
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="md" />
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="xl" color="secondary" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Dots</h3>
                  <div className="flex items-center gap-6">
                    <LoadingDots size="sm" />
                    <LoadingDots size="md" color="secondary" />
                    <LoadingDots size="lg" color="primary" />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Progress Bar</h3>
                  <ProgressBar progress={progress} showLabel />
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                    <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Skeleton Loaders</h3>
                  <div className="space-y-3">
                    <Skeleton variant="text" count={3} />
                    <Skeleton variant="rect" height={100} />
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection animation="scale" className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Prêt à utiliser ces composants ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tous les composants sont prêts à l'emploi dans votre projet
          </p>
          <Button.Group className="justify-center">
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Voir le code
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Documentation
            </Button>
          </Button.Group>
        </div>
      </AnimatedSection>
    </div>
  );
}
