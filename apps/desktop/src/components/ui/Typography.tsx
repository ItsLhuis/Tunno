import { type ComponentProps, type ElementType } from "react"

import { cn } from "@lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

export const typographyVariants = cva("transition-colors", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "border-l-4 pl-4 text-xs italic text-muted-foreground",
      code: "font-mono text-sm bg-muted rounded p-1",
      pre: "font-mono text-sm bg-muted rounded p-2 overflow-x-auto",
      span: "text-sm"
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg",
      medium: "text-base",
      small: "text-xs leading-none",
      muted: "text-muted-foreground",
      bold: "font-bold",
      italic: "italic",
      removePMargin: "[&:not(:first-child)]:mt-0"
    }
  },
  defaultVariants: {
    affects: "default"
  }
})

const variantToElementMap: Record<string, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  code: "code",
  pre: "pre",
  span: "span"
}

type TypographyVariants = VariantProps<typeof typographyVariants>

type AffectType = NonNullable<TypographyVariants["affects"]>

export type TypographyProps = ComponentProps<"span"> &
  Omit<TypographyVariants, "affects"> & {
    variant?: NonNullable<TypographyVariants["variant"]>
    affects?: AffectType | AffectType[]
  }

const Typography = ({
  className,
  variant = "span",
  affects = "default",
  ref,
  ...props
}: TypographyProps) => {
  const affectsArray = Array.isArray(affects) ? affects : [affects]
  const affectsClasses = affectsArray.map((affect) => typographyVariants({ affects: affect }))

  const Comp = variantToElementMap[variant] || "span"

  return (
    <Comp
      className={cn(typographyVariants({ variant }), ...affectsClasses, className)}
      ref={ref}
      {...props}
    />
  )
}

export { Typography }
