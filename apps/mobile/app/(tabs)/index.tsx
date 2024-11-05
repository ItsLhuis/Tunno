import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { borderRadius, spacing, zIndex } from "@constants/styles"

import { TouchableOpacity } from "react-native"

import { List, Icon, IconButton, Text, View } from "@components/ui"

import { router } from "expo-router"

const data = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Songs() {
  const { colors } = useThemeColor()

  return (
    <List
      overlayStyle={{ top: 0, zIndex: zIndex.max }}
      headerProps={{
        isAnimated: true,
        title: "Songs",
        renderLeft: <IconButton name="download-outline" />,
        renderRight: <IconButton name="cog-outline" onPress={() => router.push("/settings")} />
      }}
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity activeOpacity={0.6}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xSmall,
              paddingBottom: index % 1 === 0 && index !== data.length - 1 ? spacing.small : 0
            }}
          >
            <View
              style={{
                padding: spacing.small,
                borderRadius: borderRadius.xSmall,
                backgroundColor: colors.secondary
              }}
            >
              <Icon color={colors.placeholder} name="musical-note" />
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text numberOfLines={1} variant="bold">
                {item.name}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: size.xSmall, opacity: 0.8 }}>
                {item.id}
              </Text>
            </View>
            <IconButton name="ellipsis-horizontal" size={21} />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={40}
    />
  )
}
