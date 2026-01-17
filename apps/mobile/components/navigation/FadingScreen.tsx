import { useCallback, useState, type ReactNode } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { useFocusEffect } from "expo-router"

import { useDelayedMount } from "@hooks/useDelayedMount"

import { Easing } from "react-native-reanimated"

import { Fade, type FadeDirection } from "@components/ui/Fade"

export type FadingScreenProps = {
  children: ReactNode
  duration?: number
  direction?: FadeDirection
  offset?: number
  style?: StyleProp<ViewStyle>
  delay?: number
}

const FadingScreen = ({
  duration = 300,
  direction = "none",
  offset,
  children,
  style,
  delay = 0
}: FadingScreenProps) => {
  const [isFocused, setIsFocused] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true)
      return () => {
        setIsFocused(false)
      }
    }, [])
  )

  const shouldRender = useDelayedMount(isFocused, delay)

  const bezier = Easing.bezier(0.33, 1, 0.68, 1).factory()
  const easing = Easing.out(bezier)

  if (!shouldRender) return null

  return (
    <Fade
      show={shouldRender}
      duration={duration}
      direction={direction}
      offset={offset}
      easing={easing}
      style={style}
    >
      {children}
    </Fade>
  )
}

export { FadingScreen }
