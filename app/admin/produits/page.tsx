import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProduitsAdminClient from "./ProduitsAdminClient";

export const metadata = { title: "Produits — Admin ESDLab" };

export default async function AdminProduitsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });
  return <ProduitsAdminClient initialProducts={products} />;
}
