import { type ComponentProps, type ReactNode, type Ref } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import Animated, {
  type AnimatedStyle,
  type DerivedValue,
  type SharedValue,
  useAnimatedProps,
  useAnimatedStyle
} from "react-native-reanimated"

export type FadingViewProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  opacity: DerivedValue<0 | 1> | DerivedValue<number> | SharedValue<number>
  opacityThresholdToEnablePointerEvents?: number
  children?: ReactNode
  ref?: Ref<Animated.View>
} & ComponentProps<typeof Animated.View>

const FadingView = ({
  children,
  style,
  opacity,
  animatedProps = {},
  opacityThresholdToEnablePointerEvents = 1,
  ref,
  ...props
}: FadingViewProps) => {
  const animatedPropsComputed = useAnimatedProps(() => {
    const pointerEvents: ComponentProps<typeof Animated.View>["pointerEvents"] =
      opacity.value >= opacityThresholdToEnablePointerEvents ? "auto" : "none"
    return { pointerEvents }
  }, [opacityThresholdToEnablePointerEvents])

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

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

export { FadingView }
