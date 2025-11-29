import { type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, createVariant, useStyles, type StyleVariants } from "@styles"

import { Fade } from "@components/ui/Fade"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Spinner } from "@components/ui/Spinner"
import { Text, type TextProps } from "@components/ui/Text"

import { getButtonForegroundColor } from "@lib/utils"

export type ButtonProps = Omit<PressableProps, "style" | "children"> &
  StyleVariants<typeof buttonStyles, "button"> & {
    children?: ReactNode
    title?: string | null
    isLoading?: boolean
    disabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
    titleProps?: TextProps
  }

const Button = ({
  variant = "default",
  size = "default",
  children,
  title,
  isLoading = false,
  disabled = false,
  containerStyle,
  style,
  titleProps,
  disableOpacityEffect = false,
  ...props
}: ButtonProps) => {
  const styles = useStyles(buttonStyles)

  const spinnerColor = getButtonForegroundColor(variant)

  const isDisabled = disabled || isLoading

  return (
    <View style={[{ alignSelf: "center" }, containerStyle]}>
      <Pressable
        style={[
          styles.button({
            variant,
            size,
            isDisabled: isDisabled
          }),
          style
        ]}
        disabled={isDisabled}
        disableOpacityEffect={disableOpacityEffect || isLoading}
        {...props}
      >
        <Fade show={!isLoading} initial={false} unmountOnExit={false} style={styles.content}>
          {children ? (
            children
          ) : title ? (
            <Text
              style={[styles.buttonText({ variant, size, isDisabled }), titleProps?.style]}
              {...titleProps}
            >
              {title}
            </Text>
          ) : null}
        </Fade>
        <Fade show={isLoading} unmountOnExit={false} style={styles.spinnerContainer}>
          <Spinner size="sm" color={spinnerColor} />
        </Fade>
      </Pressable>
    </View>
  )
}

const buttonStyles = createStyleSheet(({ theme }) => ({
  button: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.space(2),
      borderRadius: theme.radius()
    },
    variants: {
      isDisabled: {
        true: {},
        false: {}
      },
      variant: {
        default: {
          backgroundColor: theme.colors.primary
        },
        text: {
          backgroundColor: "transparent"
        },
        destructive: {
          backgroundColor: theme.colors.destructive
        },
        outline: {
          backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
          borderWidth: theme.borderWidth(),
          borderColor: theme.colors.input
        },
        secondary: {
          backgroundColor: theme.colors.secondary
        },
        ghost: {
          backgroundColor: "transparent"
        },
        link: {
          backgroundColor: "transparent",
          borderRadius: theme.radius("none"),
          paddingVertical: 0,
          paddingHorizontal: 0,
          minHeight: "auto"
        }
      },
      size: {
        default: {
          paddingVertical: theme.space(2),
          paddingHorizontal: theme.space(4),
          minHeight: theme.space(9)
        },
        sm: {
          paddingVertical: theme.space(1.5),
          paddingHorizontal: theme.space(3),
          minHeight: theme.space(8)
        },
        lg: {
          paddingVertical: theme.space(2.5),
          paddingHorizontal: theme.space(8),
          minHeight: theme.space(10)
        },
        icon: {
          padding: theme.space(2),
          minWidth: theme.space(9),
          minHeight: theme.space(9),
          width: theme.space(9),
          height: theme.space(9)
        }
      }
    },
    compoundVariants: [
      {
        isDisabled: true,
        variant: "default",
        style: {
          backgroundColor: theme.withOpacity(theme.colors.primary, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "secondary",
        style: {
          backgroundColor: theme.withOpacity(theme.colors.secondary, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "destructive",
        style: {
          backgroundColor: theme.withOpacity(theme.colors.destructive, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "outline",
        style: {
          backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(50)),
          borderColor: theme.withOpacity(theme.colors.input, theme.opacity(50))
        }
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      isDisabled: false
    }
  }),
  buttonText: createVariant({
    base: {
      fontFamily: "SpaceGrotesk-Medium"
    },
    variants: {
      isDisabled: {
        true: {},
        false: {}
      },
      variant: {
        default: {
          color: theme.colors.primaryForeground
        },
        text: {
          color: theme.colors.primary,
          fontFamily: "SpaceGrotesk-Bold"
        },
        destructive: {
          color: theme.colors.destructiveForeground
        },
        outline: {
          color: theme.colors.accentForeground
        },
        secondary: {
          color: theme.colors.secondaryForeground
        },
        ghost: {
          color: theme.colors.accentForeground
        },
        link: {
          color: theme.colors.primary,
          fontFamily: "SpaceGrotesk-Regular",
          textDecorationLine: "underline"
        }
      },
      size: {
        default: {
          fontSize: theme.fontSize("sm")
        },
        sm: {
          fontSize: theme.fontSize("xs")
        },
        lg: {
          fontSize: theme.fontSize()
        },
        icon: {
          fontSize: theme.fontSize("sm")
        }
      }
    },
    compoundVariants: [
      {
        isDisabled: true,
        variant: "default",
        style: {
          color: theme.withOpacity(theme.colors.primaryForeground, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "secondary",
        style: {
          color: theme.withOpacity(theme.colors.secondaryForeground, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "destructive",
        style: {
          color: theme.withOpacity(theme.colors.destructiveForeground, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "outline",
        style: {
          color: theme.withOpacity(theme.colors.accentForeground, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "text",
        style: {
          color: theme.withOpacity(theme.colors.primary, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "ghost",
        style: {
          color: theme.withOpacity(theme.colors.accentForeground, theme.opacity(50))
        }
      },
      {
        isDisabled: true,
        variant: "link",
        style: {
          color: theme.withOpacity(theme.colors.primary, theme.opacity(50))
        }
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      isDisabled: false
    }
  }),
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space(2)
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
}))

export { Button }
