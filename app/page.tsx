import HomeView from "./HomeView";
import { getSettings } from "@/lib/getSettings";

export const revalidate = 60; // re-génère la page au plus toutes les 60 s

export default async function Page() {
  const settings = await getSettings();
  return <HomeView settings={settings} />;
}
