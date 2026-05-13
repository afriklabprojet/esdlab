import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";

const COOKIE = "__maint";

export async function GET() {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const rows = await prisma.setting.findMany({
    where: { key: { in: ["site.maintenance", "site.maintenance_message", "site.maintenance_eta"] } },
  });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  return NextResponse.json({
    enabled: map["site.maintenance"] === "true",
    message: map["site.maintenance_message"] ?? "",
    eta: map["site.maintenance_eta"] ?? "",
  });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const body = (await req.json()) as {
    enabled?: boolean;
    message?: string;
    eta?: string;
  };

  const ops = [];
  if (typeof body.enabled === "boolean") {
    ops.push(
      prisma.setting.upsert({
        where: { key: "site.maintenance" },
        update: { value: body.enabled ? "true" : "false" },
        create: { key: "site.maintenance", value: body.enabled ? "true" : "false" },
      }),
    );
  }
  if (typeof body.message === "string") {
    ops.push(
      prisma.setting.upsert({
        where: { key: "site.maintenance_message" },
        update: { value: body.message },
        create: { key: "site.maintenance_message", value: body.message },
      }),
    );
  }
  if (typeof body.eta === "string") {
    ops.push(
      prisma.setting.upsert({
        where: { key: "site.maintenance_eta" },
        update: { value: body.eta },
        create: { key: "site.maintenance_eta", value: body.eta },
      }),
    );
  }

  if (ops.length) await prisma.$transaction(ops);
  revalidateTag("settings");

  const enabled = typeof body.enabled === "boolean" ? body.enabled : null;
  const res = NextResponse.json({ ok: true });

  // Set or clear the Edge-readable cookie so middleware can act immediately
  if (enabled === true) {
    res.cookies.set(COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year — stays until explicitly cleared
    });
  } else if (enabled === false) {
    res.cookies.set(COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return res;
}
