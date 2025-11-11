"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"

import { Icon } from "@components/ui/Icon"

const ContextMenu = ({ ...props }: ComponentProps<typeof ContextMenuPrimitive.Root>) => (
  <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
)

const ContextMenuTrigger = ({ ...props }: ComponentProps<typeof ContextMenuPrimitive.Trigger>) => (
  <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
)

const ContextMenuGroup = ({ ...props }: ComponentProps<typeof ContextMenuPrimitive.Group>) => (
  <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
)

const ContextMenuPortal = ({ ...props }: ComponentProps<typeof ContextMenuPrimitive.Portal>) => (
  <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
)

const ContextMenuSub = ({ ...props }: ComponentProps<typeof ContextMenuPrimitive.Sub>) => (
  <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
)

const ContextMenuRadioGroup = ({
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) => (
  <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />
)

const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <Icon name="ChevronRight" className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

const ContextMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.SubContent>) => {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1",
        className
      )}
      {...props}
    />
  )
}

const ContextMenuContent = ({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Content>) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

const ContextMenuItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) => {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Icon name="Check" className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

const ContextMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Icon name="Circle" className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn("text-foreground px-2 py-1.5 text-sm font-medium data-inset:pl-8", className)}
      {...props}
    />
  )
}

const ContextMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Separator>) => {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

const ContextMenuShortcut = ({ className, ...props }: ComponentProps<"span">) => {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
