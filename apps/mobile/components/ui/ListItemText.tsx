import { useColorTheme } from "@hooks/useColorTheme"

import { spacing } from "@constants/styles"

import { View, StyleProp, ViewStyle } from "react-native"

import { Text, type TextProps } from "@components/ui/Text"

export type ListItemTextProps = {
  title?: string | null | undefined
  description?: string | null | undefined
  containerStyle?: StyleProp<ViewStyle>
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
  const { colors } = useColorTheme()

  return (
    <View style={[{ flex: 1, gap: spacing.xxSmall / 2 }, containerStyle]}>
      <Text variant="bold" size={titleProps?.size || "medium"} {...titleProps}>
        {title}
      </Text>
      <Text style={[{ color: colors.placeholder }]} size={descriptionProps?.size || "small"} {...descriptionProps}>
        {description}
      </Text>
    </View>
  )
}
ListItemText.displayName = "ListItemText"
