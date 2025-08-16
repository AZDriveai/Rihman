"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Toggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked="false"
    ref={ref}
    className={cn(
      "inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=on]:bg-primary",
      className
    )}
    {...props}
  />
))
Toggle.displayName = "Toggle"

export { Toggle }
