import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]", {
  variants: {
    variant: {
      default: "bg-[var(--brand)] text-white shadow-[0_6px_14px_rgba(65,87,233,.2)] hover:bg-[var(--brand-strong)]",
      secondary: "bg-[var(--muted-surface)] text-[var(--foreground)] hover:brightness-95",
      outline: "border bg-transparent text-[var(--foreground)] hover:bg-[var(--muted-surface)]",
      ghost: "text-[var(--muted)] hover:bg-[var(--muted-surface)] hover:text-[var(--foreground)]",
      destructive: "bg-[var(--danger)] text-white hover:brightness-95",
    },
    size: { default: "h-10 px-4", sm: "h-8 rounded-lg px-3 text-xs", lg: "h-11 px-5", icon: "h-10 w-10 px-0" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { loading?: boolean; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, children, disabled, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
    {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-label="Loading" />}
    {children}
  </button>
));
Button.displayName = "Button";
export { buttonVariants };
