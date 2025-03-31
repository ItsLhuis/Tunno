import { ReactNode } from "react"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { Icon, ListItemText, Pressable, type PressableProps } from "@components/ui"

export type SettingButtonProps = PressableProps & {
  title: string
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
          borderRadius: theme.styles.borderRadius.none,
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
          gap: theme.styles.spacing.small
        }}
      >
        {renderLeft && <View style={{ marginRight: "auto" }}>{renderLeft}</View>}
        <ListItemText title={title} description={description} />
        {renderRight ? (
          <View style={{ marginLeft: "auto" }}>{renderRight}</View>
        ) : (
          <Icon
            style={{ marginLeft: "auto" }}
            size={theme.styles.icon.size.medium}
            name="ChevronRight"
          />
        )}
      </View>
    </Pressable>
  )
}
