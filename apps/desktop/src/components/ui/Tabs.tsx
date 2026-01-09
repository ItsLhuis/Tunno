"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    data-slot="tabs"
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
)

const TabsList = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-sidebar/75 text-muted-foreground border-input inline-flex h-9 w-fit items-center justify-center rounded border p-0.75",
        className
      )}
      {...props}
    />
  )
}

const TabsTrigger = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground inline-flex cursor-default items-center justify-center rounded border border-transparent p-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

const TabsContent = ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
