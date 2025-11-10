import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

const Card = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-md border bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

const CardHeader = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} className={cn("flex flex-col p-6", className)} {...props} />
}

const CardTitle = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
}

const CardContent = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
}

const CardFooter = ({ className, ref, ...props }: ComponentProps<"div">) => {
  return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
