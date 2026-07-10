import { redirect } from "next/navigation";
import { ApplicationShell } from "@/components/layout/application-shell";
import { requireSession } from "@/lib/auth/guard";
import { getUserOrganizations } from "@/lib/services/organizations";

export const dynamic = "force-dynamic";
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  try {
    const session = await requireSession();
    const organizations = await getUserOrganizations(session.user.id);
    return <ApplicationShell user={{ name: session.user.name, email: session.user.email }} organizationName={organizations[0]?.name}>{children}</ApplicationShell>;
  } catch { redirect("/sign-in"); }
}
