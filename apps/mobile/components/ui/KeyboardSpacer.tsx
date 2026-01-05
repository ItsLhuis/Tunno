import { useTabbarHeight } from "@contexts/TabbarContext"

import { useKeyboardHandler } from "react-native-keyboard-controller"

import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

type KeyboardSpacerProps = {
  additionalOffset?: number
}

const KeyboardSpacer = ({ additionalOffset = 0 }: KeyboardSpacerProps) => {
  const tabBarHeight = useTabbarHeight()

  const totalOffset = tabBarHeight + additionalOffset

  const height = useSharedValue(0)

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet"
        const adjustedHeight = Math.max(0, event.height - totalOffset)
        height.value = adjustedHeight
      }
    },
    [totalOffset]
  )

  const style = useAnimatedStyle(() => ({
    height: height.value
  }))

  return <Animated.View style={style} />
}

export { KeyboardSpacer }
