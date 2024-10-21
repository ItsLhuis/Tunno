import { iconSize } from "@constants/styles"

import { Icon, IconProps } from "../ui/Icon"

export function TabBarIcon({ style, ...rest }: IconProps) {
  return <Icon size={iconSize.large} style={[{ marginBottom: -9 }, style]} {...rest} />
}
