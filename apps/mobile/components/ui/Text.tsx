import { Text as RNText, type TextProps as RNTextProps } from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { family } from "@constants/font"

export type TextProps = RNTextProps & {
  type?: "regular" | "bold" | "light"
}

export function Text({ style, type = "regular", ...rest }: TextProps) {
  const color = useThemeColor().text

  return (
    <RNText
      maxFontSizeMultiplier={1}
      style={[
        { color },
        style,
        {
          fontFamily:
            type === "regular"
              ? family.regular
              : type === "bold"
              ? family.bold
              : type === "light"
              ? family.light
              : family.regular
        }
      ]}
      {...rest}
    />
  )
}
