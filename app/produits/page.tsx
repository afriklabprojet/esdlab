import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ProductsListClient from "./ProductsListClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nos Produits — ESDLab Technologies",
  description: "Bornes tactiles, chevalets numériques, écrans interactifs et écrans vitrine. Découvrez notre gamme complète de solutions d'affichage dynamique.",
};

export default async function ProduitsPage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    select: {
      slug: true,
      name: true,
      kicker: true,
      tagline: true,
      description: true,
      image: true,
      iconKey: true,
      features: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });

  const parsed = products.map((p) => {
    let features: string[] = [];
    try { features = JSON.parse(p.features); } catch {}
    return { ...p, features };
  });

  return <ProductsListClient products={parsed} />;
}
