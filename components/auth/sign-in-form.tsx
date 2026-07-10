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

const schema = z.object({ email: z.email("Enter a valid email address."), password: z.string().min(1, "Password is required.") });
type Values = z.infer<typeof schema>;

export function SignInForm() {
  const router = useRouter(); const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const submit = async (values: Values) => {
    const { error } = await authClient.signIn.email({ ...values, callbackURL: "/dashboard" });
    if (error) { toast.error(error.message ?? "Unable to sign in. Check your credentials."); return; }
    router.replace("/dashboard"); router.refresh();
  };
  return <div><div className="mb-8"><p className="text-sm font-semibold text-[var(--brand)]">Welcome back</p><h1 className="mt-2 text-3xl font-black tracking-[-.045em]">Sign in to your workspace</h1><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Use your verified work email to continue.</p></div>
    <form noValidate onSubmit={handleSubmit(submit)} className="space-y-5">
      <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register("email")} />{errors.email && <p className="text-xs font-medium text-[var(--danger)]">{errors.email.message}</p>}</div>
      <div className="space-y-2"><div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><Link className="text-xs font-bold text-[var(--brand)] hover:underline" href="/forgot-password">Forgot password?</Link></div><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" className="pr-11" aria-invalid={!!errors.password} {...register("password")} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="focus-ring absolute inset-y-0 right-1 grid w-9 place-items-center rounded-lg text-[var(--muted)]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{errors.password && <p className="text-xs font-medium text-[var(--danger)]">{errors.password.message}</p>}</div>
      <Button className="w-full" size="lg" loading={isSubmitting}>Sign in <ArrowRight size={17} /></Button>
    </form>
    <p className="mt-7 text-center text-sm text-[var(--muted)]">New to Business Operations OS? <Link className="font-bold text-[var(--brand)] hover:underline" href="/sign-up">Create an account</Link></p>
  </div>;
}
