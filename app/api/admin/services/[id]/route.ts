import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json();
  const data: any = {};
  for (const k of ["slug", "title", "subtitle", "description", "longDescription", "image", "icon", "color", "seoTitle", "seoDescription"]) {
    if (k in body) data[k] = body[k];
  }
  for (const k of ["features", "benefits", "process", "technologies"]) {
    if (k in body) data[k] = JSON.stringify(body[k] ?? []);
  }
  if ("order" in body) data.order = Number(body.order) || 0;
  if ("published" in body) data.published = !!body.published;

  const service = await prisma.service.update({ where: { id: params.id }, data });
  return NextResponse.json(service);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
