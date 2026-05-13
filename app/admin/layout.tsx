import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "./AdminShell";
import MaintenanceBanner from "./MaintenanceBanner";

export const metadata: Metadata = {
  title: "Admin | ESDLab Technologies",
  robots: { index: false, follow: false },
};

interface AdminLayoutProps { readonly children: React.ReactNode }

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  // Sans session → on laisse passer (page /login a son propre design)
  if (!session?.user) {
    return <>{children}</>;
  }

  const newLeadsCount = await prisma.lead.count({ where: { status: "nouveau" } });

  const maintRow = await prisma.setting.findUnique({ where: { key: "site.maintenance" } });
  const maintenanceActive = maintRow?.value === "true";

  return (
    <AdminShell user={session.user} newLeadsCount={newLeadsCount}>
      {maintenanceActive && <MaintenanceBanner />}
      {children}
    </AdminShell>
  );
}
