import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

function parseArr<T>(s: string | null | undefined, fallback: T[] = []): T[] {
  if (!s) return fallback;
  try { const v = JSON.parse(s); return Array.isArray(v) ? v as T[] : fallback; } catch { return fallback; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!s?.published) return {};
  return {
    title: s.seoTitle || `${s.title} — ESDLab Technologies`,
    description: s.seoDescription || s.description || undefined,
  };
}

export default async function ServiceDetailPage({ params }: { readonly params: { slug: string } }) {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!s?.published) notFound();

  return (
    <ServiceDetailClient
      service={{
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        longDescription: s.longDescription,
        image: s.image,
        icon: s.icon,
        features:     parseArr<string>(s.features),
        benefits:     parseArr<{ title: string; description: string }>(s.benefits),
        process:      parseArr<{ step: string; title: string; description: string }>(s.process),
        technologies: parseArr<string>(s.technologies),
      }}
    />
  );
}
