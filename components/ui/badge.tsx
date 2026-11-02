import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui badge as the console's status chip.
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 font-label text-[10px] uppercase leading-none tracking-[0.14em]",
  {
    variants: {
      variant: {
        real: "border-accent/50 bg-accent/[0.06] text-accent",
        simulation: "border-dashed border-faint text-muted",
        status: "border-white/[0.08] text-faint",
        live: "border-accent/40 text-ink",
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
