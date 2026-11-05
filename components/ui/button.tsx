import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui button in the live site's pill style: the orange one glows. Dark
// text on orange (5.8:1, Sal's call). Use buttonVariants on <a> for link buttons.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[0.01em] transition-[background-color,border-color,color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "glow-button bg-accent-fill text-accent-ink hover:bg-accent-fill-hover",
        outline:
          "border border-edge bg-tint text-fg-primary hover:border-accent/40 hover:bg-accent/10 hover:text-accent",
        ghost: "text-fg-secondary hover:text-fg-primary",
      },
      size: {
        default: "h-12 px-8 text-[14px]",
        sm: "h-9 px-5 text-[12px]",
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
