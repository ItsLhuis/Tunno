import { type ComponentProps } from "react"

import Ionicons from "@expo/vector-icons/Ionicons"
import { type IconProps } from "@expo/vector-icons/build/createIconSet"

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={24} style={[{ marginBottom: -4 }, style]} {...rest} />
}
