import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.slug !== undefined) data.slug = body.slug;
  if (body.title !== undefined) data.title = body.title;
  if (body.content !== undefined) data.content = body.content;
  if (body.heroImage !== undefined) data.heroImage = body.heroImage;
  if (body.seoTitle !== undefined) data.seoTitle = body.seoTitle;
  if (body.seoDescription !== undefined) data.seoDescription = body.seoDescription;
  if (body.published !== undefined) data.published = body.published;

  try {
    const page = await prisma.page.update({ where: { id: params.id }, data });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Mise à jour impossible (slug en doublon ?)" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  await prisma.page.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
