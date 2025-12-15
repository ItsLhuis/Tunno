import { useCallback, useState, type ReactNode } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { useFocusEffect } from "expo-router"

import { Fade, type FadeDirection } from "@components/ui/Fade"

import { Easing } from "react-native-reanimated"

export type FadingScreenProps = {
  children: ReactNode
  duration?: number
  direction?: FadeDirection
  offset?: number
  style?: StyleProp<ViewStyle>
}

const FadingScreen = ({
  duration = 300,
  direction = "none",
  offset,
  children,
  style
}: FadingScreenProps) => {
  const [show, setShow] = useState(false)

  const bezier = Easing.bezier(0.33, 1, 0.68, 1).factory()
  const easing = Easing.out(bezier)

  useFocusEffect(
    useCallback(() => {
      setShow(true)
      return () => {
        setShow(false)
      }
    }, [])
  )

  return (
    <Fade
      key={String(show)}
      show={show}
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
