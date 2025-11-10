"use client"

import { type ComponentProps } from "react"

import * as DialogPrimitive from "@radix-ui/react-dialog"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { IconButton } from "@components/ui/IconButton"
import { Kbd } from "@components/ui/Kbd"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

const DialogContent = ({
  className,
  children,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => {
  const { t } = useTranslation()

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "lg fixed left-[50%] top-[50%] z-50 grid max-h-[90dvh] w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 transition-colors focus:outline-none focus:ring-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          asChild
          className="absolute right-3 top-4 flex cursor-default items-center gap-2 rounded-sm ring-offset-background transition-colors focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <div>
            <Kbd>Esc</Kbd>
            <IconButton tabIndex={-1} tooltip={t("common.close")} variant="ghost" name="X" />
          </div>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const DialogHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("flex flex-col gap-2 text-center transition-colors sm:text-left", className)}
    {...props}
  />
)

const DialogFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col-reverse transition-colors sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)

const DialogTitle = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

const DialogDescription = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
