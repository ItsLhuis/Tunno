import { useThemeColor } from "@hooks/useThemeColor"

import { size } from "@constants/font"
import { borderRadius, iconSize, spacing } from "@constants/styles"

import { BackIcon } from "@components/navigation"
import { List, Icon, IconButton, Text, View } from "@components/ui"

const data = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Downloads() {
  const colors = useThemeColor()

  return (
    <List
      headerProps={{
        isAnimated: true,
        hideSearch: true,
        title: "Downloads",
        renderLeft: () => {
          return <BackIcon />
        },
        renderRight: () => {
          return <IconButton name="add" />
        }
      }}
      hasPlayer={false}
      data={data}
      renderItem={({ item, index }) => (
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
              backgroundColor: colors.placeholder,
              opacity: 0.2
            }}
          >
            <Icon name="musical-note" />
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text numberOfLines={1} variant="bold">
              {item.name}
            </Text>
            <Text numberOfLines={1} style={{ fontSize: size.xSmall, opacity: 0.8 }}>
              {item.id}
            </Text>
          </View>
          <IconButton name="ellipsis-horizontal" size={iconSize.large} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={40}
    />
  )
}
