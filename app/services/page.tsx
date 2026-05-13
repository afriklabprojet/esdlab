import prisma from "@/lib/prisma";
import ServicesView, { ServiceItem } from "./ServicesView";

export const revalidate = 60;

function parseArr<T = any>(s: string | null | undefined, fallback: T[] = []): T[] {
  if (!s) return fallback;
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export default async function ServicesPage() {
  const rows = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const services: ServiceItem[] = rows.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle ?? "",
    description: s.description ?? "",
    features: parseArr<string>(s.features),
    image: s.image ?? "",
    icon: s.icon ?? "",
    color: s.color ?? "",
  }));

  return <ServicesView services={services} />;
}
