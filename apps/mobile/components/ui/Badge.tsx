import { type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, createVariant, useStyles, type StyleVariants } from "@styles"

import { Text, type TextProps } from "@components/ui/Text"

export type BadgeProps = StyleVariants<typeof badgeStyles, "badge"> & {
  children?: ReactNode
  title?: string
  style?: StyleProp<ViewStyle>
  textProps?: TextProps
}

const Badge = ({ variant = "default", children, title, style, textProps }: BadgeProps) => {
  const styles = useStyles(badgeStyles)

  return (
    <View style={[styles.badge({ variant }), style]}>
      {children ? (
        children
      ) : title ? (
        <Text style={[styles.badgeText({ variant }), textProps?.style]} {...textProps}>
          {title}
        </Text>
      ) : null}
    </View>
  )
}

const badgeStyles = createStyleSheet(({ theme }) => ({
  badge: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radius("full"),
      borderWidth: theme.borderWidth(),
      paddingHorizontal: theme.space(2),
      paddingVertical: theme.space(1),
      gap: theme.space(1)
    },
    variants: {
      variant: {
        default: {
          backgroundColor: theme.colors.primary,
          borderColor: "transparent"
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderColor: "transparent"
        },
        muted: {
          backgroundColor: theme.colors.muted,
          borderColor: "transparent"
        },
        destructive: {
          backgroundColor: theme.colors.destructive,
          borderColor: "transparent"
        },
        outline: {
          backgroundColor: "transparent",
          borderColor: theme.colors.border
        },
        info: {
          backgroundColor: theme.colors.info,
          borderColor: "transparent"
        },
        warning: {
          backgroundColor: theme.colors.warning,
          borderColor: "transparent"
        },
        error: {
          backgroundColor: theme.colors.error,
          borderColor: "transparent"
        },
        success: {
          backgroundColor: theme.colors.success,
          borderColor: "transparent"
        }
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }),
  badgeText: createVariant({
    base: {
      fontSize: theme.fontSize("xs"),
      fontFamily: "SpaceGrotesk-Medium"
    },
    variants: {
      variant: {
        default: {
          color: theme.colors.primaryForeground
        },
        secondary: {
          color: theme.colors.secondaryForeground
        },
        muted: {
          color: theme.colors.mutedForeground
        },
        destructive: {
          color: theme.colors.destructiveForeground
        },
        outline: {
          color: theme.colors.foreground
        },
        info: {
          color: theme.colors.infoForeground
        },
        warning: {
          color: theme.colors.warningForeground
        },
        error: {
          color: theme.colors.errorForeground
        },
        success: {
          color: theme.colors.successForeground
        }
      }
    },
    defaultVariants: {
      variant: "default"
    }
  })
}))

export { Badge }
