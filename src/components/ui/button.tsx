import { ComponentProps } from "react"
import { cva, type VariantProps } from "cla
import { cn } from "@/lib/utils"

import { cn } from "@/lib/utils"

          "btn-primary text
          "btn-secondary bg-white border-2 border-transparent shadow-sm",
  {
    variants: {
      variant: {
        primary:
          "btn-primary text-white border-none shadow-sm",
        secondary:
          "btn-secondary bg-white border-2 border-transparent shadow-sm",
        tertiary:
        sm: "btn-small rounded-md text-[var(--caption-size
        lg: "btn-lar
      },
        true: "b
      },
    defaultVaria
      size: "md",
    },
)
function Butto
  variant,
  asChild = fa
}: ComponentProps<"button"> &
    asCh
  const Comp 
  return (
        sm: "btn-small rounded-md text-[var(--caption-size)]",
        md: "btn-medium rounded-md text-[var(--body-size)]",
        lg: "btn-large rounded-md text-[var(--body-size)]",
        icon: "w-9 h-9 p-0 rounded-md",
      },
      disabled: {
        true: "btn-disabled opacity-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp








