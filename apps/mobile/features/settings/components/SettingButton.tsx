import { ReactNode } from "react"

import { borderRadius, iconSize, spacing } from "@constants/styles"

import { TouchableOpacity, type TouchableOpacityProps } from "react-native"

import { View, Icon, ListItemText } from "@components/ui"

import { renderContent } from "@utils/components"

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
        <ListItemText title={title} description={description} />
        {renderRight ? (
          <View style={{ marginLeft: "auto" }}>{renderContent(renderRight)}</View>
        ) : (
          <Icon style={{ marginLeft: "auto" }} size={iconSize.medium} name="chevron-forward" />
        )}
      </View>
    </TouchableOpacity>
  )
}
