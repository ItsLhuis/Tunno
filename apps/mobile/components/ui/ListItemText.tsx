import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { View, StyleProp, ViewStyle } from "react-native"

import { Text, type TextProps } from "@components/ui/Text"

export type ListItemTextProps = {
  title: string
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
    <View style={[{ flex: 1, gap: theme.styles.spacing.xxSmall }, containerStyle]}>
      <Text
        variant={titleProps?.variant || "bold"}
        size={titleProps?.size || "medium"}
        {...titleProps}
      >
        {title}
      </Text>
      {description && (
        <Text
          style={[{ color: colors.mutedForeground }, descriptionProps?.style]}
          size={descriptionProps?.size || "small"}
          {...descriptionProps}
        >
          {description}
        </Text>
      )}
    </View>
  )
}
ListItemText.displayName = "ListItemText"
