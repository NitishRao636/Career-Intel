"use client";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function RefreshButton() { const router = useRouter(); const [loading, setLoading] = useState(false); return <Button variant="outline" size="sm" loading={loading} onClick={() => { setLoading(true); router.refresh(); setTimeout(() => setLoading(false), 500); }}><RefreshCw size={14} />Refresh</Button>; }
