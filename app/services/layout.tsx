import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions par secteur | ESDLab Technologies",
  description:
    "Découvrez comment DigiLab Corporate s'adapte à votre secteur : industrie, banques, hôtellerie, grande distribution, institutions. Affichage dynamique Full Web en Afrique de l'Ouest.",
  keywords: [
    "affichage dynamique secteurs",
    "digital signage industrie",
    "affichage bancaire Abidjan",
    "digital signage hôtellerie Côte d'Ivoire",
    "ESDLab Technologies secteurs",
  ],
  openGraph: {
    title: "Solutions d'affichage par secteur | DigiLab Corporate",
    description:
      "Industrie, banques, hôtellerie, retail, institutions : DigiLab Corporate adapte l'affichage dynamique à chaque environnement.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
