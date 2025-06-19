import { type ComponentProps } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { Icon } from "@components/ui/Icon"
import { Spinner } from "@components/ui/Spinner"

import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      style={{
        fontFamily:
          '"Space Grotesk", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      }}
      className="toaster group"
      offset={"0.75rem"}
      icons={{
        close: <Icon name="X" className="size-3" />,
        loading: <Spinner />,
        info: <Icon name="Info" className="size-4 text-info" />,
        success: <Icon name="CircleCheck" className="size-4 text-success" />,
        warning: <Icon name="TriangleAlert" className="size-4 text-warning" />,
        error: <Icon name="CircleAlert" className="size-4 text-error" />
      }}
      toastOptions={{
        classNames: {
          toast:
            "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:gap-2 group-[.toaster]:grid group-[.toaster]:grid-cols-[auto_1fr_auto] has-[button:not([data-close-button='true'])]:group-[.toaster]:grid-rows-[auto_1fr_auto] has-[:not(button[data-close-button='true'])]:group-[.toaster]:grid-rows-[auto_1fr] group-[.toaster]:transition-all",
          content: "!col-span-2 !col-start-2 !row-span-2 !row-start-1",
          title: "!font-bold !text-sm",
          description: "!text-muted-foreground !text-xs !transition-colors",
          cancelButton:
            "!cursor-default !h-9 !px-4 !py-2 !mt-3 !col-start-2 !row-start-3 !rounded-md !bg-accent !text-accent-foreground hover:!bg-accent/80 focus-visible:!bg-accent/80 focus:!outline-none focus:!ring-0 !transition-colors",
          actionButton:
            "!cursor-default !h-9 !px-4 !py-2 !mt-3 col-start-3 row-start-3 !rounded-md !bg-primary !text-primary-foreground hover:!text-primary-foreground/90 hover:!bg-primary/80 focus-visible:!bg-primary/80 focus:!outline-none focus:!ring-0 !transition-colors",
          closeButton:
            "!cursor-default !border-border !bg-background !text-accent-foreground hover:!bg-accent/80 focus-visible:!bg-accent/80 focus:!outline-none focus:!ring-0 !transition-colors"
        }
      }}
      closeButton
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { toast, Toaster }
