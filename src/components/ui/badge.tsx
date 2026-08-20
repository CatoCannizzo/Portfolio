import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 shadow-sm",
        glass:
          "glass-pill border-slate-200/80 bg-white/70 text-slate-700 backdrop-blur-md shadow-sm",
        secondary:
          "border-transparent bg-slate-100 text-slate-800",
        outline:
          "border-slate-300 text-slate-700 bg-white/40",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
