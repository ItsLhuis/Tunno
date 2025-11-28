import { Text as RNText, type TextProps as RNTextProps } from "react-native"

import {
  createColorVariants,
  createStyleSheet,
  createVariant,
  useStyles,
  type StyleVariants
} from "@styles"

export type TextProps = RNTextProps & StyleVariants<typeof textStyles, "text">

export const Text = ({
  variant,
  size,
  weight,
  color,
  fontStyle,
  margin,
  style,
  ...props
}: TextProps) => {
  const styles = useStyles(textStyles)

  return (
    <RNText
      style={[
        styles.text({
          variant: variant ?? "p",
          size: size ?? "base",
          weight: weight ?? "normal",
          color: color ?? "foreground",
          fontStyle: fontStyle ?? "normal",
          margin: margin ?? "default"
        }),
        style
      ]}
      {...props}
    />
  )
}

const textStyles = createStyleSheet(({ theme }) => ({
  text: createVariant({
    base: {},
    variants: {
      variant: {
        h1: {
          fontSize: theme.fontSize("4xl"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          lineHeight: theme.fontSize("4xl") * 1.25
        },
        h2: {
          fontSize: theme.fontSize("3xl"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          paddingBottom: theme.space("sm"),
          lineHeight: theme.fontSize("3xl") * 1.25
        },
        h3: {
          fontSize: theme.fontSize("2xl"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          lineHeight: theme.fontSize("2xl") * 1.25
        },
        h4: {
          fontSize: theme.fontSize("xl"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          lineHeight: theme.fontSize("xl") * 1.25
        },
        h5: {
          fontSize: theme.fontSize("lg"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          lineHeight: theme.fontSize("lg") * 1.25
        },
        h6: {
          fontSize: theme.fontSize("base"),
          fontFamily: "SpaceGrotesk-Bold",
          letterSpacing: theme.letterSpacing("tight"),
          lineHeight: theme.fontSize("base") * 1.25
        },
        p: {
          lineHeight: theme.fontSize() * 1.25
        },
        blockquote: {
          borderLeftWidth: theme.borderWidth(2),
          borderColor: theme.colors.border,
          paddingLeft: theme.space(4),
          fontSize: theme.fontSize("xs"),
          fontStyle: "italic",
          color: theme.colors.mutedForeground
        },
        code: {
          fontFamily: "monospace",
          fontSize: theme.fontSize("sm"),
          backgroundColor: theme.colors.muted,
          borderRadius: theme.radius("sm"),
          padding: theme.space(1)
        },
        pre: {
          fontFamily: "monospace",
          fontSize: theme.fontSize("sm"),
          backgroundColor: theme.colors.muted,
          borderRadius: theme.radius("sm"),
          padding: theme.space(2)
        },
        span: {
          fontSize: theme.fontSize("sm")
        }
      },
      size: {
        xs: {
          fontSize: theme.fontSize("xs"),
          lineHeight: theme.fontSize("xs") * 1.25
        },
        sm: {
          fontSize: theme.fontSize("sm"),
          lineHeight: theme.fontSize("sm") * 1.25
        },
        base: {
          fontSize: theme.fontSize(),
          lineHeight: theme.fontSize() * 1.25
        },
        lg: {
          fontSize: theme.fontSize("lg"),
          lineHeight: theme.fontSize("lg") * 1.25
        },
        xl: {
          fontSize: theme.fontSize("xl"),
          lineHeight: theme.fontSize("xl") * 1.25
        },
        "2xl": {
          fontSize: theme.fontSize("2xl"),
          lineHeight: theme.fontSize("2xl") * 1.25
        },
        "3xl": {
          fontSize: theme.fontSize("3xl"),
          lineHeight: theme.fontSize("3xl") * 1.25
        },
        "4xl": {
          fontSize: theme.fontSize("4xl"),
          lineHeight: theme.fontSize("4xl") * 1.25
        },
        "5xl": {
          fontSize: theme.fontSize("5xl"),
          lineHeight: theme.fontSize("5xl") * 1.25
        },
        "6xl": {
          fontSize: theme.fontSize("6xl"),
          lineHeight: theme.fontSize("6xl") * 1.25
        },
        "7xl": {
          fontSize: theme.fontSize("7xl"),
          lineHeight: theme.fontSize("7xl") * 1.25
        },
        "8xl": {
          fontSize: theme.fontSize("8xl"),
          lineHeight: theme.fontSize("8xl") * 1.25
        },
        "9xl": {
          fontSize: theme.fontSize("9xl"),
          lineHeight: theme.fontSize("9xl") * 1.25
        }
      },
      weight: {
        light: {
          fontFamily: "SpaceGrotesk-Light"
        },
        normal: {
          fontFamily: "SpaceGrotesk-Regular"
        },
        medium: {
          fontFamily: "SpaceGrotesk-Medium"
        },
        semibold: {
          fontFamily: "SpaceGrotesk-Bold"
        },
        bold: {
          fontFamily: "SpaceGrotesk-Bold"
        },
        extrabold: {
          fontFamily: "SpaceGrotesk-Bold"
        }
      },
      color: createColorVariants(theme, "color"),
      fontStyle: {
        normal: {},
        italic: {
          fontStyle: "italic"
        },
        underline: {
          textDecorationLine: "underline"
        },
        strikethrough: {
          textDecorationLine: "line-through"
        },
        underlineStrikethrough: {
          textDecorationLine: "underline line-through"
        }
      },
      margin: {
        default: {},
        none: {
          marginTop: 0
        }
      }
    },
    defaultVariants: {
      variant: "p",
      size: "base",
      weight: "normal",
      color: "foreground",
      fontStyle: "normal",
      margin: "default"
    }
  })
}))
