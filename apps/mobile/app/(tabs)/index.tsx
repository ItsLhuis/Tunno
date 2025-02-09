import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { borderRadius, spacing, imageSize } from "@constants/styles"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
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
  ListItemText,
  ActivityIndicator,
  FadingView
} from "@components/ui"

import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { router } from "expo-router"

type Song = {
  id: string
  name: string
}

const songs = Array.from({ length: 200 }, (_, i) => ({
  id: `${i}`,
  name: `Item ${i}`
}))

export default function Songs() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const [data, setData] = useState<Song[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(songs)
    }, 200)
  }, [])

  return (
    <FadingScreen style={{ flex: 1 }} removeClippedSubviews>
      <FlashListWithHeaders
        HeaderComponent={({ showHeader }) => (
          <Header
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                Songs
              </Text>
            }
            headerLeft={
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.medium }}>
                <IconButton name="Plus" onPress={() => router.push("/drive")} />
                <FadingView opacity={showHeader}>
                  <IconButton color={colors.primary} name="Shuffle" />
                </FadingView>
              </View>
            }
            headerRight={<IconButton name="More" />}
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.small }}>
              <IconButton noMargin buttonColor="primary" name="Shuffle" />
              <Text variant="bold" size="xxxLarge" numberOfLines={1}>
                Songs
              </Text>
            </View>
            <IconButton name="More" />
          </LargeHeader>
        )}
        LargeHeaderSubtitleComponent={() => (
          <LargeHeaderSubtitle style={{ paddingTop: spacing.small }}>
            <SearchInput placeholder="Search" />
          </LargeHeaderSubtitle>
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        contentContainerStyle={{
          paddingHorizontal: spacing.large,
          paddingBottom: spacing.large
        }}
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.xSmall,
                  paddingBottom: index % 1 === 0 && index !== data.length - 1 ? spacing.medium : 0
                }}
              >
                <View
                  style={{
                    height: imageSize.xLow,
                    width: imageSize.xLow,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: borderRadius.xSmall,
                    backgroundColor: colors.secondary
                  }}
                >
                  <Icon color={colors.placeholder} name="Music" />
                </View>
                <ListItemText title={item.name} description={item.id} />
                <IconButton name="More" />
              </View>
            </Pressable>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={60}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator color={colors.primary} />
          </View>
        }
      />
    </FadingScreen>
  )
}
