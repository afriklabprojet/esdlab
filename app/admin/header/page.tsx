import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HeaderClient from "./HeaderClient";

export const metadata = { title: "En-tête — Admin" };

export default async function AdminHeaderPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;

  return <HeaderClient initial={map} />;
}
