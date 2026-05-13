import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminLeadsClient from "./LeadsClient";

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  qualifie: "Qualifié",
  contacte: "Contacté",
  demo: "Démo",
  gagne: "Gagné",
  perdu: "Perdu",
};

export default async function AdminLeadsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
  ]);

  const statusCounts = counts.reduce(
    (acc, c) => ({ ...acc, [c.status]: c._count.id }),
    {} as Record<string, number>
  );

  return (
    <AdminLeadsClient
      leads={leads}
      statusCounts={statusCounts}
      statusLabels={STATUS_LABELS}
    />
  );
}
