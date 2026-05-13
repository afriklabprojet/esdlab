import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ServicesAdminClient from "./ServicesAdminClient";

export default async function ServicesAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return <ServicesAdminClient initialServices={services} />;
}
