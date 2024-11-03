import { Text as RNText, type TextProps as RNTextProps } from "react-native"

import { useThemeColor } from "@hooks/useThemeColor"

import { family, size } from "@constants/font"

export type TextProps = RNTextProps & {
  variant?: "regular" | "bold" | "light"
}

export function Text({ style, variant = "regular", ...rest }: TextProps) {
  const { colors } = useThemeColor()

  return (
    <RNText
      maxFontSizeMultiplier={1}
      style={[
        { color: colors.text, fontSize: size.small },
        style,
        {
          fontFamily:
            variant === "regular"
              ? family.regular
              : variant === "bold"
              ? family.bold
              : variant === "light"
              ? family.light
              : family.regular
        }
      ]}
      {...rest}
    />
  )
}
