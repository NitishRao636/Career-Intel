"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const schema = z.object({ email: z.email("Enter a valid email address.") }); type Values = z.infer<typeof schema>;
export function ForgotPasswordForm() { const [sent, setSent] = useState(false); const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) }); const submit = async (values: Values) => { const { error } = await authClient.requestPasswordReset({ email: values.email, redirectTo: `${window.location.origin}/reset-password` }); if (error) { toast.error(error.message ?? "We couldn’t start the password reset."); return; } setSent(true); toast.success("If the account exists, a secure reset link is on its way."); };
if (sent) return <div><div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600"><KeyRound size={23} /></div><h1 className="text-3xl font-black tracking-[-.045em]">Check your inbox</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">If an account matches that email, you’ll receive a password reset link shortly. For security, this message is the same for every request.</p><Link href="/sign-in" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] hover:underline"><ArrowLeft size={16} />Back to sign in</Link></div>;
return <div><div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-500/10 text-[var(--brand)]"><KeyRound size={23} /></div><h1 className="text-3xl font-black tracking-[-.045em]">Reset your password</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Enter your work email and we’ll send a time-limited reset link.</p><form noValidate onSubmit={handleSubmit(submit)} className="mt-7 space-y-5"><div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register("email")} />{errors.email && <p className="text-xs font-medium text-[var(--danger)]">{errors.email.message}</p>}</div><Button className="w-full" size="lg" loading={isSubmitting}>Send reset link <ArrowRight size={17} /></Button></form><Link href="/sign-in" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)] hover:underline"><ArrowLeft size={16} />Back to sign in</Link></div>; }
