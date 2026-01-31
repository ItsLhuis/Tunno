"use client"

import { type CSSProperties } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { Icon } from "@components/ui/Icon"
import { Spinner } from "@components/ui/Spinner"

import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      style={
        {
          fontFamily:
            '"Space Grotesk", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as CSSProperties
      }
      className="toaster group"
      offset="0.75rem"
      icons={{
        close: <Icon name="X" className="size-3" />,
        loading: <Spinner />,
        info: <Icon name="Info" className="text-info size-4" />,
        success: <Icon name="CircleCheck" className="text-success size-4" />,
        warning: <Icon name="TriangleAlert" className="text-warning size-4" />,
        error: <Icon name="CircleAlert" className="text-error size-4" />
      }}
      toastOptions={{
        classNames: {
          toast:
            "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-none group-[.toaster]:gap-2 group-[.toaster]:grid group-[.toaster]:grid-cols-[auto_1fr_auto] group-[.toaster]:has-[button:not([data-close-button='true'])]:grid-rows-[auto_1fr_auto] group-[.toaster]:has-[:not(button[data-close-button='true'])]:grid-rows-[auto_1fr] group-[.toaster]:transition-all",
          content: "col-span-2 col-start-2 row-span-2 row-start-1 space-y-1",
          title: "font-bold! text-sm",
          description: "text-muted-foreground text-xs",
          cancelButton:
            "cursor-default! h-9 px-4 py-2 mt-3 col-start-2 row-start-3 rounded bg-accent text-accent-foreground hover:bg-accent/80 focus-visible:bg-accent/80 focus:outline-hidden",
          actionButton:
            "cursor-default! h-9 px-4 py-2 mt-3 col-start-3 row-start-3 rounded bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:bg-primary/80 focus:outline-hidden",
          closeButton:
            "cursor-default! border-border bg-background text-accent-foreground hover:text-primary-foreground/90 hover:bg-primary/80 focus-visible:bg-primary/80 focus:outline-hidden"
        }
      }}
      closeButton
      {...props}
    />
  )
}

export { toast, Toaster }
