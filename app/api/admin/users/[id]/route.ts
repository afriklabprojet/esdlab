import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

const ROLES = new Set(["admin", "editor", "commercial"]);
const STATUSES = new Set(["active", "inactive"]);

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(["admin"]);
  if (error) return error;

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, lastLoginAt: true },
  });
  if (!user) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, session } = await requireRole(["admin"]);
  if (error) return error;

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.email !== undefined) {
    const email = String(body.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    const dup = await prisma.user.findFirst({ where: { email, NOT: { id: params.id } } });
    if (dup) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
    data.email = email;
  }
  if (body.name !== undefined) data.name = body.name ? String(body.name).trim() : null;
  if (body.role !== undefined) {
    if (!ROLES.has(body.role)) return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
    data.role = body.role;
  }
  if (body.status !== undefined) {
    if (!STATUSES.has(body.status)) return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    data.status = body.status;
  }
  if (body.password) {
    if (String(body.password).length < 8) {
      return NextResponse.json({ error: "Mot de passe : 8 caractères minimum" }, { status: 400 });
    }
    data.passwordHash = await hash(String(body.password), 12);
  }

  // Empêcher l'utilisateur courant de se rétrograder ou se désactiver lui-même
  const sessionEmail = session.user?.email?.toLowerCase();
  const target = await prisma.user.findUnique({ where: { id: params.id }, select: { email: true } });
  if (target && sessionEmail && target.email.toLowerCase() === sessionEmail) {
    if (data.role !== undefined && data.role !== "admin") {
      return NextResponse.json({ error: "Impossible de modifier votre propre rôle" }, { status: 403 });
    }
    if (data.status !== undefined && data.status !== "active") {
      return NextResponse.json({ error: "Impossible de désactiver votre propre compte" }, { status: 403 });
    }
  }

  const user = await prisma.user.update({
    where: { id: params.id },
    data,
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, lastLoginAt: true },
  });
  return NextResponse.json(user);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error, session } = await requireRole(["admin"]);
  if (error) return error;

  const target = await prisma.user.findUnique({ where: { id: params.id }, select: { email: true } });
  if (!target) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  const sessionEmail = session.user?.email?.toLowerCase();
  if (sessionEmail && target.email.toLowerCase() === sessionEmail) {
    return NextResponse.json({ error: "Impossible de supprimer votre propre compte" }, { status: 403 });
  }

  // Empêcher la suppression du dernier admin
  const targetUser = await prisma.user.findUnique({ where: { id: params.id }, select: { role: true } });
  if (targetUser?.role === "admin") {
    const adminCount = await prisma.user.count({ where: { role: "admin", status: "active" } });
    if (adminCount <= 1) {
      return NextResponse.json({ error: "Impossible de supprimer le dernier administrateur actif" }, { status: 403 });
    }
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
