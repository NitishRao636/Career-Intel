import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("focus-ring flex h-10 w-full rounded-xl border bg-[var(--surface-solid)] px-3 text-sm text-[var(--foreground)] shadow-sm outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
));
Input.displayName = "Input";
