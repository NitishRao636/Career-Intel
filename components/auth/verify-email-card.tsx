"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function VerifyEmailCard() {
  const email = useSearchParams().get("email") ?? "your work email"; const [loading, setLoading] = useState(false);
  const resend = async () => { setLoading(true); const { error } = await authClient.sendVerificationEmail({ email, callbackURL: "/onboarding" }); setLoading(false); if (error) toast.error(error.message ?? "Could not resend verification email."); else toast.success("A new verification email is on its way."); };
  return <div><div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-500/10 text-[var(--brand)]"><MailCheck size={25} /></div><h1 className="text-3xl font-black tracking-[-.045em]">Check your inbox</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">We sent a verification link to <strong className="font-bold text-[var(--foreground)]">{email}</strong>. Open it to activate your account and set up your workspace.</p><div className="mt-7 rounded-xl border bg-[var(--muted-surface)]/50 p-4 text-sm leading-6 text-[var(--muted)]">Can’t find it? Check Spam or Promotions. The link expires for your security.</div><Button variant="outline" className="mt-5 w-full" loading={loading} onClick={resend}><RefreshCw size={16} />Resend verification email</Button><p className="mt-6 text-center text-sm text-[var(--muted)]">Verified already? <Link href="/sign-in" className="font-bold text-[var(--brand)] hover:underline">Sign in</Link></p></div>;
}
