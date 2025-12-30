import { type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { Text } from "@components/ui"

export type SettingButtonProps = {
  title: string | ReactNode
  description?: string | ReactNode
  renderLeft?: () => ReactNode
  renderRight?: () => ReactNode
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

const SettingButton = ({
  title,
  description,
  renderLeft,
  renderRight,
  style,
  children
}: SettingButtonProps) => {
  const styles = useStyles(settingButtonStyles)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {renderLeft && <View>{renderLeft()}</View>}
        <View style={styles.content}>
          {typeof title === "string" ? (
            <Text variant="h6" numberOfLines={2}>
              {title}
            </Text>
          ) : (
            <View>{title}</View>
          )}
          {description && (
            <View>
              {typeof description === "string" ? (
                <Text size="sm" color="mutedForeground">
                  {description}
                </Text>
              ) : (
                description
              )}
            </View>
          )}
        </View>
        {renderRight && <View>{renderRight()}</View>}
      </View>
      {children}
    </View>
  )
}

const settingButtonStyles = createStyleSheet(({ theme }) => ({
  container: {
    width: "100%",
    gap: theme.space()
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.space("sm")
  },
  content: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { SettingButton }
