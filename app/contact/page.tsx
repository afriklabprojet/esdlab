import { getSettings } from "@/lib/getSettings";
import ContactClient from "./ContactClient";

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

  return (
    <ContactClient
      whatsappHref={whatsappHref}
      email={email}
      phone={phone}
      address={address}
    />
  );
}
