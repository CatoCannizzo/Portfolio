import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center sketch-box-sm px-2.5 py-0.5 text-xs font-sketch tracking-wide transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white border-slate-900",
        yellow:
          "bg-yellow-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        blue:
          "bg-sky-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        pink:
          "bg-rose-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        green:
          "bg-emerald-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        outline:
          "bg-white text-slate-800 border-slate-800",
        tape:
          "bg-yellow-100 text-slate-800 border-dashed border-slate-400 rotate-[-1deg]",
      },
    },
    defaultVariants: {
      variant: "yellow",
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
