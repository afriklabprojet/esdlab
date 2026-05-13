import { getSettings } from "@/lib/getSettings";
import MaintenanceClient from "./MaintenanceClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Maintenance — ESDLab Technologies",
  robots: { index: false, follow: false },
};

export default async function MaintenancePage() {
  const s = await getSettings();
  return (
    <MaintenanceClient
      message={s["site.maintenance_message"] || "Nous effectuons une mise à jour pour améliorer votre expérience."}
      eta={s["site.maintenance_eta"] || ""}
      siteName={s["site.name"] || "ESDLAB"}
      email={s["contact.email"] || "contact@esdlab.pro"}
    />
  );
}
