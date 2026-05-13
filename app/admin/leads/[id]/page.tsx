import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeadDetailClient from "./LeadDetailClient";

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!lead) notFound();

  return <LeadDetailClient lead={lead} />;
}
