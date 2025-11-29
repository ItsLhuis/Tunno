import { type ReactNode, useEffect } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { durationTokens } from "@styles"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  type WithTimingConfig
} from "react-native-reanimated"

import { scheduleOnRN } from "react-native-worklets"

export type FadeDirection = "up" | "down" | "left" | "right" | "none"

export type FadeProps = {
  children: ReactNode
  show?: boolean
  direction?: FadeDirection
  offset?: number
  delay?: number
  duration?: number
  scale?: number
  rotate?: number
  style?: StyleProp<ViewStyle>
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
  initial?: boolean
  exit?: boolean
  unmountOnExit?: boolean
  easing?: WithTimingConfig["easing"]
}

const Fade = ({
  children,
  show = true,
  direction = "none",
  offset,
  delay = 0,
  duration,
  scale = 1,
  rotate = 0,
  style,
  onAnimationStart,
  onAnimationComplete,
  initial = true,
  exit = true,
  unmountOnExit = true,
  easing
}: FadeProps) => {
  const defaultOffset = 20
  const defaultDuration = durationTokens[300]
  const defaultScaleOffset = 0.95

  const finalOffset = offset ?? defaultOffset
  const finalDuration = duration ?? defaultDuration
  const scaleOffset = defaultScaleOffset

  const getInitialTranslateX = () => {
    if (direction === "left") return finalOffset
    if (direction === "right") return -finalOffset
    return 0
  }

  const getInitialTranslateY = () => {
    if (direction === "up") return finalOffset
    if (direction === "down") return -finalOffset
    return 0
  }

  const opacity = useSharedValue(initial ? 0 : show ? 1 : 0)

  const translateX = useSharedValue(initial ? getInitialTranslateX() : 0)
  const translateY = useSharedValue(initial ? getInitialTranslateY() : 0)

  const scaleValue = useSharedValue(initial && scale !== 1 ? scale * scaleOffset : scale)

  const rotateValue = useSharedValue(initial && rotate !== 0 ? rotate + 5 : rotate)

  useEffect(() => {
    const animationConfig: WithTimingConfig = {
      duration: finalDuration,
      ...(easing && { easing })
    }

    const runAnimation = () => {
      if (onAnimationStart) {
        onAnimationStart()
      }

      if (show) {
        opacity.value = withDelay(
          delay,
          withTiming(1, animationConfig, (finished) => {
            if (finished && onAnimationComplete) {
              scheduleOnRN(onAnimationComplete)
            }
          })
        )
        translateX.value = withDelay(delay, withTiming(0, animationConfig))
        translateY.value = withDelay(delay, withTiming(0, animationConfig))
        scaleValue.value = withDelay(delay, withTiming(scale, animationConfig))
        rotateValue.value = withDelay(delay, withTiming(rotate, animationConfig))
      } else if (exit) {
        opacity.value = withDelay(
          delay,
          withTiming(0, animationConfig, (finished) => {
            if (finished && onAnimationComplete) {
              scheduleOnRN(onAnimationComplete)
            }
          })
        )
        translateX.value = withDelay(delay, withTiming(getInitialTranslateX(), animationConfig))
        translateY.value = withDelay(delay, withTiming(getInitialTranslateY(), animationConfig))
        scaleValue.value = withDelay(
          delay,
          withTiming(scale !== 1 ? scale * scaleOffset : 1, animationConfig)
        )
        rotateValue.value = withDelay(
          delay,
          withTiming(rotate !== 0 ? rotate + 5 : 0, animationConfig)
        )
      }
    }

    runAnimation()
  }, [
    show,
    delay,
    finalDuration,
    scale,
    rotate,
    direction,
    finalOffset,
    scaleOffset,
    exit,
    easing,
    onAnimationStart,
    onAnimationComplete,
    opacity,
    translateX,
    translateY,
    scaleValue,
    rotateValue
  ])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scaleValue.value },
        { rotate: `${rotateValue.value}deg` }
      ]
    }
  })

  if (unmountOnExit && !show && opacity.value === 0) {
    return null
  }

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
}

export { Fade }
