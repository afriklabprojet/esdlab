import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

const SECTEUR_LABELS: Record<string, string> = {
  "zones-industrielles": "Zones industrielles",
  "banques-assurances": "Banques & assurances",
  "hotellerie-restauration": "Hôtellerie & restauration",
  "grande-distribution": "Grande distribution",
  "institutions-universites": "Institutions & universités",
  autre: "Autre",
};

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  qualifie: "Qualifié",
  contacte: "Contacté",
  demo: "Démo",
  gagne: "Gagné",
  perdu: "Perdu",
};

function csvCell(val: string | null | undefined): string {
  if (!val) return "";
  const escaped = val.replaceAll('"', '""');
  return `"${escaped}"`;
}

export async function GET(req: NextRequest) {
  const { error } = await requireRole(["admin", "commercial"]);
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;

  const leads = await prisma.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const headers = ["Nom", "Email", "Téléphone", "Entreprise", "Secteur", "Taille", "Besoin", "Statut", "Source", "Date"];

  const rows = leads.map((l) => [
    csvCell(l.name),
    csvCell(l.email),
    csvCell(l.phone),
    csvCell(l.company),
    csvCell(l.secteur ? (SECTEUR_LABELS[l.secteur] ?? l.secteur) : null),
    csvCell(l.taille),
    csvCell(l.besoin),
    csvCell(l.status ? (STATUS_LABELS[l.status] ?? l.status) : null),
    csvCell(l.source),
    csvCell(new Date(l.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })),
  ]);

  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\r\n");

  const filename = `leads-esdlab-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
