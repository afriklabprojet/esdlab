import { getSettings } from "@/lib/getSettings";
import ContactClient from "./ContactClient";

interface FaqItem { q: string; a: string }

function parseFaqItems(raw: string | undefined): FaqItem[] {
  if (!raw) return [];
  try { const v = JSON.parse(raw); return Array.isArray(v) ? v : []; } catch { return []; }
}

export default async function ContactPage() {
  const settings = await getSettings();

  const phone = settings["contact.phone"] || "+225 07 79 56 52 26";
  const email = settings["contact.email"] || "contact@esdlab.pro";
  const address =
    settings["contact.address"] ||
    "Electronic System Development, Lab.\nTreichville, Abidjan\nCôte d'Ivoire";
  const waPhone = (settings["contact.whatsapp"] || "2250779565226").replace(/\D/g, "");
  const waMsg =
    settings["contact.whatsapp_message"] ||
    "Bonjour ESDLAB, je souhaite échanger au sujet de DigiLab Corporate.";
  const whatsappHref = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;
  const faqItems = parseFaqItems(settings["contact.faq_items"]);

  return (
    <ContactClient
      whatsappHref={whatsappHref}
      email={email}
      phone={phone}
      address={address}
      faqItems={faqItems}
    />
  );
}
