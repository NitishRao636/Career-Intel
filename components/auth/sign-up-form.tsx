"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({ name: z.string().trim().min(2, "Enter your full name.").max(80), email: z.email("Enter a valid work email."), password: z.string().min(10, "Use at least 10 characters.").max(128) });
type Values = z.infer<typeof schema>;
export function SignUpForm() {
  const router = useRouter(); const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const submit = async (values: Values) => {
    const { error } = await authClient.signUp.email({ ...values, callbackURL: "/onboarding" });
    if (error) { toast.error(error.message ?? "Unable to create your account."); return; }
    router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
  };
  return <div><div className="mb-8"><p className="text-sm font-semibold text-[var(--brand)]">Start your workspace</p><h1 className="mt-2 text-3xl font-black tracking-[-.045em]">Build a calmer operation</h1><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Create your secure account. We’ll set up your first business next.</p></div>
    <form noValidate onSubmit={handleSubmit(submit)} className="space-y-5"><div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" autoComplete="name" placeholder="Aarav Sharma" aria-invalid={!!errors.name} {...register("name")} />{errors.name && <p className="text-xs font-medium text-[var(--danger)]">{errors.name.message}</p>}</div><div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register("email")} />{errors.email && <p className="text-xs font-medium text-[var(--danger)]">{errors.email.message}</p>}</div><div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" className="pr-11" aria-invalid={!!errors.password} {...register("password")} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="focus-ring absolute inset-y-0 right-1 grid w-9 place-items-center rounded-lg text-[var(--muted)]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><p className="text-xs text-[var(--muted)]">At least 10 characters. A password manager is recommended.</p>{errors.password && <p className="text-xs font-medium text-[var(--danger)]">{errors.password.message}</p>}</div><Button className="w-full" size="lg" loading={isSubmitting}>Create secure account <ArrowRight size={17} /></Button></form>
    <p className="mt-7 text-center text-sm text-[var(--muted)]">Already have an account? <Link className="font-bold text-[var(--brand)] hover:underline" href="/sign-in">Sign in</Link></p><p className="mt-5 text-center text-xs leading-5 text-[var(--muted)]">By continuing, you agree to your organization’s data and acceptable-use policies.</p>
  </div>;
}
