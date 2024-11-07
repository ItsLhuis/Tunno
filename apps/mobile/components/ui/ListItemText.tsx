import { useThemeColor } from "@hooks/useThemeColor"

import { spacing } from "@constants/styles"

import { ViewStyle } from "react-native"

import { View } from "./View"
import { Text, TextProps } from "./Text"

export type ListItemTextProps = {
  title?: string | null | undefined
  description?: string | null | undefined
  containerStyle?: ViewStyle
  titleProps?: TextProps
  descriptionProps?: TextProps
}

export function ListItemText({
  title,
  description,
  containerStyle,
  titleProps,
  descriptionProps
}: ListItemTextProps) {
  const { colors } = useThemeColor()

  return (
    <View style={[{ flex: 1, gap: spacing.xxSmall }, containerStyle]}>
      <Text variant="bold" {...titleProps}>
        {title}
      </Text>
      <Text style={[{ color: colors.placeholder }]} {...descriptionProps}>
        {description}
      </Text>
    </View>
  )
}
