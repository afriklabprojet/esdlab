import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

const ROLES = new Set(["admin", "editor", "commercial"]);
const STATUSES = new Set(["active", "inactive"]);

export async function GET() {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, lastLoginAt: true },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const body = await req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const name = body.name ? String(body.name).trim() : null;
  const role = ROLES.has(body.role) ? body.role : "commercial";
  const status = STATUSES.has(body.status) ? body.status : "active";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Mot de passe : 8 caractères minimum" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, name, role, status, passwordHash },
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, lastLoginAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}
