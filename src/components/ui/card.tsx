import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Fixture, type FixtureType, type FixtureProps } from "@/components/ui/fixture"
import { SKETCH_BORDERS, DOODLE_SHADOWS } from "@/lib/container-tokens"

const cardVariants = cva(
  "relative transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-900",
        white: "bg-white text-slate-900",
        paper: "bg-[#fffdf9] text-slate-900",
        yellow: "bg-yellow-100 text-slate-900",
        blue: "bg-sky-100 text-slate-900",
        pink: "bg-rose-100 text-slate-900",
        green: "bg-emerald-100 text-slate-900",
        slate: "bg-slate-900 text-white",
        dark: "bg-slate-900 text-white",
        dashed: "bg-[#fffdf9] text-slate-900",
      },
      borderStyle: SKETCH_BORDERS,
      shadowStyle: DOODLE_SHADOWS,
    },
    defaultVariants: {
      variant: "default",
      borderStyle: "default",
      shadowStyle: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Optional physical fastener / fixture attaching card to the notebook paper.
   */
  fixture?: FixtureType;
  /**
   * Optional granular properties for the attached fixture (color, position, orientation, etc.)
   */
  fixtureProps?: Omit<FixtureProps, 'type'>;
  /**
   * Optional class name for the outer isolation wrapper (e.g. for custom grid or wrapper placement).
   */
  wrapperClassName?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, borderStyle, shadowStyle, fixture, fixtureProps, wrapperClassName, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative isolate transition-all duration-300",
        wrapperClassName
      )}
      style={style}
    >
      {/* Fixture Layers: Layer 1 Back (z-0) and Layer 3 Front (z-20) */}
      {fixture && fixture !== 'none' && (
        <Fixture type={fixture} {...fixtureProps} />
      )}
      {/* Layer 2: Card Surface & Content (relative z-10) with solid background & border */}
      <div
        className={cn(
          cardVariants({
            variant,
            borderStyle: variant === 'dashed' ? 'dashed' : borderStyle,
            shadowStyle,
          }),
          "p-6 relative z-10 w-full h-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-0.75 font-bold tracking-tight text-slate-900 font-sans", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-0.5 text-slate-600 font-normal", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-3", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
