import { ReactNode } from "react"

import { useThemeColor } from "@hooks/useThemeColor"

import { borderRadius, iconSize, spacing } from "@constants/styles"

import { TouchableOpacity, type TouchableOpacityProps } from "react-native"

import { Text, View, Icon } from "@components/ui"

import { renderContent } from "@utils/renderContent"

export type SettingButtonProps = TouchableOpacityProps & {
  title?: string | null | undefined
  description?: string | null | undefined
  renderLeft?: ReactNode | (() => ReactNode)
  renderRight?: ReactNode | (() => ReactNode)
}

export function SettingButton({
  style,
  title,
  description,
  renderLeft,
  renderRight,
  ...rest
}: SettingButtonProps) {
  const { colors } = useThemeColor()

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        style,
        {
          borderRadius: borderRadius.none,
          width: "100%",
          justifyContent: "flex-start",
          paddingVertical: spacing.small,
          paddingHorizontal: spacing.large
        }
      ]}
      {...rest}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small
        }}
      >
        {renderLeft && <View style={{ marginRight: "auto" }}>{renderContent(renderLeft)}</View>}
        <View style={{ flex: 1 }}>
          <Text variant="bold">{title}</Text>
          <Text style={{ color: colors.placeholder }}>{description}</Text>
        </View>
        {renderRight ? (
          <View style={{ marginLeft: "auto" }}>{renderContent(renderRight)}</View>
        ) : (
          <Icon style={{ marginLeft: "auto" }} size={iconSize.medium} name="chevron-forward" />
        )}
      </View>
    </TouchableOpacity>
  )
}
