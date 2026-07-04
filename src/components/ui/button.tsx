import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-4 py-2 text-sm font-medium outline-none transition-all cursor-pointer select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Light-base default: orange fill, ink text (was already correct).
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Outline: hairline border on light, ink text, paper hover.
        outline:
          "border-[hsl(var(--border))] bg-transparent text-foreground hover:bg-black/[0.03] hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        // Ghost: transparent → subtle paper wash on hover (light-aware).
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-black/[0.04] hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        // ── Alchemyst brand variants ──────────────────────────────────
        orange:
          "bg-[#F49025] text-white border-transparent shadow-[0_8px_24px_-8px_rgba(244,144,37,0.6)] hover:bg-[#e07f17] hover:shadow-[0_10px_28px_-8px_rgba(244,144,37,0.7)]",
        teal:
          "bg-[#128F8B] text-white border-transparent shadow-[0_8px_24px_-8px_rgba(18,143,139,0.55)] hover:bg-[#0B6E6B]",
        "brand-outline":
          "border-[#F49025]/40 text-[#F49025] bg-transparent hover:bg-[#F49025]/10 hover:border-[#F49025]/60",
        light:
          "bg-white text-[#0F172A] border-[#E5E7EB] hover:bg-[#F7F4EE] shadow-sm",
      },
      size: {
        default: "h-10 gap-2 px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem]",
        lg: "h-9 gap-1.5 px-2.5",
        icon: "size-8",
        "icon-xs": "size-6 rounded-md",
        "icon-sm": "size-7 rounded-md",
        "icon-lg": "size-9",
        // ── Alchemyst brand sizes (taller pill CTAs) ──────────────────
        brand: "h-11 gap-2 rounded-lg px-6 text-sm font-semibold",
        "brand-sm": "h-9 gap-1.5 rounded-lg px-4 text-sm font-medium",
        full: "h-auto w-full gap-2 rounded-xl px-5 py-3.5 text-base font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
