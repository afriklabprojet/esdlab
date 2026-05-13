import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

export async function GET() {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return NextResponse.json(map);
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const body = (await req.json()) as Record<string, string>;
  const ops = Object.entries(body).map(([key, value]) =>
    prisma.setting.upsert({
      where: { key },
      update: { value: String(value ?? "") },
      create: { key, value: String(value ?? "") },
    }),
  );
  await prisma.$transaction(ops);
  revalidateTag("settings");
  return NextResponse.json({ ok: true, count: ops.length });
}
