import Link from "next/link";
import Image from "next/image";

type FooterNav = { href: string; label: string };

const DEFAULT_SECTEURS: FooterNav[] = [
  { href: "/services#industrie", label: "Industrie & Production" },
  { href: "/services#services", label: "Services & Tertiaire" },
  { href: "/services#commerce", label: "Commerce & Retail" },
  { href: "/services#institutions", label: "Institutions & Santé" },
  { href: "/services#education", label: "Éducation" },
  { href: "/services#hotellerie", label: "Hôtellerie & Tourisme" },
];

const DEFAULT_NAV: FooterNav[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cookies", label: "Cookies" },
];

function parseLinks(json: string | undefined, fallback: FooterNav[]): FooterNav[] {
  if (!json) return fallback;
  try { return JSON.parse(json) as FooterNav[]; } catch { return fallback; }
}

export default function Footer({ settings }: { readonly settings: Record<string, string> }) {
  const siteName  = settings["site.name"]     || "ESDLAB";
  const tagline   = settings["site.tagline"]  || "Technologies";
  const logo      = settings["site.logo"]     || "/images/ESDL.png";
  const address   = settings["contact.address"] || "Treichville, Abidjan, Côte d'Ivoire";
  const email     = settings["contact.email"]   || "contact@esdlab.pro";
  const phone     = settings["contact.phone"]   || "+225 07 79 56 52 26";
  const description =
    settings["footer.description"] ||
    "Entreprise technologique spécialisée dans les solutions numériques — dont DigiLab Corporate, notre solution d'affichage dynamique Full Web — pour les entreprises, banques, hôtels, commerces et institutions d'Afrique de l'Ouest.";
  const copyright =
    settings["footer.copyright"] ||
    "ESDLAB — Electronic System Development, Lab. Tous droits réservés.";
  const ctaLabel  = settings["footer.cta_label"] || "Réserver une démo";
  const ctaHref   = settings["footer.cta_href"]  || "/contact";
  const secteurs  = parseLinks(settings["footer.secteurs"], DEFAULT_SECTEURS);
  const navLinks  = parseLinks(settings["footer.nav"], DEFAULT_NAV);

  return (
    <footer className="bg-secondary-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-sm shrink-0">
                <Image
                  src={logo}
                  alt={siteName}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <h2 className="font-display text-xl text-white">{siteName}</h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-secondary-400">{tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/82">
              {description}
            </p>
            <div className="mt-6 space-y-1 text-sm font-medium text-white/88">
              <p>{address}</p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">
              Secteurs
            </h3>
            <ul className="space-y-3 text-sm">
              {secteurs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/82 transition-colors hover:text-secondary-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/82 transition-colors hover:text-secondary-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={ctaHref} className="mt-6 inline-flex items-center justify-center gap-2 rounded-[0.9rem] border border-white/20 bg-white px-5 py-2.5 font-semibold text-secondary-800 transition-all duration-250 hover:bg-secondary-50">
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/16 pt-6 text-sm text-white/70">
          © {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </footer>
  );
}
