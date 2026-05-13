import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Role = "admin" | "editor" | "commercial";

/**
 * Vérifie que la session existe et que l'utilisateur a l'un des rôles autorisés.
 * Retourne { session } si OK, ou { error: NextResponse } à retourner immédiatement.
 */
export async function requireRole(allowed: Role[]) {
  const session = await auth();
  if (!session) {
    return { error: NextResponse.json({ error: "Non autorisé" }, { status: 401 }) };
  }
  const role = session.user.role as Role;
  if (!allowed.includes(role)) {
    return { error: NextResponse.json({ error: "Accès interdit — rôle insuffisant" }, { status: 403 }) };
  }
  return { session };
}
