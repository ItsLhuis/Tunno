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
          fontWeight: theme.fontWeight("extrabold"),
          letterSpacing: theme.letterSpacing("tight")
        },
        h2: {
          fontSize: theme.fontSize("3xl"),
          fontWeight: theme.fontWeight("semibold"),
          letterSpacing: theme.letterSpacing("tight"),
          paddingBottom: theme.space("sm")
        },
        h3: {
          fontSize: theme.fontSize("2xl"),
          fontWeight: theme.fontWeight("semibold"),
          letterSpacing: theme.letterSpacing("tight")
        },
        h4: {
          fontSize: theme.fontSize("xl"),
          fontWeight: theme.fontWeight("semibold"),
          letterSpacing: theme.letterSpacing("tight")
        },
        h5: {
          fontSize: theme.fontSize("lg"),
          fontWeight: theme.fontWeight("semibold"),
          letterSpacing: theme.letterSpacing("tight")
        },
        h6: {
          fontSize: theme.fontSize("base"),
          fontWeight: theme.fontWeight("semibold"),
          letterSpacing: theme.letterSpacing("tight")
        },
        p: {
          lineHeight: theme.lineHeight(7)
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
          lineHeight: theme.lineHeight("none")
        },
        sm: {
          fontSize: theme.fontSize("sm")
        },
        base: {
          fontSize: theme.fontSize()
        },
        lg: {
          fontSize: theme.fontSize("lg")
        },
        xl: {
          fontSize: theme.fontSize("xl")
        },
        "2xl": {
          fontSize: theme.fontSize("2xl")
        },
        "3xl": {
          fontSize: theme.fontSize("3xl")
        },
        "4xl": {
          fontSize: theme.fontSize("4xl")
        }
      },
      weight: {
        normal: {
          fontWeight: theme.fontWeight()
        },
        medium: {
          fontWeight: theme.fontWeight("medium")
        },
        semibold: {
          fontWeight: theme.fontWeight("semibold")
        },
        bold: {
          fontWeight: theme.fontWeight("bold")
        },
        extrabold: {
          fontWeight: theme.fontWeight("extrabold")
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
