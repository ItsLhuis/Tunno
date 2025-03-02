import { useColorTheme } from "@hooks/useColorTheme"

import { fontFamily, fontSize } from "@constants/font"

import { Text as RNText, type TextProps as RNTextProps } from "react-native"

export type TextProps = RNTextProps & {
  variant?: keyof typeof fontFamily
  size?: keyof typeof fontSize
}

export function Text({ style, variant = "regular", size = "medium", ...props }: TextProps) {
  const { colors } = useColorTheme()

  return (
    <RNText
      maxFontSizeMultiplier={1}
      style={[
        { color: colors.text, fontSize: fontSize[size] },
        style,
        {
          fontFamily: fontFamily[variant]
        }
      ]}
      {...props}
    />
  )
}
Text.displayName = "Text"
