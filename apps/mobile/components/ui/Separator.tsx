import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, createVariant, useStyles, type StyleVariants } from "@styles"

export type SeparatorProps = StyleVariants<typeof separatorStyles, "separator"> & {
  style?: StyleProp<ViewStyle>
  decorative?: boolean
}

const Separator = ({ orientation = "horizontal", style, decorative = true }: SeparatorProps) => {
  const styles = useStyles(separatorStyles)

  return <View style={[styles.separator({ orientation }), style]} accessible={!decorative} />
}

const separatorStyles = createStyleSheet(({ theme }) => ({
  separator: createVariant({
    base: {
      backgroundColor: theme.colors.border
    },
    variants: {
      orientation: {
        horizontal: {
          height: theme.borderWidth(),
          width: "100%"
        },
        vertical: {
          width: theme.borderWidth(),
          height: "100%"
        }
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  })
}))

export { Separator }
