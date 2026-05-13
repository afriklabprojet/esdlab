import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET() {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json();
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug et title requis" }, { status: 400 });
  }

  const exists = await prisma.page.findUnique({ where: { slug: body.slug } });
  if (exists) return NextResponse.json({ error: "Slug déjà utilisé" }, { status: 409 });

  const page = await prisma.page.create({
    data: {
      slug: body.slug,
      title: body.title,
      content: body.content ?? "",
      heroImage: body.heroImage ?? null,
      seoTitle: body.seoTitle ?? null,
      seoDescription: body.seoDescription ?? null,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(page, { status: 201 });
}
