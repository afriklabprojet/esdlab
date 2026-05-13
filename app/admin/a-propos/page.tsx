import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AboutAdminClient from "./AboutAdminClient";

export const metadata = { title: "À propos — Admin" };

export default async function AdminAboutPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;

  return <AboutAdminClient initial={map} />;
}
