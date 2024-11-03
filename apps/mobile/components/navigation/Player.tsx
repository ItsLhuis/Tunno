import { useBottomTabBarHeight } from "@hooks/useBottomTabBarHeight"

import { useThemeColor } from "@hooks/useThemeColor"

import { usePlayerContext } from "@contexts/PlayerContext"

import { colors as colorList } from "@constants/colors"

import { size } from "@constants/font"
import { spacing, borderRadius } from "@constants/styles"

import { Pressable } from "../ui/Pressable"
import { IconButton } from "../ui/IconButton"
import { View } from "../ui/View"
import { Text } from "../ui/Text"

export function Player() {
  const bottomTabBarHeight = useBottomTabBarHeight()

  const { colors } = useThemeColor()

  const { setPlayerHeight } = usePlayerContext()

  return (
    <Pressable
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout
        setPlayerHeight(height + spacing.small)
      }}
      style={{
        position: "absolute",
        bottom: bottomTabBarHeight + spacing.small,
        left: spacing.small,
        right: spacing.small,
        padding: spacing.medium,
        borderRadius: borderRadius.small,
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
            style={{ fontSize: size.xSmall, color: colorList.dark.text, opacity: 0.8 }}
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
          <IconButton name="play-back" color={colorList.dark.text} />
          <IconButton name="play" color={colorList.dark.text} />
          <IconButton name="play-forward" color={colorList.dark.text} />
        </View>
      </View>
    </Pressable>
  )
}
