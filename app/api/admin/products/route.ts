import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET() {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(["admin", "editor"]);
  if (error) return error;

  const body = await req.json() as Record<string, unknown>;
  if (!body.slug || !body.name) {
    return NextResponse.json({ error: "slug et name requis" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      slug: String(body.slug),
      name: String(body.name),
      kicker: String(body.kicker ?? ""),
      tagline: String(body.tagline ?? ""),
      description: String(body.description ?? ""),
      longDescription: body.longDescription ? String(body.longDescription) : null,
      image: body.image ? String(body.image) : null,
      iconKey: body.iconKey ? String(body.iconKey) : null,
      features: typeof body.features === "string" ? body.features : "[]",
      benefits: typeof body.benefits === "string" ? body.benefits : "[]",
      useCases: typeof body.useCases === "string" ? body.useCases : "[]",
      specs: typeof body.specs === "string" ? body.specs : "[]",
      relatedSlugs: typeof body.relatedSlugs === "string" ? body.relatedSlugs : "[]",
      order: Number(body.order ?? 0),
      published: Boolean(body.published ?? false),
      seoTitle: body.seoTitle ? String(body.seoTitle) : null,
      seoDescription: body.seoDescription ? String(body.seoDescription) : null,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
