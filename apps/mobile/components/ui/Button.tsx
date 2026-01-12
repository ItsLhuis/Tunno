import React, { Fragment, type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  createVariant,
  useAnimatedPaletteColor,
  useStyles,
  type StyleVariants
} from "@styles"

import Animated, { useAnimatedStyle } from "react-native-reanimated"

import { Fade } from "@components/ui/Fade"
import { Icon, type IconProps } from "@components/ui/Icon"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Spinner } from "@components/ui/Spinner"
import { Text, type TextProps } from "@components/ui/Text"

import { getButtonForegroundColor } from "@lib/utils"

export type ButtonProps = Omit<PressableProps, "style" | "children"> &
  StyleVariants<typeof buttonStyles, "button"> & {
    children?: ReactNode
    title?: string | null
    leftIcon?: IconProps["name"]
    rightIcon?: IconProps["name"]
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
  leftIcon,
  rightIcon,
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

  const iconColor = getButtonForegroundColor(variant)
  const iconSize = size === "sm" ? "sm" : "base"

  const isDisabled = disabled || isLoading

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={[styles.button({ variant, size }), style]}
        disabled={isDisabled}
        disableOpacityEffect={disableOpacityEffect || isLoading}
        {...props}
      >
        <Fade show={!isLoading} initial={false} unmountOnExit={false} style={styles.content}>
          {children ? (
            children
          ) : (
            <Fragment>
              {leftIcon && <Icon name={leftIcon} size={iconSize} color={iconColor} />}
              {title && (
                <Text
                  style={[styles.buttonText({ variant, size }), titleProps?.style]}
                  numberOfLines={1 || titleProps?.numberOfLines}
                  {...titleProps}
                >
                  {title}
                </Text>
              )}
              {rightIcon && <Icon name={rightIcon} size={iconSize} color={iconColor} />}
            </Fragment>
          )}
        </Fade>
        <Fade show={isLoading} unmountOnExit={false} style={styles.spinnerContainer}>
          <Spinner size="sm" color={spinnerColor} />
        </Fade>
      </Pressable>
    </View>
  )
}

export type AnimatedButtonProps = Omit<PressableProps, "style" | "children"> &
  StyleVariants<typeof buttonStyles, "button"> & {
    children?: ReactNode
    title?: string | null
    leftIcon?: IconProps["name"]
    rightIcon?: IconProps["name"]
    isLoading?: boolean
    disabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    style?: StyleProp<ViewStyle>
    titleProps?: Omit<React.ComponentProps<typeof Animated.Text>, "style">
  }

const AnimatedButton = ({
  variant = "default",
  size = "default",
  children,
  title,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  containerStyle,
  style,
  titleProps,
  disableOpacityEffect = false,
  ...props
}: AnimatedButtonProps) => {
  const styles = useStyles(buttonStyles)

  const primaryColor = useAnimatedPaletteColor("primary")
  const primaryForegroundColor = useAnimatedPaletteColor("primaryForeground")

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    if (variant !== "default") {
      return {}
    }
    return {
      backgroundColor: primaryColor.value
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    if (variant !== "default") {
      return {}
    }
    return {
      color: primaryForegroundColor.value
    }
  })

  const iconColor = getButtonForegroundColor(variant)
  const iconSize = size === "sm" ? "sm" : "base"

  const isDisabled = disabled || isLoading

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={[styles.button({ variant, size }), style]}
        disabled={isDisabled}
        disableOpacityEffect={disableOpacityEffect || isLoading}
        {...props}
      >
        <Animated.View style={[styles.animatedBackground, animatedBackgroundStyle]} />
        <Fade show={!isLoading} initial={false} unmountOnExit={false} style={styles.content}>
          {children ? (
            children
          ) : (
            <Fragment>
              {leftIcon && <Icon name={leftIcon} size={iconSize} color={iconColor} />}
              {title && (
                <Animated.Text
                  style={[styles.buttonText({ variant, size }), animatedTextStyle]}
                  numberOfLines={1}
                  {...titleProps}
                >
                  {title}
                </Animated.Text>
              )}
              {rightIcon && <Icon name={rightIcon} size={iconSize} color={iconColor} />}
            </Fragment>
          )}
        </Fade>
        <Fade show={isLoading} unmountOnExit={false} style={styles.spinnerContainer}>
          <Spinner size="sm" color="primaryForeground" />
        </Fade>
      </Pressable>
    </View>
  )
}

export const buttonStyles = createStyleSheet(({ theme }) => ({
  container: {
    alignSelf: "stretch"
  },
  button: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: theme.space(2),
      borderRadius: theme.radius(),
      overflow: "hidden"
    },
    variants: {
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
          paddingHorizontal: theme.space(3),
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
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }),
  buttonText: createVariant({
    base: {
      fontFamily: "SpaceGrotesk-Medium"
    },
    variants: {
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
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }),
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space(2),
    zIndex: 1
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}))

export { AnimatedButton, Button }
