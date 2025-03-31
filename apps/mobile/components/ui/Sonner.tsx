import { type ComponentProps } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { ActivityIndicator } from "@components/ui/ActivityIndicator"
import { Icon } from "@components/ui/Icon"

import { Toaster as Sonner, toast } from "sonner-native"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { appTheme, colors } = useColorTheme()

  return (
    <Sonner
      theme={appTheme as ToasterProps["theme"]}
      icons={{
        loading: (
          <ActivityIndicator
            color={colors.primary}
            size={theme.styles.icon.size.large}
            style={{ alignSelf: "flex-start" }}
          />
        ),
        info: <Icon name="Info" color={colors.info} size={theme.styles.icon.size.large} />,
        success: (
          <Icon name="CircleCheck" color={colors.success} size={theme.styles.icon.size.large} />
        ),
        warning: (
          <Icon name="TriangleAlert" color={colors.warning} size={theme.styles.icon.size.large} />
        ),
        error: <Icon name="CircleAlert" color={colors.error} size={theme.styles.icon.size.large} />
      }}
      toastOptions={{
        style: {
          backgroundColor: colors.background,
          borderWidth: theme.styles.border.thin,
          borderColor: colors.muted,
          borderRadius: theme.styles.borderRadius.xSmall,
          marginHorizontal: theme.styles.spacing.small,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0
          },
          elevation: 0
        },
        titleStyle: {
          fontFamily: theme.font.family["bold"],
          fontSize: theme.font.size.large,
          marginTop: 2
        },
        descriptionStyle: {
          fontFamily: theme.font.family["regular"],
          fontSize: theme.font.size.small
        },
        buttonsStyle: {
          flexDirection: "row-reverse",
          gap: theme.styles.spacing.xSmall
        },
        actionButtonStyle: {
          borderRadius: theme.styles.borderRadius.xSmall,
          backgroundColor: colors.primary,
          paddingVertical: theme.styles.spacing.small,
          paddingHorizontal: theme.styles.spacing.large
        },
        actionButtonTextStyle: {
          fontFamily: theme.font.family["bold"],
          fontSize: theme.font.size.medium
        },
        cancelButtonStyle: {
          borderRadius: theme.styles.borderRadius.xSmall,
          backgroundColor: colors.muted,
          paddingVertical: theme.styles.spacing.small,
          paddingHorizontal: theme.styles.spacing.large
        },
        cancelButtonTextStyle: {
          fontFamily: theme.font.family["bold"],
          fontSize: theme.font.size.medium
        }
      }}
      position="bottom-center"
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { toast, Toaster }
