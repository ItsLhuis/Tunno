import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { Text as RNText, type TextProps as RNTextProps } from "react-native"

export type TextProps = RNTextProps & {
  variant?: keyof typeof theme.font.family
  size?: keyof typeof theme.font.size
}
export function Text({ style, variant = "regular", size = "medium", ...props }: TextProps) {
  const { colors } = useColorTheme()

  return (
    <RNText
      maxFontSizeMultiplier={1}
      style={[
        { color: colors.foreground, fontSize: theme.font.size[size] },
        style,
        {
          fontFamily: theme.font.family[variant]
        }
      ]}
      {...props}
    />
  )
}
Text.displayName = "Text"
