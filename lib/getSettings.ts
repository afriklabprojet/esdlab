import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

// Un seul SELECT par requête HTTP grâce au cache Next.js, invalidable via revalidateTag("settings").
export const getSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const rows = await prisma.setting.findMany();
    const s: Record<string, string> = {};
    for (const r of rows) s[r.key] = r.value ?? "";
    return s;
  },
  ["settings"],
  { tags: ["settings"], revalidate: 60 },
);
