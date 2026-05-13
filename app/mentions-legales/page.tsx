import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/getSettings";

export const metadata: Metadata = {
  title: "Mentions légales | ESDLab Technologies",
  description: "Mentions légales du site ESDLab Technologies.",
  robots: { index: false },
};

const lastUpdate = "26 avril 2026";

export default async function MentionsLegalesPage() {
  const [dbPage, settings] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "mentions-legales" } }),
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
            {dbPage.title || "Mentions légales"}
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
          Mentions légales
        </h1>
        <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : {lastUpdate}</p>

        <div className="prose prose-lg max-w-none space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              1. Éditeur du site
            </h2>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-slate-700 text-sm leading-7">
              <strong>Electronic System Development, Lab. (ESDLAB)</strong><br />
              Forme juridique : [À compléter — ex. SARL / SAS]<br />
              Numéro d&apos;immatriculation : [À compléter — RCC Abidjan]<br />
              Siège social : {address}<br />
              Email :{" "}
              <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
                {email}
              </a><br />
              Téléphone : {phone}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              2. Directeur de la publication
            </h2>
            <p className="text-slate-600">
              [À compléter — Nom du responsable légal ou dirigeant]<br />
              Email :{" "}
              <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
                {email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              3. Hébergement
            </h2>
            <p className="text-slate-600">
              Ce site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 Pine Street, Suite 1200<br />
              San Francisco, CA 94104, États-Unis<br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                vercel.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              4. Propriété intellectuelle
            </h2>
            <p className="text-slate-600 mb-4">
              L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos, structure)
              sont la propriété exclusive d&apos;ESDLAB ou de leurs auteurs respectifs, et sont
              protégés par le droit applicable à la propriété intellectuelle.
            </p>
            <p className="text-slate-600">
              Toute reproduction, représentation, modification, publication ou adaptation de tout
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sauf autorisation écrite préalable d&apos;ESDLAB.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              5. Données personnelles
            </h2>
            <p className="text-slate-600">
              Les données collectées via ce site sont traitées conformément à notre{" "}
              <Link href="/confidentialite" className="text-primary-600 hover:underline">
                politique de confidentialité
              </Link>
              . Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
              de vos données en contactant{" "}
              <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
                {email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              6. Cookies
            </h2>
            <p className="text-slate-600">
              Ce site utilise des cookies analytiques. Pour en savoir plus, consultez notre{" "}
              <Link href="/cookies" className="text-primary-600 hover:underline">
                politique des cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              7. Limitation de responsabilité
            </h2>
            <p className="text-slate-600">
              ESDLAB s&apos;efforce de maintenir les informations de ce site à jour mais ne peut
              garantir leur exhaustivité ou exactitude à tout moment. ESDLAB décline toute
              responsabilité pour les dommages directs ou indirects résultant de l&apos;utilisation
              de ce site ou des sites vers lesquels il renvoie.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              8. Droit applicable
            </h2>
            <p className="text-slate-600">
              Le présent site et ses mentions légales sont soumis au droit ivoirien.
              Tout litige relatif à l&apos;utilisation du site sera soumis à la juridiction compétente
              de la ville d&apos;Abidjan.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500 flex flex-wrap gap-4">
          <Link href="/confidentialite" className="hover:text-primary-600 transition-colors">
            Politique de confidentialité
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
