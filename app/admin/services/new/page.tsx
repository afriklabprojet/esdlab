import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ServiceForm, { EMPTY_SERVICE } from "../ServiceForm";

export default async function NewServicePage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  return <ServiceForm initial={EMPTY_SERVICE} mode="create" />;
}
