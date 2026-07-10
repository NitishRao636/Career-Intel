"use client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="surface mx-auto mt-16 max-w-lg rounded-2xl p-8 text-center"><AlertCircle className="mx-auto text-rose-500" size={30} /><h2 className="mt-4 text-xl font-black">Dashboard data is unavailable</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Check the database connection and try again. Your source data has not been changed.</p><Button className="mt-6" onClick={reset}><RefreshCw size={16} />Try again</Button></div>; }
