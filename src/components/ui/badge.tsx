import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center relative sketch-box-sm min-h-line-1 px-3 py-line-0.25 text-0.375 font-sketch tracking-wide transition-all focus:outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "bg-yellow-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        yellow:
          "bg-yellow-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        blue:
          "bg-sky-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        pink:
          "bg-rose-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        green:
          "bg-emerald-200 text-slate-900 border-slate-900 shadow-doodle-sm",
        paper:
          "bg-[#f6f2e8] text-slate-900 border-slate-800 shadow-doodle-sm",
        white:
          "bg-white text-slate-800 border-slate-800",
        outline:
          "bg-white text-slate-800 border-slate-800",
        tape:
          "bg-yellow-100 text-slate-800 border-dashed border-slate-400 rotate-[-1deg]",
        slate:
          "bg-slate-900 text-white border-slate-900",
        dark:
          "bg-slate-900 text-white border-slate-900",
      },
      size: {
        default: "min-h-line-1 px-3 py-line-0.25 text-0.375",
        sm: "min-h-line-0.75 px-2 py-line-0.25 text-0.25",
        lg: "min-h-line-1.5 px-4 py-line-0.5 text-0.5",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
