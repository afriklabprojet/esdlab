import prisma from "@/lib/prisma";
import AboutContent from "./AboutContent";

export const revalidate = 60;

export const metadata = {
  title: "À propos — ESDLab Technologies",
  description:
    "ESDLAB conçoit et déploie des solutions d'affichage dynamique premium pour entreprises, institutions et commerces en Côte d'Ivoire et en Afrique de l'Ouest.",
};

export default async function AboutPage() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;

  return <AboutContent settings={settings} />;
}

