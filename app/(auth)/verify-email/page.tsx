import { Suspense } from "react";
import { VerifyEmailCard } from "@/components/auth/verify-email-card";
export const metadata = { title: "Verify email" };
export default function VerifyEmailPage() { return <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-[var(--muted-surface)]" />}><VerifyEmailCard /></Suspense>; }
