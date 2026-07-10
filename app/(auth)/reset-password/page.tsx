import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
export const metadata = { title: "Choose new password" };
export default function ResetPasswordPage() { return <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-[var(--muted-surface)]" />}><ResetPasswordForm /></Suspense>; }
