import { type ReactNode } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { StyleProp, View, ViewStyle } from "react-native"

import { Text, type TextProps } from "@components/ui/Text"

export type ListItemTextProps = {
  title: ReactNode
  description?: string | null | undefined
  style?: StyleProp<ViewStyle>
  titleProps?: TextProps
  descriptionProps?: TextProps
}

const ListItemText = ({
  title,
  description,
  style,
  titleProps,
  descriptionProps
}: ListItemTextProps) => {
  const { colors } = useColorTheme()

  return (
    <View style={[{ flex: 1, gap: theme.styles.spacing.xxSmall }, style]}>
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

export { ListItemText }
