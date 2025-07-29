import { ComponentProps, forwardRef, ReactNode } from "react"

import { StyleProp, ViewStyle } from "react-native"

import Animated, {
  AnimatedStyle,
  DerivedValue,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle
} from "react-native-reanimated"

export type FadingViewProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  opacity: DerivedValue<0 | 1> | DerivedValue<number>
  opacityThresholdToEnablePointerEvents?: number
  children?: ReactNode
} & ComponentProps<typeof Animated.View>

const FadingView = forwardRef<Animated.View, FadingViewProps>(
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
      const pointerEvents: ComponentProps<typeof Animated.View>["pointerEvents"] =
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

export { FadingView }
