import { useColorTheme } from "@hooks/useColorTheme"

import { colors as colorList } from "@constants/colors"

import { fontSize } from "@constants/font"
import { spacing, borderRadius } from "@constants/styles"

import { View } from "react-native"

import { Pressable } from "../ui/Pressable"
import { IconButton } from "../ui/IconButton"
import { Text } from "../ui/Text"

export function Player() {
  const { colors } = useColorTheme()

  return (
    <View>
      <Pressable
        style={{
          borderRadius: borderRadius.xSmall,
          margin: spacing.small,
          marginBottom: spacing.xxSmall,
          marginTop: 0,
          padding: spacing.medium,
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
            <IconButton name="SkipBack" color={colorList.dark.text} />
            <IconButton name="Play" color={colorList.dark.text} />
            <IconButton name="SkipForward" color={colorList.dark.text} />
          </View>
        </View>
      </Pressable>
    </View>
  )
}
