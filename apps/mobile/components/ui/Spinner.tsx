import { ActivityIndicator, type ActivityIndicatorProps, ColorValue, View } from "react-native"

import {
  type ColorKey,
  createStyleSheet,
  createVariant,
  type FontSizeAlias,
  resolveColor,
  useStyles,
  useTheme,
  type StyleVariants
} from "@styles"

export type SpinnerProps = Omit<ActivityIndicatorProps, "size" | "color"> &
  StyleVariants<typeof spinnerStyles, "container"> & {
    size?: FontSizeAlias
    color?: ColorKey | undefined
  }

const Spinner = ({ size = "xl", color, disabled = false, style, ...props }: SpinnerProps) => {
  const styles = useStyles(spinnerStyles)

  const { theme } = useTheme()

  const spinnerSize = theme.fontSize(size)

  const resolvedColor = color ? resolveColor(theme, color) : undefined
  const baseColor = resolvedColor ?? theme.colors.primary
  const spinnerColor: ColorValue = baseColor

  return (
    <View style={[styles.container({ disabled }), style]}>
      <ActivityIndicator size={spinnerSize} color={spinnerColor} {...props} />
    </View>
  )
}

const spinnerStyles = createStyleSheet(({ theme }) => ({
  container: createVariant({
    base: {},
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity(50)
        },
        false: {
          opacity: theme.opacity()
        }
      }
    },
    defaultVariants: {
      disabled: false
    }
  })
}))

export { Spinner }
