import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-transparent px-2 py-0.5 text-xs font-medium transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        // Light-base outline: hairline border, ink text.
        outline:
          "border-[hsl(var(--border))] text-foreground hover:bg-black/[0.03] hover:text-foreground",
        ghost: "hover:bg-black/[0.04] hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // ── Alchemyst brand variants ───────────────────────────────
        orange:
          "rounded border border-[#F49025]/25 bg-[#F49025]/10 text-[#7c4a09] font-mono uppercase tracking-wide",
        teal:
          "rounded border border-[#128F8B]/25 bg-[#128F8B]/10 text-[#0B6E6B] font-mono uppercase tracking-wide",
        neutral:
          "rounded border border-[#E2E8F0] bg-[#F1F5F9] text-[#334155] font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
