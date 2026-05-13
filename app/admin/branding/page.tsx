import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBrandTokens, BRAND_DEFAULTS } from "@/lib/brand";
import BrandingAdminClient from "./BrandingAdminClient";

export const metadata = { title: "Branding — Admin" };

export default async function BrandingAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const tokens = await getBrandTokens();

  return <BrandingAdminClient initial={tokens} defaults={BRAND_DEFAULTS} />;
}
