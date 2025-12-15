import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

export type ContainerProps = ComponentProps<"div">

const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-[1955px]", className)}
      {...props}
    />
  )
}

export { Container }
