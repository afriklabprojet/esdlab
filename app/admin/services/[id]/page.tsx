import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ServiceForm from "../ServiceForm";

function parseArr<T = any>(s: string | null | undefined, fallback: T[] = []): T[] {
  if (!s) return fallback;
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const s = await prisma.service.findUnique({ where: { id: params.id } });
  if (!s) notFound();

  return (
    <ServiceForm
      mode="edit"
      initial={{
        id: s.id,
        slug: s.slug,
        title: s.title,
        subtitle: s.subtitle ?? "",
        description: s.description ?? "",
        longDescription: s.longDescription ?? "",
        image: s.image ?? "",
        icon: s.icon ?? "",
        color: s.color ?? "",
        features: parseArr<string>(s.features),
        benefits: parseArr<{ title: string; description: string }>(s.benefits),
        process: parseArr<string>(s.process),
        technologies: parseArr<string>(s.technologies),
        order: s.order ?? 0,
        published: s.published,
        seoTitle: s.seoTitle ?? "",
        seoDescription: s.seoDescription ?? "",
      }}
    />
  );
}
