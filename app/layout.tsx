import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import PublicChrome from "@/components/layout/PublicChrome";
import { getSettings } from "@/lib/getSettings";
import prisma from "@/lib/prisma";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title =
    s["site.seo_title"] ||
    "ESDLAB Technologies — Affichage dynamique Full Web";
  const description =
    s["site.seo_description"] ||
    "Solution d'affichage dynamique Full Web pensée pour les hôtels, banques, industries et institutions en Afrique de l'Ouest.";
  const ogDescription =
    s["site.seo_og_description"] ||
    "Pilotez vos écrans, harmonisez votre communication et gagnez en impact avec une solution Full Web sobre et premium.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "affichage dynamique",
      "digital signage",
      "communication d'entreprise",
      "ESDLAB",
      "DigiLab Corporate",
    ],
    authors: [{ name: s["site.name"] || "ESDLAB" }],
    icons: {
      icon: "/images/ESDL.png",
      apple: "/images/ESDL.png",
      shortcut: "/images/ESDL.png",
    },
    openGraph: {
      title,
      description: ogDescription,
      type: "website",
      locale: "fr_FR",
      images: ["/images/Esdlab-P1_Plan de travail 1.jpg"],
    },
  };
}

function JsonLd({ settings }: { settings: Record<string, string> }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esdlab.com";
  const name = settings["site.name"] || "ESDLAB Technologies";
  const phone = settings["contact.phone"] || "+225 07 79 56 52 26";
  const email = settings["contact.email"] || "contact@esdlab.pro";
  const address = settings["contact.address"] || "Treichville, Abidjan, Côte d'Ivoire";
  const logo = settings["site.logo"] || "/images/ESDL.png";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${siteUrl}/#organization`,
        name,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: logo.startsWith("http") ? logo : `${siteUrl}${logo}` },
        image: `${siteUrl}/images/Esdlab-P1_Plan de travail 1.jpg`,
        description: settings["site.seo_description"] || "Solutions d'affichage dynamique Full Web pour les entreprises, banques, hôtels et institutions d'Afrique de l'Ouest.",
        telephone: phone,
        email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressLocality: "Abidjan",
          addressCountry: "CI",
        },
        areaServed: ["CI", "SN", "ML", "BF", "TG", "BJ"],
        priceRange: "$$",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "fr-FR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services] = await Promise.all([
    getSettings(),
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, title: true, order: true },
      orderBy: { order: "asc" },
    }),
  ]);
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Analytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <JsonLd settings={settings} />
        <PublicChrome settings={settings} services={services}>{children}</PublicChrome>
      </body>
    </html>
  );
}
