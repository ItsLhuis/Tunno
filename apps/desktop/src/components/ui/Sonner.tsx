import { useTheme } from "@contexts/ThemeContext"

import { Icon } from "@components/ui/Icon"
import { Loader } from "@components/ui/Loader"

import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

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
      icons={{
        close: <Icon name="X" className="size-3" />,
        loading: <Loader />,
        info: <Icon name="Info" className="size-4 text-info" />,
        success: <Icon name="CircleCheck" className="size-4 text-success" />,
        warning: <Icon name="TriangleAlert" className="size-4 text-warning" />,
        error: <Icon name="CircleAlert" className="size-4 text-error" />
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg transition-all",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "!bg-background !border-border !transition-colors"
        }
      }}
      closeButton
      position="bottom-center"
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { toast, Toaster }
