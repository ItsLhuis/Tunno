import { useColorTheme } from "@hooks/useColorTheme"

import { colors as colorList } from "@constants/colors"

import { useApp } from "@stores/app"

import { fontSize } from "@constants/font"
import { spacing, borderRadius, zIndex } from "@constants/styles"

import { View } from "react-native"

import { Pressable } from "../ui/Pressable"
import { IconButton } from "../ui/IconButton"
import { Text } from "../ui/Text"
import { useEffect } from "react"

export function Player() {
  const { colors } = useColorTheme()

  const { setPlayerHeight } = useApp()

  useEffect(() => {
    return () => setPlayerHeight(0)
  }, [])

  return (
    <View>
      <Pressable
        onLayout={(e) => setPlayerHeight(e.nativeEvent.layout.height + spacing.small)}
        disablePressEffect
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: zIndex.xHigh,
          borderRadius: borderRadius.xSmall,
          margin: spacing.small,
          marginTop: 0,
          padding: spacing.small,
          backgroundColor: colors.primary
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.xSmall
          }}
        >
          <View
            style={{
              padding: spacing.large,
              borderRadius: borderRadius.xSmall,
              backgroundColor: colorList.dark.text
            }}
          />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text numberOfLines={1} variant="bold" style={{ color: colorList.dark.text }}>
              Overlay Content
            </Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: fontSize.xSmall, color: colorList.dark.text, opacity: 0.8 }}
            >
              Overlay Content
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.small
            }}
          >
            <IconButton name="SkipBack" color={colorList.dark.text} isFilled />
            <IconButton name="Play" color={colorList.dark.text} isFilled />
            <IconButton name="SkipForward" color={colorList.dark.text} isFilled />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
