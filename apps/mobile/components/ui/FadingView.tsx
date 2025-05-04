import { ReactNode, ComponentProps, forwardRef } from "react"

import { StyleProp, ViewStyle } from "react-native"

import Animated, {
  AnimatedStyle,
  DerivedValue,
  useAnimatedProps,
  useAnimatedStyle,
  interpolate
} from "react-native-reanimated"

type AnimatedViewPointerEvents = ComponentProps<typeof Animated.View>["pointerEvents"]

export type FadingViewProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  opacity: DerivedValue<0 | 1> | DerivedValue<number>
  opacityThresholdToEnablePointerEvents?: number
  children?: ReactNode
} & ComponentProps<typeof Animated.View>

export const FadingView = forwardRef<Animated.View, FadingViewProps>(
  (
    {
      children,
      style,
      opacity,
      animatedProps = {},
      opacityThresholdToEnablePointerEvents = 1,
      ...props
    },
    ref
  ) => {
    const animatedPropsComputed = useAnimatedProps(() => {
      const pointerEvents: AnimatedViewPointerEvents =
        opacity.value >= opacityThresholdToEnablePointerEvents ? "auto" : "none"
      return { pointerEvents }
    }, [opacityThresholdToEnablePointerEvents])

    const fadeStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(opacity.value, [0, 1], [0, 1])
      }
    })

    return (
      <Animated.View
        ref={ref}
        style={[{ opacity: 0 }, style, fadeStyle]}
        animatedProps={{ ...animatedProps, ...animatedPropsComputed }}
        {...props}
      >
        {children}
      </Animated.View>
    )
  }
)
FadingView.displayName = "FadingView"
