import { useEffect, useState } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useApp } from "@stores/app"

import { borderRadius, spacing } from "@constants/styles"

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
  ActivityIndicator
} from "@components/ui"

import Animated, { FadeIn } from "react-native-reanimated"

import { router } from "expo-router"

type Artist = {
  id: string
  name: string
}

const artists = Array.from({ length: 200 }, (_, i) => ({ id: `${i}`, name: `Item ${i}` }))

export default function Artists() {
  const { colors } = useColorTheme()

  const insets = useSafeAreaInsets()

  const { playerHeight } = useApp()

  const [data, setData] = useState<Artist[]>([])

  useEffect(() => {
    setTimeout(() => {
      setData(artists)
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
                Artists
              </Text>
            }
            headerLeft={<IconButton name="Plus" onPress={() => router.push("/drive")} />}
            headerRight={<IconButton name="More" />}
            headerRightFadesIn
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="bold" size="xxxLarge" numberOfLines={1}>
              Artists
            </Text>
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
          paddingBottom: playerHeight + spacing.medium,
          paddingHorizontal: spacing.large
        }}
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn}>
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
                    borderRadius: borderRadius.round,
                    backgroundColor: colors.secondary
                  }}
                >
                  <Icon color={colors.placeholder} name="User" />
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
              paddingBottom: playerHeight,
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
