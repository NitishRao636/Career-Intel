import { Boxes, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return <main className="grid min-h-screen lg:grid-cols-[1.08fr_.92fr]">
    <section className="grid-pattern relative hidden overflow-hidden bg-[var(--surface-solid)] p-10 lg:flex lg:flex-col">
      <div className="absolute -left-20 top-24 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
      <Link href="/" className="relative flex items-center gap-2 text-sm font-extrabold tracking-[-.03em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand)] text-white"><Boxes size={17} /></span>BUSINESS OPERATIONS OS</Link>
      <div className="relative my-auto max-w-lg pb-12">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"><Sparkles size={14} className="text-indigo-500" />The command center for growing teams</div>
        <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-[-.055em]">Run the entire business from one calm, connected workspace.</h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-[var(--muted)]">Sales, inventory, finance and people operations—designed to work together from day one.</p>
        <ul className="mt-9 space-y-4 text-sm font-medium text-[var(--muted)]">
          {["Role-based access and complete audit history", "Real-time operational visibility across every team", "Built for GST-ready Indian businesses and beyond"].map((item) => <li key={item} className="flex items-center gap-3"><CheckCircle2 size={18} className="shrink-0 text-emerald-500" />{item}</li>)}
        </ul>
      </div>
      <p className="relative flex items-center gap-2 text-xs text-[var(--muted)]"><ShieldCheck size={15} />Enterprise-grade security by design</p>
    </section>
    <section className="relative flex items-center justify-center p-5 sm:p-8">
      <Link href="/" className="absolute left-6 top-6 flex items-center gap-2 text-sm font-extrabold tracking-[-.03em] lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand)] text-white"><Boxes size={17} /></span>BOOS</Link>
      <div className="w-full max-w-[420px] pt-12 lg:pt-0">{children}</div>
    </section>
  </main>;
}
