import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/getSettings";

export const metadata: Metadata = {
  title: "Politique des cookies | ESDLab Technologies",
  description:
    "Informations sur l'utilisation des cookies sur le site ESDLab Technologies.",
  robots: { index: false },
};

export default async function CookiesPage() {
  const lastUpdate = "26 avril 2026";

  const [dbPage, settings] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "cookies" } }),
    getSettings(),
  ]);

  const email = settings["contact.email"] || "contact@esdlab.pro";

  if (dbPage?.content) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl font-semibold text-slate-900 mb-4">
            {dbPage.title || "Politique des cookies"}
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
          Politique des cookies
        </h1>
        <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : {lastUpdate}</p>

        <div className="prose prose-lg max-w-none space-y-10">

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              1. Qu&apos;est-ce qu&apos;un cookie ?
            </h2>
            <p className="text-slate-600">
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone)
              lors de la visite d&apos;un site web. Il permet au site de mémoriser des informations sur votre visite,
              comme la langue utilisée et d&apos;autres paramètres.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              2. Cookies utilisés sur ce site
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Cookie</th>
                    <th className="text-left px-4 py-3 font-semibold">Fournisseur</th>
                    <th className="text-left px-4 py-3 font-semibold">Finalité</th>
                    <th className="text-left px-4 py-3 font-semibold">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_ga</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Distinguer les visiteurs (mesure d&apos;audience)</td>
                    <td className="px-4 py-3">2 ans</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                    <td className="px-4 py-3">Google Analytics</td>
                    <td className="px-4 py-3">Conserver l&apos;état de session GA4</td>
                    <td className="px-4 py-3">2 ans</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_clck</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">Persistance de l&apos;identifiant visiteur (heatmaps)</td>
                    <td className="px-4 py-3">1 an</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_clsk</td>
                    <td className="px-4 py-3">Microsoft Clarity</td>
                    <td className="px-4 py-3">Suivi de session (enregistrement de navigation)</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              3. Cookies strictement nécessaires
            </h2>
            <p className="text-slate-600">
              Notre site n&apos;utilise pas de cookies strictement nécessaires au-delà de ceux
              liés au bon fonctionnement technique de Next.js (aucun cookie de session applicatif
              n&apos;est déposé sur les pages publiques).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-2xl font-display text-slate-900 mb-4">
              4. Gérer vos préférences
            </h2>
            <p className="text-slate-600 mb-4">
              Vous pouvez refuser ou supprimer les cookies à tout moment via les paramètres
              de votre navigateur :
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Apple Safari
                </a>
              </li>
            </ul>
            <p className="text-slate-600 mt-4">
              Vous pouvez également vous opposer au suivi Google Analytics via l&apos;extension officielle :{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              5. Mise à jour de cette politique
            </h2>
            <p className="text-slate-600">
              Cette politique peut être mise à jour à tout moment. Nous vous invitons à la consulter
              régulièrement. La date de dernière modification figure en haut de cette page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">
              6. Contact
            </h2>
            <p className="text-slate-600">
              Pour toute question relative aux cookies, contactez-nous à{" "}
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
          <Link href="/confidentialite" className="hover:text-primary-600 transition-colors">
            Politique de confidentialité
          </Link>
          <Link href="/contact" className="hover:text-primary-600 transition-colors">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
