import { useColorTheme } from "@hooks/useColorTheme"

import { fontFamily, fontSize } from "@constants/font"
import { border, borderRadius, iconSize, spacing } from "@constants/styles"

import { ActivityIndicator } from "@components/ui/ActivityIndicator"
import { Icon } from "@components/ui/Icon"

import { Toaster as Sonner, toast } from "sonner-native"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme, colors } = useColorTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      icons={{
        loading: <ActivityIndicator color={colors.primary} size={iconSize.large} />,
        info: <Icon name="Info" color={colors.info} size={iconSize.large} />,
        success: <Icon name="CircleCheck" color={colors.success} size={iconSize.large} />,
        warning: <Icon name="TriangleAlert" color={colors.warning} size={iconSize.large} />,
        error: <Icon name="CircleAlert" color={colors.error} size={iconSize.large} />
      }}
      toastOptions={{
        titleStyle: { fontFamily: fontFamily["bold"], fontSize: fontSize.medium },
        descriptionStyle: { fontFamily: fontFamily["regular"], fontSize: fontSize.small },
        style: {
          backgroundColor: colors.background,
          borderWidth: border.thin,
          borderColor: colors.muted,
          borderRadius: borderRadius.xSmall,
          marginHorizontal: spacing.small,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0
          },
          elevation: 0
        },
        actionButtonStyle: {
          borderRadius: borderRadius.xSmall,
          backgroundColor: colors.primary,
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.large
        },
        actionButtonTextStyle: { fontFamily: fontFamily["bold"], fontSize: fontSize.medium },
        cancelButtonStyle: {
          borderRadius: borderRadius.xSmall,
          backgroundColor: colors.muted,
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.large
        },
        cancelButtonTextStyle: { fontFamily: fontFamily["bold"], fontSize: fontSize.medium }
      }}
      closeButton
      position="bottom-center"
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { toast, Toaster }
