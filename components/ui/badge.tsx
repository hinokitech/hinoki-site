import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui badge as a small mono pill, in the live site's rounded shapes.
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em]",
  {
    variants: {
      variant: {
        real: "border-accent/40 bg-accent/10 text-accent",
        simulation: "border-dashed border-edge-strong text-fg-secondary",
        status: "border-edge text-fg-tertiary",
        done: "border-transparent bg-accent/15 text-accent",
        live: "border-accent/40 text-fg-primary",
      },
    },
    defaultVariants: { variant: "status" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
