import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/getSettings";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ESDLab Technologies",
  description:
    "Politique de confidentialité et de protection des données personnelles d'ESDLab Technologies, conformément au RGPD.",
  robots: { index: false },
};

export default async function ConfidentialitePage() {
  const lastUpdate = "26 avril 2026";

  const [dbPage, settings] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "confidentialite" } }),
    getSettings(),
  ]);

  const email   = settings["contact.email"]   || "contact@esdlab.pro";
  const phone   = settings["contact.phone"]   || "+225 07 79 56 52 26";
  const address = settings["contact.address"] || "Treichville, Abidjan, Côte d'Ivoire";

  if (dbPage?.content) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl font-semibold text-slate-900 mb-4">
            {dbPage.title || "Politique de confidentialité"}
          </h1>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: dbPage.content }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-slate-900 mb-4">
          Politique de confidentialité
        </h1>
        <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : {lastUpdate}</p>

        <div className="prose prose-lg max-w-none space-y-10">

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              1. Responsable du traitement
            </h2>
            <p className="text-slate-600">
              Le responsable du traitement de vos données personnelles est :
            </p>
            <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-5 text-slate-700 text-sm leading-7">
              <strong>Electronic System Development, Lab. (ESDLAB)</strong><br />
              {address}<br />
              Email : <a href={`mailto:${email}`} className="text-primary-600 hover:underline">{email}</a><br />
              Téléphone : {phone}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              2. Données collectées
            </h2>
            <p className="text-slate-600 mb-4">
              Lorsque vous utilisez notre formulaire de contact, nous collectons les données suivantes :
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse e-mail professionnelle</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Nom de votre entreprise et secteur d&apos;activité</li>
              <li>Taille de votre organisation</li>
              <li>Nature de votre besoin</li>
              <li>Contenu de votre message</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Nous collectons également des données de navigation anonymisées via Google Analytics
              (pages visitées, durée de visite, source du trafic) à des fins statistiques.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              3. Finalités du traitement
            </h2>
            <p className="text-slate-600 mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Répondre à votre demande de contact ou de démonstration</li>
              <li>Vous transmettre une proposition commerciale adaptée</li>
              <li>Assurer le suivi de la relation commerciale</li>
              <li>Améliorer nos services et notre site web</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              4. Base légale
            </h2>
            <p className="text-slate-600">
              Le traitement de vos données repose sur votre <strong>consentement explicite</strong> (formulaire
              de contact) et sur l&apos;intérêt légitime de ESDLAB à répondre aux demandes professionnelles
              entrantes et à conduire des actions commerciales B2B.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              5. Durée de conservation
            </h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Données de contact et de prospects : <strong>3 ans</strong> à compter du dernier contact</li>
              <li>Données clients actifs : durée du contrat + <strong>5 ans</strong> après la fin de la relation</li>
              <li>Données de navigation : <strong>13 mois</strong> (conformément aux recommandations CNIL)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              6. Destinataires des données
            </h2>
            <p className="text-slate-600 mb-4">
              Vos données sont traitées par ESDLAB et ses sous-traitants techniques dans le cadre
              de la fourniture de nos services :
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Vercel Inc.</strong> — hébergement du site (San Francisco, États-Unis)</li>
              <li><strong>Resend</strong> — envoi d&apos;e-mails transactionnels</li>
              <li><strong>Google LLC</strong> — analytics via Google Analytics 4 (États-Unis)</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Les transferts hors Union Européenne sont encadrés par les garanties appropriées
              (clauses contractuelles types de la Commission européenne).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              7. Vos droits
            </h2>
            <p className="text-slate-600 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la limitation</strong> : restreindre temporairement un traitement</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer à un traitement basé sur l&apos;intérêt légitime</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
                {email}
              </a>
              . Nous répondrons dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              8. Cookies
            </h2>
            <p className="text-slate-600">
              Pour en savoir plus sur notre utilisation des cookies, consultez notre{" "}
              <Link href="/cookies" className="text-primary-600 hover:underline">
                politique des cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              9. Contact
            </h2>
            <p className="text-slate-600">
              Pour toute question relative à la présente politique ou à la protection de vos données,
              contactez-nous à{" "}
              <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
                {email}
              </a>
              .
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500 flex flex-wrap gap-4">
          <Link href="/mentions-legales" className="hover:text-primary-600 transition-colors">
            Mentions légales
          </Link>
          <Link href="/cookies" className="hover:text-primary-600 transition-colors">
            Politique des cookies
          </Link>
          <Link href="/contact" className="hover:text-primary-600 transition-colors">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
