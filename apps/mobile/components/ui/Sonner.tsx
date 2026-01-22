import { type ComponentProps } from "react"

import { createStyleSheet, useStyles, useTheme, zIndexTokens } from "@styles"

import { Toaster as SonnerToaster, toast } from "sonner-native"

import { Icon } from "@components/ui/Icon"
import { Spinner } from "@components/ui/Spinner"

type ToasterProps = ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  const styles = useStyles(sonnerStyles)

  const { theme, runtime } = useTheme()

  const currentTheme = runtime.colorScheme === "dark" ? "dark" : "light"

  return (
    <SonnerToaster
      theme={currentTheme as ToasterProps["theme"]}
      icons={{
        loading: <Spinner size="lg" color="primary" />,
        info: <Icon name="Info" color="info" size="lg" />,
        success: <Icon name="CircleCheck" color="success" size="lg" />,
        warning: <Icon name="TriangleAlert" color="warning" size="lg" />,
        error: <Icon name="CircleAlert" color="error" size="lg" />
      }}
      gap={theme.space(2)}
      toastOptions={{
        toastContainerStyle: styles.toastContainer,
        style: styles.toast,
        titleStyle: styles.title,
        descriptionStyle: styles.description,
        buttonsStyle: styles.buttons,
        actionButtonStyle: styles.actionButton,
        actionButtonTextStyle: styles.actionButtonText,
        cancelButtonStyle: styles.cancelButton,
        cancelButtonTextStyle: styles.cancelButtonText
      }}
      position="top-center"
      closeButton
      {...props}
    />
  )
}

const sonnerStyles = createStyleSheet(({ theme }) => ({
  toastContainer: {
    zIndex: zIndexTokens[50]
  },
  toast: {
    backgroundColor: theme.colors.background,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.muted,
    borderRadius: theme.radius(),
    marginHorizontal: theme.space(2),
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 0
  },
  title: {
    fontFamily: "SpaceGrotesk-Bold",
    fontSize: theme.fontSize(),
    color: theme.colors.foreground,
    marginTop: 2
  },
  description: {
    fontFamily: "SpaceGrotesk-Regular",
    fontSize: theme.fontSize("xs"),
    color: theme.colors.mutedForeground
  },
  buttons: {
    flexDirection: "row-reverse" as const,
    gap: theme.space(2)
  },
  actionButton: {
    borderRadius: theme.radius(),
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.space(2),
    paddingHorizontal: theme.space(4)
  },
  actionButtonText: {
    fontFamily: "SpaceGrotesk-Bold",
    fontSize: theme.fontSize("base")
  },
  cancelButton: {
    borderRadius: theme.radius(),
    backgroundColor: theme.colors.muted,
    paddingVertical: theme.space(2),
    paddingHorizontal: theme.space(4)
  },
  cancelButtonText: {
    fontFamily: "SpaceGrotesk-Bold",
    fontSize: theme.fontSize("base")
  }
}))

export { toast, Toaster }
