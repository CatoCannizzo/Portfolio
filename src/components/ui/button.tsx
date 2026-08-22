import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-0.5 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 active:scale-[0.97] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white sketch-box doodle-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-doodle-lg transition-all",
        doodle:
          "bg-white text-slate-900 sketch-box doodle-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-doodle-lg hover:bg-yellow-50 transition-all",
        yellow:
          "bg-yellow-200 text-slate-900 sketch-box doodle-shadow hover:bg-yellow-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-doodle-lg transition-all",
        outline:
          "border-2 border-slate-900 bg-white/80 sketch-box-sm hover:bg-slate-100 text-slate-800",
        ghost:
          "hover:bg-slate-200/60 text-slate-700 hover:text-slate-900 rounded-lg",
        link:
          "text-slate-900 underline-offset-4 hover:underline font-hand text-0.75",
      },
      size: {
        default: "h-line-1.5 px-5 py-line-0.25",
        sm: "h-line-1 px-3.5 text-0.375",
        lg: "h-line-1.5 px-7 text-0.5",
        icon: "h-line-1 w-line-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
