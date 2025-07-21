import { type ComponentProps, Fragment, type ReactNode } from "react"

import { cn } from "@lib/utils"

import { type Key } from "ts-key-enum"

const DefaultKbdSeparator = ({ className, children = "+", ...props }: ComponentProps<"span">) => (
  <span className={cn("text-muted-foreground/50", className)} {...props}>
    {children}
  </span>
)

const Kbd = ({
  className,
  separator = <DefaultKbdSeparator />,
  children,
  ...props
}: ComponentProps<"span"> & {
  separator?: ReactNode
}) => (
  <span
    className={cn(
      "inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 align-middle font-mono text-[10px] font-medium leading-loose text-muted-foreground",
      className
    )}
    {...props}
  >
    {Array.isArray(children)
      ? children.map((child, index) => (
          <Fragment key={index}>
            {child}
            {index < children.length - 1 && separator}
          </Fragment>
        ))
      : children}
  </span>
)

const KbdKey = ({
  className,
  ...props
}: Omit<ComponentProps<"kbd">, "aria-label"> & {
  "aria-label"?: keyof typeof Key | (string & {})
}) => <kbd {...props} />

export { Kbd, KbdKey }
