import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esdlab.com";
  const now = new Date();

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { order: "asc" },
  });

  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { order: "asc" },
  });

  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const productListRoute: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/produits`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((p) => !["mentions-legales", "confidentialite", "cookies"].includes(p.slug))
    .map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const legalRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [...staticRoutes, ...productListRoute, ...productRoutes, ...serviceRoutes, ...pageRoutes, ...legalRoutes];
}
