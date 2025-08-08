"use client"

import { type ComponentProps, type HTMLAttributes } from "react"

import { cn } from "@lib/utils"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/Card"
import { Icon } from "@components/ui/Icon"
import { RadioGroup } from "@components/ui/RadioGroup"

const Choicebox = ({ className, ...props }: ComponentProps<typeof RadioGroup>) => (
  <RadioGroup className={cn("w-full", className)} {...props} />
)

const ChoiceboxItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    className={cn(
      "text-left transition-colors focus:outline-none focus:ring-0",
      '[&[data-state="checked"]]:border-primary'
    )}
    asChild
    {...props}
  >
    <Card
      className={cn(
        "flex flex-row items-center justify-between rounded-md p-4 shadow-none transition-all",
        className
      )}
    >
      {children}
    </Card>
  </RadioGroupPrimitive.Item>
)

const ChoiceboxItemHeader = ({ className, ...props }: ComponentProps<typeof CardHeader>) => (
  <CardHeader className={cn("flex-1 p-0", className)} {...props} />
)

const ChoiceboxItemTitle = ({ className, ...props }: ComponentProps<typeof CardTitle>) => (
  <CardTitle className={cn("flex items-center gap-2 text-sm", className)} {...props} />
)

const ChoiceboxItemSubtitle = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-xs font-normal text-muted-foreground", className)} {...props} />
)

const ChoiceboxItemDescription = ({
  className,
  ...props
}: ComponentProps<typeof CardDescription>) => (
  <CardDescription className={cn("text-sm", className)} {...props} />
)

const ChoiceboxItemContent = ({ className, ...props }: ComponentProps<typeof CardContent>) => (
  <CardContent
    className={cn(
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input p-0 text-primary outline-none transition-[background-color,border-color,opacity] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
)

const ChoiceboxItemIndicator = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Indicator>) => (
  <RadioGroupPrimitive.Indicator {...props}>
    <Icon name="Circle" className={cn("size-2 fill-primary", className)} />
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
