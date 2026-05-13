import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demandez une démo | ESDLab Technologies",
  description:
    "Contactez l'équipe ESDLab Technologies pour une démo personnalisée de notre solution d'affichage dynamique Full Web. Réponse sous 24h ouvrées.",
  keywords: [
    "contact ESDLab Technologies",
    "demande démo affichage dynamique",
    "ESDLAB contact",
    "digital signage Abidjan",
    "devis affichage dynamique Côte d'Ivoire",
  ],
  openGraph: {
    title: "Réservez votre démo DigiLab Corporate | ESDLab Technologies",
    description:
      "Décrivez votre projet, notre équipe vous répond sous 24h avec une proposition sur mesure.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
