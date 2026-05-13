import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: params.slug } });
  if (!page?.published) return { title: "Page introuvable" };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || undefined,
  };
}

export default async function CmsPage({ params }: Readonly<Props>) {
  const page = await prisma.page.findUnique({ where: { slug: params.slug } });
  if (!page?.published) notFound();

  return (
    <div className="pt-20">
      <section className="relative py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900">
            {page.title}
          </h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <article
            className="prose prose-slate max-w-none prose-headings:font-display prose-a:text-secondary-600"
            // Contenu rédigé par l'admin via le CMS — HTML/Markdown brut.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </div>
  );
}
