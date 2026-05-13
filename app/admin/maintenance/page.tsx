import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MaintenanceAdminClient from "./MaintenanceAdminClient";

export const metadata = { title: "Maintenance — Admin" };

export default async function AdminMaintenancePage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const rows = await prisma.setting.findMany({
    where: { key: { in: ["site.maintenance", "site.maintenance_message", "site.maintenance_eta"] } },
  });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;

  return (
    <MaintenanceAdminClient
      initialEnabled={map["site.maintenance"] === "true"}
      initialMessage={map["site.maintenance_message"] ?? "Nous effectuons une mise à jour pour améliorer votre expérience."}
      initialEta={map["site.maintenance_eta"] ?? ""}
    />
  );
}
