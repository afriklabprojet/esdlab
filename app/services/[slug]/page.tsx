import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function parseArr<T = any>(s: string | null | undefined, fallback: T[] = []): T[] {
  if (!s) return fallback;
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!s?.published) return {};
  return {
    title: s.seoTitle || `${s.title} — ESDLab Technologies`,
    description: s.seoDescription || s.description || undefined,
  };
}

interface ServiceDetailPageProps { readonly params: { slug: string } }

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!s?.published) notFound();

  const features = parseArr<string>(s.features);
  const benefits = parseArr<{ title: string; description: string }>(s.benefits);
  const process = parseArr<{ step: string; title: string; description: string }>(s.process);
  const technologies = parseArr<string>(s.technologies);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="text-sm text-primary-700 hover:underline">
              ← Tous les secteurs
            </Link>
            <div className="mt-4 flex items-center gap-4">
              {s.icon && (
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-secondary-200 bg-secondary-50 text-sm font-semibold text-secondary-700">
                  {s.icon}
                </div>
              )}
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-semibold text-slate-900">{s.title}</h1>
                {s.subtitle && <p className="text-primary-600 font-semibold text-lg mt-2">{s.subtitle}</p>}
              </div>
            </div>
            {s.description && <p className="text-xl text-slate-600 mt-6">{s.description}</p>}
          </div>
        </div>
      </section>

      {/* Image */}
      {s.image && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="max-w-5xl mx-auto relative aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
            {s.color && <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-20`} />}
          </div>
        </section>
      )}

      {/* Long description */}
      {s.longDescription && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
              <p className="text-lg text-slate-700 whitespace-pre-line">{s.longDescription}</p>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-8">Caractéristiques</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-8 text-center">Les bénéfices</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((b) => (
                  <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">{b.title}</h3>
                    <p className="text-slate-600">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-8 text-center">Notre processus</h2>
              <ol className="space-y-4">
                {process.map((step, i) => (
                  <li key={step.title ?? i} className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-white font-semibold flex-shrink-0 shrink-0">
                      {step.step ?? String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      {step.title && <p className="font-semibold text-slate-900">{step.title}</p>}
                      {step.description && <p className="text-slate-600 mt-0.5">{step.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-8">Technologies</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((t) => (
                  <span key={t} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6">Échangeons sur votre projet</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Notre équipe vous accompagne sur le terrain, en Côte d'Ivoire et au-delà.</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[0.9rem] bg-white px-5 py-3 font-semibold text-primary-600 shadow-elegant transition-all duration-250 hover:bg-slate-50">
            Contactez-nous
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
