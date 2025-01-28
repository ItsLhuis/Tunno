import { ReactNode } from "react"

import { borderRadius, iconSize, spacing } from "@constants/styles"

import { View } from "react-native"

import { Icon, ListItemText, Pressable, type PressableProps } from "@components/ui"

export type SettingButtonProps = PressableProps & {
  title?: string | null | undefined
  description?: string | null | undefined
  renderLeft?: ReactNode
  renderRight?: ReactNode
}

export function SettingButton({
  containerStyle,
  title,
  description,
  renderLeft,
  renderRight,
  ...props
}: SettingButtonProps) {
  return (
    <Pressable
      containerStyle={[
        {
          borderRadius: borderRadius.none,
          width: "100%",
          justifyContent: "flex-start"
        },
        containerStyle
      ]}
      {...props}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small
        }}
      >
        {renderLeft && <View style={{ marginRight: "auto" }}>{renderLeft}</View>}
        <ListItemText title={title} description={description} />
        {renderRight ? (
          <View style={{ marginLeft: "auto" }}>{renderRight}</View>
        ) : (
          <Icon style={{ marginLeft: "auto" }} size={iconSize.medium} name="ChevronRight" />
        )}
      </View>
    </Pressable>
  )
}
