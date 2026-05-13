import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json() as Record<string, unknown>;

  const data: Record<string, unknown> = {};
  const str = (k: string) => { if (k in body && body[k] !== undefined) data[k] = body[k] !== null ? String(body[k]) : null; };
  const num = (k: string) => { if (k in body) data[k] = Number(body[k]); };
  const bool = (k: string) => { if (k in body) data[k] = Boolean(body[k]); };

  str("name"); str("kicker"); str("tagline"); str("description");
  str("longDescription"); str("image"); str("iconKey");
  str("features"); str("benefits"); str("useCases"); str("specs"); str("relatedSlugs");
  str("seoTitle"); str("seoDescription");
  num("order"); bool("published");

  const updated = await prisma.product.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
