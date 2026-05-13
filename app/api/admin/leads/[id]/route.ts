import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_STATUSES = ["nouveau", "qualifie", "contacte", "demo", "gagne", "perdu"];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!lead) return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json();
  const { status, assignedTo, note } = body;

  if (status && !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (status) updateData.status = status;
  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

  const [lead] = await Promise.all([
    prisma.lead.update({ where: { id: params.id }, data: updateData }),
    note
      ? prisma.leadNote.create({
          data: { leadId: params.id, note: String(note).slice(0, 2000) },
        })
      : Promise.resolve(null),
  ]);

  return NextResponse.json(lead);
}
