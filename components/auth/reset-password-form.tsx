"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const schema = z.object({ password: z.string().min(10, "Use at least 10 characters."), confirmation: z.string() }).refine((data) => data.password === data.confirmation, { path: ["confirmation"], message: "Passwords do not match." }); type Values = z.infer<typeof schema>;
export function ResetPasswordForm() { const router = useRouter(); const params = useSearchParams(); const token = params.get("token"); const invalid = params.get("error") === "INVALID_TOKEN" || !token; const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) }); const submit = async (values: Values) => { if (!token) return; const { error } = await authClient.resetPassword({ newPassword: values.password, token }); if (error) { toast.error(error.message ?? "This reset link is invalid or expired."); return; } toast.success("Password reset. You can now sign in."); router.replace("/sign-in"); };
if (invalid) return <div><h1 className="text-3xl font-black tracking-[-.045em]">This link has expired</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Password reset links are short-lived and can only be used once. Request a new one to continue.</p><Link href="/forgot-password" className="mt-7 inline-flex rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-bold text-white">Request a new link</Link></div>;
return <div><div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-500/10 text-[var(--brand)]"><ShieldCheck size={23} /></div><h1 className="text-3xl font-black tracking-[-.045em]">Choose a new password</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Use a unique password with at least 10 characters.</p><form noValidate onSubmit={handleSubmit(submit)} className="mt-7 space-y-5"><div className="space-y-2"><Label htmlFor="password">New password</Label><Input id="password" type="password" autoComplete="new-password" {...register("password")} />{errors.password && <p className="text-xs font-medium text-[var(--danger)]">{errors.password.message}</p>}</div><div className="space-y-2"><Label htmlFor="confirmation">Confirm new password</Label><Input id="confirmation" type="password" autoComplete="new-password" {...register("confirmation")} />{errors.confirmation && <p className="text-xs font-medium text-[var(--danger)]">{errors.confirmation.message}</p>}</div><Button className="w-full" size="lg" loading={isSubmitting}>Save new password <ArrowRight size={17} /></Button></form></div>; }
