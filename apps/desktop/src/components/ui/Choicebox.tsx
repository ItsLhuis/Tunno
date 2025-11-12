"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { type VariantProps } from "class-variance-authority"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { buttonVariants } from "@components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/Card"
import { Icon } from "@components/ui/Icon"
import { RadioGroup } from "@components/ui/RadioGroup"

const Choicebox = ({ className, ...props }: ComponentProps<typeof RadioGroup>) => (
  <RadioGroup className={cn("w-full", className)} data-slot="choicebox" {...props} />
)

export type ChoiceboxItemProps = ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof buttonVariants>

const ChoiceboxItem = ({
  className,
  variant = "outline",
  size,
  children,
  ...props
}: ChoiceboxItemProps) => (
  <RadioGroupPrimitive.Item
    className="text-left transition-colors focus:ring-0 focus:outline-hidden"
    asChild
    {...props}
  >
    <Card
      data-slot="choicebox-item"
      className={cn(
        buttonVariants({ variant, size, className }),
        "flex h-auto flex-row items-center justify-between rounded-md p-3 outline-hidden transition-all"
      )}
    >
      {children}
    </Card>
  </RadioGroupPrimitive.Item>
)

const ChoiceboxItemHeader = ({ className, ...props }: ComponentProps<typeof CardHeader>) => (
  <CardHeader
    data-slot="choicebox-item-header"
    className={cn("flex-1 gap-0 p-0", className)}
    {...props}
  />
)

const ChoiceboxItemTitle = ({ className, ...props }: ComponentProps<typeof CardTitle>) => (
  <CardTitle
    data-slot="choicebox-item-title"
    className={cn("flex items-center gap-2 text-sm", className)}
    {...props}
  />
)

const ChoiceboxItemSubtitle = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    data-slot="choicebox-item-subtitle"
    className={cn("text-muted-foreground text-xs font-normal", className)}
    {...props}
  />
)

const ChoiceboxItemDescription = ({
  className,
  ...props
}: ComponentProps<typeof CardDescription>) => (
  <CardDescription
    data-slot="choicebox-item-description"
    className={cn("text-sm", className)}
    {...props}
  />
)

const ChoiceboxItemContent = ({ className, ...props }: ComponentProps<typeof CardContent>) => (
  <CardContent
    data-slot="choicebox-item-content"
    className={cn(
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border p-0 outline-hidden transition-colors focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
)

const ChoiceboxItemIndicator = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Indicator>) => (
  <RadioGroupPrimitive.Indicator data-slot="choicebox-item-indicator" {...props}>
    <Icon name="Circle" className={cn("fill-primary size-2", className)} />
  </RadioGroupPrimitive.Indicator>
)

export {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle
}
