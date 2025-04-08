import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle
} from "react-native"

const Affects = ["muted", "uppercase", "underline", "strikethrough", "capitalize"] as const

type AffectType = (typeof Affects)[number]

type AffectStylesMap = {
  [K in AffectType]: StyleProp<TextStyle>
}

export type TextProps = Omit<RNTextProps, "style"> & {
  variant?: keyof typeof theme.font.family
  size?: keyof typeof theme.font.size
  affects?: AffectType | AffectType[]
  style?: StyleProp<TextStyle>
}

export function Text({
  style,
  variant = "regular",
  size = "medium",
  affects = [],
  ...props
}: TextProps) {
  const { colors } = useColorTheme()

  const getAffectStyles = () => {
    const affectStyles: AffectStylesMap = {
      muted: { color: colors.mutedForeground },
      uppercase: { textTransform: "uppercase" },
      underline: { textDecorationLine: "underline" },
      strikethrough: { textDecorationLine: "line-through" },
      capitalize: { textTransform: "capitalize" }
    }

    const affectsArray = Array.isArray(affects) ? affects : [affects]
    return StyleSheet.flatten(affectsArray.map((affect) => affectStyles[affect] || {}))
  }

  return (
    <RNText
      maxFontSizeMultiplier={1}
      style={[
        {
          color: colors.foreground,
          fontSize: theme.font.size[size],
          fontFamily: theme.font.family[variant]
        },
        getAffectStyles(),
        style
      ]}
      {...props}
    />
  )
}

Text.displayName = "Text"
