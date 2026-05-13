"use client";

import { usePathname } from "next/navigation";
import Header, { MobileCTABar } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

type ServiceItem = { slug: string; title: string; order: number };

interface PublicChromeProps {
  readonly children: React.ReactNode;
  readonly settings: Record<string, string>;
  readonly services?: ServiceItem[];
}

export default function PublicChrome({ children, settings, services = [] }: PublicChromeProps) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main id="main-content" className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header settings={settings} services={services.filter((s) => s.order > 6)} />
      <main id="main-content" className="min-h-screen pt-20 pb-20 md:pt-36 md:pb-0">
        {children}
      </main>
      <Footer settings={settings} />
      <MobileCTABar settings={settings} />
      <CookieBanner />
    </>
  );
}
