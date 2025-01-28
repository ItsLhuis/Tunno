import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import {
  Icon,
  IconButton,
  Text,
  Pressable,
  SearchInput,
  Header,
  LargeHeader,
  LargeHeaderSubtitle,
  FlashListWithHeaders,
  ListItemText
} from "@components/ui"

import { router } from "expo-router"

const data = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Songs() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  return (
    <FlashListWithHeaders
      HeaderComponent={({ showHeader }) => (
        <Header
          showHeader={showHeader}
          headerCenter={
            <Text variant="bold" size="large" numberOfLines={1}>
              Songs
            </Text>
          }
          headerLeft={<IconButton name="Download" onPress={() => router.push("/drive")} />}
          headerRight={<IconButton name="Settings" onPress={() => router.push("/settings")} />}
        />
      )}
      LargeHeaderComponent={() => (
        <LargeHeader>
          <Text variant="bold" size="xxxLarge" numberOfLines={1}>
            Songs
          </Text>
        </LargeHeader>
      )}
      LargeHeaderSubtitleComponent={() => (
        <LargeHeaderSubtitle style={{ paddingTop: spacing.small }}>
          <SearchInput placeholder="Search" />
        </LargeHeaderSubtitle>
      )}
      automaticallyAdjustsScrollIndicatorInsets={false}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      contentContainerStyle={{ paddingBottom: spacing.medium, paddingHorizontal: spacing.large }}
      data={data}
      renderItem={({ item, index }) => (
        <Pressable>
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
              <Icon color={colors.placeholder} name="Music2" />
            </View>
            <ListItemText title={item.name} description={item.id} />
            <IconButton name="Ellipsis" />
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={40}
    />
  )
}
