import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

export type CardProps = ComponentProps<"div">

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground border-border flex flex-col items-start gap-3 rounded border p-3",
        className
      )}
      {...props}
    />
  )
}

export type CardHeaderProps = ComponentProps<"div">

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

export type CardTitleProps = ComponentProps<"div">

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <div
      data-slot="card-title"
      className={cn("flex flex-row items-center gap-2 leading-none font-semibold", className)}
      {...props}
    />
  )
}

export type CardDescriptionProps = ComponentProps<"div">

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return <div data-slot="card-description" className={cn("text-sm", className)} {...props} />
}

export type CardActionProps = ComponentProps<"div">

const CardAction = ({ className, ...props }: CardActionProps) => {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

export type CardContentProps = ComponentProps<"div">

const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />
}

export type CardFooterProps = ComponentProps<"div">

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
