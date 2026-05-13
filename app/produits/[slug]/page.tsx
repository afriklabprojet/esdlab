import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 60;

function parseArr<T>(s: string | null | undefined, fb: T[] = []): T[] {
  if (!s) return fb;
  try { const v = JSON.parse(s); return Array.isArray(v) ? (v as T[]) : fb; } catch { return fb; }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ where: { published: true }, select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product?.published) return {};
  return {
    title: product.seoTitle || `${product.name} — ESDLab Technologies`,
    description: product.seoDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product?.published) notFound();

  const features  = parseArr<string>(product.features);
  const benefits  = parseArr<{ title: string; description: string }>(product.benefits);
  const useCases  = parseArr<{ title: string; description: string; icon?: string }>(product.useCases);
  const specs     = parseArr<{ label: string; value: string }>(product.specs);
  const relatedSlugs = parseArr<string>(product.relatedSlugs);

  const related = relatedSlugs.length
    ? await prisma.product.findMany({
        where: { slug: { in: relatedSlugs }, published: true },
        select: { slug: true, name: true, kicker: true, image: true, iconKey: true },
      })
    : [];

  return (
    <ProductDetailClient
      product={{ ...product, features, benefits, useCases, specs }}
      related={related}
    />
  );
}
