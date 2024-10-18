import { iconSize } from "@constants/styles"

import { type ComponentProps } from "react"

import Ionicons from "@expo/vector-icons/Ionicons"

import { type IconProps } from "@expo/vector-icons/build/createIconSet"

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={iconSize.large} style={[{ marginBottom: -9 }, style]} {...rest} />
}
