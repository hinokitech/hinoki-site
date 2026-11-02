import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui button, restyled for the homepage console: mono labels, 2px radius,
// dark text on orange (5.8:1). Use buttonVariants on <a> for link buttons.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-label uppercase tracking-[0.12em] transition-[background-color,border-color,color,scale] duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-accent-hover",
        outline:
          "border border-white/[0.12] text-ink hover:border-white/30 hover:bg-white/[0.03]",
        ghost: "text-muted hover:text-ink",
      },
      size: {
        default: "h-12 px-6 text-[11px]",
        sm: "h-9 px-4 text-[10px]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
