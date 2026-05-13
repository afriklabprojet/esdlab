import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET() {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json();
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug et title requis" }, { status: 400 });
  }

  const service = await prisma.service.create({
    data: {
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle || "",
      description: body.description || "",
      longDescription: body.longDescription ?? null,
      image: body.image ?? null,
      icon: body.icon ?? null,
      color: body.color ?? null,
      features: JSON.stringify(body.features ?? []),
      benefits: JSON.stringify(body.benefits ?? []),
      process: JSON.stringify(body.process ?? []),
      technologies: JSON.stringify(body.technologies ?? []),
      order: body.order ?? 0,
      published: body.published ?? true,
      seoTitle: body.seoTitle ?? null,
      seoDescription: body.seoDescription ?? null,
    },
  });
  return NextResponse.json(service, { status: 201 });
}
