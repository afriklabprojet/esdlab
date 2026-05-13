import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HomePageClient from "./HomePageClient";

export const metadata = { title: "Page d'accueil — Admin" };

export default async function AdminHomePage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;

  return <HomePageClient initial={map} />;
}
