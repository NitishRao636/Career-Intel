import { redirect } from "next/navigation";
import { WorkspaceOnboarding } from "@/components/auth/workspace-onboarding";
import { requireSession } from "@/lib/auth/guard";
import { getUserOrganizations } from "@/lib/services/organizations";
export const dynamic = "force-dynamic";
export default async function OnboardingPage() { const session = await requireSession(); const organizations = await getUserOrganizations(session.user.id); if (organizations.length) redirect("/dashboard"); return <WorkspaceOnboarding />; }
